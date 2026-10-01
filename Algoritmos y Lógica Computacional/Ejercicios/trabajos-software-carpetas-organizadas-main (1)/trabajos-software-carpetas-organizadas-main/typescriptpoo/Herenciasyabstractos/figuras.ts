abstract class Figura {
  abstract area(): number;
}

class Circulo extends Figura {
  constructor(private radio: number) { super(); }
  area(): number { return Math.PI * this.radio ** 2; }
}

class Rectangulo extends Figura {
  constructor(private base: number, private altura: number) { super(); }
  area(): number { return this.base * this.altura; }
}

class Triangulo extends Figura {
  constructor(private base: number, private altura: number) { super(); }
  area(): number { return (this.base * this.altura) / 2; }
}

const figuras: Figura[] = [new Circulo(5), new Rectangulo(4, 6), new Triangulo(3, 8)];

figuras.forEach((f) => console.log(`Área: ${f.area().toFixed(2)}`));