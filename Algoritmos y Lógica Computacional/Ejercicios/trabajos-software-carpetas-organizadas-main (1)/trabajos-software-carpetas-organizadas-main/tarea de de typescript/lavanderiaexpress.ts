/**
 * LAVANDERÍA EXPRESS — REGISTRO DE CLIENTES
 *
 * Este programa calcula el costo del servicio de lavandería para cada cliente
 * según las horas de alquiler de la máquina. Aplica un descuento especial del
 * 30 % cuando el tiempo supera las 12 horas.
 *
 * Tarifas:
 *  - Tarifa base   : $5.000 por hora.
 *  - Descuento     : 30 % sobre el total si el cliente supera 12 horas.
 *
 * Al finalizar muestra un resumen con el ingreso total del día y la cantidad
 * de clientes que recibieron descuento.
 * /

// ── Tipos ─────────────────────────────────────────────────────────────────────

/** Representa a un cliente con su nombre y las horas de alquiler. */
interface Cliente {
  nombre: string;
  horas: number;
}

// ── Datos ─────────────────────────────────────────────────────────────────────

/** Lista de clientes atendidos durante el día. */
const clientes: Cliente[] = [
  { nombre: "María López",    horas: 15 },
  { nombre: "Carlos Pérez",   horas: 8  },
  { nombre: "Ana Gómez",      horas: 13 },
  { nombre: "Luis Martínez",  horas: 5  },
  { nombre: "Sandra Ríos",    horas: 20 },
];

// ── Constantes ────────────────────────────────────────────────────────────────

/** Tarifa cobrada por cada hora de uso de la máquina (en pesos colombianos). */
const costoPorHora: number     = 5000;

/** Umbral de horas a partir del cual se aplica el descuento. */
const LIMITE_DESCUENTO: number = 12;

/** Porcentaje de descuento aplicado cuando se supera el límite (30 %). */
const PORCENTAJE_DESC: number  = 0.30;

// ── Acumuladores ─────────────────────────────────────────────────────────────

/** Suma de todos los pagos efectuados por los clientes en el día. */
let acumuladorIngresos: number = 0;

/** Número de clientes que superaron el límite y obtuvieron descuento. */
let contadorDescuentos: number = 0;

/** Número total de clientes en la lista. */
const cantidadClientes: number = clientes.length;

// ── Encabezado ────────────────────────────────────────────────────────────────
console.log("========================================");
console.log("       LAVANDERÍA EXPRESS — REGISTRO    ");
console.log("========================================");

// ── Ciclo for: procesa a cada cliente de la lista ─────────────────────────────
for (let i = 0; i < cantidadClientes; i++) {

  const nombreCliente: string = clientes[i].nombre;
  const horasAlquiler: number = clientes[i].horas;

  /** Costo base antes de aplicar cualquier descuento. */
  let costoTotal: number = horasAlquiler * costoPorHora;

  /** Valor monetario del descuento (0 si no aplica). */
  let descuento: number  = 0;

  /** Monto final que el cliente debe pagar después del descuento. */
  let totalPagar: number = costoTotal;

  // Aplica el descuento si el cliente supera el límite de horas
  if (horasAlquiler > LIMITE_DESCUENTO) {
    descuento  = costoTotal * PORCENTAJE_DESC;
    totalPagar = costoTotal - descuento;
    contadorDescuentos++;
  }

  /** Etiqueta visual que indica si el cliente recibió descuento o no. */
  const etiqueta: string = horasAlquiler > LIMITE_DESCUENTO ? "✅ CON DESCUENTO" : "❌ SIN DESCUENTO";

  // Imprime el detalle de cada cliente
  console.log(`\n--- CLIENTE ${i + 1}: ${nombreCliente} ---`);
  console.log(`  Horas alquiladas : ${horasAlquiler}`);
  console.log(`  Subtotal         : $${costoTotal.toLocaleString("es-CO")}`);
  if (descuento > 0) {
    // Solo muestra la línea de descuento si aplica
    console.log(`  Descuento (30%)  : $${descuento.toLocaleString("es-CO")}`);
  }
  console.log(`  ${etiqueta}`);
  console.log(`  Total a pagar    : $${totalPagar.toLocaleString("es-CO")}`);

  // Acumula el ingreso real (ya con descuento aplicado)
  acumuladorIngresos += totalPagar;
}

// ── Resumen del día ───────────────────────────────────────────────────────────
console.log("\n========================================");
console.log("           === RESUMEN DEL DÍA ===      ");
console.log("========================================");
console.log(`  Clientes atendidos   : ${cantidadClientes}`);
console.log(`  Ingreso total        : $${acumuladorIngresos.toLocaleString("es-CO")}`);
console.log(`  Clientes con descuento: ${contadorDescuentos}`);
console.log("========================================");