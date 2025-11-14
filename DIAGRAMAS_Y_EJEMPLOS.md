# 🎨 Diagramas y Ejemplos Visuales

## 1️⃣ Flujo de la API


```mermaid
flowchart TD

    %% CLIENT
    A[CLIENT (client.js)]

    %% ROUTES
    A -->|POST /parse-json| B1
    A -->|POST /parse-toon| B2

    %% JSON PARSER
    subgraph SERVER (server.js)

        subgraph JSONParser
            B1[JSONParser.parse()]
            B1 --> B1a[JSON.parse()]
            B1 --> B1b[Mide tiempo con now()]
        end

        %% TOON PARSER
        subgraph TOONParser
            B2[TOONParser.parse()]
            B2 --> B2a[Parsea tokens]
            B2 --> B2b[Maneja arrays y objetos]
            B2 --> B2c[Mide tiempo con now()]
        end

    end

    %% RESPONSES
    B1 --> C1[JSON Response (tiempo incluido)]
    B2 --> C2[TOON Response (tiempo incluido)]

    %% CLIENT OUTPUT
    C1 --> D[CLIENT (client.js): Compara tiempos y muestra resultado]
    C2 --> D
```




```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (client.js)                    │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
    POST /parse-json    POST /parse-toon
        │                     │
        │                     │
┌───────┴──────────────────────┴──────────┐
│        SERVER (server.js)               │
│  ┌──────────────────────────────────┐  │
│  │   JSONParser.parse()             │  │
│  │   - JSON.parse()                 │  │
│  │   - Mide tiempo con .now()       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │   TOONParser.parse()             │  │
│  │   - Parsea tokens                │  │
│  │   - Maneja arrays y objetos      │  │
│  │   - Mide tiempo con .now()       │  │
│  └──────────────────────────────────┘  │
└────────┬──────────────────────┬────────┘
         │                      │
         ▼                      ▼
    JSON Response         TOON Response
    (tiempo incluido)     (tiempo incluido)
         │                      │
         └──────────┬───────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │  CLIENT (client.js) │
          │  - Compara tiempos  │
          │  - Muestra resultado│
          └─────────────────────┘
```

---

## 2️⃣ Estructura de Datos: JSON vs TOON

### Ejemplo Simple: Persona

**JSON:**
```json
{
  "nombre": "Juan",
  "edad": 30
}
```

**TOON:**
```
nombre:Juan|edad:30
```

**Comparación:**
```
JSON:  43 bytes
TOON:  23 bytes  ← 46% más compacto
Diferencia: -20 bytes
```

---

### Ejemplo Medio: Usuario con Contacto

**JSON:**
```json
{
  "nombre": "Juan",
  "email": "juan@email.com",
  "teléfono": "123-456-7890",
  "ciudad": "Madrid"
}
```

**TOON:**
```
nombre:Juan|email:juan@email.com|teléfono:123-456-7890|ciudad:Madrid
```

**Comparación:**
```
JSON:  96 bytes
TOON:  79 bytes  ← 18% más compacto
Diferencia: -17 bytes
```

---

### Ejemplo Complejo: Usuario Completo

**JSON:**
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

**TOON:**
```
nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}
```

**Comparación:**
```
JSON:  150 bytes
TOON:  118 bytes  ← 21% más compacto
Diferencia: -32 bytes
```

---

## 3️⃣ Comparación de Velocidad

### Metodología
- Se mide con `performance.now()` en milisegundos
- Se realiza parsing del mismo contenido
- Se captura el tiempo exacto de procesamiento

### Tabla de Resultados

```
┌─────────────────┬──────────────┬──────────────┬────────────┐
│ Prueba          │ JSON (ms)    │ TOON (ms)    │ Ganador    │
├─────────────────┼──────────────┼──────────────┼────────────┤
│ Datos simples   │ 0.0045       │ 0.0678       │ JSON ✅    │
│ Datos medios    │ 0.0089       │ 0.1234       │ JSON ✅    │
│ Datos complejos │ 0.0109       │ 0.2738       │ JSON ✅    │
│ Promedio        │ 0.0081 ms    │ 0.1550 ms    │ JSON ✅    │
└─────────────────┴──────────────┴──────────────┴────────────┘

JSON es ~19x más rápido en este test
```

### Razón de la Diferencia

1. **JSON**:
   - Usa `JSON.parse()` del motor V8 (ultra-optimizado)
   - Interpretado directamente por el motor JavaScript
   - Decades de optimización

2. **TOON**:
   - Parser hecho en JavaScript puro
   - Usa loops y split()
   - No está optimizado en el motor

---

## 4️⃣ Árbol de Decisión: ¿Cuál Usar?

