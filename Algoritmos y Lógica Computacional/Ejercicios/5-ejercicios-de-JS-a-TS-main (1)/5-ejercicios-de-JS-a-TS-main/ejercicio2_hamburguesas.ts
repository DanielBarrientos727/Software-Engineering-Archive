/**
 * Definición del modelo de datos para un Combo.
 * Usamos una interfaz para asegurar que cada combo tenga nombre y precio.
 */
interface Combo {
    nombre: string;
    precio: number;
}

/**
 * Catálogo de productos disponibles.
 * Centralizar los datos aquí facilita añadir nuevos combos en el futuro.
 */
const combos: Combo[] = [
    { nombre: "Clásica", precio: 15000 },
    { nombre: "Doble Poder", precio: 22000 },
    { nombre: "Mega Fest", precio: 35000 }
];

/**
 * Cantidades solicitadas por el cliente.
 * Importante: El orden debe coincidir con el array de 'combos'.
 */
const pedidos: number[] = [2, 1, 3]; // [Cant. Clásica, Cant. Doble, Cant. Mega]

// Variables para acumular los totales del pedido global
let totalDinero: number = 0;
let cantidadTotalCombos: number = 0;

console.log("\n" + "=".repeat(40));
console.log("   BIENVENIDO A BURGER PALACE");
console.log("=".repeat(40));

/**
 * Procesamiento del pedido.
 * Recorremos el catálogo de combos y calculamos subtotales basados en los pedidos.
 */
for (let i = 0; i < combos.length; i++) {
    // Desestructuración: Extrae 'nombre' y 'precio' del objeto actual de forma limpia
    const { nombre, precio } = combos[i];
    const cantidad = pedidos[i];
    
    // Cálculo del costo por tipo de combo
    const subtotal = precio * cantidad;

    // Acumulación de estadísticas generales
    totalDinero += subtotal;
    cantidadTotalCombos += cantidad;

    // Impresión detallada de cada línea del pedido
    console.log(`\n[Pedido #${i + 1}]`);
    console.log(`Producto:   ${nombre}`);
    console.log(`Unitario:   $${precio.toLocaleString("es-CO")}`);
    console.log(`Cantidad:   ${cantidad}`);
    console.log(`Subtotal:   $${subtotal.toLocaleString("es-CO")}`);
}

/**
 * Resumen final de la factura.
 * Presentamos los datos consolidados de manera organizada.
 */
console.log("\n" + "=".repeat(40));
console.log("          RESUMEN FINAL");
console.log("=".repeat(40));

// Detalle por categoría (dinámico)
combos.forEach((combo, index) => {
    console.log(`${combo.nombre.padEnd(15)}: ${pedidos[index]} unidades`);
});

console.log("-".repeat(40));
console.log(`TOTAL PRODUCTOS:  ${cantidadTotalCombos}`);
console.log(`TOTAL A PAGAR:    $${totalDinero.toLocaleString("es-CO")}`);
console.log("=".repeat(40));
console.log("   ¡Gracias por su compra!");