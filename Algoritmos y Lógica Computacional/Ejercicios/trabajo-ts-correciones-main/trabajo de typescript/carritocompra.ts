// ============================================================
//  SIMULACIÓN 3 — CARRITO DE COMPRAS — TypeScript
//
//  🔑 CAMBIOS CLAVE vs JavaScript:
//  - interface: tipado de Producto e ItemCarrito
//  - Tipos en parámetros con valores por defecto (cantidad = 1)
//  - ResumenConDescuento: interfaz para el objeto que crea map()
//  - number[] tipado explícito en los arrays intermedios
// ============================================================

// ── INTERFACES ───────────────────────────────────────────────

interface Producto {
  readonly id: number;      // readonly: el id no debe cambiar
  nombre:      string;
  precio:      number;
  stock:       number;      // sí cambia: disminuye al agregar al carrito
}

interface ItemCarrito {
  producto:  Producto;      // referencia al objeto del catálogo
  cantidad:  number;
}

// Interfaz para el resultado del descuento (solo para visualización)
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

// Retorna Producto | undefined → obliga a verificar antes de usar
const buscarEnCatalogo = (id: number): Producto | undefined =>
  catalogo.find((p) => p.id === id);

// Retorna ItemCarrito | undefined
const buscarEnCarrito = (id: number): ItemCarrito | undefined =>
  carrito.find((item) => item.producto.id === id);

// ── 1. AGREGAR PRODUCTO ──────────────────────────────────────
// cantidad: number = 1 → parámetro con valor por defecto tipado
const agregarProducto = (id: number, cantidad: number = 1): void => {
  const producto = buscarEnCatalogo(id);

  if (!producto) {
    console.log(`❌ Producto con id ${id} no encontrado.`);
    return;
  }
  if (cantidad > producto.stock) {
    console.log(`❌ Stock insuficiente. Solo hay ${producto.stock} unidades.`);
    return;
  }

  const itemExistente = buscarEnCarrito(id);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
    console.log(`✅ Cantidad actualizada: ${producto.nombre} x${itemExistente.cantidad}`);
  } else {
    // ItemCarrito explícito al crear el objeto
    const nuevoItem: ItemCarrito = { producto, cantidad };
    carrito.push(nuevoItem);
    console.log(`✅ Agregado: ${producto.nombre} x${cantidad}`);
  }
};

// ── 2. QUITAR PRODUCTO ───────────────────────────────────────
const quitarProducto = (id: number): void => {
  const item = buscarEnCarrito(id);

  if (!item) {
    console.log(`❌ El producto con id ${id} no está en el carrito.`);
    return;
  }

  carrito = carrito.filter((item) => item.producto.id !== id);
  console.log(`🗑️  Eliminado: ${item.producto.nombre}`);
};

// ── 3. CAMBIAR CANTIDAD ──────────────────────────────────────
const cambiarCantidad = (id: number, nuevaCantidad: number): void => {
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
const verCarrito = (): void => {
  if (carrito.length === 0) {
    console.log("\n🛒 El carrito está vacío.");
    return;
  }

  console.log("\n════════════════════════════════");
  console.log("         🛒  MI CARRITO         ");
  console.log("════════════════════════════════");

  // map retorna string[] → cada item se convierte en una línea
  const lineas: string[] = carrito.map(
    (item) =>
      `  [${item.producto.id}] ${item.producto.nombre.padEnd(12)} ` +
      `x${item.cantidad}  →  ${formatearPrecio(item.producto.precio * item.cantidad)}`
  );

  lineas.forEach((linea) => console.log(linea));

  // reduce: (acc: number, item: ItemCarrito) → acumula en number
  const total: number = carrito.reduce(
    (acc: number, item: ItemCarrito) => acc + item.producto.precio * item.cantidad,
    0
  );

  console.log("────────────────────────────────");
  console.log(`  TOTAL: ${formatearPrecio(total)}`);
  console.log("════════════════════════════════\n");
};

// ── 5. VER CATÁLOGO ──────────────────────────────────────────
const verCatalogo = (): void => {
  console.log("\n════════════════════════════════");
  console.log("       🏪  CATÁLOGO             ");
  console.log("════════════════════════════════");

  catalogo
    .map(
      (p) =>
        `  [${p.id}] ${p.nombre.padEnd(12)}  ${formatearPrecio(p.precio).padStart(10)}  (stock: ${p.stock})`
    )
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════\n");
};

// ── 6. VACIAR CARRITO ────────────────────────────────────────
const vaciarCarrito = (): void => {
  carrito = [];
  console.log("🧹 Carrito vaciado.");
};

// ── 7. APLICAR DESCUENTO ─────────────────────────────────────
const aplicarDescuento = (porcentaje: number): void => {
  if (carrito.length === 0) {
    console.log("❌ El carrito está vacío.");
    return;
  }

  // map retorna ResumenConDescuento[] → tipo explícito en el resultado
  const resumen: ResumenConDescuento[] = carrito.map((item) => {
    const precioFinal  = item.producto.precio * (1 - porcentaje / 100);
    const ahorro       = (item.producto.precio - precioFinal) * item.cantidad;
    return {
      nombre:         item.producto.nombre,
      cantidad:       item.cantidad,
      precioOriginal: item.producto.precio,
      precioFinal,
      ahorro,
    };
  });

  const totalConDescuento: number = resumen.reduce(
    (acc, item) => acc + item.precioFinal * item.cantidad,
    0
  );

  const totalAhorro: number = resumen.reduce(
    (acc, item) => acc + item.ahorro,
    0
  );

  console.log(`\n🏷️  Descuento del ${porcentaje}% aplicado:`);
  resumen.forEach((item) =>
    console.log(
      `   ${item.nombre.padEnd(12)} ${formatearPrecio(item.precioOriginal)} → ${formatearPrecio(item.precioFinal)}`
    )
  );
  console.log(`   Ahorro total:   ${formatearPrecio(totalAhorro)}`);
  console.log(`   Total a pagar:  ${formatearPrecio(totalConDescuento)}\n`);
};

// ── 8. FILTRAR POR PRECIO MÁXIMO ────────────────────────────
const filtrarPorPrecio = (precioMax: number): void => {
  // filter retorna Producto[] (no ItemCarrito[])
  const accesibles: Producto[] = catalogo.filter((p) => p.precio <= precioMax);

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

// ── MENÚ ─────────────────────────────────────────────────────
const menu = (opcion: number): void => {
  switch (opcion) {
    case 1: verCatalogo(); break;
    case 2: verCarrito(); break;
    case 3: agregarProducto(1, 2); break;
    case 4: quitarProducto(1); break;
    case 5: cambiarCantidad(2, 3); break;
    case 6: aplicarDescuento(10); break;
    case 7: filtrarPorPrecio(50000); break;
    case 8: vaciarCarrito(); break;
    default: console.log("❌ Opción no válida.");
  }
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
