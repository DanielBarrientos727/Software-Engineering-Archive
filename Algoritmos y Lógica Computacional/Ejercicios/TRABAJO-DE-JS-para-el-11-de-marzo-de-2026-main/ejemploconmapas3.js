const usuario = new Map()

usuario.set("otro", {nombre: 'Juan, edad: 30'}) // en vez de push, usamos set en el caso de Map, es porque lineal, puedo agregar todos los elementos que yo quiera 
usuario.set(3, ["Manzana", "Pera", "Naranja"])
usuario.set(4, 'pedro')

console.log(usuario.has(3)) // get se usa para trae las claves, puede ser spring o cualquier vaina 
// depaso, si es texto se "." y [ ] con numeros
//. has es para decir si es verdadero o falso 


