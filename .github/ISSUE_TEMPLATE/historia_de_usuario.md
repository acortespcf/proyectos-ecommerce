---
name: "📝 Historia de Usuario"
about: Historia refinable con reglas, requisitos y cobertura QA.
title: "HDU: [Título breve]"
labels: "Feature 🔫, Historia, status:refinamiento"
assignees: ""

---

<!--
Completa solo las secciones aplicables y elimina las instrucciones.
No inventes comportamiento, dependencias ni decisiones técnicas: registra las dudas pendientes de refinamiento.
Usa identificadores consecutivos RN, RF, RNF y CA para asegurar trazabilidad.
-->

## Historia de usuario

**Como** [rol o tipo de usuario]<br>
**Quiero** [acción o funcionalidad]<br>
**Para** [valor de negocio o beneficio esperado].

## Contexto

<!-- Situación actual, problema observable, frecuencia e impacto. -->

## Antecedentes técnicos confirmados

<!-- Capacidades existentes, componentes involucrados, contratos conocidos y evidencia técnica. Elimina esta sección si no aplica. -->

- [Antecedente confirmado]

## Objetivo

<!-- Resultado concreto que debe conseguir la historia. -->

## Alcance

### Incluye

- [Comportamiento incluido]

### No incluye

- [Comportamiento explícitamente fuera de alcance]

## Restricciones de solución acordadas

<!-- Decisiones ya acordadas. Mantén negociables los detalles internos que no afecten el resultado. -->

- [Restricción o decisión acordada]

## Definiciones

<!-- Aclara conceptos del negocio que puedan interpretarse de más de una forma. Elimina esta sección si no aplica. -->

| Término | Definición |
|---|---|
| [Término] | [Definición verificable] |

## Configuración o datos requeridos

<!-- Incluye esta tabla cuando existan campos configurables, contratos o insumos estructurados. -->

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| [Campo] | [Tipo] | Sí/No | [Uso y validación] |

## Reglas de negocio

- **RN-01:** [Regla determinística y verificable]
- **RN-02:** [Precedencia, excepción o fallback]
- **RN-03:** [Límite o condición de negocio]

## Requisitos funcionales

- **RF-01:** El sistema debe [capacidad observable].
- **RF-02:** El sistema debe [validación o comportamiento alternativo].
- **RF-03:** El sistema debe [manejo de error o fallback].

## Requisitos no funcionales

| ID | Categoría | Requisito | Validación |
|---|---|---|---|
| RNF-01 | Rendimiento | [Comportamiento o umbral acordado] | [Cómo se medirá] |
| RNF-02 | Continuidad | [Comportamiento ante fallas] | [Cómo se probará] |
| RNF-03 | Compatibilidad | [Dispositivos, navegadores o integraciones] | [Matriz o evidencia] |
| RNF-04 | Accesibilidad/SEO/Seguridad | [Requisito aplicable] | [Cómo se validará] |

## Criterios de aceptación

<!--
Cada criterio debe trazar una o más RN/RF/RNF y expresar un resultado observable.
Incluye flujo principal, variantes, errores, límites y regresión aplicables.
-->

### CA-01: [Flujo principal]

```gherkin
Escenario: [Resultado esperado del flujo principal]
  Dado que [precondición]
  Y [dato o configuración]
  Cuando [acción]
  Entonces [resultado observable]
  Y [validación adicional]
```

### CA-02: [Flujo alternativo o excepción]

```gherkin
Esquema del escenario: [Comportamiento para distintas condiciones]
  Dado que [precondición]
  Y [elemento] presenta <condición>
  Cuando [acción]
  Entonces [resultado esperado]
  Y [el resto del flujo continúa o fallback]

  Ejemplos:
    | condición |
    | [caso 1]  |
    | [caso 2]  |
```

### CA-03: [Regresión o fuera de alcance]

```gherkin
Escenario: [Comportamiento existente que debe conservarse]
  Dado que [contexto no afectado]
  Cuando [acción habitual]
  Entonces [comportamiento vigente]
  Y no debe [regresión identificada]
```

## Matriz mínima de pruebas

| Caso | Precondición o datos | Acción | Resultado esperado | Tipo |
|---|---|---|---|---|
| Flujo principal | [Datos válidos] | [Acción] | [Resultado] | Positivo |
| Validación | [Dato inválido] | [Acción] | [Fallback o error] | Negativo |
| Límite | [Condición de borde] | [Acción] | [Resultado] | Edge case |
| Regresión | [Flujo existente] | [Acción] | [Sin cambios] | Regresión |

## Insumos y dependencias

- [Diseños, accesos, datos, servicios, decisiones o historias relacionadas]

## Riesgos y regresión

- [Riesgo técnico o funcional y flujo que debe revalidarse]

## Definition of Ready / INVEST

- [ ] **I - Independiente:** puede implementarse sin depender de una historia no identificada.
- [ ] **N - Negociable:** define el resultado y deja abiertos los detalles internos no acordados.
- [ ] **V - Valiosa:** expresa un beneficio claro para usuario o negocio.
- [ ] **E - Estimable:** el equipo conoce componentes, dependencias y datos necesarios.
- [ ] **S - Pequeña:** el equipo confirma que puede completarse dentro de un sprint.
- [ ] **T - Testeable:** todos los resultados tienen criterios y evidencia verificables.

## Estimación (Story Points)

<details>
<summary>📏 <b>Guía rápida de Estimación (Story Points)</b></summary>

| Puntos | Claridad | Dependencias | Esfuerzo neto | Acción en Sprint |
| :---: | :--- | :--- | :---: | :--- |
| **1 SP** | Todo claro | Ninguna | < 2 horas | Entra directo (Quick win) |
| **2 SP** | Casi todo claro | Casi ninguna | ~Medio día | Entra directo |
| **3 SP** | Conocimiento medio | Algunas | 1 a 2 días | Entra directo |
| **5 SP** | Poca claridad previa | Pocas/moderadas | 3 a 4 días | Entra (Límite máximo recomendado) |
| **8 SP** | Muy poca claridad | Múltiples | ~1 semana | ⚠️ Dividir si es posible |
| **13 SP** | Incertidumbre total | Desconocidas | > 1 semana | ⛔ NO entra: Debe dividirse |

> *Ver guía completa y cálculo de capacidad:* [docs/agile/estimacion-story-points.md](docs/agile/estimacion-story-points.md)
</details>

- **Estimate asignado:** [1 / 2 / 3 / 5 / 8]

## Métricas de éxito

- [Indicador observable y criterio de cumplimiento]

## Scope

- [ ] seo
- [ ] gmb
- [ ] modyo
- [ ] analytics
- [ ] integraciones
- [ ] ux
- [ ] checkout
- [ ] pdp
- [ ] plp
- [ ] home
- [ ] landing
- [ ] otro: [indicar]

## Links relacionados

- [Documentación, evidencia, diseños, tickets o plan de pruebas]

## Rama propuesta

```text
feat/chile-[ISSUE-NUMBER]-<descripcion-en-kebab-case>
```
