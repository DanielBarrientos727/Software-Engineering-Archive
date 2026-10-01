const readline = require("readline");

// crear interfaz de consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const opciones = ["piedra", "papel", "tijera"];

// función para decidir ganador
function determinarGanador(jugador, cpu) {

  if (jugador === cpu) return "empate";

  if (
    (jugador === "piedra" && cpu === "tijera") ||
    (jugador === "papel" && cpu === "piedra") ||
    (jugador === "tijera" && cpu === "papel")
  ) {
    return "ganaste";
  }

  return "perdiste";
}

// juego principal
function jugar() {
  rl.question("\nElige piedra, papel o tijera: ", (respuesta) => {

    const jugador = respuesta.toLowerCase();

    // validar entrada
    if (!opciones.includes(jugador)) {
      console.log("⚠ Opción inválida.");
      return jugar();
    }

    // elección CPU aleatoria
    const cpu = opciones[Math.floor(Math.random() * 3)];

    console.log(`🙋 Tú elegiste: ${jugador}`);
    console.log(`🤖 CPU eligió: ${cpu}`);

    const resultado = determinarGanador(jugador, cpu);

    console.log(`🏁 Resultado: ${resultado.toUpperCase()}`);

    // jugar otra vez
    rl.question("\n¿Jugar otra vez? (s/n): ", (resp) => {
      if (resp.toLowerCase() === "s") {
        jugar();
      } else {
        console.log("👋 Gracias por jugar");
        rl.close();
      }
    });

  });
}

// iniciar juego
console.log("🎮 PIEDRA · PAPEL · TIJERA (Terminal)");
jugar();