// juegoejercicio10.js

function jugarLoteria(numeroApostado, billeteComprado) {
    let numeroGanador = 42;

    if (billeteComprado === false) {
        return "No puedes ganar si no compraste el billete.";
    }

    if (numeroApostado === numeroGanador) {
        return "¡GANASTE! El número " + numeroApostado + " era el ganador. ¡A reclamar!";
    } else {
        return "No fue esta vez. El número ganador era el " + numeroGanador + ".";
    }
}

// Simulamos dos intentos
alert(jugarLoteria(99, true));  // Pierde
alert(jugarLoteria(42, true));  // Gana
alert(jugarLoteria(15, false)); // No compró el billete :/ git ini