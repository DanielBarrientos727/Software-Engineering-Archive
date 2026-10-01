// ============================================================
//  SIMULACIÓN 5 — VENTA DE BOLETAS PARA EL ESTADIO — TypeScript
//
//  🔑 CAMBIOS CLAVE vs JavaScript:
//  - interface: Zona, Comprador, Venta completamente tipados
//  - NombreZona: union de literales para los nombres permitidos
//  - Readonly<Zona> aplicado en buscarZona (no modifica la zona buscada)
//  - Tipos de retorno explícitos en todas las funciones
// ============================================================

// ── TIPOS Y INTERFACES ────────────────────────────────────────

// Union de los nombres exactos de zonas → previene errores de tipeo
type NombreZona =
  | "Norte (Popular)"
  | "Sur (Popular)"
  | "Occidental (Platea)"
  | "Oriental (Platea)"
  | "Palco VIP";

interface Zona {
  readonly id:   number;
  nombre:        NombreZona;
  precio:        number;
  capacidad:     number;
  vendidas:      number;      // aumenta con cada venta, disminuye al devolver
}

interface Comprador {
  nombre:    string;
  documento: string;
}

interface Venta {
  readonly idVenta:   string;      // ej: "BOL-0001"
  comprador:          Comprador;
  zona:               NombreZona;
  readonly idZona:    number;
  cantidad:           number;
  total:              number;
  readonly fecha:     string;
}

// ── DATOS INICIALES ──────────────────────────────────────────

const zonas: Zona[] = [
  { id: 1, nombre: "Norte (Popular)",     precio: 25000,  capacidad: 500, vendidas: 0 },
  { id: 2, nombre: "Sur (Popular)",       precio: 25000,  capacidad: 500, vendidas: 0 },
  { id: 3, nombre: "Occidental (Platea)", precio: 80000,  capacidad: 200, vendidas: 0 },
  { id: 4, nombre: "Oriental (Platea)",   precio: 80000,  capacidad: 200, vendidas: 0 },
  { id: 5, nombre: "Palco VIP",           precio: 180000, capacidad: 50,  vendidas: 0 },
];

let ventas: Venta[] = [];
let contadorVentas:  number = 0;

// ── UTILIDADES ───────────────────────────────────────────────

const formatearPrecio = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

const ahora = (): string => new Date().toLocaleString("es-CO");

// Retorna Zona | undefined: puede que el id no exista
const buscarZona = (id: number): Zona | undefined =>
  zonas.find((z) => z.id === id);

// Calcula disponibles; recibe Zona (no puede ser undefined)
const disponiblesEnZona = (zona: Zona): number =>
  zona.capacidad - zona.vendidas;

// ── 1. VER DISPONIBILIDAD ────────────────────────────────────
const verDisponibilidad = (): void => {
  console.log("\n════════════════════════════════════════════════════════");
  console.log("                 🏟️  ESTADIO — ZONAS                  ");
  console.log("════════════════════════════════════════════════════════");

  // map: (z: Zona): string → retorno tipado explícito
  zonas
    .map((z: Zona): string => {
      const disponibles: number = disponiblesEnZona(z);
      const estado: string = disponibles === 0 ? "⛔ AGOTADO" : `✅ ${disponibles} disp.`;
      return (
        `  [${z.id}] ${z.nombre.padEnd(22)}  ${formatearPrecio(z.precio).padStart(10)}` +
        `  │  ${estado}`
      );
    })
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════════════════════════════\n");
};

