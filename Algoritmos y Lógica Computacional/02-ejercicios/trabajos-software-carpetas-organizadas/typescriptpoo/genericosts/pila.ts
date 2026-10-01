class Pila<T> {
  private items: T[] = [];

  apilar(item: T): void { this.items.push(item); }
  desapilar(): T | undefined { return this.items.pop(); }
  tope(): T | undefined { return this.items[this.items.length - 1]; }
  vacia(): boolean { return this.items.length === 0; }
}

const pilaNumeros = new Pila<number>();
pilaNumeros.apilar(1);
pilaNumeros.apilar(2);
pilaNumeros.apilar(3);
console.log(pilaNumeros.tope());
console.log(pilaNumeros.desapilar());
console.log(pilaNumeros.vacia());

const pilaStrings = new Pila<string>();
pilaStrings.apilar("a");
pilaStrings.apilar("b");
console.log(pilaStrings.tope());
console.log(pilaStrings.desapilar());
console.log(pilaStrings.vacia());