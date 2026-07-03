# Informe semanal desarrollo eCommerce

## Periodo
- Semana analizada: `2026-06-15` a `2026-06-21`
- Equipo: `ain` y `seba`
- Fecha de generacion: `2026-07-02`

## Fuentes consideradas
- Bitacoras en [[bitacora/inbox/ain/junio/15-06-2026]], [[bitacora/inbox/ain/junio/16-06-2026]], [[bitacora/inbox/ain/junio/17-06-2026]], [[bitacora/inbox/ain/junio/18-06-2026]] y [[bitacora/inbox/ain/junio/19-06-2026]]
- Bitacoras en [[bitacora/inbox/seba/junio/15-06-2026]], [[bitacora/inbox/seba/junio/16-06-2026]], [[bitacora/inbox/seba/junio/17-06-2026]], [[bitacora/inbox/seba/junio/18-06-2026]] y [[bitacora/inbox/seba/junio/19-06-2026]]
- Pendientes consolidados en [[bitacora/pendientes/ain-pcfactory]] y [[bitacora/pendientes/seba-pcfactory]] como contexto de arrastre
- Este informe se basa en evidencia escrita disponible; no incorpora actividad no registrada del fin de semana

## Enlaces relacionados
- [[bitacora/inbox/ain/junio/15-06-2026]]
- [[bitacora/inbox/ain/junio/16-06-2026]]
- [[bitacora/inbox/ain/junio/17-06-2026]]
- [[bitacora/inbox/ain/junio/18-06-2026]]
- [[bitacora/inbox/ain/junio/19-06-2026]]
- [[bitacora/inbox/seba/junio/15-06-2026]]
- [[bitacora/inbox/seba/junio/16-06-2026]]
- [[bitacora/inbox/seba/junio/17-06-2026]]
- [[bitacora/inbox/seba/junio/18-06-2026]]
- [[bitacora/inbox/seba/junio/19-06-2026]]

## Cobertura y criterio
- `ain`: 5 bitacoras registradas dentro de la semana analizada.
- `seba`: 5 bitacoras registradas dentro de la semana analizada.
- No hay bitacoras registradas para `20-06` ni `21-06`; el informe representa principalmente la semana laboral de lunes a viernes.
- Las metricas son de trazabilidad escrita y no equivalen a horas trabajadas ni esfuerzo real.

## Resumen ejecutivo
- La semana estuvo centrada en cuatro frentes: `cupones`, `SEO/PDP-PLP`, campanas comerciales y estabilizacion operativa de checkout/monitores.
- `ain` sostuvo un rol transversal de definicion, QA operativo, monitoreo y seguimiento tecnico: criterios de cupones, error 500 de despacho, Checkout Web 3.0, stock mayorista, `Issue #155`, QR Subtel, Retail Rocket y testing.
- `seba` concentro ejecucion de frontend/campanas y desarrollo de cupones: implementacion del issue `#134`, paso a produccion de `#148` y `#155`, campanas `Dia del Padre`, `Intel Ultra`, `Vacaciones de Invierno` y `Solo por Pocas Horas`.
- La semana deja avances concretos, pero tambien riesgos abiertos: errores de pasarela y despacho, dependencias de endpoint para cupones, definicion de QR Subtel desde `Sphinx`, bug de Modyo al clonar espacios y necesidad de incorporar testing en desarrollos futuros.

## Metricas

### Actividad registrada
| Metrica | ain | seba | Total |
| --- | ---: | ---: | ---: |
| Bitacoras de la semana | 5 | 5 | 10 |
| Dias con desarrollo activo | 5 | 5 | 10 |
| Dias con trabajo de campanas | 3 | 5 | 8 |
| Dias con reuniones / gestion activas | 5 | 5 | 10 |
| Dias con bloqueos o alertas explicitas | 2 | 3 | 5 |

### Produccion y seguimiento
| Metrica | ain | seba | Total |
| --- | ---: | ---: | ---: |
| Issues / PRs / runs mencionados explicitamente | 8 | 5 | 13 |
| Campanas o activaciones mencionadas | 4 | 6 | 7 unicas |
| Incidentes o riesgos operativos registrados | 4 | 4 | 8 |
| Frentes tecnicos recurrentes | 7 | 6 | 9 unicos |

## Principales frentes trabajados

### 1. Cupones y carrito
- Se siguio trabajando el `Issue #134`, tanto desde definicion funcional como desde implementacion en `pcfactory-widgets-ec-cart`.
- `ain` definio criterios de aceptacion para el MVP de cupones y reviso maquetas con Mariana, incluyendo reglas de eliminacion de descuentos automaticos.
- `seba` avanzo en el flujo visual y funcional del campo de cupon en carrito, agregando estados de error, icono de alerta, estilos y pruebas locales con carrito real.
- Se coordino con Alan/TI el ajuste del endpoint para cambiar respuestas tipo `not found` por mensajes funcionales como `cupon invalido`.

### 2. Checkout, pagos y estabilidad operacional
- `ain` detecto un error 500 en `/v1/carro/entrega/despacho` y luego reviso el flujo completo de compra en Checkout Web 3.0.
- Quedo trazabilidad de errores en pasarela de pagos, incluyendo la transaccion `#102190241`.
- Se realizaron ajustes en `monitoring-ecommerce-web`: reduccion de artefactos, videos opt-in y correccion de timezone Chile.
- El monitoreo de checkout y pagos siguio siendo un frente sensible por su impacto directo en conversion y continuidad operacional.

