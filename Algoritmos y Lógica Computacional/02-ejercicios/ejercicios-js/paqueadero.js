// ============================================================
// EJERCICIO 4 — ParquiFácil: Sistema de Parqueadero
// Algoritmos y Lógica Computacional — SENA
// ============================================================

// Vehículos simulados: tipoVehiculo (1=Moto, 2=Carro, 3=Camioneta), horas
// opcionMenu 2 = cerrar jornada
const jornada = [
  { opcionMenu: 1, tipoVehiculo: 2, horasPermanencia: 10 },
  { opcionMenu: 1, tipoVehiculo: 1, horasPermanencia: 3  },
  { opcionMenu: 1, tipoVehiculo: 3, horasPermanencia: 9  },
  { opcionMenu: 1, tipoVehiculo: 1, horasPermanencia: 6  },
  { opcionMenu: 1, tipoVehiculo: 2, horasPermanencia: 2  },
  { opcionMenu: 1, tipoVehiculo: 1, horasPermanencia: 8  },
  { opcionMenu: 1, tipoVehiculo: 2, horasPermanencia: 5  },
  { opcionMenu: 2, tipoVehiculo: 0, horasPermanencia: 0  }, // Cerrar jornada
];

// Variables principales
let contMotos       = 0;
let contCarros      = 0;
let contCamionetas  = 0;
let ingresoTotal    = 0;
let sumaHoras       = 0;
let totalVehiculos  = 0;
let indiceJornada   = 0;
let opcionMenu      = 0;

console.log("====================================");
console.log("   PARQUIFÁCIL — SISTEMA DE PARQUEO ");
console.log("====================================");
console.log("  1. Registrar vehículo");
console.log("  2. Cerrar jornada\n");

// Ciclo while: se repite mientras no se cierre la jornada
opcionMenu = jornada[indiceJornada].opcionMenu;

while (opcionMenu !== 2) {
  const tipoVehiculo    = jornada[indiceJornada].tipoVehiculo;
  const horasPermanencia = jornada[indiceJornada].horasPermanencia;
  indiceJornada++;

  let tarifaHora    = 0;
  let nombreVehiculo = "";

  // if/else if/else: tarifa según tipo de vehículo
  if (tipoVehiculo === 1) {
    tarifaHora     = 2000;
    nombreVehiculo = "Moto";
    contMotos++;
  } else if (tipoVehiculo === 2) {
    tarifaHora     = 4000;
    nombreVehiculo = "Carro";
    contCarros++;
  } else if (tipoVehiculo === 3) {
    tarifaHora     = 6000;
    nombreVehiculo = "Camioneta/SUV";
    contCamionetas++;
  } else {
    console.log("⚠ Tipo de vehículo inválido. Volviendo al menú.\n");
    opcionMenu = jornada[indiceJornada].opcionMenu;
    continue;
  }

  // Cálculo del costo total
  let costoTotal = tarifaHora * horasPermanencia;
  let descuento  = 0;
  let totalPagar = costoTotal;

  // if: descuento del 20% si horas > 8
  if (horasPermanencia > 8) {
    descuento  = costoTotal * 0.20;
    totalPagar = costoTotal - descuento;
  }

  // Operador ternario: tipo de tarifa
  const tipoTarifa = horasPermanencia > 8
    ? "TARIFA DÍA COMPLETO (20% desc.)"
    : "TARIFA POR HORAS";

  // Acumuladores
  ingresoTotal   += totalPagar;
  sumaHoras      += horasPermanencia;
  totalVehiculos++;

  // Salida por vehículo
  console.log("--- VEHÍCULO REGISTRADO ---");
  console.log(`  Tipo     : ${nombreVehiculo}`);
  console.log(`  Horas    : ${horasPermanencia}`);
  console.log(`  Subtotal : $${costoTotal.toLocaleString("es-CO")}`);
  if (horasPermanencia > 8) {
    console.log(`  Descuento (20%) : $${descuento.toLocaleString("es-CO")}`);
  }
  console.log(`  Tarifa   : ${tipoTarifa}`);
  console.log(`  Total    : $${totalPagar.toLocaleString("es-CO")}`);
  console.log();

  // Actualizar opción del menú para la siguiente iteración
  opcionMenu = jornada[indiceJornada].opcionMenu;
}

// Cierre de jornada
const promedioHoras = totalVehiculos > 0
  ? (sumaHoras / totalVehiculos).toFixed(1)
  : 0;

console.log("=== CIERRE DE JORNADA ===");
console.log(`  Motos       : ${contMotos}`);
console.log(`  Carros      : ${contCarros}`);
console.log(`  Camionetas  : ${contCamionetas}`);
console.log(`  Total vehículos      : ${totalVehiculos}`);
console.log(`  Ingreso total        : $${ingresoTotal.toLocaleString("es-CO")}`);
console.log(`  Promedio permanencia : ${promedioHoras} horas`);