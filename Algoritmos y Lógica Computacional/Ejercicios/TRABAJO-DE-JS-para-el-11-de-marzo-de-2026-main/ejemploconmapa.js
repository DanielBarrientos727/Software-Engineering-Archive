const usuario = new Map()

usuario.set('otro', 'juan') // en vez de push, usamos set en el caso de Map, es porque lineal, puedo agregar todos los elementos que yo quiera 
usuario.set(3, 'Maria')
usuario.set(4, 'pedro')

console.log(usuario.get("otro")) // get se usa para trae las claves, puede ser spring o cualquier vaina
