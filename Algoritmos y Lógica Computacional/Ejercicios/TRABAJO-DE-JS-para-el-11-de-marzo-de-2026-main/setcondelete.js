const numeros = new Set();

numeros.add(1);
numeros.add(2);
numeros.add(1);
numeros.add(1);
numeros.add(1);
numeros.delete(1) // set(2) {1,2}
numeros.clear()

// Y si no limpia puede obtener el tamaño
console.log(numeros.size); // set(2) {1,2}

numeros.forEach(numero => {
    console.log(numero); // 1,2 
});

// que es class y objeto en OPP estudiar que es la progrmacion rientada en objeto, JS no es ferte en POO, pero si en python y java, que es POO, JS acepta en PÓO? SE PUEDE HACER LO MBASICO, DAME EJEMPLOS, QUE ES UNA INSTANCIA WEON, QUE ES UNA CLASE E INSTANCIA, QUE ES GET Y SET, en ese caso, que es static, que es herencia, tienes que sera una diapositiva tipo juego; Y LODEBO ESTUDIAR
// DEO ESTUDIARLO, muy bien, debo ver videos de asincronismo, ver videos y estudiar que es una promesa,, que es el asyn/away y debemos trae un juego utilizando asincronismo y de una vez estudiar una excepcion yque es el try, el cach y el finally.... y tenemosd quiz de asincronismo y todo eso