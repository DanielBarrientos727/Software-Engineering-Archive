/**
 * ALCALDÍA DE ARMENIA — SUBSIDIO ADULTO MAYOR
 *
 * Este programa procesa una lista de personas registradas en la alcaldía
 * y calcula el subsidio que recibe cada una según su rango de edad:
 *
 *  - Entre 60 y 80 años : 12 % del salario mínimo.
 *  - Mayor de 80 años   : 15 % del salario mínimo.
 *  - Menor de 60 años   : No aplica al programa.
 *
 * Al final genera un informe con el total de beneficiarios y el
 * presupuesto total que debe destinar la alcaldía.
 */

// ── Tipos ─────────────────────────────────────────────────────────────────────

/** Representa a cada ciudadano registrado en el sistema. */
interface Persona {
  nombre: string;
  edad: number;
}

// ── Datos ─────────────────────────────────────────────────────────────────────

/** Lista de personas a evaluar para el programa de subsidio. */
const personas: Persona[] = [
  { nombre: "Carmen Rodríguez", edad: 72 },
  { nombre: "José Hernández",   edad: 85 },
  { nombre: "Lucia Vargas",     edad: 55 },
  { nombre: "Pedro Salcedo",    edad: 63 },
  { nombre: "Rosa Morales",     edad: 91 },
  { nombre: "Andrés Castaño",   edad: 78 },
  { nombre: "Marta Jiménez",    edad: 40 },
  { nombre: "Felipe Torres",    edad: 82 },
  { nombre: "Gloria Ospina",    edad: 68 },
  { nombre: "Nora Quintero",    edad: 30 },
];

// ── Constantes ────────────────────────────────────────────────────────────────

/** Valor del salario mínimo mensual legal vigente (en pesos colombianos). */
const salarioMinimo: number = 1300000;

/** Porcentaje de subsidio para adultos entre 60 y 80 años (12 %). */
const PORC_60_80: number = 0.12;

/** Porcentaje de subsidio para adultos mayores de 80 años (15 %). */
const PORC_MAS_80: number = 0.15;

// ── Acumuladores y contadores ─────────────────────────────────────────────────

/** Número de personas beneficiadas en el rango 60-80 años. */
let contBeneficiarios60_80: number = 0;

/** Número de personas beneficiadas mayores de 80 años. */
let contBeneficiariosMayor80: number = 0;

/** Número de personas que no cumplen los requisitos de edad. */
let contNoAplica: number = 0;

/** Suma total del presupuesto que la alcaldía debe destinar a subsidios. */
let presupuestoTotal: number = 0;

/** Total de personas en la lista. */
const cantidadPersonas: number = personas.length;

// ── Encabezado del reporte ────────────────────────────────────────────────────

console.log("   ALCALDÍA DE ARMENIA — SUBSIDIO ADULTO   ");

// ── Ciclo principal: recorre cada persona de la lista ────────────────────────
for (let i = 0; i < cantidadPersonas; i++) {

  const nombre: string = personas[i].nombre;
  const edad: number   = personas[i].edad;

  let subsidio: number   = 0;
  let porcentaje: number = 0;
  let categoria: string  = "";
  let estadoText: string = "";

  // Determina la categoría y el subsidio según la edad de la persona
  if (edad >= 60 && edad <= 80) {
    // Adulto mayor en rango 60-80: recibe el 12 % del salario mínimo
    porcentaje = PORC_60_80;
    subsidio   = salarioMinimo * porcentaje;
    contBeneficiarios60_80++;
    presupuestoTotal += subsidio;
    estadoText = `Subsidio (12%): $${subsidio.toLocaleString("es-CO")}`;
  } else if (edad > 80) {
    // Adulto mayor senior: recibe el 15 % del salario mínimo
    porcentaje = PORC_MAS_80;
    subsidio   = salarioMinimo * porcentaje;
    contBeneficiariosMayor80++;
    presupuestoTotal += subsidio;
    estadoText = `Subsidio (15%): $${subsidio.toLocaleString("es-CO")}`;
  } else {
    // Menores de 60 años: fuera del programa
    estadoText = "No aplica al programa";
    contNoAplica++;
  }

  // Asigna la etiqueta de categoría usando operador ternario encadenado
  categoria = edad > 80
    ? "Adulto Mayor Senior"
    : (edad >= 60 ? "Adulto Mayor" : "No beneficiario");

  // Imprime el detalle individual de cada persona
  console.log(`\n--- PERSONA ${i + 1}: ${nombre} ---`);
  console.log(`  Edad      : ${edad} años`);
  console.log(`  Categoría : ${categoria}`);
  console.log(`  ${estadoText}`);
}

// ── Totales finales ───────────────────────────────────────────────────────────

/** Total de personas que reciben algún subsidio. */
const totalBeneficiarios: number = contBeneficiarios60_80 + contBeneficiariosMayor80;

// ── Informe final de la alcaldía ──────────────────────────────────────────────
console.log("      === INFORME ALCALDÍA DE ARMENIA ===   ");
console.log(`  Total registrados        : ${cantidadPersonas}`);
console.log(`  Beneficiarios (60-80)    : ${contBeneficiarios60_80}  — Subsidio: $${(salarioMinimo * PORC_60_80).toLocaleString("es-CO")} c/u`);
console.log(`  Beneficiarios (>80 años) : ${contBeneficiariosMayor80}  — Subsidio: $${(salarioMinimo * PORC_MAS_80).toLocaleString("es-CO")} c/u`);
console.log(`  Total beneficiarios      : ${totalBeneficiarios}`);
console.log(`  No aplican               : ${contNoAplica}`);
console.log(`  PRESUPUESTO TOTAL        : $${presupuestoTotal.toLocaleString("es-CO")}`);
console.log("============================================");