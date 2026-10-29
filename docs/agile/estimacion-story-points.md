# Guía de Estimación y Capacidad del Equipo (Tallas y Story Points)

Esta guía define el estándar de estimación para las tareas, requerimientos e historias de usuario del equipo de desarrollo eCommerce (PC Factory). Su objetivo es unificar criterios, facilitar la planificación de sprints y permitir el cálculo certero de la capacidad del equipo en **GitHub Projects**.

---

## 1. Niveles de Estimación: Tallas (Macro) vs. Story Points (Micro)

En el flujo de trabajo distinguimos dos niveles de estimación según el ciclo de vida del requerimiento:

1. **Tallas (T-Shirt Sizing) — Nivel Macro / Roadmap:**  
   Se utiliza para iniciativas, proyectos y épicas en fases tempranas (Gantt, Roadmaps trimestrales) antes del refinamiento técnico. Permite comunicar al negocio el orden de magnitud de tiempo.
2. **Story Points (Fibonacci) — Nivel Micro / Sprint:**  
   Se utiliza para Historias de Usuario (HDU), features y correcciones que ingresan al backlog refinado y a la planificación de sprints en GitHub Projects.

---

## 2. Macroestimación de Iniciativas (T-Shirt Sizing)

Corresponde a la simbología de tamaños utilizada en el seguimiento de alto nivel del backlog:

| Talla | Tiempo estimado | Alcance típico |
| :---: | :--- | :--- |
| **XS** | Menos de 1 semana | Iniciativa puntual o mejora menor autocontenida. |
| **S** | 1 semana | Feature pequeña o paquete de ajustes específicos. |
| **M** | 2 semanas | Iniciativa que cabe dentro de un sprint regular (2 semanas). |
| **L** | Hasta 3 semanas | Proyecto mediano que abarca más de un sprint (requiere desglose). |
| **XL** | 1 a 2 meses | Épica mayor o proyecto trimestral (múltiples épicas/historias). |
| **XXL** | 2 meses o más | Gran iniciativa estratégica o transformación de plataforma. |

---

## 3. Las 3 Dimensiones de la Estimación Ágil

Un Story Point **no mide únicamente tiempo calendario**. Se calcula triangulando tres variables fundamentales:

1. **Claridad / Incertidumbre:** ¿Qué tanto conocemos el alcance técnico y de negocio? ¿Existen definiciones pendientes o requiere exploración (Spike)?
2. **Dependencias y Riesgos:** ¿Dependemos de servicios de terceros (APIs, pasarelas de pago, Retail Rocket, Modyo), diseño UI/UX, infraestructura o aprobaciones externas?
3. **Esfuerzo Neto de Trabajo:** Tiempo de dedicación efectiva y concentración que requiere un desarrollador para implementar, probar y dejar listo el cambio.

---

## 4. Matriz de Estimación (Escala Fibonacci)

> **Regla de asignación:** Al evaluar una tarea frente a las 3 dimensiones, si sus características caen en columnas distintas, **elige siempre el puntaje más alto** (principio de precaución y riesgo).

| Story Points | Nivel de Claridad | Dependencias | Esfuerzo Neto | Acción para el Sprint | Ejemplos en eCommerce (PC Factory) |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1 SP** | **Todo claro**<br>No hay dudas técnicas ni funcionales. | **Ninguna**<br>Trabajo 100% autocontenido. | **< 2 horas**<br>Dedicación inmediata. | ✅ **Entra directo al Sprint**<br>Quick win / Fix puntual. | Corregir typo, cambiar color/estilo de botón, actualizar meta tag SEO puntual, ajustar variable de entorno. |
| **2 SP** | **Casi todo claro**<br>Pocas variables menores. | **Casi ninguna**<br>Componente interno conocido. | **Medio día**<br>(~4 horas) | ✅ **Entra directo al Sprint**<br>Tarea estándar bien definida. | Agregar validación simple en formulario, ajustar CSS/diseño responsivo de un banner, crear script utilitario básico. |
| **3 SP** | **Conocimiento medio**<br>Alcance delimitado con algún reto técnico. | **Algunas**<br>Requiere coordinar datos o modelos existentes. | **1 a 2 días** | ✅ **Entra directo al Sprint**<br>Historia estándar bien acotada. | Nuevo endpoint REST estándar, componente de ficha de producto (PDP) con llamadas a API interna, ajuste en dataLayer/GA4. |
| **5 SP** | **Poca claridad previa**<br>Mayor complejidad técnica o de negocio. | **Pocas a moderadas**<br>Integración con servicios o sistemas acoplados. | **3 a 4 días** | ✅ **Entra directo al Sprint**<br>Límite superior recomendado para 1 issue. | Integración con servicio externo, módulo de filtros en catálogo (PLP), flujo de autenticación o validación de stock compleja. |
| **8 SP** | **Muy poca claridad**<br>Muchas incógnitas técnicas. | **Múltiples**<br>Riesgo alto de bloqueos externos. | **~1 semana** | ⚠️ **Candidato a Dividir**<br>Solo entra si es indivisible; consume medio sprint de 1 dev. | Buscador con filtros facetados complejos, refactor mayor de componentes del checkout. |
| **13 SP** | **Incertidumbre total**<br>Requerimiento amplio o difuso. | **Desconocidas / Críticas**<br>Múltiples equipos o servicios involucrados. | **> 1 semana** | ⛔ **NO entra al Sprint**<br>Debe dividirse antes de planificar. Es una Épica/Feature grande. | Nueva pasarela de pago, flujo integral de compra desde cero, rediseño completo de plataforma. |

