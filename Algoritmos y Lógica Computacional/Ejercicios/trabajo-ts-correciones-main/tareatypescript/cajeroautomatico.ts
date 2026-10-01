// ============================================================
//  SIMULACIÓN 2 — CAJERO AUTOMÁTICO — TypeScript
//
//  🔑 CAMBIOS CLAVE vs JavaScript:
//  - interface: tipado fuerte para cuentas y transacciones
//  - TipoTransaccion: union de literales para los tipos permitidos
//  - null vs undefined: sesionActiva puede ser null (ausencia intencional)
//  - boolean como retorno en funciones que validan
// ============================================================

// ── INTERFACES ───────────────────────────────────────────────

interface CuentaBancaria {
  readonly numero: string;    // readonly: el número de cuenta no cambia
  titular: string;
  pin:     string;
  saldo:   number;            // sí cambia con cada operación
}

// Union de literales: solo estos tres strings son tipos válidos
type TipoTransaccion = "Retiro" | "Consignación" | `Transferencia → ${string}`;

interface Transaccion {
  cuenta:  string;            // número de cuenta asociado
  titular: string;
  tipo:    TipoTransaccion;
  monto:   number;
  fecha:   string;
}

// ── DATOS INICIALES ──────────────────────────────────────────

const cuentas: CuentaBancaria[] = [
  { numero: "001", titular: "Ana Torres", pin: "1234", saldo: 500000  },
  { numero: "002", titular: "Luis Gómez", pin: "5678", saldo: 1200000 },
  { numero: "003", titular: "María Ruiz", pin: "9999", saldo: 75000   },
];

let transacciones: Transaccion[] = [];

// null: ausencia de sesión (diferente a undefined)
// CuentaBancaria | null → TypeScript exige verificar antes de usar
let sesionActiva: CuentaBancaria | null = null;

// ── UTILIDADES ───────────────────────────────────────────────

const formatearPrecio = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

const ahora = (): string => new Date().toLocaleString("es-CO");

const registrarTransaccion = (cuenta: CuentaBancaria, tipo: TipoTransaccion, monto: number): void => {
  transacciones.push({
    cuenta:  cuenta.numero,
    titular: cuenta.titular,
    tipo,
    monto,
    fecha: ahora(),
  });
};

// Retorna undefined si no existe (TypeScript lo indica en el tipo)
const buscarCuenta = (numero: string): CuentaBancaria | undefined =>
  cuentas.find((c) => c.numero === numero);

// ── 1. INICIAR SESIÓN ────────────────────────────────────────
// : boolean → retorna true si inició bien, false si no
const iniciarSesion = (numeroCuenta: string, pin: string): boolean => {
  const cuenta = buscarCuenta(numeroCuenta);

  if (!cuenta) {
    console.log("❌ Número de cuenta no encontrado.");
    return false;
  }
  if (cuenta.pin !== pin) {
    console.log("❌ PIN incorrecto.");
    return false;
  }

  sesionActiva = cuenta;
  console.log(`\n✅ Bienvenido/a, ${cuenta.titular}. Sesión iniciada.`);
  return true;
};

// ── 2. CERRAR SESIÓN ─────────────────────────────────────────
const cerrarSesion = (): void => {
  if (!sesionActiva) {
    console.log("⚠️  No hay sesión activa.");
    return;
  }
  console.log(`\n👋 Sesión cerrada. Hasta luego, ${sesionActiva.titular}.`);
  sesionActiva = null;
};

// ── VERIFICAR SESIÓN ─────────────────────────────────────────
// Type guard implícito: después del if, TS sabe que sesionActiva no es null
const verificarSesion = (): boolean => {
  if (!sesionActiva) {
    console.log("🔒 Debe iniciar sesión para realizar esta operación.");
    return false;
  }
  return true;
};

// ── 3. CONSULTAR SALDO ───────────────────────────────────────
const consultarSaldo = (): void => {
  if (!verificarSesion() || !sesionActiva) return;

  console.log("\n════════════════════════════════");
  console.log("       💳  CONSULTA DE SALDO    ");
  console.log("════════════════════════════════");
  console.log(`  Titular : ${sesionActiva.titular}`);
  console.log(`  Cuenta  : ${sesionActiva.numero}`);
  console.log(`  Saldo   : ${formatearPrecio(sesionActiva.saldo)}`);
  console.log("════════════════════════════════\n");
};

