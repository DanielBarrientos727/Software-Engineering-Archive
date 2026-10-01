import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

// Este tipo fija la estructura de cada sección del libro.
type Section = {
  // Esta propiedad guarda el título del capítulo o bloque.
  heading: string;
  // Esta propiedad guarda los párrafos principales.
  paragraphs: string[];
  // Esta propiedad guarda la etiqueta, el texto y el color del recuadro.
  note: [string, string, string];
};

// Esta constante define la carpeta de salida del documento final.
const outputDirectory = "dist";

// Esta constante define el nombre del archivo Word entregable.
const outputFile = `${outputDirectory}/typescript-2026-guia-profesional.docx`;

// Esta función crea un párrafo de cuerpo con tipografía uniforme.
const body = (text: string) =>
  new Paragraph({
    spacing: { after: 180, line: 300 },
    children: [
      new TextRun({
        text,
        font: "Calibri",
        size: 24,
      }),
    ],
  });

// Esta función crea un encabezado con estilo editorial.
const title = (text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel]) =>
  new Paragraph({
    heading: level,
    spacing: { before: 240, after: 180 },
    children: [
      new TextRun({
        text,
        bold: true,
        font: "Georgia",
        size: level === HeadingLevel.TITLE ? 34 : 28,
        color: "143A52",
      }),
    ],
  });

// Esta función crea un bloque destacado similar a una nota editorial.
const noteTable = (label: string, text: string, fill: string) =>
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill },
            borders: {
              top: { style: BorderStyle.SINGLE, color: "B7C8D6", size: 2 },
              bottom: { style: BorderStyle.SINGLE, color: "B7C8D6", size: 2 },
              left: { style: BorderStyle.SINGLE, color: "B7C8D6", size: 2 },
              right: { style: BorderStyle.SINGLE, color: "B7C8D6", size: 2 },
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: `${label}: `, bold: true, font: "Calibri", size: 22 }),
                  new TextRun({ text, font: "Calibri", size: 22 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

// Esta colección agrupa el contenido base del libro en secciones.
const sections: Section[] = [
  {
    heading: "1. Ecosistema TypeScript y Bun",
    paragraphs: [
      "TypeScript es una capa de verificación estática sobre JavaScript. Bun es el runtime moderno que permite instalar dependencias, ejecutar TypeScript directamente, correr pruebas y gestionar proyectos con un flujo muy rápido.",
      "En 2026 la práctica profesional favorece configuraciones estrictas, módulos ESNext y ejecución directa de archivos `.ts` durante el desarrollo. Esto reduce fricción y acelera la experimentación del estudiante.",
      "La idea pedagógica inicial es simple: escribir menos configuración accidental y más código con intención clara.",
    ],
    note: ["Consejo didáctico", "Explique a sus estudiantes que Bun no reemplaza a TypeScript; lo complementa como entorno de trabajo.", "EAF4EA"],
  },
  {
    heading: "2. Sistema de tipado",
    paragraphs: [
      "El tipado estático permite detectar incompatibilidades antes de ejecutar el programa. Un error común de principiantes consiste en tratar valores desconocidos como si fueran válidos; por eso `unknown` es mejor que `any`.",
      "TypeScript trabaja con inferencia, anotaciones explícitas, uniones, intersecciones, alias y tipos literales. Enseñar estos conceptos desde ejemplos concretos mejora la transferencia a proyectos reales.",
      "La habilidad importante no es memorizar todos los tipos, sino aprender a modelar dominio: estudiante, materia, calificación, estado y respuesta.",
    ],
    note: ["Regla de oro", "Evite `any` salvo en migraciones controladas y temporales.", "FFF4DE"],
  },
  {
    heading: "3. Operadores",
    paragraphs: [
      "Los operadores aritméticos y relacionales son conocidos por cualquier estudiante, pero TypeScript añade expresividad con `?.`, `??` y `satisfies`.",
      "El optional chaining reduce errores cuando una propiedad puede faltar. El nullish coalescing evita reemplazar valores legítimos como `0`, `false` o cadena vacía.",
      "El operador `satisfies` es especialmente valioso en material 2026 porque valida una forma sin perder la inferencia exacta del objeto.",
    ],
    note: ["Advertencia", "No enseñe `==` ni `!=` como práctica aceptable. Use siempre comparación estricta.", "FDE8E6"],
  },
  {
    heading: "4. Funciones y 5. Funciones flecha",
    paragraphs: [
      "Las funciones permiten encapsular intención. El estudiante debe distinguir parámetros, retorno, valores por defecto, parámetros rest y tipos de función.",
      "Las funciones flecha dominan gran parte del código moderno por su brevedad y por el manejo léxico de `this`. Esto se ve con claridad en callbacks y métodos de arreglos.",
      "Un buen enfoque docente consiste en pasar de función tradicional a arrow function por etapas, mostrando qué cambia en la sintaxis y qué cambia en el comportamiento.",
    ],
    note: ["Aplicación práctica", "Use `map`, `filter` y `reduce` con datos académicos como notas, estudiantes o materias.", "E8F1FA"],
  },
  {
    heading: "6. Estructuras de control",
    paragraphs: [
      "Las decisiones y repeticiones siguen siendo fundamentales. En TypeScript moderno, el valor añadido aparece cuando una condición refina el tipo de una variable.",
      "Las uniones discriminadas son una herramienta excelente para enseñar modelado seguro de estados: carga, éxito y error. Esta técnica prepara al estudiante para frontend, backend y APIs.",
      "El control exhaustivo con `never` debe presentarse como una red de seguridad profesional, no como un truco aislado.",
    ],
    note: ["Consejo de evaluación", "Pida al estudiante explicar por qué el caso `default` puede quedar tipado como `never`.", "EAF4EA"],
  },
  {
    heading: "7. Clases e 8. Interfaces",
    paragraphs: [
      "Las clases organizan datos y comportamiento, mientras que las interfaces definen contratos. La enseñanza efectiva consiste en mostrar cuándo conviene cada una, no en enfrentarlas como si fueran rivales.",
      "En proyectos profesionales, una clase puede implementar interfaces para separar diseño de implementación. Eso facilita pruebas, lectura y evolución del sistema.",
      "También conviene introducir encapsulación, `readonly`, abstracción y herencia con ejemplos pequeños y transparentes.",
    ],
    note: ["Enfoque recomendado", "Primero enseñe interfaces para modelar formas; después muestre clases cuando haga falta comportamiento y estado.", "FFF4DE"],
  },
  {
    heading: "9. Temas complementarios usados en 2026",
    paragraphs: [
      "El panorama actual exige genéricos, asincronía, utilitarios como `Partial` y patrones explícitos de error como `Result`. Estos temas conectan la base del lenguaje con trabajo real.",
      "La asincronía debe enseñarse junto con tipado: `Promise<T>`, `async/await` y respuesta controlada. Así el estudiante entiende no solo la espera, sino también la forma del dato esperado.",
      "El patrón `Result` resulta especialmente didáctico porque obliga a pensar en éxito y error como variantes del dominio.",
    ],
    note: ["Cierre pedagógico", "Una buena secuencia final integra un mini proyecto con repositorios, servicios, validación y manejo de errores.", "E8F1FA"],
  },
];

// Esta tabla resume el contenido del libro en un formato rápido de consulta.
const summaryTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  rows: [
    new TableRow({
      children: [
        new TableCell({
          shading: { fill: "DCEAF5" },
          children: [new Paragraph({ children: [new TextRun({ text: "Capítulo", bold: true, font: "Calibri" })] })],
        }),
        new TableCell({
          shading: { fill: "DCEAF5" },
          children: [new Paragraph({ children: [new TextRun({ text: "Competencia desarrollada", bold: true, font: "Calibri" })] })],
        }),
      ],
    }),
    ...sections.map(
      (section) =>
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: section.heading, font: "Calibri", size: 22 })],
                }),
              ],
            }),
            new TableCell({
              children: [
                new Paragraph(
                  section.paragraphs[0] ?? "Competencia sintetizada en la comprensión y aplicación del tema."
                ),
              ],
            }),
          ],
        })
    ),
  ],
});

