const jugadores = [

    {
        nombre: "Carlos",
        puntaje: 150
    },

    {
        nombre: "Laura",
        puntaje: 300
    },

    {
        nombre: "Camilo",
        puntaje: 200
    },

    {
        nombre: "Ana",
        puntaje: 500
    }

]

// COPIA ORDENADA
const ranking = [...jugadores].sort(
    (a, b) => b.puntaje - a.puntaje
)

console.log("Ranking:")
console.log(ranking)


// TOP 3
const top3 = ranking.slice(0, 3)

console.log("TOP 3")

top3.forEach((jugador, index) => {

    console.log(
        `🏆 ${index + 1}. ${jugador.nombre} - ${jugador.puntaje}`
    )

})


// JOIN
const nombreslist = jugadores.map(
    jugador => jugador.nombre
)

console.log("Nombres:")
console.log(nombres.join(", "))