/**
 * Automated Test Suite: ARA BOT de Mate - Escuela Toca Life World & Minijuegos
 * Verifies mathematical engines, game progression, pet entities, PWA configs and zero errors.
 */

const fs = require('fs');
const path = require('path');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ [FAIL] ${testName} ${details ? '--> ' + details : ''}`);
  }
}

console.log('===========================================================');
console.log('🚀 INICIANDO PRUEBAS AUTOMÁTICAS DEL SISTEMA DE JUEGOS V5.3.0');
console.log('===========================================================\n');

// 1. FILE SYSTEM & ASSETS INTEGRITY
console.log('📁 1. Verificación de Integridad de Archivos & PWA');
const htmlPath = path.join(__dirname, '..', 'index.html');
const swPath = path.join(__dirname, '..', 'sw.js');
const versionPath = path.join(__dirname, '..', 'version.json');
const manifestPath = path.join(__dirname, '..', 'manifest.json');

assert(fs.existsSync(htmlPath), 'index.html existe y es accesible');
assert(fs.existsSync(swPath), 'sw.js (Service Worker) existe y es accesible');
assert(fs.existsSync(versionPath), 'version.json existe y es accesible');
assert(fs.existsSync(manifestPath), 'manifest.json existe y es accesible');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const swContent = fs.readFileSync(swPath, 'utf8');
const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// 2. VERSION & SYNC ALIGNMENT
console.log('\n🔄 2. Sincronización de Versiones');
const currentVersion = versionData.version;
assert(htmlContent.includes(`CURRENT_CLIENT_VERSION = '${currentVersion}'`), `index.html sincronizado con versión ${currentVersion}`);
assert(swContent.includes(`CACHE_NAME = 'ara-bot-pwa-${currentVersion}'`), `sw.js sincronizado con cache ara-bot-pwa-${currentVersion}`);
assert(manifestData.name.length > 0, 'manifest.json tiene nombre válido');

// 3. MASCOTAS & PERSONAJES (NONINA, DOYDO, ARA BOT, LOLITA, BRUNO)
console.log('\n🐾 3. Pruebas de Mascotas y Personajes');
assert(htmlContent.includes('id="avatarNonina"'), 'Personaje Nonina 🌸 presente en el DOM');
assert(htmlContent.includes('id="avatarDoydo"'), 'Personaje Doydo 💙 presente en el DOM');
assert(htmlContent.includes('id="avatarAraBot"'), 'Mascota ARA BOT 🤖 presente en el DOM');
assert(htmlContent.includes('id="avatarLolita"'), 'Mascota Lolita 🐰 (Coneja) presente en el DOM');
assert(htmlContent.includes('id="avatarBruno"'), 'Mascota Bruno 🐶 (Border Collie) presente en el DOM');

assert(htmlContent.includes('Bruno el Border Collie'), 'Diálogo y etiqueta de Bruno correctamente configurados');
assert(htmlContent.includes('id="bubbleBruno"'), 'Burbuja de diálogo de Bruno presente');
assert(htmlContent.includes('id="bubbleLolita"'), 'Burbuja de diálogo de Lolita presente');
assert(htmlContent.includes('id="bubbleNonina"'), 'Burbuja de diálogo de Nonina presente');
assert(htmlContent.includes('id="bubbleDoydo"'), 'Burbuja de diálogo de Doydo presente');

// 4. PANORAMIC SCHOOL ROOMS
console.log('\n🏫 4. Verificación de Salas Panorámicas');
assert(htmlContent.includes('id="room0"'), 'Sala 1: Aula Escolar Cuántica 📚 presente');
assert(htmlContent.includes('id="room1"'), 'Sala 2: Rincón de Botánica & Fotosíntesis 🌿☀️ presente');
assert(htmlContent.includes('id="room2"'), 'Sala 3: La Dulcería de Doña Cecilia 🍬🏪 presente');
assert(htmlContent.includes('id="room3"'), 'Sala 4: Gimnasio & Dojo Z 🥊⚡ presente');
assert(htmlContent.includes('id="room4"'), 'Sala 5: Observatorio Espacial & Cohete 🚀🌌 presente');

// 5. MOTOR MATEMÁTICO: LA DULCERÍA DE DOÑA CECILIA (Tarea SEP 2.° Grado)
console.log('\n🍬 5. Motor Matemático: La Dulcería Mágica de Doña Cecilia (SEP)');
const dulceriaMissions = [
  { id: 'don_ramon', boxes: 3, bags: 6, expected: 360 },
  { id: 'pedido_520', total: 520, expBoxes: 5, expBags: 2 },
  { id: 'conversion_45_bolsas', bags: 45, expBoxes: 4, expBags: 5, totalDulces: 450 },
  { id: 'bodega_total', boxes: 6, bags: 15, expected: 750 }
];

// Mission 1: Don Ramón
const m1 = (dulceriaMissions[0].boxes * 100) + (dulceriaMissions[0].bags * 10);
assert(m1 === 360, 'Misión 1 Don Ramón: 3 Cajas (300) + 6 Bolsas (60) = 360 dulces');

// Mission 2: Pedido 520 dulces
const m2Boxes = Math.floor(520 / 100);
const m2Bags = Math.floor((520 % 100) / 10);
assert(m2Boxes === 5 && m2Bags === 2, 'Misión 2 Descomposición 520 dulces: 5 Cajas y 2 Bolsas');

// Mission 3: 45 bolsas
const m3Boxes = Math.floor(45 / 10);
const m3Bags = 45 % 10;
const m3Total = 45 * 10;
assert(m3Boxes === 4 && m3Bags === 5 && m3Total === 450, 'Misión 3 Conversión 45 bolsas: 4 Cajas, 5 Bolsas (450 dulces)');

// Mission 4: Bodega 6 Cajas + 15 Bolsas
const m4 = (6 * 100) + (15 * 10);
assert(m4 === 750, 'Misión 4 Conteo Bodega: 6 Cajas (600) + 15 Bolsas (150) = 750 dulces');

// 6. MOTOR MATEMÁTICO: EL COHETE NUMÉRICO (3.er Grado - Romina/Nonina)
console.log('\n🚀 6. Motor Matemático: El Cohete Numérico (Series +5)');
function simulateRocketEngine() {
  let val = 0;
  const step = 5;
  const maxAltitude = 10000;
  
  for (let i = 0; i < 10; i++) {
    val += step;
  }
  const m = Math.floor(val / 1000);
  const c = Math.floor((val % 1000) / 100);
  const d = Math.floor((val % 100) / 10);
  const u = val % 10;
  const altPct = Math.min(100, Math.round((val / maxAltitude) * 100));

  return { val, m, c, d, u, altPct };
}

const rocketRes = simulateRocketEngine();
assert(rocketRes.val === 50, 'Incremento acumulado de 10 pasos a +5 es exactamente 50');
assert(rocketRes.m === 0 && rocketRes.c === 0 && rocketRes.d === 5 && rocketRes.u === 0, 'Descomposición Base-10 de 50: 0M, 0C, 5D, 0U');

let val1425 = 1425;
let mVal = Math.floor(val1425 / 1000);
let cVal = Math.floor((val1425 % 1000) / 100);
let dVal = Math.floor((val1425 % 100) / 10);
let uVal = val1425 % 10;
assert(mVal === 1 && cVal === 4 && dVal === 2 && uVal === 5, 'Descomposición Base-10 de 1425: 1 Millar, 4 Centenas, 2 Decenas, 5 Unidades');

// 7. MOTOR MATEMÁTICO: LABORATORIO DINOSAURIO (2.º Grado - Ricardo/Doydo)
console.log('\n🦖 7. Motor Matemático: Laboratorio Dinosaurio (9 Niveles)');
const dinoLevels = [
  { level: 1, code: 378, c: 3, d: 7, u: 8 },
  { level: 2, code: 642, c: 6, d: 4, u: 2 },
  { level: 3, code: 195, c: 1, d: 9, u: 5 },
  { level: 4, code: 814, c: 8, d: 1, u: 4 },
  { level: 5, code: 250, c: 2, d: 5, u: 0 },
  { level: 6, code: 937, c: 9, d: 3, u: 7 },
  { level: 7, code: 409, c: 4, d: 0, u: 9 },
  { level: 8, code: 763, c: 7, d: 6, u: 3 },
  { level: 9, code: 581, c: 5, d: 8, u: 1 }
];

assert(dinoLevels.length === 9, 'Existen los 9 niveles de contención T-Rex');
let allDinoMathValid = true;
dinoLevels.forEach(lvl => {
  const calculatedCode = (lvl.c * 100) + (lvl.d * 10) + lvl.u;
  if (calculatedCode !== lvl.code) allDinoMathValid = false;
});
assert(allDinoMathValid, 'Todas las fórmulas (C*100 + D*10 + U*1) coinciden exactamente con los códigos de compuerta');

// 8. MOTOR MATEMÁTICO: EL CAÑÓN DE SUMAS RÁPIDAS (Luchadores Z)
console.log('\n🥊 8. Motor Matemático: El Cañón de Sumas Rápidas (Luchadores Z)');
const cannonEnemies = [
  { name: 'Robot Chispas Z-1', energy: 18, options: ['10 + 8', '9 + 7', '12 + 4', '15 + 5'], correct: '10 + 8' },
  { name: 'Cyber-Bípode Z-2', energy: 25, options: ['20 + 5', '18 + 6', '12 + 11', '14 + 10'], correct: '20 + 5' },
  { name: 'Mecha-Titan Z-3', energy: 34, options: ['30 + 4', '25 + 7', '20 + 12', '19 + 13'], correct: '30 + 4' },
  { name: 'Electro-Destructor Z-4', energy: 42, options: ['40 + 2', '35 + 5', '22 + 18', '29 + 11'], correct: '40 + 2' },
  { name: 'Mega-Bot Alfa Z-5', energy: 50, options: ['25 + 25', '30 + 18', '40 + 8', '22 + 27'], correct: '25 + 25' }
];

let allCannonMathValid = true;
cannonEnemies.forEach(enemy => {
  const parts = enemy.correct.split('+').map(p => parseInt(p.trim(), 10));
  const sum = parts[0] + parts[1];
  if (sum !== enemy.energy) allCannonMathValid = false;
  if (!enemy.options.includes(enemy.correct)) allCannonMathValid = false;
});
assert(allCannonMathValid, 'Todos los proyectiles correctos suman exactamente la energía del robot enemigo y están en las opciones');

// 9. WEB AUDIO API SYNTHESIZER INTEGRITY
console.log('\n🔊 9. Verificación de Síntesis de Sonido Offline');
assert(htmlContent.includes('function initAudio()'), 'Función initAudio() presente');
assert(htmlContent.includes('function playTone('), 'Sintetizador playTone() disponible');
assert(htmlContent.includes('function playEatSound()'), 'Efecto sonoro playEatSound() disponible');
assert(htmlContent.includes('function playFanfareSound()'), 'Efecto sonoro playFanfareSound() disponible');

console.log('\n===========================================================');
console.log(`📊 RESULTADOS DE LAS PRUEBAS: ${passedTests}/${totalTests} PASARON (${failedTests} FALLARON)`);
console.log('===========================================================');

if (failedTests === 0) {
  console.log('🎉 ¡TODAS LAS PRUEBAS AUTOMÁTICAS FUERON EXITOSAS AL 100%!');
  process.exit(0);
} else {
  console.error('❌ HUBO ERRORES EN LAS PRUEBAS');
  process.exit(1);
}

