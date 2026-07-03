# Informe semanal desarrollo eCommerce

## Periodo
- Semana analizada: `2026-06-22` a `2026-06-28`
- Equipo: `ain` y `seba`
- Fecha de generacion: `2026-07-02`

## Fuentes consideradas
- Bitacoras en [[bitacora/inbox/ain/junio/22-06-2026]], [[bitacora/inbox/ain/junio/23-06-2026]], [[bitacora/inbox/ain/junio/24-06-2026]], [[bitacora/inbox/ain/junio/25-06-2026]] y [[bitacora/inbox/ain/junio/26-06-2026]]
- Bitacora en [[bitacora/inbox/seba/junio/22-06-2026]]
- Pendientes consolidados en [[bitacora/pendientes/ain-pcfactory]] y [[bitacora/pendientes/seba-pcfactory]] como contexto de arrastre
- Este informe se basa en bitacoras disponibles; la cobertura de `seba` para esta semana es parcial

## Enlaces relacionados
- [[bitacora/inbox/ain/junio/22-06-2026]]
- [[bitacora/inbox/ain/junio/23-06-2026]]
- [[bitacora/inbox/ain/junio/24-06-2026]]
- [[bitacora/inbox/ain/junio/25-06-2026]]
- [[bitacora/inbox/ain/junio/26-06-2026]]
- [[bitacora/inbox/seba/junio/22-06-2026]]

## Cobertura y criterio
- `ain`: 5 bitacoras registradas dentro de la semana analizada.
- `seba`: 1 bitacora registrada dentro de la semana analizada, con secciones de desarrollo y gestion pendientes de completar.
- No hay evidencia escrita para `27-06` ni `28-06`.
- La comparacion entre personas no debe leerse como comparacion de carga real, porque la cobertura de registro es desigual.

## Resumen ejecutivo
- La semana estuvo marcada por planificacion de landings/W26, monitoreo SEO, integraciones con Loadstone, control de SKUs, alertas SPHINX, discrepancias de precios y continuidad del frente de cupones en carro.
- `ain` concentro casi toda la evidencia escrita de la semana, con un rol de monitoreo tecnico-operativo y gestion transversal entre SEO, Merchant Center, SPHINX, pricing, Notion y repositorios e-commerce.
- `seba` registra continuidad de `Vacaciones de Invierno` y salida de `Solo por Pocas Horas`, pero su bitacora del periodo esta incompleta en desarrollo, reuniones y pendientes.
- La semana deja una lectura clara: el equipo paso de ejecucion de campanas y cupones a una fase de control operacional, vigilancia de calidad de datos y ordenamiento de backlog para la semana siguiente.

## Metricas

### Actividad registrada
| Metrica | ain | seba | Total |
| --- | ---: | ---: | ---: |
| Bitacoras de la semana | 5 | 1 | 6 |
| Dias con desarrollo activo documentado | 5 | 0 | 5 |
| Dias con trabajo de campanas documentado | 3 | 1 | 4 |
| Dias con reuniones / gestion documentadas | 5 | 0 | 5 |
| Dias con bloqueos o alertas explicitas | 4 | 0 | 4 |

### Produccion y seguimiento
| Metrica | ain | seba | Total |
| --- | ---: | ---: | ---: |
| Repositorios o sistemas mencionados | 5 | 0 | 5 |
| Incidentes, alertas o riesgos registrados | 5 | 0 | 5 |
| Campanas / activaciones mencionadas | 3 | 2 | 4 unicas |
| Frentes recurrentes de gestion | 6 | 1 | 6 unicos |

## Principales frentes trabajados

### 1. Roadmap de landings, W26 y Search Console
- `ain` reviso metricas en Search Console e identifico caida de clics en paginas especificas.
- Se levantaron problemas de indexacion que requieren seguimiento tecnico/SEO.
- Se definieron requisitos para nuevas landings y planificacion asociada a W26.
- El frente deja pendiente bajar acciones de indexacion a tareas o requerimientos concretos.

### 2. Loadstone, carruseles via API y Merchant Center
- Se revisaron iniciativas de integracion con Loadstone, especialmente carruseles via API.
- Se coordino con Jose Molina y Maria Jose la implementacion de carruseles y el monitoreo de precios.
- Merchant Center aparece como riesgo por posibles discrepancias de precios entre feed y experiencia web.
- El frente queda abierto para definir siguientes pasos tecnicos de integracion y monitoreo.

### 3. Cupones en carro y control de cambios
- La semana registra seguimiento a cambios en `pcfactory-widgets-ec-cart`: controles de cupones aplicados, notificaciones en resumen de compra, render condicional y mensajes visuales.
- El foco ya no es solo implementar el campo de cupon, sino validar comportamiento completo de cupones aplicados/removidos en carro y resumen.
- Se mantiene pendiente validar los comportamientos de cupones frente a reglas funcionales y posibles edge cases.

