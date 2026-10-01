// flechas y arrays
let numeros = [1, 2, 3, 4, 5];

// reduce() recorre el array y ACUMULA un resultado
// acumulador: guarda el resultado parcial
// valorActual: es cada número del array en cada vuelta
// 0: es el VALOR INICIAL del acumulador (NO es booleano)
let resultado = numeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);

console.log(resultado); // → 15