// ============================================================
//  SIMULACIÓN 1 — SISTEMA DE RESERVA DE HOTEL
//  Conceptos: objetos, arrays, funciones flecha,
//              filter, map, reduce, menú con switch
// ============================================================

// ── HABITACIONES DEL HOTEL ───────────────────────────────────
// Cada habitación tiene: id, tipo, camas, precioPorNoche, disponible
const habitaciones = [
  { id: 101, tipo: "Individual", camas: 1, precioPorNoche: 80000,  disponible: true },
  { id: 102, tipo: "Individual", camas: 1, precioPorNoche: 80000,  disponible: true },
  { id: 201, tipo: "Doble",      camas: 2, precioPorNoche: 130000, disponible: true },
  { id: 202, tipo: "Doble",      camas: 2, precioPorNoche: 130000, disponible: false },
  { id: 301, tipo: "Suite",      camas: 3, precioPorNoche: 250000, disponible: true },
  { id: 302, tipo: "Suite",      camas: 3, precioPorNoche: 250000, disponible: true },
];

// ── LISTA DE RESERVAS (empieza vacía) ────────────────────────
// Cada reserva tendrá: numeroReserva, cliente, habitacion, noches, total
let reservas = [];

// Contador para generar números de reserva únicos
let contadorReservas = 1000;

// ── UTILIDADES ───────────────────────────────────────────────

// Genera un número de reserva único cada vez que se llama
const generarNumeroReserva = () => {
  contadorReservas++;
  return `RES-${contadorReservas}`;
};

// Formatea valores como pesos colombianos
const formatearPrecio = (valor) =>
  `$${valor.toLocaleString("es-CO")}`;

// Busca una habitación por su id
const buscarHabitacion = (id) =>
  habitaciones.find((h) => h.id === id);

// Busca una reserva por su número de reserva
const buscarReserva = (numeroReserva) =>
  reservas.find((r) => r.numeroReserva === numeroReserva);

// ── 1. VER HABITACIONES DISPONIBLES ─────────────────────────
// filter: conserva solo las habitaciones donde disponible === true
const verDisponibles = () => {
  // filter devuelve un nuevo array con las habitaciones que pasen la condición
  const disponibles = habitaciones.filter((h) => h.disponible === true);

  if (disponibles.length === 0) {
    console.log("\n❌ No hay habitaciones disponibles en este momento.");
    return;
  }

  console.log("\n════════════════════════════════════════");
  console.log("       🏨  HABITACIONES DISPONIBLES      ");
  console.log("════════════════════════════════════════");

  // map: transforma cada habitación en una línea de texto
  disponibles
    .map(
      (h) =>
        `  Hab. ${h.id}  │  ${h.tipo.padEnd(10)}  │  ${h.camas} cama(s)  │  ${formatearPrecio(h.precioPorNoche)}/noche`
    )
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════════════\n");
};

// ── 2. CREAR UNA RESERVA ─────────────────────────────────────
// Recibe: objeto cliente, id de habitación y número de noches
const crearReserva = (cliente, idHabitacion, noches) => {
  const habitacion = buscarHabitacion(idHabitacion);

  // Validaciones antes de crear la reserva
  if (!habitacion) {
    console.log(`❌ La habitación ${idHabitacion} no existe.`);
    return;
  }
  if (!habitacion.disponible) {
    console.log(`❌ La habitación ${idHabitacion} no está disponible.`);
    return;
  }
  if (noches <= 0) {
    console.log("❌ El número de noches debe ser mayor a 0.");
    return;
  }

  // Calcular el costo total de la estadía
  const total = habitacion.precioPorNoche * noches;

  // Construir el objeto de reserva
  const nuevaReserva = {
    numeroReserva: generarNumeroReserva(),
    cliente,                // objeto con nombre, documento, etc.
    habitacion,             // referencia al objeto habitación
    noches,
    total,
  };

  // Agregar la reserva al array de reservas
  reservas.push(nuevaReserva);

  // Marcar la habitación como NO disponible
  habitacion.disponible = false;

  console.log(`\n✅ Reserva creada exitosamente:`);
  console.log(`   N° Reserva : ${nuevaReserva.numeroReserva}`);
  console.log(`   Cliente    : ${cliente.nombre}`);
  console.log(`   Habitación : ${habitacion.id} (${habitacion.tipo})`);
  console.log(`   Noches     : ${noches}`);
  console.log(`   Total      : ${formatearPrecio(total)}\n`);
};

// ── 3. CANCELAR UNA RESERVA ──────────────────────────────────
// filter: reconstruye el array sin la reserva cancelada
const cancelarReserva = (numeroReserva) => {
  const reserva = buscarReserva(numeroReserva);

  if (!reserva) {
    console.log(`❌ No existe una reserva con el número ${numeroReserva}.`);
    return;
  }

  // Volver a marcar la habitación como disponible
  reserva.habitacion.disponible = true;

  // filter: crea un nuevo array excluyendo la reserva cancelada
  reservas = reservas.filter((r) => r.numeroReserva !== numeroReserva);

  console.log(`\n🗑️  Reserva ${numeroReserva} cancelada. Habitación ${reserva.habitacion.id} disponible nuevamente.\n`);
};

