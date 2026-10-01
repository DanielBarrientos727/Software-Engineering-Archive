function servirCafes(cantidadSolicitada) {
    let cafesServidos = 0;
    
    do {
        cafesServidos++;
        console.log("Sirviendo café número: " + cafesServidos);
    } while (cafesServidos < cantidadSolicitada);
    
    return "Pedido completado. Total servidos: " + cafesServidos;
}

console.log(servirCafes(3));