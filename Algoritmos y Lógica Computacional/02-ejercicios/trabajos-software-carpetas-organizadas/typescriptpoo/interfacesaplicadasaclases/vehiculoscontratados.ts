interface Conducible {
  velocidadMax: number;
  arrancar(): void;
  detener(): void;
}

class Auto implements Conducible {
  velocidadMax = 200;
  arrancar(): void { console.log(`Auto arrancando - Vel. máx: ${this.velocidadMax} km/h`); }
  detener(): void { console.log("Auto detenido"); }
}

class Moto implements Conducible {
  velocidadMax = 180;
  arrancar(): void { console.log(`Moto arrancando - Vel. máx: ${this.velocidadMax} km/h`); }
  detener(): void { console.log("Moto detenida"); }
}

class Bicicleta implements Conducible {
  velocidadMax = 30;
  arrancar(): void { console.log(`Bicicleta arrancando - Vel. máx: ${this.velocidadMax} km/h`); }
  detener(): void { console.log("Bicicleta detenida"); }
}

const vehiculos: Conducible[] = [new Auto(), new Moto(), new Bicicleta()];

vehiculos.forEach((v) => { v.arrancar(); v.detener(); });