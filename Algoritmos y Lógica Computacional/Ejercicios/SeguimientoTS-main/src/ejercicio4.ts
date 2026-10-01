// ============================================================
//  EJERCICIO 4 — DIGITURNO — TypeScript
//
//  Conceptos clave:
//  - union de literales: TipoTurno y EstadoTurno
//  - readonly en ids para prevenir cambios accidentales
//  - horaFin opcional (?:) — solo existe al finalizar
//  - Turno | undefined: buscar puede no encontrar nada
// ============================================================

// ── TIPOS ────────────────────────────────────────────────────

type TipoTurno   = "Normal" | "Preferencial";
type EstadoTurno = "Esperando" | "En atención" | "Atendido";

// ── INTERFACES ───────────────────────────────────────────────

interface Modulo {
  readonly id: number;
  nombre:      string;
  disponible:  boolean;
}

interface Turno {
  readonly codigo: string;
  nombre:          string;
  tipo:            TipoTurno;
  horaLlegada:     string;
  estado:          EstadoTurno;
  horaFin?:        string;        // opcional: solo existe al finalizar
}

// ── DATOS INICIALES ──────────────────────────────────────────

const modulos: Modulo[] = [
  { id: 1, nombre: "Caja 1",      disponible: true  },
  { id: 2, nombre: "Caja 2",      disponible: true  },
  { id: 3, nombre: "Información", disponible: false },
];

let cola:               Turno[] = [];
let historialAtendidos: Turno[] = [];
let contadorNormal       = 0;
let contadorPreferencial = 0;

// ── UTILIDADES ───────────────────────────────────────────────

const horaActual = (): string => new Date().toLocaleTimeString("es-CO");

const generarCodigoTurno = (tipo: TipoTurno): string => {
  if (tipo === "Preferencial") return `P-${String(++contadorPreferencial).padStart(3, "0")}`;
  return `N-${String(++contadorNormal).padStart(3, "0")}`;
};

// ── FUNCIONES ────────────────────────────────────────────────

const asignarTurno = (nombre: string, tipo: TipoTurno = "Normal"): void => {
  const nuevoTurno: Turno = {
    codigo:      generarCodigoTurno(tipo),
    nombre,
    tipo,
    horaLlegada: horaActual(),
    estado:      "Esperando",
  };
  cola.push(nuevoTurno);
  console.log(`\n🎫 Turno asignado:`);
  console.log(`   Código   : ${nuevoTurno.codigo}`);
  console.log(`   Persona  : ${nombre}`);
  console.log(`   Tipo     : ${tipo}`);
  console.log(`   Posición : ${cola.length} en la fila`);
  console.log(`   Hora     : ${nuevoTurno.horaLlegada}\n`);
};

const llamarSiguiente = (idModulo: number): void => {
  const modulo = modulos.find((m) => m.id === idModulo);
  if (!modulo)           { console.log(`❌ Módulo ${idModulo} no existe.`); return; }
  if (!modulo.disponible){ console.log(`❌ El módulo "${modulo.nombre}" no está disponible.`); return; }
  if (cola.length === 0) { console.log("⚠️  La cola está vacía."); return; }

  const preferenciales = cola.filter((t) => t.tipo === "Preferencial" && t.estado === "Esperando");
  const normales       = cola.filter((t) => t.tipo === "Normal"       && t.estado === "Esperando");
  const turno          = preferenciales.length > 0 ? preferenciales[0] : normales[0];

  if (!turno) { console.log("⚠️  No hay turnos en espera."); return; }

  turno.estado = "En atención";
  console.log(`\n📢 ¡Turno llamado!`);
  console.log(`   ${turno.codigo} — ${turno.nombre}`);
  console.log(`   Diríjase al módulo: ${modulo.nombre}\n`);
};

const finalizarAtencion = (codigoTurno: string): void => {
  const turno = cola.find((t) => t.codigo === codigoTurno);
  if (!turno) { console.log(`❌ No se encontró el turno ${codigoTurno} en la cola.`); return; }
  turno.estado  = "Atendido";
  turno.horaFin = horaActual();
  historialAtendidos.push(turno);
  cola = cola.filter((t) => t.codigo !== codigoTurno);
  console.log(`✅ Turno ${codigoTurno} (${turno.nombre}) — Atendido.\n`);
};

const verCola = (): void => {
  const enEspera   = cola.filter((t) => t.estado === "Esperando");
  const enAtencion = cola.filter((t) => t.estado === "En atención");
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
    cola
      .map((t, i) => `  ${i + 1}. [${t.codigo}] ${t.nombre.padEnd(15)}  ${t.tipo.padEnd(14)}  ${t.estado}`)
      .forEach((linea) => console.log(linea));
  }
  console.log("════════════════════════════════════════\n");
};

const verHistorial = (): void => {
  if (historialAtendidos.length === 0) { console.log("\n📋 Aún no se ha atendido ningún turno.\n"); return; }
  console.log("\n════════════════════════════════════════");
  console.log("         📋  HISTORIAL DE ATENDIDOS     ");
  console.log("════════════════════════════════════════");
  historialAtendidos
    .map((t) => `  [${t.codigo}] ${t.nombre.padEnd(15)}  ${t.tipo}`)
    .forEach((linea) => console.log(linea));
  const totalNormal        = historialAtendidos.filter((t) => t.tipo === "Normal").length;
  const totalPreferencial  = historialAtendidos.filter((t) => t.tipo === "Preferencial").length;
  console.log("────────────────────────────────────────");
  console.log(`  Normales atendidos      : ${totalNormal}`);
  console.log(`  Preferenciales atendidos: ${totalPreferencial}`);
  console.log(`  Total atendidos         : ${historialAtendidos.length}`);
  console.log("════════════════════════════════════════\n");
};

const cancelarTurno = (codigoTurno: string): void => {
  const turno = cola.find((t) => t.codigo === codigoTurno);
  if (!turno) { console.log(`❌ Turno ${codigoTurno} no encontrado en la cola.`); return; }
  cola = cola.filter((t) => t.codigo !== codigoTurno);
  console.log(`🗑️  Turno ${codigoTurno} (${turno.nombre}) cancelado.\n`);
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────

console.log("╔══════════════════════════════════╗");
console.log("║      SIMULACIÓN: DIGITURNO       ║");
console.log("╚══════════════════════════════════╝\n");

console.log("--- Asignar turnos ---");
asignarTurno("Carlos Mora",    "Normal");
asignarTurno("Elena Vargas",   "Normal");
asignarTurno("Abuela Rosa",    "Preferencial");
asignarTurno("Pedro Salcedo",  "Normal");
asignarTurno("Señor en silla", "Preferencial");

console.log("--- Ver cola actual ---");
verCola();

console.log("--- Llamar siguiente (preferencial primero) ---");
llamarSiguiente(1);

console.log("--- Finalizar atención del preferencial ---");
finalizarAtencion("P-001");

console.log("--- Llamar siguiente ---");
llamarSiguiente(1);

console.log("--- Ver cola actualizada ---");
verCola();

console.log("--- Carlos se retira de la cola ---");
cancelarTurno("N-001");

console.log("--- Ver historial ---");
verHistorial();