# 🔗 Ejemplos de Peticiones HTTP

Este archivo contiene ejemplos listos para copiar y pegar para probar la API.

---

## 1️⃣ Con cURL (Terminal/CMD)

### GET - Información de la API
```bash
curl http://localhost:3000/
```

### GET - Ver ejemplos
```bash
curl http://localhost:3000/ejemplo
```

### POST - Parsear JSON
```bash
curl -X POST http://localhost:3000/parse-json \
  -H "Content-Type: application/json" \
  -d '{"content":"{\"nombre\":\"Juan\",\"edad\":30,\"ciudad\":\"Madrid\"}"}'
```

### POST - Parsear TOON (datos simples)
```bash
curl -X POST http://localhost:3000/parse-toon \
  -H "Content-Type: application/json" \
  -d '{"content":"nombre:Juan|edad:30|ciudad:Madrid"}'
```

### POST - Parsear TOON (con arrays)
```bash
curl -X POST http://localhost:3000/parse-toon \
  -H "Content-Type: application/json" \
  -d '{"content":"nombre:Juan|hobbies[lectura,deportes,viajes]"}'
```

### POST - Parsear TOON (con objetos anidados)
```bash
curl -X POST http://localhost:3000/parse-toon \
  -H "Content-Type: application/json" \
  -d '{"content":"nombre:Juan|contacto{email:juan@example.com,telefono:123456789}"}'
```

---

## 2️⃣ Con Postman (GUI)

### Paso 1: Descargar Postman
Descargalo desde: https://www.postman.com/downloads/

### Paso 2: Crear nueva petición

#### GET /
- **Method:** GET
- **URL:** http://localhost:3000/
- **Click:** Send

#### POST /parse-json
- **Method:** POST
- **URL:** http://localhost:3000/parse-json
- **Headers:** Content-Type: application/json
- **Body (raw):**
```json
{
  "content": "{\"nombre\":\"Juan\",\"edad\":30,\"ciudad\":\"Madrid\",\"hobbies\":[\"lectura\",\"deportes\"],\"contacto\":{\"email\":\"juan@example.com\",\"telefono\":\"123456789\"}}"
}
```
- **Click:** Send

#### POST /parse-toon
- **Method:** POST
- **URL:** http://localhost:3000/parse-toon
- **Headers:** Content-Type: application/json
- **Body (raw):**
```json
{
  "content": "nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes]|contacto{email:juan@example.com,telefono:123456789}"
}
```
- **Click:** Send

---

## 3️⃣ Con JavaScript (Fetch API)

### En el navegador o Node.js

#### GET - Información
```javascript
fetch('http://localhost:3000/')
  .then(response => response.json())
  .then(data => console.log(data));
```

#### POST - Parsear JSON
```javascript
const jsonContent = JSON.stringify({
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid"
});

fetch('http://localhost:3000/parse-json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content: jsonContent })
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ JSON Parseado:');
    console.log('Datos:', data.data);
    console.log('Tiempo:', data.processingTime);
  });
```

#### POST - Parsear TOON
```javascript
const toonContent = 'nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes]|contacto{email:juan@example.com,telefono:123456789}';

fetch('http://localhost:3000/parse-toon', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ content: toonContent })
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ TOON Parseado:');
    console.log('Datos:', data.data);
    console.log('Tiempo:', data.processingTime);
  });
```

#### Comparación automática
```javascript
async function compararFormatos() {
  const jsonContent = JSON.stringify({
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid"
  });

  const toonContent = 'nombre:Juan|edad:30|ciudad:Madrid';

  // Parsear JSON
  const jsonResponse = await fetch('http://localhost:3000/parse-json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: jsonContent })
  }).then(r => r.json());

  // Parsear TOON
  const toonResponse = await fetch('http://localhost:3000/parse-toon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: toonContent })
  }).then(r => r.json());

  // Mostrar comparación
  console.log('📊 COMPARACIÓN');
  console.log(`JSON: ${jsonResponse.processingTime}`);
  console.log(`TOON: ${toonResponse.processingTime}`);
  
  const jsonTime = parseFloat(jsonResponse.processingTime);
  const toonTime = parseFloat(toonResponse.processingTime);
  const faster = jsonTime < toonTime ? 'JSON' : 'TOON';
  console.log(`⚡ ${faster} fue más rápido`);
}

compararFormatos();
```

---

