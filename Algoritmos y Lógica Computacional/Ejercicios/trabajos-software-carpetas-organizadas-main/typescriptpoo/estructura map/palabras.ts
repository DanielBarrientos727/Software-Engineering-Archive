const frase = "el carro y la moto y el carro";
const contador = new Map<string, number>();

frase.split(" ").forEach((palabra) => {
  contador.set(palabra, (contador.get(palabra) ?? 0) + 1);
});

contador.forEach((frecuencia, palabra) => {
  console.log(`${palabra}: ${frecuencia}`);
});