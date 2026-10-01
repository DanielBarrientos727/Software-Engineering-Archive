class Cuenta {
  private _saldo: number = 0;
  private _titular: string;

  constructor(titular: string) { this._titular = titular; }

  get saldo(): number { return this._saldo; }

  get titular(): string { return this._titular; }
  set titular(valor: string) {
    if (valor === "") throw new Error("El titular no puede estar vacío");
    this._titular = valor;
  }

  depositar(m: number): void {
    if (m <= 0) throw new Error("El monto debe ser positivo");
    this._saldo += m;
  }
}

const c = new Cuenta("Ana");
try { c.depositar(500000); console.log("Saldo:", c.saldo); } catch (e) { console.log((e as Error).message); }
try { c.depositar(-1000); console.log("Saldo:", c.saldo); } catch (e) { console.log((e as Error).message); }
try { c.titular = ""; } catch (e) { console.log((e as Error).message); }