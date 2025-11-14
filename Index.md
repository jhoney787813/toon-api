# 📚 Índice Completo del Proyecto: JSON vs TOON

## 📌 Descripción General

Este proyecto es una **API en Node.js** que compara dos formatos de datos:
- **JSON**: Formato estándar ampliamente utilizado
- **TOON**: Formato simplificado basado en tokens (Token Oriented Object Notation)

La API mide y compara tiempos de procesamiento entre ambos formatos, permitiéndote ver cuál es más eficiente para diferentes casos.

---

## 📁 Archivos del Proyecto

### 1. **server.js** ⚙️
- **Descripción:** Servidor HTTP principal
- **Tamaño:** 5.6 KB
- **Contenido:**
  - Clase `JSONParser`: Parsea JSON usando `JSON.parse()`
  - Clase `TOONParser`: Parsea TOON manualmente
  - 4 endpoints HTTP (GET /, GET /ejemplo, POST /parse-json, POST /parse-toon)
  - Medición de tiempos con `performance.now()`
- **Cómo ejecutar:** `node server.js`

### 2. **client.js** 🧪
- **Descripción:** Cliente para hacer pruebas automatizadas
- **Tamaño:** 2.9 KB
- **Contenido:**
  - Realiza peticiones POST a ambos endpoints
  - Compara tiempos de procesamiento
  - Muestra resumen comparativo
- **Cómo ejecutar:** `node client.js` (mientras server.js está activo)

### 3. **package.json** 📦
- Configuración del proyecto Node.js
- No requiere dependencias externas (usa módulos nativos)

### 4. **README.md** 📖
- Documentación técnica del proyecto
- Instrucciones paso a paso
- Explicación del formato TOON
- Descripción de endpoints
- Ventajas y desventajas

### 5. **GUIA_COMPLETA.md** 📚
- Guía completa y detallada
- Incluye:
  - ¿Qué es TOON?
  - Comparación de formatos
  - Paso a paso para ejecutar
  - Descripción detallada de endpoints
  - Resultados de pruebas reales
  - Análisis comparativo
  - Conceptos aprendidos

### 6. **DIAGRAMAS_Y_EJEMPLOS.md** 🎨
- Diagramas visuales del proyecto
- Contenido:
  - Flujo de la API
  - Ejemplos de datos simples, medios y complejos
  - Tabla de comparación de velocidad
  - Árbol de decisión (¿Cuál usar?)
  - Tabla de compacidad
  - Casos de uso
  - Extensiones propuestas para TOON
  - Matriz de comparación completa

### 7. **EJEMPLOS_PETICIONES.md** 🔗
- Ejemplos listos para copiar y pegar
- Incluye código en:
  - cURL (terminal)
  - JavaScript (Fetch API)
  - Python (requests)
  - PHP (cURL)
  - C# (.NET)
  - Java (HttpClient)
  - Postman (interfaz gráfica)
  - Pruebas automatizadas

### 8. **este archivo (INDICE.md)** 📑
- Índice y resumen de todo

---

## 🚀 Inicio Rápido

### Paso 1: Descarga los archivos
```
Los 7 archivos anteriores están en esta carpeta
```

### Paso 2: Abre dos terminales

**Terminal 1 - Servidor:**
```bash
node server.js
```

**Terminal 2 - Cliente:**
```bash
node client.js
```

### Resultado esperado:
```
📊 COMPARACIÓN JSON vs TOON

1️⃣ PRUEBA CON JSON
✅ Tiempo: 0.0109 ms

2️⃣ PRUEBA CON TOON
✅ Tiempo: 0.2738 ms

📈 RESUMEN COMPARATIVO
Diferencia: 0.2629 ms
⚡ JSON fue más rápido
📦 Tamaño JSON: 150 bytes
📦 Tamaño TOON: 118 bytes
```

---

## 📊 Resultados Clave

### Velocidad
```
JSON: 0.0109 ms
TOON: 0.2738 ms
→ JSON es ~25x más rápido
```

### Compacidad
```
JSON: 150 bytes
TOON: 118 bytes
→ TOON es 21% más compacto
```

### Recomendación
- **Producción:** JSON ✅
- **IoT/Compacidad extrema:** TOON
- **General:** JSON siempre es mejor opción

---

## 🔌 Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información de la API |
| GET | `/ejemplo` | Ver ejemplos TOON vs JSON |
| POST | `/parse-json` | Parsear contenido JSON |
| POST | `/parse-toon` | Parsear contenido TOON |

---

## 📋 Formato TOON Explicado

### Sintaxis Básica
```
KEY:VALUE|KEY:VALUE|...
```

### Tipos de Datos
- **String:** `nombre:Juan`
- **Array:** `hobbies[lectura,deportes]`
- **Objeto:** `contacto{email:juan@email.com}`

### Ejemplo Completo
```
nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}
```

### Equivalente en JSON
```json
{
  "nombre": "Juan",
  "edad": 30,
  "ciudad": "Madrid",
  "hobbies": ["lectura", "deportes", "viajes"],
  "contacto": {
    "email": "juan@example.com",
    "telefono": "123456789"
  }
}
```

---

## 🎯 Casos de Uso

### ✅ Usa JSON si:
- [ ] Proyecto de producción
- [ ] Necesitas compatibilidad universal
- [ ] Datos complejos anidados
- [ ] Trabajas con APIs REST estándar
- [ ] Necesitas validación de esquema

