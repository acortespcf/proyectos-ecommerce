---
name: "Historia de Usuario"
about: Historia refinable con reglas, requisitos y cobertura QA.
title: "HDU: Habilitar colecciones de productos personalizadas para campañas y landings"
labels: "Feature 🔫, Historia, status:refinamiento"
assignees: ""
---

# HDU: Habilitar colecciones de productos personalizadas para campañas y landings

## Historia de usuario

**Como** equipo de e-commerce que construye landings y enlaces de agrupadores de productos<br>
**Quiero** consumir un endpoint de catálogo que liste un conjunto explícito de productos y entregue las mismas capacidades de filtrado y ordenamiento disponibles en búsqueda avanzada<br>
**Para** publicar agrupadores navegables sin generar consultas a Algolia ni incrementar su facturación.

## Contexto

Actualmente se pueden publicar productos predefinidos mediante servicios que retornan el detalle de una lista de IDs o el contenido de una campaña. Sin embargo, esos resultados no exponen de forma integrada la paginación, los facets y las opciones de ordenamiento que requiere una experiencia PLP.

El frontend puede mostrar agrupadores mediante URLs como:

```text
https://www.pcfactory.cl/busqueda?productos=57465,53814,55837&size=12&sort=sugeridos
```

La resolución actual de búsqueda avanzada utiliza Algolia. Se requiere una alternativa de backend para los agrupadores explícitos de productos, de modo que las landings y enlaces equivalentes puedan filtrar y ordenar su propio conjunto sin consultar Algolia.

## Antecedentes técnicos confirmados

- El servicio de catálogo expone productos por IDs para banners de Home:
  `GET https://api.pcfactory.cl/pcfactory-services-catalogo/v1/catalogo/productos/banners?productsIds=56075&productsIds=32360&productsIds=40960&productsIds=54798&productsIds=53435&productsIds=57313`
- El servicio de landing expone productos paginados de una campaña:
  `GET https://api.pcfactory.cl/pcfactory-services-web-landing/v1/campanas/gamer/cincuenta?size=50&page=0`
- El servicio de catálogo expone facets para IDs de productos:
  `GET https://api.pcfactory.cl/pcfactory-services-catalogo/v1/catalogo/productos/query/facets?productos=57465,53814,55837`
- La consulta de productos y la consulta de facets deben usar el mismo conjunto de IDs para que los filtros representen los resultados disponibles.

## Objetivo

Disponer un contrato de consulta de catálogo reutilizable por landings y enlaces con agrupadores explícitos de productos que permita obtener resultados paginados, facets y opciones de ordenamiento, sin dependencia ni llamadas a Algolia.

## Alcance

### Incluye

- Endpoint de consulta para un conjunto explícito de IDs de producto.
- Paginación de resultados.
- Aplicación de filtros basados en los facets disponibles para el conjunto de IDs recibido.
- Entrega de facets y sus conteos para construir los filtros del frontend.
- Aplicación de opciones de ordenamiento soportadas por la experiencia de búsqueda avanzada para el conjunto consultado.
- Respuesta de productos utilizable en las tarjetas de producto de landings y PLP.
- Documentación del contrato, parámetros, valores de ordenamiento soportados y respuestas de error.

### No incluye

- Búsqueda textual de productos.
- Recomendaciones, ranking o recuperación de productos por Algolia.
- Administración de campañas, landings, banners o la interfaz que configura los IDs.
- Modificaciones visuales en el frontend de landings o PLP, salvo la integración necesaria para validar el contrato.
- Definir nuevos criterios comerciales de ordenamiento.

## Restricciones de solución acordadas

- La consulta de listado, filtros y facets para esta funcionalidad no debe realizar llamadas directas ni indirectas a Algolia.
- El conjunto inicial de resultados se determina exclusivamente a partir de los IDs de producto recibidos.
- Se deben reutilizar los servicios y modelos de catálogo existentes cuando sean suficientes; la estructura interna y la ruta final quedan a definición del equipo responsable.
- El contrato debe poder ser consumido desde una landing y desde un enlace de agrupador sin depender de una campaña específica.

## Definiciones

| Término | Definición |
|---|---|
| Agrupador de productos | Conjunto explícito de IDs de producto que se publica mediante una landing o enlace. |
| Facet | Dimensión de filtro y sus valores disponibles, calculados sobre el conjunto de productos consultado. |
| Filtro | Selección de uno o más valores de facets que reduce el conjunto inicial del agrupador. |
| Resultado filtrado | Producto perteneciente al conjunto inicial de IDs que cumple los filtros solicitados. |

## Configuración o datos requeridos

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---:|---|
| `productos` | Lista de IDs de producto | Sí | Conjunto inicial sobre el cual se obtienen resultados y facets. Se debe definir la codificación final del parámetro. |
| `page` | Entero | Sí | Página solicitada. Se debe documentar si la numeración inicia en 0 o en 1. |
| `size` | Entero | Sí | Cantidad de productos por página. Se debe documentar el rango permitido. |
| `sort` | Enumeración | No | Opción de ordenamiento soportada por el contrato. Debe incluir el valor equivalente a `sugeridos` si continúa vigente. |
| Filtros de facets | Por definir | No | Representación de filtros por facet. Debe documentarse para que sea compatible con la experiencia de búsqueda avanzada. |