// ── 4. VER TODAS LAS RESERVAS ────────────────────────────────
// map: convierte cada reserva en una línea de resumen
const verReservas = () => {
  if (reservas.length === 0) {
    console.log("\n📋 No hay reservas registradas.\n");
    return;
  }

  console.log("\n════════════════════════════════════════");
  console.log("         📋  RESERVAS ACTIVAS           ");
  console.log("════════════════════════════════════════");

  // map transforma cada reserva en texto legible
  reservas
    .map(
      (r) =>
        `  ${r.numeroReserva}  │  ${r.cliente.nombre.padEnd(15)}  │  Hab.${r.habitacion.id}  │  ${r.noches} noche(s)  │  ${formatearPrecio(r.total)}`
    )
    .forEach((linea) => console.log(linea));

  console.log("════════════════════════════════════════\n");
};

// ── 5. FILTRAR RESERVAS POR TIPO DE HABITACIÓN ───────────────
// filter: selecciona solo las reservas del tipo especificado
const filtrarPorTipo = (tipo) => {
  // filter: compara (ignorando mayúsculas) el tipo de cada habitación reservada
  const resultado = reservas.filter(
    (r) => r.habitacion.tipo.toLowerCase() === tipo.toLowerCase()
  );

  if (resultado.length === 0) {
    console.log(`\n🔍 No hay reservas de tipo "${tipo}".\n`);
    return;
  }

  console.log(`\n🔍 Reservas de habitación "${tipo}":`);
  resultado.forEach((r) =>
    console.log(`   ${r.numeroReserva}  →  ${r.cliente.nombre}  (${r.noches} noche(s))`)
  );
  console.log();
};

// ── 6. RESUMEN DE INGRESOS ────────────────────────────────────
// map + reduce: primero extrae los totales y luego los suma
const resumenIngresos = () => {
  if (reservas.length === 0) {
    console.log("\n💰 No hay reservas para calcular ingresos.\n");
    return;
  }

  // map: extrae solo el valor 'total' de cada reserva → [total1, total2, ...]
  const totales = reservas.map((r) => r.total);

  // reduce: suma todos los valores del array de totales
  const ingresoTotal = totales.reduce(
    (acumulado, total) => acumulado + total,
    0  // empieza a contar desde 0
  );

  console.log(`\n💰 Total de reservas activas : ${reservas.length}`);
  console.log(`   Ingresos acumulados       : ${formatearPrecio(ingresoTotal)}\n`);
};

// ── 7. RESUMEN POR TIPO DE HABITACIÓN ────────────────────────
// Combina filter y reduce para obtener ingresos por categoría
const resumenPorTipo = () => {
  // Obtener los tipos únicos de habitaciones que tienen reservas
  const tipos = [...new Set(reservas.map((r) => r.habitacion.tipo))];

  console.log("\n📊 Ingresos por tipo de habitación:");

  tipos.forEach((tipo) => {
    // filter: aisla las reservas de este tipo
    const reservasTipo = reservas.filter((r) => r.habitacion.tipo === tipo);

    // reduce: suma los ingresos de ese tipo
    const subtotal = reservasTipo.reduce((acc, r) => acc + r.total, 0);

    console.log(`   ${tipo.padEnd(12)} →  ${reservasTipo.length} reserva(s)  →  ${formatearPrecio(subtotal)}`);
  });
  console.log();
};

// ── MENÚ PRINCIPAL ───────────────────────────────────────────
const menu = (opcion) => {
  switch (opcion) {
    case 1:
      verDisponibles();
      break;
    case 2:
      // crearReserva(cliente, idHabitacion, noches)
      crearReserva({ nombre: "Carlos Pérez", documento: "123456" }, 201, 3);
      break;
    case 3:
      // cancelarReserva(numeroReserva)
      cancelarReserva("RES-1001");
      break;
    case 4:
      verReservas();
      break;
    case 5:
      resumenIngresos();
      break;
    case 6:
      filtrarPorTipo("Suite");
      break;
    case 7:
      resumenPorTipo();
      break;
    default:
      console.log("❌ Opción no válida.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
console.log("╔══════════════════════════════════════╗");
console.log("║   SIMULACIÓN: SISTEMA RESERVA HOTEL  ║");
console.log("╚══════════════════════════════════════╝\n");

console.log("--- Habitaciones disponibles ---");
verDisponibles();

console.log("--- Crear reservas ---");
crearReserva({ nombre: "Ana Torres",    documento: "111111" }, 101, 2);
crearReserva({ nombre: "Luis Gómez",    documento: "222222" }, 201, 4);
crearReserva({ nombre: "María Ruiz",    documento: "333333" }, 301, 1);
crearReserva({ nombre: "Pedro Salcedo", documento: "444444" }, 301, 3); // ← ya ocupada

console.log("--- Ver todas las reservas ---");
verReservas();

console.log("--- Habitaciones disponibles después de reservas ---");
verDisponibles();

console.log("--- Resumen de ingresos ---");
resumenIngresos();

console.log("--- Cancelar reserva RES-1001 ---");
cancelarReserva("RES-1001");

console.log("--- Reservas tras cancelación ---");
verReservas();

console.log("--- Filtrar por tipo Suite ---");
filtrarPorTipo("Suite");

console.log("--- Ingresos por tipo de habitación ---");
resumenPorTipo();