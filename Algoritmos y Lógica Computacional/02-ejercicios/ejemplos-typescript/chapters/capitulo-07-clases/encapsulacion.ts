// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta clase modela una cuenta académica con encapsulación.
class AcademicAccount {
  // Esta propiedad privada protege el saldo interno.
  private credits: number;

  // Este constructor asigna los datos iniciales.
  constructor(public readonly owner: string, initialCredits: number) {
    // Esta línea guarda el saldo inicial de créditos.
    this.credits = initialCredits;
  }

  // Este getter expone una lectura controlada del saldo.
  get balance(): number {
    // Esta línea retorna los créditos actuales.
    return this.credits;
  }

  // Este setter valida que el saldo nunca quede negativo.
  set balance(value: number) {
    // Esta condición protege la invariantes del objeto.
    if (value < 0) {
      // Esta línea impide un valor inválido.
      throw new Error("Los créditos no pueden ser negativos");
    }

    // Esta línea actualiza el saldo internamente.
    this.credits = value;
  }
}

// Esta constante crea una cuenta de ejemplo.
const account = new AcademicAccount("Sofía", 18);

// Esta línea usa el setter validado.
account.balance = 21;

// Este `console.log` imprime el saldo final.
console.log(account.owner, account.balance);
