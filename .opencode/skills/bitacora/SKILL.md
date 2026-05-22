---
name: bitacora
description: Genera y completa bitacoras diarias en `bitacora/DD-MM-AAAA.md` usando `bitacora/TEMPLATE.md`. Si falta informacion obligatoria, pregunta solo lo minimo necesario antes de crear el archivo.
---

# Skill: Bitacora Diaria

## Objetivo
Completar una bitacora diaria a partir de un listado rapido del usuario, manteniendo el formato del template y pidiendo solo los datos faltantes obligatorios.

## Archivos de trabajo
- Template fuente: `bitacora/TEMPLATE.md`
- Salida: `bitacora/DD-MM-AAAA.md`

## Entrada esperada (preferida)
```txt
fecha: DD-MM-AAAA
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

## Comportamiento cuando falta informacion
Preguntar solo lo minimo para desbloquear la creacion:

- Si falta `fecha`: preguntar la fecha antes de crear archivo.
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
5. Crear archivo `bitacora/DD-MM-AAAA.md`.
6. Confirmar ruta creada y resumir lo cargado.

## Plantilla de pregunta de aclaracion
- Falta fecha:
  - "Me falta solo la fecha para crear la bitacora. Que fecha quieres usar (DD-MM-AAAA)?"

## Criterio de salida
La respuesta final debe incluir:
- Ruta del archivo creado.
- Categorias activadas.
- Campos autocompletados por defecto (`Sin reuniones`, `Sin bloqueos`, `No aplica`) si fueron usados.
