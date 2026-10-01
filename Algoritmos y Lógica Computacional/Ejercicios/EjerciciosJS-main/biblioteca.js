// ============================================================
// EJERCICIO 5 — BiblioTech: Control de Préstamos de Libros
// Algoritmos y Lógica Computacional — SENA
// ============================================================

// Datos simulados: cada usuario con sus días de préstamo por libro
const usuariosData = [
  { nombre: "Andrés Gómez",    libros: [7, 12]      },
  { nombre: "Sofía Herrera",   libros: [5]           },
  { nombre: "Camilo Ríos",     libros: [20, 9, 3]    },
  { nombre: "Valentina Cruz",  libros: [7, 7]        },
  { nombre: "Felipe Mora",     libros: [25, 14]      },
  { nombre: "Isabella Parra",  libros: [8]           },
  { nombre: "Sebastián Ruiz",  libros: [10, 6, 7]   },
  { nombre: "Mariana Leal",    libros: [7, 30]       },
];

// Constantes
const DIAS_GRATIS      = 7;
const MULTA_DIARIA     = 1500;
const MULTA_ADICIONAL  = 10000;
const MAX_LIBROS       = 3;

// Variables globales
const cantidadUsuarios = usuariosData.length;
let totalMultas        = 0;
let totalLibros        = 0;
let librosConRetraso   = 0;
let librosPuntuales    = 0;

console.log("=============================================");
console.log("   BIBLIOTECH — CONTROL DE DEVOLUCIONES     ");
console.log("=============================================\n");

// Ciclo for externo: itera por cada usuario
for (let i = 0; i < cantidadUsuarios; i++) {
  const nombreUsuario = usuariosData[i].nombre;
  let cantidadLibros  = usuariosData[i].libros.length;

  // Ciclo while: valida que no exceda 3 libros
  while (cantidadLibros > MAX_LIBROS) {
    console.log(`  ⚠ ${nombreUsuario} supera el límite de ${MAX_LIBROS} libros. Ajustando...`);
    cantidadLibros = MAX_LIBROS;
  }

  let multaUsuario = 0;

  console.log(`--- USUARIO ${i + 1}: ${nombreUsuario} ---`);
  console.log(`  Libros devueltos: ${cantidadLibros}`);

  // Ciclo for anidado: itera por cada libro del usuario
  for (let j = 0; j < cantidadLibros; j++) {
    const diasPrestamo = usuariosData[i].libros[j];
    const diasRetraso  = diasPrestamo > DIAS_GRATIS ? diasPrestamo - DIAS_GRATIS : 0;
    let multaLibro     = 0;

    // if/else if/else: calcular multa según días de retraso
    if (diasRetraso === 0) {
      multaLibro = 0;
      librosPuntuales++;
    } else if (diasRetraso <= 15) {
      multaLibro = diasRetraso * MULTA_DIARIA;
      librosConRetraso++;
    } else {
      multaLibro = (diasRetraso * MULTA_DIARIA) + MULTA_ADICIONAL;
      librosConRetraso++;
    }

    multaUsuario += multaLibro;
    totalLibros++;

    // Salida por libro
    const estadoLibro = diasRetraso === 0
      ? "Sin retraso"
      : `${diasRetraso} días de retraso`;

    console.log(
      `    Libro ${j + 1}: ${diasPrestamo} días — ${estadoLibro} — Multa: $${multaLibro.toLocaleString("es-CO")}`
    );
  }

  // Operador ternario: clasificar usuario
  const clasificacion = multaUsuario === 0 ? "PUNTUAL" : "CON RETRASO";

  totalMultas += multaUsuario;

  console.log(`  Multa total usuario: $${multaUsuario.toLocaleString("es-CO")} — ${clasificacion}`);
  console.log();
}

// Resumen del día
console.log("=== RESUMEN BIBLIOTECH ===");
console.log(`  Usuarios atendidos  : ${cantidadUsuarios}`);
console.log(`  Total libros        : ${totalLibros}`);
console.log(`  Libros puntuales    : ${librosPuntuales}`);
console.log(`  Libros con retraso  : ${librosConRetraso}`);
console.log(`  MULTAS RECAUDADAS   : $${totalMultas.toLocaleString("es-CO")}`);