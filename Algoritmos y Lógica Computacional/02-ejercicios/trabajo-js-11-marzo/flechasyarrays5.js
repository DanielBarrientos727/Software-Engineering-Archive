// flechas y arrays
let clientes = []
clientes.push("Lina") // Agrega lina (push estaba mal escrito: "puhh")
clientes.push("Sofia") // agrega sofia
clientes.push("Camila") // AGREGA Camila

// Faltaba || para unir las dos condiciones y cerrar el paréntesis
let filtrar = clientes.filter(cliente => cliente.startsWith("S") || cliente.startsWith("L")) // lo que comiencen con s

// "let" se quita porque filtrar ya fue declarado arriba, y el parámetro debe ser "cliente" (sin s)
filtrar.forEach(cliente => console.log(cliente))

// "let" se quita porque filtrar ya fue declarado arriba
filtrar.map(cliente => console.log(cliente))

console.log(clientes)