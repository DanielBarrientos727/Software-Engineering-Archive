class Estudiantecs {
  private _notas: number[] = [];

  get notas(): number[] { return [...this._notas]; }
  set notas(valores: number[]) {
    if (valores.some((n) => n < 0 || n > 5)) throw new Error("Notas deben estar entre 0 y 5");
    this._notas = valores;
  }

  get promedio(): number { return this._notas.reduce((acc, n) => acc + n, 0) / this._notas.length; }
  get estado(): string { return this.promedio >= 3.0 ? "APROBADO" : "REPROBADO"; }
}

const e = new Estudiante();
try { e.notas = [3.5, 4.0, 2.8, 4.5, 3.9]; console.log("Promedio:", e.promedio.toFixed(2), "-", e.estado); } catch (e) { console.log((e as Error).message); }
try { e.notas = [1.0, 6.0, 3.0]; } catch (e) { console.log((e as Error).message); }