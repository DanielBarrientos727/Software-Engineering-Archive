// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta constante textual representa un nombre.
const studentName: string = "Camila";

// Esta constante numérica representa una nota.
const finalGrade: number = 4.7;

// Esta constante booleana indica si se aprobó la materia.
const passed: boolean = true;

// Esta tupla guarda latitud y longitud con orden fijo.
const coordinates: [number, number] = [4.6097, -74.0817];

// Este arreglo de solo lectura protege valores constantes.
const primeNumbers: readonly number[] = [2, 3, 5, 7, 11];

// Este `console.log` imprime los tipos básicos.
console.log({ studentName, finalGrade, passed });

// Este `console.log` imprime la tupla geográfica.
console.log("Coordenadas:", coordinates);

// Este `console.log` imprime el arreglo de solo lectura.
console.log("Primos:", primeNumbers);
