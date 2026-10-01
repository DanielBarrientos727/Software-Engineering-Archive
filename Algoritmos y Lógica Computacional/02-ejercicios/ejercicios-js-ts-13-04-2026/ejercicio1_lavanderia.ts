// Tipo de dato para cliente
interface Cliente {
export interface Cliente {
    nombre: string;
    horas: number;
}

// Datos
const clientes: Cliente[] = [
export interface FacturaCliente {
    cliente: Cliente;
    subtotal: number;
    descuento: number;
    total: number;
}

export interface ResumenLavanderia {
    facturas: FacturaCliente[];
    clientes: number;
    clientesConDescuento: number;
    totalGanado: number;
}

export const PRECIO_HORA = 5000;

export const clientes: Cliente[] = [
    { nombre: "pangolin", horas: 15 },
    { nombre: "marulete", horas: 10 },
    { nombre: "amy", horas: 14 },
    { nombre: "robtob", horas: 8 },
    { nombre: "tio gilipollas de cj", horas: 13 }
];

// Configuración
const PRECIO_HORA = 5000;
export function calcularFacturaCliente(cliente: Cliente, precioHora: number): FacturaCliente {
    const subtotal = cliente.horas * precioHora;
    const descuento = cliente.horas >= 12 ? subtotal * 0.3 : 0;
    const total = subtotal - descuento;

// Variables
let totalDia = 0;
let clientesConDescuento = 0;
    return { cliente, subtotal, descuento, total };
}

// Recorrer clientes
for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i];
export function calcularResumenLavanderia(listaClientes: Cliente[], precioHora: number): ResumenLavanderia {
    const facturas = listaClientes.map((cliente) => calcularFacturaCliente(cliente, precioHora));
    const clientesConDescuento = facturas.filter((factura) => factura.descuento > 0).length;
    const totalGanado = facturas.reduce((acc, factura) => acc + factura.total, 0);

    let subtotal = cliente.horas * PRECIO_HORA;
    let descuento = 0;
    return {
        facturas,
        clientes: listaClientes.length,
        clientesConDescuento,
        totalGanado
    };
}

    // Si tiene más de 12 horas → descuento
    if (cliente.horas >= 12) {
        descuento = subtotal * 0.30;
        clientesConDescuento++;
export function reportarLavanderia(resumen: ResumenLavanderia): void {
    for (const [i, factura] of resumen.facturas.entries()) {
        console.log("------ CLIENTE " + (i + 1) + " ------");
        console.log("Nombre: " + factura.cliente.nombre);
        console.log("Horas: " + factura.cliente.horas);
        console.log("Subtotal: $" + factura.subtotal);
        console.log("Descuento: $" + factura.descuento);
        console.log("Total: $" + factura.total);
        console.log("");
    }

    let total = subtotal - descuento;
    totalDia += total;

    // Mostrar info
    console.log("------ CLIENTE " + (i + 1) + " ------");
    console.log("Nombre: " + cliente.nombre);
    console.log("Horas: " + cliente.horas);
    console.log("Subtotal: $" + subtotal);
    console.log("Descuento: $" + descuento);
    console.log("Total: $" + total);
    console.log("");
    console.log("===== RESUMEN =====");
    console.log("Clientes: " + resumen.clientes);
    console.log("Con descuento: " + resumen.clientesConDescuento);
    console.log("Total ganado: $" + resumen.totalGanado);
}

export function ejecutarEjercicio1(): void {
    const resumen = calcularResumenLavanderia(clientes, PRECIO_HORA);
    reportarLavanderia(resumen);
}

// Resumen final
console.log("===== RESUMEN =====");
console.log("Clientes: " + clientes.length);
console.log("Con descuento: " + clientesConDescuento);
console.log("Total ganado: $" + totalDia);
ejecutarEjercicio1();