### 4. SKUs, SPHINX, facturacion y precios
- Se monitorearon alertas preventivas sobre carga de SKUs, incluyendo incremento de 11 items reportado por Alejandro Cristi.
- Se revisaron alertas SPHINX asociadas a limites de facturacion electronica.
- Se detectaron discrepancias de precios entre tiendas fisicas y web, con riesgo para pricing, comunicacion comercial y experiencia de usuario.
- Tambien se validaron transacciones criticas en SPHINX como parte del cierre de ciclo operativo.

### 5. Plan de medios, backlog y gestion TI
- Se coordino con Raul Bahamondes el ajuste del plan de medios digital.
- Se realizo 1:1 con Sebastian Lorca para revisar desempeño y pendientes.
- Se actualizo backlog en Notion para la unidad de Gestion TI.
- El cierre de semana queda orientado a continuidad: cupones, SPHINX, backlog y seguimiento operacional.

### 6. Campanas: Vacaciones de Invierno y Solo por Pocas Horas
- `seba` registro continuidad de `Vacaciones de Invierno`.
- Tambien se gestiono la salida de `Solo por Pocas Horas`, activada a las `12:30` con vigencia hasta las `00:00` del `22-06-2026`.
- La bitacora de `seba` tiene secciones pendientes, por lo que no es posible reconstruir con precision otros avances de la semana desde esa fuente.

## Resumen por persona

### ain
- Lidero la evidencia documentada de la semana con foco en SEO, integraciones, calidad de datos, alertas operativas y seguimiento de repositorios.
- Trabajo sobre Search Console, indexacion, roadmap de landings, Loadstone, Merchant Center, SKUs, SPHINX, facturacion, precios y cupones en carro.
- Tambien sostuvo coordinaciones con Jose Molina, Maria Jose, Raul Bahamondes y Sebastian Lorca.
- Su rol fue principalmente de control, seguimiento y ordenamiento operativo para disminuir riesgos de negocio y preparar continuidad.

### seba
- La evidencia disponible muestra trabajo en campanas, especificamente `Vacaciones de Invierno` y `Solo por Pocas Horas`.
- No hay detalle suficiente de desarrollo ni reuniones para evaluar continuidad de cupones, QR Subtel, Modyo o landings mas alla del registro del lunes.
- La bitacora parcial limita la lectura del aporte semanal, por lo que conviene completar o reconstruir los dias faltantes si se necesita un informe gerencial mas preciso.

## Hallazgos de gestion
- La semana muestra un cambio de foco hacia monitoreo y control operacional: datos, precios, integraciones, SKUs y transacciones criticas.
- Hay una dependencia fuerte entre campanas, calidad de datos y sistemas core como SPHINX, Merchant Center y widgets de carro.
- La cobertura de bitacora desigual reduce visibilidad del trabajo de `seba`; esto puede distorsionar metricas semanales si no se corrige.
- Los frentes abiertos requieren conversion a tareas accionables: indexacion, precios, SKUs, cupones, carruseles API y SPHINX.

## Riesgos y alertas
- Caida de clics e incidencias de indexacion en paginas especificas.
- Discrepancias de precios entre feed Merchant Center, tiendas fisicas y web.
- Incremento inesperado de SKUs sin origen confirmado.
- Limites de facturacion electronica en SPHINX.
- Cobertura incompleta de bitacora de `seba`, que limita trazabilidad y seguimiento.

## Recomendaciones operativas
- Crear tareas concretas para cada alerta SEO/indexacion detectada en Search Console.
- Definir un mecanismo de monitoreo de precios entre Merchant Center, tienda fisica y web.
- Confirmar origen del incremento de 11 SKUs y dejar criterio de alerta para futuros cambios.
- Cerrar con Loadstone una lista corta de siguientes pasos para carruseles via API.
- Completar o reconstruir bitacoras de `seba` del `23-06` al `26-06` si el informe se usara para evaluacion semanal.

## Propuesta de lectura gerencial
- La semana del `22-06` al `28-06` fue una semana de control operacional y preparacion de continuidad: se revisaron alertas SEO, precios, SKUs, SPHINX, integraciones y cambios del carro asociados a cupones.
- El avance mas claro esta en la capacidad de detectar riesgos temprano y conectarlos con sistemas concretos: Search Console, Merchant Center, SPHINX, repositorios e-commerce y Notion.
- La principal debilidad del periodo es la trazabilidad parcial de `seba`, por lo que cualquier lectura de productividad del equipo debe separarse de la cobertura documental disponible.
