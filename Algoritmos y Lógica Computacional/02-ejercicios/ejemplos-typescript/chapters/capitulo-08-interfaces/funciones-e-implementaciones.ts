// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta interface modela una función de cálculo.
interface GradeFormatter {
  // Esta firma exige recibir una nota y retornar texto.
  (grade: number): string;
}

// Esta constante implementa la interface de función.
const formatter: GradeFormatter = (grade) => `La nota final es ${grade.toFixed(1)}`;

// Esta interface define un contrato para notificaciones.
interface Notifier {
  // Este método envía un mensaje.
  notify(message: string): void;
}

// Esta clase implementa el contrato de notificación.
class ConsoleNotifier implements Notifier {
  // Este método imprime el mensaje formateado.
  notify(message: string): void {
    // Este `console.log` muestra la notificación.
    console.log(`[NOTIFICACIÓN] ${message}`);
  }
}

// Esta constante crea el notificador concreto.
const notifier = new ConsoleNotifier();

// Estas líneas demuestran ambos contratos.
console.log(formatter(4.4));
notifier.notify("El proyecto fue entregado correctamente");
