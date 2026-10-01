interface Combo {
    nombre: string;
    precio: number;
}

const combos: Combo[] = [
    { nombre: "Clásica", precio: 15000 },
    { nombre: "Doble Poder", precio: 22000 },
    { nombre: "Mega Fest", precio: 35000 }
];

const pedidos: number[] = [2, 1, 3]; // cantidades por combo

let totalGeneral: number = 0;
let totalCombos: number = 0;

console.log("\n====== MANO BIENVENIDO A BURGER PALACE ======");

for (let i: number = 0; i < combos.length; i++) {
    const nombre: string = combos[i].nombre;
    const precio: number = combos[i].precio;
    const cantidad: number = pedidos[i];
    const subtotal: number = precio * cantidad;

    totalGeneral += subtotal;
    totalCombos += cantidad;

    console.log("\n--- Pedido " + (i + 1) + " ---");
    console.log("Combo: " + nombre);
    console.log("Precio unitario: $" + precio);
    console.log("Cantidad: " + cantidad);
    console.log("Subtotal: $" + subtotal);
}

console.log("\n====== RESUMEN FINAL ======");
console.log("Total de combos pedidos: " + totalCombos);
console.log("Clásica: " + pedidos[0]);
console.log("Doble Poder: " + pedidos[1]);
console.log("Mega Fest: " + pedidos[2]);
console.log("TOTAL A PAGAR: $" + totalGeneral);