const multaDiaria: number = 1500;
const multaAdicional: number = 10000;

let totalMultas: number = 0;
let totalLibros: number = 0;
let librosConRetraso: number = 0;
let librosPuntuales: number = 0;
let totalUsuarios: number = 0;

// Datos hardcodeados
const usuarios: string[] = ["Ana Garcia", "Pedro Ramirez", "Lucia Torres"];
const librosPorUsuario: number[][] = [
    [5, 10, 20],
    [3, 8],
    [7, 15, 6]
];

for (let i: number = 0; i < usuarios.length; i++) {

    let nombreUsuario: string = usuarios[i];
    let libros: number[] = librosPorUsuario[i];
    let cantidadLibros: number = libros.length;
    let multaUsuario: number = 0;

    console.log("\n--- USUARIO " + (i + 1) + ": " + nombreUsuario + " ---");
    console.log("Libros devueltos: " + cantidadLibros);

    for (let j: number = 0; j < cantidadLibros; j++) {

        let diasPrestamo: number = libros[j];
        let diasRetraso: number = 0;

        if (diasPrestamo > 7) {
            diasRetraso = diasPrestamo - 7;
        }

        let multaLibro: number = 0;

        if (diasRetraso === 0) {
            librosPuntuales++;
        } else if (diasRetraso <= 15) {
            multaLibro = diasRetraso * multaDiaria;
            librosConRetraso++;
        } else {
            multaLibro = (diasRetraso * multaDiaria) + multaAdicional;
            librosConRetraso++;
        }

        multaUsuario += multaLibro;
        totalLibros++;

        if (diasRetraso === 0) {
            console.log("Libro " + (j + 1) + ": " + diasPrestamo + " dias - Sin retraso - Multa: $0");
        } else {
            console.log("Libro " + (j + 1) + ": " + diasPrestamo + " dias - " + diasRetraso + " dias de retraso - Multa: $" + multaLibro.toLocaleString("es-CO"));
        }
    }

    let clasificacion: string = "";
    if (multaUsuario > 0) {
        clasificacion = "CON RETRASO";
    } else {
        clasificacion = "PUNTUAL";
    }

    console.log("Multa total usuario: $" + multaUsuario.toLocaleString("es-CO") + " - " + clasificacion);

    totalMultas += multaUsuario;
    totalUsuarios++;
}

console.log("\n=== RESUMEN BIBLIOTECH ===");
console.log("Usuarios atendidos: " + totalUsuarios);
console.log("Total libros: " + totalLibros);
console.log("Libros puntuales: " + librosPuntuales);
console.log("Libros con retraso: " + librosConRetraso);
console.log("MULTAS RECAUDADAS: $" + totalMultas.toLocaleString("es-CO"));