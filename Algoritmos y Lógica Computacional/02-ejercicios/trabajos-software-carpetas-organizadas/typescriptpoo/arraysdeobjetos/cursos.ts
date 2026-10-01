const cursos = [
  { codigo: "C01", nombre: "Matemáticas", creditos: 4, aprobado: true },
  { codigo: "C02", nombre: "Historia", creditos: 3, aprobado: false },
  { codigo: "C03", nombre: "TypeScript", creditos: 5, aprobado: true },
  { codigo: "C04", nombre: "Física", creditos: 4, aprobado: false },
  { codigo: "C05", nombre: "Inglés", creditos: 3, aprobado: true },
];

cursos.forEach((c) => console.log(`[${c.codigo}] ${c.nombre} - ${c.creditos} créditos - ${c.aprobado ? "Aprobado" : "Reprobado"}`));

const aprobados = cursos.filter((c) => c.aprobado);
const totalCreditos = aprobados.reduce((acc, c) => acc + c.creditos, 0);
const porcentaje = (aprobados.length / cursos.length) * 100;

console.log("Créditos aprobados:", totalCreditos);
console.log("Porcentaje aprobado:", porcentaje.toFixed(1) + "%");