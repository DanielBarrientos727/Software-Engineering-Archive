const notas: number[] = [3.7, 2.2, 5.0, 2.5, 4.9, 3.3, 4.8, 3.9, 4.8, 4.7];

const suma = notas.reduce((acc, n) => acc + n, 0);
const promedio = suma / notas.length;

console.log("Suma:", suma.toFixed(2));
console.log("Promedio:", promedio.toFixed(2));