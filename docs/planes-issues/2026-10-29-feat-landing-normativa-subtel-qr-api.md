## 📋 Descripción
Desarrollar e integrar en producción la nueva **Landing de Información Regulatoria SUBTEL (`/norma-subtel`)** en Modyo, junto con el **endpoint de API REST provisto por TI (Backend)**, para dar cumplimiento a la **Resolución Exenta N° 737** (que modifica la Resolución N° 1.985 de 2017 de la Subsecretaría de Telecomunicaciones de Chile) sobre **Equipos de Alcance Reducido (SRD)**.

La solución permite a los clientes de pc Factory:
1. **Escanear el código QR físico** impreso en el empaque, producto o boleta de compra y aterrizar directamente en la ficha regulatoria del equipo (`/norma-subtel?id={id_producto}`).
2. **Buscar manualmente productos** por **ID técnico (SKU), nombre comercial, modelo o marca** mediante un buscador centralizado con desplegable de sugerencias en tiempo real (autocompletado).
3. **Visualizar la Ficha Técnica y Comercial obligatoria** exigida por SUBTEL (frecuencias, tecnología/modulación, ganancia de antena, P.I.R.E., módulos y número de página donde figura cada dato en el informe) y **descargar el *Test Report* oficial en formato PDF**.

> **Estado actual del desarrollo (Avance en Modyo CERT):**  
> Ya se encuentra maquetado y publicado en ambiente de certificación (`ww3.pcfactory.cl`, widget `subtel` en página `norma-subtel`) el frontend completo en HTML, CSS responsivo (Desktop y Mobile con acordeón colapsable) y JavaScript funcional conectado temporalmente a un Mock JSON en Modyo Assets. Este issue documenta el **entregable para que el desarrollador front continúe la integración final** y la **especificación técnica del endpoint que necesitamos de TI (Backend / API)**.

---

## 👤 Historia de Usuario
#### **YO COMO** cliente de pc Factory o fiscalizador de SUBTEL
#### **QUIERO** consultar mediante código QR o buscador por ID/nombre las especificaciones radioeléctricas, datos de importación y el *Test Report* en PDF de cualquier equipo inalámbrico comercializado por pc Factory
#### **PARA** verificar de forma transparente y en español el cumplimiento normativo de emisiones radioeléctricas (Resolución Exenta N° 737 SUBTEL).

---

## 🎯 Contexto
La normativa sobre el código QR de la Subsecretaría de Telecomunicaciones de Chile (**Resolución Exenta N° 737**, vigente desde el 22 de febrero de 2026) establece que todos los equipos de alcance reducido (Wi-Fi, Bluetooth, Zigbee, RFID, IoT, notebooks, routers, mouses inalámbricos, audífonos, etc.) deben exhibir un código QR visible que redirija a un sitio web en español con:
- **Datos del fabricante, importador o representante legal en Chile** (Personal Computer Factory S.A.).
- **Nombre comercial y características técnicas del equipo** (bandas de frecuencia, tecnología o modulación, ganancia de antena en dBi, potencia P.I.R.E., módulos) indicando la **página de referencia** dentro del informe de ensayo.
- **Informe de ensayo (*Test Report*) descargable** en PDF emitido por un laboratorio acreditado.

---

## 📊 Valor de Negocio
- **Cumplimiento normativo y legal:** Evita multas, sanciones o bloqueos de comercialización por parte de SUBTEL sobre el catálogo de productos con conectividad inalámbrica importados y de marca propia.
- **Transparencia y respaldo técnico:** Refuerza la confianza del cliente exhibiendo certificaciones oficiales y respaldo técnico en una interfaz alineada al diseño corporativo de pc Factory.
- **Escalabilidad operacional:** Centraliza en una sola landing dinámica (`/norma-subtel`) la consulta de miles de SKUs mediante parámetros de URL (`?id=54321`) para la generación automatizada de etiquetas QR.

---

## 🔌 Lo que necesitamos de TI (Backend / Especificación de API REST)

Para reemplazar el Mock JSON actual por datos productivos, necesitamos que el equipo de **TI / Backend** disponibilice un servicio REST de consulta pública con las siguientes características:

### 1. Endpoint de Búsqueda y Coincidencias
```http
GET /api/v1/subtel/products?q={termino}&exact={boolean}&limit={numero}
```

