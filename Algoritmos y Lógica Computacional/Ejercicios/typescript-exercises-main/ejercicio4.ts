// Variables acumuladoras y contadores
let contMotos: number = 0;
let contCarros: number = 0;
let contCamionetas: number = 0;
let ingresoTotal: number = 0;
let sumaHoras: number = 0;
let totalVehiculos: number = 0;

// Datos hardcodeados
const tiposVehiculo: number[] = [1, 2, 3, 1, 3, 2, 1];
const horasPorVehiculo: number[] = [3, 9, 5, 10, 2, 8, 6];

for (let i: number = 0; i < tiposVehiculo.length; i++) {

    let tipoVehiculo: number = tiposVehiculo[i];
    let horasPermanencia: number = horasPorVehiculo[i];

    let tarifaHora: number = 0;
    let tipoTexto: string = "";

    if (tipoVehiculo === 1) {
        tarifaHora = 2000;
        tipoTexto = "Moto";
        contMotos++;
    } else if (tipoVehiculo === 2) {
        tarifaHora = 4000;
        tipoTexto = "Carro";
        contCarros++;
    } else if (tipoVehiculo === 3) {
        tarifaHora = 6000;
        tipoTexto = "Camioneta";
        contCamionetas++;
    } else {
        console.log("Tipo invalido, saltando...");
        continue;
    }

    let costoTotal: number = tarifaHora * horasPermanencia;
    let descuento: number = 0;

    if (horasPermanencia > 8) {
        descuento = costoTotal * 0.20;
    }

    let totalPagar: number = costoTotal - descuento;

    let tipoTarifa: string = "";
    if (horasPermanencia > 8) {
        tipoTarifa = "TARIFA DIA COMPLETO (20% desc.)";
    } else {
        tipoTarifa = "TARIFA POR HORAS";
    }

    console.log("\n--- VEHICULO " + (i + 1) + " REGISTRADO ---");
    console.log("Tipo: " + tipoTexto);
    console.log("Horas: " + horasPermanencia);
    console.log("Subtotal: $" + costoTotal.toLocaleString("es-CO"));

    if (descuento > 0) {
        console.log("Descuento (20%): $" + descuento.toLocaleString("es-CO") + " - " + tipoTarifa);
    } else {
        console.log(tipoTarifa);
    }

    console.log("Total: $" + totalPagar.toLocaleString("es-CO"));

    ingresoTotal += totalPagar;
    sumaHoras += horasPermanencia;
    totalVehiculos++;
}

// ===== CIERRE DE JORNADA =====
let promedioHoras: number = 0;

if (totalVehiculos > 0) {
    promedioHoras = sumaHoras / totalVehiculos;
}

console.log("\n=== CIERRE DE JORNADA ===");
console.log("Motos: " + contMotos + " | Carros: " + contCarros + " | Camionetas: " + contCamionetas);
console.log("Total vehiculos: " + totalVehiculos);
console.log("Ingreso total: $" + ingresoTotal.toLocaleString("es-CO"));
console.log("Promedio permanencia: " + promedioHoras.toFixed(1) + " horas");