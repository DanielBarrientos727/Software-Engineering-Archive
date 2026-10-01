// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta constante representa un módulo académico simple.
const moduleName = "capitulo-01-ecosistema";

// Esta función construye un mensaje reusable.
function buildMessage(topic: string): string {
  // Esta línea retorna una frase con interpolación moderna.
  return `El módulo ${moduleName} explica ${topic}.`;
}

// Esta constante contiene varios temas del capítulo.
const topics = ["TypeScript", "Bun", "tsconfig", "scripts de ejecución"];

// Este `map` transforma cada tema en una oración completa.
const lines = topics.map((topic) => buildMessage(topic));

// Este `for...of` imprime cada línea generada.
for (const line of lines) {
  // Este `console.log` muestra el texto final al estudiante.
  console.log(line);
}