## 4️⃣ Con Python (requests)

```python
import requests
import json
import time

# URL base
BASE_URL = 'http://localhost:3000'

# 1. Obtener información
print("📝 Información de la API:")
response = requests.get(f'{BASE_URL}/')
print(json.dumps(response.json(), indent=2))

# 2. Ver ejemplos
print("\n📚 Ejemplos:")
response = requests.get(f'{BASE_URL}/ejemplo')
print(json.dumps(response.json(), indent=2))

# 3. Parsear JSON
print("\n✅ Parseando JSON:")
json_content = json.dumps({
    "nombre": "Juan",
    "edad": 30,
    "ciudad": "Madrid"
})

response = requests.post(
    f'{BASE_URL}/parse-json',
    json={'content': json_content}
)
result = response.json()
print(f"Tiempo de procesamiento: {result['processingTime']}")
print(f"Datos: {json.dumps(result['data'], indent=2)}")

# 4. Parsear TOON
print("\n✅ Parseando TOON:")
toon_content = 'nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]'

response = requests.post(
    f'{BASE_URL}/parse-toon',
    json={'content': toon_content}
)
result = response.json()
print(f"Tiempo de procesamiento: {result['processingTime']}")
print(f"Datos: {json.dumps(result['data'], indent=2)}")

# 5. Comparación
print("\n📊 COMPARACIÓN")
json_content = json.dumps({
    "nombre": "Juan",
    "edad": 30,
    "ciudad": "Madrid",
    "hobbies": ["lectura", "deportes", "viajes"],
    "contacto": {"email": "juan@example.com", "telefono": "123456789"}
})

toon_content = 'nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}'

json_response = requests.post(
    f'{BASE_URL}/parse-json',
    json={'content': json_content}
).json()

toon_response = requests.post(
    f'{BASE_URL}/parse-toon',
    json={'content': toon_content}
).json()

json_time = float(json_response['processingTime'].split()[0])
toon_time = float(toon_response['processingTime'].split()[0])

print(f"JSON: {json_response['processingTime']}")
print(f"TOON: {toon_response['processingTime']}")
print(f"Diferencia: {abs(json_time - toon_time):.4f} ms")
print(f"Tamaño JSON: {len(json_content)} bytes")
print(f"Tamaño TOON: {len(toon_content)} bytes")
print(f"⚡ {'JSON' if json_time < toon_time else 'TOON'} fue más rápido")
```

---

## 5️⃣ Con PHP (cURL)

```php
<?php

$baseUrl = 'http://localhost:3000';

// 1. Información
echo "📝 Información de la API:\n";
$response = file_get_contents("$baseUrl/");
echo $response . "\n\n";

// 2. Parsear JSON
echo "✅ Parseando JSON:\n";
$jsonContent = json_encode([
    "nombre" => "Juan",
    "edad" => 30,
    "ciudad" => "Madrid"
]);

$payload = json_encode(['content' => $jsonContent]);

$opts = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => $payload
    ]
];

$context = stream_context_create($opts);
$response = file_get_contents("$baseUrl/parse-json", false, $context);
$result = json_decode($response, true);
echo "Tiempo: " . $result['processingTime'] . "\n";
echo "Datos: " . json_encode($result['data'], JSON_PRETTY_PRINT) . "\n\n";

// 3. Parsear TOON
echo "✅ Parseando TOON:\n";
$toonContent = 'nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]';
$payload = json_encode(['content' => $toonContent]);

$opts = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => $payload
    ]
];

$context = stream_context_create($opts);
$response = file_get_contents("$baseUrl/parse-toon", false, $context);
$result = json_decode($response, true);
echo "Tiempo: " . $result['processingTime'] . "\n";
echo "Datos: " . json_encode($result['data'], JSON_PRETTY_PRINT) . "\n";

?>
```

---

