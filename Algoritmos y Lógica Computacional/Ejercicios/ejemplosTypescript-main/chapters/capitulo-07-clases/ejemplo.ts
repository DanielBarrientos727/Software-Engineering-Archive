// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta clase abstracta define el contrato de toda figura académica del capítulo.
abstract class Figure {
  // Este constructor guarda el color como propiedad de solo lectura.
  constructor(public readonly color: string) {}

  // Este método abstracto obliga a cada subclase a calcular su área.
  abstract area(): number;

  // Este método concreto reutiliza la lógica común de descripción.
  describe(): string {
    // Esta línea retorna un resumen formateado.
    return `Figura ${this.color} con área ${this.area().toFixed(2)}`;
  }
}

// Esta subclase representa un rectángulo.
class Rectangle extends Figure {
  // Este constructor abreviado declara y asigna el ancho y el alto.
  constructor(color: string, private width: number, private height: number) {
    // Esta línea delega el color a la clase base.
    super(color);
  }

  // Este método sobrescribe el contrato abstracto.
  override area(): number {
    // Esta línea calcula el área del rectángulo.
    return this.width * this.height;
  }
}

// Esta constante crea una instancia válida de la subclase.
const rectangle = new Rectangle("azul", 8, 5);

// Este `console.log` imprime la descripción de la figura.
console.log(rectangle.describe());
