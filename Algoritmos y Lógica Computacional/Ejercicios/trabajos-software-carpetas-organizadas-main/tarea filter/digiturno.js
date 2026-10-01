// ============================================================
//  SIMULACIÓN 4 — DIGITURNO
//  Conceptos: objetos, arrays, funciones flecha,
//              filter, map, reduce, menú con switch
// ============================================================

// ── CONFIGURACIÓN DEL SISTEMA ────────────────────────────────
// Define los módulos de atención disponibles
const modulos = [
  { id: 1, nombre: "Caja 1",      disponible: true,  atiendeTipo: ["Normal", "Preferencial"] },
  { id: 2, nombre: "Caja 2",      disponible: true,  atiendeTipo: ["Normal"] },
  { id: 3, nombre: "Información", disponible: false, atiendeTipo: ["Normal", "Preferencial"] },
];

// ── COLA DE ESPERA ────────────────────────────────────────────
// Cada turno en la cola es un objeto con sus datos
let cola = [];

// ── HISTORIAL DE ATENDIDOS ────────────────────────────────────
// Guarda los turnos que ya fueron atendidos
let historialAtendidos = [];

// Contadores para generar el número de turno por tipo
let contadorNormal       = 0;
let contadorPreferencial = 0;

// ── UTILIDADES ───────────────────────────────────────────────

// Devuelve la hora actual formateada (HH:MM:SS)
const horaActual = () => new Date().toLocaleTimeString("es-CO");

// Genera el código de turno: N-001, P-001, etc.
const generarCodigoTurno = (tipo) => {
  if (tipo === "Preferencial") {
    contadorPreferencial++;
    // padStart: asegura que el número tenga siempre 3 dígitos → 001, 002...
    return `P-${String(contadorPreferencial).padStart(3, "0")}`;
  } else {
    contadorNormal++;
    return `N-${String(contadorNormal).padStart(3, "0")}`;
  }
};

// ── 1. ASIGNAR TURNO ─────────────────────────────────────────
// Recibe el nombre de la persona y el tipo de turno
// El turno se asigna según el orden de llegada (push al final)
const asignarTurno = (nombre, tipo = "Normal") => {
  // Validar que el tipo sea correcto
  if (tipo !== "Normal" && tipo !== "Preferencial") {
    console.log(`❌ Tipo de turno inválido. Use "Normal" o "Preferencial".`);
    return;
  }

  // Crear el objeto de turno
  const nuevoTurno = {
    codigo:    generarCodigoTurno(tipo),
    nombre,
    tipo,
    horaLlegada: horaActual(),
    estado:    "Esperando", // puede ser: Esperando, En atención, Atendido
  };

  // Agregar al final de la cola (orden de llegada)
  cola.push(nuevoTurno);

  // Calcular cuántas personas hay antes en la fila
  const posicion = cola.length;

  console.log(`\n🎫 Turno asignado:`);
  console.log(`   Código   : ${nuevoTurno.codigo}`);
  console.log(`   Persona  : ${nombre}`);
  console.log(`   Tipo     : ${tipo}`);
  console.log(`   Posición : ${posicion} en la fila`);
  console.log(`   Hora     : ${nuevoTurno.horaLlegada}\n`);
};

// ── 2. LLAMAR SIGUIENTE TURNO ────────────────────────────────
// Los turnos preferenciales tienen prioridad sobre los normales
const llamarSiguiente = (idModulo) => {
  const modulo = modulos.find((m) => m.id === idModulo);

  if (!modulo) {
    console.log(`❌ Módulo ${idModulo} no existe.`);
    return;
  }
  if (!modulo.disponible) {
    console.log(`❌ El módulo "${modulo.nombre}" no está disponible.`);
    return;
  }
  if (cola.length === 0) {
    console.log("⚠️  La cola está vacía. No hay personas esperando.");
    return;
  }

  // Buscar primero un turno preferencial (prioridad)
  // filter: filtra por tipo "Preferencial" y estado "Esperando"
  const preferenciales = cola.filter(
    (t) => t.tipo === "Preferencial" && t.estado === "Esperando"
  );

  // Si no hay preferenciales, buscar el siguiente normal
  const normales = cola.filter(
    (t) => t.tipo === "Normal" && t.estado === "Esperando"
  );

  // Tomar el primero de la lista correcta (el que llegó primero)
  const turnoAAtender = preferenciales.length > 0
    ? preferenciales[0]
    : normales[0];

  if (!turnoAAtender) {
    console.log("⚠️  No hay turnos en espera.");
    return;
  }

  // Cambiar el estado del turno
  turnoAAtender.estado = "En atención";

  console.log(`\n📢 ¡Turno llamado!`);
  console.log(`   ${turnoAAtender.codigo} — ${turnoAAtender.nombre}`);
  console.log(`   Diríjase al módulo: ${modulo.nombre}\n`);
};

// ── 3. FINALIZAR ATENCIÓN ────────────────────────────────────
// Marca el turno como atendido y lo mueve al historial
const finalizarAtencion = (codigoTurno) => {
  // Buscar el turno en la cola
  const turno = cola.find((t) => t.codigo === codigoTurno);

  if (!turno) {
    console.log(`❌ No se encontró el turno ${codigoTurno} en la cola.`);
    return;
  }

  // Actualizar estado y hora de atención
  turno.estado      = "Atendido";
  turno.horaFin     = horaActual();

  // Mover al historial
  historialAtendidos.push(turno);

  // Eliminar de la cola con filter
  cola = cola.filter((t) => t.codigo !== codigoTurno);

  console.log(`✅ Turno ${codigoTurno} (${turno.nombre}) — Atendido.\n`);
};

