# Uso rapido del skill `bitacora`

## Ejemplo completo
```txt
fecha: 22-05-2026
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

## Ejemplo con dato faltante
Entrada:
```txt
desarrollo:
- Ajuste de estilos PDP
```

Respuesta esperada del skill:
`Me falta solo la fecha para crear la bitacora. Que fecha quieres usar (DD-MM-AAAA)?`
