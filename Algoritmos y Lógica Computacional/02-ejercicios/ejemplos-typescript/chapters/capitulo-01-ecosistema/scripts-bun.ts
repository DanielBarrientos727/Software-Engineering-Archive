// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta constante describe el comando de instalación recomendado.
const installCommand = "bun install";

// Esta constante describe el comando para ejecutar un archivo TypeScript.
const runCommand = "bun run archivo.ts";

// Esta constante describe el comando para observar cambios automáticamente.
const watchCommand = "bun --watch archivo.ts";

// Este arreglo reúne los comandos esenciales de Bun en el flujo de estudio.
const commands = [installCommand, runCommand, watchCommand];

// Este bucle recorre cada comando para mostrarlo de forma didáctica.
for (const command of commands) {
  // Este `console.log` imprime una instrucción práctica por línea.
  console.log(`Comando útil: ${command}`);
}

// Esta constante modela los beneficios de Bun para discusión en clase.
const advantages = {
  // Esta propiedad resume el rendimiento.
  speed: "instalacion y ejecucion rapidas",
  // Esta propiedad resume la simplicidad operativa.
  simplicity: "un solo gestor para runtime y paquetes",
  // Esta propiedad resume la experiencia moderna.
  modernity: "soporte directo para TypeScript y ESM",
};

// Este `console.log` resume las ventajas del ecosistema.
console.log("Ventajas de Bun:", advantages);
