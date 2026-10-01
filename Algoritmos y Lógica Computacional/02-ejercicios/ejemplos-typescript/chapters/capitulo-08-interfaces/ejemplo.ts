// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta interface modela la base común de entidades persistentes.
interface BaseEntity {
  // Esta propiedad identifica la entidad y no puede cambiar.
  readonly id: string;
}

// Esta interface extiende la base con información del estudiante.
interface UniversityStudent extends BaseEntity {
  // Esta propiedad guarda el nombre.
  name: string;
  // Esta propiedad guarda el correo.
  email: string;
}

// Esta interface define un contrato de servicio.
interface StudentRepository {
  // Este método lista estudiantes.
  list(): UniversityStudent[];
}

// Esta clase implementa el contrato del repositorio.
class MemoryStudentRepository implements StudentRepository {
  // Esta propiedad privada simula una base de datos en memoria.
  private students: UniversityStudent[] = [
    // Esta línea define el primer estudiante.
    { id: "1", name: "Ana", email: "ana@avh.edu.co" },
    // Esta línea define el segundo estudiante.
    { id: "2", name: "Luis", email: "luis@avh.edu.co" },
  ];

  // Este método cumple exactamente la firma pedida por la interface.
  list(): UniversityStudent[] {
    // Esta línea retorna una copia superficial para evitar mutaciones externas.
    return [...this.students];
  }
}

// Esta constante crea una instancia concreta del repositorio.
const repository = new MemoryStudentRepository();

// Este `console.log` muestra los datos retornados por la implementación.
console.log(repository.list());
