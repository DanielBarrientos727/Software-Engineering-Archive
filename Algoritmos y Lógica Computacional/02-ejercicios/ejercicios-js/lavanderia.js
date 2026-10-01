// ============================================================
// EJERCICIO 1 — Lavandería Express: Alquiler de Lavadoras
// Algoritmos y Lógica Computacional — SENA
// ============================================================

// Datos simulados de clientes (nombre, horasAlquiler)
const clientesData = [
  { nombre: "María López",    horasAlquiler: 15 },
  { nombre: "Carlos Pérez",   horasAlquiler: 8  },
  { nombre: "Ana Gómez",      horasAlquiler: 20 },
  { nombre: "Luis Martínez",  horasAlquiler: 5  },
  { nombre: "Sandra Torres",  horasAlquiler: 13 },
];

// Variables principales
const costoPorHora       = 5000;
const cantidadClientes   = clientesData.length;
let acumuladorIngresos   = 0;
let contadorDescuentos   = 0;

console.log("========================================");
console.log("    LAVANDERÍA EXPRESS — REGISTRO DÍA   ");
console.log("========================================\n");

// Ciclo for: itera por cada cliente
for (let i = 0; i < cantidadClientes; i++) {
  const nombreCliente  = clientesData[i].nombre;
  const horasAlquiler  = clientesData[i].horasAlquiler;

  // Cálculo del costo base
  let costoTotal = horasAlquiler * costoPorHora;
  let descuento  = 0;
  let totalPagar = costoTotal;

  // if/else: descuento del 30% si horas > 12
  if (horasAlquiler > 12) {
    descuento  = costoTotal * 0.30;
    totalPagar = costoTotal - descuento;
    contadorDescuentos++;
  }

  // Operador ternario: etiqueta de descuento
  const etiqueta = horasAlquiler > 12 ? "CON DESCUENTO" : "SIN DESCUENTO";

  // Acumulador de ingresos
  acumuladorIngresos += totalPagar;

  // Salida por cliente
  console.log(`--- CLIENTE ${i + 1}: ${nombreCliente} ---`);
  console.log(`  Horas alquiladas : ${horasAlquiler}`);
  console.log(`  Subtotal         : $${costoTotal.toLocaleString("es-CO")}`);
  if (horasAlquiler > 12) {
    console.log(`  Descuento (30%)  : $${descuento.toLocaleString("es-CO")} — ${etiqueta}`);
  } else {
    console.log(`  Descuento        : $0 — ${etiqueta}`);
  }
  console.log(`  Total a pagar    : $${totalPagar.toLocaleString("es-CO")}`);
  console.log();
}

// Resumen del día
console.log("=== RESUMEN DEL DÍA ===");
console.log(`  Clientes atendidos   : ${cantidadClientes}`);
console.log(`  Ingreso total        : $${acumuladorIngresos.toLocaleString("es-CO")}`);
console.log(`  Clientes con descuento: ${contadorDescuentos}`);