## Reglas de negocio

- **RN-01:** Los productos retornados deben pertenecer al conjunto de IDs recibido en la consulta, incluso después de aplicar filtros u ordenamiento.
- **RN-02:** Los facets y sus conteos deben calcularse sobre el conjunto de IDs recibido, considerando los filtros aplicados según la semántica que se acuerde para búsqueda avanzada.
- **RN-03:** Un ID inexistente, no disponible o no elegible para publicación no debe generar productos ajenos al agrupador; el comportamiento de omitirlo o informarlo debe documentarse.
- **RN-04:** Cuando no existan productos que cumplan los filtros, la respuesta debe retornar una página vacía y los metadatos necesarios para representarla, sin consultar Algolia.
- **RN-05:** Si se recibe una opción de ordenamiento no soportada, el servicio debe responder un error de validación documentado y no aplicar un ordenamiento implícito.

## Requisitos funcionales

- **RF-01:** El sistema debe exponer una consulta que reciba un conjunto explícito de IDs de producto y retorne productos paginados junto con metadatos de paginación.
- **RF-02:** El sistema debe exponer los facets disponibles y sus valores para el mismo conjunto de IDs de la consulta de productos.
- **RF-03:** El sistema debe aceptar filtros construidos desde los facets retornados y aplicar dichos filtros al conjunto inicial.
- **RF-04:** El sistema debe aceptar las opciones de ordenamiento que se acuerden como equivalentes a búsqueda avanzada y devolver los productos en el orden solicitado.
- **RF-05:** El sistema debe retornar los atributos de producto que necesita la tarjeta de producto de landings/PLP. El conjunto exacto de atributos debe validarse contra el consumidor.
- **RF-06:** El sistema debe validar parámetros obligatorios y valores no soportados, retornando una respuesta de error consistente y documentada.
- **RF-07:** El sistema debe documentar ejemplos de consumo para una landing y para un enlace con `productos=57465,53814,55837`.

## Requisitos no funcionales

| ID | Categoría | Requisito | Validación |
|---|---|---|---|
| RNF-01 | Dependencias | El flujo de listado, facets, filtros y ordenamiento no debe invocar Algolia. | Trazabilidad de llamadas del servicio en ambiente de prueba y revisión de implementación. |
| RNF-02 | Compatibilidad | El contrato debe poder ser consumido por landings y por la vista PLP que utiliza agrupadores por IDs. | Prueba de integración con ambos consumidores o cliente HTTP equivalente. |
| RNF-03 | Observabilidad | Las respuestas de validación y fallas deben incluir un código HTTP y cuerpo de error documentados. | Pruebas de contrato para parámetros inválidos y errores controlados. |
| RNF-04 | Rendimiento | El objetivo de latencia y límites de IDs, filtros y tamaño de página deben acordarse antes de la estimación. | Prueba de rendimiento contra los límites acordados. |

## Criterios de aceptación

### CA-01: Consulta paginada de un agrupador sin Algolia

```gherkin
Escenario: Obtener productos de un agrupador por IDs
  Dado que existe un agrupador con los IDs 57465, 53814 y 55837
  Y el consumidor solicita la primera página con tamaño 12 y ordenamiento sugeridos
  Cuando consulta el endpoint de catálogo para agrupadores
  Entonces recibe únicamente productos pertenecientes a los IDs solicitados
  Y recibe los metadatos de paginación y los atributos acordados para la tarjeta de producto
  Y la traza del servicio no contiene llamadas a Algolia
```

### CA-02: Facets y filtros aplicados sobre el mismo agrupador

```gherkin
Escenario: Filtrar productos de un agrupador usando un facet disponible
  Dado que existe un agrupador con productos que poseen valores distintos para un facet
  Cuando el consumidor obtiene los facets del agrupador y selecciona un valor disponible
  Y consulta los productos incluyendo ese filtro
  Entonces recibe únicamente productos del agrupador que cumplen el filtro
  Y los facets y conteos retornados corresponden al conjunto de IDs y filtros de la consulta
  Y la traza del servicio no contiene llamadas a Algolia
```

### CA-03: Validaciones y resultados sin coincidencias

```gherkin
Esquema del escenario: Responder de forma controlada ante entradas no utilizables
  Dado que el consumidor construye una consulta de agrupador
  Cuando envía <entrada>
  Entonces recibe <resultado>
  Y la traza del servicio no contiene llamadas a Algolia

  Ejemplos:
    | entrada | resultado |
    | sin IDs de producto | error de validación documentado |
    | una opción de ordenamiento no soportada | error de validación documentado |
    | filtros sin productos coincidentes | página de resultados vacía con metadatos de paginación |
```

### CA-04: Compatibilidad con los consumidores objetivo

