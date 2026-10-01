// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta interface describe propiedades comunes.
interface Timestamped {
  // Esta propiedad guarda la fecha de creación.
  createdAt: Date;
}

// Esta interface describe una entidad identificable.
interface Identifiable {
  // Esta propiedad guarda el identificador.
  id: string;
}

// Esta interface combina ambos contratos y añade dominio.
interface Course extends Timestamped, Identifiable {
  // Esta propiedad guarda el nombre del curso.
  name: string;
  // Esta propiedad guarda el número de créditos.
  credits: number;
}

// Esta constante cumple con la interface extendida.
const course: Course = {
  // Esta línea define el identificador.
  id: "TS-2026",
  // Esta línea define la fecha.
  createdAt: new Date("2026-04-19"),
  // Esta línea define el nombre.
  name: "TypeScript profesional",
  // Esta línea define los créditos.
  credits: 4,
};

// Este `console.log` imprime el curso tipado.
console.log(course);
