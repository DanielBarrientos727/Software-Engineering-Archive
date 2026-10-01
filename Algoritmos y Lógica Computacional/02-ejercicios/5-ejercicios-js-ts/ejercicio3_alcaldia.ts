/**
 * PROGRAMA DE SUBSIDIOS - ALCALDÍA DE ARMENIA 2026
 * Este script calcula los subsidios para adultos mayores basados en su edad
 * y genera un reporte detallado del presupuesto necesario.
 */

// --- CONFIGURACIÓN DE CONSTANTES (Valores fijos del negocio) ---
const SALARIO_MINIMO: number = 1300000;

// Porcentajes de subsidio según ley municipal
const PORC_SUBSIDIO_BASE: number = 0.12; // 12% para 60-80 años
const PORC_SUBSIDIO_SENIOR: number = 0.15; // 15% para mayores de 80

const SUBSIDIO_12: number = SALARIO_MINIMO * PORC_SUBSIDIO_BASE;
const SUBSIDIO_15: number = SALARIO_MINIMO * PORC_SUBSIDIO_SENIOR;

// --- FUENTE DE DATOS ---
const nombres: string[] = ["Carlos Pérez", "María López", "Juan Torres", "Rosa Gómez", "Luis Herrera"];
const edades: number[] = [65, 82, 45, 78, 91];

// --- ACUMULADORES Y ESTADÍSTICAS ---
let beneficiarios60a80: number = 0;
let beneficiarios80mas: number = 0;
let noAplican: number = 0;
let presupuestoTotal: number = 0;

/**
 * PROCESAMIENTO DE LA BASE DE DATOS
 * Se analiza cada registro para determinar elegibilidad y montos.
 */
for (let i: number = 0; i < nombres.length; i++) {
    const nombre: string = nombres[i];
    const edad: number = edades[i];
    
    let subsidioAplicado: number = 0;
    let porcentajeTexto: number = 0;
    let categoria: string = "";
    let esElegible: boolean = false;

    // Lógica de Segmentación por Edad
    if (edad >= 60 && edad <= 80) {
        // Rango: Adulto Mayor Estándar
        subsidioAplicado = SUBSIDIO_12;
        porcentajeTexto = PORC_SUBSIDIO_BASE * 100;
        categoria = "Adulto Mayor";
        beneficiarios60a80++;
        esElegible = true;
    } 
    else if (edad > 80) {
        // Rango: Adulto Mayor Senior
        subsidioAplicado = SUBSIDIO_15;
        porcentajeTexto = PORC_SUBSIDIO_SENIOR * 100;
        categoria = "Adulto Mayor Senior";
        beneficiarios80mas++;
        esElegible = true;
    } 
    else {
        // Caso: Menor de 60 años
        noAplican++;
    }

    // Si la persona es apta para el subsidio, se procesa la salida y el gasto
    if (esElegible) {
        presupuestoTotal += subsidioAplicado;

        console.log(`\n--- PERSONA ${i + 1}: ${nombre.toUpperCase()} ---`);
        console.log(`Edad:      ${edad} años`);
        console.log(`Categoría: ${categoria}`);
        console.log(`Subsidio:  $${subsidioAplicado.toLocaleString("es-CO")} (${porcentajeTexto}%)`);
    }
}

/**
 * GENERACIÓN DEL INFORME CONSOLIDADO
 */
console.log("\n" + "=".repeat(45));
console.log("       INFORME ALCALDÍA DE ARMENIA");
console.log("=".repeat(45));
console.log(`Total ciudadanos registrados:  ${nombres.length}`);
console.log(`Beneficiarios 60-80 años:      ${beneficiarios60a80}`);
console.log(`Beneficiarios > 80 años:       ${beneficiarios80mas}`);
console.log(`Ciudadanos no elegibles:       ${noAplican}`);
console.log("-".repeat(45));
console.log(`PRESUPUESTO TOTAL REQUERIDO:   $${presupuestoTotal.toLocaleString("es-CO")}`);
console.log("=".repeat(45));