#### Parámetros de Consulta (Query Params)
| Parámetro | Tipo | Requerido | Descripción | Ejemplo |
| :--- | :--- | :---: | :--- | :--- |
| `q` | `string` | **Sí** | Término de búsqueda: ID numérico (SKU), nombre del producto, modelo o marca. | `q=notebook` o `q=54321` |
| `exact` | `boolean` | No (default `false`) | Si es `true`, fuerza coincidencia exacta por ID/SKU o modelo y devuelve la ficha completa. | `exact=true` |
| `limit` | `integer` | No (default `10`, máx `50`) | Límite de resultados devueltos para el desplegable de autocompletado. | `limit=8` |

---

#### Caso A: Búsqueda Parcial / Listado de Coincidencias (`exact_match: false`)
Cuando el usuario escribe un término parcial en el buscador (ej. `q=notebook` o `q=asus`), el endpoint debe devolver un listado liviano de coincidencias para pintar el desplegable (autocomplete):

```json
{
  "status": "success",
  "query": "notebook",
  "exact_match": false,
  "total": 4,
  "results": [
    {
      "id": "54321",
      "sku": "54321",
      "marca": "Acer",
      "nombre": "Notebook Aspire Lite AMD Ryzen 3 5400U 15.6\" 8GB RAM 256GB SSD Windows 11 Home",
      "modelo": "ThinkPad T14 Gen 3",
      "tipo_equipo": "Computador portátil (Notebook)"
    },
    {
      "id": "52890",
      "sku": "52890",
      "marca": "Asus",
      "nombre": "Asus Gamer ROG Strix G16 AMD Ryzen 9-8940HX NVIDIA GeForce RTX 5060 16\" 240Hz 32GB RAM 1TB SSD Windows 11 Home Gris G614PM",
      "modelo": "ROG Strix G16 (G614PM)",
      "tipo_equipo": "Computador portátil para videojuegos (Notebook)"
    }
  ]
}
```

---

#### Caso B: Coincidencia Exacta / Ficha Completa del Producto (`exact_match: true`)
Cuando se pasa un **ID exacto** (ej. `q=54321`), un **nombre exacto**, o se consulta el endpoint de detalle `GET /api/v1/subtel/products/{id}`, debe devolver la estructura completa para pintar las tablas normativas y el enlace al PDF del *Test Report*:

```json
{
  "status": "success",
  "query": "54321",
  "exact_match": true,
  "product": {
    "id": "54321",
    "sku": "54321",
    "marca": "Acer",
    "nombre": "Notebook Aspire Lite AMD Ryzen 3 5400U 15.6\" 8GB RAM 256GB SSD Windows 11 Home",
    "modelo": "ThinkPad T14 Gen 3",
    "tipo_equipo": "Computador portátil (Notebook)",
    "imagen_url": "https://assets.pcfactory.cl/public/foto/54321/1_500.jpg",
    "test_report": {
      "url": "https://assets.pcfactory.cl/docs/subtel/test-report-54321.pdf",
      "nombre_archivo": "Test Report 54321.pdf",
      "laboratorio": "Laboratorio de Ensayos y Certificación Internacional",
      "normativa": "Resolución Exenta N° 737 / Res. 1.985 SUBTEL"
    },
    "informacion_tecnica": {
      "id": { "label": "ID", "valor": "54321", "pagina": null },
      "tipo_equipo": { "label": "Tipo de equipo", "valor": "Computador portátil (Notebook)", "pagina": 2 },
      "marca": { "label": "Marca", "valor": "Lenovo", "pagina": 2 },
      "modelo": { "label": "Modelo", "valor": "ThinkPad T14 Gen 3", "pagina": 4 },
      "tecnologia_modulacion": {
        "label": "Tecnología o modulación",
        "valor": "Wi-Fi IEEE 802.11a/b/g/n/ac/ax (OFDM, DSSS)\nBluetooth 5.2 (GFSK, n/4-DQPSK, 8DPSK)",
        "pagina": 5
      },
      "frecuencias": {
        "label": "Frecuencias",
        "valor": "Wi-Fi: 2,4 GHz (2400-2483,5 MHz) / 5 GHz (5150-5850 MHz)\nBluetooth: 2402-2480 MHz",
        "pagina": 6
      },
      "ganancia_antena": {
        "label": "Ganancia de antena (dBi)",
        "valor": "Wi-Fi: hasta 3,5 dBi\nBluetooth: hasta 2,0 dBi",
        "pagina": 7
      },
      "pire": {
        "label": "P.I.R.E.",
        "valor": "Wi-Fi 2,4 GHz: ≤ 20 dBm\nWi-Fi 5 GHz: ≤ 23 dBm\nBluetooth: ≤ 10 dBm",
        "pagina": 7
      },
      "modulos": {
        "label": "Módulos",
        "valor": "Wi-Fi/Bluetooth integrado (Intel® Wi-Fi 6E AX211)",
        "pagina": 7
      }
    },
    "informacion_comercial": {
      "fecha_publicacion": { "label": "Fecha de publicación", "valor": "14 de enero de 2026" },
      "nombre_comercial": { "label": "Nombre comercial del equipo", "valor": "Notebook portátil" },
      "fabricante": { "label": "Fabricante", "valor": "Lenovo Group Ltd." },
      "importador": { "label": "Importador o representante en Chile", "valor": "Personal Computer Factory S.A." },
      "domicilio": { "label": "Domicilio", "valor": "Manuel Montt 170, Providencia , Chile" },
      "email_contacto": { "label": "Correo electrónico de contacto", "valor": "soporte@pcfactory.cl" },
      "sitio_web": { "label": "Sitio web", "valor": "www.pcfactory.cl" }
    }
  }
}
```

