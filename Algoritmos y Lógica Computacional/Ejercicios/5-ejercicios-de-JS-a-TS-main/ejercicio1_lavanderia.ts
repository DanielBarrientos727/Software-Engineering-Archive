/**
 * Estructura de datos para representar a un cliente.
 */
interface Cliente {
    nombre: string;
    horas: number; // Cantidad de horas de alquiler
}

// Configuración de constantes para facilitar cambios futuros
const PRECIO_HORA: number = 5000;
const UMBRAL_DESCUENTO: number = 12; // Horas mínimas para aplicar descuento
const PORCENTAJE_DESCUENTO: number = 0.30; // 30%

/**
 * Base de datos ficticia de los clientes del día.
 */
const clientes: Cliente[] = [
    { nombre: "pangolin", horas: 15 },
    { nombre: "marulete", horas: 10 },
    { nombre: "amy", horas: 14 },
    { nombre: "robtob", horas: 8 },
    { nombre: "tio gilipollas de cj", horas: 13 }
];

// Variables acumuladoras para el reporte final
let totalDia: number = 0;
let clientesConDescuento: number = 0;

/**
 * Procesamiento de la facturación
 * Recorremos la lista de clientes para calcular totales individuales y globales.
 */
for (let i: number = 0; i < clientes.length; i++) {
    // Desestructuración para obtener datos de forma más limpia
    const { nombre, horas } = clientes[i];

    // Cálculo inicial basado en la tarifa base
    const subtotal: number = horas * PRECIO_HORA;
    let descuento: number = 0;
    let total: number = 0;

    /**
     * Lógica de Negocio:
     * Si el cliente alquila más de 12 horas, recibe un beneficio del 30%.
     */
    if (horas > UMBRAL_DESCUENTO) {
        descuento = subtotal * PORCENTAJE_DESCUENTO;
        total = subtotal - descuento;
        clientesConDescuento++;
    } else {
        total = subtotal;
    }

    // --- Salida de información por consola ---
    console.log(`\n--- CLIENTE ${i + 1}: ${nombre.toUpperCase()} ---`);
    console.log(`Horas alquiladas: ${horas}`);
    console.log(`Subtotal: $${subtotal.toLocaleString("es-CO")}`);
    console.log(`Descuento (${PORCENTAJE_DESCUENTO * 100}%): $${descuento.toLocaleString("es-CO")}`);
    
    // Operador ternario para un mensaje de estado rápido
    console.log(horas > UMBRAL_DESCUENTO ? "Estado: [CON DESCUENTO]" : "Estado: [SIN DESCUENTO]");
    console.log(`Total a pagar: $${total.toLocaleString("es-CO")}`);

    // Sumamos el pago de este cliente al gran total del día
    totalDia += total;
}

/**
 * Reporte Final de Cierre de Caja
 */
console.log("\n" + "=".repeat(25));
console.log("   RESUMEN DEL DÍA");
console.log("=".repeat(25));
console.log(`Total de clientes:       ${clientes.length}`);
console.log(`Clientes beneficiados:   ${clientesConDescuento}`);
console.log(`Ingreso total de caja:   $${totalDia.toLocaleString("es-CO")}`);
console.log("=".repeat(25));