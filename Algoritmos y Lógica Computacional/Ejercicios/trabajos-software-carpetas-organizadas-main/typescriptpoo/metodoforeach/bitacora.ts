const eventos = [
  { descripcion: "Servidor caído", prioridad: "alta" },
  { descripcion: "Actualización pendiente", prioridad: "media" },
  { descripcion: "Log de acceso", prioridad: "baja" },
  { descripcion: "Error de base de datos", prioridad: "alta" },
  { descripcion: "Backup completado", prioridad: "baja" },
];

eventos.forEach((e) => {
  const emoji = e.prioridad === "alta" ? "🔴" : e.prioridad === "media" ? "🟡" : "🟢";
  console.log(`${emoji} ${e.descripcion}`);
});