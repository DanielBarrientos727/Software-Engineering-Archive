export {};

class Libro {
  titulo: string;
  autor: string;
  paginas: number;
  prestado: boolean = false;

  constructor(titulo: string, autor: string, paginas: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
  }

  prestar(): void { this.prestado = true; }
  devolver(): void { this.prestado = false; }
  estado(): void { console.log(`${this.titulo} - ${this.prestado ? "Prestado" : "Disponible"}`); }
}

const l1 = new Libro("Clean Code", "Robert Martin", 431);
const l2 = new Libro("El Quijote", "Cervantes", 1023);

l1.estado();
l1.prestar();
l1.estado();
l2.estado();
l2.prestar();
l2.devolver();
l2.estado();