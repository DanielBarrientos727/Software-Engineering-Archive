const puntajes: number[] = [334, 512, 200, 441, 90, 620, 310, 500];

const ordenado = [...puntajes].sort((a, b) => b - a);
const top3 = ordenado.slice(0, 3);
const suma = top3.reduce((acc, n) => acc + n, 0);
const promedio = suma / top3.length;

console.log("Top 3:", top3);
console.log("Suma:", suma);
console.log("Promedio:", promedio);