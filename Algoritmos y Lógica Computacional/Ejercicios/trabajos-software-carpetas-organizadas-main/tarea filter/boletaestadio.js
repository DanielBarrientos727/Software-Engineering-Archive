// ============================================================
//  SIMULACIÓN 5 — VENTA DE BOLETAS PARA EL ESTADIO
//  Conceptos: objetos, arrays, funciones flecha,
//              filter, map, reduce, menú con switch
// ============================================================

// ── TRIBUNA / ZONAS DEL ESTADIO ──────────────────────────────
// Cada zona tiene un nombre, precio, capacidad total y asientos vendidos
const zonas = [
  { id: 1, nombre: "Norte (Popular)",     precio: 25000,  capacidad: 500, vendidas: 0 },
  { id: 2, nombre: "Sur (Popular)",       precio: 25000,  capacidad: 500, vendidas: 0 },
  { id: 3, nombre: "Occidental (Platea)", precio: 80000,  capacidad: 200, vendidas: 0 },
  { id: 4, nombre: "Oriental (Platea)",   precio: 80000,  capacidad: 200, vendidas: 0 },
  { id: 5, nombre: "Palco VIP",           precio: 180000, capacidad: 50,  vendidas: 0 },
];

// ── REGISTRO DE VENTAS ───────────────────────────────────────
// Cada venta: { idVenta, comprador, zona, cantidad, total, fecha }
let ventas = [];

// Contador para los IDs de cada venta
let contadorVentas = 0;

// ── UTILIDADES ───────────────────────────────────────────────

// Formato de precios en pesos colombianos
const formatearPrecio = (valor) =>
  `$${valor.toLocaleString("es-CO")}`;

// Hora de la venta
const ahora = () => new Date().toLocaleString("es-CO");

// Busca una zona por su id
const buscarZona = (id) =>
  zonas.find((z) => z.id === id);

// Calcula cuántos asientos quedan disponibles en una zona
// La disponibilidad es: capacidad total - boletas ya vendidas
const disponiblesEnZona = (zona) =>
  zona.capacidad - zona.vendidas;

// ── 1. VER DISPONIBILIDAD DE TODAS LAS ZONAS ────────────────
// map: transforma cada zona en una línea del tablero
const verDisponibilidad = () => {
  console.log("\n════════════════════════════════════════════════════════");
  console.log("                 🏟️  ESTADIO — ZONAS                  ");
  console.log("════════════════════════════════════════════════════════");

  // map: convierte cada zona en una fila legible
  zonas
    .map((z) => {
      const disponibles = disponiblesEnZona(z);
      const estado      = disponibles === 0 ? "⛔ AGOTADO" : `✅ ${disponibles} disp.`;
      return (
        `  [${z.id}] ${z.nombre.padEnd(22)}  ${formatearPrecio(z.precio).padStart(10)}` +
        `  │  ${estado}`
      );
    })
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════════════════════════════\n");
};

// ── 2. COMPRAR BOLETAS ───────────────────────────────────────
// Recibe: datos del comprador, id de zona y cantidad de boletas
const comprarBoletas = (comprador, idZona, cantidad) => {
  const zona = buscarZona(idZona);

  // Validaciones antes de vender
  if (!zona) {
    console.log(`❌ Zona con id ${idZona} no existe.`);
    return;
  }

  const disponibles = disponiblesEnZona(zona);

  if (disponibles === 0) {
    console.log(`❌ La zona "${zona.nombre}" está agotada.`);
    return;
  }
  if (cantidad > disponibles) {
    console.log(`❌ Solo quedan ${disponibles} boletas en "${zona.nombre}".`);
    return;
  }
  if (cantidad <= 0) {
    console.log("❌ La cantidad debe ser mayor a 0.");
    return;
  }

  // Calcular total a cobrar
  const total = zona.precio * cantidad;

  // Descontar las boletas de la zona
  zona.vendidas += cantidad;

  // Incrementar el contador y crear la venta
  contadorVentas++;
  const nuevaVenta = {
    idVenta:   `BOL-${String(contadorVentas).padStart(4, "0")}`,
    comprador,            // objeto con nombre y documento
    zona:      zona.nombre,
    idZona:    zona.id,
    cantidad,
    total,
    fecha:     ahora(),
  };

  ventas.push(nuevaVenta);

  console.log(`\n🎟️  Compra exitosa — Recibo:`);
  console.log(`   Número venta : ${nuevaVenta.idVenta}`);
  console.log(`   Comprador    : ${comprador.nombre}`);
  console.log(`   Zona         : ${zona.nombre}`);
  console.log(`   Boletas      : ${cantidad}`);
  console.log(`   Precio unit. : ${formatearPrecio(zona.precio)}`);
  console.log(`   TOTAL        : ${formatearPrecio(total)}\n`);
};

// ── 3. VER TODAS LAS VENTAS ──────────────────────────────────
// map: muestra cada venta como una línea de texto
const verVentas = () => {
  if (ventas.length === 0) {
    console.log("\n📋 No se han realizado ventas aún.\n");
    return;
  }

  console.log("\n════════════════════════════════════════════════════════");
  console.log("                  📋  REGISTRO DE VENTAS               ");
  console.log("════════════════════════════════════════════════════════");

  // map: convierte cada venta en una línea del registro
  ventas
    .map(
      (v) =>
        `  ${v.idVenta}  │  ${v.comprador.nombre.padEnd(18)}  │  ${v.zona.padEnd(22)}` +
        `  │  x${v.cantidad}  │  ${formatearPrecio(v.total)}`
    )
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════════════════════════════\n");
};

