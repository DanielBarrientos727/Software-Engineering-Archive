// Esta línea convierte el archivo en módulo para permitir `await` de nivel superior.
export {};

// Este tipo modela una operación que puede salir bien o mal.
type Result<T, E = string> =
  // Esta variante representa éxito.
  | { ok: true; value: T }
  // Esta variante representa error.
  | { ok: false; error: E };

// Esta interface modela un estudiante resumido.
interface StudentSummary {
  // Esta propiedad guarda el identificador.
  id: string;
  // Esta propiedad guarda el nombre.
  name: string;
  // Esta propiedad guarda el semestre.
  semester: number;
}

// Esta función genérica retorna el primer elemento del arreglo.
function first<T>(items: T[]): T | undefined {
  // Esta línea entrega el primer elemento si existe.
  return items[0];
}

// Esta función asíncrona simula una consulta remota.
async function loadStudent(id: string): Promise<Result<StudentSummary>> {
  // Esta línea espera una pausa artificial para simular latencia.
  await Bun.sleep(50);

  // Esta condición valida el identificador.
  if (id === "404") {
    // Esta línea retorna un error explícito.
    return { ok: false, error: "Estudiante no encontrado" };
  }

  // Esta línea retorna un éxito tipado.
  return { ok: true, value: { id, name: "María", semester: 4 } };
}

// Esta constante demuestra `Partial<T>` en una actualización.
const studentPatch: Partial<StudentSummary> = {
  // Esta línea actualiza solo el semestre.
  semester: 5,
};

// Esta llamada asíncrona ejecuta la demostración principal.
const result = await loadStudent("100");

// Esta línea imprime el primer valor de una lista genérica.
console.log(first(["bun", "typescript", "zod"]));

// Esta línea imprime el parche parcial.
console.log(studentPatch);

// Esta condición maneja el `Result` de forma segura.
if (result.ok) {
  // Esta línea imprime la carga exitosa.
  console.log(result.value);
} else {
  // Esta línea imprime el error tipado.
  console.log(result.error);
}
