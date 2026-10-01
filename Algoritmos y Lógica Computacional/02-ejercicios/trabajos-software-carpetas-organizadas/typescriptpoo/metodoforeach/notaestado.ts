const nota: number[] = [4.4, 2.2, 3.0, 3.2, 3.8, 2.8];

nota.forEach((n, i) => {
  const estado = n >= 3.0 ? "APROBADO" : "REPROBADO";
  console.log(`Estudiante ${i + 1}: ${n} - ${estado}`);
});