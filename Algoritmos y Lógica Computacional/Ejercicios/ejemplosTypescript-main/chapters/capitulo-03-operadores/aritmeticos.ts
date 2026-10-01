// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta constante guarda un valor base para cálculos.
const a = 18;

// Esta constante guarda un segundo valor.
const b = 5;

// Esta constante calcula una suma.
const addition = a + b;

// Esta constante calcula una resta.
const subtraction = a - b;

// Esta constante calcula una multiplicación.
const multiplication = a * b;

// Esta constante calcula una división.
const division = a / b;

// Esta constante calcula el residuo.
const remainder = a % b;

// Esta constante calcula una potencia.
const power = a ** 2;

// Esta variable muestra asignación compuesta paso a paso.
let counter = 10;

// Esta línea suma y reasigna.
counter += 3;

// Esta línea multiplica y reasigna.
counter *= 2;

// Este `console.log` resume todos los resultados.
console.log({ addition, subtraction, multiplication, division, remainder, power, counter });
