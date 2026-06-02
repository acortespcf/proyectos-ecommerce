# Flujo Diario de Bitacora

## Objetivo
Registrar avances pequenos durante el dia y consolidarlos al cierre en una bitacora diaria lista para versionar.

## Estructura
- Bitacora final diaria: `bitacora/<mes>/<DD-MM-AAAA>-ain.md`
- Captura rapida del dia: `bitacora/inbox/ain/<AAAA-MM-DD>.md`
- Plantilla base: `bitacora/TEMPLATE.md`

## Regla de generacion final
- El archivo final del dia siempre debe generarse usando la estructura de `bitacora/TEMPLATE.md`.
- El inbox diario sirve como fuente de insumos, pero no define el formato final.
- Si durante el tiempo cambia `bitacora/TEMPLATE.md`, las nuevas bitacoras deben respetar la version vigente del template al momento de generarse.

## Flujo propuesto
1. Durante el dia, cada vez que avances en algo, me escribes una nota corta.
2. Yo agrego esa nota al archivo `bitacora/inbox/ain/<fecha>.md`.
3. La nota puede venir en lenguaje natural, por ejemplo:
   `agrega a bitacora: revise GSC para URLs excluidas y cruce redirects para futura issue`
4. Si trabajas en GitHub, tambien puedo complementar con:
   `issues creadas/actualizadas hoy`, `repos tocados`, `archivos relevantes modificados`.
5. Al final del dia, me pides:
   `genera la bitacora final de hoy`
6. Yo consolido el contenido del inbox en el archivo final mensual usando `bitacora/TEMPLATE.md`, con resumen por categoria, detalle, pendientes y alertas.

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
- `genera la bitacora final de hoy`

## Criterio de consolidacion al cierre
- Desarrollo: issues, investigacion, cambios tecnicos, documentacion, automatizaciones.
- Campanas: cargas, ajustes visuales, contenidos, banners, vitrinas, Cyber, SPPH, etc.
- Reuniones / Gestion: reuniones, acuerdos, coordinaciones, seguimiento.

## Nota practica
Si un trabajo no deja rastro en Git, igual lo podemos registrar desde tus notas del dia o desde actividad en GitHub para no perderlo en la bitacora final.
