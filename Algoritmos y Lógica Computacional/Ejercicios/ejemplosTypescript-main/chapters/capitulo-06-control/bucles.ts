// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta variable controla un bucle `while`.
let pendingTasks = 3;

// Este `while` se ejecuta mientras haya tareas pendientes.
while (pendingTasks > 0) {
  // Este `console.log` informa el estado actual.
  console.log(`Tareas pendientes: ${pendingTasks}`);
  // Esta línea reduce el contador en cada vuelta.
  pendingTasks -= 1;
}

// Esta variable controla un ejemplo con `do...while`.
let attempts = 0;

// Este bloque se ejecuta al menos una vez.
do {
  // Esta línea incrementa el número de intentos.
  attempts += 1;
  // Este `console.log` imprime el intento actual.
  console.log(`Intento número ${attempts}`);
} while (attempts < 2);

// Este arreglo contiene materias para distintos tipos de bucle.
const subjects = ["Algoritmos", "Bases de datos", "TypeScript"];

// Este `for` clásico usa índice numérico.
for (let index = 0; index < subjects.length; index += 1) {
  // Este `console.log` imprime índice y valor.
  console.log(`for clásico -> ${index}: ${subjects[index]}`);
}

// Este objeto sirve para demostrar `for...in`.
const classroom = { room: "A-203", shift: "noche", capacity: 30 };

// Este `for...in` recorre las claves del objeto.
for (const key in classroom) {
  // Esta constante tipa la clave de forma segura.
  const typedKey = key as keyof typeof classroom;
  // Este `console.log` imprime clave y valor.
  console.log(`for...in -> ${typedKey}: ${classroom[typedKey]}`);
}
