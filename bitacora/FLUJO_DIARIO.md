# Flujo Diario de Bitacora

## Objetivo
Registrar avances pequenos durante el dia en un archivo diario por persona, creado desde template si no existe y actualizado durante toda la jornada.

## Estructura
- Inbox diario por persona: `bitacora/inbox/<responsable>/<mes>/DD-MM-AAAA.md`
- Plantilla base: `bitacora/TEMPLATE.md`

## Regla de creacion y actualizacion
- El archivo del dia siempre debe crearse usando la estructura de `bitacora/TEMPLATE.md`.
- Si el archivo del dia ya existe, las nuevas entradas deben agregarse sobre ese mismo archivo.
- Si durante el tiempo cambia `bitacora/TEMPLATE.md`, solo aplica al crear nuevos archivos; no se debe rearmar automaticamente un archivo ya iniciado.

## Flujo propuesto
1. Durante el dia, cada vez que avances en algo, me escribes una nota corta.
2. Yo resuelvo el responsable y el archivo del dia en `bitacora/inbox/<responsable>/<mes>/DD-MM-AAAA.md`.
3. Si el archivo no existe, lo creo con base en `bitacora/TEMPLATE.md`.
4. Si el archivo ya existe, agrego la nota en las secciones correspondientes.
5. La nota puede venir en lenguaje natural, por ejemplo:
   `agrega a bitacora: revise GSC para URLs excluidas y cruce redirects para futura issue`
6. Si trabajas en GitHub, tambien puedo complementar con:
   `issues creadas/actualizadas hoy`, `repos tocados`, `archivos relevantes modificados`.
7. Durante el mismo dia sigo actualizando ese mismo archivo cada vez que me digas `agrega a bitacora: ...`.
8. Al cierre, el archivo ya queda como bitacora diaria del dia, sin necesidad de una consolidacion adicional.

## Ritual de inicio del dia con Recordatorios y Notion
Este flujo es opcional y personal. Hoy aplica para `ain` en macOS usando la app Recordatorios y Notion como espacio de trabajo principal. No se asume como flujo comun para otros responsables como `seba`, que pueden manejar sus pendientes con otra herramienta.

### Comando canonico
- Si me dices `actualiza mis pendientes`, se debe ejecutar este ritual completo sin pedir pasos intermedios.
- La accion debe revisar Recordatorios, Notion y bitacora reciente, y luego actualizar `bitacora/pendientes/ain-pcfactory.md` si corresponde.

1. Al comenzar el dia, me puedes pedir: `lee mis pendientes de pcfactory`.
2. Yo consulto la lista `pcfactory` desde Recordatorios.
3. Reviso en Notion el teamspace `PCF` como fuente principal de trabajo.
4. Dentro de `PCF`, reviso el espacio `Tareas` para detectar tareas activas, prioridades, bloqueos y proximos vencimientos.
5. Dentro de `PCF`, reviso tambien el espacio `Reuniones` para rescatar acuerdos, siguientes pasos, compromisos pendientes y temas de seguimiento.
6. Tambien reviso la bitacora reciente para rescatar pendientes abiertos o siguientes pasos no traspasados aun al backlog operativo.
7. Contrasto todo eso con `bitacora/pendientes/ain-pcfactory.md` para identificar vacios, duplicados o tareas ya cerradas.
8. Te devuelvo una clasificacion practica de pendientes, por ejemplo: desarrollo, seguimiento, reunion, backlog, bloqueo o admin.
9. Desde esa clasificacion, te ayudo a definir foco del dia.
10. Luego, durante la jornada, sigo registrando avances en la bitacora con base en lo que vayas cerrando o moviendo.

## Que debe hacer `actualiza mis pendientes`
Cuando me digas `actualiza mis pendientes`, debo hacer esto:

