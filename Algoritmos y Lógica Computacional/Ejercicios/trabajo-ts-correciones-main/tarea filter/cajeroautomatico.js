// ============================================================
//  SIMULACIÓN 2 — CAJERO AUTOMÁTICO
//  Conceptos: objetos, arrays, funciones flecha,
//              filter, map, reduce, menú con switch
// ============================================================

// ── CUENTAS BANCARIAS REGISTRADAS ───────────────────────────
// Cada cuenta es un objeto con número, titular, PIN y saldo
const cuentas = [
  { numero: "001", titular: "Ana Torres",    pin: "1234", saldo: 500000  },
  { numero: "002", titular: "Luis Gómez",    pin: "5678", saldo: 1200000 },
  { numero: "003", titular: "María Ruiz",    pin: "9999", saldo: 75000   },
];

// ── HISTORIAL DE TRANSACCIONES (compartido) ──────────────────
// Cada transacción: { cuenta, tipo, monto, fecha }
let transacciones = [];

// ── SESIÓN ACTIVA ────────────────────────────────────────────
// Guarda la cuenta que está usando el cajero en este momento
let sesionActiva = null;

// ── UTILIDADES ───────────────────────────────────────────────

// Formatea un número como pesos colombianos
const formatearPrecio = (valor) =>
  `$${valor.toLocaleString("es-CO")}`;

// Devuelve la fecha y hora actual formateada
const ahora = () => new Date().toLocaleString("es-CO");

// Registra una transacción en el historial global
const registrarTransaccion = (cuenta, tipo, monto) => {
  transacciones.push({
    cuenta: cuenta.numero,   // número de cuenta asociado
    titular: cuenta.titular,
    tipo,                    // "Retiro", "Consignación", "Transferencia"
    monto,
    fecha: ahora(),
  });
};

// Busca una cuenta por número
const buscarCuenta = (numero) =>
  cuentas.find((c) => c.numero === numero);

// ── 1. INICIAR SESIÓN ────────────────────────────────────────
// Verifica número de cuenta y PIN antes de permitir operaciones
const iniciarSesion = (numeroCuenta, pin) => {
  const cuenta = buscarCuenta(numeroCuenta);

  if (!cuenta) {
    console.log("❌ Número de cuenta no encontrado.");
    return false;
  }
  if (cuenta.pin !== pin) {
    console.log("❌ PIN incorrecto. Por favor verifique.");
    return false;
  }

  // Guardar la cuenta activa en la sesión
  sesionActiva = cuenta;
  console.log(`\n✅ Bienvenido/a, ${cuenta.titular}. Sesión iniciada.`);
  return true;
};

// ── 2. CERRAR SESIÓN ─────────────────────────────────────────
const cerrarSesion = () => {
  if (!sesionActiva) {
    console.log("⚠️  No hay sesión activa.");
    return;
  }
  console.log(`\n👋 Sesión cerrada. Hasta luego, ${sesionActiva.titular}.`);
  sesionActiva = null;
};

// ── Verificar que haya sesión activa ─────────────────────────
// Devuelve true si hay sesión, false si no. Evita repetir esta lógica.
const verificarSesion = () => {
  if (!sesionActiva) {
    console.log("🔒 Debe iniciar sesión para realizar esta operación.");
    return false;
  }
  return true;
};

// ── 3. CONSULTAR SALDO ───────────────────────────────────────
const consultarSaldo = () => {
  if (!verificarSesion()) return;

  console.log("\n════════════════════════════════");
  console.log("       💳  CONSULTA DE SALDO    ");
  console.log("════════════════════════════════");
  console.log(`  Titular : ${sesionActiva.titular}`);
  console.log(`  Cuenta  : ${sesionActiva.numero}`);
  console.log(`  Saldo   : ${formatearPrecio(sesionActiva.saldo)}`);
  console.log("════════════════════════════════\n");
};

