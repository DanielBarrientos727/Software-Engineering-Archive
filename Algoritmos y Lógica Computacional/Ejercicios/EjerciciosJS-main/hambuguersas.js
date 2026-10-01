// ============================================================
// EJERCICIO 2 — Burger Palace: Sistema de Pedidos
// Algoritmos y Lógica Computacional — SENA
// ============================================================

// Pedidos simulados: cada objeto representa una selección del usuario
// opcion 4 = finalizar pedido
const pedidosSimulados = [
  { opcion: 2, cantidad: 3 },  // Doble Poder x3
  { opcion: 1, cantidad: 2 },  // Clásica x2
  { opcion: 3, cantidad: 1 },  // Mega Fest x1
  { opcion: 4, cantidad: 0 },  // Finalizar
];

// Variables principales
let totalCuenta    = 0;
let totalCombos    = 0;
let contadorCombo1 = 0;
let contadorCombo2 = 0;
let contadorCombo3 = 0;
let indicePedido   = 0;
let opcion         = 0;

// Menú
console.log("====== BURGER PALACE ======");
console.log("  1. Clásica        — $15.000");
console.log("  2. Doble Poder    — $22.000");
console.log("  3. Mega Fest      — $35.000");
console.log("  4. Finalizar pedido");
console.log("===========================\n");

// Ciclo do...while: se repite hasta que el usuario elija opción 4
do {
  opcion = pedidosSimulados[indicePedido].opcion;
  const cantidadCombo = pedidosSimulados[indicePedido].cantidad;
  indicePedido++;

  let precioCombo  = 0;
  let nombreCombo  = "";
  let subtotal     = 0;

  // if/else if/else: asignar precio según combo
  if (opcion === 1) {
    precioCombo = 15000;
    nombreCombo = "Clásica";
    contadorCombo1 += cantidadCombo;
  } else if (opcion === 2) {
    precioCombo = 22000;
    nombreCombo = "Doble Poder";
    contadorCombo2 += cantidadCombo;
  } else if (opcion === 3) {
    precioCombo = 35000;
    nombreCombo = "Mega Fest";
    contadorCombo3 += cantidadCombo;
  } else if (opcion === 4) {
    // Finalizar pedido — salir del ciclo
    break;
  } else {
    console.log("⚠ Opción no válida. Intente de nuevo.\n");
    continue;
  }

  // Cálculo del subtotal
  subtotal     = precioCombo * cantidadCombo;
  totalCuenta += subtotal;
  totalCombos += cantidadCombo;

  console.log(`Seleccione combo : ${opcion} — ${nombreCombo}`);
  console.log(`Cantidad         : ${cantidadCombo}`);
  console.log(`Subtotal         : $${subtotal.toLocaleString("es-CO")}`);
  console.log(`Total acumulado  : $${totalCuenta.toLocaleString("es-CO")}`);
  console.log();

} while (opcion !== 4);

// Cuenta final
console.log("=== CUENTA FINAL ===");
console.log(`  Combos Clásica     : ${contadorCombo1}`);
console.log(`  Combos Doble Poder : ${contadorCombo2}`);
console.log(`  Combos Mega Fest   : ${contadorCombo3}`);
console.log(`  Total combos       : ${totalCombos}`);
console.log(`  TOTAL A PAGAR      : $${totalCuenta.toLocaleString("es-CO")}`);