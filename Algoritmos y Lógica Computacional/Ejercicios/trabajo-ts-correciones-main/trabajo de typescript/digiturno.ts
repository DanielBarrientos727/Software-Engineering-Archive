// ============================================================
//  SIMULACIÓN 4 — DIGITURNO — TypeScript
//
//  🔑 CAMBIOS CLAVE vs JavaScript:
//  - TipoTurno y EstadoTurno: union de literales (solo valores válidos)
//  - TipoAtencion: define qué tipos puede atender cada módulo
//  - Turno con horaFin opcional (?: significa que puede no existir aún)
//  - readonly en ids para prevenir cambios accidentales
// ============================================================

// ── TIPOS CON UNIONES DE LITERALES ──────────────────────────

// Solo "Normal" o "Preferencial" son valores válidos de turno
type TipoTurno = "Normal" | "Preferencial";

// El estado avanza en este orden: Esperando → En atención → Atendido
type EstadoTurno = "Esperando" | "En atención" | "Atendido";

// ── INTERFACES ───────────────────────────────────────────────

interface Modulo {
  readonly id:    number;
  nombre:         string;
  disponible:     boolean;
  atiendeTipo:    TipoTurno[];     // array de tipos que puede atender
}

interface Turno {
  readonly codigo: string;         // ej: "N-001", "P-002"
  nombre:          string;
  tipo:            TipoTurno;
  horaLlegada:     string;
  estado:          EstadoTurno;
  horaFin?:        string;         // ?: opcional → solo existe al finalizar
}

// ── DATOS INICIALES ──────────────────────────────────────────

const modulos: Modulo[] = [
  { id: 1, nombre: "Caja 1",      disponible: true,  atiendeTipo: ["Normal", "Preferencial"] },
  { id: 2, nombre: "Caja 2",      disponible: true,  atiendeTipo: ["Normal"]                 },
  { id: 3, nombre: "Información", disponible: false, atiendeTipo: ["Normal", "Preferencial"] },
];

let cola: Turno[] = [];
let historialAtendidos: Turno[] = [];

let contadorNormal:       number = 0;
let contadorPreferencial: number = 0;

// ── UTILIDADES ───────────────────────────────────────────────

const horaActual = (): string => new Date().toLocaleTimeString("es-CO");

// El parámetro tipo es TipoTurno, no cualquier string
const generarCodigoTurno = (tipo: TipoTurno): string => {
  if (tipo === "Preferencial") {
    contadorPreferencial++;
    return `P-${String(contadorPreferencial).padStart(3, "0")}`;
  } else {
    contadorNormal++;
    return `N-${String(contadorNormal).padStart(3, "0")}`;
  }
};

// ── 1. ASIGNAR TURNO ─────────────────────────────────────────
const asignarTurno = (nombre: string, tipo: TipoTurno = "Normal"): void => {
  // TypeScript garantiza que tipo es "Normal" | "Preferencial"
  // La validación manual del JS ya no es necesaria aquí,
  // pero la mantenemos para errores en tiempo de ejecución si llega
  // un valor inesperado (ej: desde una API externa).
  if (tipo !== "Normal" && tipo !== "Preferencial") {
    console.log(`❌ Tipo de turno inválido.`);
    return;
  }

  const nuevoTurno: Turno = {
    codigo:      generarCodigoTurno(tipo),
    nombre,
    tipo,
    horaLlegada: horaActual(),
    estado:      "Esperando",
    // horaFin no se asigna aquí → es undefined (campo opcional)
  };

  cola.push(nuevoTurno);

  console.log(`\n🎫 Turno asignado:`);
  console.log(`   Código   : ${nuevoTurno.codigo}`);
  console.log(`   Persona  : ${nombre}`);
  console.log(`   Tipo     : ${tipo}`);
  console.log(`   Posición : ${cola.length} en la fila`);
  console.log(`   Hora     : ${nuevoTurno.horaLlegada}\n`);
};

