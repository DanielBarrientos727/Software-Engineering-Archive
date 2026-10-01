interface MedioPago {
  usuario: string;
  pagar(monto: number): void;
}

class PagoTarjeta implements MedioPago {
  constructor(public usuario: string) {}
  pagar(monto: number): void { console.log(`${this.usuario} pagó $${monto} con Tarjeta`); }
}

class PagoEfectivo implements MedioPago {
  constructor(public usuario: string) {}
  pagar(monto: number): void { console.log(`${this.usuario} pagó $${monto} en Efectivo`); }
}

class PagoTransferencia implements MedioPago {
  constructor(public usuario: string) {}
  pagar(monto: number): void { console.log(`${this.usuario} pagó $${monto} por Transferencia`); }
}

const pagos: MedioPago[] = [
  new PagoTarjeta("tatiana"),
  new PagoEfectivo("caicedo"),
  new PagoTransferencia("oscuros"),
];

pagos.forEach((p) => p.pagar(100000));