// ── 4. RETIRO ────────────────────────────────────────────────
// Descuenta el monto del saldo si hay fondos suficientes
const retirar = (monto) => {
  if (!verificarSesion()) return;

  if (monto <= 0) {
    console.log("❌ El monto debe ser mayor a $0.");
    return;
  }
  if (monto > sesionActiva.saldo) {
    console.log(`❌ Saldo insuficiente. Saldo actual: ${formatearPrecio(sesionActiva.saldo)}`);
    return;
  }

  // Descontar el monto
  sesionActiva.saldo -= monto;

  // Guardar la transacción en el historial
  registrarTransaccion(sesionActiva, "Retiro", monto);

  console.log(`\n💵 Retiro exitoso: ${formatearPrecio(monto)}`);
  console.log(`   Saldo restante: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

// ── 5. CONSIGNACIÓN ──────────────────────────────────────────
// Suma el monto al saldo de la cuenta activa
const consignar = (monto) => {
  if (!verificarSesion()) return;

  if (monto <= 0) {
    console.log("❌ El monto debe ser mayor a $0.");
    return;
  }

  // Sumar el monto
  sesionActiva.saldo += monto;

  // Registrar la transacción
  registrarTransaccion(sesionActiva, "Consignación", monto);

  console.log(`\n✅ Consignación exitosa: ${formatearPrecio(monto)}`);
  console.log(`   Nuevo saldo: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

// ── 6. TRANSFERENCIA ─────────────────────────────────────────
// Mueve fondos de la cuenta activa a otra cuenta del banco
const transferir = (numeroCuentaDestino, monto) => {
  if (!verificarSesion()) return;

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

  // Descontar de la cuenta origen y sumar a la destino
  sesionActiva.saldo -= monto;
  destino.saldo      += monto;

  // Registrar como transacción de transferencia
  registrarTransaccion(sesionActiva, `Transferencia → ${destino.titular}`, monto);

  console.log(`\n🔄 Transferencia exitosa:`);
  console.log(`   Enviado a  : ${destino.titular} (cuenta ${destino.numero})`);
  console.log(`   Monto      : ${formatearPrecio(monto)}`);
  console.log(`   Saldo actual: ${formatearPrecio(sesionActiva.saldo)}\n`);
};

// ── 7. HISTORIAL DE MOVIMIENTOS ──────────────────────────────
// filter: muestra solo las transacciones de la cuenta activa
// map   : formatea cada transacción como una línea de texto
const verHistorial = () => {
  if (!verificarSesion()) return;

  // filter: conserva solo las transacciones de la cuenta en sesión
  const movimientos = transacciones.filter(
    (t) => t.cuenta === sesionActiva.numero
  );

  if (movimientos.length === 0) {
    console.log("\n📄 No hay movimientos registrados para esta cuenta.\n");
    return;
  }

  console.log("\n════════════════════════════════════════════════");
  console.log("         📄  HISTORIAL DE MOVIMIENTOS          ");
  console.log("════════════════════════════════════════════════");

  // map: convierte cada movimiento en una línea descriptiva
  movimientos
    .map(
      (t) =>
        `  ${t.tipo.padEnd(30)}  ${formatearPrecio(t.monto).padStart(14)}  │  ${t.fecha}`
    )
    .forEach((linea) => console.log(linea));

  // reduce: calcula el saldo total de retiros para estadísticas
  const totalRetirado = movimientos
    .filter((t) => t.tipo === "Retiro")              // solo retiros
    .reduce((acc, t) => acc + t.monto, 0);           // suma sus montos

  const totalConsignado = movimientos
    .filter((t) => t.tipo === "Consignación")
    .reduce((acc, t) => acc + t.monto, 0);

  console.log("────────────────────────────────────────────────");
  console.log(`  Total retirado   : ${formatearPrecio(totalRetirado)}`);
  console.log(`  Total consignado : ${formatearPrecio(totalConsignado)}`);
  console.log("════════════════════════════════════════════════\n");
};

// ── MENÚ PRINCIPAL ───────────────────────────────────────────
const menu = (opcion) => {
  switch (opcion) {
    case 1:
      // iniciarSesion(numeroCuenta, pin)
      iniciarSesion("001", "1234");
      break;
    case 2:
      consultarSaldo();
      break;
    case 3:
      // retirar(monto)
      retirar(100000);
      break;
    case 4:
      // consignar(monto)
      consignar(200000);
      break;
    case 5:
      // transferir(cuentaDestino, monto)
      transferir("002", 50000);
      break;
    case 6:
      verHistorial();
      break;
    case 7:
      cerrarSesion();
      break;
    default:
      console.log("❌ Opción no válida.");
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