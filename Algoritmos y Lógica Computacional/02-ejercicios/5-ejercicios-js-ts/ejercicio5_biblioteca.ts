/**
 * SISTEMA DE GESTIÓN DE MULTAS - BIBLIOTECH
 * Calcula sanciones por préstamos que exceden el límite de 7 días.
 */

// --- CONFIGURACIÓN DE POLÍTICAS ---
const DIAS_GRACIA: number = 7;
const MULTA_DIARIA: number = 1500;
const RECARGO_GRAVE: number = 10000; // Se aplica si el retraso supera los 15 días
const UMBRAL_RECARGO: number = 15;

// --- BASE DE DATOS ---
const usuarios: string[] = ["Ana Garcia", "Pedro Ramirez", "Lucia Torres"];
// Cada sub-arreglo representa los días que el usuario tuvo cada libro
const prestamosPorUsuario: number[][] = [
    [5, 10, 20], // Ana
    [3, 8],      // Pedro
    [7, 15, 6]   // Lucia
];

// --- ESTADÍSTICAS GLOBALES ---
let totalMultasRecaudadas: number = 0;
let contadorLibrosPuntuales: number = 0;
let contadorLibrosRetrasados: number = 0;

/**
 * PROCESAMIENTO PRINCIPAL
 * Recorremos los usuarios y, dentro de cada uno, sus libros prestados.
 */
for (let i = 0; i < usuarios.length; i++) {
    const nombre = usuarios[i];
    const libros = prestamosPorUsuario[i];
    let acumuladoUsuario: number = 0;

    console.log(`\n--- EXPEDIENTE: ${nombre.toUpperCase()} ---`);
    console.log(`Libros procesados: ${libros.length}`);

    // Procesamiento individual de libros
    for (let j = 0; j < libros.length; j++) {
        const diasPrestamo = libros[j];
        
        // Calculamos los días de retraso (mínimo 0)
        const diasRetraso = Math.max(0, diasPrestamo - DIAS_GRACIA);
        let multaLibro = 0;

        // Lógica de cálculo de multa
        if (diasRetraso === 0) {
            contadorLibrosPuntuales++;
            console.log(`  Libro ${j + 1}: [PUNTUAL] (${diasPrestamo} días)`);
        } else {
            contadorLibrosRetrasados++;
            
            // Cálculo base: días de retraso por la multa diaria
            multaLibro = diasRetraso * MULTA_DIARIA;

            // Si el retraso es grave, se añade la multa adicional
            if (diasRetraso > UMBRAL_RECARGO) {
                multaLibro += RECARGO_GRAVE;
            }

            console.log(`  Libro ${j + 1}: [RETRASO] ${diasRetraso} días extra - Multa: $${multaLibro.toLocaleString("es-CO")}`);
        }

        acumuladoUsuario += multaLibro;
    }

    // Clasificación del usuario según su comportamiento
    const estadoUsuario = acumuladoUsuario > 0 ? "⚠️ DEUDOR" : "✅ AL DÍA";
    console.log(`SUBTOTAL USUARIO: $${acumuladoUsuario.toLocaleString("es-CO")} - ${estadoUsuario}`);

    totalMultasRecaudadas += acumuladoUsuario;
}

/**
 * REPORTE GERENCIAL FINAL
 */
console.log("\n" + "=".repeat(45));
console.log("          RESUMEN EJECUTIVO BIBLIOTECH");
console.log("=".repeat(45));
console.log(`Usuarios auditados:    ${usuarios.length}`);
console.log(`Total libros:          ${contadorLibrosPuntuales + contadorLibrosRetrasados}`);
console.log(`Devoluciones a tiempo: ${contadorLibrosPuntuales}`);
console.log(`Devoluciones tarde:    ${contadorLibrosRetrasados}`);
console.log("-".repeat(45));
console.log(`TOTAL RECAUDACIÓN:     $${totalMultasRecaudadas.toLocaleString("es-CO")}`);
console.log("=".repeat(45));