# Pendientes PCFactory


## Estado
- Responsable: `ain`
- Fuente principal: lista `pcfactory` en Recordatorios
- Ultima actualizacion: `2026-06-09`
- Ultimo conteo conocido en Recordatorios: `43`

## Criterio de uso
- Este archivo consolida pendientes activos y clasificados.
- `inbox/` queda reservado para bitacora diaria e historial de avance.
- Recordatorios sigue siendo la fuente rapida de captura; este markdown es la vista operativa.
- Al revisar pendientes, tambien conviene mirar bitacoras recientes para detectar siguientes pasos que aun no fueron consolidados aqui.
- Tambien conviene revisar Notion en `Tareas` y `Reuniones` para rescatar items activos, acuerdos o siguientes pasos.
- Cada item indica su origen con `Fuente:` para saber donde cerrarlo o actualizarlo.

## Enlaces relacionados
- [[bitacora/inbox/ain/junio/01-06-2026]]
- [[bitacora/inbox/ain/junio/02-06-2026]]
- [[bitacora/inbox/ain/junio/03-06-2026]]
- [[bitacora/inbox/ain/junio/04-06-2026]]
- [[bitacora/inbox/ain/junio/05-06-2026]]
- [[bitacora/inbox/ain/junio/08-06-2026]]
- [[bitacora/inbox/ain/junio/09-06-2026]]
- [[bitacora/informes/2026-06-01-al-2026-06-07-desarrollo-ecommerce]]

## Críticos
- [x] Destrabar el error critico de Webpay: el token de Transbank no se registra en la tabla de pedidos y la compra se anula automaticamente. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]]`
- [ ] Prioridad máxima: cerrar un flujo operable de tabulaciones automaticas para PMs no técnicos, incluyendo implementación, salida en Google Sheets y material explicativo sin terminal ni agentes de IA. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]], Notion/Analisis Tabulaciones, Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]]`
- [ ] Coordinar el paso a producción y seguimiento operativo del monitor de payments con Rutpay `monitoring-ecommerce-web#20`, ya mergeado. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]], GitHub, revision repos 09-06-2026`
- [ ] Dar seguimiento al milestone de correos 
- [ ] Dar seguiriento a  los issues `ISSUE-158`, `ISSUE-159` e `ISSUE-160`. `Fuente: Conversacion actual, GitHub, Notion/Reuniones`
- [ ] Completar las issues de correos con la informacion que tiene Sebastian del desarrollo. `Fuente: Bitacora [[bitacora/inbox/ain/junio/03-06-2026|03-06-2026]]`
- [ ] Ver perfiles sphinx con raúl. `Fuente: Recordatorios`
- [ ] Crear tarjeta para corregir modal rutpay y input rut en el checkout
- [ ] Agregar maquetas en la tarjeta pdp y plp [issue 155](https://github.com/acortespcf/proyectos-ecommerce/issues/155)



## Hoy
- [ ] Consolidar el flujo automatico de tabulaciones usando los resultados obtenidos con notebooks y dejar una salida operable para PMs desde Google Sheets. `Fuente: Recordatorios, Bitacoras [[bitacora/inbox/ain/junio/04-06-2026|04-06-2026]] y [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]]`
- [ ] Actualizar el requerimiento de Ley de Datos especificando en que vistas exactas se pedira el consentimiento y revisar con Mariana los textos legales. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]]`
- [ ] Monitorear con Romina el despliegue del backend de textos SEO para PDP de la issue `#149`. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]]`
- [ ] Confirmar con Romina la ejecucion de la carga masiva usando la planilla de Ale. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]]`
- [ ] Apoyar a Alejandro con la actualizacion del sitemap. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]], Notion/sitemap`
- [ ] Monitorear si el despliegue del codigo `v0.2` de Loadstone mejora efectivamente la velocidad de carga del sitio. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], Reunion Loadstone`
- [ ] Definir con Sebastian y el equipo si el PAP de manana incluye estilos y landings o si conviene mover ese bloque completo a la proxima semana. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], coordinacion con Sebastian`
- [ ] Validar con marketing o con los solicitantes de cupones la letra chica minima obligatoria para cerrar la propuesta de checkout. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], Reunion iniciativas / cupones`

