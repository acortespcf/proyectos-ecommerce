#!/usr/bin/env node

/**
 * Generador automático de Informes Ágiles y Retrospectivas para PC Factory eCommerce.
 * 
 * Soporta reportes por:
 *  - Sprint individual: retro táctica, Say/Do ratio, carryover, distribución por dev y scope.
 *  - Mes / Trimestre / Semestre / Año: evolución de velocidad, throughput y cumplimiento de iniciativas macro.
 * 
 * Uso:
 *   node scripts/agile/report.js --sprint 19
 *   node scripts/agile/report.js --sprint latest
 *   node scripts/agile/report.js --sprint current
 *   node scripts/agile/report.js --month 2026-10
 *   node scripts/agile/report.js --quarter Q3-2026
 *   node scripts/agile/report.js --semester S2-2026
 *   node scripts/agile/report.js --year 2026
 *   node scripts/agile/report.js --list-sprints
 */

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const DEFAULT_OWNER = 'acortespcf';
const DEFAULT_PROJECT_NUMBER = 3;

// Estados considerados finalizados
const DONE_STATUSES = new Set(['Done', 'Closed']);

// ─── 1. Cliente GraphQL (híbrido: fetch con Token o gh CLI) ─────────────────
async function executeGraphQL(query, variables = {}) {
  const token = process.env.PROJECT_TOKEN || process.env.GITHUB_TOKEN;

  if (token) {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'pcf-agile-reporter'
      },
      body: JSON.stringify({ query, variables })
    });

    if (!res.ok) {
      throw new Error(`Error HTTP al consultar API de GitHub: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    if (json.errors?.length) {
      throw new Error(`Error GraphQL: ${json.errors.map(e => e.message).join('; ')}`);
    }
    return json.data;
  }

  // Fallback a GitHub CLI
  try {
    const args = ['api', 'graphql'];
    for (const [k, v] of Object.entries(variables)) {
      if (v !== null && v !== undefined) {
        args.push('-F', `${k}=${v}`);
      }
    }
    args.push('-f', `query=${query}`);
    const out = execFileSync('gh', args, { maxBuffer: 20 * 1024 * 1024, encoding: 'utf8' });
    const json = JSON.parse(out);
    if (json.errors?.length) {
      throw new Error(`Error GraphQL vía gh CLI: ${json.errors.map(e => e.message).join('; ')}`);
    }
    return json.data;
  } catch (err) {
    if (err.message.includes('command not found')) {
      throw new Error('No se encontró "gh" CLI ni variable GITHUB_TOKEN / PROJECT_TOKEN.');
    }
    throw err;
  }
}

// ─── 2. Consultas y Paginación ──────────────────────────────────────────────
async function fetchProjectData(owner, projectNumber) {
  // Metadatos de campos e iteraciones
  const metaQuery = `
    query($owner: String!, $number: Int!) {
      user(login: $owner) {
        projectV2(number: $number) {
          id
          title
          fields(first: 30) {
            nodes {
              __typename
              ... on ProjectV2FieldCommon { id name dataType }
              ... on ProjectV2IterationField {
                id
                name
                configuration {
                  iterations { id title startDate duration }
                  completedIterations { id title startDate duration }
                }
              }
              ... on ProjectV2SingleSelectField {
                id
                name
                options { id name }
              }
            }
          }
        }
      }
    }
  `;

  let metaData = await executeGraphQL(metaQuery, { owner, number: projectNumber });
  let project = metaData?.user?.projectV2;

  if (!project) {
    // Intentar con organización si no es user
    const orgQuery = metaQuery.replace('user(login: $owner)', 'organization(login: $owner)');
    metaData = await executeGraphQL(orgQuery, { owner, number: projectNumber });
    project = metaData?.organization?.projectV2;
  }

  if (!project) {
    throw new Error(`No se encontró el Project #${projectNumber} para el owner "${owner}".`);
  }

  // Paginación de items
  const itemsQuery = `
    query($owner: String!, $number: Int!, $cursor: String) {
      user(login: $owner) {
        projectV2(number: $number) {
          items(first: 100, after: $cursor) {
            pageInfo { hasNextPage endCursor }
            nodes {
              id
              type
              content {
                __typename
                ... on Issue {
                  number
                  title
                  url
                  state
                  createdAt
                  closedAt
                  assignees(first: 10) { nodes { login name } }
                  labels(first: 15) { nodes { name } }
                }
                ... on PullRequest {
                  number
                  title
                  url
                  state
                  createdAt
                  closedAt
                  merged
                  assignees(first: 10) { nodes { login name } }
                  labels(first: 15) { nodes { name } }
                }
              }
              fieldValues(first: 20) {
                nodes {
                  __typename
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    field { ... on ProjectV2FieldCommon { name } }
                    name
                  }
                  ... on ProjectV2ItemFieldNumberValue {
                    field { ... on ProjectV2FieldCommon { name } }
                    number
                  }
                  ... on ProjectV2ItemFieldIterationValue {
                    field { ... on ProjectV2FieldCommon { name } }
                    title
                    startDate
                    duration
                  }
                  ... on ProjectV2ItemFieldDateValue {
                    field { ... on ProjectV2FieldCommon { name } }
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  let allItemNodes = [];
  let cursor = null;
  let hasNext = true;

  while (hasNext) {
    const pageData = await executeGraphQL(itemsQuery, { owner, number: projectNumber, cursor });
    const connection = pageData?.user?.projectV2?.items;
    if (!connection) break;
    allItemNodes.push(...connection.nodes);
    hasNext = connection.pageInfo.hasNextPage;
    cursor = connection.pageInfo.endCursor;
  }

  return { project, rawItems: allItemNodes };
}

// ─── 3. Normalización y Categorización ──────────────────────────────────────
function normalizeItems(rawNodes) {
  return rawNodes.map(node => {
    const content = node.content || {};
    const fieldValues = {};

    for (const fv of node.fieldValues?.nodes || []) {
      const fname = fv.field?.name;
      if (!fname) continue;
      if (fv.name !== undefined) fieldValues[fname] = fv.name;
      else if (fv.number !== undefined) fieldValues[fname] = fv.number;
      else if (fv.title !== undefined) {
        fieldValues[fname] = {
          title: fv.title,
          startDate: fv.startDate,
          duration: fv.duration
        };
      } else if (fv.date !== undefined) fieldValues[fname] = fv.date;
    }

    const title = content.title || '(Draft / Sin título)';
    const number = content.number || null;
    const url = content.url || null;
    const assignees = (content.assignees?.nodes || []).map(a => a.login);
    const labels = (content.labels?.nodes || []).map(l => l.name);

    const status = fieldValues['Status'] || 'Backlog';
    const sprintObj = typeof fieldValues['Sprint'] === 'object' ? fieldValues['Sprint'] : null;
    const sprintTitle = sprintObj?.title || (typeof fieldValues['Sprint'] === 'string' ? fieldValues['Sprint'] : null);
    const estimate = typeof fieldValues['Estimate'] === 'number' ? fieldValues['Estimate'] : null;
    const size = fieldValues['Size'] || null;
    const priority = fieldValues['Priority'] || null;

    const { tipo, scope } = categorizeItem(title, labels);

    return {
      id: node.id,
      number,
      title,
      url,
      assignees,
      labels,
      status,
      isDone: DONE_STATUSES.has(status),
      sprintTitle,
      sprintObj,
      estimate,
      size,
      priority,
      tipo,
      scope,
      createdAt: content.createdAt,
      closedAt: content.closedAt
    };
  });
}

function categorizeItem(title, labels) {
  const t = title.toLowerCase();
  const l = labels.map(x => x.toLowerCase());

  let tipo = 'Otro';
  if (l.some(x => x.includes('bug') || x.includes('error')) || t.startsWith('fix') || t.startsWith('[fix]')) {
    tipo = 'Bug / Fix 🐞';
  } else if (l.some(x => x.includes('feature')) || t.startsWith('feat') || t.startsWith('[feat]')) {
    tipo = 'Feature 🔫';
  } else if (l.some(x => x.includes('historia')) || t.startsWith('hdu')) {
    tipo = 'Historia (HDU) 📝';
  } else if (l.some(x => x.includes('refactor')) || t.includes('refactor')) {
    tipo = 'Refactor 🪚';
  } else if (l.some(x => x.includes('bau')) || t.includes('bau') || t.includes('soporte')) {
    tipo = 'BAU / Operación 🛠️';
  }

  let scope = 'General';
  if (t.includes('checkout') || t.includes('carro') || t.includes('cart') || t.includes('pago') || t.includes('despacho') || t.includes('rutpay') || t.includes('cupon')) {
    scope = 'Checkout & Pagos';
  } else if (t.includes('pdp') || t.includes('ficha') || t.includes('producto')) {
    scope = 'PDP / Ficha Producto';
  } else if (t.includes('plp') || t.includes('catalogo') || t.includes('categoría') || t.includes('buscador') || t.includes('filtro')) {
    scope = 'PLP / Catálogo';
  } else if (l.some(x => x.includes('seo')) || t.includes('seo') || t.includes('canonical') || t.includes('schema')) {
    scope = 'SEO & Indexación';
  } else if (t.includes('landing') || t.includes('campaña') || t.includes('banner')) {
    scope = 'Landings & Campañas';
  } else if (t.includes('retail rocket') || t.includes('adere.so') || t.includes('ocular') || t.includes('laura') || t.includes('loadstone') || t.includes('gmb')) {
    scope = 'Integraciones & Terceros';
  } else if (t.includes('login') || t.includes('registro') || t.includes('cuenta') || t.includes('ley de datos') || t.includes('privacidad')) {
    scope = 'Cuenta & Privacidad';
  } else if (t.includes('modyo') || t.includes('widget') || t.includes('css') || t.includes('ui') || t.includes('cabecera')) {
    scope = 'Modyo & Core UI';
  }

  return { tipo, scope };
}

function calculateEndDate(startDate, duration) {
  if (!startDate) return '';
  const d = new Date(startDate);
  d.setDate(d.getDate() + (duration ? duration - 1 : 11));
  return d.toISOString().slice(0, 10);
}

// ─── 4. Generador de Informe de Sprint (Retro) ─────────────────────────────
function generateSprintMarkdown(iteration, items, projectTitle) {
  const sprintTitle = iteration.title;
  const startDate = iteration.startDate;
  const endDate = calculateEndDate(startDate, iteration.duration);
  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');

  const totalItems = items.length;
  const doneItems = items.filter(x => x.isDone);
  const pendingItems = items.filter(x => !x.isDone);

  const totalSP = items.reduce((acc, x) => acc + (x.estimate || 0), 0);
  const doneSP = doneItems.reduce((acc, x) => acc + (x.estimate || 0), 0);
  const pendingSP = pendingItems.reduce((acc, x) => acc + (x.estimate || 0), 0);

  const estimatedCount = items.filter(x => x.estimate !== null).length;
  const sayDoRatio = totalSP > 0 ? ((doneSP / totalSP) * 100).toFixed(1) : (totalItems > 0 && doneItems.length === totalItems ? '100.0' : '0.0');
  const taskSuccessRate = totalItems > 0 ? ((doneItems.length / totalItems) * 100).toFixed(1) : '0.0';
  const estimationRate = totalItems > 0 ? ((estimatedCount / totalItems) * 100).toFixed(1) : '0.0';

  // Por estado
  const statusMap = {};
  for (const it of items) {
    statusMap[it.status] = statusMap[it.status] || { count: 0, sp: 0 };
    statusMap[it.status].count += 1;
    statusMap[it.status].sp += (it.estimate || 0);
  }

  // Por desarrollador
  const devMap = {};
  for (const it of items) {
    const devs = it.assignees.length ? it.assignees : ['Sin asignar'];
    for (const d of devs) {
      devMap[d] = devMap[d] || { total: 0, done: 0, spTotal: 0, spDone: 0 };
      devMap[d].total += 1;
      devMap[d].spTotal += (it.estimate || 0);
      if (it.isDone) {
        devMap[d].done += 1;
        devMap[d].spDone += (it.estimate || 0);
      }
    }
  }

  // Por Scope
  const scopeMap = {};
  for (const it of items) {
    scopeMap[it.scope] = scopeMap[it.scope] || { count: 0, sp: 0 };
    scopeMap[it.scope].count += 1;
    scopeMap[it.scope].sp += (it.estimate || 0);
  }

  // Por Talla
  const sizeMap = {};
  for (const it of items) {
    const sz = it.size || 'Sin talla';
    sizeMap[sz] = sizeMap[sz] || { count: 0, sp: 0 };
    sizeMap[sz].count += 1;
    sizeMap[sz].sp += (it.estimate || 0);
  }

  let md = `# 📊 Informe de Cierre y Retrospectiva — ${sprintTitle}\n\n`;
  md += `**Proyecto:** ${projectTitle}  \n`;
  md += `**Período del Sprint:** \`${startDate}\` al \`${endDate}\` (${iteration.duration || 12} días)  \n`;
  md += `**Fecha de generación:** \`${now}\`  \n\n`;

  md += `---

## 🎯 1. Resumen Ejecutivo y Métricas Clave

| Métrica | Planificado | Completado | Cumplimiento |
| :--- | :---: | :---: | :---: |
| **Story Points (Velocidad)** | **${totalSP} SP** | **${doneSP} SP** | **${sayDoRatio}%** (Say/Do Ratio) |
| **Tareas / Issues** | **${totalItems}** | **${doneItems.length}** | **${taskSuccessRate}%** de tickets cerrados |
| **Cobertura de Estimación** | ${totalItems} items | ${estimatedCount} estimados | **${estimationRate}%** con Story Points |
| **Carryover (Arrastre a Rollover)** | — | ${pendingItems.length} items | **${pendingSP} SP** pendientes |

> [!NOTE]
> **Tasa de éxito del Sprint (Say/Do Ratio):** **${sayDoRatio}%**  
> ${Number(sayDoRatio) >= 80 ? '🟢 **Excelente:** El equipo entregó sobre el 80% de los puntos comprometidos.' : Number(sayDoRatio) >= 60 ? '🟡 **Aceptable con observaciones:** Hubo desvíos o bloqueos que impactaron la capacidad.' : '🔴 **Atención:** Menos del 60% entregado. Revisar bloqueos externos o sobreestimación de capacidad.'}

---

## 👥 2. Rendimiento por Desarrollador

| Desarrollador | Tickets Asignados | Tickets Done | % Éxito | SP Comprometidos | SP Entregados |
| :--- | :---: | :---: | :---: | :---: | :---: |
`;

  for (const [dev, data] of Object.entries(devMap).sort((a, b) => b[1].spDone - a[1].spDone)) {
    const devRate = data.total > 0 ? ((data.done / data.total) * 100).toFixed(0) : 0;
    md += `| **@${dev}** | ${data.total} | ${data.done} | ${devRate}% | ${data.spTotal} SP | **${data.spDone} SP** |\n`;
  }

  md += `\n---

## 📦 3. Distribución por Estado y Alcance (Scope)

### Por Estado de Flujo
| Estado | Cantidad de Tareas | Story Points | % del Total |
| :--- | :---: | :---: | :---: |
`;

  for (const [st, data] of Object.entries(statusMap)) {
    const pct = totalItems > 0 ? ((data.count / totalItems) * 100).toFixed(0) : 0;
    const badge = st === 'Done' ? '✅ ' : st === 'QA' ? '🧪 ' : st === 'In progress' ? '⏳ ' : '';
    md += `| ${badge}**${st}** | ${data.count} | ${data.sp} SP | ${pct}% |\n`;
  }

  md += `\n### Por Ámbito de Negocio (Scope)
| Ámbito | Cantidad | Story Points | % del Esfuerzo |
| :--- | :---: | :---: | :---: |
`;

  for (const [sc, data] of Object.entries(scopeMap).sort((a, b) => b[1].sp - a[1].sp)) {
    const pct = totalSP > 0 ? ((data.sp / totalSP) * 100).toFixed(0) : (totalItems > 0 ? ((data.count / totalItems) * 100).toFixed(0) : 0);
    md += `| **${sc}** | ${data.count} | ${data.sp} SP | ${pct}% |\n`;
  }

  md += `\n### Por Tallas (T-Shirt Sizing)
| Talla | Cantidad | Story Points |
| :---: | :---: | :---: |
`;

  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Sin talla'];
  for (const sz of sizeOrder) {
    if (sizeMap[sz]) {
      md += `| **${sz}** | ${sizeMap[sz].count} | ${sizeMap[sz].sp} SP |\n`;
    }
  }

  md += `\n---

## ✅ 4. Entregables Completados en el Sprint (${doneItems.length})

| # | Tipo | Título | Asignado | SP | Talla | Prioridad |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
`;

  for (const it of doneItems) {
    const link = it.number && it.url ? `[#${it.number}](${it.url})` : `#${it.number || '-'}`;
    const assignees = it.assignees.length ? it.assignees.map(a => `@${a}`).join(', ') : '*(Sin asignar)*';
    md += `| ${link} | ${it.tipo} | ${it.title} | ${assignees} | ${it.estimate !== null ? `${it.estimate} SP` : '-'} | ${it.size || '-'} | ${it.priority || '-'} |\n`;
  }

  if (pendingItems.length > 0) {
    md += `\n---

## ⚠️ 5. Carryover: Tareas No Completadas (${pendingItems.length})

> Estos items no alcanzaron a cerrarse y requieren atención para el rollover o re-priorización en el siguiente sprint.

| # | Título | Estado Actual | Asignado | SP | Talla | Acción sugerida |
| :---: | :--- | :--- | :--- | :---: | :---: | :--- |
`;
    for (const it of pendingItems) {
      const link = it.number && it.url ? `[#${it.number}](${it.url})` : `#${it.number || '-'}`;
      const assignees = it.assignees.length ? it.assignees.map(a => `@${a}`).join(', ') : '*(Sin asignar)*';
      const accion = it.status === 'QA' ? 'Finalizar pruebas QA prioritarias' : it.status === 'Deploy' ? 'Pase a producción' : 'Mover al siguiente sprint (Rollover)';
      md += `| ${link} | ${it.title} | **${it.status}** | ${assignees} | ${it.estimate !== null ? `${it.estimate} SP` : '-'} | ${it.size || '-'} | ${accion} |\n`;
    }
  }

  md += `\n---

## 💡 6. Guía para la Reunión de Retrospectiva

*Usa estos puntos como disparadores de discusión en la sesión del equipo:*

### 🟢 ¿Qué funcionó bien? (Celebrar y mantener)
- [ ] Entregas destacadas y valor entregado a producción sin fricciones.
- [ ] Buena coordinación y precisión en estimaciones ($\le 5\\text{ SP}$).
- [ ] *(Espacio para notas del equipo durante la reunión)*

### 🔴 ¿Qué nos frenó o generó fricción? (Analizar causas)
- [ ] Identificar si el carryover se debió a bloqueos de terceros, dependencias o definición incompleta.
- [ ] Tareas sin estimación inicial o tickets que crecieron en alcance.
- [ ] *(Espacio para notas del equipo durante la reunión)*

### 🎯 Acuerdos y Compromisos para el Siguiente Sprint
- [ ] **Acción 1:** [Descripción del compromiso concreto] — *Responsable: @dev*
- [ ] **Acción 2:** [Descripción del compromiso concreto] — *Responsable: @dev*
`;

  return md;
}

