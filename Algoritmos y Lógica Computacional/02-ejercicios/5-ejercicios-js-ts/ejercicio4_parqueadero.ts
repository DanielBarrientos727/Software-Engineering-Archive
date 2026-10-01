/**
 * SISTEMA DE GESTIÓN DE PARQUEADERO - CORREGIDO
 */

enum TipoVehiculo {
    MOTO = 1,
    CARRO = 2,
    CAMIONETA = 3
}

/**
 * SOLUCIÓN ERROR 1: Tipado explícito de la constante Record.
 * Usamos Record<TipoVehiculo, number> para que TS sepa que las llaves son del Enum.
 */
const TARIFAS: Record<TipoVehiculo, number> = {
    [TipoVehiculo.MOTO]: 2000,
    [TipoVehiculo.CARRO]: 4000,
    [TipoVehiculo.CAMIONETA]: 6000
};

const UMBRAL_DESCUENTO = 8;
const PORCENTAJE_DESCUENTO = 0.20;

const tiposEntrada: number[] = [1, 2, 3, 1, 3, 2, 1];
const horasEntrada: number[] = [3, 9, 5, 10, 2, 8, 6];

/**
 * SOLUCIÓN ERROR 2: Tipado del objeto acumulador para evitar errores de referencia.
 */
interface IContadores {
    motos: number;
    carros: number;
    camionetas: number;
}

let contadores: IContadores = { motos: 0, carros: 0, camionetas: 0 };
let ingresoTotal: number = 0;
let sumaHoras: number = 0;
let totalVehiculos: number = 0;

for (let i = 0; i < tiposEntrada.length; i++) {
    const tipoRaw: number = tiposEntrada[i];
    const horas: number = horasEntrada[i];

    // Casteo seguro para que TS reconozca el valor dentro del Enum
    const tipo = tipoRaw as TipoVehiculo;
    
    // Si el tipo no existe en nuestras tarifas, es inválido
    if (!TARIFAS[tipo]) {
        console.log(`⚠️ Registro ${i + 1}: Tipo ${tipoRaw} inválido. Saltando...`);
        continue;
    }

    let tarifaHora: number = TARIFAS[tipo];
    let tipoTexto: string = "";

    switch (tipo) {
        case TipoVehiculo.MOTO:
            tipoTexto = "Moto";
            contadores.motos++;
            break;
        case TipoVehiculo.CARRO:
            tipoTexto = "Carro";
            contadores.carros++;
            break;
        case TipoVehiculo.CAMIONETA:
            tipoTexto = "Camioneta";
            contadores.camionetas++;
            break;
    }

    const costoBase: number = tarifaHora * horas;
    const aplicaDescuento: boolean = horas > UMBRAL_DESCUENTO;
    const valorDescuento: number = aplicaDescuento ? costoBase * PORCENTAJE_DESCUENTO : 0;
    const totalPagar: number = costoBase - valorDescuento;

    console.log(`\n--- VEHÍCULO ${i + 1} REGISTRADO ---`);
    console.log(`Tipo:      ${tipoTexto}`);
    console.log(`Tiempo:    ${horas} horas`);
    console.log(`Total:     $${totalPagar.toLocaleString("es-CO")}`);

    ingresoTotal += totalPagar;
    sumaHoras += horas;
    totalVehiculos++;
}

const promedioHoras: number = totalVehiculos > 0 ? sumaHoras / totalVehiculos : 0;

console.log("\n" + "=".repeat(40));
console.log(`INGRESO TOTAL: $${ingresoTotal.toLocaleString("es-CO")}`);
console.log(`Promedio Permanencia: ${promedioHoras.toFixed(1)} horas`);
console.log("=".repeat(40));