// ── 2. COMPRAR BOLETAS ───────────────────────────────────────
const comprarBoletas = (comprador: Comprador, idZona: number, cantidad: number): void => {
  const zona: Zona | undefined = buscarZona(idZona);

  // Después de esta guarda, TypeScript sabe que zona es Zona (no undefined)
  if (!zona) {
    console.log(`❌ Zona con id ${idZona} no existe.`);
    return;
  }

  const disponibles: number = disponiblesEnZona(zona);

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

  const total: number = zona.precio * cantidad;
  zona.vendidas += cantidad;
  contadorVentas++;

  const nuevaVenta: Venta = {
    idVenta:   `BOL-${String(contadorVentas).padStart(4, "0")}`,
    comprador,
    zona:      zona.nombre,    // NombreZona (garantizado por el tipo de Zona)
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

// ── 3. VER VENTAS ────────────────────────────────────────────
const verVentas = (): void => {
  if (ventas.length === 0) {
    console.log("\n📋 No se han realizado ventas aún.\n");
    return;
  }

  console.log("\n════════════════════════════════════════════════════════");
  console.log("                  📋  REGISTRO DE VENTAS               ");
  console.log("════════════════════════════════════════════════════════");

  ventas
    .map(
      (v: Venta): string =>
        `  ${v.idVenta}  │  ${v.comprador.nombre.padEnd(18)}  │  ${v.zona.padEnd(22)}` +
        `  │  x${v.cantidad}  │  ${formatearPrecio(v.total)}`
    )
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════════════════════════════\n");
};

// ── 4. REPORTE DE INGRESOS ───────────────────────────────────
const reporteIngresos = (): void => {
  if (ventas.length === 0) {
    console.log("\n💰 Sin ventas para reportar.\n");
    return;
  }

  // map → number[] → reduce → number
  const totales: number[] = ventas.map((v: Venta): number => v.total);

  const ingresoTotal: number = totales.reduce(
    (acc: number, total: number) => acc + total,
    0
  );

  const boletasTotales: number = ventas.reduce(
    (acc: number, v: Venta) => acc + v.cantidad,
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
const reportePorZona = (): void => {
  console.log("\n📊 Ventas por zona:");

  zonas.forEach((zona: Zona) => {
    // filter: conserva solo las Venta cuyo idZona coincide
    const ventasZona: Venta[] = ventas.filter((v) => v.idZona === zona.id);

    const ingresos: number = ventasZona.reduce(
      (acc: number, v: Venta) => acc + v.total,
      0
    );

    const ocupacion = `${zona.vendidas}/${zona.capacidad}`;
    console.log(
      `   ${zona.nombre.padEnd(24)}  vendidas: ${ocupacion.padEnd(8)}  ingresos: ${formatearPrecio(ingresos)}`
    );
  });
  console.log();
};

// ── 6. BUSCAR POR COMPRADOR ──────────────────────────────────
const buscarVentasPorComprador = (documento: string): void => {
  // filter: Venta[] → Venta[] filtrando por documento del comprador
  const misCompras: Venta[] = ventas.filter(
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
const devolverBoletas = (idVenta: string): void => {
  const venta: Venta | undefined = ventas.find((v) => v.idVenta === idVenta);

  if (!venta) {
    console.log(`❌ Venta ${idVenta} no encontrada.`);
    return;
  }

  // buscarZona puede retornar undefined → verificamos
  const zona: Zona | undefined = buscarZona(venta.idZona);
  if (zona) {
    zona.vendidas -= venta.cantidad;
  }

  // filter reconstruye el array sin la venta devuelta
  ventas = ventas.filter((v) => v.idVenta !== idVenta);

  console.log(`\n↩️  Devolución exitosa:`);
  console.log(`   ${venta.cantidad} boleta(s) de ${venta.zona} devuelta(s).`);
  console.log(`   Reembolso: ${formatearPrecio(venta.total)}\n`);
};

// ── MENÚ ─────────────────────────────────────────────────────
const menu = (opcion: number): void => {
  switch (opcion) {
    case 1: verDisponibilidad(); break;
    case 2: comprarBoletas({ nombre: "Ana Torres", documento: "111111" }, 1, 3); break;
    case 3: verVentas(); break;
    case 4: reporteIngresos(); break;
    case 5: reportePorZona(); break;
    case 6: buscarVentasPorComprador("111111"); break;
    case 7: devolverBoletas("BOL-0001"); break;
    default: console.log("❌ Opción no válida.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
console.log("╔══════════════════════════════════════╗");
console.log("║  SIMULACIÓN: BOLETAS PARA ESTADIO    ║");
console.log("╚══════════════════════════════════════╝\n");

console.log("--- Disponibilidad inicial ---");
verDisponibilidad();

console.log("--- Comprar boletas ---");
comprarBoletas({ nombre: "Carlos Pérez",  documento: "123456" }, 1, 5);
comprarBoletas({ nombre: "María Gómez",   documento: "789012" }, 5, 2);
comprarBoletas({ nombre: "Luis Martínez", documento: "345678" }, 3, 4);
comprarBoletas({ nombre: "Carlos Pérez",  documento: "123456" }, 5, 1);

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
