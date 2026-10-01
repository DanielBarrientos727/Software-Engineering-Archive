// ============================================================
//  SIMULACIÓN 3 — CARRITO DE COMPRAS
//  Conceptos: objetos, arrays, funciones flecha, filter,
//              map, reduce, menú interactivo con switch
// ============================================================

// ── CATÁLOGO DE PRODUCTOS DISPONIBLES EN LA TIENDA ──────────
// Cada producto es un objeto con id, nombre, precio y stock
const catalogo = [
  { id: 1, nombre: "Camiseta", precio: 35000, stock: 10 },
  { id: 2, nombre: "Pantalón", precio: 80000, stock: 5 },
  { id: 3, nombre: "Zapatos",  precio: 120000, stock: 3 },
  { id: 4, nombre: "Gorra",    precio: 25000, stock: 8 },
  { id: 5, nombre: "Medias",   precio: 8000,  stock: 20 },
];

// ── CARRITO: empieza vacío ───────────────────────────────────
// Cada entrada tendrá: { producto, cantidad }
let carrito = [];

// ── UTILIDADES ───────────────────────────────────────────────

// Formatea un número como pesos colombianos
const formatearPrecio = (valor) =>
  `$${valor.toLocaleString("es-CO")}`;

// Busca un producto en el catálogo por su id
const buscarEnCatalogo = (id) =>
  catalogo.find((p) => p.id === id);

// Busca si un producto ya está dentro del carrito
const buscarEnCarrito = (id) =>
  carrito.find((item) => item.producto.id === id);

// ── 1. AGREGAR PRODUCTO AL CARRITO ───────────────────────────
// Si ya existe en el carrito, solo aumenta la cantidad.
// Si no existe, lo agrega como nueva entrada.
const agregarProducto = (id, cantidad = 1) => {
  const producto = buscarEnCatalogo(id);

  // Validación: el producto debe existir en el catálogo
  if (!producto) {
    console.log(`❌ Producto con id ${id} no encontrado.`);
    return;
  }

  // Validación: debe haber stock suficiente
  if (cantidad > producto.stock) {
    console.log(`❌ Stock insuficiente. Solo hay ${producto.stock} unidades.`);
    return;
  }

  const itemExistente = buscarEnCarrito(id);

  if (itemExistente) {
    // Producto ya en el carrito → aumentar cantidad
    itemExistente.cantidad += cantidad;
    console.log(`✅ Cantidad actualizada: ${producto.nombre} x${itemExistente.cantidad}`);
  } else {
    // Producto nuevo → agregar al carrito
    carrito.push({ producto, cantidad });
    console.log(`✅ Agregado: ${producto.nombre} x${cantidad}`);
  }
};

// ── 2. QUITAR PRODUCTO DEL CARRITO ───────────────────────────
// Usa filter para reconstruir el carrito sin ese producto
const quitarProducto = (id) => {
  const item = buscarEnCarrito(id);

  if (!item) {
    console.log(`❌ El producto con id ${id} no está en el carrito.`);
    return;
  }

  // filter devuelve todos los items EXCEPTO el que tiene ese id
  carrito = carrito.filter((item) => item.producto.id !== id);
  console.log(`🗑️  Eliminado: ${item.producto.nombre}`);
};

// ── 3. CAMBIAR CANTIDAD DE UN PRODUCTO ───────────────────────
// Si la nueva cantidad es 0 o menor, el producto se elimina
const cambiarCantidad = (id, nuevaCantidad) => {
  if (nuevaCantidad <= 0) {
    quitarProducto(id);
    return;
  }

  const item = buscarEnCarrito(id);
  if (!item) {
    console.log(`❌ Producto con id ${id} no está en el carrito.`);
    return;
  }

  if (nuevaCantidad > item.producto.stock) {
    console.log(`❌ Stock insuficiente. Máximo disponible: ${item.producto.stock}`);
    return;
  }

  item.cantidad = nuevaCantidad;
  console.log(`✏️  Cantidad actualizada: ${item.producto.nombre} → x${nuevaCantidad}`);
};

