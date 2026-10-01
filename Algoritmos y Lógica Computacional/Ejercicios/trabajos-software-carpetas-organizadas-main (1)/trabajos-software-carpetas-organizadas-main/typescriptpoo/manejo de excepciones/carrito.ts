function retirar(saldo: number, monto: number): number {
  if (monto < 0) throw new Error("El monto no puede ser negativo");
  if (monto > saldo) throw new Error("Saldo insuficiente");
  return saldo - monto;
}

try { console.log(retirar(500000, 200000)); } catch (e) { console.log((e as Error).message); }
try { console.log(retirar(500000, -50000)); } catch (e) { console.log((e as Error).message); }
try { console.log(retirar(500000, 700000)); } catch (e) { console.log((e as Error).message); }