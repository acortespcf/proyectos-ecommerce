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

## Formato recomendado para capturas rapidas
Usa cualquiera de estas formas:

```md
- desarrollo: cree issue #157 para sitemap con bearer token y S3
- campana: cargue cambios de Cyber
- investigacion: revise GSC y redirects por URLs excluidas
- pendiente: validar siguiente paso para automatizacion de tabulaciones
```

## Comandos naturales sugeridos
- `agrega a bitacora: ...`
- `muestrame mi inbox de hoy`
- `resume lo que llevo hoy`
- `actualiza mi bitacora de hoy`

## Criterio de registro
- Desarrollo: issues, investigacion, cambios tecnicos, documentacion, automatizaciones.
- Campanas: cargas, ajustes visuales, contenidos, banners, vitrinas, Cyber, SPPH, etc.
- Reuniones / Gestion: reuniones, acuerdos, coordinaciones, seguimiento.

## Ejemplos de rutas
- `bitacora/inbox/ain/junio/03-06-2026.md`
- `bitacora/inbox/seba/junio/03-06-2026.md`

## Nota practica
Si un trabajo no deja rastro en Git, igual lo podemos registrar desde tus notas del dia o desde actividad en GitHub para no perderlo en la bitacora diaria.