---

### 2. Endpoint de Consulta Directa por ID (Aterrizaje desde QR físico)
```http
GET /api/v1/subtel/products/{id}
```
- Cuando el cliente escanea el QR físico (`https://www.pcfactory.cl/norma-subtel?id=54321`), el frontend lee el parámetro `id` y consulta directamente este endpoint (o `?q=54321&exact=true`).
- Si no existe el producto, debe responder `HTTP 404 Not Found`:
  ```json
  {
    "status": "error",
    "code": "PRODUCT_NOT_FOUND",
    "message": "No se encontró ningún producto registrado con el identificador proporcionado."
  }
  ```

### 3. Requisitos No Funcionales para TI
- **Latencia:** `< 150ms` para soportar el autocompletado fluido mientras el usuario escribe (el frontend aplica un `debounce` de `150ms–250ms`).
- **CORS:** Habilitar `Access-Control-Allow-Origin` para `https://www.pcfactory.cl`, `https://ww3.pcfactory.cl` y dominios de previsualización de Modyo.
- **Almacenamiento de PDFs (*Test Reports*):** Alojar los documentos PDF en un bucket S3/CDN público con enlaces directos descargables en el campo `test_report.url`.
- **Caché HTTP:** Se sugiere `Cache-Control: public, max-age=3600` en las fichas por ID dado que los parámetros técnicos regulatorios son estáticos.

---

## 💻 Estado Actual del Frontend (Entregable para el Desarrollador)