```gherkin
Escenario: Consumir el contrato desde una landing y un enlace de agrupador
  Dado que una landing y una URL de búsqueda reciben el mismo conjunto explícito de IDs
  Cuando ambos consumidores consultan el nuevo contrato
  Entonces pueden renderizar las tarjetas, facets, filtros, paginación y ordenamiento acordados
  Y ningún consumidor requiere consultar Algolia para resolver ese agrupador
```

## Matriz mínima de pruebas

| Caso | Precondición o datos | Acción | Resultado esperado | Tipo |
|---|---|---|---|---|
| Listado base | IDs válidos | Consultar primera página | Productos del agrupador y paginación | Positivo |
| Facets | Agrupador con atributos distintos | Consultar facets | Valores y conteos del agrupador | Positivo |
| Filtro | Valor de facet disponible | Consultar con filtro | Solo productos coincidentes | Positivo |
| Ordenamiento | Dos o más productos | Consultar cada orden soportado | Orden documentado | Positivo |
| Parámetro inválido | Sin IDs o `sort` no soportado | Consultar endpoint | Error de validación documentado | Negativo |
| Sin coincidencias | Filtro válido sin resultados | Consultar endpoint | Página vacía con metadatos | Edge case |
| IDs no resolubles | ID inexistente/no publicable mezclado con IDs válidos | Consultar endpoint | Comportamiento documentado sin productos ajenos | Edge case |
| Sin Algolia | Cualquier caso anterior | Revisar trazabilidad | No hay llamadas a Algolia | Regresión/arquitectura |

## Insumos y dependencias

- Equipo responsable de `pcfactory-services-catalogo` para definir e implementar el contrato.
- Equipo consumidor para confirmar los atributos requeridos por las tarjetas de producto y la semántica exacta de filtros.
- Definición vigente de las opciones y reglas de ordenamiento de búsqueda avanzada.
- Acceso a trazabilidad en ambiente de prueba para demostrar ausencia de llamadas a Algolia.

## Preguntas de refinamiento

- ¿El endpoint debe unificar productos y facets en una única respuesta o se mantendrán dos recursos coordinados?
- ¿Cuál es el formato, máximo de IDs y comportamiento esperado para IDs duplicados, inexistentes o no publicables?
- ¿Qué facets, filtros y operadores de búsqueda avanzada son obligatorios en la primera versión?
- ¿Cuál es la semántica de recálculo de conteos de facets al aplicar múltiples filtros?
- ¿Qué opciones de `sort` están vigentes y cuál es el criterio de ordenamiento de cada una?
- ¿Qué campos exactos requiere el consumidor para la tarjeta de producto?
- ¿Cuáles son los límites de `size`, filtros y latencia esperada?

## Riesgos y regresión

- Un contrato que no replique la semántica necesaria de facets u ordenamiento obligaría al frontend a mantener comportamientos divergentes entre búsqueda avanzada y agrupadores.
- Calcular facets o filtrar fuera del conjunto de IDs puede exponer productos no incluidos en la landing o enlace.
- Deben revalidarse los endpoints existentes de banners y campañas para asegurar que no cambian su contrato.

## Definition of Ready / INVEST

- [ ] **I - Independiente:** requiere coordinación entre el servicio de catálogo y los consumidores.
- [x] **N - Negociable:** define el resultado y mantiene abiertos los detalles de contrato no confirmados.
- [x] **V - Valiosa:** habilita agrupadores filtrables sin costo de consultas a Algolia.
- [ ] **E - Estimable:** faltan límites, atributos, facets y semántica de filtros/ordenamiento.
- [ ] **S - Pequeña:** debe evaluarse tras definir el alcance funcional del contrato.
- [x] **T - Testeable:** los criterios describen resultados y evidencias verificables.

## Métricas de éxito

- Las consultas de agrupadores por IDs usadas por landings y enlaces no registran llamadas a Algolia.
- Se puede construir la experiencia acordada de listado, facets, filtros, paginación y ordenamiento a partir del nuevo contrato.

## Scope

- [ ] seo
- [ ] gmb
- [ ] modyo
- [ ] analytics
- [x] integraciones
- [ ] ux
- [ ] checkout
- [ ] pdp
- [x] plp
- [ ] home
- [x] landing
- [ ] otro

## Links relacionados

- Endpoint de productos para banners: `https://api.pcfactory.cl/pcfactory-services-catalogo/v1/catalogo/productos/banners?productsIds=56075&productsIds=32360&productsIds=40960&productsIds=54798&productsIds=53435&productsIds=57313`
- Endpoint de productos de campaña: `https://api.pcfactory.cl/pcfactory-services-web-landing/v1/campanas/gamer/cincuenta?size=50&page=0`
- Endpoint existente de facets por productos: `https://api.pcfactory.cl/pcfactory-services-catalogo/v1/catalogo/productos/query/facets?productos=57465,53814,55837`
- Referencia de enlace de agrupador: `https://www.pcfactory.cl/busqueda?productos=57465,53814,55837&size=12&sort=sugeridos`

## Rama propuesta

```text
feat/chile-[ISSUE-NUMBER]-endpoint-catalogo-agrupadores-sin-algolia
```