## 6️⃣ Con C# (.NET)

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static async Task Main()
    {
        using var client = new HttpClient();
        var baseUrl = "http://localhost:3000";

        // 1. Información
        Console.WriteLine("📝 Información de la API:");
        var response = await client.GetAsync($"{baseUrl}/");
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);

        // 2. Parsear JSON
        Console.WriteLine("\n✅ Parseando JSON:");
        var jsonData = new { nombre = "Juan", edad = 30, ciudad = "Madrid" };
        var jsonContent = JsonConvert.SerializeObject(jsonData);
        var payload = JsonConvert.SerializeObject(new { content = jsonContent });

        var httpContent = new StringContent(payload, System.Text.Encoding.UTF8, "application/json");
        response = await client.PostAsync($"{baseUrl}/parse-json", httpContent);
        content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);

        // 3. Parsear TOON
        Console.WriteLine("\n✅ Parseando TOON:");
        var toonContent = "nombre:Juan|edad:30|ciudad:Madrid";
        payload = JsonConvert.SerializeObject(new { content = toonContent });

        httpContent = new StringContent(payload, System.Text.Encoding.UTF8, "application/json");
        response = await client.PostAsync($"{baseUrl}/parse-toon", httpContent);
        content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);
    }
}
```

---

## 7️⃣ Con Java

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TOONClient {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String baseUrl = "http://localhost:3000";

        // 1. Información
        System.out.println("📝 Información de la API:");
        HttpRequest getRequest = HttpRequest.newBuilder()
            .uri(new URI(baseUrl + "/"))
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        // 2. Parsear JSON
        System.out.println("\n✅ Parseando JSON:");
        String jsonData = "{\"nombre\":\"Juan\",\"edad\":30,\"ciudad\":\"Madrid\"}";
        String jsonPayload = "{\"content\":\"" + jsonData.replace("\"", "\\\"") + "\"}";
        
        HttpRequest postRequest = HttpRequest.newBuilder()
            .uri(new URI(baseUrl + "/parse-json"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();
        
        response = client.send(postRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());

        // 3. Parsear TOON
        System.out.println("\n✅ Parseando TOON:");
        String toonData = "nombre:Juan|edad:30|ciudad:Madrid";
        String toonPayload = "{\"content\":\"" + toonData + "\"}";
        
        postRequest = HttpRequest.newBuilder()
            .uri(new URI(baseUrl + "/parse-toon"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(toonPayload))
            .build();
        
        response = client.send(postRequest, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}
```

---

## 8️⃣ Pruebas Automatizadas (Node.js)

Crea un archivo `test.js`:

```javascript
const http = require('http');

const tests = [
  {
    name: 'Datos simples',
    json: '{"nombre":"Juan","edad":30}',
    toon: 'nombre:Juan|edad:30'
  },
  {
    name: 'Con arrays',
    json: '{"hobbies":["lectura","deportes"]}',
    toon: 'hobbies[lectura,deportes]'
  },
  {
    name: 'Datos complejos',
    json: '{"nombre":"Juan","edad":30,"contacto":{"email":"juan@example.com"}}',
    toon: 'nombre:Juan|edad:30|contacto{email:juan@example.com}'
  }
];

async function runTest(endpoint, content) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ content });
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: endpoint,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: e.message });
        }
      });
    });

    req.on('error', (error) => {
      resolve({ error: error.message });
    });

    req.write(postData);
    req.end();
  });
}

async function runAllTests() {
  console.log('🧪 Ejecutando pruebas automatizadas\n');
  
  for (const test of tests) {
    console.log(`📝 Test: ${test.name}`);
    
    const jsonResult = await runTest('/parse-json', test.json);
    const toonResult = await runTest('/parse-toon', test.toon);
    
    const jsonTime = parseFloat(jsonResult.processingTime || 0);
    const toonTime = parseFloat(toonResult.processingTime || 0);
    
    console.log(`  JSON: ${jsonResult.processingTime}`);
    console.log(`  TOON: ${toonResult.processingTime}`);
    console.log(`  ✅ Ganador: ${ jsonTime < toonTime ? 'JSON' : 'TOON'}\n`);
  }
}

setTimeout(runAllTests, 500);
```

Ejecúta con: `node test.js`

---

## ✅ Checklist de Pruebas

- [ ] Probé GET /
- [ ] Probé GET /ejemplo
- [ ] Probé POST /parse-json con datos simples
- [ ] Probé POST /parse-json con datos complejos
- [ ] Probé POST /parse-toon con valores simples
- [ ] Probé POST /parse-toon con arrays
- [ ] Probé POST /parse-toon con objetos anidados
- [ ] Comparé tiempos de ambos formatos
- [ ] Verifiqué que los datos se parseen correctamente
- [ ] Analicé la diferencia de tamaño en bytes

---

¡Listo! Elige el lenguaje/herramienta que prefieras y comienza a hacer pruebas. 🚀