// ── 4. REPORTE DE INGRESOS ───────────────────────────────────
// reduce: suma todos los totales de ventas para el ingreso global
// map   : extrae los totales para pasarlos al reduce
const reporteIngresos = () => {
  if (ventas.length === 0) {
    console.log("\n💰 Sin ventas para reportar.\n");
    return;
  }

  // map: extrae solo los totales de cada venta → [80000, 25000, ...]
  const totales = ventas.map((v) => v.total);

  // reduce: acumula todos los totales en uno solo
  const ingresoTotal = totales.reduce(
    (acumulado, total) => acumulado + total,
    0
  );

  // reduce: suma el total de boletas vendidas
  const boletasTotales = ventas.reduce(
    (acc, v) => acc + v.cantidad,
    0
  );

  console.log("\n════════════════════════════════════════");
  console.log("         💰  REPORTE DE INGRESOS        ");
  console.log("════════════════════════════════════════");
  console.log(`  Transacciones realizadas : ${ventas.length}`);
  console.log(`  Boletas vendidas         : ${boletasTotales}`);
  console.log(`  Ingresos totales         : ${formatearPrecio(ingresoTotal)}`);
  console.log("════════════════════════════════════════\n");
};

// ── 5. REPORTE POR ZONA ──────────────────────────────────────
// filter + reduce: ingresos y boletas vendidas por cada zona
const reportePorZona = () => {
  console.log("\n📊 Ventas por zona:");

  zonas.forEach((zona) => {
    // filter: selecciona solo las ventas de esta zona
    const ventasZona = ventas.filter((v) => v.idZona === zona.id);

    // reduce: suma los ingresos de esta zona
    const ingresos = ventasZona.reduce((acc, v) => acc + v.total, 0);

    const ocupacion = `${zona.vendidas}/${zona.capacidad}`;

    console.log(
      `   ${zona.nombre.padEnd(24)}  vendidas: ${ocupacion.padEnd(8)}  ingresos: ${formatearPrecio(ingresos)}`
    );
  });
  console.log();
};

// ── 6. BUSCAR VENTAS DE UN COMPRADOR ────────────────────────
// filter: muestra solo las compras hechas por un documento específico
const buscarVentasPorComprador = (documento) => {
  // filter: conserva solo las ventas cuyo comprador tiene ese documento
  const misCompras = ventas.filter(
    (v) => v.comprador.documento === documento
  );

  if (misCompras.length === 0) {
    console.log(`\n🔍 No se encontraron compras para el documento ${documento}.\n`);
    return;
  }

  console.log(`\n🔍 Compras registradas para documento ${documento}:`);
  misCompras.forEach((v) =>
    console.log(
      `   ${v.idVenta}  →  ${v.zona}  ×${v.cantidad}  →  ${formatearPrecio(v.total)}`
    )
  );
  console.log();
};

// ── 7. DEVOLVER BOLETAS ──────────────────────────────────────
// filter: elimina la venta y devuelve las boletas a la zona
const devolverBoletas = (idVenta) => {
  const venta = ventas.find((v) => v.idVenta === idVenta);

  if (!venta) {
    console.log(`❌ Venta ${idVenta} no encontrada.`);
    return;
  }

  // Devolver los asientos a la zona
  const zona = buscarZona(venta.idZona);
  zona.vendidas -= venta.cantidad;

  // Eliminar la venta del registro con filter
  ventas = ventas.filter((v) => v.idVenta !== idVenta);

  console.log(`\n↩️  Devolución exitosa:`);
  console.log(`   ${venta.cantidad} boleta(s) de ${venta.zona} devuelta(s).`);
  console.log(`   Reembolso: ${formatearPrecio(venta.total)}\n`);
};

// ── MENÚ PRINCIPAL ───────────────────────────────────────────
const menu = (opcion) => {
  switch (opcion) {
    case 1:
      verDisponibilidad();
      break;
    case 2:
      // comprarBoletas(comprador, idZona, cantidad)
      comprarBoletas({ nombre: "Ana Torres", documento: "111111" }, 1, 3);
      break;
    case 3:
      verVentas();
      break;
    case 4:
      reporteIngresos();
      break;
    case 5:
      reportePorZona();
      break;
    case 6:
      // buscarVentasPorComprador(documento)
      buscarVentasPorComprador("111111");
      break;
    case 7:
      // devolverBoletas(idVenta)
      devolverBoletas("BOL-0001");
      break;
    default:
      console.log("❌ Opción no válida.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
console.log("╔══════════════════════════════════════╗");
console.log("║  SIMULACIÓN: BOLETAS PARA ESTADIO    ║");
console.log("╚══════════════════════════════════════╝\n");

console.log("--- Disponibilidad inicial ---");
verDisponibilidad();

console.log("--- Comprar boletas ---");
comprarBoletas({ nombre: "Carlos Pérez",   documento: "123456" }, 1, 5);
comprarBoletas({ nombre: "María Gómez",    documento: "789012" }, 5, 2);  // Palco VIP
comprarBoletas({ nombre: "Luis Martínez",  documento: "345678" }, 3, 4);  // Platea
comprarBoletas({ nombre: "Carlos Pérez",   documento: "123456" }, 5, 1);  // Segunda compra

console.log("--- Disponibilidad actualizada ---");
verDisponibilidad();

console.log("--- Todas las ventas ---");
verVentas();

console.log("--- Reporte de ingresos ---");
reporteIngresos();

console.log("--- Reporte por zona ---");
reportePorZona();

console.log("--- Buscar compras de Carlos (123456) ---");
buscarVentasPorComprador("123456");

console.log("--- Devolver boletas de BOL-0001 ---");
devolverBoletas("BOL-0001");

console.log("--- Disponibilidad final ---");
verDisponibilidad();