---

## 5. Reglas de Oro para el Equipo

### 5.1 Límite de tamaño para entrar a un Sprint (INVEST)
* Toda historia de usuario debe cumplir el criterio **INVEST** (Small / Pequeña: completable dentro de un sprint).
* **Tamaños permitidos en el Sprint:** `1`, `2`, `3` y `5` puntos.
* Los issues con **8 puntos** solo deben ingresar de forma excepcional si técnicamente no pueden dividirse.
* Los issues con **13 puntos NUNCA deben asignarse a un sprint activo**. Deben refinarse y dividirse en subtareas antes del Sprint Planning.

### 5.2 Los Story Points no son matemática lineal
Al desglosar un requerimiento calificado inicialmente con **13 puntos**, **no** intentes forzar una suma de $8 + 5 = 13$.  
Al desglosar una épica en historias más pequeñas, la incertidumbre baja y los riesgos se aíslan. Cada nueva historia se debe reestimar desde cero de manera independiente. Es habitual que una iniciativa de 13 puntos termine convertida en tres tareas de 3 puntos (total 9) o cuatro tareas de 2 puntos.

---

## 6. Cómo Calcular la Capacidad del Equipo por Sprint

Para saber cuántos puntos comprometer en cada iteración de **GitHub Projects**:

### Paso 1: Días-Persona Disponibles (Capacidad Bruta)
Calcula los días hábiles del sprint descontando vacaciones, feriados y licencias de cada desarrollador.
$$\text{Días Disponibles} = \sum (\text{Días hábiles por dev} - \text{Vacaciones} - \text{Feriados})$$

### Paso 2: Factor de Foco (Capacidad Neta)
Ningún desarrollador programa el 100% de su jornada. Dailies, planning, revisiones de PRs, incidentes en producción y reuniones consumen tiempo.  
El **factor de foco estándar es del 70%** (aprox. 5 a 6 horas productivas por día de 8 horas).
$$\text{Días Efectivos de Desarrollo} = \text{Días Disponibles} \times 0.70$$

### Paso 3: Conversión inicial a Story Points
Considerando la matriz, 1 Story Point equivale en promedio a **~0.6 a 0.8 días de esfuerzo efectivo**.
$$\text{Capacidad Estimada (SP)} \approx \frac{\text{Días Efectivos}}{0.7}$$

#### 💡 Ejemplo Práctico:
* **Sprint de 2 semanas (10 días laborables):**
* **Equipo de 2 desarrolladores:**
  * Dev 1: 10 días laborables.
  * Dev 2: 8 días laborables (2 días de permiso/vacaciones).
  * Total Días Disponibles = $18\text{ días}$.
* **Días Efectivos (Factor 70%):** $18 \times 0.70 = 12.6\text{ días efectivos}$.
* **Capacidad del Sprint:** $12.6 / 0.7 \approx \mathbf{18\text{ Story Points}}$.

> [!TIP]
> **Velocidad Histórica:**  
> Tras 2 o 3 sprints concluidos, la capacidad ya no se estima teóricamente: se toma el **promedio real de Story Points completados** en los sprints anteriores. Si tu equipo completa consistentemente 20 SP por sprint, esa es la velocidad de referencia para planificaciones futuras.

---

## 7. Configuración y Uso en GitHub Projects

1. **Campo `Estimate`:**
   * Utilizar un campo personalizado de tipo **Number** llamado `Estimate`.
   * Asignar únicamente valores de la escala: `1, 2, 3, 5, 8` (o `13` en issues de backlog aún no refinados).
2. **Visualización y Seguimiento:**
   * En la vista de tablero (Board) o lista (Table), agrupar por el campo de iteración **`Sprint`**.
   * Habilitar la función de suma en la columna: **`Sum of Estimate`**. Esto mostrará la carga total de puntos por sprint en tiempo real.
3. **Sprint Rollover:**
   * Mantener los tickets bien acotados ($\le 5\text{ SP}$) evita que las tareas queden a medias y previene la sobrecarga del workflow automático de rollover entre sprints.
