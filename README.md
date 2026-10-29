# proyectos-ecommerce

Repositorio central para el seguimiento, planificación, documentación técnica y gestión de iniciativas de desarrollo eCommerce de **PC Factory**.

---

## 🚀 Flujo de Trabajo y Metodología

El equipo gestiona su trabajo mediante **Scrum / Kanban** en **GitHub Projects** ([acortespcf/proyectos-ecommerce - Project #3](https://github.com/users/acortespcf/projects/3)).

* **Ciclos de Sprint:** Iteraciones regulares con seguimiento diario y retrospectiva.
* **Sprint Rollover Automático:** El flujo [`.github/workflows/sprint-rollover.yml`](.github/workflows/sprint-rollover.yml) traslada diariamente las tareas no finalizadas al siguiente sprint activo.
* **Definition of Ready (INVEST):** Toda historia que entra al sprint debe ser independiente, estimable y completable dentro de la iteración ($\le 5\text{ SP}$).

---

## 📏 Criterios de Estimación (Tallas y Story Points)

El equipo maneja dos niveles de estimación según el nivel de granularidad:
1. **Tallas (T-Shirt Sizing):** Macroestimación para Roadmaps, Gantt y backlog de alto nivel.
2. **Story Points (Fibonacci):** Microestimación para issues y sprints en GitHub Projects.

> 📖 **Guía completa y cálculo de capacidad:** Consulta [docs/agile/estimacion-story-points.md](docs/agile/estimacion-story-points.md).

### 1. Macroestimación: Tallas (T-Shirt Sizing)

| Talla | Tiempo estimado | Alcance típico |
| :---: | :--- | :--- |
| **XS** | Menos de 1 semana | Quick wins, configuración o fixes menores |
| **S** | 1 semana | Feature pequeña o paquete de mejoras acotadas |
| **M** | 2 semanas | Feature estándar que cabe en 1 sprint completo |
| **L** | Hasta 3 semanas | Proyecto mediano que cruza sprints (~1.5 sprints) |
| **XL** | 1 a 2 meses | Épica mayor o proyecto trimestral (múltiples HDUs) |
| **XXL** | 2 meses o más | Gran iniciativa estratégica o transformación de plataforma |

### 2. Microestimación: Story Points (Fibonacci)

| Story Points | Claridad / Conocimiento | Dependencias | Esfuerzo Neto | Acción para el Sprint | Ejemplos en eCommerce |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1 SP** | Todo claro | Ninguna | < 2 horas | ✅ Entra directo (Quick win) | Corrección de texto, estilo CSS puntual, meta tag SEO. |
| **2 SP** | Casi todo claro | Casi ninguna | ~Medio día (~4 hrs) | ✅ Entra directo | Validación simple de formulario, ajuste UI responsivo. |
| **3 SP** | Conocimiento medio | Algunas | 1 a 2 días | ✅ Entra directo | Endpoint REST estándar, componente PDP con llamada a API. |
| **5 SP** | Poca claridad previa | Pocas o moderadas | 3 a 4 días | ✅ Entra directo (Máximo recomendado) | Integración con servicio externo, filtros avanzados PLP. |
| **8 SP** | Muy poca claridad | Múltiples | ~1 semana | ⚠️ Candidato a dividir | Buscador con facetado complejo, refactor mayor. |
| **13 SP** | Incertidumbre total | Desconocidas / Críticas | > 1 semana | ⛔ **NO entra al Sprint** (Debe dividirse) | Pasarela de pago completa, nuevo checkout integral. |

---

## 🌿 Convenciones de Ramas

Las ramas deben crearse siguiendo el estándar definido en las plantillas de issues:

* **Features:** `feat/chile-[ISSUE-NUMBER]-<descripcion-en-kebab-case>`  
  *Ejemplo:* `feat/chile-1234-schema-markup-vuelta-clases`
* **Bug Fixes:** `fix/chile-[ISSUE-NUMBER]-<descripcion-en-kebab-case>`  
  *Ejemplo:* `fix/chile-5678-gmb-sincronizacion-inventario`

---

## 🏷️ Scopes del Proyecto

Los requerimientos e issues se categorizan bajo los siguientes ámbitos:
* `seo` (Optimización para motores de búsqueda, Core Web Vitals)
* `gmb` (Google My Business / Google Business Profile)
* `modyo` (Arquitectura y widgets Modyo)
* `analytics` (Google Tag Manager, dataLayer, GA4)
* `integraciones` (Retail Rocket, pasarelas de pago, APIs externas)
* `ux` (Experiencia de usuario e interfaz)
* `checkout` (Flujos de compra y despacho)
* `pdp` / `plp` / `home` / `landing` (Vistas de catálogo y contenido)

---

## 📁 Estructura del Repositorio

* `.github/ISSUE_TEMPLATE/`: Plantillas oficiales para Historias de Usuario, Features y FIX con guía de estimación interactiva.
* `.github/workflows/`: Automatizaciones de GitHub Actions (incluyendo sprint rollover).
* `docs/agile/`: Criterios ágiles, estimación y cálculo de capacidad del equipo.
* `docs/planes-issues/`: Planes de creación y documentación de Épicas y HDUs.
* `bitacora/`: Registros diarios, seguimiento de tareas e informes de desarrollo.
