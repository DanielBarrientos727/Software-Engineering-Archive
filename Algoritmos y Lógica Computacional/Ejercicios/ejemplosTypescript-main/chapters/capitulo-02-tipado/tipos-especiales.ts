// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta función no devuelve un valor útil y por eso usa `void`.
function logMessage(message: string): void {
  // Esta línea solo imprime el mensaje recibido.
  console.log(`LOG: ${message}`);
}

// Esta función siempre lanza un error y por eso retorna `never`.
function fail(message: string): never {
  // Esta línea interrumpe la ejecución normal.
  throw new Error(message);
}

// Esta función usa inferencia para retornar un literal de texto.
function inferRole() {
  // Esta línea deja que TypeScript deduzca el tipo automáticamente.
  return "monitor";
}

// Esta llamada demuestra una función `void`.
logMessage("Ejemplo de función sin retorno útil");

// Este `console.log` muestra la inferencia automática.
console.log("Rol inferido:", inferRole());

// Este bloque prueba `never` sin detener el archivo por completo.
try {
  // Esta línea invoca la función que falla intencionalmente.
  fail("Demostración controlada de never");
} catch (error) {
  // Esta condición verifica el tipo real del error.
  if (error instanceof Error) {
    // Esta línea imprime el mensaje capturado.
    console.log("Error capturado:", error.message);
  }
}