El desarrollo base ya fue implementado y probado en Modyo CERT:
- **Widget en Modyo (`pcfactory.cl` - CERT):** `subtel`
- **Página en Modyo:** `norma-subtel`
- **Mock JSON activo para pruebas en Modyo Assets:** `https://assets-v3.pcfactory.cl/uploads/46ab6606-ad5b-462f-ac33-cf113835fd2d/original/products.json` (contiene 8 productos de prueba: IDs `54321`, `52890`, `51204`, `53112`, `54099`, `49876`, `48120`, `46550`).
- **Funcionalidades ya construidas en el Widget:**
  - Hero informativo y 3 tarjetas de instrucciones con iconografía SVG vectorial.
  - Acordeón colapsable en vista Mobile (`<= 768px`) con tarjetas en disposición horizontal conforme a maqueta Adobe XD.
  - Buscador centralizado con botón limpiar (`×`), botón lupa, autocompletado con resaltado de coincidencias en verde y navegación por teclado (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`).
  - Renderizado dinámico de **Tabla de Información Técnica** (con columna `"Página"`) y **Tabla de Información Comercial**, imagen de producto (o ícono placeholder de cámara) y botón de descarga del **Test Report**.
  - Soporte de lectura automática de query param `?id=` o `?sku=` al cargar la página y sincronización de URL vía `window.history.replaceState`.

---

## 🛠️ Tareas Técnicas

### 🔹 Subtarea 1: Desarrollo de API REST y Repositorio de Test Reports (Equipo TI / Backend)
- [ ] Modelar en base de datos / ERP los campos regulatorios SUBTEL por producto (`informacion_tecnica` con número de página del reporte, `informacion_comercial` y URL del PDF `test_report`).
- [ ] Desarrollar y exponer el endpoint `GET /api/v1/subtel/products` (búsqueda parcial por término y coincidencia exacta) y `GET /api/v1/subtel/products/{id}` según el contrato JSON especificado en este issue.
- [ ] Configurar bucket/CDN para alojar los archivos PDF de los *Test Reports* e incluir su URL pública en la respuesta.
- [ ] Configurar políticas de CORS y caché en el API Gateway (ambientes CERT y PROD).

### 🔹 Subtarea 2: Continuación e Integración Productiva del Widget en Modyo (Desarrollador Frontend)
- [ ] Revisar el widget `subtel` actualmente publicado en Modyo CERT (`norma-subtel`).
- [ ] Parametrizar la URL del endpoint mediante variable de sitio en Modyo (`{{ vars.subtel_api_url }}`), manteniendo compatibilidad con la estructura de respuesta de la API de TI (`data.exact_match`, `data.product`, `data.results`).
- [ ] Retirar la barra temporal de pruebas rápidas (`.subtel-dev-toolbar` con los botones de ejemplo `ID: 54321`, etc.) antes del paso a producción.
- [ ] Agregar estado visual de carga (*spinner* / *skeleton*) en la sección de resultados mientras resuelve la petición por ID cuando el usuario aterriza desde un código QR.
- [ ] Verificar que el enlace del ID dentro de la tabla técnica (`54321`) redirija a la ficha comercial del producto en pc Factory (`/producto/{id}`) si el producto se encuentra activo en el catálogo de venta.

### 🔹 Subtarea 3: QA Funcional, Responsivo y Validación de QR (QA / Ecommerce)
- [ ] Validar el flujo completo en Desktop y Mobile comparando contra las maquetas de Adobe XD.
- [ ] Probar generación de código QR apuntando a `https://www.pcfactory.cl/norma-subtel?id={id}` y verificar carga directa de la ficha sin interacción adicional.

---

## ✅ Criterios de Aceptación
- [ ] **CA-01 (Búsqueda por coincidencias / Autocomplete):** Al escribir un término parcial (nombre o marca, ej. `"Notebook"` o `"Asus"`), el buscador despliega hasta 8 coincidencias bajo el input resaltando el término buscado.
- [ ] **CA-02 (Búsqueda exacta por ID o selección):** Al ingresar un ID exacto (ej. `54321`) o hacer clic/Enter sobre una sugerencia del desplegable, se renderiza inmediatamente la ficha regulatoria completa debajo del buscador.
- [ ] **CA-03 (Acceso directo vía Código QR):** Al ingresar a `/norma-subtel?id=54321`, la página consulta automáticamente la API con ese ID y despliega la ficha técnica y comercial sin requerir acción manual del usuario.
- [ ] **CA-04 (Tablas Normativas SUBTEL):** Se visualizan correctamente la tabla de **Información Técnica** (con las 3 columnas: Parámetro, Valor y Página) y la tabla de **Información Comercial** (con enlaces activos para correo de contacto y sitio web).
- [ ] **CA-05 (Descarga de Test Report):** El enlace `Test Report` bajo la imagen del producto abre o descarga en una nueva pestaña el documento PDF oficial del laboratorio acreditado.
- [ ] **CA-06 (Manejo de Sin Resultados):** Si se busca un ID o término inexistente, se muestra un mensaje claro indicando cómo ubicar el código de 5 dígitos en la etiqueta de la caja o boleta.
- [ ] **CA-07 (Diseño Responsivo y Acordeón Mobile):** En resoluciones `<= 768px`, la imagen hero lateral se oculta y la sección *"¿Cómo encontrar el ID o Modelo de tu equipo?"* funciona como un contenedor con borde y acordeón colapsable con tarjetas horizontales.

---

## 📏 Estimación (Story Points)
<details>
<summary>📏 <b>Guía rápida de Estimación (Story Points)</b></summary>

| Puntos | Claridad | Dependencias | Esfuerzo neto | Acción en Sprint |
| :---: | :--- | :--- | :---: | :--- |
| **1 SP** | Todo claro | Ninguna | < 2 horas | Entra directo (Quick win) |
| **2 SP** | Casi todo claro | Casi ninguna | ~Medio día | Entra directo |
| **3 SP** | Conocimiento medio | Algunas | 1 a 2 días | Entra directo |
| **5 SP** | Poca claridad previa | Pocas/moderadas | 3 a 4 días | Entra (Límite máximo recomendado) |
| **8 SP** | Muy poca claridad | Múltiples | ~1 semana | ⚠️ Dividir si es posible |
| **13 SP** | Incertidumbre total | Desconocidas | > 1 semana | ⛔ NO entra: Debe dividirse |

> *Ver guía completa y cálculo de capacidad:* [docs/agile/estimacion-story-points.md](docs/agile/estimacion-story-points.md)
</details>

- **Estimate asignado:** 3 SP (Frontend ya cuenta con la maqueta funcional en Modyo CERT; resta conexión con endpoint definitivo de TI y ajustes finales de integración).

---

## ✅ Impacto y ❌ Riesgos
- **Impacto positivo:**
  - Cumplimiento oportuno de la Resolución Exenta N° 737 de SUBTEL.
  - Experiencia de consulta rápida (< 1 segundo) tanto desde móviles en tienda/hogar (escaneo QR) como desde escritorio.
- **Riesgos y mitigaciones:**
  - *Dependencia de datos en ERP/Backend:* Si un producto aún no tiene cargada su foto en catálogo, el widget muestra automáticamente el placeholder oficial de cámara definido en diseño.
  - *Disponibilidad del endpoint TI:* El frontend ya cuenta con la estructura lista para alternar entre el mock JSON y la API real mediante configuración.

---

## 📸 Plan de Pruebas
| Caso | Escenario | Resultado Esperado |
| :--- | :--- | :--- |
| **1. Búsqueda parcial (Autocomplete)** | Escribir `"Notebook"` o `"Asus"` en el input | Se despliega lista de coincidencias con texto coincidente resaltado en verde y badge de ID. |
| **2. Selección desde desplegable** | Hacer clic o presionar `Enter` sobre un resultado | Se cierra el desplegable, se rellena el input, cambia la URL a `?id={id}` y se muestran las tablas Técnica y Comercial. |
| **3. Escaneo de Código QR** | Abrir URL directa `/norma-subtel?id=54321` | La página carga directamente con el input relleno y la ficha del producto `54321` desplegada. |
| **4. Descarga de PDF** | Hacer clic en el enlace `Test Report` bajo la imagen | Se abre/descarga el archivo PDF correspondiente al informe de ensayo del equipo. |
| **5. Producto no encontrado** | Buscar ID inexistente `99999` | Se oculta la sección de tablas y se muestra la alerta informativa de sin resultados. |
| **6. Acordeón Mobile** | Abrir en viewport `< 768px` y pulsar el ícono chevron `^` | El bloque instructivo se pliega/despliega limpiamente dentro de su marco con borde y las 3 tarjetas se ven en formato horizontal. |

---

## 🌿 Rama Propuesta
```
feat/chile-227-landing-normativa-subtel-qr-api
```

---

## 📌 Scope
- [x] modyo
- [x] integraciones
- [x] ux
- [ ] seo
- [ ] checkout
- [ ] pdp
- [ ] plp
- [ ] home
- [ ] otro

---

## 🔗 Links Relacionados
- **Maquetas y Especificaciones Adobe XD:** [https://xd.adobe.com/view/9d3d4e7d-be4d-4036-a22f-503bf4fb6016-c86e/specs/](https://xd.adobe.com/view/9d3d4e7d-be4d-4036-a22f-503bf4fb6016-c86e/specs/)
- **Mock JSON de pruebas en Modyo Assets:** [https://assets-v3.pcfactory.cl/uploads/46ab6606-ad5b-462f-ac33-cf113835fd2d/original/products.json](https://assets-v3.pcfactory.cl/uploads/46ab6606-ad5b-462f-ac33-cf113835fd2d/original/products.json)
- **Widget Modyo (CERT):** `subtel` (asignado a la página `norma-subtel`)
