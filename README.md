# 🚀 Proyecto: API Comparativa JSON vs TOON

## Descripción

Este proyecto crea una API en Node.js que compara dos formatos de datos:
- **JSON**: Formato estándar y ampliamente utilizado
- **TOON** (Token Oriented Object Notation): Formato simplificado basado en tokens


  [VER CONTENIDO Repositorio Toon API](https://github.com/jhoney787813/toon-api/edit/main/README.md)

## Estructura del Formato TOON

```
KEY:VALUE|KEY:VALUE|...
```

### Ejemplos:

**Valores simples:**
```
nombre:Juan|edad:30|ciudad:Madrid
```

**Arrays:**
```
hobbies[lectura,deportes,viajes]
```

**Objetos anidados:**
```
contacto{email:juan@example.com,telefono:123456789}
```

**Todo junto:**
```
nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}
```

## Equivalencia JSON

El ejemplo anterior en JSON sería:
```json
{
  "nombre": "Juan",
  "edad": "30",
  "ciudad": "Madrid",
  "hobbies": ["lectura", "deportes", "viajes"],
  "contacto": {
    "email": "juan@example.com",
    "telefono": "123456789"
  }
}
```

## Archivos del Proyecto

- **server.js**: Servidor HTTP con endpoints para parsear JSON y TOON
- **client.js**: Cliente que realiza pruebas y compara tiempos de procesamiento

## Paso a Paso para Ejecutar

### Paso 1: Navegar al directorio del proyecto

```bash
cd /home/toon-api
```

### Paso 2: Iniciar el servidor

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

### Paso 3: En otra terminal, ejecutar las pruebas

```bash
node client.js
```

Verás una comparación completa con tiempos de procesamiento.

## Endpoints API

### GET /
Información general sobre la API

### GET /ejemplo
Muestra ejemplos de datos en formato JSON y TOON

### POST /parse-json
Parsea contenido en formato JSON

**Request:**
```json
{
  "content": "{\"nombre\":\"Juan\",\"edad\":30}"
}
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
  "processingTime": "0.0234 ms"
}
```

### POST /parse-toon
Parsea contenido en formato TOON

**Request:**
```json
{
  "content": "nombre:Juan|edad:30"
}
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
  "processingTime": "0.0156 ms"
}
```

## Resultados Esperados

El cliente mostrará algo como:

```
📊 COMPARACIÓN JSON vs TOON

============================================================

1️⃣ PRUEBA CON JSON

Contenido enviado:
{"nombre":"Juan","edad":30,...}

Procesando...

Resultado:
{
  "format": "JSON",
  ...
  "processingTime": "0.0234 ms"
}

============================================================

2️⃣ PRUEBA CON TOON

Contenido enviado:
nombre:Juan|edad:30|...

Procesando...

Resultado:
{
  "format": "TOON",
  ...
  "processingTime": "0.0156 ms"
}

============================================================

📈 RESUMEN COMPARATIVO

Formato JSON: 0.0234 ms
Formato TOON: 0.0156 ms
Diferencia:   0.0078 ms

⚡ TOON fue más rápido
📦 Tamaño JSON: 115 bytes
📦 Tamaño TOON: 94 bytes

============================================================
```

## Ventajas

### JSON ✅
- Estándar mundial
- Ampliamente soportado
- Legible por humanos
- Mejor manejo de tipos de datos

### TOON ✅
- Más compacto (menos bytes)
- Potencialmente más rápido de parsear
- Sintaxis más simple
- Ideal para datos con estructura predecible

## Desventajas

🟥 JSON 

**No maneja tipos raros:** solo sabe strings, números y cositas básicas. Si le metés una fecha o un decimal muy preciso, se enreda todo.

Es medio inseguro si uno no valida lo que recibe; cualquier cosa mal puesta puede meter problemas.

**No tiene un esquema** fijo, entonces cada quien manda el JSON como quiere y después es uno el que sufre acomodándolo.

**No deja poner comentarios**, o sea que nada de explicar qué es cada cosa ahí mismito.

**Se pone lento** cuando son datos grandotes; ya empieza a tragar RAM y a quedar pesado.

🟥 TOON 

**No es estándar formal**, cada quien lo usa como quiere y eso es un despelote para integrarse con otros sistemas.

**Depende mucho del framework**, si cambiás de tecnología ya perdiste el formato.

**Casi no hay documentación**, toca rebuscar o preguntar porque no es tan conocido como JSON.

Puede quedar verboso y largo, metiéndole metadata y cuanta cosa, o sea, queda más pesadito de lo normal.

**Toca aprenderlo cada vez más**, porque no hay una forma universal de usarlo, general mente fue diseñado para comunicar con leguanes IA para optimizar pronts.



## Notas

- Los tiempos de procesamiento variarán según la máquina
- TOON es un formato simplificado para esta demostración
- Para datos reales, JSON sigue siendo la opción más recomendable por su estandarización
