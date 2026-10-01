function cobrarPasajes(numeroPasajeros, tarifa = 2800) {
    let total = numeroPasajeros * tarifa;
    return "Subieron " + numeroPasajeros + " pasajeros. Total recogido: $" + total;
}

console.log(cobrarPasajes(4)); 