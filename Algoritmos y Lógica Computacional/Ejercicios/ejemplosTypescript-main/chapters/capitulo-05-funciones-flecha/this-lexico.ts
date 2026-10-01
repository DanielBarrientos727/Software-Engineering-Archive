// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta clase demuestra el `this` léxico con funciones flecha.
class Counter {
  // Esta propiedad guarda el estado interno.
  private count = 0;

  // Este método devuelve una función flecha que recuerda la instancia.
  createIncrementer() {
    // Esta función flecha hereda el `this` del método contenedor.
    return () => {
      // Esta línea incrementa el contador de la misma instancia.
      this.count += 1;
      // Esta línea retorna el valor actualizado.
      return this.count;
    };
  }
}

// Esta constante crea una instancia del contador.
const counter = new Counter();

// Esta constante obtiene la función flecha enlazada léxicamente.
const increment = counter.createIncrementer();

// Estos `console.log` muestran el incremento acumulado.
console.log(increment());
console.log(increment());
console.log(increment());
