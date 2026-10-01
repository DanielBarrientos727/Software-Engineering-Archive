// ============================================================
//  EJERCICIO 3 — CARRITO DE COMPRAS — TypeScript
//
//  Conceptos clave:
//  - interface: tipado de Producto e ItemCarrito
//  - parámetros con valor por defecto tipado (cantidad = 1)
//  - ResumenConDescuento: interfaz para el objeto de descuento
//  - Producto | undefined: retorno que puede no encontrarse
// ============================================================

// ── INTERFACES ───────────────────────────────────────────────

interface Producto {
  readonly id: number;
  nombre:      string;
  precio:      number;
  stock:       number;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface ResumenConDescuento {
  nombre:         string;
  cantidad:       number;
  precioOriginal: number;
  precioFinal:    number;
  ahorro:         number;
}

// ── CATÁLOGO ─────────────────────────────────────────────────

const catalogo: Producto[] = [
  { id: 1, nombre: "Camiseta", precio: 35000,  stock: 10 },
  { id: 2, nombre: "Pantalón", precio: 80000,  stock: 5  },
  { id: 3, nombre: "Zapatos",  precio: 120000, stock: 3  },
  { id: 4, nombre: "Gorra",    precio: 25000,  stock: 8  },
  { id: 5, nombre: "Medias",   precio: 8000,   stock: 20 },
];

let carrito: ItemCarrito[] = [];

// ── UTILIDADES ───────────────────────────────────────────────

const formatearPrecio = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

const buscarEnCatalogo = (id: number): Producto | undefined =>
  catalogo.find((p) => p.id === id);

const buscarEnCarrito = (id: number): ItemCarrito | undefined =>
  carrito.find((item) => item.producto.id === id);

// ── FUNCIONES ────────────────────────────────────────────────

const agregarProducto = (id: number, cantidad: number = 1): void => {
  const producto = buscarEnCatalogo(id);
  if (!producto) { console.log(`❌ Producto con id ${id} no encontrado.`); return; }
  if (cantidad > producto.stock) { console.log(`❌ Stock insuficiente. Solo hay ${producto.stock} unidades.`); return; }
  const itemExistente = buscarEnCarrito(id);
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
    console.log(`✅ Cantidad actualizada: ${producto.nombre} x${itemExistente.cantidad}`);
  } else {
    carrito.push({ producto, cantidad });
    console.log(`✅ Agregado: ${producto.nombre} x${cantidad}`);
  }
};

const quitarProducto = (id: number): void => {
  const item = buscarEnCarrito(id);
  if (!item) { console.log(`❌ El producto con id ${id} no está en el carrito.`); return; }
  carrito = carrito.filter((i) => i.producto.id !== id);
  console.log(`🗑️  Eliminado: ${item.producto.nombre}`);
};

const verCarrito = (): void => {
  if (carrito.length === 0) { console.log("\n🛒 El carrito está vacío."); return; }
  console.log("\n════════════════════════════════");
  console.log("         🛒  MI CARRITO         ");
  console.log("════════════════════════════════");
  carrito
    .map((item) => `  [${item.producto.id}] ${item.producto.nombre.padEnd(12)} x${item.cantidad}  →  ${formatearPrecio(item.producto.precio * item.cantidad)}`)
    .forEach((linea) => console.log(linea));
  const total = carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  console.log("────────────────────────────────");
  console.log(`  TOTAL: ${formatearPrecio(total)}`);
  console.log("════════════════════════════════\n");
};

const verCatalogo = (): void => {
  console.log("\n════════════════════════════════");
  console.log("       🏪  CATÁLOGO             ");
  console.log("════════════════════════════════");
  catalogo
    .map((p) => `  [${p.id}] ${p.nombre.padEnd(12)}  ${formatearPrecio(p.precio).padStart(10)}  (stock: ${p.stock})`)
    .forEach((linea) => console.log(linea));
  console.log("════════════════════════════════\n");
};

const aplicarDescuento = (porcentaje: number): void => {
  if (carrito.length === 0) { console.log("❌ El carrito está vacío."); return; }
  const resumen: ResumenConDescuento[] = carrito.map((item) => {
    const precioFinal = item.producto.precio * (1 - porcentaje / 100);
    const ahorro      = (item.producto.precio - precioFinal) * item.cantidad;
    return { nombre: item.producto.nombre, cantidad: item.cantidad, precioOriginal: item.producto.precio, precioFinal, ahorro };
  });
  const totalConDescuento = resumen.reduce((acc, item) => acc + item.precioFinal * item.cantidad, 0);
  const totalAhorro       = resumen.reduce((acc, item) => acc + item.ahorro, 0);
  console.log(`\n🏷️  Descuento del ${porcentaje}% aplicado:`);
  resumen.forEach((item) =>
    console.log(`   ${item.nombre.padEnd(12)} ${formatearPrecio(item.precioOriginal)} → ${formatearPrecio(item.precioFinal)}`)
  );
  console.log(`   Ahorro total:   ${formatearPrecio(totalAhorro)}`);
  console.log(`   Total a pagar:  ${formatearPrecio(totalConDescuento)}\n`);
};

const filtrarPorPrecio = (precioMax: number): void => {
  const accesibles = catalogo.filter((p) => p.precio <= precioMax);
  if (accesibles.length === 0) { console.log(`\n❌ No hay productos por debajo de ${formatearPrecio(precioMax)}.`); return; }
  console.log(`\n🔍 Productos hasta ${formatearPrecio(precioMax)}:`);
  accesibles.forEach((p) => console.log(`   [${p.id}] ${p.nombre.padEnd(12)}  ${formatearPrecio(p.precio)}`));
  console.log();
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────

console.log("╔══════════════════════════════════╗");
console.log("║    SIMULACIÓN: CARRITO DE COMPRAS ║");
console.log("╚══════════════════════════════════╝\n");

console.log("--- Ver catálogo ---");
verCatalogo();

console.log("--- Agregar productos ---");
agregarProducto(1, 2);
agregarProducto(3, 1);
agregarProducto(5, 4);

console.log("\n--- Intentar agregar con stock insuficiente ---");
agregarProducto(3, 99);

console.log("\n--- Ver carrito ---");
verCarrito();

console.log("--- Aplicar descuento del 15% ---");
aplicarDescuento(15);

console.log("--- Filtrar productos hasta $40.000 ---");
filtrarPorPrecio(40000);

console.log("--- Quitar Zapatos del carrito ---");
quitarProducto(3);

console.log("\n--- Carrito final ---");
verCarrito();