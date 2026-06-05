# Plan y estado de creacion de issues: Epic Core Web Vitals

## Objetivo

Definir una nueva epic y sus HDUs para cubrir el trabajo de Core Web Vitals en ecommerce, contrastando la planilla `SEO - Iniciativas.xlsx` con las issues ya existentes en el repositorio.

## Fuentes revisadas

- Planilla `SEO - Iniciativas.xlsx`
- Issues del repositorio `acortespcf/proyectos-ecommerce`
- Templates en `.github/ISSUE_TEMPLATE/`
- Auditoria existente en `/Users/ain/Code/pcf/herramientas_seo/corewebvitals/auditoria-web-quality-pcfactory-home.md`
- Monitor CrUX en `/Users/ain/Code/Pruebas/monitoring-ecommerce-web`

## Baseline adicional disponible

Existe una auditoria ya ejecutada sobre `https://www.pcfactory.cl/` que conviene tomar como insumo directo para la epic y para la primera HDU de linea base.

Referencia:

- `/Users/ain/Code/pcf/herramientas_seo/corewebvitals/auditoria-web-quality-pcfactory-home.md`
- `/Users/ain/Code/Pruebas/monitoring-ecommerce-web`

## Datos de campo disponibles via CrUX

Ademas de la auditoria de laboratorio, existe un monitor de Google CrUX que entrega senales de campo mas utiles para priorizar la epic.

### Ultimo resumen compartido

#### Home

- Mobile: `LCP 1.63s`, `INP 187ms`, `CLS 0.090`, `TTFB 777ms`, datos `url`
- Desktop: `LCP 1.06s`, `INP 85ms`, `CLS 0.040`, `TTFB 435ms`, datos `url`

#### Categoria

- Mobile: `LCP 2.58s`, `INP 160ms`, `CLS 0.210`, `TTFB 477ms`, datos `url`
- Desktop: `LCP 2.06s`, `INP 74ms`, `CLS 0.160`, `TTFB 313ms`, datos `url`

#### Producto

- Mobile: `LCP 2.52s`, `INP 152ms`, `CLS 0.110`, `TTFB 648ms`, datos `origin`
- Desktop: `LCP 1.80s`, `INP 72ms`, `CLS 0.090`, `TTFB 336ms`, datos `origin`

#### Carro

- Mobile: `LCP 1.34s`, `INP 141ms`, `CLS 0.100`, `TTFB 340ms`, datos `url`
- Desktop: `LCP 0.76s`, `INP 64ms`, `CLS 0.060`, `TTFB 397ms`, datos `url`

#### Checkout

- Mobile: `LCP 0.63s`, `INP 210ms`, `CLS 0.320`, `TTFB 375ms`, datos `url`
- Desktop: `LCP 0.58s`, `INP 88ms`, `CLS 0.020`, `TTFB 428ms`, datos `url`

### Lectura recomendada de estos datos

- `Home` no aparece critico en datos de campo, aunque si tuvo resultados malos en laboratorio.
- `Categoria` aparece como uno de los principales problemas reales por `CLS` y por `LCP` movil sobre umbral.
- `Producto` aparece borderline en mobile y requiere seguimiento, aunque con datos a nivel `origin`, no `url`.
- `Carro` esta cerca del limite en `CLS` mobile, pero no parece el foco principal.
- `Checkout` muestra el peor `CLS` real del sitio y un `INP` mobile ligeramente sobre objetivo.

### Implicancia para la epic

La epic no deberia priorizar solo por Lighthouse o por la auditoria puntual del home. Deberia separar explicitamente:

- laboratorio: util para diagnosticar causas tecnicas
- campo: util para ordenar backlog por impacto real en usuarios

En terminos de priorizacion real, CrUX sugiere este orden:

1. `Checkout` por `CLS 0.320` e `INP 210ms` en mobile
2. `Categoria` por `CLS 0.210` y `LCP 2.58s` en mobile
3. `Producto` por `CLS 0.110` y `LCP 2.52s` en mobile, aunque con datos `origin`
4. `Home` como frente de optimizacion tecnica, pero no necesariamente como primer problema de campo

### Resumen de resultados de la auditoria

Puntajes reportados:

- Mobile: Performance `36`, Accessibility `84`, Best Practices `54`, SEO `85`
- Desktop: Performance `70`, Accessibility `80`, Best Practices `52`, SEO `85`

Metricas clave reportadas:

- Mobile: `LCP 20.6s`, `FCP 7.6s`, `TBT 880ms`, `TTI 25.6s`, `CLS 0.003`
- Desktop: `LCP 1.9s`, `FCP 1.3s`, `TBT 280ms`, `CLS 0.006`

