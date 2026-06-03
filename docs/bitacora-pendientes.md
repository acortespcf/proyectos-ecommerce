# Pendientes desde Recordatorios y Notion

## Estado actual
- Implementado lector local de Recordatorios en `scripts/bitacora/read-reminders.sh` con backend nativo en `swift` (`EventKit`).
- Pendiente lector de Notion.
- Pendiente agregador comun.
- El flujo actual de Recordatorios es personal para `ain` en macOS; no se considera obligatorio ni universal para otros responsables.
- El flujo de lectura debe complementarse con revision de bitacora reciente para detectar pendientes no consolidados.
- Notion debe considerarse fuente valida tanto para tareas activas como para acuerdos de reuniones.
- El teamspace de trabajo a revisar en Notion para este flujo es `PCF`.

## Requisitos para Recordatorios
- macOS con la app Recordatorios disponible.
- Permitir acceso a Recordatorios para Terminal al primer uso.

## Uso basico

```bash
scripts/bitacora/read-reminders.sh
scripts/bitacora/read-reminders.sh --today
scripts/bitacora/read-reminders.sh --scope overdue
scripts/bitacora/read-reminders.sh --list "Inbox"
```

## Lista operativa actual
- La lista de trabajo definida para este flujo es `pcfactory`.
- Comando base recomendado:

```bash
scripts/bitacora/read-reminders.sh --list "pcfactory"
```

## Ritual matinal sugerido
Cada manana puedes escribirme una instruccion corta como alguna de estas:

- `actualiza mis pendientes`
- `lee mis pendientes de pcfactory`
- `clasifica mis pendientes de pcfactory`
- `partamos el dia con mis pendientes de pcfactory`
- `revisa mi teamspace PCF en Notion`
- `revisa mis reuniones de PCF en Notion`

Si me dices `actualiza mis pendientes`, se debe ejecutar el ritual completo sin pedir pasos intermedios y actualizar `bitacora/pendientes/ain-pcfactory.md` cuando corresponda.

Con eso el flujo esperado es:
- leer pendientes abiertos de `pcfactory`
- revisar el teamspace `PCF` en Notion como contexto principal del trabajo
- revisar el espacio `Tareas` dentro de `PCF` para tareas activas, prioridades, bloqueos y proximos vencimientos
- revisar el espacio `Reuniones` dentro de `PCF` para acuerdos, siguientes pasos y compromisos pendientes
- leer archivos recientes de `bitacora/inbox/` para rescatar siguientes pasos o pendientes no consolidados
- contrastar contra `bitacora/pendientes/ain-pcfactory.md`
- clasificarlos por tipo y urgencia
- proponerte foco del dia
- usar ese contexto para ir actualizando la bitacora durante la jornada

## Regla practica de consolidacion
- Si un pendiente aparece en la bitacora diaria pero no en la lista consolidada, evaluarlo como candidato a agregar en `bitacora/pendientes/ain-pcfactory.md`.
- Si una tarea aparece activa en Notion pero no en la lista consolidada, evaluarla como candidata a agregar.
- Si en una reunion de Notion aparece un acuerdo o siguiente paso sin seguimiento explicito, evaluarlo como candidato a agregar.
- Si una reunion en `PCF` deja un acuerdo sin responsable explicito o sin seguimiento visible, levantarlo como pendiente a revisar en la lista consolidada.
- Si un pendiente ya fue cerrado en la bitacora o en Recordatorios, limpiar o marcar su estado en la lista consolidada.
- Si una tarea en `PCF` aparece cerrada o resuelta en reuniones o en la bitacora, limpiar o actualizar su estado en la lista consolidada.
- La idea es evitar que la bitacora diaria acumule tareas abiertas invisibles para el backlog operativo.

## Salida esperada del ritual matinal
- Resumen corto de tareas activas y pendientes detectados.
- Lista de acuerdos o siguientes pasos encontrados en reuniones de `PCF`.
- Alertas por bloqueos, vencimientos o tareas que aun no bajaron al backlog.
- Propuesta de foco del dia.
- Sugerencias de actualizacion para `bitacora/pendientes/ain-pcfactory.md` cuando corresponda.

## Salida
El script devuelve un arreglo JSON con este formato:

```json
[
  {
    "source": "reminders",
    "list": "Inbox",
    "container": "Inbox",
    "title": "Revisar issue 156",
    "status": "open",
    "due_date": "2026-06-03"
  }
]
```

## Alcance del lector actual
- Incluye solo recordatorios abiertos.
- Puede filtrar por lista.
- Puede filtrar `all`, `today`, `overdue` y `undated`.
- Si una lista pedida no existe, el comando falla con un error claro.
- No marca recordatorios como completados.
