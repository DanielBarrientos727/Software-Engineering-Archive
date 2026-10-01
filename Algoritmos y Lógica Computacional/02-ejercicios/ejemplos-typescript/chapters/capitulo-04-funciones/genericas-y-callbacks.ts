// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Este tipo representa un callback que transforma un valor.
type Mapper<T, U> = (value: T) => U;

// Esta función genérica reutiliza un callback sobre una lista.
function mapItems<T, U>(items: T[], mapper: Mapper<T, U>): U[] {
  // Esta línea delega la transformación al callback recibido.
  return items.map(mapper);
}

// Esta constante contiene números base.
const values = [1, 2, 3, 4];

// Esta constante usa la función genérica con un callback tipado.
const squares = mapItems(values, (value) => value ** 2);

// Esta constante usa la misma función para producir texto.
const labels = mapItems(values, (value) => `Valor ${value}`);

// Este `console.log` imprime los cuadrados.
console.log(squares);

// Este `console.log` imprime las etiquetas generadas.
console.log(labels);