### ✅ Usa TOON si:
- [ ] Necesitas máxima compacidad
- [ ] Datos predecibles/estructurados
- [ ] Ancho de banda es crítico
- [ ] Dispositivos IoT
- [ ] Comunicación en tiempo real

---

## 🛠️ Arquitectura Técnica

```
┌──────────────────────────────────────┐
│     CLIENT (client.js)               │
│  Realiza pruebas automatizadas      │
└──────────────┬───────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
    ▼                     ▼
POST /parse-json    POST /parse-toon
    │                     │
    │                     │
┌───┴─────────────────────┴──────┐
│  SERVER (server.js)            │
│  ┌─────────────────────────┐  │
│  │ JSONParser              │  │
│  │ - JSON.parse()          │  │
│  │ - Mide tiempo           │  │
│  └─────────────────────────┘  │
│                               │
│  ┌─────────────────────────┐  │
│  │ TOONParser              │  │
│  │ - Parsea tokens         │  │
│  │ - Maneja arrays/objetos │  │
│  │ - Mide tiempo           │  │
│  └─────────────────────────┘  │
└───┬──────────────────────┬─────┘
    │                      │
    ▼                      ▼
JSON Response         TOON Response
(con tiempo)         (con tiempo)
```

---

## 📚 Documentación por Tema

### Para entender qué es TOON:
→ Lee **README.md** o **GUIA_COMPLETA.md**

### Para ver comparaciones visuales:
→ Lee **DIAGRAMAS_Y_EJEMPLOS.md**

### Para probar con tu herramienta favorita:
→ Lee **EJEMPLOS_PETICIONES.md**

### Para entender la arquitectura:
→ Lee **server.js** y **client.js**

---

## 🔍 Cómo Personalizar

### Cambiar los datos a comparar
Edita `client.js`, línea ~20:
```javascript
const datos = {
  nombre: 'Juan',
  edad: 30,
  ciudad: 'Madrid',
  // Agregar más campos
};
```

### Agregar más endpoints
Edita `server.js`, después de line ~120, agrega:
```javascript
if (pathname === '/mi-endpoint' && req.method === 'POST') {
  // Tu lógica aquí
}
```

### Extender formato TOON
Edita `TOONParser._parseTOON()` en `server.js`

---

## ❓ Preguntas Frecuentes

### ¿Por qué JSON es más rápido?
Porque `JSON.parse()` está ultra-optimizado en el motor V8 del navegador/Node.js, mientras que TOON usa parsing manual en JavaScript puro.

### ¿Cuándo debería usar TOON?
Solo cuando necesites máxima compacidad y en casos muy específicos (IoT, conexiones de datos limitados).

### ¿Es TOON un estándar?
No, es un formato experimental creado para este proyecto como comparación educativa.

### ¿Puedo usar esto en producción?
JSON sí. TOON no (solo con fines educativos).

### ¿Cómo agrego más parsers?
Crea una nueva clase en `server.js` que implemente `.parse()` y luego crea un nuevo endpoint.

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Archivos principales | 2 (server.js, client.js) |
| Archivos documentación | 5 |
| Líneas de código | ~250 |
| Endpoints | 4 |
| Formatos comparados | 2 |
| Ejemplos de código | 7+ lenguajes |
| Puerto por defecto | 3000 |

---

## 🎓 Conceptos Aprendidos

✅ Creación de APIs REST en Node.js
✅ Parsing personalizado de formatos
✅ Medición de performance (`performance.now()`)
✅ Módulo HTTP nativo
✅ Cliente HTTP con Node.js
✅ Comparación de formatos de datos
✅ Trade-offs: velocidad vs compacidad

---

## 📞 Soporte

Si tienes preguntas:

1. **Sobre TOON**: Lee GUIA_COMPLETA.md
2. **Sobre resultados**: Lee DIAGRAMAS_Y_EJEMPLOS.md
3. **Sobre cómo usar**: Lee EJEMPLOS_PETICIONES.md
4. **Sobre código**: Lee comentarios en server.js y client.js

---

## 🔗 Recursos Relacionados

- [JSON Oficial](https://www.json.org)
- [Node.js HTTP](https://nodejs.org/api/http.html)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [RFC 7159 - JSON](https://tools.ietf.org/html/rfc7159)

---

## ✅ Checklist de Lectura

Recomendada para nuevos usuarios:

1. [ ] Lee este archivo (INDICE.md)
2. [ ] Lee README.md
3. [ ] Lee GUIA_COMPLETA.md
4. [ ] Ejecuta server.js
5. [ ] Ejecuta client.js (en otra terminal)
6. [ ] Observa los resultados
7. [ ] Lee DIAGRAMAS_Y_EJEMPLOS.md
8. [ ] Elige un lenguaje en EJEMPLOS_PETICIONES.md
9. [ ] Prueba hacer peticiones
10. [ ] Modifica los datos y experimenta

---

## 🎉 Conclusión

Este proyecto te muestra:
- ✅ Cómo crear una API básica en Node.js
- ✅ Cómo comparar formatos de datos
- ✅ Cómo medir performance
- ✅ Cómo pensar en trade-offs de diseño
- ✅ Cómo documentar proyectos

**Recomendación final:** Para producción, siempre usa **JSON**. Es el estándar por buenas razones.

---

**Versión:** 1.0
**Fecha:** Noviembre 2025
**Autor:** Jhon Edison Hincapie Garcia
**Licencia:** Libre para usar y modificar

¡Disfruta aprendiendo sobre formatación de datos! 🚀