## Notion / Tareas activas
- [ ] Revisar si `Modernizacion del checkout` debe entrar a mis pendientes activos o quedar solo como seguimiento - Notion: https://app.notion.com/p/2d5b136822478033859ae192d8157c15. `Fuente: Notion/Tareas`
- [ ] Revisar alcance de `Mejoras visuales y de seo PLP y PDP` (`Alta`, `Por iniciar`) y decidir si entra al foco activo - Notion: https://app.notion.com/p/372b1368224780fe9a6fe7154bb1f92a. `Fuente: Notion/Tareas`

## Esta semana
- [ ] Crear requerimiento meta robots. `Fuente: Recordatorios`
- [ ] Crear requerimiento url canonical para familias desde sphinx. `Fuente: Recordatorios`
- [ ] Actualizar requerimiento. `Fuente: Recordatorios`
- [ ] Bajar al requerimiento de cupones los acuerdos del refinamiento y dejar trazabilidad en la issue. `Fuente: Bitacora [[bitacora/inbox/ain/junio/04-06-2026|04-06-2026]], Notion/Reuniones`
- [ ] Dar seguimiento a la epic `#161` de Core Web Vitals y priorizar ejecucion de las HDUs `#162`, `#163`, `#164`, `#165` y `#166`. `Fuente: Bitacora [[bitacora/inbox/ain/junio/04-06-2026|04-06-2026]], docs/planes-issues/2026-06-04-epic-core-web-vitals.md`
- [ ] Agregar un monitor de la pdp que revise si la tabulacion tiene o no. `Fuente: Recordatorios`
- [ ] Agregar al backlog todos los pasos que se han hecho al monitor ecommerce. `Fuente: Recordatorios`
- [ ] Agregar al backlog todos los pasos que se han hecho del monitor mayoristas. `Fuente: Recordatorios`
- [ ] Preparar la PPT final y cerrar la bajada operativa del flujo de tabulaciones para PMs no tecnicos. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]] y [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]]`

## Proxima semana
- [ ] Aplicar correcciones sitemap. `Fuente: Recordatorios, Notion/Reuniones`
- [ ] Crear requerimiento sitemap automatico. `Fuente: Recordatorios`
- [ ] Hacer QA al desarrollo de separacion de usuario. `Fuente: Conversacion actual`
- [ ] Hacer QA al cambio de bodegas de exhibicion en tiendas, validando que el stock se sume al stock de tienda visible en la web. `Fuente: Conversacion actual, Bitacora [[bitacora/inbox/ain/junio/03-06-2026|03-06-2026]], Notion/Reuniones`
- [ ] Tener reunion el miercoles con Maria Jose, Alejandro y Pedro para revisar tabulaciones. `Fuente: Conversacion actual`

## Desarrollo / Implementacion
- [ ] Agregar fetchpriority="high" en las landings. `Fuente: Recordatorios`
- [ ] Mover script de retail rocket mas arriba. `Fuente: Recordatorios`
- [ ] Corregir el schema en PDP para que muestre los mismos precios que la red y quede inyectado en el `head`, visible en el codigo fuente inicial para Google. `Fuente: Recordatorios, Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], coordinacion con Sebastian`
- [ ] Cambiar la imagen de 500 a la 1000 en la galeria y agregar alt y title a las imagenes. `Fuente: Recordatorios`
- [ ] Ver si podemos mandar el nombre del usuario del formulario de envio. `Fuente: Recordatorios`
- [ ] Revisar en la api de los productos cuantos H1 hay en la pdp. `Fuente: Recordatorios, Notion/Reuniones`
- [ ] Validar si los nuevos estilos y animaciones de FAQ en PDP se pueden resolver solo con CSS sin tocar la estructura actual de `summary` y `details`. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], coordinacion con Sebastian`
- [ ] Investigar el bug donde el listado de productos se rompe al intentar cargar 85 productos o mas. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], coordinacion con Sebastian`
- [ ] Corregir la inconsistencia entre el contador del filtro y la cantidad real de productos visibles en PLP. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], coordinacion con Sebastian`

