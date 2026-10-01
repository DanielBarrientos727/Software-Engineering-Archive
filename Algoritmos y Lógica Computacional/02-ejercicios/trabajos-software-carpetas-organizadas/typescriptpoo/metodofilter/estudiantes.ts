const estudiantes = [
  { nombre: "steeven", promedio: 4.5, asistencia: 95 },
  { nombre: "miguel", promedio: 3.8, asistencia: 92 },
  { nombre: "David", promedio: 4.2, asistencia: 98 },
  { nombre: "sebastian", promedio: 4.0, asistencia: 83 },
  { nombre: "Daniel", promedio: 2.9, asistencia: 77 },
];

const destacados = estudiantes.filter((e) => e.promedio >= 4.0 && e.asistencia > 90);

console.log("Cantidad:", destacados.length);
console.log(destacados.map((e) => e.nombre).join(", "));