### 3. SEO, PDP/PLP, Retail Rocket y performance
- `ain` dio seguimiento al `Issue #155`, reviso `#151` y `#154`, marco duplicidad entre rendimiento de carrusel y fix de script Retail Rocket, y participo en la apertura del `Issue #167` para imagenes WebP sin fondo.
- Se inspecciono la carga de scripts de Retail Rocket en home con DevTools, con foco en rendimiento.
- `seba` coordino el paso a produccion de `#148` y `#155`, cerrando parte importante del ciclo de mejoras frontend/SEO.
- Tambien aparecio trabajo complementario en Modyo y widgets reutilizables para landings.

### 4. Campanas y operacion comercial
- La semana mantuvo continuidad de `Dia del Padre` y salida de `Intel Ultra` / `Intel Ultra Pro`.
- Se preparo `Vacaciones de Invierno` para la semana siguiente, incluyendo landings, graficas, productos y destacados.
- Se ejecuto la activacion `Solo por Pocas Horas` y se comenzo a coordinar `Intel Gamer` para julio.
- El trabajo de campanas estuvo muy concentrado en `seba`, con apoyo de `ain` en validaciones, banners, Modyo y reuniones operativas.

### 5. Stock, mayoristas, Subtel y testing
- `ain` reviso stock mayorista, herramienta de inventario y flujos manuales de sincronizacion para asegurar integridad de datos.
- Se levanto el requerimiento `QR Subtel PCF`, con necesidad de definir campo en `Sphinx` para catalogo regulado y publicacion de informacion tecnica/PDF por producto.
- El cierre de semana incorporo discusion sobre Vitest, Gherkin y adopcion de testing como parte del flujo de desarrollo.
- `seba` tambien dejo pendiente adoptar testing en futuros desarrollos tras la revision uno a uno.

## Resumen por persona

### ain
- Trabajo en definicion funcional, QA operativo y seguimiento transversal.
- Empujo criterios de cupones, monitoreo de checkout, errores de pago/despacho, seguimiento SEO/PDP, revision de Retail Rocket y validacion de stock mayorista.
- Tambien conecto frentes de negocio con implementacion: campañas, QR Subtel, Modyo, testing y Portal Admin.
- Su semana muestra alta fragmentacion, pero con foco claro en destrabar riesgos operativos y ordenar definiciones tecnicas.

### seba
- Trabajo principalmente sobre implementacion de cupones, salida de issues `#148` y `#155`, operacion de campanas y landings.
- Avanzo en estados visuales de cupones, validacion local del mensaje `Cupon invalido`, y soporte a Modyo / Mini Totems Peru.
- Sostuvo la preparacion de `Vacaciones de Invierno`, `Intel Ultra`, `Dia del Padre`, `Solo por Pocas Horas` e `Intel Gamer`.
- Dejo riesgos claros para seguimiento: QR Subtel dependiente de `Sphinx`, bug de Modyo al clonar espacios y necesidad de testing.

## Hallazgos de gestion
- La semana muestra buena complementariedad: `ain` ordena definiciones, riesgos y seguimiento tecnico; `seba` ejecuta frontend/campanas y materializa componentes.
- `Cupones` ya no esta solo en refinamiento: hay implementacion activa, pruebas locales y dependencia concreta del endpoint.
- `#155` avanza a produccion, pero sigue relacionado con frentes SEO/PDP que requieren seguimiento posterior.
- El trabajo de campanas depende fuertemente de contenido, graficas, productos y feedback comercial; conviene mantener un flujo mas estructurado de requisitos para landings.

## Riesgos y alertas
- Error 500 en despacho y errores de pasarela de pagos pueden impactar conversion si no se cierran con trazabilidad tecnica.
- Cupones depende de consistencia entre frontend, mensajes del endpoint y reglas funcionales acordadas.
- QR Subtel queda bloqueado por definicion de campo y disponibilidad de datos desde `Sphinx`.
- Bug de Modyo al clonar espacios requiere reproduccion formal para escalar a soporte.
- Falta aterrizar el uso de testing en un flujo concreto para los proximos desarrollos.

## Recomendaciones operativas
- Cerrar un checklist tecnico-funcional de cupones: endpoint, mensajes, estados visuales, reglas de aplicacion y casos de QA.
- Formalizar bugs de checkout/despacho/pagos con evidencia reproducible y responsable tecnico.
- Bajar QR Subtel a requerimiento con dependencias explicitas de `Sphinx`, API, PDF/test report y criterio de productos visibles.
- Definir un template de solicitud de landings/campanas para reducir retrabajo por informacion incompleta.
- Elegir un primer flujo de prueba con Vitest/Gherkin para no dejar testing solo como intencion.

## Propuesta de lectura gerencial
- La semana del `15-06` al `21-06` fue una semana de ejecucion y estabilizacion: cupones entro en desarrollo, `#148` y `#155` avanzaron a produccion, y el equipo sostuvo campanas comerciales relevantes.
- El principal valor estuvo en convertir definiciones previas en trabajo tecnico concreto, mientras se mantenian controles operativos sobre checkout, pagos, stock y campanas.
- La principal alerta es que varios frentes siguen dependiendo de terceros o de definiciones externas: endpoints, `Sphinx`, soporte Modyo, feedback comercial y adopcion de testing.
