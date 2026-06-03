# Pendientes desde Recordatorios y Notion

## Estado actual
- Implementado lector local de Recordatorios en `scripts/bitacora/read-reminders.sh` con backend nativo en `swift` (`EventKit`).
- Pendiente lector de Notion.
- Pendiente agregador comun.

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
