const http = require('http');

// Ejemplo de datos a procesar
const datos = {
  nombre: 'Juan',
  edad: 30,
  ciudad: 'Madrid',
  hobbies: ['lectura', 'deportes', 'viajes'],
  contacto: {
    email: 'juan@example.com',
    telefono: '123456789'
  }
};

// Formato JSON
const jsonContent = JSON.stringify(datos);

// Formato TOON (simplificado)
const toonContent = 'nombre:Juan|edad:30|ciudad:Madrid|hobbies[lectura,deportes,viajes]|contacto{email:juan@example.com,telefono:123456789}';

console.log('📊 COMPARACIÓN JSON vs TOON\n');
console.log('═'.repeat(60));

// Función auxiliar para hacer requests
function makeRequest(endpoint, content) {
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

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      console.error('Error:', error);
      resolve(null);
    });

    req.write(postData);
    req.end();
  });
}

// Función principal de pruebas
async function runTests() {
  console.log('\n1️⃣ PRUEBA CON JSON\n');
  console.log('Contenido enviado:');
  console.log(jsonContent);
  console.log('\nProcesando...\n');
  
  const jsonResult = await makeRequest('/parse-json', jsonContent);
  console.log('Resultado:');
  console.log(JSON.stringify(jsonResult, null, 2));

  console.log('\n' + '═'.repeat(60));
  console.log('\n2️⃣ PRUEBA CON TOON\n');
  console.log('Contenido enviado:');
  console.log(toonContent);
  console.log('\nProcesando...\n');
  
  const toonResult = await makeRequest('/parse-toon', toonContent);
  console.log('Resultado:');
  console.log(JSON.stringify(toonResult, null, 2));

  console.log('\n' + '═'.repeat(60));
  console.log('\n📈 RESUMEN COMPARATIVO\n');

  if (jsonResult && toonResult) {
    const jsonTime = parseFloat(jsonResult.processingTime);
    const toonTime = parseFloat(toonResult.processingTime);
    const difference = Math.abs(jsonTime - toonTime);
    const faster = jsonTime < toonTime ? 'JSON' : 'TOON';

    console.log(`Formato JSON: ${jsonResult.processingTime}`);
    console.log(`Formato TOON: ${toonResult.processingTime}`);
    console.log(`Diferencia:   ${difference.toFixed(4)} ms`);
    console.log(`\n⚡ ${faster} fue más rápido`);
    console.log(`📦 Tamaño JSON: ${jsonContent.length} bytes`);
    console.log(`📦 Tamaño TOON: ${toonContent.length} bytes`);
  }

  console.log('\n' + '═'.repeat(60) + '\n');
  process.exit(0);
}

// Esperar un poco y ejecutar pruebas
setTimeout(runTests, 500);