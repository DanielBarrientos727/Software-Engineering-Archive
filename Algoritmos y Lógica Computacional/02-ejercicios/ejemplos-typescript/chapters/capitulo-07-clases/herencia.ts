// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta clase base comparte comportamiento general.
class Person {
  // Este constructor abreviado define propiedades protegidas.
  constructor(protected name: string, protected age: number) {}

  // Este método retorna una presentación general.
  present(): string {
    // Esta línea construye el texto base.
    return `Soy ${this.name} y tengo ${this.age} años`;
  }
}

// Esta subclase especializa a la persona como docente.
class Teacher extends Person {
  // Este constructor añade un área de especialidad.
  constructor(name: string, age: number, private subject: string) {
    // Esta línea delega los datos comunes al padre.
    super(name, age);
  }

  // Este método sobrescribe la presentación base.
  override present(): string {
    // Esta línea amplía la descripción original.
    return `${super.present()} y enseño ${this.subject}`;
  }
}

// Esta constante crea una instancia de la subclase.
const teacher = new Teacher("Julián", 34, "Programación");

// Este `console.log` imprime el resultado polimórfico.
console.log(teacher.present());
