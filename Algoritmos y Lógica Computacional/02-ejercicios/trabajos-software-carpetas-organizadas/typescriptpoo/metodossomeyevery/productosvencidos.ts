const productosx = [
  { nombre: "Leche", dias_vencimiento: 5 },
  { nombre: "Pan", dias_vencimiento: 2 },
  { nombre: "Queso", dias_vencimiento: 15 },
  { nombre: "Yogurt", dias_vencimiento: 40 },
  { nombre: "Jugo", dias_vencimiento: 60 },
];

const hayPorVencer = productosx.some((p) => p.dias_vencimiento < 7);
const todosVigentesMas30 = productosx.every((p) => p.dias_vencimiento > 30);

console.log("Hay productos por vencer pronto:", hayPorVencer);
console.log("Todos tienen más de 30 días:", todosVigentesMas30);