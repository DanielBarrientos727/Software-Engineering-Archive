function calcularDiasAhorro(metaDinero, ahorroDiario) {
    let ahorrado = 0;
    let dias = 0;
    
    while (ahorrado < metaDinero) {
        ahorrado = ahorrado + ahorroDiario;
        dias++;
    }
    
    return "Te tomará " + dias + " días ahorrar $" + metaDinero;
}

console.log(calcularDiasAhorro(50000, 5000)); // Meta unos 50 lukitas, metiendo 5 lukukitas a diarios, soy pobre...