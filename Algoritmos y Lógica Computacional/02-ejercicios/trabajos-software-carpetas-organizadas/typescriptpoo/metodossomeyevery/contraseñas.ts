const contrasenas: string[] = ["creator22", "chupaelperro333", "sonicysetbull", "typescript2024", "contraseña"];

const todasSeguras = contrasenas.every((c) => c.length >= 8);
const algunaEsAdmin = contrasenas.some((c) => c.includes("creator"));

console.log("Todas tienen 8+ caracteres:", todasSeguras);
console.log("Alguna contiene 'admin':", algunaEsAdmin);