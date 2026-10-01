// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta constante guarda el nombre del runtime usado en el tutorial.
const runtime = "Bun";

// Esta constante guarda el lenguaje de tipado que estudiaremos.
const language = "TypeScript";

// Esta constante resume el objetivo del ecosistema moderno.
const goal = "escribir codigo seguro y ejecutarlo con rapidez";

// Este `console.log` muestra el mensaje principal del capítulo.
console.log(`Con ${language} y ${runtime} podemos ${goal}.`);

// Esta constante representa una configuración moderna típica en 2026.
const modernConfig = {
  // Esta propiedad define el objetivo de salida más moderno del lenguaje.
  target: "ESNext",
  // Esta propiedad indica que usaremos módulos ESM.
  module: "ESNext",
  // Esta propiedad activa el modo estricto.
  strict: true,
};

// Este `console.log` imprime la configuración de referencia.
console.log("Configuración recomendada:", modernConfig);