## Monitores / Automatizacion
- [ ] Agregar un monitor de los productos. `Fuente: Recordatorios`
- [ ] Agregar al monitor de categorias / productos la cantidad de productos totales que tenemos. `Fuente: Recordatorios`
- [ ] Generar script para monitorear los alts y los titles de las pdp. `Fuente: Recordatorios`
- [ ] Tengo que hacer un script para sacar el numero de id que le falta alt y title. `Fuente: Recordatorios`
- [ ] Averiguar si podemos actualizar el feed solo con los cambios para que el run sea mas corto. `Fuente: Recordatorios`
- [ ] Dar seguimiento al PR `monitoring-ecommerce-web#19` para validar los runs individuales por monitor. `Fuente: Conversacion actual, GitHub`
- [ ] Incorporar el despliegue del monitor de Rutpay al seguimiento de monitores ecommerce. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]], GitHub`

## Requerimientos / Definicion
- [ ] Crear requerimiento ordenamiento de paginas de categorias. `Fuente: Recordatorios`
- [ ] Revisar, refinar y crear requerimiento `same day`. `Fuente: Conversacion actual; pendiente de bajar a Recordatorios o Notion`
- [ ] Revisar, refinar y crear requerimiento de retiro en centro de distribucion de curriers (`Starken`, `Chilexpress`, `Bluexpress`, etc.). `Fuente: Conversacion actual; pendiente de bajar a Recordatorios o Notion`
- [ ] Crear requerimiento para arreglar el menu. `Fuente: Recordatorios`
- [ ] Crear requerimiento para arreglar el menu (desktop). `Fuente: Recordatorios`
- [ ] Crear requerimiento para arreglar el menu (mobile). `Fuente: Recordatorios`
- [ ] Crear requerimiento para arreglar los filtros (que se puedan combinar). `Fuente: Recordatorios`
- [ ] Crear tarjeta para corregir dimensiones del logo mobile navbar. `Fuente: Recordatorios`
- [ ] Hay que hacer un requerimiento para que hayan faqs en la plp y faqs en las pdp. `Fuente: Recordatorios`
- [ ] Se quiero incluirle FAQs a los productos (desde modyo o desde sphinx). `Fuente: Recordatorios`
- [ ] Armar formato de bitacora. `Fuente: Recordatorios`

## Seguimiento / Coordinacion
- [ ] Hablar con la majo sobre las cuentas de copilot. `Fuente: Recordatorios`
- [ ] Hablar con Nicolas de b2b del formulario. `Fuente: Recordatorios`
- [ ] Hablar sobre los monitores pasarlos a PCF. `Fuente: Recordatorios`
- [ ] Hablar con Molina y Nuno para alinear el footer de los correos promocionales con el diseno vigente del eCommerce. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], Reunion iniciativas / cupones`
- [ ] Dar seguimiento a Sebastian sobre [issue 149](https://github.com/acortespcf/proyectos-ecommerce/issues/149), [issue 155](https://github.com/acortespcf/proyectos-ecommerce/issues/155) y landing del Dia del Padre. `Fuente: Bitacora [[bitacora/inbox/ain/junio/03-06-2026|03-06-2026]]`
- [ ] El lunes vamos a hacer una lista de las fechas en las que necesitamos los contenidos para las landings. `Fuente: Recordatorios`
- [ ] Revisar prioridades para tomar lo de algolia (user token). `Fuente: Recordatorios`
- [ ] Revisar con quien corresponda el bloqueo de `ClaudeBot`, `Claude-SearchBot` y `Claude-User` para que Claude pueda descubrir productos de PCF. `Fuente: Bitacora [[bitacora/inbox/ain/junio/08-06-2026|08-06-2026]]`
- [ ] Si aparecen productos raros en el carrusel de populares, enviar SKU / ID a Loadstone antes de que rote el ciclo de 24 horas. `Fuente: Bitacora [[bitacora/inbox/ain/junio/09-06-2026|09-06-2026]], Reunion Loadstone`

## Investigacion / Evaluacion
- [ ] Hacer QA de usuario web. `Fuente: Recordatorios`
- [ ] Hacer un benchmark de como nos afecta el tiempo de despacho / retiro. `Fuente: Recordatorios`
- [ ] Preguntar si podemos cambiar formato de imagenes a WEBP sin quitarles el fondo aun (fase 1). `Fuente: Recordatorios`
- [ ] PEDIR a modyo comprimir los js y css que cargan en el sitio al comienzo. `Fuente: Recordatorios`

## Otros pendientes abiertos
- [ ] Agregar columna mayoristas en planilla stock productos. `Fuente: Recordatorios`
- [ ] Hacer un listado de planillas que tenemos y ordenarlas (unificarlas). `Fuente: Recordatorios`

## Notas
- Hay posible duplicidad en requerimientos de menu: general, desktop y mobile.
- Conviene ir moviendo tareas cerradas fuera de este archivo o marcarlas como completadas.
- `Crear tarjeta cupón (Ain)` aparece `Completado` en Notion al 03-06-2026.
- La revision de correos ya se bajo a los issues `158`, `159` y `160`, agrupados en el milestone `#4`.
- La bitacora del 03-06-2026 tambien confirma seguimiento activo a `issue 149`, `issue 155`, reunion de cupon de descuento, QA de cuarta bodega, completar la informacion de las issues de correos y probar tabulaciones con notebooks.
- Ultimo conteo conocido en Recordatorios `pcfactory`: `43` abiertos.
- En Recordatorios seguia abierto `Agendar reunion para revisar requerimiento Cupones`; conviene revalidar si ese rastro ya se puede cerrar con el avance consolidado en bitacora.
- En la bitacora del 04-06-2026 quedaron resueltos la actualizacion de la issue de cupones y los mensajes de API para front; la bitacora del 08-06-2026 suma que las maquetas ya fueron revisadas.
- En esta sesion no hubo acceso directo a Recordatorios; el conteo de `43` queda como ultimo valor conocido.
- En esta sesion la planilla de seguimiento devolvio `401`, por lo que falta revalidar ese acceso antes de contrastarla de nuevo.
- La revision de cambios de hoy en `/Users/ain/Code` mostro actividad concreta en `pcf/chile/urls`, `pcf/herramientas_seo/tabulaciones`, `pcf/herramientas_seo/corewebvitals` y `pcf/proyectos-ecommerce/docs/planes-issues`.
- Queda registrada para la proxima semana una reunion ya agendada con Maria Jose, Alejandro y Pedro para revisar tabulaciones.
- La bitacora del `08-06-2026` confirma como cierres operativos que ya se pidio la planilla de Ale, ya se coordino la prueba en vivo con Juan Pablo y ya se revisaron las maquetas de cupones.
- La bitacora del `08-06-2026` agrega nuevos frentes: bloqueo critico de Webpay, despliegue pendiente de Rutpay, apoyo a sitemap con Alejandro y maxima prioridad a tabulaciones automaticas antes del viernes.
- La bitacora del `08-06-2026` tambien deja registrado que ya se trabajo un plan para que PMs generen tabulaciones de sus familias y que tocaba avanzar la implementacion, hoy ya aterrizada en un flujo con salida para Google Sheets.
- La bitacora del `09-06-2026` suma seguimiento a performance de Loadstone (`v0.2`), validacion de letra chica de cupones, alineacion de footers con marketing, monitoreo operativo de productos raros en populares y coordinacion con Sebastian sobre PAP, bugs de filtros, FAQ y schema SEO.
