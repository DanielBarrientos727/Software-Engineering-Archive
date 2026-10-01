// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Este alias modela un identificador que puede ser texto o número.
type StudentId = string | number;

// Este alias modela la estructura básica de un estudiante.
type Student = {
  // Esta propiedad guarda el identificador tipado del estudiante.
  id: StudentId;
  // Esta propiedad guarda el nombre completo.
  name: string;
  // Esta propiedad guarda la edad en años.
  age: number;
  // Esta propiedad indica si el estudiante sigue activo.
  active: boolean;
};

// Esta constante crea un objeto que cumple el contrato `Student`.
const student: Student = {
  // Esta línea asigna un identificador textual.
  id: "AVH-2026-001",
  // Esta línea asigna el nombre.
  name: "Laura Mendoza",
  // Esta línea asigna la edad.
  age: 20,
  // Esta línea indica el estado académico.
  active: true,
};

// Esta función recibe un valor desconocido y lo valida antes de usarlo.
function describeUnknown(value: unknown): string {
  // Esta condición comprueba si el dato recibido es texto.
  if (typeof value === "string") {
    // Esta línea retorna el texto transformado de forma segura.
    return value.toUpperCase();
  }

  // Esta condición comprueba si el dato recibido es número.
  if (typeof value === "number") {
    // Esta línea formatea el número con dos decimales.
    return value.toFixed(2);
  }

  // Esta línea retorna una etiqueta genérica para otros casos.
  return "tipo no soportado";
}

// Este `console.log` muestra el objeto tipado.
console.log("Estudiante tipado:", student);

// Este `console.log` demuestra el tratamiento seguro de `unknown`.
console.log("Procesamiento seguro:", describeUnknown("typescript"), describeUnknown(4.75));
