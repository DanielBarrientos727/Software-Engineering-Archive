interface ConId { id: number; }

class Repositorio<T extends ConId> {
  private items: T[] = [];

  agregar(item: T): void { this.items.push(item); }
  buscarPorId(id: number): T | undefined { return this.items.find((i) => i.id === id); }
  eliminar(id: number): void { this.items = this.items.filter((i) => i.id !== id); }
  todos(): T[] { return this.items; }
}

const productos = new Repositorio<{ id: number; nombre: string }>();
productos.agregar({ id: 1, nombre: "Camisa" });
productos.agregar({ id: 2, nombre: "Zapatos" });
console.log(productos.buscarPorId(1));
productos.eliminar(1);
console.log(productos.todos());

const usuarios = new Repositorio<{ id: number; nombre: string; email: string }>();
usuarios.agregar({ id: 1, nombre: "Ana", email: "ana@mail.com" });
usuarios.agregar({ id: 2, nombre: "Luis", email: "luis@mail.com" });
console.log(usuarios.todos());