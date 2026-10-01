const cliente = {
    nombre: "Juan",
    turno: "noche",
    ciudad: "Tel aviv",
    edad: 67, 
}

let clientes = []
clientes.push(cliente)
clientes.push({
    nombre: "Luis",
    turno: "noche",
    ciudad: "Haifa",
    edad: 12, 
})


clientes.push({
    nombre: "JEJE",
    turno: "mañana",
    ciudad: "Charlie Kirk City",
    edad: 67, 
})

let clientesMayores = clientes.filter(cliente => cliente.edad > 60)
console.log(`cantidad de clientes mayores: ${clientesMayores.length}`) // → 2