const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const preguntar = (msg) => new Promise(resolve => rl.question(msg, resolve));

const PALOS = ['♠', '♥', '♦', '♣'];
const VALORES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

const crearBaraja = () => PALOS.flatMap(p => VALORES.map(v => `${v}${p}`));

const shuffleBaraja = (b) => {
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

const valorCarta = (carta) => {
  const v = carta.slice(0, -1);
  return v === 'A' ? 11 : ['J','Q','K'].includes(v) ? 10 : parseInt(v);
};

const calcularMano = (mano) => {
  let total = mano.reduce((sum, c) => sum + valorCarta(c), 0);
  let ases = mano.filter(c => c.slice(0, -1) === 'A').length;
  while (total > 21 && ases > 0) { total -= 10; ases--; }
  return total;
};

const mostrarMano = (nombre, mano, ocultarSegunda = false) => {
  ocultarSegunda
    ? console.log(`${nombre}: [${mano[0]}, ???]`)
    : console.log(`${nombre}: [${mano.join(', ')}]  →  ${calcularMano(mano)} puntos`);
};

const blackjack = async () => {
  console.log('\n' + '='.repeat(45));
  console.log('        ♠ ♥  B L A C K J A C K  ♦ ♣');
  console.log('='.repeat(45));

  let saldo = 1000;
  console.log(`\n💰 Saldo inicial: $${saldo}`);

  while (saldo > 0) {
    console.log(`\n${'─'.repeat(45)}`);
    console.log(`💰 Saldo actual: $${saldo}`);

    let apuesta = 0;
    while (true) {
      const input = await preguntar(`¿Cuánto quieres apostar? (1-${saldo}): $`);
      apuesta = parseInt(input);
      if (!isNaN(apuesta) && apuesta >= 1 && apuesta <= saldo) break;
      console.log('  ⚠ Apuesta inválida.');
    }

    const baraja = shuffleBaraja(crearBaraja());
    const jugador = [baraja.pop(), baraja.pop()];
    const dealer  = [baraja.pop(), baraja.pop()];

    console.log();
    mostrarMano('🃏 Dealer ', dealer, true);
    mostrarMano('🙋 Tú    ', jugador);

    if (calcularMano(jugador) === 21) {
      console.log('\n🎉 ¡BLACKJACK! Ganas 1.5x tu apuesta.');
      saldo += Math.floor(apuesta * 1.5);
    } else {
      // Turno del jugador — con bandera para que 's' salga del while
      let plantado = false;
      while (calcularMano(jugador) < 21 && !plantado) {
        const accion = (await preguntar('\n¿Pedir carta (p) o plantarte (s)? ')).trim().toLowerCase();
        switch (accion) {
          case 'p':
            jugador.push(baraja.pop());
            mostrarMano('🙋 Tú    ', jugador);
            if (calcularMano(jugador) > 21) { console.log('💥 ¡Te pasaste de 21!'); }
            break;
          case 's':
            console.log('🛑 Te plantas.');
            plantado = true;
            break;
          default:
            console.log("  ⚠ Escribe 'p' para pedir o 's' para plantarte.");
        }
      }

      const totalJugador = calcularMano(jugador);

      if (totalJugador <= 21) {
        console.log();
        mostrarMano('🃏 Dealer ', dealer);
        while (calcularMano(dealer) < 17) {
          dealer.push(baraja.pop());
          mostrarMano('🃏 Dealer ', dealer);
        }
      }

      const totalDealer = calcularMano(dealer);

      console.log('\n' + '─'.repeat(45));
      mostrarMano('🙋 Tú    ', jugador);
      mostrarMano('🃏 Dealer ', dealer);
      console.log();

      const resultado =
        totalJugador > 21 ? 'perder' :
        totalDealer  > 21 ? 'ganar'  :
        totalJugador > totalDealer ? 'ganar'  :
        totalJugador < totalDealer ? 'perder' : 'empate';

      switch (resultado) {
        case 'ganar':
          console.log(`✅ ¡Ganaste! +$${apuesta}`);
          saldo += apuesta;
          break;
        case 'perder':
          console.log(`❌ Perdiste. -$${apuesta}`);
          saldo -= apuesta;
          break;
        default:
          console.log('🤝 Empate. Se devuelve tu apuesta.');
      }
    }

    if (saldo <= 0) { console.log('\n💸 Te quedaste sin saldo. ¡Fin del juego!'); break; }

    const continuar = (await preguntar('\n¿Jugar otra mano? (s/n): ')).trim().toLowerCase();
    if (continuar !== 's') { console.log(`\n👋 Gracias por jugar. Saldo final: $${saldo}`); break; }
  }

  rl.close();
};

blackjack();