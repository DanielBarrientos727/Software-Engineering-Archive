type Libro = {
  readonly isbn: string;
  titulo: string;
  autor: string;
  paginas: number;
  anio: number;
  generos?: string[];
};

const libro1: Libro = { isbn: "978-1", titulo: "Clean Code", autor: "Robert Martin", paginas: 431, anio: 2008 };
const libro2: Libro = { isbn: "978-2", titulo: "El Quijote", autor: "Cervantes", paginas: 1023, anio: 1605, generos: ["Novela"] };

const libro1Actualizado = { ...libro1, anio: 2024 };
const libro2Actualizado = { ...libro2, generos: [...(libro2.generos ?? []), "Clásico"] };

console.log(libro1Actualizado);
console.log(libro2Actualizado);