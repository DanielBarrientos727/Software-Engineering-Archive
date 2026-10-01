const empleados = [
  { nombre: "steeven", cargo: "Desarrollador", salario: 3500000 },
  { nombre: "pangolin", cargo: "Diseñador", salario: 2800000 },
  { nombre: "miguel", cargo: "Gerente", salario: 5000000 },
];

const tarjetas = empleados.map((e) => `👤 ${e.nombre} - ${e.cargo} - $${e.salario.toLocaleString()}`);

tarjetas.forEach((t) => console.log(t));