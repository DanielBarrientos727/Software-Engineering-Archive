function calcularCostoPan(cantPanDulce, cantPanAlineado) {
    let precioDulce = 300;
    let precioAlineado = 500;
    let total = (cantPanBlando * precioDulce) + (cantPanAlineado * precioAlineado);
    return "El total en la panadería es: $" + total;
}

console.log(calcularCostoPan(5, 2)); // 5 dulces y 2 aliñados