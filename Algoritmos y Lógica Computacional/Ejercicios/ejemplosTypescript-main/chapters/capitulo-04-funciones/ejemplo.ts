// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Este tipo declara la forma de una operación matemática reutilizable.
type Operation = (a: number, b: number) => number;

// Esta función suma dos valores y retorna un número.
function add(a: number, b: number): number {
  // Esta línea devuelve la suma.
  return a + b;
}

// Esta función saluda usando un valor por defecto si no llega el rol.
function greet(name: string, role: string = "estudiante"): string {
  // Esta línea construye el mensaje final.
  return `Hola, ${name}. Tu rol es ${role}.`;
}

// Esta función recibe cualquier cantidad de notas y calcula el promedio.
function averageGrades(...grades: number[]): number {
  // Esta constante suma todas las notas usando `reduce`.
  const total = grades.reduce((sum, grade) => sum + grade, 0);
  // Esta línea retorna el promedio o cero si no hay datos.
  return grades.length === 0 ? 0 : total / grades.length;
}

// Esta constante reutiliza el tipo de función definido arriba.
const multiply: Operation = (a, b) => a * b;

// Este `console.log` muestra varios usos de las funciones.
console.log(add(10, 15));

// Este `console.log` demuestra el parámetro por defecto.
console.log(greet("Andrea"));

// Este `console.log` demuestra el parámetro `rest`.
console.log(averageGrades(4.2, 3.8, 4.9));

// Este `console.log` demuestra una función almacenada en variable.
console.log(multiply(6, 7));
