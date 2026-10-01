// data/productos.js
let productos = [
  { id: 1, nombre: 'Laptop HP', precio: 3500000, stock: 10, categoria: 'Tecnología' },
  { id: 2, nombre: 'Mouse Logitech', precio: 85000, stock: 50, categoria: 'Accesorios' },
  { id: 3, nombre: 'Teclado Mecánico', precio: 250000, stock: 25, categoria: 'Accesorios' }
];

let nextId = 4;

module.exports = {
  getAll: () => productos,
  getById: (id) => productos.find(p => p.id === parseInt(id)),
  create: (producto) => {
    const nuevo = { id: nextId++, ...producto };
    productos.push(nuevo);
    return nuevo;
  },
  update: (id, data) => {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    productos[index] = { ...productos[index], ...data, id: parseInt(id) };
    return productos[index];
  },
  delete: (id) => {
    const index = productos.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    productos.splice(index, 1);
    return true;
  }
};