1. Leer pendientes abiertos de la lista `pcfactory` en Recordatorios.
2. Revisar el teamspace `PCF` en Notion.
3. Revisar `Tareas` dentro de `PCF` para detectar tareas activas, prioridad, estado, bloqueos y vencimientos.
4. Revisar `Reuniones` dentro de `PCF` para rescatar acuerdos, siguientes pasos y compromisos pendientes.
5. Revisar archivos recientes de `bitacora/inbox/` para rescatar tareas no consolidadas.
6. Contrastar todo contra `bitacora/pendientes/ain-pcfactory.md`.
7. Actualizar `bitacora/pendientes/ain-pcfactory.md` cuando haya pendientes nuevos, cambios de estado, duplicados o cierres claros.
8. Entregarte un resumen con foco del dia, bloqueos y pendientes relevantes.

## Regla de consolidacion de pendientes
- La lectura de pendientes debe considerar mas de una fuente cuando aplique.
- Fuente 1: Recordatorios (`pcfactory`) como captura rapida personal.
- Fuente 2: archivos recientes de `bitacora/inbox/` para detectar pendientes de cierre, siguientes pasos o tareas que quedaron solo registradas en el diario.
- Fuente 3: teamspace `PCF` en Notion como contexto general del trabajo.
- Fuente 4: espacio `Tareas` dentro de `PCF` para revisar tareas en curso, prioridad, estado, bloqueos y vencimientos.
- Fuente 5: espacio `Reuniones` dentro de `PCF` para rescatar acuerdos, siguientes pasos y compromisos que aun no bajaron al backlog.
- Fuente 6: `bitacora/pendientes/ain-pcfactory.md` como vista manual consolidada y priorizada.
- Si aparece un pendiente en bitacora que no existe en la lista consolidada, se debe evaluar si corresponde agregarlo al markdown maestro.
- Si aparece una tarea activa en Notion o un acuerdo pendiente en reuniones, se debe evaluar si corresponde consolidarlo en el markdown maestro.
- Si una reunion en `PCF` deja un acuerdo sin responsable explicito o sin seguimiento visible, se debe levantar como pendiente a revisar en el markdown maestro.
- Si una tarea en `PCF` aparece cerrada o resuelta en reuniones o en bitacora, se debe limpiar o actualizar su estado en el markdown maestro.

## Formato recomendado para capturas rapidas
Usa cualquiera de estas formas:

```md
- desarrollo: cree issue #157 para sitemap con bearer token y S3
- campana: cargue cambios de Cyber
- investigacion: revise GSC y redirects por URLs excluidas
- pendiente: validar siguiente paso para automatizacion de tabulaciones
```

## Comandos naturales sugeridos
- `actualiza mis pendientes`
- `lee mis pendientes de pcfactory`
- `clasifica mis pendientes de pcfactory`
- `revisa mi teamspace PCF en Notion`
- `revisa mis reuniones de PCF en Notion`
- `agrega a bitacora: ...`
- `muestrame mi inbox de hoy`
- `resume lo que llevo hoy`
- `actualiza mi bitacora de hoy`

## Salida esperada del ritual matinal
- Resumen corto de tareas activas y pendientes detectados.
- Lista de acuerdos o siguientes pasos encontrados en reuniones de `PCF`.
- Alertas por bloqueos, vencimientos o tareas sin bajar al backlog.
- Propuesta de foco del dia.
- Sugerencias de actualizacion para `bitacora/pendientes/ain-pcfactory.md` cuando corresponda.

## Criterio de registro
- Desarrollo: issues, investigacion, cambios tecnicos, documentacion, automatizaciones.
- Campanas: cargas, ajustes visuales, contenidos, banners, vitrinas, Cyber, SPPH, etc.
- Reuniones / Gestion: reuniones, acuerdos, coordinaciones, seguimiento.

## Ejemplos de rutas
- `bitacora/inbox/ain/junio/03-06-2026.md`
- `bitacora/inbox/seba/junio/03-06-2026.md`

## Nota practica
Si un trabajo no deja rastro en Git, igual lo podemos registrar desde tus notas del dia o desde actividad en GitHub para no perderlo en la bitacora diaria.
