// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Este tipo define tres posibles estados del sistema.
type RequestState =
  // Esta variante representa una carga activa.
  | { status: "loading"; progress: number }
  // Esta variante representa una respuesta exitosa.
  | { status: "success"; data: string }
  // Esta variante representa una respuesta fallida.
  | { status: "error"; message: string };

// Esta función procesa cualquier estado y retorna un texto descriptivo.
function renderState(state: RequestState): string {
  // Este `switch` selecciona la rama según el discriminante `status`.
  switch (state.status) {
    // Este caso maneja la etapa de carga.
    case "loading":
      // Esta línea retorna el progreso actual.
      return `Cargando: ${state.progress}%`;
    // Este caso maneja una respuesta correcta.
    case "success":
      // Esta línea retorna los datos obtenidos.
      return `Datos: ${state.data}`;
    // Este caso maneja el error.
    case "error":
      // Esta línea retorna el mensaje de fallo.
      return `Error: ${state.message}`;
    // Este bloque garantiza cobertura total de la unión.
    default: {
      // Esta línea obliga a que no quede ningún caso sin cubrir.
      const exhaustiveCheck: never = state;
      // Esta línea retorna el valor imposible solo para satisfacer el tipo.
      return exhaustiveCheck;
    }
  }
}

// Este arreglo contiene estados de ejemplo para iterar.
const states: RequestState[] = [
  // Esta línea agrega un estado de carga.
  { status: "loading", progress: 30 },
  // Esta línea agrega un estado exitoso.
  { status: "success", data: "Lista de estudiantes" },
  // Esta línea agrega un estado con error.
  { status: "error", message: "Credenciales inválidas" },
];

// Este bucle recorre cada estado y lo muestra en pantalla.
for (const state of states) {
  // Este `console.log` imprime el texto renderizado.
  console.log(renderState(state));
}