// ── 4. RETIRO ────────────────────────────────────────────────
const retirar = (monto: number): void => {
  if (!verificarSesion() || !sesionActiva) return;

  if (monto <= 0) {
    console.log("❌ El monto debe ser mayor a $0.");
    return;
  }
  if (monto > sesionActiva.saldo) {
    console.log(`❌ Saldo insuficiente. Saldo actual: ${formatearPrecio(sesionActiva.saldo)}`);
    return;
  }

  sesionActiva.saldo -= monto;
  registrarTransaccion(sesionActiva, "Retiro", monto);

  console.log(`\n💵 Retiro exitoso: ${formatearPrecio(monto)}`);
  console.log(`   Saldo restante: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

// ── 5. CONSIGNACIÓN ──────────────────────────────────────────
const consignar = (monto: number): void => {
  if (!verificarSesion() || !sesionActiva) return;

  if (monto <= 0) {
    console.log("❌ El monto debe ser mayor a $0.");
    return;
  }

  sesionActiva.saldo += monto;
  registrarTransaccion(sesionActiva, "Consignación", monto);

  console.log(`\n✅ Consignación exitosa: ${formatearPrecio(monto)}`);
  console.log(`   Nuevo saldo: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

// ── 6. TRANSFERENCIA ─────────────────────────────────────────
const transferir = (numeroCuentaDestino: string, monto: number): void => {
  if (!verificarSesion() || !sesionActiva) return;

  if (monto <= 0) {
    console.log("❌ El monto debe ser mayor a $0.");
    return;
  }
  if (numeroCuentaDestino === sesionActiva.numero) {
    console.log("❌ No puede transferir a su propia cuenta.");
    return;
  }

  const destino = buscarCuenta(numeroCuentaDestino);
  if (!destino) {
    console.log(`❌ La cuenta destino ${numeroCuentaDestino} no existe.`);
    return;
  }
  if (monto > sesionActiva.saldo) {
    console.log(`❌ Saldo insuficiente. Saldo actual: ${formatearPrecio(sesionActiva.saldo)}`);
    return;
  }

  sesionActiva.saldo -= monto;
  destino.saldo      += monto;

  // Template literal type: construye el tipo dinámicamente
  const tipoTransferencia: TipoTransaccion = `Transferencia → ${destino.titular}`;
  registrarTransaccion(sesionActiva, tipoTransferencia, monto);

  console.log(`\n🔄 Transferencia exitosa:`);
  console.log(`   Enviado a  : ${destino.titular} (cuenta ${destino.numero})`);
  console.log(`   Monto      : ${formatearPrecio(monto)}`);
  console.log(`   Saldo actual: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

// ── 7. HISTORIAL ─────────────────────────────────────────────
const verHistorial = (): void => {
  if (!verificarSesion() || !sesionActiva) return;

  // Capturamos la cuenta activa en una variable local
  // para que TypeScript no pierda el narrowing dentro del callback
  const cuentaActual = sesionActiva;

  const movimientos: Transaccion[] = transacciones.filter(
    (t) => t.cuenta === cuentaActual.numero
  );

  if (movimientos.length === 0) {
    console.log("\n📄 No hay movimientos registrados para esta cuenta.\n");
    return;
  }

  console.log("\n════════════════════════════════════════════════");
  console.log("         📄  HISTORIAL DE MOVIMIENTOS          ");
  console.log("════════════════════════════════════════════════");

  movimientos
    .map(
      (t) =>
        `  ${t.tipo.padEnd(30)}  ${formatearPrecio(t.monto).padStart(14)}  │  ${t.fecha}`
    )
    .forEach((linea) => console.log(linea));

  const totalRetirado: number = movimientos
    .filter((t) => t.tipo === "Retiro")
    .reduce((acc, t) => acc + t.monto, 0);

  const totalConsignado: number = movimientos
    .filter((t) => t.tipo === "Consignación")
    .reduce((acc, t) => acc + t.monto, 0);

  console.log("────────────────────────────────────────────────");
  console.log(`  Total retirado   : ${formatearPrecio(totalRetirado)}`);
  console.log(`  Total consignado : ${formatearPrecio(totalConsignado)}`);
  console.log("════════════════════════════════════════════════\n");
};

// ── MENÚ ─────────────────────────────────────────────────────
const menu = (opcion: number): void => {
  switch (opcion) {
    case 1: iniciarSesion("001", "1234"); break;
    case 2: consultarSaldo(); break;
    case 3: retirar(100000); break;
    case 4: consignar(200000); break;
    case 5: transferir("002", 50000); break;
    case 6: verHistorial(); break;
    case 7: cerrarSesion(); break;
    default: console.log("❌ Opción no válida.");
  }
};

// ── DEMOSTRACIÓN ─────────────────────────────────────────────
console.log("╔══════════════════════════════════╗");
console.log("║   SIMULACIÓN: CAJERO AUTOMÁTICO  ║");
console.log("╚══════════════════════════════════╝\n");

console.log("--- Intentar operar sin sesión ---");
consultarSaldo();

console.log("\n--- Iniciar sesión con PIN incorrecto ---");
iniciarSesion("001", "0000");

console.log("\n--- Iniciar sesión correctamente ---");
iniciarSesion("001", "1234");

console.log("\n--- Consultar saldo ---");
consultarSaldo();

console.log("--- Retirar $150.000 ---");
retirar(150000);

console.log("--- Intentar retirar más de lo disponible ---");
retirar(9999999);

console.log("--- Consignar $300.000 ---");
consignar(300000);

console.log("--- Transferir $80.000 a cuenta 002 ---");
transferir("002", 80000);

console.log("--- Ver historial de movimientos ---");
verHistorial();

console.log("--- Cerrar sesión ---");
cerrarSesion();
