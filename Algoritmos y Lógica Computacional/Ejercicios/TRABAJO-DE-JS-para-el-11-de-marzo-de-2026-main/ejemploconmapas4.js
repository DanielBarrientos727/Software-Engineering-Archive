const usuario = new Map()

usuario.set("otro", {nombre: 'Juan, edad: 30'}) // en vez de push, usamos set en el caso de Map, es porque lineal, puedo agregar todos los elementos que yo quiera 
usuario.set(3, ["Manzana", "Pera", "Naranja"])
usuario.set(4, 'pedro')

console.log(usuario.delete(4) ) //Eliminar
console.log(usuario.has(4) ) // verificar
console.log(usuario.size ) //mirar tamaño del mapa