// ─── 5. Generador de Informe por Período (Mes, Q, Semestre, Año) ───────────
function generatePeriodMarkdown(periodType, periodLabel, matchedSprints, allItems, projectTitle) {
  const sprintTitles = new Set(matchedSprints.map(s => s.title));
  const periodItems = allItems.filter(it => it.sprintTitle && sprintTitles.has(it.sprintTitle));

  const totalSprints = matchedSprints.length;
  const totalSP = periodItems.reduce((acc, it) => acc + (it.estimate || 0), 0);
  const doneSP = periodItems.filter(it => it.isDone).reduce((acc, it) => acc + (it.estimate || 0), 0);
  const totalDoneItems = periodItems.filter(it => it.isDone).length;
  const avgVelocity = totalSprints > 0 ? (doneSP / totalSprints).toFixed(1) : '0';
  const globalSayDo = totalSP > 0 ? ((doneSP / totalSP) * 100).toFixed(1) : '0';

  const now = new Date().toISOString().slice(0, 16).replace('T', ' ');

  let md = `# 📈 Informe Ejecutivo de Desarrollo eCommerce — ${periodLabel}\n\n`;
  md += `**Proyecto:** ${projectTitle}  \n`;
  md += `**Tipo de Período:** ${periodType}  \n`;
  md += `**Sprints comprendidos:** ${matchedSprints.map(s => `\`${s.title}\``).join(', ')} (${totalSprints} sprints)  \n`;
  md += `**Fecha de generación:** \`${now}\`  \n\n`;

  md += `---

## 🎯 1. Resumen Consolidado del Período

| Métrica Consolidada | Total Período | Promedio por Sprint |
| :--- | :---: | :---: |
| **Story Points Entregados (Throughput)** | **${doneSP} SP** | **${avgVelocity} SP / sprint** |
| **Tickets / Issues Finalizadas** | **${totalDoneItems}** | ${(totalDoneItems / (totalSprints || 1)).toFixed(1)} tickets / sprint |
| **Tasa Global de Cumplimiento (Say/Do)** | **${globalSayDo}%** | — |
| **Sprints Analizados** | ${totalSprints} iteraciones | — |

---

## 📊 2. Evolución de Velocidad Sprint a Sprint

| Sprint | Fechas | Items Totales | Items Done | SP Planificados | SP Entregados | % Say/Do |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
`;

  // Orden cronológico
  const sortedSprints = [...matchedSprints].sort((a, b) => a.startDate.localeCompare(b.startDate));
  for (const s of sortedSprints) {
    const sItems = periodItems.filter(it => it.sprintTitle === s.title);
    const sDone = sItems.filter(it => it.isDone);
    const sTotalSP = sItems.reduce((acc, x) => acc + (x.estimate || 0), 0);
    const sDoneSP = sDone.reduce((acc, x) => acc + (x.estimate || 0), 0);
    const sRatio = sTotalSP > 0 ? ((sDoneSP / sTotalSP) * 100).toFixed(0) : (sItems.length && sDone.length === sItems.length ? '100' : '0');
    const endDate = calculateEndDate(s.startDate, s.duration);

    md += `| **${s.title}** | \`${s.startDate}\` a \`${endDate}\` | ${sItems.length} | ${sDone.length} | ${sTotalSP} SP | **${sDoneSP} SP** | **${sRatio}%** |\n`;
  }

  // Desglose por Scope consolidado
  const scopeMap = {};
  for (const it of periodItems.filter(x => x.isDone)) {
    scopeMap[it.scope] = scopeMap[it.scope] || { count: 0, sp: 0 };
    scopeMap[it.scope].count += 1;
    scopeMap[it.scope].sp += (it.estimate || 0);
  }

  md += `\n---

## 🧱 3. Inversión de Esfuerzo por Ámbito (Trabajo Completado)

| Ámbito de Negocio | Tareas Entregadas | Story Points | % de Inversión Total |
| :--- | :---: | :---: | :---: |
`;

  for (const [sc, data] of Object.entries(scopeMap).sort((a, b) => b[1].sp - a[1].sp)) {
    const pct = doneSP > 0 ? ((data.sp / doneSP) * 100).toFixed(1) : '0';
    md += `| **${sc}** | ${data.count} | ${data.sp} SP | **${pct}%** |\n`;
  }

  // Grandes iniciativas entregadas (Tallas L, XL, XXL)
  const bigInitiatives = periodItems.filter(it => it.isDone && ['L', 'XL', 'XXL'].includes(it.size));
  md += `\n---

## 🏆 4. Grandes Iniciativas e Hitos Entregados (Tallas L, XL y XXL)

${bigInitiatives.length === 0 ? '_No se registraron iniciativas macro (L/XL/XXL) cerradas en este período._' : `
| # | Título | Talla | SP | Asignado | Sprint |
| :---: | :--- | :---: | :---: | :--- | :---: |
${bigInitiatives.map(it => {
  const link = it.number && it.url ? `[#${it.number}](${it.url})` : `#${it.number || '-'}`;
  return `| ${link} | ${it.title} | **${it.size}** | ${it.estimate || '-'} SP | ${it.assignees.join(', ') || '-'} | ${it.sprintTitle} |`;
}).join('\n')}
`}

---

## 📝 5. Conclusiones y Planificación del Próximo Ciclo
- **Capacidad de referencia recomendada:** Planificar **${avgVelocity} SP por sprint** como compromiso base para el equipo.
- **Áreas con mayor tracción:** ${Object.keys(scopeMap).slice(0, 2).join(' y ')}.
- **Próximos pasos estratégicos:** Revisar iniciativas en roadmap que superen los 8 SP para refinarlas y dividirlas antes de planificar.
`;

  return md;
}

