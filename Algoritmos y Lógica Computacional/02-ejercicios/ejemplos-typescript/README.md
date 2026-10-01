# TypeScript 2026 con Bun

Este repositorio fue organizado como material didáctico completo para la Universidad Alexander von Humboldt. El enfoque es práctico: cada capítulo vive en su propia carpeta, cada carpeta incluye un `README.md` explicativo y cada archivo `.ts` se puede ejecutar directamente con Bun.

## Estructura

- `chapters/capitulo-01-ecosistema`: ecosistema TypeScript + Bun.
- `chapters/capitulo-02-tipado`: sistema de tipos.
- `chapters/capitulo-03-operadores`: operadores modernos y buenas prácticas.
- `chapters/capitulo-04-funciones`: funciones tradicionales, parámetros y retornos.
- `chapters/capitulo-05-funciones-flecha`: arrow functions y `this` léxico.
- `chapters/capitulo-06-control`: condicionales, bucles y uniones discriminadas.
- `chapters/capitulo-07-clases`: clases, herencia y abstracción.
- `chapters/capitulo-08-interfaces`: contratos, implementación y diseño de objetos.
- `chapters/capitulo-09-complementarios`: genéricos, `Result`, asincronía y utilidades.
- `scripts/generate-docx.ts`: generador del documento Word profesional.
- `dist/`: carpeta objetivo para el archivo `.docx` generado.

## Ejecución

Instalar dependencias:

```bash
bun install
```

Ejecutar el índice general:

```bash
bun run dev
```

Ejecutar un capítulo específico:

```bash
bun run capitulo:01
bun run capitulo:02
bun run capitulo:03
bun run capitulo:04
bun run capitulo:05
bun run capitulo:06
bun run capitulo:07
bun run capitulo:08
bun run capitulo:09
```

Validar tipos:

```bash
bun run check
```

Generar el documento Word:

```bash
bun run docx
```

El archivo final queda en `dist/typescript-2026-guia-profesional.docx`.
