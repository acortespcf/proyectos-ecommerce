# Informe semanal desarrollo eCommerce

## Periodo
- Semana analizada: `2026-06-01` a `2026-06-07`
- Equipo: `ain` y `seba`
- Fecha de generacion: `2026-06-10`

## Fuentes consideradas
- Bitacoras en [[bitacora/inbox/ain/junio/01-06-2026]], [[bitacora/inbox/ain/junio/02-06-2026]], [[bitacora/inbox/ain/junio/03-06-2026]], [[bitacora/inbox/ain/junio/04-06-2026]] y [[bitacora/inbox/ain/junio/05-06-2026]]
- Bitacoras en [[bitacora/inbox/seba/junio/03-06-2026]], [[bitacora/inbox/seba/junio/04-06-2026]] y [[bitacora/inbox/seba/junio/05-06-2026]]
- Pendientes consolidados en [[bitacora/pendientes/ain-pcfactory]] y [[bitacora/pendientes/seba-pcfactory]]
- Validacion posterior en [[bitacora/inbox/ain/junio/08-06-2026]] y [[bitacora/inbox/ain/junio/09-06-2026]] para confirmar arrastres, cierres y cambios de prioridad del periodo analizado

## Enlaces relacionados
- [[bitacora/pendientes/ain-pcfactory]]
- [[bitacora/pendientes/seba-pcfactory]]
- [[bitacora/inbox/ain/junio/01-06-2026]]
- [[bitacora/inbox/ain/junio/02-06-2026]]
- [[bitacora/inbox/ain/junio/03-06-2026]]
- [[bitacora/inbox/ain/junio/04-06-2026]]
- [[bitacora/inbox/ain/junio/05-06-2026]]
- [[bitacora/inbox/ain/junio/08-06-2026]]
- [[bitacora/inbox/ain/junio/09-06-2026]]
- [[bitacora/inbox/seba/junio/03-06-2026]]
- [[bitacora/inbox/seba/junio/04-06-2026]]
- [[bitacora/inbox/seba/junio/05-06-2026]]

## Cobertura y criterio
- `ain`: 5 bitacoras registradas en la semana analizada.
- `seba`: 3 bitacoras registradas en la semana analizada.
- La comparacion entre personas debe leerse con cautela: una parte de la diferencia responde a cobertura de registro, no necesariamente a carga real de trabajo.
- Las metricas se basan en evidencia escrita de bitacora y pendientes, no en tiempo dedicado ni esfuerzo real.

## Resumen ejecutivo
- El foco del area estuvo repartido entre cuatro frentes principales: campanas comerciales, definiciones funcionales para cupones, automatizacion de procesos internos y mejoras tecnicas SEO/performance.
- Tambien aparecieron dos lineas complementarias que no conviene perder de vista: levantamiento de trabajo para correos transaccionales/comerciales y definicion operativa del cambio de `3` a `4` bodegas por tienda con stock de exhibicion visible en web.
- `ain` concentro mayor carga en definicion tecnica, automatizaciones, levantamiento de issues y seguimiento transversal de iniciativas.
- `seba` concentro mayor carga en operacion de campanas, seguimiento funcional y coordinacion de salidas comerciales y ajustes post-freeze.
- El equipo avanzo bien en articulacion negocio-desarrollo, pero queda una cola importante de pendientes abiertos: `75` items en el consolidado de `ain` y `13` items en el consolidado de `seba`.
- La validacion hecha el `08-06` y `09-06` confirma que los principales arrastres de la semana fueron tabulaciones, cupones y correcciones de checkout asociadas a `Rutpay`/`RUT`; tambien muestra que tabulaciones escalo de iniciativa en avance a prioridad maxima operativa.

## Metricas

### Actividad registrada
| Metrica | ain | seba | Total |
| --- | ---: | ---: | ---: |
| Bitacoras de la semana | 5 | 3 | 8 |
| Dias con desarrollo activo | 5 | 3 | 8 |
| Dias con trabajo de campanas | 4 | 3 | 7 |
| Dias con reuniones / gestion activas | 3 | 2 | 5 |
| Dias con bloqueos o alertas explicitas | 1 | 1 | 2 |