// Esta instancia construye el documento completo.
const doc = new Document({
  creator: "Codex",
  title: "TypeScript 2026 - Guía profesional",
  description: "Tutorial profesional universitario sobre TypeScript 2026 con Bun.",
  sections: [
    {
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Universidad Alexander von Humboldt | TypeScript 2026",
                  italics: true,
                  font: "Calibri",
                  size: 18,
                  color: "4F6D7A",
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Página ", font: "Calibri", size: 18 }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 18 }),
              ],
            }),
          ],
        }),
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: "Universidad Alexander von Humboldt",
              bold: true,
              font: "Georgia",
              size: 32,
              color: "143A52",
            }),
          ],
        }),
        title("TypeScript 2026: Guía Profesional con Bun", HeadingLevel.TITLE),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: "Manual didáctico desde cero hasta nivel profesional",
              italics: true,
              font: "Calibri",
              size: 24,
              color: "4F6D7A",
            }),
          ],
        }),
        body("Este documento fue diseñado como tutorial universitario con estilo de libro de texto. Su propósito es acompañar a estudiantes que inician desde cero y avanzar hacia una práctica profesional compatible con el ecosistema moderno de 2026."),
        body("La propuesta editorial combina explicación conceptual, recomendaciones pedagógicas, lenguaje claro y un puente permanente hacia ejemplos ejecutables con Bun."),
        title("Mapa del contenido", HeadingLevel.HEADING_1),
        summaryTable,
        ...sections.flatMap((section) => [
          title(section.heading, HeadingLevel.HEADING_1),
          ...section.paragraphs.map((paragraph) => body(paragraph)),
          noteTable(section.note[0], section.note[1], section.note[2]),
        ]),
        title("Recomendaciones finales", HeadingLevel.HEADING_1),
        body("Trabaje siempre con `strict: true`, prefiera tipos expresivos antes que atajos inseguros, y convierta los errores en parte explícita del diseño."),
        body("Para una clase universitaria, combine lectura, ejecución en terminal, modificación de ejemplos y resolución de ejercicios contextualizados al entorno académico."),
      ],
    },
  ],
});

// Esta constante empaqueta el documento en un buffer binario.
const buffer = await Packer.toBuffer(doc);

// Esta línea escribe el documento final en disco.
await Bun.write(outputFile, buffer);

// Este `console.log` informa dónde quedó el archivo entregable.
console.log(`Documento generado en ${outputFile}`);
