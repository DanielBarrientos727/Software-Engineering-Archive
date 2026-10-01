export interface Combo {
    nombre: string;
    precio: number;
}

export interface DetalleCombo {
    combo: Combo;
    cantidad: number;
    subtotal: number;
}

export interface ResumenHamburguesas {
    detalles: DetalleCombo[];
    cantidadTotalCombos: number;
    totalDinero: number;
}

export const combos: Combo[] = [
    { nombre: "Clásica", precio: 15000 },
    { nombre: "Doble Poder", precio: 22000 },
    { nombre: "Mega Fest", precio: 35000 }
];

export const pedidos: Record<string, number> = {
    "Clásica": 2,
    "Doble Poder": 1,
    "Mega Fest": 3
};

export function calcularDetalleCombo(combo: Combo, pedido: Record<string, number>): DetalleCombo {
    const cantidad = pedido[combo.nombre] ?? 0;
    const subtotal = combo.precio * cantidad;

    return { combo, cantidad, subtotal };
}

export function calcularResumenHamburguesas(listaCombos: Combo[], pedido: Record<string, number>): ResumenHamburguesas {
    const detalles = listaCombos.map((combo) => calcularDetalleCombo(combo, pedido));
    const cantidadTotalCombos = detalles.reduce((acc, detalle) => acc + detalle.cantidad, 0);
    const totalDinero = detalles.reduce((acc, detalle) => acc + detalle.subtotal, 0);

    return { detalles, cantidadTotalCombos, totalDinero };
}

export function reportarHamburguesas(resumen: ResumenHamburguesas): void {
    console.log("\n" + "=".repeat(40));
    console.log("   BIENVENIDO A BURGER PALACE");
    console.log("=".repeat(40));

    for (const detalle of resumen.detalles) {
        console.log(`\nProducto:   ${detalle.combo.nombre}`);
        console.log(`Unitario:   $${detalle.combo.precio.toLocaleString("es-CO")}`);
        console.log(`Cantidad:   ${detalle.cantidad}`);
        console.log(`Subtotal:   $${detalle.subtotal.toLocaleString("es-CO")}`);
    }

    console.log("\n" + "=".repeat(40));
    console.log("          RESUMEN FINAL");
    console.log("=".repeat(40));

    for (const detalle of resumen.detalles) {
        console.log(`${detalle.combo.nombre.padEnd(15)}: ${detalle.cantidad} unidades`);
    }

    console.log("-".repeat(40));
    console.log(`TOTAL PRODUCTOS:  ${resumen.cantidadTotalCombos}`);
    console.log(`TOTAL A PAGAR:    $${resumen.totalDinero.toLocaleString("es-CO")}`);
    console.log("=".repeat(40));
    console.log("   ¡Gracias por su compra!");
}

export function ejecutarEjercicio2(): void {
    const resumen = calcularResumenHamburguesas(combos, pedidos);
    reportarHamburguesas(resumen);
}

ejecutarEjercicio2();
