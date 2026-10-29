# [FEAT] Modernización del flujo de Fichas de Producto (PDP): Desacople de TinyMCE/Sphinx hacia Git + CDN y soporte nativo de SVG

**Issue GitHub:** [#226](https://github.com/acortespcf/proyectos-ecommerce/issues/226)  
**Fecha:** 29 de octubre de 2026  
**Autor:** Ain Cortés Catoni  
**Estado:** `status:tareas por hacer` | `priority:high`  
**Scope:** `pdp`, `modyo`, `integraciones`, `ux`  
**Estimación preliminar:** 5 SP  

---

## 📋 Descripción
Modernizar el flujo de diseño, maquetación y publicación de las fichas técnicas enriquecidas de producto (PDP). 

Actualmente, el equipo de contenido debe ingresar al CRM/ERP interno Sphinx (`https://sphinx5.pcfactory.cl/1205.mod`), abrir el editor TinyMCE e insertar código HTML directamente en el modal de "Código fuente". Este flujo presenta fallas críticas:
1. Sphinx/TinyMCE elimina automáticamente las etiquetas `<svg>` al guardar, rompiendo la iconografía vectorial en los nuevos diseños de PDP.
2. El editor no logra cargar los estilos corporativos (`Failed to load content css: https://www.pcfactory.cl/public/estilos/fichaProductos.css`), obligando a maquetar a ciegas.
3. No existe control de versiones, revisión de cambios (PR), linter ni previsualización responsiva local.

Se propone desacoplar la gestión de fichas ricas hacia un repositorio Git (`pcfactory-pdp-fichas`) con despliegue automatizado multiamiente en dos fases (**CERT para validación funcional/QA en `cert-portal`** y **PROD tras aprobación** en `www.pcfactory.cl`), manteniendo Sphinx como fallback transparente para productos antiguos.

---

## 👤 Historia de Usuario
#### **YO COMO** diseñadora y especialista de contenido e-commerce
#### **QUIERO** maquetar las fichas técnicas de producto en un entorno local con live preview, estilos corporativos y soporte nativo de SVG, publicando mediante Git
#### **PARA** entregar fichas enriquecidas de alta calidad visual, acelerar los tiempos de publicación de lanzamientos y eliminar los errores y limitaciones de carga en Sphinx.

---

## 🎯 Contexto
1. **Pérdida de etiquetas `<svg>` en Sphinx:** Al intentar publicar la nueva PDP (ej. iPhone 16e, ID `56429`), TinyMCE o el sanitizador XSS del backend de Sphinx borra los `<svg>`, dejando los iconos invisibles.
2. **Editor WYSIWYG obsoleto:** La carga manual de bloques HTML en un campo de texto de un ERP genera alta fricción operacional, errores sintácticos y riesgo de sobreescritura involuntaria.
3. **Compatibilidad probada en Modyo:** El componente `ProductDescription.vue` del widget `pcfactory-widgets-ec-product-detail` ya soporta proveedores externos de contenido enriquecido (`alquimio`, `ccsInlineContent`, `acerContent`, `accvent`). Integrar una fuente propia alojada en CDN es técnicamente natural dentro de la arquitectura actual.

---

## 📊 Valor de Negocio
- **Time-to-Market de lanzamientos:** El equipo de diseño reduce los tiempos de maquetación y despliegue a minutos, sin depender de accesos directos al ERP.
- **Calidad de experiencia y CRO:** Fichas de producto dinámicas, con SVG vectoriales nítidos, tablas responsivas y animaciones que mejoran la tasa de conversión en la PDP.
- **Seguridad y estabilidad del ERP:** Se aísla a Sphinx de la inyección de HTML arbitrario, reduciendo el riesgo de errores en la base de datos central.
- **Trazabilidad y Rollback:** Historial Git auditable de cada cambio por SKU con reversión inmediata en caso de errores en precios o especificaciones.

---

## 🛠️ Tareas Técnicas

### 🔹 Subtarea 1: Workaround inmediato para soporte SVG en Sphinx (Quick Win)
- [ ] Ajustar la configuración de TinyMCE en Sphinx agregando `extended_valid_elements: 'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],tspan[*],glyph[*],symbol[*],use[*]'`.
- [ ] Revisar si el controlador backend de guardado de producto aplica un `strip_tags` restrictivo y permitir elementos SVG seguros.
- [ ] En caso de bloqueo por seguridad en backend, autorizar el uso temporal de `<img src="https://static.pcfactory.cl/.../icon.svg">` o Data URI para destrabar a diseño.
- [ ] Corregir la ruta o encabezados CORS para el archivo `https://www.pcfactory.cl/public/estilos/fichaProductos.css` en el iframe de TinyMCE.

### 🔹 Subtarea 2: Creación de Repositorio y Entorno Local (DevOps / Diseño)
- [ ] Crear repositorio `pcfactory-pdp-fichas` en GitHub con ramas protegidas y accesos para el equipo de diseño y desarrollo.
- [ ] Configurar plantilla local (Vite o Live Server) con los estilos base de pc Factory (tipografías, variables CSS, grilla Bootstrap) para previsualización idéntica a producción.
- [ ] Definir estructura estándar por SKU:
  ```text
  src/
  ├── components/          # Bloques compartidos (grids, tablas, comparadores)
  ├── styles/              # CSS base de fichas enriquecidas
  └── fichas/
      └── {idProducto}/    # Ejemplo: 56429/index.html
          ├── index.html
          └── assets/      # Imágenes y SVGs asociados
  ```

### 🔹 Subtarea 3: Pipeline CI/CD Multiamiente (CERT y PROD) (DevOps / Infra)
- [ ] Configurar GitHub Action con validación sintáctica (HTML/CSS linter) y optimización de imágenes (WebP/SVG).
- [ ] **Despliegue a CERT (Staging):**
  - Trigger automático al abrir o actualizar un Pull Request (o mediante workflow manual con input de SKU).
  - Sincroniza los archivos al bucket/CDN de certificación: `https://assets-cert.pcfactory.cl/fichas/{idProducto}/index.html` (o prefijo `/cert/fichas/{idProducto}.html`).
  - Comentario automático del bot de GitHub en el PR con el link directo para pruebas en CERT: `https://ww3.pcfactory.cl/cert-portal/producto/{idProducto}`.
- [ ] **Despliegue a PROD (Producción):**
  - Trigger automático al hacer merge del PR a la rama `main` (requiere aprobación previa del equipo de diseño/PO).
  - Sincroniza al bucket/CDN de producción: `https://assets.pcfactory.cl/fichas/{idProducto}/index.html`.
- [ ] Configurar encabezados CORS (`Access-Control-Allow-Origin: https://www.pcfactory.cl, https://ww3.pcfactory.cl`) y reglas de invalidación/caché TTL (ej. 5 a 15 min).

### 🔹 Subtarea 4: Integración en Widget Modyo (`pcfactory-widgets-ec-product-detail`) (Frontend)
- [ ] Parametrizar la URL base del CDN mediante variable Liquid de Modyo (`{{vars.fichas-cdn-url}}`):
  - En canal CERT: `https://assets-cert.pcfactory.cl/fichas` (o ruta correspondiente).
  - En canal PROD: `https://assets.pcfactory.cl/fichas`.
- [ ] En `ProductDescription.vue`, implementar verificación asíncrona de existencia de la ficha en CDN por SKU para el ambiente activo:
  - Si el recurso en CDN existe (`status 200`), renderizar el HTML enriquecido directamente en el contenedor `#product-description`.
  - Si no existe (`status 404`), mantener el fallback transparente consumiendo `this.data.descripcion | fixContent` desde el payload de Sphinx.
- [ ] Incorporar estilos base de interactividad en el widget (CSS plano en snippet `product_description_css` o `custom.scss`) para rotación de flechas y alternancia "Ver más / Ver menos".

---

## ✅ Criterios de Aceptación
- [ ] **CA-01 (Entorno local funcional):** Las diseñadoras pueden clonar el repositorio, levantar el servidor local y previsualizar la ficha con los estilos reales de pc Factory en mobile y desktop.
- [ ] **CA-02 (Renderizado completo de SVG):** Las etiquetas `<svg>` embebidas se renderizan sin alteraciones ni bloqueos en la PDP.
- [ ] **CA-03 (Despliegue a CERT para QA):** Al abrir un PR o ejecutar el workflow de staging, la ficha queda disponible en el CDN de CERT y visible en `https://ww3.pcfactory.cl/cert-portal/producto/{idProducto}` en menos de 3 minutos.
- [ ] **CA-04 (Promoción controlada a PROD):** Al hacer merge del PR aprobado a `main`, el pipeline despliega la ficha en el CDN de producción (`www.pcfactory.cl`) automáticamente.
- [ ] **CA-05 (Prioridad CDN en Widget Modyo):** Si un producto cuenta con ficha en CDN para el ambiente activo, el widget de detalle la despliega con prioridad sobre la descripción de Sphinx.
- [ ] **CA-06 (Fallback transparente):** Los productos que no cuenten con ficha en CDN continúan mostrando su descripción habitual de Sphinx sin errores en consola ni regresiones visuales.
- [ ] **CA-07 (Rollback rápido):** Cualquier error en producción se puede revertir realizando un `git revert` del commit correspondiente en el repositorio de fichas.

---

## 📏 Estimación (Story Points)
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

- **Estimate asignado:** 5 SP (involucra Infra/DevOps para S3/CDN + Frontend en Widget Modyo + setup de repo).

---

## ✅ Impacto y ❌ Riesgos
- **Impacto positivo:**
  - Desbloqueo total del diseño de fichas ricas para el catálogo 2026/2027.
  - Elimina el riesgo operacional de manipular código HTML dentro del ERP central.
  - Reducción de latencia al servir contenido estático directamente desde CloudFront/CDN.
- **Riesgos y mitigaciones:**
  - *CORS en CDN:* Asegurar que el bucket/distribución CloudFront tenga habilitados los headers `Access-Control-Allow-Origin` para los dominios de pc Factory (`www.pcfactory.cl`, `cert-portal`, etc.).
  - *SEO / Indexación:* Evaluar con el equipo de SEO si el contenido inyectado por client-side fetch es indexado correctamente por Googlebot, o si requiere que la API de catálogo haga el fetch server-side.

---

## 📸 Plan de Pruebas
| Caso | Escenario | Resultado Esperado |
| :--- | :--- | :--- |
| **1. Despliegue en CERT** | Abrir PR con ficha del SKU 56429 | El pipeline despliega a CERT; el producto es navegable en `cert-portal` con SVGs, estilos y desplegables funcionales. |
| **2. Promoción a PROD** | Aprobar y mergear el PR a `main` | El pipeline despliega a PROD; la ficha se visualiza idéntica en `www.pcfactory.cl/producto/56429`. |
| **3. Producto Legacy (Fallback)** | Cargar PDP de un producto sin HTML en CDN | El widget hace fallback a `data.descripcion` de Sphinx sin errores visibles. |
| **4. Prueba de SVG** | Maquetar ficha con múltiples `<svg>` inline | Los iconos vectoriales se visualizan con color y escala correctos. |
| **5. Rollback** | Revertir un PR en GitHub | El CDN actualiza la versión anterior en menos de 10 minutos. |

---

## 🌿 Rama Propuesta
```
feat/chile-226-desacople-fichas-pdp-git-cdn
```

## 📌 Scope
- [x] pdp
- [x] modyo
- [x] integraciones
- [x] ux
- [ ] checkout
- [ ] plp
- [ ] seo
- [ ] gmb
- [ ] analytics
- [ ] otro
