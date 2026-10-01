const productos = [
  { nombre: "Camisa", precio: 80000, descuento: 10 },
  { nombre: "Zapatos", precio: 150000, descuento: 25 },
  { nombre: "Gorra", precio: 40000, descuento: 30 },
  { nombre: "Pantalón", precio: 120000, descuento: 15 },
  { nombre: "Chaqueta", precio: 200000, descuento: 40 },
];

productos
  .filter((p) => p.descuento > 20)
  .forEach((p) => {
    const precioFinal = p.precio - (p.precio * p.descuento) / 100;
    console.log(`${p.nombre} - Precio final: $${precioFinal.toLocaleString()}`);
  });