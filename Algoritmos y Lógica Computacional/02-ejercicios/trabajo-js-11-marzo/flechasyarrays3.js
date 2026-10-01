// flechas y arrays

let numeros = ["Santiago, Pangolin, Maria, Carlos"]

let arrayTransformado = numeros.map(x => x.length > 4 ? x.toUpperCase() : x.toLowerCase()) // es ternario y flecha
console.log(arrayTransformado)