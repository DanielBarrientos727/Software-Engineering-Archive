// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Este arreglo contiene calificaciones de ejemplo.
const grades = [4.5, 2.9, 3.8, 5.0];

// Esta función flecha transforma cada nota en una etiqueta legible.
const labeledGrades = grades.map((grade) => `Nota: ${grade.toFixed(1)}`);

// Esta función flecha filtra solo las notas aprobadas.
const approvedGrades = grades.filter((grade) => grade >= 3.0);

// Esta función flecha acumula el total de las notas aprobadas.
const approvedTotal = approvedGrades.reduce((sum, grade) => sum + grade, 0);

// Esta función flecha retorna otra función y crea un multiplicador.
const multiplyBy = (factor: number) => (value: number) => value * factor;

// Esta constante crea una función especializada a partir del cierre anterior.
const double = multiplyBy(2);

// Este `console.log` imprime las etiquetas creadas con `map`.
console.log(labeledGrades);

// Este `console.log` imprime las notas aprobadas.
console.log(approvedGrades);

// Este `console.log` imprime el total de aprobadas.
console.log(approvedTotal);

// Este `console.log` demuestra la función generada dinámicamente.
console.log(double(12));
