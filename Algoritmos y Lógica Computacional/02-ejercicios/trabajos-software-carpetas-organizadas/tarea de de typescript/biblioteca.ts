/**
 * BIBLIOTECH — SISTEMA DE DEVOLUCIONES Y MULTAS
 *
 * Este programa gestiona las devoluciones de libros de una biblioteca.
 * Por cada usuario, revisa cuántos días tuvo prestado cada libro y
 * calcula la multa correspondiente con las siguientes reglas:
 *
 *  - Los primeros 7 días son gratuitos (sin multa).
 *  - Del día 8 al día 15 de retraso: $1.500 por día.
 *  - Más de 15 días de retraso    : $1.500 por día + $10.000 adicionales.
 *  - Un usuario no puede devolver más de 3 libros a la vez.
 *
 * Al final muestra un resumen global con totales y multas recaudadas.
 */

// ── Tipos ─────────────────────────────────────────────────────────────────────

/** Representa a un usuario con su nombre y los días que tuvo cada libro. */
interface Usuario {
  nombre: string;
  /** Cada número representa los días que se prestó ese libro. */
  libros: number[];
}

// ── Datos ─────────────────────────────────────────────────────────────────────

/** Lista de usuarios que devuelven libros hoy. */
const usuarios: Usuario[] = [
  { nombre: "Andrés Gómez",   libros: [7, 12]     },
  { nombre: "Camila Torres",  libros: [5, 7, 3]   },
  { nombre: "Diego Ramírez",  libros: [25]         },
  { nombre: "Elena Castillo", libros: [8, 20, 10] },
  { nombre: "Felipe Mora",    libros: [7, 7]       },
  { nombre: "Gabriela Ruiz",  libros: [14]         },
  { nombre: "Hugo Vargas",    libros: [9, 6, 18]  },
  { nombre: "Isabela León",   libros: [7, 12, 7]  },
];

// ── Constantes ────────────────────────────────────────────────────────────────

/** Días de préstamo incluidos sin costo alguno. */
const DIAS_GRATIS: number      = 7;

/** Valor de la multa por cada día de retraso (en pesos colombianos). */
const MULTA_DIARIA: number     = 1500;

/** Multa adicional fija cuando el retraso supera los 15 días. */
const MULTA_ADICIONAL: number  = 10000;

/** Límite de días de retraso a partir del cual se cobra la multa adicional. */
const LIMITE_MULTA_ADI: number = 15;

/** Máximo de libros permitidos por usuario en una devolución. */
const MAX_LIBROS: number       = 3;

// ── Contadores globales ───────────────────────────────────────────────────────

/** Total de usuarios procesados. */
let totalUsuarios: number    = 0;

/** Total de libros procesados en todas las devoluciones. */
let totalLibros: number      = 0;

/** Libros devueltos con al menos un día de retraso. */
let librosConRetraso: number = 0;

/** Libros devueltos dentro del plazo permitido. */
let librosPuntuales: number  = 0;

/** Suma total de todas las multas cobradas en el día. */
let totalMultas: number      = 0;

/** Número de usuarios en la lista. */
const cantidadUsuarios: number = usuarios.length;

// ── Encabezado ────────────────────────────────────────────────────────────────
console.log("============================================");
console.log("       📚 BIBLIOTECH — DEVOLUCIONES        ");
console.log("============================================");

// ── Ciclo externo: recorre cada usuario ──────────────────────────────────────
for (let i = 0; i < cantidadUsuarios; i++) {

  const nombreUsuario: string = usuarios[i].nombre;

  // Aplica el límite máximo de libros por usuario
  let cantidadLibros: number = usuarios[i].libros.length;
  while (cantidadLibros > MAX_LIBROS) {
    console.log(`  ⚠️  ${nombreUsuario}: excede el máximo de ${MAX_LIBROS} libros. Ajustando...`);
    cantidadLibros = MAX_LIBROS;
  }

  /** Acumula la multa total de este usuario. */
  let multaUsuario: number = 0;
  totalUsuarios++;

  console.log(`\n--- USUARIO ${i + 1}: ${nombreUsuario} ---`);
  console.log(`  Libros devueltos: ${cantidadLibros}`);

  // ── Ciclo interno: revisa cada libro del usuario ─────────────────────────
  for (let j = 0; j < cantidadLibros; j++) {

    /** Días que el usuario tuvo el libro en su poder. */
    const diasPrestamo: number = usuarios[i].libros[j];

    /** Días de retraso (0 si devolvió dentro del plazo gratuito). */
    let diasRetraso: number = diasPrestamo > DIAS_GRATIS ? diasPrestamo - DIAS_GRATIS : 0;

    /** Multa calculada para este libro en particular. */
    let multaLibro: number = 0;

    if (diasRetraso === 0) {
      // Sin retraso: sin cargo
      multaLibro = 0;
    } else if (diasRetraso <= LIMITE_MULTA_ADI) {
      // Retraso de 1 a 15 días: solo tarifa diaria
      multaLibro = diasRetraso * MULTA_DIARIA;
    } else {
      // Retraso mayor a 15 días: tarifa diaria + cargo adicional fijo
      multaLibro = (diasRetraso * MULTA_DIARIA) + MULTA_ADICIONAL;
    }

    multaUsuario += multaLibro;
    totalLibros++;

    // Clasifica el libro como puntual o con retraso para el resumen global
    if (diasRetraso === 0) {
      librosPuntuales++;
    } else {
      librosConRetraso++;
    }

    /** Texto descriptivo del estado de devolución del libro. */
    const estadoLibro: string = diasRetraso === 0
      ? "Sin retraso"
      : `${diasRetraso} días de retraso`;

    console.log(`  Libro ${j + 1}: ${diasPrestamo} días — ${estadoLibro} — Multa: $${multaLibro.toLocaleString("es-CO")}`);
  }

  totalMultas += multaUsuario;

  /** Etiqueta de clasificación final del usuario según su multa. */
  const clasificacion: string = multaUsuario === 0 ? "✅ PUNTUAL" : "⚠️  CON RETRASO";

  console.log(`  Multa total usuario: $${multaUsuario.toLocaleString("es-CO")} — ${clasificacion}`);
}

// ── Resumen global ────────────────────────────────────────────────────────────
console.log("         === RESUMEN BIBLIOTECH ===         ");
console.log(`  Usuarios atendidos  : ${totalUsuarios}`);
console.log(`  Total libros        : ${totalLibros}`);
console.log(`  Libros puntuales    : ${librosPuntuales}`);
console.log(`  Libros con retraso  : ${librosConRetraso}`);
console.log(`  MULTAS RECAUDADAS   : $${totalMultas.toLocaleString("es-CO")}`);
console.log("============================================");