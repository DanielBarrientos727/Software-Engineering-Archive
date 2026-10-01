abstract class Animal {
  constructor(public nombre: string) {}
  abstract hacerSonido(): void;
  comer(): void { console.log(`${this.nombre} está comiendo`); }
}

class Perro extends Animal {
  hacerSonido(): void { console.log(`${this.nombre}: ¡Guau!`); }
}

class Gato extends Animal {
  hacerSonido(): void { console.log(`${this.nombre}: ¡Miau!`); }
}

class Vaca extends Animal {
  hacerSonido(): void { console.log(`${this.nombre}: ¡Muuu!`); }
}

const animales: Animal[] = [new Perro("Rex"), new Gato("Mimi"), new Vaca("Lola")];

animales.forEach((a) => { a.hacerSonido(); a.comer(); });