### Hallazgos tecnicos que impactan directamente la epic CWV

- `LCP` movil critico en home asociado al banner principal del hero
- Recursos bloqueantes detectados:
  - `site-theme-...js` con ahorro estimado de `1443ms`
  - `site-style-...css` con ahorro estimado de `541ms`
- Costo relevante de terceros en main thread:
  - `retailrocket.net ~1871ms`
  - `Google Tag Manager ~895ms`
  - `Clarity ~429ms`
- DOM excesivo:
  - Mobile: `9467` elementos
  - Desktop: `10329` elementos
- Payload alto:
  - Mobile: `3483 KiB`
  - Desktop: `4273 KiB`
- Oportunidades concretas:
  - `Unused JS ~572 KiB`
  - `Offscreen images ~567 KiB`
  - `Unused CSS ~46 KiB`
- Politica de cache mejorable
- `bfcache` bloqueado por WebSocket de TalkCenter

### Como reconciliar laboratorio vs campo

Hoy hay una aparente tension entre ambos insumos:

- Lighthouse/home muestra `LCP` movil muy deteriorado
- CrUX/home muestra metricas razonables y dentro de rango

La lectura mas util para la epic es:

- Lighthouse sirve para descubrir deuda tecnica y peores escenarios de carga.
- CrUX sirve para decidir que templates estan afectando mas a usuarios reales.
- La epic debe usar ambos: CrUX para priorizar, Lighthouse para encontrar causas y verificar remediaciones.

### Hallazgos relacionados pero fuera del alcance estricto de CWV

La auditoria tambien detecta temas que no deberian entrar como parte central de la epic de Core Web Vitals, aunque si pueden quedar referenciados en `#30 Mejoras SEO` u otras epics:

- `alt` faltantes y links sin nombre discernible
- `og:image` mal definido
- canonical inyectado por JavaScript
- falta de structured data en HTML inicial
- `iframe` sin `title`
- uso invalido de ARIA
- contraste insuficiente
- links no rastreables
- headers de seguridad incompletos
- third-party cookies y APIs deprecadas

## Recomendacion principal

Crear una epic nueva y dedicada a Core Web Vitals, separada de `#30 Mejoras SEO`.

Titulo sugerido:

`[EPIC] Core Web Vitals: estabilizacion de CLS y optimizacion de LCP/INP en ecommerce`

## Estado actual de ejecucion

La recomendacion principal ya fue ejecutada parcialmente en GitHub.

### Epic creada

- `#161` `[EPIC] Core Web Vitals: estabilizacion de CLS y optimizacion de LCP/INP en ecommerce`

### HDUs nuevas ya creadas

- `#164` `HDU: Levantar linea base y presupuesto de Core Web Vitals`
- `#162` `HDU: Corregir CLS e INP de Checkout en mobile`
- `#163` `HDU: Corregir CLS y LCP de Categoria en mobile`
- `#165` `HDU: Estabilizar PDP y reducir regresion de CLS/LCP en mobile`
- `#166` `HDU: Optimizar recursos render-blocking y CSS/JS critico`

### Issues ya enlazadas con la epic

Se enlazaron manualmente la epic `#161` y las HDUs o issues relacionadas en ambos sentidos cuando fue posible. No se encontro una relacion jerarquica nativa visible de tipo `hija` en la interfaz usada, por lo que la referencia cruzada y la checklist de la epic quedaron como mecanismo operativo principal.

## Motivo de la nueva epic

- `#30 Mejoras SEO` mezcla SEO tecnico, contenido, crawling y mantencion general.
- La planilla trae suficiente volumen especifico de performance para justificar una epic propia.
- Ya existen varias issues relacionadas, pero hoy estan fragmentadas y con solapes.
- Separar CWV permite priorizar por metricas reales: `CLS`, `LCP`, `INP`.
- La auditoria del home ya confirma que el principal problema hoy no es `CLS`, sino `LCP` movil y costo de JavaScript/terceros.
- CrUX muestra que, a nivel de campo, los mayores problemas reales estan hoy en `checkout` y `categoria`, no en `home`.

## Iniciativas CWV detectadas en la planilla

### SEO OnPage

- `Optimizacion Core Web Vitals (LCP, INP, CLS)`
- `Implementacion de Lazy Load en imagenes y scripts`
- `Velocidad de carga (minificar JS/CSS)`
- `Comprimir y servir imagenes en WebP`
- `Implementar prerendering para paginas de alto trafico`

