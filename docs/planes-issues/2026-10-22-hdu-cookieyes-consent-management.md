# HDU: Implementación y configuración de CookieYes para gestión de consentimiento de cookies y Ley 21.719

**Issue GitHub:** [#221](https://github.com/acortespcf/proyectos-ecommerce/issues/221)  
**Fecha:** 22 de octubre de 2026  
**Autor:** Ain Cortés Catoni  
**Estado:** `status:tareas por hacer` | `priority:high`  

---

### 1. 👤 Definición HDU
#### **YO COMO USUARIO de** pc Factory
#### **QUIERO** poder aceptar, rechazar o personalizar el uso de cookies y rastreadores desde el banner de CookieYes
#### **PARA** navegar de forma segura e informada, protegiendo mi privacidad conforme a la Ley 21.719 de Protección de Datos Personales en Chile.

---

### 2. 🛠️ Consideraciones técnicas
- **CMP (Consent Management Platform):** CookieYes (Plan Pro, Script ID `c5c7942001b4b98ff50c3e39efed9bea`).
- **Modyo CMS (Plantillas):**
  - El snippet `caas_html` debe inyectarse en el `<head>` como el **primer script prioritario**, estrictamente antes de Google Tag Manager (`GTM-MTJWZKM` en cert / `GTM-M4W5WBX` en prod) y antes de Retail Rocket.
  - Asegurar que no exista inyección duplicada en `header` o en el `<body>`.
- **Google Consent Mode v2:**
  - Integración automática vía GTM para que tags de Google Analytics 4, Google Ads, Meta Pixel y TikTok Pixel retengan cookies hasta recibir el consentimiento del usuario.
- **Herramientas de Terceros Directas (Sin GTM):**
  - **Retail Rocket:** Asignar Script URL pattern `retailrocket.net` en el Cookie Manager para controlar la carga de `trackingm.js` y sus cookies (`rcuid`, `rrpvid`, `rr-testCookie`).
  - **Postcenter / TalkCenter:** Asignar Script URL pattern `postcenter.io` y `talkcenter.io` para cookies funcionales de soporte y chat.
- **Servidor MCP:**
  - Configurado en `.mcp.json` para auditorías, escaneos y ajustes visuales automáticos vía terminal.

---

### 3. 📊 Valor del Negocio Definido
- Cumplimiento exigible bajo la nueva Ley 21.719 de Protección de Datos Personales (vigencia dic 2026).
- Evitar sanciones regulatorias y proteger la reputación de pc Factory.
- Brindar trazabilidad y transparencia sobre el tratamiento de datos y tecnologías de rastreo.

---

### 4. ✅ Impacto y ❌ Riesgos
- **Impacto:**
  - Bloqueo efectivo del 100% de cookies publicitarias y analíticas previas al consentimiento (*Prior Consent*).
  - Trazabilidad y almacenamiento auditable de consentimientos.
- **Riesgos:**
  - Si el snippet se ubica debajo de GTM en producción, se violará el consentimiento previo instalando cookies de marketing inmediatamente.
  - Scripts inline que dependan de bibliotecas globales (como `rrApi`) deben probarse para no generar errores de consola cuando no haya consentimiento.

---

### 5. 📸 Plan de pruebas
- [x] Validar en visita limpia que no se instalen cookies de GA4, Meta, TikTok ni Retail Rocket antes de interactuar con el banner (probado en cert).
- [x] Validar que al pulsar "Aceptar todo", se activen los scripts de analítica y marketing.
- [ ] Validar que al pulsar "Rechazar todo", solo persistan cookies técnicas estrictamente necesarias (`_pcfactory_session`, `cookieyes-consent`).
- [ ] Validar persistencia del consentimiento entre sesiones y recargas de página.
- [ ] Validar funcionamiento en dispositivos móviles y desktop.

---

### 6. 📋 Criterios de Aceptación
- [x] CookieYes instalado en el `<head>` de `cert-portal` antes de GTM y sin duplicados en el `<body>`.
- [x] Escaneo de 4.000 páginas ejecutado y completado.
- [ ] Reclasificar las 5 cookies pendientes en "Sin categorizar" (`ttcsid` a Anuncio, `__COM_SPEED` a Rendimiento, cookies de Postcenter a Funcional).
- [ ] Asignar el patrón `retailrocket.net` a las cookies de Retail Rocket en el panel de CookieYes.
- [ ] Publicar los cambios en CookieYes (*Publish changes*).
- [ ] Replicar la configuración de cabeceras en Modyo para el sitio de producción (`pcfactory.cl`).
- [ ] Documentación técnica de entrega y bitácora guardada en `ley-de-datos/cookieyes/ESTADO_PROYECTO_COOKIEYES.md`.

---

### 7. 🌿 Rama Propuesta
```bash
feat/chile-221-cookieyes-consent-management
```

---

### 8. 📌 Scope
- [x] modyo
- [x] analytics
- [x] integraciones
- [x] ux
- [ ] checkout
- [ ] pdp
- [ ] plp
- [x] home
- [x] otro

---

### 9. 🔗 Links Relacionados
- **Bitácora y estado técnico:** `ley-de-datos/cookieyes/ESTADO_PROYECTO_COOKIEYES.md`
- **Issue relacionado:** #153 ([FEAT] Gestor centralizado de preferencias de privacidad, cookies y consentimientos)
- **Panel de CookieYes:** https://app.cookieyes.com
- **Entorno de pruebas:** https://ww3.pcfactory.cl/cert-portal