// ── 4. VER CARRITO ───────────────────────────────────────────
// Usa map para mostrar cada item y reduce para el total
const verCarrito = () => {
  if (carrito.length === 0) {
    console.log("\n🛒 El carrito está vacío.");
    return;
  }

  console.log("\n════════════════════════════════");
  console.log("         🛒  MI CARRITO         ");
  console.log("════════════════════════════════");

  // map: transforma cada item en una línea de texto formateada
  const lineas = carrito.map(
    (item) =>
      `  [${item.producto.id}] ${item.producto.nombre.padEnd(12)} ` +
      `x${item.cantidad}  →  ${formatearPrecio(item.producto.precio * item.cantidad)}`
  );

  lineas.forEach((linea) => console.log(linea));

  // reduce: suma el total acumulando precio × cantidad de cada item
  const total = carrito.reduce(
    (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
    0 // valor inicial del acumulador
  );

  console.log("────────────────────────────────");
  console.log(`  TOTAL: ${formatearPrecio(total)}`);
  console.log("════════════════════════════════\n");
};

// ── 5. VER CATÁLOGO ──────────────────────────────────────────
// Usa map para listar todos los productos disponibles
const verCatalogo = () => {
  console.log("\n════════════════════════════════");
  console.log("       🏪  CATÁLOGO             ");
  console.log("════════════════════════════════");

  // map: convierte cada producto en una línea descriptiva
  catalogo
    .map(
      (p) =>
        `  [${p.id}] ${p.nombre.padEnd(12)}  ${formatearPrecio(p.precio).padStart(10)}  (stock: ${p.stock})`
    )
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════\n");
};

// ── 6. VACIAR CARRITO ────────────────────────────────────────
const vaciarCarrito = () => {
  carrito = [];
  console.log("🧹 Carrito vaciado.");
};

// ── 7. APLICAR DESCUENTO ─────────────────────────────────────
// Usa map para recalcular precios con un % de descuento
const aplicarDescuento = (porcentaje) => {
  if (carrito.length === 0) {
    console.log("❌ El carrito está vacío.");
    return;
  }

  // map: crea una nueva vista con el precio rebajado (no modifica el catálogo)
  const resumen = carrito.map((item) => {
    const precioConDescuento = item.producto.precio * (1 - porcentaje / 100);
    return {
      nombre: item.producto.nombre,
      cantidad: item.cantidad,
      precioOriginal: item.producto.precio,
      precioFinal: precioConDescuento,
      ahorro: (item.producto.precio - precioConDescuento) * item.cantidad,
    };
  });

  // reduce: suma el total con descuento aplicado
  const totalConDescuento = resumen.reduce(
    (acc, item) => acc + item.precioFinal * item.cantidad,
    0
  );

  const totalAhorro = resumen.reduce((acc, item) => acc + item.ahorro, 0);

  console.log(`\n🏷️  Descuento del ${porcentaje}% aplicado:`);
  resumen.forEach((item) =>
    console.log(
      `   ${item.nombre.padEnd(12)} ${formatearPrecio(item.precioOriginal)} → ${formatearPrecio(item.precioFinal)}`
    )
  );
  console.log(`   Ahorro total:   ${formatearPrecio(totalAhorro)}`);
  console.log(`   Total a pagar:  ${formatearPrecio(totalConDescuento)}\n`);
};

// ── 8. BUSCAR PRODUCTOS POR PRECIO MÁXIMO ────────────────────
// Usa filter para mostrar solo los que el cliente puede pagar
const filtrarPorPrecio = (precioMax) => {
  // filter: conserva solo los productos cuyo precio es <= precioMax
  const accesibles = catalogo.filter((p) => p.precio <= precioMax);

  if (accesibles.length === 0) {
    console.log(`\n❌ No hay productos por debajo de ${formatearPrecio(precioMax)}.`);
    return;
  }

  console.log(`\n🔍 Productos hasta ${formatearPrecio(precioMax)}:`);
  accesibles.forEach((p) =>
    console.log(`   [${p.id}] ${p.nombre.padEnd(12)}  ${formatearPrecio(p.precio)}`)
  );
  console.log();
};

// ── MENÚ PRINCIPAL ───────────────────────────────────────────
// switch evalúa la opción del usuario y llama a la función correcta
const menu = (opcion) => {
  switch (opcion) {
    case 1:
      verCatalogo();
      break;
    case 2:
      verCarrito();
      break;
    case 3:
      // agregarProducto(id, cantidad)
      agregarProducto(1, 2); // Ejemplo: 2 Camisetas
      break;
    case 4:
      // quitarProducto(id)
      quitarProducto(1);
      break;
    case 5:
      // cambiarCantidad(id, nuevaCantidad)
      cambiarCantidad(2, 3);
      break;
    case 6:
      // aplicarDescuento(porcentaje)
      aplicarDescuento(10);
      break;
    case 7:
      // filtrarPorPrecio(maximo)
      filtrarPorPrecio(50000);
      break;
    case 8:
      vaciarCarrito();
      break;
    default:
      console.log("❌ Opción no válida.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
console.log("╔══════════════════════════════════╗");
console.log("║    SIMULACIÓN: CARRITO DE COMPRAS ║");
console.log("╚══════════════════════════════════╝\n");

console.log("--- Ver catálogo ---");
verCatalogo();

console.log("--- Agregar productos ---");
agregarProducto(1, 2);   // 2 Camisetas
agregarProducto(3, 1);   // 1 par de Zapatos
agregarProducto(5, 4);   // 4 Medias

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