### PageSpeed Insights

Iniciativas principales detectadas:

1. Eliminar o diferir recursos que bloquean el renderizado
2. Optimizar peso y formato de imagenes
3. Mejorar cache de recursos estaticos y terceros
4. Optimizar carga de legacy JS
5. Corregir layout shift en widget de consejos y tips
6. Minimizar forced reflows
7. Priorizar banner principal mobile para LCP
8. Reducir cadena critica y agregar `preconnect`
9. Auditar scripts de terceros con alto impacto
10. Reducir trabajo en main thread
11. Reducir tiempo de ejecucion de JavaScript
12. Eliminar JS no utilizado
13. Diferir CSS no critico
14. Implementar lazy loading en imagenes offscreen
15. Minificar hoja de estilos principal
16. Reducir JS legacy innecesario
17. Reducir payload total inicial
18. Evitar tareas largas en el main thread

## Issues existentes que si calzan con el plan

Estas issues deberian reutilizarse como HDUs activas, insumos directos o antecedentes de la nueva epic:

- `#52` Análisis de causas del CLS
- `#47` Corrección del comportamiento del menú (Mobile y Desktop)
- `#39` Corrección de aparición de secciones fuera de lugar durante la carga
- `#63` Definir tamaños visuales, para todos los elementos (PDP, PLP, HOME)
- `#89` Optimización de carga de imágenes (Lazy Load) en ecommerce
- `#88` Lazy load optimizado en PLP
- `#87` Lazy load en PDP
- `#86` Lazy load en Home y landings

## Issues existentes con solape o a tratar como antecedente

- `#54` UX/UI: Mejorar la experiencia de carga inicial (LCP, INP, CLS) del sitio web
  - Sirve como antecedente, pero es demasiado amplia para ejecutarla como HDU final.
- `#89` ya es una epic de lazy load.
  - Conviene absorber su alcance dentro de la nueva epic CWV o dejarla solo como issue relacionada para evitar doble tracking.
- `#6`, `#7`, `#8`, `#9`
  - Son antecedentes cerrados del mismo tema lazy load y no requieren reapertura.

## Estado actual de brechas

Tras la creacion de la epic `#161` y sus primeras HDUs, las brechas pendientes quedan mas acotadas.

## Brechas detectadas: issues que faltan hoy

No se observaron issues claras y especificas para estos frentes:

- Recursos render-blocking JS/CSS
- WebP/AVIF, compresion y tamanos responsivos
- Politicas de cache para estaticos y terceros
- Carga condicional de legacy JS
- Forced reflows y secuencias de lectura/escritura DOM
- Priorizacion de imagen LCP mobile con `fetchpriority` y `preload`
- `preconnect` a origenes criticos
- Auditoria de terceros con impacto en main thread
- Reduccion de trabajo en main thread y tareas largas
- Eliminacion de JavaScript no utilizado
- Extraccion o diferimiento de CSS no critico
- Minificacion de CSS principal
- Reduccion del payload inicial total
- Evaluacion de menos transpilation para browsers modernos
- Reduccion de DOM inicial en home
- Revision del impacto de TalkCenter sobre `bfcache` y navegacion repetida

Nota de estado:

- `render-blocking JS/CSS` ya tiene una HDU creada: `#166`.
- `checkout`, `categoria`, `producto` y baseline ya tienen HDUs creadas: `#162`, `#163`, `#165`, `#164`.
- El resto de los frentes listados sigue pendiente de creacion como HDUs o decisiones de absorcion dentro de otras issues activas.

## Alcance recomendado para la nueva epic

Templates o zonas objetivo:

- Home
- PLP
- PDP
- Landings

Prioridad sugerida de ejecucion:

1. Checkout
2. PLP / Categoria
3. PDP / Producto
4. Home
5. Landings

Justificacion:

- CrUX muestra peor impacto real en `checkout` y `categoria`.
- La auditoria existente ya entrega evidencia tecnica detallada del home para levantar fixes de bajo riesgo y alto aprendizaje.
- `producto` requiere seguimiento, pero parte de su lectura viene a nivel `origin`.

Metricas objetivo:

- `CLS < 0.1`
- `LCP < 2.5s`
- `INP < 200ms`

Validacion recomendada:

- Diagnostico con `PageSpeed Insights` y `Lighthouse`
- Confirmacion de impacto con datos de campo en `CrUX` o `Google Search Console`
- Revision en mobile y desktop

## Propuesta de estructura de issues

### Epic nueva

Titulo sugerido:

`[EPIC] Core Web Vitals: estabilizacion de CLS y optimizacion de LCP/INP en ecommerce`

Estado:

- Creada como `#161`

Descripcion esperada:

- agrupar todas las iniciativas tecnicas de CWV
- medir baseline actual por template
- ejecutar mejoras por bloques tecnicos
- cerrar con validacion final y evidencia before/after

### HDUs a reutilizar o alinear

1. `#52` Análisis de causas del CLS
2. `#47` Corrección del comportamiento del menú (Mobile y Desktop)
3. `#39` Corrección de aparición de secciones fuera de lugar durante la carga
4. `#63` Definir tamaños visuales, para todos los elementos (PDP, PLP, HOME)
5. `#88` Lazy load optimizado en PLP
6. `#87` Lazy load en PDP
7. `#86` Lazy load en Home y landings

### HDUs nuevas sugeridas

1. `#164` `HDU: Levantar linea base y presupuesto de Core Web Vitals`
2. `#162` `HDU: Corregir CLS e INP de Checkout en mobile`
3. `#163` `HDU: Corregir CLS y LCP de Categoria en mobile`
4. `#165` `HDU: Estabilizar PDP y reducir regresion de CLS/LCP en mobile`
5. `#166` `HDU: Optimizar recursos render-blocking y CSS/JS critico`
6. `HDU: Optimizar la imagen LCP del hero mobile y su descubrimiento temprano`
7. `HDU: Reducir impacto de scripts de terceros y legacy JS en INP/TBT`
8. `HDU: Optimizar imagenes, formatos modernos y payload inicial`
9. `HDU: Mejorar cache, preconnect y cadena critica de recursos`
10. `HDU: Validacion final de Core Web Vitals con evidencia de cierre`
11. `HDU: Reducir DOM inicial y complejidad de render en Home`
12. `HDU: Evaluar integraciones persistentes que degradan navegacion repetida y bfcache`

### Checklist operativa actual sugerida para la epic

- `#164` Baseline y presupuesto CWV
- `#162` Checkout mobile: `CLS` e `INP`
- `#163` Categoria mobile: `CLS` y `LCP`
- `#165` PDP mobile: estabilizacion y regresion `CLS/LCP`
- `#166` Render-blocking y CSS/JS critico
- `#52` Revisar hallazgos de causas del `CLS`
- `#63` Alinear reserva de espacio y tamanos visuales
- `#86` Revisar lazy load en Home y landings
- `#87` Revisar lazy load en PDP
- `#88` Revisar lazy load en PLP
- Crear HDU de imagen `LCP` hero mobile
- Crear HDU de terceros y legacy JS
- Crear HDU de imagenes, formatos modernos y payload inicial
- Crear HDU de cache, `preconnect` y cadena critica
- Crear HDU de reduccion de DOM inicial en Home
- Crear HDU de `bfcache` e integraciones persistentes
- Crear HDU final de validacion y cierre

## Mapeo sugerido: planilla a issues

### Ya cubierto parcial o totalmente

- CLS general: `#52`, `#47`, `#39`, `#63`
- Lazy load: `#89`, `#88`, `#87`, `#86`
- Tamaños reservados para elementos visuales: `#63`

### Faltante por crear

- `fetchpriority/preload` para LCP mobile
- `preconnect` a origenes externos
- `cache-control` y estrategia de TTL
- `legacy JS` y terceros
- `unused JS/CSS`
- `main thread`, `long tasks`, `forced reflows`
- `WebP/AVIF` y control de peso de imagenes
- reduccion de DOM del home
- impacto de TalkCenter y WebSocket en `bfcache`

Ya creado:

- `#166` cubre `render-blocking JS/CSS`

## Ajuste de priorizacion usando la auditoria del home

Con la evidencia existente, la epic no deberia partir por una ola amplia de CLS en todo el sitio. Deberia partir por estos bloques:

1. Checkout mobile: `CLS` e `INP` reales observados en CrUX.
2. Categoria mobile: `CLS` y `LCP` sobre umbral observados en CrUX.
3. Producto mobile: estabilizacion y seguimiento por datos `origin`.
4. Home mobile: hero, JS/CSS bloqueante, terceros pesados, payload y DOM, usando Lighthouse como fuente de diagnostico.
5. Expandir el mismo esquema de medicion a PLP, PDP y landings con evidencia de campo y laboratorio.

## Recomendacion para la primera HDU

La primera HDU no deberia arrancar desde cero. Deberia reutilizar y formalizar la auditoria existente.

Contenido esperado para esa HDU:

