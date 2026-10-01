# rust-calculator — Rust × WebAssembly

Calculadora minimalista compilada a WASM con Rust.  
Diseñada para portafolio: código limpio, lógica en Rust, UI terminal amber.

---

## Estructura de archivos

```
rust-calculator/
├── src/
│   └── lib.rs          # Toda la lógica de la calculadora (Rust puro)
├── www/
│   ├── index.html      # Estructura HTML + layout del teclado
│   ├── style.css       # Diseño completo (dark terminal, acentos dorados)
│   └── app.js          # Glue JS: carga WASM, conecta botones y teclado
├── Cargo.toml          # Dependencias Rust (solo wasm-bindgen)
└── README.md           # Este archivo
```

Después de compilar, wasm-pack genera la carpeta `pkg/`:

```
pkg/
├── rust_calculator.js      # Módulo ES que envuelve el WASM
├── rust_calculator_bg.wasm # Binario WebAssembly compilado
├── rust_calculator.d.ts    # Tipos TypeScript (opcional)
└── package.json
```

---

## Requisitos

| Herramienta    | Versión mínima | Instalación                              |
|----------------|----------------|------------------------------------------|
| Rust + Cargo   | 1.70+          | `curl https://sh.rustup.rs -sSf \| sh`   |
| wasm-pack      | 0.12+          | `cargo install wasm-pack`                |
| Servidor HTTP  | cualquiera     | `python3`, `npx serve`, `caddy`, etc.    |

> **Por qué un servidor HTTP?**  
> Los ES Modules y los archivos `.wasm` no pueden cargarse desde `file://`.  
> El navegador bloquea la petición por CORS. Necesitás `http://localhost:…`.

---

## Cómo ejecutarlo

### 1. Compilar el código Rust a WebAssembly

```bash
cd rust-calculator
wasm-pack build --target web
```

Esto genera la carpeta `pkg/` con el `.wasm` y el módulo JS.

- `--target web`: genera ES Modules que se importan directamente en el browser,
  sin necesidad de bundler (webpack, vite, etc.).

---

### 2. Servir el proyecto

Cualquiera de estas opciones funciona:

```bash
# Python (incluido en casi cualquier sistema)
cd www && python3 -m http.server 8080

# Node.js
npx serve www -p 8080

# Rust (si tenés 'miniserve')
miniserve www --port 8080
```

---

### 3. Abrir en el navegador

```
http://localhost:8080
```

---

## Decisiones técnicas

### `wasm-bindgen` — el puente Rust ↔ JS

wasm-bindgen genera automáticamente el glue code que permite:
- Exponer un `struct` de Rust como una clase de JavaScript
- Pasar `String` entre los dos mundos (con serialización automática UTF-8)
- Llamar métodos de Rust desde JS con tipos nativos

### `--target web` en wasm-pack

Sin bundler. El `pkg/rust_calculator.js` generado es un ES Module
que el browser importa directamente. Cero dependencias de npm para correr.
Ideal para proyectos de portafolio pequeños.

### Máquina de estados explícita en Rust

La calculadora usa flags (`start_new`, `has_decimal`, `error`) en lugar
de un enum de estado completo. Más simple, más fácil de razonar para
una calculadora de 4 operaciones. Si se quisiera agregar historial,
memoria o expresiones complejas, un parser con un AST sería el siguiente paso.

### Sin framework en el frontend

El HTML/JS es vanilla. No hace falta React ni Vue para 5 tipos de botones.
Menos dependencias = menos puntos de falla = carga más rápida.

### `opt-level = "s"` en release

WASM se sirve por HTTP. Optimizar por tamaño (no por velocidad) reduce
el tiempo de descarga y parseo inicial. Para una calculadora, la diferencia
de velocidad en ejecución es imperceptible.

---

## Soporte de teclado

| Tecla        | Acción                  |
|--------------|-------------------------|
| `0`–`9`      | Ingresar dígito         |
| `.`          | Punto decimal           |
| `+` `-` `*`  | Operadores              |
| `/`          | División                |
| `Enter` `=`  | Evaluar                 |
| `Backspace`  | Borrar último dígito    |
| `Escape`     | Limpiar todo            |

---

## Errores manejados

| Caso                  | Mensaje en display   |
|-----------------------|----------------------|
| División por cero     | `÷ 0 undefined`      |
| Número demasiado grande | `Overflow`         |
| Estado inválido       | `Error`              |

Al presionar cualquier operador o `C` después de un error, la calculadora se reinicia.
