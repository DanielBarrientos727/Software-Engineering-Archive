function validarEntradaCine(edad, tieneBoleta) {
    if (edad >= 15 && tieneBoleta === true) {
        return "Bienvenido a la función.";
    }
    return "No cumples los requisitos para entrar.";
}

console.log(validarEntradaCine(16, true));