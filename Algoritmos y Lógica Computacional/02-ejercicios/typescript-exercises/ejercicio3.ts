// Constantes
const SALARIO_MINIMO: number = 1300000;
const SUBSIDIO_12: number = SALARIO_MINIMO * 0.12;
const SUBSIDIO_15: number = SALARIO_MINIMO * 0.15;

// Datos
const nombres: string[] = ["Carlos Pérez", "María López", "Juan Torres", "Rosa Gómez", "Luis Herrera"];
const edades: number[] = [65, 82, 45, 78, 91];

// Contadores
let totalRegistrados: number = 0;
let beneficiarios60a80: number = 0;
let beneficiarios80mas: number = 0;
let noAplican: number = 0;
let presupuestoTotal: number = 0;

for (let i: number = 0; i < nombres.length; i++) {

    let nombre: string = nombres[i];
    let edad: number = edades[i];
    let porcentaje: number = 0;
    let subsidio: number = 0;
    let categoria: string = "";

    if (edad >= 60 && edad <= 80) {
        porcentaje = 12;
        subsidio = SUBSIDIO_12;
        beneficiarios60a80++;
        presupuestoTotal += subsidio;
    } else if (edad > 80) {
        porcentaje = 15;
        subsidio = SUBSIDIO_15;
        beneficiarios80mas++;
        presupuestoTotal += subsidio;
    } else {
        noAplican++;
    }

    if (edad >= 80) {
        categoria = "Adulto Mayor Senior";
    } else {
        categoria = "Adulto Mayor";
    }

    if (edad >= 60) {
        console.log("\n--- PERSONA " + (i + 1) + ": " + nombre + " ---");
        console.log("Edad: " + edad + " anos");
        console.log("Categoria: " + categoria);
        console.log("Subsidio (" + porcentaje + "%): $" + subsidio.toLocaleString("es-CO"));
    }

    totalRegistrados++;
}

console.log("\n=== INFORME ALCALDIA DE ARMENIA ===");
console.log("Total registrados: " + totalRegistrados);
console.log("Beneficiarios (60-80 anos): " + beneficiarios60a80 + " - Subsidio: $" + SUBSIDIO_12.toLocaleString("es-CO") + " c/u");
console.log("Beneficiarios (>80 anos): " + beneficiarios80mas + " - Subsidio: $" + SUBSIDIO_15.toLocaleString("es-CO") + " c/u");
console.log("No aplican: " + noAplican);
console.log("PRESUPUESTO TOTAL: $" + presupuestoTotal.toLocaleString("es-CO"));