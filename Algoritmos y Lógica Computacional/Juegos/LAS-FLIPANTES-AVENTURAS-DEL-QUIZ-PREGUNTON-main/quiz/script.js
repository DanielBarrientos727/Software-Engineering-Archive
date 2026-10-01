//mano arreglo lo que contiene las respuestas correctas jsjsjs
let correctas = [1,1,3,3,1,1,3,2]

//aqui se guardaran las respuesta

let opcion_elegida=[];

let cantidad_correctas=0;

//funcion que toma el numr d preguntas y el imput elegido de esa pregunta

function respuesta(num_pregunta, seleccionada){
    //guardo la respuesta elegida
    opcion_elegida[num_pregunta] = seleccionada.value;

    //el siguiente codigo es para poner en color blanco
    //el fondo de los inputs para cuando elige otra opcion

    //armar el id para seleccionar el section correspondiente
    id="p" + num_pregunta;

    labels = document.getElementById(id).childNodes;
    labels[3].style.backgroundColor = "#ffffff";
    labels[5].style.backgroundColor = "#ffffff";
    labels[7].style.backgroundColor = "#ffffff";
    //doy el color a el label seleccionado
    seleccionada.parentNode.style.backgroundColor = "#502ebe";
}

// FUNCION QUE COMPARA LOS ARREGLOS PARA SABER CUANTAS ESTUVIERON CORRECTAS
function corregir() {
    cantidad_correctas = 0;
    for(i=0; i < correctas.length; i++) {
        if (correctas[i]==opcion_elegida[i]) {
            cantidad_correctas++;
        }

    }

    document.getElementById("resultado").innerHTML = cantidad_correctas;
}

