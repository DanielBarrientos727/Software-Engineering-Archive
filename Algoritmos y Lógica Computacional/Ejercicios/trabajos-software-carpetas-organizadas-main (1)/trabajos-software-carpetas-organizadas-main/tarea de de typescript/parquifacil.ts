/**
 * PARQUIFÁCIL — SISTEMA DE REGISTRO DE PARQUEADERO
 *
 * Gestiona la entrada y salida de vehículos en un parqueadero, calculando
 * el cobro según el tipo de vehículo y las horas de permanencia.
 * Si el vehículo supera las 8 horas, se aplica un descuento del 20 %
 * (tarifa especial de día completo).
 *
 * Tipos de vehículo y tarifas por hora:
 *  1. Moto        — $2.000 / hora
 *  2. Carro       — $4.000 / hora
 *  3. Camioneta   — $6.000 / hora
 *
 * Opciones de menú:
 *  1. Registrar vehículo
 *  2. Cerrar jornada
 */

// ── Tipos ─────────────────────────────────────────────────────────────────────

/** Representa un registro de entrada simulado por el operador del parqueadero. */
interface Registro {
  opcionMenu: number;
  tipoVehiculo: number;
  horasPermanencia: number;
}

// ── Datos simulados ───────────────────────────────────────────────────────────

/**
 * Array que simula las entradas del operador en el sistema.
 * El último elemento tiene opcionMenu:2 para cerrar la jornada.
 */
const registros: Registro[] = [
  { opcionMenu: 1, tipoVehiculo: 2, horasPermanencia: 10 },
  { opcionMenu: 1, tipoVehiculo: 1, horasPermanencia: 3  },
  { opcionMenu: 1, tipoVehiculo: 3, horasPermanencia: 9  },
  { opcionMenu: 1, tipoVehiculo: 2, horasPermanencia: 5  },
  { opcionMenu: 1, tipoVehiculo: 1, horasPermanencia: 2  },
  { opcionMenu: 2, tipoVehiculo: 0, horasPermanencia: 0  }, // cerrar jornada
];

// ── Tarifas por hora ──────────────────────────────────────────────────────────

/** Tarifa por hora para motos (en pesos colombianos). */
const TARIFA_MOTO: number      = 2000;

/** Tarifa por hora para carros (en pesos colombianos). */
const TARIFA_CARRO: number     = 4000;

/** Tarifa por hora para camionetas y SUVs (en pesos colombianos). */
const TARIFA_CAMIONETA: number = 6000;

/** Número de horas a partir del cual se aplica el descuento de día completo. */
const LIMITE_HORAS: number     = 8;

/** Porcentaje de descuento para vehículos que superan el límite de horas (20 %). */
const PORCENTAJE_DESC: number  = 0.20;

// ── Contadores y acumuladores ─────────────────────────────────────────────────

/** Número de motos registradas en la jornada. */
let contMotos: number      = 0;

/** Número de carros registrados en la jornada. */
let contCarros: number     = 0;

/** Número de camionetas/SUVs registradas en la jornada. */
let contCamionetas: number = 0;

/** Ingreso total recaudado en la jornada (ya con descuentos aplicados). */
let ingresoTotal: number   = 0;

/** Suma de todas las horas de permanencia (para calcular el promedio). */
let sumaHoras: number      = 0;

/** Número total de vehículos registrados en la jornada. */
let totalVehiculos: number = 0;

/** Índice para recorrer el array de registros simulados. */
let indice: number = 0;

// ── Encabezado ────────────────────────────────────────────────────────────────
console.log("============================================");
console.log("            🅿️  PARQUIFÁCIL                ");
console.log("============================================");
console.log("  1. Registrar vehículo                    ");
console.log("  2. Cerrar jornada                        ");
console.log("============================================");

/** Opción de menú leída en la iteración actual. */
let opcionMenu: number = registros[indice].opcionMenu;

// ── Ciclo while: continúa hasta que el operador cierre la jornada ────────────
while (opcionMenu !== 2) {

  const tipoVehiculo: number     = registros[indice].tipoVehiculo;
  const horasPermanencia: number = registros[indice].horasPermanencia;
  indice++;

  /** Tarifa por hora según el tipo de vehículo. */
  let tarifaHora: number = 0;

  /** Nombre descriptivo del tipo de vehículo. */
  let nombreVeh: string  = "";

  // Asigna tarifa y nombre, e incrementa el contador del tipo correspondiente
  if (tipoVehiculo === 1) {
    tarifaHora = TARIFA_MOTO;
    nombreVeh  = "Moto";
    contMotos++;
  } else if (tipoVehiculo === 2) {
    tarifaHora = TARIFA_CARRO;
    nombreVeh  = "Carro";
    contCarros++;
  } else if (tipoVehiculo === 3) {
    tarifaHora = TARIFA_CAMIONETA;
    nombreVeh  = "Camioneta/SUV";
    contCamionetas++;
  } else {
    // Tipo de vehículo no reconocido: muestra aviso y pasa al siguiente registro
    console.log("  ⚠️  Tipo de vehículo inválido.");
    opcionMenu = registros[indice].opcionMenu;
    continue;
  }

  /** Costo base sin descuento (tarifa × horas). */
  let costoTotal: number = tarifaHora * horasPermanencia;

  /** Valor del descuento aplicado (0 si no supera el límite de horas). */
  let descuento: number  = 0;

  /** Monto final que el cliente paga. */
  let totalPagar: number = costoTotal;

  // Aplica el descuento del 20 % si el vehículo estuvo más de 8 horas
  if (horasPermanencia > LIMITE_HORAS) {
    descuento  = costoTotal * PORCENTAJE_DESC;
    totalPagar = costoTotal - descuento;
  }

  /** Etiqueta descriptiva de la tarifa aplicada. */
  const tipoTarifa: string = horasPermanencia > LIMITE_HORAS
    ? "TARIFA DÍA COMPLETO (20% desc.)"
    : "TARIFA POR HORAS";

  ingresoTotal   += totalPagar;
  sumaHoras      += horasPermanencia;
  totalVehiculos++;

  // Imprime el recibo de cada vehículo registrado
  console.log(`\n--- VEHÍCULO REGISTRADO ---`);
  console.log(`  Tipo        : ${nombreVeh}`);
  console.log(`  Horas       : ${horasPermanencia}`);
  console.log(`  Subtotal    : $${costoTotal.toLocaleString("es-CO")}`);
  if (descuento > 0) {
    // Solo muestra la línea de descuento cuando aplica
    console.log(`  Descuento   : $${descuento.toLocaleString("es-CO")}`);
  }
  console.log(`  ${tipoTarifa}`);
  console.log(`  Total       : $${totalPagar.toLocaleString("es-CO")}`);

  // Avanza al siguiente registro simulado
  opcionMenu = registros[indice].opcionMenu;
}

// ── Promedio de horas por vehículo (evita división por cero) ─────────────────
const promedioHoras: string = totalVehiculos > 0
  ? (sumaHoras / totalVehiculos).toFixed(1)
  : "0";

// ── Cierre de jornada ─────────────────────────────────────────────────────────
console.log("          === CIERRE DE JORNADA ===         ");
console.log(`  Motos         : ${contMotos}`);
console.log(`  Carros        : ${contCarros}`);
console.log(`  Camionetas    : ${contCamionetas}`);
console.log(`  Total vehículos     : ${totalVehiculos}`);
console.log(`  Ingreso total       : $${ingresoTotal.toLocaleString("es-CO")}`);
console.log(`  Promedio permanencia: ${promedioHoras} horas`);
console.log("============================================");