### Produccion y seguimiento
| Metrica | ain | seba | Total |
| --- | ---: | ---: | ---: |
| Issues nuevas detectadas o empujadas desde bitacora | 11 | 0 | 11 |
| Issues existentes con seguimiento explicito | 4 | 2 | 6 |
| PRs o workflows mencionados | 1 | 0 | 1 |
| Campanas activas tocadas | 2 | 4 | 4 unicas |
| Pendientes abiertos en consolidado actual | 75 | 13 | 88 |

## Principales frentes trabajados

### 1. Campanas y operacion comercial
- Ajustes y cierre operativo de `Cyber`.
- Preparacion y cambios de `Dia del Padre`.
- Coordinacion de salida de `Papa mundialero`.
- Ajustes operativos de `Ofertas flash` para desacoplarla del cierre de `Cyber`.
- Actualizacion de landings, productos, graficas, metas y estructuras de categorias.

### 2. Cupones y definicion funcional
- Levantamiento inicial de definiciones funcionales para `same day`, mensajes de cupones y comportamiento UX de `Rutpay`.
- Refinamiento funcional con equipos de `TI`, `Operaciones`, `Comercial` y `e-Commerce`.
- Ajuste de definiciones para la salida de cupones y su comportamiento en checkout.
- Identificacion de dos correcciones post-freeze en checkout: modal de `Rutpay` y mensaje de error de `RUT`.
- Revision adicional de cambio de `3` a `4` bodegas por tienda, con criterio acordado para que el stock de exhibicion tambien sume al stock visible en web.

### 3. Automatizacion interna
- Avance en flujo automatizado de tabulaciones.
- Avance en automatizacion de bitacora diaria y consolidacion de pendientes.
- Trabajo en generacion automatica de data sources para campanas.
- Apertura de frente de correos con issues `#158`, `#159` y `#160`, mas milestone dedicado para ordenar ese backlog.

### 4. SEO, performance y monitoreo
- Trabajo inicial sobre tabulaciones faltantes para `mouse` y levantamiento en Notion de mejoras visuales / SEO para `PLP` y `PDP`.
- Analisis de indexacion y creacion de issues para sitemap y URLs excluidas.
- Creacion y bajada de epic de `Core Web Vitals` con HDUs priorizadas.
- Ajustes a `monitoring-ecommerce-web` para ejecuciones individuales por monitor.

## Resumen por persona

### ain
- Combino trabajo tecnico de discovery, documentacion, automatizacion y bajada a backlog.
- Impulso visible en creacion y estructuracion de trabajo: `#156`, `#157`, `#158`, `#159`, `#160`, `#161`, `#162`, `#163`, `#164`, `#165`, `#166`.
- Lidero o empujo tres lineas de impacto alto: tabulaciones para PMs, Core Web Vitals y definicion tecnica SEO/indexacion.
- Tambien abrio y ordeno el frente de correos en milestone propio, ademas de levantar criterios funcionales para stock de exhibicion / cuarta bodega.
- Tambien absorbio coordinacion transversal de campanas, seguimiento a Sebastian y consolidacion operativa de pendientes.

### seba
- Se concentro en ejecucion y seguimiento funcional de campanas, especialmente `Cyber`, `Dia del Padre` y `Papa mundialero`.
- Mantuvo avance sobre `#148` y preparacion de `#155` para paso a produccion.
- Participo activamente en refinamiento de cupones y detecto necesidades concretas post-freeze para checkout.
- Tambien dejo encaminado un fix para refactorizar la `franja features` y alinearla con la salida comercial de la semana siguiente.
- Su registro muestra un perfil mas operativo y de coordinacion que de generacion de backlog tecnico.

