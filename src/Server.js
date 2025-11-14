const http = require('http');
const url = require('url');

// ==================== FORMATO TOON ====================
// Formato simplificado: KEY:VALUE|KEY:VALUE|...
// Objetos anidados: KEY{NESTED_KEY:NESTED_VALUE}|...
// Arrays: KEY[VAL1,VAL2,VAL3]

class TOONParser {
  parse(toonString) {
    const start = performance.now();
    
    try {
      const result = this._parseTOON(toonString);
      const end = performance.now();
      
      return {
        success: true,
        data: result,
        processingTime: (end - start).toFixed(4) + ' ms'
      };
    } catch (error) {
      const end = performance.now();
      return {
        success: false,
        error: error.message,
        processingTime: (end - start).toFixed(4) + ' ms'
      };
    }
  }

  _parseTOON(toonString) {
    const obj = {};
    const pairs = toonString.split('|');

    for (const pair of pairs) {
      const match = pair.match(/^([^:{\[]+)([:{\[]?.*)$/);
      
      if (!match) continue;
      
      const key = match[1].trim();
      const valueStr = match[2];

      if (valueStr.startsWith('[')) {
        // Es un array
        const arrayContent = valueStr.slice(1, -1);
        obj[key] = arrayContent.split(',').map(v => v.trim());
      } else if (valueStr.startsWith('{')) {
        // Es un objeto anidado
        const nestedContent = valueStr.slice(1, -1);
        obj[key] = this._parseNested(nestedContent);
      } else if (valueStr.startsWith(':')) {
        // Es un valor simple
        obj[key] = valueStr.slice(1).trim();
      }
    }

    return obj;
  }

  _parseNested(nestedString) {
    const nested = {};
    const pairs = nestedString.split(',');

    for (const pair of pairs) {
      const [key, value] = pair.split(':').map(s => s.trim());
      if (key && value) {
        nested[key] = value;
      }
    }

    return nested;
  }
}

class JSONParser {
  parse(jsonString) {
    const start = performance.now();
    
    try {
      const result = JSON.parse(jsonString);
      const end = performance.now();
      
      return {
        success: true,
        data: result,
        processingTime: (end - start).toFixed(4) + ' ms'
      };
    } catch (error) {
      const end = performance.now();
      return {
        success: false,
        error: error.message,
        processingTime: (end - start).toFixed(4) + ' ms'
      };
    }
  }
}

const toonParser = new TOONParser();
const jsonParser = new JSONParser();

// ==================== SERVIDOR HTTP ====================

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // GET raíz - mostrar información
  if (pathname === '/' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'API de comparación JSON vs TOON',
      endpoints: {
        'POST /parse-json': 'Parsear contenido en formato JSON',
        'POST /parse-toon': 'Parsear contenido en formato TOON',
        'GET /ejemplo': 'Ver ejemplos de formato TOON vs JSON'
      }
    }, null, 2));
    return;
  }

  // GET ejemplos
  if (pathname === '/ejemplo' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      ejemplo: {
        json: {
          nombre: 'Juan',
          edad: 30,
          ciudad: 'Madrid',
          hobbies: ['lectura', 'deportes', 'viajes'],
          contacto: {
            email: 'juan@example.com',
            telefono: '123456789'
          }
        },
        toon: 'nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}'
      }
    }, null, 2));
    return;
  }

  // POST /parse-json
  if (pathname === '/parse-json' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const jsonContent = payload.content;
        
        const result = jsonParser.parse(jsonContent);
        
        res.writeHead(200);
        res.end(JSON.stringify({
          format: 'JSON',
          input: jsonContent,
          ...result
        }, null, 2));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Formato de request inválido' }));
      }
    });
    return;
  }

  // POST /parse-toon
  if (pathname === '/parse-toon' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const toonContent = payload.content;
        
        const result = toonParser.parse(toonContent);
        
        res.writeHead(200);
        res.end(JSON.stringify({
          format: 'TOON',
          input: toonContent,
          ...result
        }, null, 2));
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Formato de request inválido' }));
      }
    });
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Endpoint no encontrado' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   - GET  http://localhost:${PORT}/`);
  console.log(`   - GET  http://localhost:${PORT}/ejemplo`);
  console.log(`   - POST http://localhost:${PORT}/parse-json`);
  console.log(`   - POST http://localhost:${PORT}/parse-toon`);
});