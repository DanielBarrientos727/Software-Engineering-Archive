// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta constante representa la edad del estudiante.
const age = 19;

// Esta constante representa si aceptó condiciones.
const acceptedTerms = true;

// Esta constante representa el país declarado.
const country = "Colombia";

// Esta constante usa comparación estricta.
const isAdult = age >= 18;

// Esta constante usa comparación estricta de texto.
const isLocal = country === "Colombia";

// Esta constante combina condiciones con AND lógico.
const canEnroll = isAdult && acceptedTerms && isLocal;

// Esta constante invierte una condición con NOT lógico.
const needsGuardian = !isAdult;

// Esta constante usa OR lógico para una excepción.
const priorityAccess = country === "Colombia" || age > 60;

// Este `console.log` imprime el análisis lógico completo.
console.log({ isAdult, isLocal, canEnroll, needsGuardian, priorityAccess });
