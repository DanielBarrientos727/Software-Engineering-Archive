// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Este tipo define el formato de una rúbrica simple.
type Rubric = {
  // Esta propiedad guarda el nombre de la actividad.
  title: string;
  // Esta propiedad guarda la calificación obtenida.
  score?: number;
};

// Esta constante crea una rúbrica válida sin perder sus claves exactas.
const rubric = {
  // Esta línea define el nombre de la actividad.
  title: "Parcial de algoritmos",
  // Esta línea define la nota.
  score: 4.6,
} satisfies Rubric;

// Esta constante usa optional chaining para leer la nota sin riesgo.
const score = rubric.score?.toFixed(1);

// Esta constante usa nullish coalescing para definir un respaldo seguro.
const message = score ?? "Sin calificación";

// Esta constante calcula un promedio simple.
const average = (4.2 + 4.8 + 5.0) / 3;

// Esta constante evalúa una condición académica.
const approved = average >= 3.0;

// Este `console.log` muestra el resultado completo del capítulo.
console.log({ rubric, message, average, approved });