## Hallazgos de gestion
- Hay una buena complementariedad de roles: `ain` empuja discovery, definicion y backlog; `seba` empuja operacion comercial, ejecucion funcional y seguimiento de salida.
- El area esta reaccionando a multiples frentes a la vez, pero los pendientes muestran riesgo de dispersion, especialmente en `ain`.
- La cobertura de bitacora de `seba` mejora al sumar `3` registros en la semana, pero aun es menor que la de `ain`; conviene sostener el registro diario para mejorar trazabilidad.
- Los bloqueos mas concretos de la semana quedaron ligados al `freeze` y a dependencias con otras areas, no a impedimentos tecnicos internos del equipo.
- Varias tareas relevantes de la semana dependen de terceros incluso cuando el equipo de desarrollo ya avanzo su parte: planilla de IDs para `Dia del Padre`, disponibilidad de TI para QA de cuarta bodega y cierre de definiciones funcionales de cupones.

## Riesgos y alertas
- Riesgo de sobrecarga en `ain`: backlog consolidado muy superior al resto del equipo y con mezcla de discovery, seguimiento, definicion y soporte operativo.
- Riesgo de arrastre post-freeze en checkout: dos correcciones de `Rutpay` y validacion de `RUT` quedaron pendientes de ejecucion.
- Riesgo de dispersion en tabulaciones: la semana cerro con avance tecnico, pero la validacion posterior confirma que el frente paso a prioridad maxima y con expectativa de dejar flujo usable por PMs no tecnicos en muy corto plazo.
- Riesgo de trazabilidad desigual: las metricas de `seba` siguen potencialmente subrepresentadas por menor cantidad de bitacoras respecto de `ain`.
- Riesgo de dependencia externa en frentes operativos: parte del avance comercial y de validacion tecnica sigue atado a insumos de otras areas, especialmente IDs para campañas y validacion TI del cambio de bodegas.

## Recomendaciones operativas
- Separar cada semana en tres vistas minimas: `entregado`, `en curso`, `bloqueado`, para que el backlog no crezca solo como lista plana.
- Definir un top `5` semanal compartido del area para distinguir foco real de ruido operativo.
- Mantener bitacora diaria para ambos y cerrar explicitamente pendientes completados, para que las metricas semanales sean mas confiables.
- Revisar si parte del backlog de `ain` puede reasignarse, delegarse o archivarse por prioridad real.

## Ajustes posteriores al cierre semanal
- Cupones: el seguimiento del `08-06` y `09-06` confirma que el refinamiento de la semana pasada si decanto en definiciones concretas para `Fase 1` y `Fase 2`; el pendiente abierto ya no parece ser la propuesta base, sino validar restricciones y letra chica minima antes de cerrar la bajada de checkout.
- Tabulaciones: lo que en la semana aparecia como automatizacion en progreso quedo re-priorizado como entrega critica de corto plazo, con expectativa explicita de flujo operable para PMs no tecnicos y apoyo desde Google Sheets.
- Checkout / pagos: las dos correcciones post-freeze (`modal Rutpay` y mensaje de error de `RUT`) siguen vigentes y se sostienen como arrastre real del periodo.
- El error critico de `Webpay` aparece recien el `08-06`, por lo que no cambia la lectura de la semana analizada, pero si aumenta el riesgo operativo con el que el equipo arranca la semana siguiente.
- Pendientes: la actualizacion del consolidado al `10-06` baja marginalmente la cola de `ain` de `76` a `75` abiertos; no cambia la lectura de sobrecarga, pero si confirma una poda menor del backlog.
- Trazabilidad externa: la planilla de seguimiento seguia devolviendo `401` al `10-06`, asi que la validacion posterior se sostiene principalmente sobre bitacoras y consolidados locales.

## Propuesta de lectura gerencial
- La semana pasada el area de desarrollo de eCommerce opero en modo mixto: soporte comercial fuerte por campanas, refinamiento funcional de cupones, y al mismo tiempo construccion de base tecnica para mejoras SEO, performance y automatizacion interna.
- En paralelo, el equipo tambien abrio trabajo estructural que probablemente seguira impactando semanas siguientes: backlog de correos y definiciones para stock de exhibicion / cuarta bodega.
- `ain` concentro la mayor traccion tecnica y de estructuracion del backlog, mientras `seba` concentro la operacion de campanas y el seguimiento funcional de salidas y ajustes.
- El equipo muestra avance y cobertura sobre frentes relevantes del negocio, pero necesita podar foco y mejorar disciplina de cierre de pendientes para que la carga operativa no opaque la ejecucion prioritaria.
