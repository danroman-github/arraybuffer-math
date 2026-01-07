import Magician from './magician.js';
import Daemon from './daemon.js';

console.log('=== Пример использования магов и демонов ===\n');

const gandalf = new Magician('Гэндальф');
const balrog = new Daemon('Балрог');

console.log('1. Базовые характеристики:');
console.log(`Гэндальф: атака=${gandalf.attack}, защита=${gandalf.defence}`);
console.log(`Балрог: атака=${balrog.attack}, защита=${balrog.defence}`);

console.log('\n2. Атака на разных расстояниях (без дурмана):');
for (let distance = 1; distance <= 5; distance++) {
    gandalf.attackDistance = distance;
    balrog.attackDistance = distance;

    console.log(`Дистанция ${distance}: Гэндальф=${gandalf.attack}, Балрог=${balrog.attack}`);
}

console.log('\n3. Атака с дурманом на разных расстояниях:');
gandalf.stoned = true;
balrog.stoned = true;

for (let distance = 1; distance <= 5; distance++) {
    gandalf.attackDistance = distance;
    balrog.attackDistance = distance;

    console.log(`Дистанция ${distance}: Гэндальф=${gandalf.attack}, Балрог=${balrog.attack}`);
}

console.log('\n4. Пример из легенды:');
const testMage = new Magician('Тест маг');
testMage.attack = 100;
testMage.attackDistance = 2;

console.log(`Базовая атака: ${testMage.attack} (ожидается 90)`);

testMage.stoned = true;
console.log(`С дурманом: ${testMage.attack} (ожидается 85)`);

console.log('\n5. Граничные случаи:');
const weakMage = new Magician('Слабый маг');
weakMage.attack = 5;
weakMage.attackDistance = 5;
weakMage.stoned = true;

console.log(`Слабая атака на большой дистанции с дурманом: ${weakMage.attack} (не может быть отрицательной)`);

export { gandalf, balrog, testMage, weakMage };