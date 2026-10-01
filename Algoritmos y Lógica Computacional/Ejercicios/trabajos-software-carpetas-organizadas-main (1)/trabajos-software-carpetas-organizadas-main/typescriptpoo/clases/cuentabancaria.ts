class CuentaBancaria {
  titular: string;
  numero: string;
  saldo: number = 0;

  constructor(titular: string, numero: string) {
    this.titular = titular;
    this.numero = numero;
  }

  depositar(monto: number): void { this.saldo += monto; }
  retirar(monto: number): void { this.saldo -= monto; }
  consultarSaldo(): void { console.log(`Saldo de ${this.titular}: $${this.saldo.toLocaleString()}`); }
}

const cuenta = new CuentaBancaria("brigid", "001-2026");

cuenta.depositar(500000);
cuenta.depositar(300000);
cuenta.retirar(200000);
cuenta.consultarSaldo();