// ─── 6. Lógica de CLI y Ejecución Principal ─────────────────────────────────
async function main() {
  const options = {
    sprint: { type: 'string' },
    month: { type: 'string' },
    quarter: { type: 'string' },
    semester: { type: 'string' },
    year: { type: 'string' },
    'list-sprints': { type: 'boolean' },
    output: { type: 'string', short: 'o' },
    stdout: { type: 'boolean' },
    'no-save': { type: 'boolean' },
    owner: { type: 'string', default: DEFAULT_OWNER },
    project: { type: 'string', default: String(DEFAULT_PROJECT_NUMBER) }
  };

  const { values } = parseArgs({ options, allowPositionals: true });

  const owner = values.owner || DEFAULT_OWNER;
  const projectNumber = parseInt(values.project || DEFAULT_PROJECT_NUMBER, 10);

  console.log(`📡 Consultando Project #${projectNumber} de @${owner}...`);
  const { project, rawItems } = await fetchProjectData(owner, projectNumber);

  const iterField = project.fields.nodes.find(f => f.name === 'Sprint');
  if (!iterField?.configuration) {
    throw new Error('No se encontró el campo de iteración "Sprint" en el proyecto.');
  }

  const { iterations = [], completedIterations = [] } = iterField.configuration;
  const allIterations = [...iterations, ...completedIterations];

  const items = normalizeItems(rawItems);

  // Comando --list-sprints
  if (values['list-sprints']) {
    console.log(`\n📋 Sprints disponibles en "${project.title}":\n`);
    console.log('| Sprint | Estado | Fecha Inicio | Duración | Items | SP Totales | SP Done |');
    console.log('| :--- | :--- | :--- | :--- | :---: | :---: | :---: |');
    for (const it of allIterations) {
      const isCompleted = completedIterations.some(c => c.id === it.id);
      const sItems = items.filter(x => x.sprintTitle === it.title);
      const sTotalSP = sItems.reduce((acc, x) => acc + (x.estimate || 0), 0);
      const sDoneSP = sItems.filter(x => x.isDone).reduce((acc, x) => acc + (x.estimate || 0), 0);
      console.log(`| ${it.title} | ${isCompleted ? 'Finalizado' : '🟢 Activo/Próximo'} | ${it.startDate} | ${it.duration} días | ${sItems.length} | ${sTotalSP} SP | ${sDoneSP} SP |`);
    }
    return;
  }

  let markdown = '';
  let defaultOutputPath = '';

  // Modo 1: Sprint Individual
  if (values.sprint) {
    let targetSprint = null;
    const arg = values.sprint.trim().toLowerCase();

    if (arg === 'latest') {
      targetSprint = completedIterations[0];
      if (!targetSprint) throw new Error('No hay sprints finalizados registrados.');
    } else if (arg === 'current') {
      targetSprint = iterations[0];
      if (!targetSprint) throw new Error('No hay un sprint activo registrado.');
    } else {
      // Buscar por número o nombre
      targetSprint = allIterations.find(it => {
        const titleLower = it.title.toLowerCase();
        return titleLower === arg || titleLower === `sprint ${arg}` || it.title.endsWith(` ${arg}`);
      });
    }

    if (!targetSprint) {
      throw new Error(`No se encontró el sprint "${values.sprint}". Usa --list-sprints para ver los nombres disponibles.`);
    }

    const sprintItems = items.filter(x => x.sprintTitle === targetSprint.title);
    markdown = generateSprintMarkdown(targetSprint, sprintItems, project.title);

    const safeTitle = targetSprint.title.toLowerCase().replace(/\s+/g, '-');
    defaultOutputPath = `docs/informes/sprints/${safeTitle}.md`;
  }
  // Modo 2: Período Mensual
  else if (values.month) {
    const month = values.month; // e.g. "2026-10"
    const matched = allIterations.filter(it => it.startDate.startsWith(month));
    if (!matched.length) throw new Error(`No se encontraron sprints que inicien en el mes ${month}.`);
    markdown = generatePeriodMarkdown('Mensual', `Mes ${month}`, matched, items, project.title);
    defaultOutputPath = `docs/informes/mensuales/${month}.md`;
  }
  // Modo 3: Período Trimestral
  else if (values.quarter) {
    // Acepta "Q3-2026" o "2026-Q3"
    let q = '', yr = '';
    const parts = values.quarter.toUpperCase().split('-');
    if (parts[0].startsWith('Q')) { q = parts[0]; yr = parts[1]; }
    else { q = parts[1]; yr = parts[0]; }

    const qMap = { Q1: ['01', '02', '03'], Q2: ['04', '05', '06'], Q3: ['07', '08', '09'], Q4: ['10', '11', '12'] };
    const months = qMap[q];
    if (!months) throw new Error(`Trimestre inválido "${values.quarter}". Usa formato Q1-YYYY, Q2-YYYY, etc.`);

    const matched = allIterations.filter(it => {
      const [y, m] = it.startDate.split('-');
      return y === yr && months.includes(m);
    });

    if (!matched.length) throw new Error(`No se encontraron sprints para el trimestre ${q}-${yr}.`);
    markdown = generatePeriodMarkdown('Trimestral', `Trimestre ${q} ${yr}`, matched, items, project.title);
    defaultOutputPath = `docs/informes/trimestrales/${yr}-${q}.md`;
  }
  // Modo 4: Período Semestral
  else if (values.semester) {
    let sem = '', yr = '';
    const parts = values.semester.toUpperCase().split('-');
    if (parts[0].startsWith('S')) { sem = parts[0]; yr = parts[1]; }
    else { sem = parts[1]; yr = parts[0]; }

    const months = sem === 'S1' ? ['01', '02', '03', '04', '05', '06'] : ['07', '08', '09', '10', '11', '12'];
    const matched = allIterations.filter(it => {
      const [y, m] = it.startDate.split('-');
      return y === yr && months.includes(m);
    });

    if (!matched.length) throw new Error(`No se encontraron sprints para el semestre ${sem}-${yr}.`);
    markdown = generatePeriodMarkdown('Semestral', `Semestre ${sem} ${yr}`, matched, items, project.title);
    defaultOutputPath = `docs/informes/semestrales/${yr}-${sem}.md`;
  }
  // Modo 5: Período Anual
  else if (values.year) {
    const yr = values.year;
    const matched = allIterations.filter(it => it.startDate.startsWith(yr));
    if (!matched.length) throw new Error(`No se encontraron sprints para el año ${yr}.`);
    markdown = generatePeriodMarkdown('Anual', `Año ${yr}`, matched, items, project.title);
    defaultOutputPath = `docs/informes/anuales/${yr}.md`;
  }
  else {
    console.log(`
Uso del generador de reportes ágiles:
  node scripts/agile/report.js --sprint <nombre o numero>
  node scripts/agile/report.js --sprint latest         # Último sprint finalizado
  node scripts/agile/report.js --sprint current        # Sprint activo actual
  node scripts/agile/report.js --month YYYY-MM         # Informe mensual
  node scripts/agile/report.js --quarter Q1..Q4-YYYY   # Informe trimestral
  node scripts/agile/report.js --semester S1..S2-YYYY  # Informe semestral
  node scripts/agile/report.js --year YYYY             # Informe anual
  node scripts/agile/report.js --list-sprints          # Lista todos los sprints registrados

Opciones:
  --output, -o <ruta>   Ruta personalizada del archivo .md
  --stdout              Imprime el Markdown por terminal
  --no-save             No guarda el archivo en disco
`);
    return;
  }

  if (values.stdout) {
    console.log('\n' + markdown);
  }

  if (!values['no-save']) {
    const targetPath = values.output ? resolve(values.output) : resolve(defaultOutputPath);
    mkdirSync(dirname(targetPath), { recursive: true });
    writeFileSync(targetPath, markdown, 'utf8');
    console.log(`\n✅ Informe generado exitosamente en:\n   ${targetPath}`);
  }
}

main().catch(err => {
  console.error('\n❌ Error al generar el informe:', err.message);
  process.exit(1);
});
