const empleadosList = [
    {
        id: 1,
        nombre: "Carlos",
        cargo: "Programador"
    },
    {
        id: 5,
        nombre: "Laura",
        cargo: "Diseñadora"
    },
    {
        id: 8,
        nombre: "Camilo",
        cargo: "Gerente"
    }
]

const empleadoEncontrado = empleadosList.find(
    empleado => empleado.id === 5
)

console.log("Empleado encontrado:")
console.log(empleadoEncontrado)

const posicion = empleadosList.findIndex(
    empleado => empleado.id === 5
)

console.log("Posición:")
console.log(posicion)


// SOME
const existeGerente = empleadosList.some(
    empleado => empleado.cargo === "Gerente"
)

console.log("¿Existe un gerente?")
console.log(existeGerente)


// MAP
const nombres = empleadosList.map(
    empleado => empleado.nombre
)

console.log("Nombres:")
console.log(nombres)


// FILTER
const programadores = empleadosList.filter(
    empleado => empleado.cargo === "Programador"
)

console.log("Programadores:")
console.log(programadores)


// LENGTH
console.log("Cantidad de empleados:")
console.log(empleadosList.length)