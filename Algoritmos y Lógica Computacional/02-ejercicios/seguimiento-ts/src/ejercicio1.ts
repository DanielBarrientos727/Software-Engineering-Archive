// ============================================================
//  EJERCICIO 1 — CAJERO AUTOMÁTICO — TypeScript
//
//  Conceptos clave:
//  - interface: tipado fuerte para cuentas y transacciones
//  - union de literales: TipoTransaccion limita los valores
//  - null vs undefined: sesionActiva puede ser null
//  - boolean como retorno en funciones de validación
// ============================================================

// ── INTERFACES ───────────────────────────────────────────────

interface CuentaBancaria {
  readonly numero: string;
  titular: string;
  pin:     string;
  saldo:   number;
}

type TipoTransaccion = "Retiro" | "Consignación" | `Transferencia → ${string}`;

interface Transaccion {
  cuenta:  string;
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
let sesionActiva: CuentaBancaria | null = null;

// ── UTILIDADES ───────────────────────────────────────────────

const formatearPrecio = (valor: number): string =>
  `$${valor.toLocaleString("es-CO")}`;

const ahora = (): string => new Date().toLocaleString("es-CO");

const registrarTransaccion = (cuenta: CuentaBancaria, tipo: TipoTransaccion, monto: number): void => {
  transacciones.push({ cuenta: cuenta.numero, titular: cuenta.titular, tipo, monto, fecha: ahora() });
};

const buscarCuenta = (numero: string): CuentaBancaria | undefined =>
  cuentas.find((c) => c.numero === numero);

// ── FUNCIONES ────────────────────────────────────────────────

const iniciarSesion = (numeroCuenta: string, pin: string): boolean => {
  const cuenta = buscarCuenta(numeroCuenta);
  if (!cuenta) { console.log("❌ Número de cuenta no encontrado."); return false; }
  if (cuenta.pin !== pin) { console.log("❌ PIN incorrecto."); return false; }
  sesionActiva = cuenta;
  console.log(`\n✅ Bienvenido/a, ${cuenta.titular}. Sesión iniciada.`);
  return true;
};

const cerrarSesion = (): void => {
  if (!sesionActiva) { console.log("⚠️  No hay sesión activa."); return; }
  console.log(`\n👋 Sesión cerrada. Hasta luego, ${sesionActiva.titular}.`);
  sesionActiva = null;
};

const verificarSesion = (): boolean => {
  if (!sesionActiva) { console.log("🔒 Debe iniciar sesión para realizar esta operación."); return false; }
  return true;
};

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

const retirar = (monto: number): void => {
  if (!verificarSesion() || !sesionActiva) return;
  if (monto <= 0) { console.log("❌ El monto debe ser mayor a $0."); return; }
  if (monto > sesionActiva.saldo) { console.log(`❌ Saldo insuficiente. Saldo actual: ${formatearPrecio(sesionActiva.saldo)}`); return; }
  sesionActiva.saldo -= monto;
  registrarTransaccion(sesionActiva, "Retiro", monto);
  console.log(`\n💵 Retiro exitoso: ${formatearPrecio(monto)}`);
  console.log(`   Saldo restante: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

const consignar = (monto: number): void => {
  if (!verificarSesion() || !sesionActiva) return;
  if (monto <= 0) { console.log("❌ El monto debe ser mayor a $0."); return; }
  sesionActiva.saldo += monto;
  registrarTransaccion(sesionActiva, "Consignación", monto);
  console.log(`\n✅ Consignación exitosa: ${formatearPrecio(monto)}`);
  console.log(`   Nuevo saldo: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

const transferir = (numeroCuentaDestino: string, monto: number): void => {
  if (!verificarSesion() || !sesionActiva) return;
  if (monto <= 0) { console.log("❌ El monto debe ser mayor a $0."); return; }
  if (numeroCuentaDestino === sesionActiva.numero) { console.log("❌ No puede transferir a su propia cuenta."); return; }
  const destino = buscarCuenta(numeroCuentaDestino);
  if (!destino) { console.log(`❌ La cuenta destino ${numeroCuentaDestino} no existe.`); return; }
  if (monto > sesionActiva.saldo) { console.log(`❌ Saldo insuficiente. Saldo actual: ${formatearPrecio(sesionActiva.saldo)}`); return; }
  sesionActiva.saldo -= monto;
  destino.saldo      += monto;
  const tipo: TipoTransaccion = `Transferencia → ${destino.titular}`;
  registrarTransaccion(sesionActiva, tipo, monto);
  console.log(`\n🔄 Transferencia exitosa:`);
  console.log(`   Enviado a  : ${destino.titular} (cuenta ${destino.numero})`);
  console.log(`   Monto      : ${formatearPrecio(monto)}`);
  console.log(`   Saldo actual: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

const verHistorial = (): void => {
  if (!verificarSesion() || !sesionActiva) return;
  const cuentaActual = sesionActiva;
  const movimientos  = transacciones.filter((t) => t.cuenta === cuentaActual.numero);
  if (movimientos.length === 0) { console.log("\n📄 No hay movimientos registrados.\n"); return; }
  console.log("\n════════════════════════════════════════════════");
  console.log("         📄  HISTORIAL DE MOVIMIENTOS          ");
  console.log("════════════════════════════════════════════════");
  movimientos
    .map((t) => `  ${t.tipo.padEnd(30)}  ${formatearPrecio(t.monto).padStart(14)}  │  ${t.fecha}`)
    .forEach((linea) => console.log(linea));
  const totalRetirado   = movimientos.filter((t) => t.tipo === "Retiro").reduce((acc, t) => acc + t.monto, 0);
  const totalConsignado = movimientos.filter((t) => t.tipo === "Consignación").reduce((acc, t) => acc + t.monto, 0);
  console.log("────────────────────────────────────────────────");
  console.log(`  Total retirado   : ${formatearPrecio(totalRetirado)}`);
  console.log(`  Total consignado : ${formatearPrecio(totalConsignado)}`);
  console.log("════════════════════════════════════════════════\n");
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