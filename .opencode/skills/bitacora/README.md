# Uso rapido del skill `bitacora`

## Comando canonico para pendientes
Dentro de este repo, si escribes `actualiza mis pendientes`, el flujo esperado es:

- revisar Recordatorios en la lista `pcfactory`
- revisar Notion en el teamspace `PCF`
- revisar `Tareas` dentro de `PCF`
- revisar `Reuniones` dentro de `PCF`
- revisar bitacoras recientes en `bitacora/inbox/`
- contrastar contra `bitacora/pendientes/ain-pcfactory.md`
- actualizar `bitacora/pendientes/ain-pcfactory.md` si corresponde
- devolverte foco del dia, bloqueos y pendientes relevantes

No deberia pedir una aclaracion inicial sobre donde actualizar, salvo que falte acceso a alguna fuente o exista un conflicto real.

## Ejemplo completo
```txt
fecha: 22-05-2026
responsable: Seba
contexto: ajustes PDP y campanas activas

desarrollo:
- Se crea issue #152 para agregar plantilla de estilos a PDP

campanas:
- Se actualizan productos destacados de campana Gamers

reuniones:
- Sin reuniones

pendientes:
- Validar script en productivo

bloqueos:
- Sin bloqueos
```

El skill crea o actualiza la bitacora en `bitacora/inbox/<responsable>/<mes>/DD-MM-AAAA.md` (ejemplo: `bitacora/inbox/seba/mayo/22-05-2026.md`) y usa `bitacora/TEMPLATE.md` como base cuando el archivo del dia no existe.

Si el archivo ya existe, agrega la nueva informacion en las secciones correspondientes sin recrear el documento completo.

## Ejemplo con dato faltante
Entrada:
```txt
desarrollo:
- Ajuste de estilos PDP
```

Respuesta esperada del skill:
`Me falta solo la fecha para crear la bitacora. Que fecha quieres usar (DD-MM-AAAA)?`

## Estructura esperada
- `bitacora/inbox/ain/<mes>/DD-MM-AAAA.md`
- `bitacora/inbox/seba/<mes>/DD-MM-AAAA.md`

Asi cada persona mantiene su propio inbox diario y trabaja siempre sobre el mismo archivo del dia.
