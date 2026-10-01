// ============================================================
// EJERCICIO 3 — Alcaldía de Armenia: Subsidio al Adulto Mayor
// Algoritmos y Lógica Computacional — SENA
// ============================================================

// Datos simulados de personas (nombre, edad)
const personasData = [
  { nombre: "Carmen Rodríguez", edad: 72 },
  { nombre: "Jorge Ríos",       edad: 85 },
  { nombre: "Lucía Vargas",     edad: 60 },
  { nombre: "Pedro Álvarez",    edad: 45 },
  { nombre: "Rosa Méndez",      edad: 82 },
  { nombre: "Julio Cano",       edad: 67 },
  { nombre: "Elena Parra",      edad: 78 },
  { nombre: "Mario Suárez",     edad: 55 },
  { nombre: "Gloria Reyes",     edad: 80 },
  { nombre: "Héctor Mora",      edad: 92 },
];

// Variables principales
const salarioMinimo          = 1300000;
const cantidadPersonas       = personasData.length;
let contBeneficiarios60_80   = 0;
let contBeneficiariosMayor80 = 0;
let contNoAplica             = 0;
let presupuestoTotal         = 0;

console.log("=============================================");
console.log("  ALCALDÍA DE ARMENIA — SUBSIDIO ADULTO MAYOR");
console.log("=============================================\n");

// Ciclo for: itera por cada persona
for (let i = 0; i < cantidadPersonas; i++) {
  const nombre = personasData[i].nombre;
  const edad   = personasData[i].edad;

  let porcentaje = 0;
  let subsidio   = 0;
  let categoria  = "";
  let estado     = "";

  // if/else if/else: clasificar según edad
  if (edad >= 60 && edad <= 80) {
    porcentaje = 12;
    subsidio   = salarioMinimo * 0.12;
    contBeneficiarios60_80++;
    presupuestoTotal += subsidio;
    estado = "BENEFICIARIO";
  } else if (edad > 80) {
    porcentaje = 15;
    subsidio   = salarioMinimo * 0.15;
    contBeneficiariosMayor80++;
    presupuestoTotal += subsidio;
    estado = "BENEFICIARIO";
  } else {
    porcentaje = 0;
    subsidio   = 0;
    contNoAplica++;
    estado = "NO APLICA";
  }

  // Operador ternario: asignar categoría
  categoria = edad > 80 ? "Adulto Mayor Senior" : (edad >= 60 ? "Adulto Mayor" : "No aplica al programa");

  // Salida por persona
  console.log(`--- PERSONA ${i + 1}: ${nombre} ---`);
  console.log(`  Edad      : ${edad} años`);
  console.log(`  Categoría : ${categoria}`);
  if (edad >= 60) {
    console.log(`  Subsidio (${porcentaje}%) : $${subsidio.toLocaleString("es-CO")}`);
  } else {
    console.log(`  Estado    : ${estado}`);
  }
  console.log();
}

// Resumen final
console.log("=== INFORME ALCALDÍA DE ARMENIA ===");
console.log(`  Total registrados          : ${cantidadPersonas}`);
console.log(`  Beneficiarios (60-80 años) : ${contBeneficiarios60_80} — Subsidio: $${(salarioMinimo * 0.12).toLocaleString("es-CO")} c/u`);
console.log(`  Beneficiarios (>80 años)   : ${contBeneficiariosMayor80} — Subsidio: $${(salarioMinimo * 0.15).toLocaleString("es-CO")} c/u`);
console.log(`  No aplican                 : ${contNoAplica}`);
console.log(`  PRESUPUESTO TOTAL          : $${presupuestoTotal.toLocaleString("es-CO")}`);