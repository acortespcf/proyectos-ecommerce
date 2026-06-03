---
name: bitacora
description: Crea o actualiza bitacoras diarias en `bitacora/inbox/<responsable>/<mes>/DD-MM-AAAA.md` usando `bitacora/TEMPLATE.md` como base cuando el archivo no existe. Si falta informacion obligatoria, pregunta solo lo minimo necesario antes de crear o actualizar el archivo.
---

# Skill: Bitacora Diaria

## Objetivo
Crear o actualizar una bitacora diaria a partir de un listado rapido del usuario, manteniendo el formato del template y pidiendo solo los datos faltantes obligatorios.

## Archivos de trabajo
- Template fuente: `bitacora/TEMPLATE.md`
- Salida diaria: `bitacora/inbox/<responsable>/<mes>/DD-MM-AAAA.md`

## Entrada esperada (preferida)
```txt
fecha: DD-MM-AAAA
responsable: Nombre o alias (opcional si se puede inferir; si no, preguntar)
contexto: (opcional)

desarrollo:
- ...

campanas:
- ...

reuniones:
- ... (o "Sin reuniones")

referencias:
- #123
- PR: https://...

pendientes:
- ...
- ...
- ...

bloqueos:
- ... (o "Sin bloqueos")
```

## Reglas de llenado
1. `fecha` es obligatoria.
2. Debe existir al menos una categoria con contenido: `desarrollo`, `campanas` o `reuniones`.
3. `pendientes` maximo 3 items.
4. Si no hay `reuniones`, usar `Sin reuniones`.
5. Si no hay `bloqueos`, usar `Sin bloqueos`.
6. `referencias` es opcional; si no existe, usar `No aplica`.
7. Mantener redaccion en bullets, clara y breve.
8. La separacion por persona se hace en carpetas: `bitacora/inbox/<responsable>/<mes>/`.
9. El nombre del archivo diario es `DD-MM-AAAA.md`.
10. Si el archivo del dia no existe, crearlo usando `bitacora/TEMPLATE.md` como base.
11. Si el archivo del dia ya existe, actualizarlo sin duplicar estructura ni borrar contenido previo valido.
12. Si no se informa `responsable` y no se puede inferir con seguridad, preguntar antes de crear o actualizar.

## Comportamiento cuando falta informacion
Preguntar solo lo minimo para desbloquear la creacion:

- Si falta `fecha`: preguntar la fecha antes de crear archivo.
- Si falta `responsable` y no se puede inferir: preguntar a nombre de quien guardar la entrada.
- Si no hay categorias con contenido: preguntar en que categoria van las tareas.
- Si `pendientes` trae mas de 3: pedir priorizacion de 3.

Haz una sola pregunta a la vez y continua al recibir respuesta.

## Flujo de ejecucion
1. Leer `bitacora/TEMPLATE.md`.
2. Validar input con las reglas anteriores.
3. Si falta dato obligatorio, preguntar y esperar.
4. Completar secciones:
   - Marcar con `[X]` categorias activas en resumen.
   - Copiar actividades en su seccion de detalle.
   - Añadir referencias en `Desarrollo` cuando existan.
5. Resolver ruta `bitacora/inbox/<responsable>/<mes>/DD-MM-AAAA.md` usando el mes en minusculas (ejemplo: `bitacora/inbox/seba/junio/03-06-2026.md`).
6. Si el archivo no existe, crearlo desde `bitacora/TEMPLATE.md` y luego completar la informacion.
7. Si el archivo ya existe, leerlo y agregar la nueva informacion en las secciones correspondientes, preservando lo ya registrado y evitando duplicados obvios.
8. Confirmar ruta creada o actualizada y resumir lo cargado.

## Plantilla de pregunta de aclaracion
- Falta fecha:
  - "Me falta solo la fecha para crear la bitacora. Que fecha quieres usar (DD-MM-AAAA)?"
- Falta responsable:
  - "Me falta solo el responsable para guardar esta entrada. La guardo para `ain` o para `seba`?"

## Criterio de salida
La respuesta final debe incluir:
- Ruta del archivo creado o actualizado.
- Categorias activadas.
- Responsable usado en la bitacora.
- Campos autocompletados por defecto (`Sin reuniones`, `Sin bloqueos`, `No aplica`) si fueron usados.
