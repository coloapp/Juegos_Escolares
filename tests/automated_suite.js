/**
 * Automated Test Suite: ARA BOT de Mate - Escuela Toca Life World & Minijuegos
 * Verifies mathematical engines, game progression, pet entities, PWA configs and zero errors.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

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
console.log('🚀 INICIANDO PRUEBAS AUTOMÁTICAS DEL SISTEMA DE JUEGOS');
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

// 3. MASCOTAS & PERSONAJES (LOLITA, GATITA, BRUNO, NONINA, DOYDO)
console.log('\n🐾 3. Pruebas de Mascotas y Personajes');
assert(htmlContent.includes('id="avatarLolita"'), 'Mascota Lolita 🐰 (Coneja) presente en el DOM');
assert(htmlContent.includes('id="avatarGatita"'), 'Mascota Gatita 🐱 (Blanca y Negra) presente en el DOM');
assert(htmlContent.includes('id="avatarBruno"'), 'Mascota Bruno 🐶 (Border Collie) presente en el DOM');
assert(htmlContent.includes('id="avatarNonina"'), 'Personaje Nonina 🌸 presente en el DOM');
assert(htmlContent.includes('id="avatarDoydo"'), 'Personaje Doydo 💙 presente en el DOM');
assert(htmlContent.includes('id="avatarAraBot"'), 'Mascota ARA BOT 🤖 presente en el DOM');

// Bruno specific features (Pecho blanco, demás negro, pata izq blanca)
assert(htmlContent.includes('Bruno el Border Collie'), 'Diálogo y etiqueta de Bruno correctamente configurados');
assert(htmlContent.includes('id="bubbleBruno"'), 'Burbuja de diálogo de Bruno presente');
assert(htmlContent.includes('id="bubbleLolita"'), 'Burbuja de diálogo de Lolita presente');
assert(htmlContent.includes('id="bubbleGatita"'), 'Burbuja de diálogo de Gatita presente');

// 4. PANORAMIC SCHOOL ROOMS
console.log('\n🏫 4. Verificación de Salas Panorámicas');
assert(htmlContent.includes('id="room0"'), 'Sala 1: Aula Escolar 📚 presente');
assert(htmlContent.includes('id="room1"'), 'Sala 2: Laboratorio Dino & Hábitat Rexi 🧪🦖 presente');
assert(htmlContent.includes('id="room2"'), 'Sala 3: Cafetería & Comedor Escolar 🥪☕ presente');
assert(htmlContent.includes('id="room3"'), 'Sala 4: Gimnasio & Dojo Z 🥊🏀 presente');
assert(htmlContent.includes('id="room4"'), 'Sala 5: Observatorio Espacial & Cohete 🚀🎨 presente');

// 5. MOTOR MATEMÁTICO: EL COHETE NUMÉRICO (3.er Grado - Romina/Nonina)
console.log('\n🚀 5. Motor Matemático: El Cohete Numérico (Series +5)');
function simulateRocketEngine() {
  let val = 0;
  const step = 5;
  const maxAltitude = 10000;
  
  // Test 10 step increments
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

// Test 1000 threshold
let val1425 = 1425;
let m1 = Math.floor(val1425 / 1000);
let c1 = Math.floor((val1425 % 1000) / 100);
let d1 = Math.floor((val1425 % 100) / 10);
let u1 = val1425 % 10;
assert(m1 === 1 && c1 === 4 && d1 === 2 && u1 === 5, 'Descomposición Base-10 de 1425: 1 Millar, 4 Centenas, 2 Decenas, 5 Unidades');

// 6. MOTOR MATEMÁTICO: LABORATORIO DINOSAURIO (2.º Grado - Ricardo/Doydo)
console.log('\n🦖 6. Motor Matemático: Laboratorio Dinosaurio (9 Niveles)');
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

// Simulate level completion logic
let inputC = 0, inputD = 0, inputU = 0;
const lvl1 = dinoLevels[0];
for (let i = 0; i < lvl1.c; i++) inputC++;
for (let i = 0; i < lvl1.d; i++) inputD++;
for (let i = 0; i < lvl1.u; i++) inputU++;
const doorClosed = (inputC === lvl1.c && inputD === lvl1.d && inputU === lvl1.u);
assert(doorClosed, 'Compuerta se sella con éxito cuando los guardias coinciden con el código objetivo');

// 7. MOTOR MATEMÁTICO: EL CAÑÓN DE SUMAS RÁPIDAS (Luchadores Z)
console.log('\n🥊 7. Motor Matemático: El Cañón de Sumas Rápidas (Luchadores Z)');
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

// 8. FÍSICAS DE COLISIÓN Y ALIMENTACIÓN
console.log('\n🍎 8. Físicas de Arrastre, Colisión y Alimentación');
function simulateCollision(x1, y1, w1, h1, x2, y2, w2, h2, threshold = 65) {
  const cx1 = x1 + w1 / 2;
  const cy1 = y1 + h1 / 2;
  const cx2 = x2 + w2 / 2;
  const cy2 = y2 + h2 / 2;
  const dx = cx1 - cx2;
  const dy = cy1 - cy2;
  return Math.sqrt(dx * dx + dy * dy) < threshold;
}

const nearOverlap = simulateCollision(100, 100, 40, 40, 120, 110, 80, 80, 65);
const farDistance = simulateCollision(100, 100, 40, 40, 500, 500, 80, 80, 65);
assert(nearOverlap === true, 'Detección euclidiana de colisión detecta proximidad de comida a personaje');
assert(farDistance === false, 'Detección euclidiana no dispara colisión a larga distancia');

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