// ── 4. VER COLA ACTUAL ───────────────────────────────────────
// map: transforma cada turno en una línea de texto
const verCola = () => {
  // filter: solo los que están esperando
  const enEspera    = cola.filter((t) => t.estado === "Esperando");
  const enAtencion  = cola.filter((t) => t.estado === "En atención");

  console.log("\n════════════════════════════════════════");
  console.log("          🎫  COLA DE ESPERA           ");
  console.log("════════════════════════════════════════");
  console.log(`  Personas en espera   : ${enEspera.length}`);
  console.log(`  En atención ahora    : ${enAtencion.length}`);
  console.log(`  Total en cola        : ${cola.length}`);
  console.log("────────────────────────────────────────");

  if (cola.length === 0) {
    console.log("  (Cola vacía)");
  } else {
    // map: cada turno se convierte en una línea de la pantalla
    cola
      .map(
        (t, index) =>
          `  ${index + 1}. [${t.codigo}] ${t.nombre.padEnd(15)}  ${t.tipo.padEnd(14)}  ${t.estado}`
      )
      .forEach((linea) => console.log(linea));
  }

  console.log("════════════════════════════════════════\n");
};

// ── 5. VER HISTORIAL DE ATENDIDOS ────────────────────────────
// map y reduce para estadísticas del día
const verHistorial = () => {
  if (historialAtendidos.length === 0) {
    console.log("\n📋 Aún no se ha atendido ningún turno.\n");
    return;
  }

  console.log("\n════════════════════════════════════════");
  console.log("         📋  HISTORIAL DE ATENDIDOS     ");
  console.log("════════════════════════════════════════");

  // map: convierte cada atendido en una línea resumen
  historialAtendidos
    .map((t) => `  [${t.codigo}] ${t.nombre.padEnd(15)}  ${t.tipo}`)
    .forEach((linea) => console.log(linea));

  // reduce: cuenta cuántos de cada tipo fueron atendidos
  const totalNormal = historialAtendidos.reduce(
    (acc, t) => (t.tipo === "Normal" ? acc + 1 : acc), 0
  );
  const totalPreferencial = historialAtendidos.reduce(
    (acc, t) => (t.tipo === "Preferencial" ? acc + 1 : acc), 0
  );

  console.log("────────────────────────────────────────");
  console.log(`  Normales atendidos      : ${totalNormal}`);
  console.log(`  Preferenciales atendidos: ${totalPreferencial}`);
  console.log(`  Total atendidos         : ${historialAtendidos.length}`);
  console.log("════════════════════════════════════════\n");
};

// ── 6. CANCELAR TURNO ────────────────────────────────────────
// La persona decide retirarse de la fila
const cancelarTurno = (codigoTurno) => {
  const turno = cola.find((t) => t.codigo === codigoTurno);

  if (!turno) {
    console.log(`❌ Turno ${codigoTurno} no encontrado en la cola.`);
    return;
  }

  // filter: reconstruye la cola sin ese turno
  cola = cola.filter((t) => t.codigo !== codigoTurno);
  console.log(`🗑️  Turno ${codigoTurno} (${turno.nombre}) cancelado y retirado de la cola.\n`);
};

// ── MENÚ PRINCIPAL ───────────────────────────────────────────
const menu = (opcion) => {
  switch (opcion) {
    case 1:
      // asignarTurno(nombre, tipo)
      asignarTurno("Juan Pérez", "Normal");
      break;
    case 2:
      asignarTurno("Doña Rosa", "Preferencial");
      break;
    case 3:
      verCola();
      break;
    case 4:
      // llamarSiguiente(idModulo)
      llamarSiguiente(1);
      break;
    case 5:
      // finalizarAtencion(codigoTurno)
      finalizarAtencion("P-001");
      break;
    case 6:
      verHistorial();
      break;
    case 7:
      // cancelarTurno(codigoTurno)
      cancelarTurno("N-001");
      break;
    default:
      console.log("❌ Opción no válida.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
console.log("╔══════════════════════════════════╗");
console.log("║      SIMULACIÓN: DIGITURNO       ║");
console.log("╚══════════════════════════════════╝\n");

console.log("--- Asignar turnos (orden de llegada) ---");
asignarTurno("Carlos Mora",    "Normal");
asignarTurno("Elena Vargas",   "Normal");
asignarTurno("Abuela Rosa",    "Preferencial"); // ← tiene prioridad
asignarTurno("Pedro Salcedo",  "Normal");
asignarTurno("Señor en silla", "Preferencial");

console.log("--- Ver cola actual ---");
verCola();

console.log("--- Llamar siguiente (debe llamar preferencial primero) ---");
llamarSiguiente(1);

console.log("--- Finalizar atención del preferencial ---");
finalizarAtencion("P-001");

console.log("--- Llamar siguiente (segundo preferencial) ---");
llamarSiguiente(1);

console.log("--- Ver cola actualizada ---");
verCola();

console.log("--- Carlos se retira de la cola ---");
cancelarTurno("N-001");

console.log("--- Ver historial de atendidos ---");
verHistorial();