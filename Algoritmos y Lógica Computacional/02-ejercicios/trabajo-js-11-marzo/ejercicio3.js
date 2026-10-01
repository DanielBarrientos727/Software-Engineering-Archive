function consultarPrecioPapeleria(articulo) {
    switch (articulo.toLowerCase()) {   // toLowerCase es pa'que todo sea en minuscula
        case "cuaderno":
            return 3500;
        case "lapicero":
            return 1200;
        case "borrador":
            return 500;
        default:
            return 0; // Si no existe, vale 0
    }
}

console.log("El lapicero cuesta: $" + consultarPrecioPapeleria("lapicero"));