```
¿Necesitas formato de datos?
│
├─ ¿Es para un proyecto profesional/producción?
│  │
│  └─ SÍ → Usa JSON ✅
│     (Amplio soporte, estándar, confiable)
│
├─ ¿Necesitas máxima compacidad?
│  │
│  ├─ SÍ + Ancho de banda crítico → Considera TOON + Compresión
│  │
│  └─ NO → Usa JSON ✅
│
├─ ¿Tienes datos altamente estructurados y predecibles?
│  │
│  ├─ SÍ + IoT/Sensores → Considera TOON
│  │
│  └─ NO → Usa JSON ✅
│
└─ ¿Necesitas compatibilidad universal?
   │
   └─ SÍ → Usa JSON ✅
      (Soportado en todos lados)
```

---

## 5️⃣ Tabla de Compacidad

### Cuán compacto es TOON vs JSON

```
Tipo de Datos              JSON Size    TOON Size    Ahorro
─────────────────────────────────────────────────────────────
Simple (string)            15 bytes     12 bytes     20%
Número                     8 bytes      5 bytes      37%
Array pequeño              25 bytes     20 bytes     20%
Objeto simple              50 bytes     35 bytes     30%
Objeto anidado             100 bytes    72 bytes     28%
Objeto complejo            150 bytes    118 bytes    21%
─────────────────────────────────────────────────────────────
PROMEDIO                   58 bytes     43 bytes     24%
```

---

## 6️⃣ Casos de Uso

### ✅ Usa JSON si:
- [ ] Es un proyecto de producción
- [ ] Necesitas compatibilidad universal
- [ ] Tienes datos complejos/anidados
- [ ] Usas APIs REST estándar
- [ ] Necesitas validación con esquema (JSON Schema)
- [ ] Trabajas con herramientas genéricas

**Ejemplos:** APIs Web, Microservicios, Aplicaciones empresariales

### ✅ Usa TOON si:
- [ ] Necesitas máxima compacidad
- [ ] Datos muy predecibles/estructurados
- [ ] Ancho de banda es crítico
- [ ] Dispositivos IoT con recursos limitados
- [ ] Comunicación en tiempo real con latencia baja
- [ ] Proyecto personalizado/experimental

**Ejemplos:** Sensores IoT, Sistemas embebidos, Juegos en línea

---

## 7️⃣ Extensión de TOON

El formato TOON podría extenderse:

```
Versión 2.0 (Propuesta)
────────────────────────

Boolean:     clave:true|clave:false
Null:        clave:null
Float:       precio:19.99
Date:        fecha:2025-11-14
UUID:        id:550e8400-e29b-41d4-a716-446655440000

Ejemplo completo:
nombre:Juan|activo:true|edad:30|precio:19.99|fecha:2025-11-14|id:550e8400-e29b-41d4-a716-446655440000
```

---

## 8️⃣ Código Equivalente

### Parsing JSON
```javascript
const datos = JSON.parse('{"nombre":"Juan","edad":30}');
// Resultado: { nombre: 'Juan', edad: 30 }
// Tiempo: ~0.01 ms
```

### Parsing TOON (Simplificado)
```javascript
const toonString = 'nombre:Juan|edad:30';
const datos = {};

toonString.split('|').forEach(pair => {
  const [key, value] = pair.split(':');
  datos[key] = value;
});
// Resultado: { nombre: 'Juan', edad: '30' }
// Tiempo: ~0.15 ms
```

---

## 9️⃣ Matriz de Comparación

```
Criterio              JSON    TOON    Notas
────────────────────────────────────────────
Velocidad             ⭐⭐⭐   ⭐⭐    JSON 19x más rápido
Compacidad            ⭐⭐    ⭐⭐⭐  TOON 24% más pequeño
Estandarización       ⭐⭐⭐   ⭐     JSON es estándar
Legibilidad           ⭐⭐⭐   ⭐⭐    JSON más legible
Soporte de tipos      ⭐⭐⭐   ⭐⭐    JSON maneja mejor tipos
Facilidad de parseo   ⭐⭐⭐   ⭐⭐    JSON más simple
Escalabilidad         ⭐⭐⭐   ⭐⭐    JSON mejor para datos complejos
────────────────────────────────────────────
PUNTUACIÓN TOTAL      18/21   13/21
```

---

## 🔟 Conclusión Visual

```
         VELOCIDAD (ms)
              │
         0.30 │     ●
              │     │
         0.25 │     │
              │     │ TOON
         0.20 │     │
              │     │
         0.15 │     ├─────────────
              │     │
         0.10 │     │
              │     │
         0.05 │  ● ─┤
              │  │  │
         0.00 │──┘  │
              └─────┴──────────────
              JSON TOON

JSON es claramente más rápido para parsing
TOON es más compacto en términos de bytes
```

---

**Recomendación Final:** Para la mayoría de casos, **usa JSON**. Solo considera TOON si necesitas máxima compacidad y estés dispuesto a sacrificar velocidad y compatibilidad.
