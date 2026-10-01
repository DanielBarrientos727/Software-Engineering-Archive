// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta firma acepta texto y promete devolver número.
function convert(value: string): number;

// Esta firma acepta número y promete devolver texto.
function convert(value: number): string;

// Esta implementación real cubre ambos casos anteriores.
function convert(value: string | number): number | string {
  // Esta condición resuelve la rama textual.
  if (typeof value === "string") {
    // Esta línea convierte el texto a número.
    return Number(value);
  }

  // Esta línea convierte el número a texto.
  return value.toString();
}

// Este `console.log` demuestra la primera sobrecarga.
console.log(convert("2026"));

// Este `console.log` demuestra la segunda sobrecarga.
console.log(convert(2026));
