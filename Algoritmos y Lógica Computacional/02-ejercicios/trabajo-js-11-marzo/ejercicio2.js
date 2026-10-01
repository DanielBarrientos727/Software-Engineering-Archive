function calcularPrecioHuevos(cantidad) {
    if (cantidad >= 30) {
        return cantidad * 400; // Precio a por mayor
    } else {
        return cantidad * 500; // Precio por unidad
    }
}

let totalHuevos = calcularPrecioHuevos(30);
console.log("Total a pagar en la huevera barrientos es: $" + totalHuevos);