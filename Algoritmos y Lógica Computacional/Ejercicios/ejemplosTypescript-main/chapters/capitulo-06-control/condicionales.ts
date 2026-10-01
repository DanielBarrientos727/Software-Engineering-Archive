// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta función clasifica una nota usando `if`, `else if` y `else`.
function classifyGrade(grade: number): string {
  // Esta condición valida el rango permitido.
  if (grade < 0 || grade > 5) {
    // Esta línea retorna una advertencia de entrada inválida.
    return "Nota inválida";
  }

  // Esta condición detecta excelencia académica.
  if (grade >= 4.5) {
    // Esta línea retorna la categoría superior.
    return "Excelente";
  } else if (grade >= 3.0) {
    // Esta línea retorna una aprobación estándar.
    return "Aprobado";
  } else {
    // Esta línea retorna el caso de reprobación.
    return "Reprobado";
  }
}

// Esta constante usa operador ternario para una decisión breve.
const attendance = 92;

// Esta constante aplica una clasificación compacta con ternario.
const attendanceStatus = attendance >= 80 ? "Cumple asistencia" : "No cumple asistencia";

// Estos `console.log` muestran el flujo condicional.
console.log(classifyGrade(4.8));
console.log(classifyGrade(3.4));
console.log(classifyGrade(2.1));
console.log(attendanceStatus);
