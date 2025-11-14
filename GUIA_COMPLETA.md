# 📊 GUÍA COMPLETA: Comparación JSON vs TOON

## 🎯 ¿Qué es TOON?

**TOON** (Token Oriented Object Notation) es un formato simplificado para representar datos usando tokens separados por pipes (`|`).

---

## 📝 Formatos Comparados

### 1. Formato JSON (Estándar)
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

**Tamaño:** 150 bytes

### 2. Formato TOON (Token Oriented)
```
nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}
```

**Tamaño:** 118 bytes (21% más compacto)

---

## 🏗️ Estructura de TOON

```
CLAVE:VALOR|CLAVE:VALOR|...
```

### Tipos de Datos en TOON:

| Tipo | Sintaxis | Ejemplo |
|------|----------|---------|
| String | `key:value` | `nombre:Juan` |
| Número | `key:123` | `edad:30` |
| Array | `key[item1,item2,...]` | `hobbies[lectura,deportes]` |
| Objeto | `key{subkey:value,...}` | `contacto{email:juan@email.com}` |

---

## 🚀 Paso a Paso para Ejecutar

### Prerequisitos
- Node.js instalado

### Paso 1: Descargar los archivos
```bash
# Los archivos están en:
# - server.js
# - client.js
# - README.md
```

### Paso 2: Instalar dependencias (opcional)
```bash
npm install
```
*Nota: Este proyecto usa módulos nativos de Node.js, no requiere dependencias externas*

### Paso 3: Iniciar el servidor
```bash
node server.js
```

Deberías ver:
```
✅ Servidor escuchando en http://localhost:3000
📝 Endpoints disponibles:
   - GET  http://localhost:3000/
   - GET  http://localhost:3000/ejemplo
   - POST http://localhost:3000/parse-json
   - POST http://localhost:3000/parse-toon
```

### Paso 4: En otra terminal, ejecutar las pruebas
```bash
node client.js
```

---

## 📈 Resultados de la Prueba

```
📊 COMPARACIÓN JSON vs TOON

════════════════════════════════════════════════════════════

1️⃣ PRUEBA CON JSON

Contenido enviado:
{"nombre":"Juan","edad":30,"ciudad":"Madrid",...}

Resultado:
✅ Procesado correctamente
⏱️ Tiempo: 0.0109 ms

════════════════════════════════════════════════════════════

2️⃣ PRUEBA CON TOON

Contenido enviado:
nombre:Juan|edad:30|ciudad:Madrid|...

Resultado:
✅ Procesado correctamente
⏱️ Tiempo: 0.2738 ms

════════════════════════════════════════════════════════════

📊 RESUMEN COMPARATIVO

Formato JSON: 0.0109 ms
Formato TOON: 0.2738 ms
Diferencia:   0.2629 ms

⚡ JSON fue más rápido (en este test)
📦 Tamaño JSON: 150 bytes
📦 Tamaño TOON: 118 bytes (21% más compacto)

════════════════════════════════════════════════════════════
```

---

## 🔌 Endpoints de la API

### 1. GET `/`
**Descripción:** Información general

**Request:**
```bash
curl http://localhost:3000/
```

**Response:**
```json
{
  "message": "API de comparación JSON vs TOON",
  "endpoints": {
    "POST /parse-json": "Parsear contenido en formato JSON",
    "POST /parse-toon": "Parsear contenido en formato TOON",
    "GET /ejemplo": "Ver ejemplos de formato TOON vs JSON"
  }
}
```

### 2. GET `/ejemplo`
**Descripción:** Muestra ejemplos

**Request:**
```bash
curl http://localhost:3000/ejemplo
```

**Response:**
```json
{
  "ejemplo": {
    "json": { ... },
    "toon": "nombre:Juan|edad:30|..."
  }
}
```

### 3. POST `/parse-json`
**Descripción:** Parsea contenido JSON

**Request:**
```bash
curl -X POST http://localhost:3000/parse-json \
  -H "Content-Type: application/json" \
  -d '{"content":"{\"nombre\":\"Juan\",\"edad\":30}"}'
```

**Response:**
```json
{
  "format": "JSON",
  "input": "{\"nombre\":\"Juan\",\"edad\":30}",
  "success": true,
  "data": {
    "nombre": "Juan",
    "edad": 30
  },
  "processingTime": "0.0109 ms"
}
```

### 4. POST `/parse-toon`
**Descripción:** Parsea contenido TOON

**Request:**
```bash
curl -X POST http://localhost:3000/parse-toon \
  -H "Content-Type: application/json" \
  -d '{"content":"nombre:Juan|edad:30"}'
```

**Response:**
```json
{
  "format": "TOON",
  "input": "nombre:Juan|edad:30",
  "success": true,
  "data": {
    "nombre": "Juan",
    "edad": "30"
  },
  "processingTime": "0.2738 ms"
}
```

---

## 📊 Análisis Comparativo

### ✅ Ventajas JSON
- ✨ Estándar mundial amplamente reconocido
- 🔧 Excelente soporte en todos los lenguajes
- 📖 Legible por humanos y máquinas
- 🎯 Manejo correcto de tipos de datos
- ⚡ Parsing muy optimizado (V8 JavaScript engine)

### ✅ Ventajas TOON
- 📦 Más compacto (18-25% menos bytes)
- 🚀 Potencial para datos predecibles
- 🎯 Sintaxis más simple
- 📱 Ideal para IoT y conexiones lentas

### ❌ Desventajas TOON
- ❌ No es un estándar
- ❌ Menos soporte en herramientas
- ❌ Más lento de parsear (en este test)
- ❌ Limitaciones con datos complejos

---

## 💡 Insights Importantes

1. **JSON es más rápido**: Aunque TOON es más compacto, JSON es más rápido porque está profundamente optimizado en los motores JavaScript.

2. **TOON es más compacto**: Ideal si el ancho de banda es crítico.

3. **La diferencia es mínima**: Para la mayoría de casos, ambos son suficientemente rápidos.

4. **JSON sigue siendo la opción recomendada** para producción debido a su estandarización.

---

## 📁 Archivos del Proyecto

```
toon-api/
├── server.js       ← Servidor API con endpoints
├── client.js       ← Cliente para hacer pruebas
├── README.md       ← Documentación técnica
└── package.json    ← Configuración del proyecto
```

---

## 🎓 Conceptos Aprendidos

1. **Formato TOON**: Alternativa simplificada a JSON
2. **Performance Profiling**: Medir tiempos con `performance.now()`
3. **APIs REST**: Crear endpoints POST para procesar datos
4. **Parseo de Datos**: Implementar parsers personalizados
5. **Comparación de Formatos**: Analizar trade-offs entre velocidad y tamaño

---

## 🔗 Referencias

- [JSON Oficial](https://www.json.org)
- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)

---

## 📞 Soporte

Para preguntas o mejoras en este proyecto, puedes:
1. Revisar el README.md para más detalles técnicos
2. Modificar server.js para agregar más endpoints
3. Extender client.js con más casos de prueba

---

**Última actualización:** Noviembre 2025