// ── 2. LLAMAR SIGUIENTE ──────────────────────────────────────
const llamarSiguiente = (idModulo: number): void => {
  // find retorna Modulo | undefined
  const modulo: Modulo | undefined = modulos.find((m) => m.id === idModulo);

  if (!modulo) {
    console.log(`❌ Módulo ${idModulo} no existe.`);
    return;
  }
  if (!modulo.disponible) {
    console.log(`❌ El módulo "${modulo.nombre}" no está disponible.`);
    return;
  }
  if (cola.length === 0) {
    console.log("⚠️  La cola está vacía.");
    return;
  }

  // filter retorna Turno[] con los preferenciales en espera
  const preferenciales: Turno[] = cola.filter(
    (t) => t.tipo === "Preferencial" && t.estado === "Esperando"
  );

  const normales: Turno[] = cola.filter(
    (t) => t.tipo === "Normal" && t.estado === "Esperando"
  );

  // Turno | undefined: puede que no haya ninguno
  const turnoAAtender: Turno | undefined =
    preferenciales.length > 0 ? preferenciales[0] : normales[0];

  if (!turnoAAtender) {
    console.log("⚠️  No hay turnos en espera.");
    return;
  }

  // EstadoTurno garantiza que solo podemos asignar valores válidos
  turnoAAtender.estado = "En atención";

  console.log(`\n📢 ¡Turno llamado!`);
  console.log(`   ${turnoAAtender.codigo} — ${turnoAAtender.nombre}`);
  console.log(`   Diríjase al módulo: ${modulo.nombre}\n`);
};

// ── 3. FINALIZAR ATENCIÓN ────────────────────────────────────
const finalizarAtencion = (codigoTurno: string): void => {
  const turno: Turno | undefined = cola.find((t) => t.codigo === codigoTurno);

  if (!turno) {
    console.log(`❌ No se encontró el turno ${codigoTurno} en la cola.`);
    return;
  }

  turno.estado  = "Atendido";
  turno.horaFin = horaActual();    // ahora asignamos el campo opcional

  historialAtendidos.push(turno);
  cola = cola.filter((t) => t.codigo !== codigoTurno);

  console.log(`✅ Turno ${codigoTurno} (${turno.nombre}) — Atendido.\n`);
};

// ── 4. VER COLA ──────────────────────────────────────────────
const verCola = (): void => {
  const enEspera:   Turno[] = cola.filter((t) => t.estado === "Esperando");
  const enAtencion: Turno[] = cola.filter((t) => t.estado === "En atención");

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
    // map recibe (t: Turno, index: number): string
    cola
      .map(
        (t: Turno, index: number): string =>
          `  ${index + 1}. [${t.codigo}] ${t.nombre.padEnd(15)}  ${t.tipo.padEnd(14)}  ${t.estado}`
      )
      .forEach((linea) => console.log(linea));
  }

  console.log("════════════════════════════════════════\n");
};

// ── 5. VER HISTORIAL ─────────────────────────────────────────
const verHistorial = (): void => {
  if (historialAtendidos.length === 0) {
    console.log("\n📋 Aún no se ha atendido ningún turno.\n");
    return;
  }

  console.log("\n════════════════════════════════════════");
  console.log("         📋  HISTORIAL DE ATENDIDOS     ");
  console.log("════════════════════════════════════════");

  historialAtendidos
    .map((t): string => `  [${t.codigo}] ${t.nombre.padEnd(15)}  ${t.tipo}`)
    .forEach((linea) => console.log(linea));

  // reduce con tipo explícito en acumulador
  const totalNormal: number = historialAtendidos.reduce(
    (acc: number, t: Turno) => (t.tipo === "Normal" ? acc + 1 : acc),
    0
  );
  const totalPreferencial: number = historialAtendidos.reduce(
    (acc: number, t: Turno) => (t.tipo === "Preferencial" ? acc + 1 : acc),
    0
  );

  console.log("────────────────────────────────────────");
  console.log(`  Normales atendidos      : ${totalNormal}`);
  console.log(`  Preferenciales atendidos: ${totalPreferencial}`);
  console.log(`  Total atendidos         : ${historialAtendidos.length}`);
  console.log("════════════════════════════════════════\n");
};

// ── 6. CANCELAR TURNO ────────────────────────────────────────
const cancelarTurno = (codigoTurno: string): void => {
  const turno: Turno | undefined = cola.find((t) => t.codigo === codigoTurno);

  if (!turno) {
    console.log(`❌ Turno ${codigoTurno} no encontrado en la cola.`);
    return;
  }

  cola = cola.filter((t) => t.codigo !== codigoTurno);
  console.log(`🗑️  Turno ${codigoTurno} (${turno.nombre}) cancelado.\n`);
};

// ── MENÚ ─────────────────────────────────────────────────────
const menu = (opcion: number): void => {
  switch (opcion) {
    case 1: asignarTurno("Juan Pérez", "Normal"); break;
    case 2: asignarTurno("Doña Rosa",  "Preferencial"); break;
    case 3: verCola(); break;
    case 4: llamarSiguiente(1); break;
    case 5: finalizarAtencion("P-001"); break;
    case 6: verHistorial(); break;
    case 7: cancelarTurno("N-001"); break;
    default: console.log("❌ Opción no válida.");
  }
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
