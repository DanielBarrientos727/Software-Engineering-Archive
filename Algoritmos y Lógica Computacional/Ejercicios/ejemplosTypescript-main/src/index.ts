// Este arreglo centraliza los capítulos disponibles para mostrarlos al usuario.
const chapters = [
  "01. Ecosistema TypeScript y Bun",
  "02. Sistema de tipado",
  "03. Operadores",
  "04. Funciones",
  "05. Funciones flecha",
  "06. Estructuras de control",
  "07. Clases",
  "08. Interfaces",
  "09. Temas complementarios",
];

// Este `console.log` presenta la guía como un índice ejecutable.
console.log("Guía ejecutable: TypeScript 2026 con Bun");

// Este `forEach` recorre todos los capítulos para imprimirlos ordenadamente.
chapters.forEach((chapter) => {
  // Este `console.log` imprime una línea por capítulo para orientar al estudiante.
  console.log(`- ${chapter}`);
});

// Este `console.log` final explica cómo correr los capítulos individuales.
console.log("Usa `bun run capitulo:NN` para ejecutar un ejemplo específico.");
