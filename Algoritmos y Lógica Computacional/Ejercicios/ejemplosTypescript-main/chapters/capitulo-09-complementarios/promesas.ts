// Esta línea convierte el archivo en módulo para permitir `await` de nivel superior.
export {};

// Esta función asíncrona simula la carga de estudiantes.
async function loadStudents(): Promise<string[]> {
  // Esta línea simula una espera corta.
  await Bun.sleep(20);
  // Esta línea retorna la lista resultante.
  return ["Ana", "Luis", "María"];
}

// Esta función asíncrona simula la carga de cursos.
async function loadCourses(): Promise<string[]> {
  // Esta línea simula otra espera corta.
  await Bun.sleep(20);
  // Esta línea retorna la lista de cursos.
  return ["Algoritmos", "TypeScript", "Bases de datos"];
}

// Esta constante ejecuta ambas promesas en paralelo.
const [students, courses] = await Promise.all([loadStudents(), loadCourses()]);

// Este `console.log` imprime los resultados paralelos.
console.log({ students, courses });
