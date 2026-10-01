/**
 * Bloque try-catch-finally básico en TypeScript.
 *
 * - try    : intenta ejecutar el código principal.
 * - catch  : captura cualquier error que ocurra y muestra la variable `a`.
 * - finally: siempre se ejecuta al final, sin importar si hubo error o no.
 */

// Declara la constante `a` de tipo string con el valor "hello"
const a: string = "hello";

// Muestra "hello" en mayúsculas: "HELLO"
console.log(a.toUpperCase());

try {
  // Bloque protegido — aquí iría el código que podría lanzar un error
} catch (error: unknown) {
  // Si ocurre un error, imprime el valor actual de `a`
  console.log(a);
} finally {
  // Siempre se ejecuta: imprime `a` independientemente del resultado
  console.log(a);
}