- consolidar baseline actual usando CrUX y la auditoria ya generada
- completar baseline faltante para `PLP`, `PDP` y `landings`
- definir presupuesto tecnico por template
- establecer URLs patron de seguimiento
- dejar una tabla before/after por `LCP`, `CLS`, `INP/TBT`, payload y DOM size

## Recomendacion metodologica para la epic

Cada HDU deberia declarar explicitamente dos tipos de evidencia:

- `Campo`: CrUX con fuente `url` cuando exista, o `origin` cuando no exista dato de URL
- `Laboratorio`: Lighthouse o auditoria manual para detectar causas tecnicas

Esto evita cerrar issues por mejoras cosmeticas de laboratorio sin impacto en usuarios reales, y tambien evita ignorar deuda tecnica que aun no se refleja claramente en CrUX.

## Temas que no deberian entrar en esta epic CWV

Aunque aparecen en la planilla, conviene dejarlos fuera porque no son Core Web Vitals estrictos:

- Accesibilidad: contraste, nombres accesibles, alt redundante
- SEO tecnico de crawling/indexacion
- Canonicals, hreflang, sitemap, H1
- Enlaces no rastreables
- Errores generales de JS si no tienen impacto directo en CWV

Estos temas deben seguir viviendo en `#30 Mejoras SEO` o en otras epics especificas.

## Decision recomendada sobre epics existentes

### Sobre `#30 Mejoras SEO`

- Mantenerla como epic paraguas de SEO general.
- Linkear la nueva epic CWV como parte relacionada, no como reemplazo.

### Sobre `#89 Optimización de carga de imágenes`

Recomendacion:

- no usar dos epics activas de performance al mismo nivel
- absorber conceptualmente `#89` dentro de la nueva epic CWV
- mantener `#86`, `#87`, `#88` como historias hijas reutilizables

## Riesgos de planificacion

- Si se crean issues 1:1 contra cada fila de PageSpeed, el backlog quedara demasiado atomizado.
- Varias filas de la planilla son tareas tecnicas, no HDUs.
- Si no se define un set de URLs o templates prioritarios, el cierre puede ser ambiguo.
- Si solo se mide laboratorio y no campo, la epic puede marcarse como lista sin mejorar Search Console.

## Secuencia recomendada de creacion

1. Crear la nueva epic CWV.
2. Enlazarla con `#30` y referenciar `#89` como epic relacionada o absorbida.
3. Reutilizar `#52`, `#47`, `#39`, `#63`, `#86`, `#87`, `#88`.
4. Crear las HDUs nuevas faltantes por bloques tecnicos.
5. Agregar una HDU final de validacion y cierre con evidencia.

## Estado de la secuencia

Avance actual:

1. Completado: epic CWV creada como `#161`.
2. Completado: `#161` enlazada con `#30` y `#89` como relacionadas.
3. Completado parcialmente: reutilizacion referenciada para `#52`, `#47`, `#39`, `#63`, `#86`, `#87`, `#88`.
4. En progreso: creadas `#164`, `#162`, `#163`, `#165`, `#166`.
5. Pendiente: HDU final de validacion y cierre con evidencia.

## Siguiente entregable sugerido

Preparar un segundo documento con:

- texto listo para pegar de la epic nueva
- texto listo para pegar de cada HDU
- criterios de aceptacion
- links relacionados entre issues existentes y nuevas

Estado:

- Ya no es necesario para la epic ni para las primeras cinco HDUs nuevas, porque fueron creadas directamente en GitHub.
- Sigue siendo util si se quiere preparar en bloque el siguiente set de HDUs pendientes.

## Pendientes por crear

Siguiente bloque sugerido de HDUs pendientes:

1. `HDU: Optimizar la imagen LCP del hero mobile y su descubrimiento temprano`
2. `HDU: Reducir impacto de scripts de terceros y legacy JS en INP/TBT`
3. `HDU: Mejorar cache, preconnect y cadena critica de recursos`
4. `HDU: Optimizar imagenes, formatos modernos y payload inicial`
5. `HDU: Reducir DOM inicial y complejidad de render en Home`
6. `HDU: Evaluar integraciones persistentes que degradan navegacion repetida y bfcache`
7. `HDU: Validacion final de Core Web Vitals con evidencia de cierre`

Orden recomendado para el siguiente lote:

1. imagen `LCP` hero mobile
2. terceros y legacy JS
3. cache, `preconnect` y cadena critica
4. imagenes y payload inicial
5. DOM inicial Home
6. `bfcache` e integraciones persistentes
7. validacion final y cierre
