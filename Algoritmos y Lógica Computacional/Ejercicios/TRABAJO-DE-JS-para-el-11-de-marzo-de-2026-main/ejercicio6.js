function buscarFruta(inventario, frutaDeseada) {
    if (inventario.includes(frutaDeseada)) {
        return "Sí tenemos " + frutaDeseada + " en existencia.";       // .includes()va a revisa si el objeto en cuestion que buscamos está dentro de esa lista, y devuelve true o false
    }
    return "Se nos agotó el/la " + frutaDeseada + ".";
}

let frutasDisponibles = ["Manzana", "Pera", "Banano", "Mango"];
console.log(buscarFruta(frutasDisponibles, "Mango"));