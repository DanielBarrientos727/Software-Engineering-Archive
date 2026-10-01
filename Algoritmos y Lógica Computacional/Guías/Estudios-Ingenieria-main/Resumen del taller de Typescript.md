# 🟦 TypeScript 2026 — Guía Completa

### Del Ecosistema a la Práctica Profesional

> **Universidad Alexander von Humboldt · Facultad de Ingeniería · 2026**  
> Tutorial para Principiantes y Nivel Intermedio · Gestor de paquetes: **Bun**  
> Adaptado para Fedora Linux

---

## 📋 Tabla de Contenidos

- [⚙️ Capítulo 1 — El Ecosistema TypeScript en 2026](#%EF%B8%8F-cap%C3%ADtulo-1--el-ecosistema-typescript-en-2026)
- [🏷️ Capítulo 2 — Sistema de Tipado](#%EF%B8%8F-cap%C3%ADtulo-2--sistema-de-tipado)
- [🔣 Capítulo 3 — Operadores](#-cap%C3%ADtulo-3--operadores)
- [🔧 Capítulo 4 — Funciones](#-cap%C3%ADtulo-4--funciones)
- [➡️ Capítulo 5 — Funciones Flecha (Arrow Functions)](#%EF%B8%8F-cap%C3%ADtulo-5--funciones-flecha-arrow-functions)
- [🔀 Capítulo 6 — Estructuras de Control](#-cap%C3%ADtulo-6--estructuras-de-control)
- [🏗️ Capítulo 7 — Clases](#%EF%B8%8F-cap%C3%ADtulo-7--clases)
- [📐 Capítulo 8 — Interfaces](#-cap%C3%ADtulo-8--interfaces)
- [🚀 Capítulo 9 — Temas Avanzados](#-cap%C3%ADtulo-9--temas-avanzados)
- [🎓 Capítulo 10 — Proyecto Práctico Integrador](#-cap%C3%ADtulo-10--proyecto-pr%C3%A1ctico-integrador)
- [📖 Glosario](#-glosario-de-t%C3%A9rminos)
- [🔗 Recursos](#-bibliograf%C3%ADa-y-recursos)

---

## ⚙️ Capítulo 1 — El Ecosistema TypeScript en 2026

### 1.1 ¿Qué es TypeScript?

TypeScript es un lenguaje de código abierto creado y mantenido por Microsoft. Técnicamente es un **superconjunto tipado de JavaScript**: todo código JavaScript válido también es TypeScript válido, pero TypeScript agrega características extra siendo la más importante el **sistema de tipos estáticos**.

> 💬 **Analogía:** JavaScript es como hablar un idioma sin reglas gramaticales — puedes comunicarte, pero es fácil cometer errores que nadie detecta hasta que algo se rompe. TypeScript agrega gramática formal: el compilador actúa como un corrector que te avisa de errores **antes** de que el programa llegue al usuario.

En 2026, TypeScript ha superado la versión 5.7+ y se integra de forma nativa con los principales runtimes. Razones para aprenderlo hoy:

| Razón                 | Descripción                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| Seguridad de tipos    | Detecta errores en tiempo de compilación, no en producción                |
| Productividad         | Autocompletado inteligente, refactorización segura y documentación inline |
| Ecosistema maduro     | Más del 90% de librerías populares incluyen tipos nativos                 |
| Demanda laboral       | Es el lenguaje más solicitado para desarrollo fullstack                   |
| Soporte nativo de Bun | Ejecución directa de `.ts` sin compilación previa                         |
| IA y herramientas     | Los modelos de IA generan mejor código TypeScript tipado                  |

---

### 1.2 Bun: El Runtime Moderno

**Bun** es un runtime de JavaScript y TypeScript escrito en Zig, diseñado para ser extremadamente rápido. En 2026, Bun ha reemplazado en gran medida a Node.js para proyectos nuevos.

|Característica|Node.js|Bun|
|---|---|---|
|Ejecución de TypeScript|Requiere `ts-node` o compilación|Nativo, sin configuración|
|Gestor de paquetes|`npm` (separado)|Integrado (`bun install`)|
|Velocidad de instalación|Moderada|Hasta 25× más rápido|
|Test runner|Jest/Vitest (externo)|Integrado (`bun test`)|
|Bundler|Webpack/Vite (externo)|Integrado (`bun build`)|
|Hot reload|`nodemon` (externo)|Integrado (`bun --watch`)|

#### 1.2.1 Instalación de Bun en Fedora Linux

```bash
# Instalar Bun (una sola línea)
curl -fsSL https://bun.sh/install | bash

# Recargar el shell para que el PATH se actualice
source ~/.bashrc   # o source ~/.zshrc si usas zsh

# Verificar instalación
bun --version
```

> 💡 A diferencia de Node.js que requiere `sudo dnf install nodejs`, Bun se instala en tu `~/.bun/bin` sin necesitar permisos de root.

#### 1.2.2 Crear un proyecto TypeScript con Bun

```bash
# Inicializar un proyecto nuevo (una sola línea)
bun init

# Esto genera automáticamente:
# ├── package.json
# ├── tsconfig.json   ← Configuración de TypeScript
# ├── index.ts        ← Archivo principal
# └── bun.lockb       ← Archivo de bloqueo de dependencias
```

#### 1.2.3 Ejecutar archivos TypeScript

```bash
# Ejecutar directamente un archivo .ts (sin compilar)
bun run index.ts

# Ejecutar con hot reload (recarga automática al guardar)
bun --watch index.ts

# Ejecutar en modo producción
bun run --production index.ts
```

> 💡 **Tip:** Usa siempre `bun --watch` durante el desarrollo. Cada vez que guardes un cambio, Bun reiniciará automáticamente, ahorrando tiempo.

---

### 1.3 Estructura del `tsconfig.json`

El archivo `tsconfig.json` es el corazón de la configuración de TypeScript. Define cómo se comporta el compilador y qué reglas aplica:

```json
{
  "compilerOptions": {
    "target": "ESNext",                  // Versión de JS destino
    "module": "ESNext",                  // Sistema de módulos
    "moduleResolution": "bundler",       // Resolución moderna
    "strict": true,                      // Todas las reglas estrictas (OBLIGATORIO)
    "noUncheckedIndexedAccess": true,    // Acceso seguro a arrays
    "exactOptionalPropertyTypes": true,
    "outDir": "./dist",                  // Carpeta de salida
    "rootDir": "./src",                  // Carpeta fuente
    "declaration": true,                 // Generar archivos .d.ts
    "sourceMap": true                    // Mapas de depuración
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

> ⚠️ **Importante:** La opción `"strict": true` activa un conjunto de verificaciones que garantizan código más seguro. En 2026, esta opción es **obligatoria** en cualquier proyecto profesional. Nunca la desactives.

---

### 1.4 Herramientas del Ecosistema 2026

|Herramienta|Propósito|Comando|
|---|---|---|
|**Bun**|Runtime + gestor de paquetes|`bun run` / `bun install`|
|**Biome**|Linter + Formatter (reemplaza ESLint + Prettier)|`biome check` / `biome format`|
|**Vitest**|Framework de testing compatible con Bun|`bun test`|
|**Drizzle ORM**|ORM tipado para bases de datos|`drizzle-kit generate`|
|**Zod**|Validación de esquemas con inferencia de tipos|`import { z } from 'zod'`|
|**tRPC**|APIs tipadas end-to-end|`import { router } from '@trpc/server'`|
|**Hono**|Framework web ultraligero para Bun|`new Hono()`|

```bash
# Instalar herramientas clave en tu proyecto
bun add zod
bun add --dev @biomejs/biome

# Instalar Biome globalmente
bun install -g @biomejs/biome
```

---

## 🏷️ Capítulo 2 — Sistema de Tipado

### 2.1 ¿Qué es el Tipado Estático?

El tipado estático significa que cada variable, parámetro y valor de retorno tiene un tipo definido que se verifica **en tiempo de compilación**, antes de ejecutar el programa. Esto contrasta con JavaScript, donde los tipos se verifican en tiempo de ejecución (tipado dinámico).

> 💬 **Analogía:** El tipado estático es como etiquetar cada caja en una mudanza antes de cargar el camión. Si intentas meter un plato en una caja etiquetada como "libros", el sistema te avisa del error **antes** de que se rompa algo. En JavaScript, cargas las cajas sin etiquetar y descubres los problemas cuando llegás a destino.

---

### 2.2 Tipos Primitivos

TypeScript ofrece tipos primitivos que representan los valores más básicos:

```typescript
// String: texto
let nombre: string = "Daniel";
let saludo: string = `Hola, ${nombre}`; // Template literal

// Number: números enteros y decimales (no hay int/float separados)
let edad: number = 18;
let precio: number = 99.99;
let hexadecimal: number = 0xFF;

// Boolean: verdadero o falso
let activo: boolean = true;
let eliminado: boolean = false;

// BigInt: números muy grandes (cuando number no alcanza)
let distanciaEstelar: bigint = 9461000000000000n;

// Symbol: identificador único e irrepetible
let id: symbol = Symbol("identificador");

// Null y Undefined: ausencia de valor
let vacio: null = null;
let indefinido: undefined = undefined;
```

> 💡 **Consejo:** En la mayoría de los casos, TypeScript puede **inferir** el tipo automáticamente. Escribe `let nombre = "Daniel"` y TypeScript sabrá que es `string`. Usa anotaciones explícitas solo cuando la inferencia no sea obvia o para parámetros de funciones.

---

### 2.3 Inferencia de Tipos

TypeScript deduce automáticamente el tipo de una variable a partir de su valor asignado:

```typescript
// TypeScript INFIERE los tipos automáticamente:
let ciudad = "Armenia";        // Tipo inferido: string
let poblacion = 320000;        // Tipo inferido: number
let esCapital = false;         // Tipo inferido: boolean

// La inferencia también funciona con expresiones:
let resultado = 10 + 20;       // Tipo inferido: number
let mensaje = `Hola ${ciudad}`; // Tipo inferido: string

// TypeScript detecta errores gracias a la inferencia:
ciudad = 42;   // ❌ Error: Type 'number' is not assignable to type 'string'
```

---

### 2.4 Tipos Especiales

#### `any`, `unknown`, `never` y `void`

|Tipo|Significado|¿Cuándo usarlo?|
|---|---|---|
|`any`|Acepta cualquier tipo, desactiva verificación|**NUNCA** en código profesional|
|`unknown`|Acepta cualquier tipo, pero exige verificación antes de usar|Cuando recibes datos de origen desconocido|
|`never`|Ningún valor posible|Funciones que lanzan errores o bucles infinitos|
|`void`|Sin valor de retorno|Funciones que no retornan nada|

```typescript
// ✅ unknown: seguro, requiere verificación antes de usar
function procesarDato(dato: unknown): string {
  if (typeof dato === "string") {
    return dato.toUpperCase(); // TypeScript sabe que es string aquí
  }
  if (typeof dato === "number") {
    return dato.toFixed(2);    // TypeScript sabe que es number aquí
  }
  return "Tipo no soportado";
}

// ✅ never: la función nunca retorna normalmente
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}

// ✅ void: la función no retorna un valor
function saludar(nombre: string): void {
  console.log(`Hola, ${nombre}`);
}
```

> ⚠️ **Advertencia:** Evita `any` a toda costa. En 2026, usar `any` es considerado una mala práctica grave. Si no conoces el tipo, usa `unknown` y realiza verificaciones antes de operar.

---

### 2.5 Arrays y Tuplas

```typescript
// Arrays: todos los elementos del mismo tipo
let numeros: number[] = [1, 2, 3, 4, 5];
let nombres: Array<string> = ["Ana", "Luis", "Daniel"];

// Arrays de solo lectura (inmutables, nadie puede modificarlos)
let constantes: readonly number[] = [3.14, 2.71, 1.61];
// constantes.push(42); ❌ Error: propiedad push no existe en readonly

// Tuplas: longitud Y tipos fijos por posición
// Útiles cuando sabes exactamente cuántos elementos hay y qué tipo es cada uno
let coordenada: [number, number] = [4.53, -75.68]; // Armenia, Quindío
let persona: [string, number, boolean] = ["Daniel", 18, true];

// Tuplas con etiquetas (TypeScript 5.x+, más legibles)
let ubicacion: [latitud: number, longitud: number] = [4.53, -75.68];

// Acceso tipado a elementos de tupla
let lat = ubicacion[0]; // Tipo: number
let lon = ubicacion[1]; // Tipo: number
```

---

### 2.6 Type Aliases y Union Types

Los **alias de tipo** crean nombres descriptivos para tipos complejos. Los **tipos unión** permiten que una variable acepte múltiples tipos:

```typescript
// Type Alias: crear un nombre para un tipo
type Edad = number;
type Nombre = string;
type EstadoCivil = "soltero" | "casado" | "divorciado" | "viudo";

// Union Types: aceptar múltiples tipos
type ID = string | number;
let usuarioId: ID = "abc-123"; // ✅ Válido
usuarioId = 456;               // ✅ Válido
// usuarioId = true;           // ❌ Error: boolean no es assignable a ID

// Objetos con Type Alias
type Estudiante = {
  nombre: string;
  edad: number;
  carrera: string;
  matricula: string;
  promedio?: number; // ? = propiedad opcional
};

const alumno: Estudiante = {
  nombre: "Daniel",
  edad: 18,
  carrera: "Ingeniería de Software",
  matricula: "2026-001",
  // promedio es opcional, no es necesario incluirlo
};
```

---

### 2.7 Literal Types e Intersection Types

Los **tipos literales** restringen una variable a valores específicos. Los **tipos intersección** combinan múltiples tipos en uno:

```typescript
// Literal Types: valores exactos como tipos
type Direccion = "norte" | "sur" | "este" | "oeste";
let rumbo: Direccion = "norte";     // ✅
// rumbo = "noroeste";              // ❌ Error

// Literal Types numéricos (útil para códigos HTTP)
type CodigoHTTP = 200 | 201 | 400 | 404 | 500;
let status: CodigoHTTP = 200;       // ✅

// Intersection Types: combinar tipos con &
// El objeto resultante DEBE tener TODAS las propiedades de ambos tipos
type ConDireccion = { direccion: string; ciudad: string };
type ConTelefono = { telefono: string; extension?: number };

type Contacto = ConDireccion & ConTelefono;

const contacto: Contacto = {
  direccion: "Calle 123 #45-67",
  ciudad: "Armenia",
  telefono: "+57 315 000 0000",
  extension: 101,
};
```

---

## 🔣 Capítulo 3 — Operadores

### 3.1 Operadores Aritméticos

TypeScript hereda todos los operadores de JavaScript y añade seguridad de tipos:

```typescript
let a: number = 20;
let b: number = 7;

let suma           = a + b;   // 27
let resta          = a - b;   // 13
let multiplicacion = a * b;   // 140
let division       = a / b;   // 2.857...
let modulo         = a % b;   // 6 (residuo de la división)
let exponente      = a ** 2;  // 400 (potencia, a elevado a 2)

// Operadores de asignación compuesta (atajos)
let x = 10;
x += 5;   // x = x + 5  → 15
x -= 3;   // x = x - 3  → 12
x *= 2;   // x = x * 2  → 24
x /= 4;   // x = x / 4  → 6
x **= 3;  // x = x ^ 3  → 216
```

---

### 3.2 Operadores de Comparación

En TypeScript se recomienda **siempre** usar comparación estricta (`===` y `!==`):

|Operador|Significado|Ejemplo|Resultado|
|---|---|---|---|
|`===`|Igualdad estricta (tipo + valor)|`5 === 5`|`true`|
|`!==`|Desigualdad estricta|`5 !== "5"`|`true`|
|`>`|Mayor que|`10 > 5`|`true`|
|`<`|Menor que|`3 < 8`|`true`|
|`>=`|Mayor o igual que|`5 >= 5`|`true`|
|`<=`|Menor o igual que|`4 <= 3`|`false`|

> ⚠️ **NUNCA uses `==` o `!=`** en TypeScript. Estos operadores realizan coerción de tipos y producen resultados inesperados. Siempre usa `===` y `!==`.

---

### 3.3 Operadores Lógicos

```typescript
let esMayor: boolean = true;
let tienePermiso: boolean = false;

// AND (&&): ambas condiciones deben ser verdaderas
let puedeEntrar = esMayor && tienePermiso; // false

// OR (||): al menos una condición verdadera
let tieneAcceso = esMayor || tienePermiso; // true

// NOT (!): invierte el valor
let estaBloqueado = !tienePermiso;         // true

// Ejemplo práctico: validación compuesta
let edad = 18;
let pais = "Colombia";
let aceptoTerminos = true;
let puedeRegistrarse = edad >= 18 && pais === "Colombia" && aceptoTerminos;
// → true
```

---

### 3.4 Operadores Especiales de TypeScript

TypeScript introduce operadores propios que mejoran la seguridad y legibilidad del código.

#### 3.4.1 Optional Chaining (`?.`)

Permite acceder a propiedades de objetos que podrían ser `null` o `undefined` **sin provocar errores en tiempo de ejecución**:

```typescript
type Usuario = {
  nombre: string;
  direccion?: {       // <- esta propiedad puede no existir
    calle?: string;
    ciudad: string;
  };
};

const usuario: Usuario = { nombre: "Daniel" };

// Sin optional chaining: error potencial 💥
// const calle = usuario.direccion.calle; // ❌ Cannot read properties of undefined

// Con optional chaining: si direccion no existe, devuelve undefined (sin error) ✅
const calle  = usuario.direccion?.calle;  // undefined
const ciudad = usuario.direccion?.ciudad; // undefined
```

#### 3.4.2 Nullish Coalescing (`??`)

Proporciona un valor por defecto **solo cuando la expresión es `null` o `undefined`** (no cuando es `0` o cadena vacía, a diferencia de `||`):

```typescript
let nombre: string | null = null;
let mostrar = nombre ?? "Anónimo"; // "Anónimo"

// La diferencia crucial con ||:
let cantidad: number = 0;
let conOR      = cantidad || "sin datos"; // "sin datos" ❌ (0 es falsy, se ignora)
let conNullish = cantidad ?? 100;         // 0           ✅ (0 no es null/undefined)

// ?? solo reacciona a null y undefined, no a 0, false, o ""
```

#### 3.4.3 Non-null Assertion (`!`)

Le dice al compilador que un valor **NO es null ni undefined**. Úsalo solo cuando estés 100% seguro:

```typescript
// Cuando ESTÁS SEGURO de que el valor existe
const elemento = document.getElementById("app")!;

// ⚠️ Mejor alternativa: validar explícitamente
const elementoSeguro = document.getElementById("app");
if (elementoSeguro) {
  elementoSeguro.textContent = "Cargado"; // TypeScript ya sabe que no es null aquí
}
```

#### 3.4.4 Operador `satisfies` (TypeScript 5.x+)

Verifica que un valor cumple con un tipo **sin cambiar el tipo inferido**. Ideal para validar configuraciones:

```typescript
type Colores = Record<string, [number, number, number]>;

// satisfies valida la estructura pero mantiene la inferencia exacta de cada clave
const paleta = {
  rojo:  [255, 0, 0],
  verde: [0, 255, 0],
  azul:  [0, 0, 255],
} satisfies Colores;

const r = paleta.rojo;    // Tipo: [number, number, number] ✅
// paleta.amarillo;       // ❌ Error: la propiedad no existe
```

#### 3.4.5 `typeof` como Type Guard

`typeof` refina el tipo de una variable dentro de un bloque condicional:

```typescript
function formatear(valor: string | number): string {
  if (typeof valor === "string") {
    // Aquí TypeScript sabe que valor es string
    return valor.toUpperCase();
  }
  // Aquí TypeScript sabe que valor es number
  return valor.toFixed(2);
}

console.log(formatear("hola"));   // "HOLA"
console.log(formatear(3.14159));  // "3.14"
```

---

## 🔧 Capítulo 4 — Funciones

### 4.1 Fundamentos de Funciones en TypeScript

Las funciones son los bloques constructores fundamentales de cualquier programa. En TypeScript, las funciones incluyen tipos para sus parámetros y valor de retorno.

> 💬 **Analogía:** Una función es como una máquina expendedora: insertás una moneda (parámetro con tipo específico) y recibís un producto (valor de retorno con tipo específico). TypeScript se asegura de que solo insertes monedas válidas y de que siempre recibas el producto esperado.

---

### 4.2 Declaración de Funciones

```typescript
// Función con tipos explícitos de parámetros y retorno
function sumar(a: number, b: number): number {
  return a + b;
}

// TypeScript verifica los tipos al llamar la función:
const resultado = sumar(5, 3);      // ✅ resultado: number
// const error  = sumar("5", 3);    // ❌ Error de tipo
// const error2 = sumar(5, 3, 1);   // ❌ Demasiados argumentos
```

---

### 4.3 Parámetros Opcionales y con Valor por Defecto

```typescript
// Parámetro opcional: se indica con ?
// Los opcionales SIEMPRE van al final
function saludar(nombre: string, titulo?: string): string {
  if (titulo) {
    return `Hola, ${titulo} ${nombre}`;
  }
  return `Hola, ${nombre}`;
}

saludar("Daniel");        // "Hola, Daniel"
saludar("Daniel", "Ing."); // "Hola, Ing. Daniel"

// Parámetro con valor por defecto
function crearUsuario(nombre: string, rol: string = "estudiante"): string {
  return `${nombre} (${rol})`;
}

crearUsuario("Daniel");            // "Daniel (estudiante)"
crearUsuario("Daniel", "docente"); // "Daniel (docente)"
```

---

### 4.4 Parámetros Rest (Variadic)

Los parámetros rest permiten que una función acepte un número indefinido de argumentos, capturándolos como un array:

```typescript
// ...numeros captura TODOS los argumentos como un array
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((total, num) => total + num, 0);
}

sumarTodos(1, 2, 3);        // 6
sumarTodos(10, 20, 30, 40); // 100

// Combinar parámetros fijos con rest
function registrar(accion: string, ...detalles: string[]): void {
  console.log(`[${accion}] ${detalles.join(", ")}`);
}

registrar("LOGIN", "usuario: daniel", "ip: 192.168.1.1");
// [LOGIN] usuario: daniel, ip: 192.168.1.1
```

---

### 4.5 Sobrecarga de Funciones (Overloads)

La sobrecarga permite que una función tenga múltiples firmas con diferentes tipos de parámetros:

```typescript
// Firmas de sobrecarga (solo declaración de tipos, sin cuerpo)
function buscar(id: number): string;
function buscar(email: string): string;

// Implementación (debe ser compatible con todas las firmas)
function buscar(criterio: number | string): string {
  if (typeof criterio === "number") {
    return `Buscando por ID: ${criterio}`;
  }
  return `Buscando por email: ${criterio}`;
}

buscar(42);             // ✅ usa la primera firma
buscar("d@d.com");      // ✅ usa la segunda firma
// buscar(true);        // ❌ boolean no coincide con ninguna firma
```

---

### 4.6 Funciones como Tipos

En TypeScript, las funciones son "ciudadanos de primera clase": puedes definir tipos para funciones y pasarlas como argumentos:

```typescript
// Definir un tipo de función
type Operacion = (a: number, b: number) => number;

// Usar el tipo para garantizar consistencia
const sumar:      Operacion = (a, b) => a + b;
const restar:     Operacion = (a, b) => a - b;
const multiplicar: Operacion = (a, b) => a * b;

// Función de orden superior: recibe otra función como parámetro
function calcular(a: number, b: number, operacion: Operacion): number {
  return operacion(a, b);
}

calcular(10, 5, sumar);        // 15
calcular(10, 5, restar);       // 5
calcular(10, 5, multiplicar);  // 50
```

---

## ➡️ Capítulo 5 — Funciones Flecha (Arrow Functions)

### 5.1 Sintaxis de Funciones Flecha

Las funciones flecha son una forma concisa de escribir funciones. Son el **estándar dominante** en TypeScript 2026. Su principal ventaja es que heredan el contexto `this` del ámbito donde se definen:

```typescript
// Función tradicional
function duplicar(x: number): number {
  return x * 2;
}

// Equivalente como función flecha
const duplicarFlecha = (x: number): number => {
  return x * 2;
};

// Forma ultra-concisa (retorno implícito, una sola expresión)
const duplicarCorta = (x: number): number => x * 2;

// Si solo hay un parámetro, los paréntesis son opcionales en JS
// pero en TypeScript son necesarios para anotar el tipo
const triplicar = (x: number): number => x * 3;
```

---

### 5.2 Diferencias con Funciones Tradicionales

|Característica|`function` tradicional|Arrow function|
|---|---|---|
|Contexto `this`|Propio (dinámico)|Hereda del padre (léxico)|
|Uso como método|Recomendado|Evitar (`this` problemático)|
|Constructor|Sí (con `new`)|No permite `new`|
|`arguments`|Disponible|No disponible (usar `...rest`)|
|Sintaxis|Más verbosa|Concisa|
|Hoisting|Sí (se eleva al inicio)|No (debe declararse antes de usar)|

---

### 5.3 El Problema del `this`

La razón principal para usar funciones flecha es el manejo predecible de `this`:

```typescript
class Temporizador {
  segundos: number = 0;

  // ❌ Problema con función tradicional
  iniciarMal() {
    setInterval(function() {
      this.segundos++; // ❌ Error: this NO apunta a Temporizador aquí
    }, 1000);
  }

  // ✅ Solución con función flecha
  iniciarBien() {
    setInterval(() => {
      this.segundos++; // ✅ this SÍ apunta a Temporizador
      console.log(this.segundos);
    }, 1000);
  }
}
```

> 📌 **Regla general en 2026:** Usa funciones flecha para callbacks, event handlers y funciones inline. Usa `function` para métodos de clase y funciones que necesiten su propio contexto `this`.

---

### 5.4 Patrones Comunes con Funciones Flecha

```typescript
// Transformar arrays con map
const precios = [100, 200, 300];
const conIVA = precios.map((precio) => precio * 1.19);
// [119, 238, 357]

// Filtrar con filter
const mayores = [15, 22, 17, 30, 12].filter((edad) => edad >= 18);
// [22, 30]

// Reducir con reduce
const total = precios.reduce((acum, precio) => acum + precio, 0);
// 600

// Retorno de objetos (REQUIERE paréntesis para no confundir con bloque de código)
const crearUsuario = (nombre: string, edad: number) => ({
  nombre,
  edad,
  activo: true,
});

// Funciones de orden superior (retornan otras funciones)
const multiplicarPor = (factor: number) => (valor: number) => valor * factor;
const doble  = multiplicarPor(2);
const triple = multiplicarPor(3);
doble(5);  // 10
triple(5); // 15
```

---

### 5.5 Funciones Flecha Genéricas

Las funciones flecha también pueden usar genéricos para ser reutilizables con múltiples tipos:

```typescript
// Función genérica: T representa cualquier tipo
const primero = <T>(arr: T[]): T | undefined => arr[0];

primero([1, 2, 3]);       // Tipo inferido: number | undefined
primero(["a", "b", "c"]); // Tipo inferido: string | undefined

// Con restricción de tipo (T debe tener la propiedad id)
const obtenerPropiedad = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

const nombre = obtenerPropiedad({ nombre: "Daniel", edad: 18 }, "nombre");
// Tipo: string ✅
```

---

## 🔀 Capítulo 6 — Estructuras de Control

### 6.1 Condicionales

#### 6.1.1 `if / else if / else`

TypeScript refina los tipos automáticamente dentro de cada rama (type narrowing):

```typescript
function clasificarNota(nota: number): string {
  if (nota >= 4.5) {
    return "Excelente";
  } else if (nota >= 3.5) {
    return "Bueno";
  } else if (nota >= 3.0) {
    return "Aceptable";
  } else {
    return "Reprobado";
  }
}

console.log(clasificarNota(4.7)); // "Excelente"
console.log(clasificarNota(2.8)); // "Reprobado"
```

#### 6.1.2 Operador Ternario

Forma concisa de escribir un `if-else` en una sola línea:

```typescript
// condición ? valorSiVerdadero : valorSiFalso
const edad = 18;
const tipo = edad >= 18 ? "adulto" : "menor"; // "adulto"

// Ternarios anidados (usar con moderación, pueden volverse ilegibles)
const categoria = edad >= 65
  ? "senior"
  : edad >= 18
  ? "adulto"
  : "menor";
```

#### 6.1.3 `switch` con Exhaustive Checking

El `switch` es especialmente poderoso en TypeScript porque puede verificar que todos los casos de un tipo unión estén cubiertos:

```typescript
type Semaforo = "rojo" | "amarillo" | "verde";

function obtenerAccion(color: Semaforo): string {
  switch (color) {
    case "rojo":
      return "Detenerse";
    case "amarillo":
      return "Precaución";
    case "verde":
      return "Avanzar";
    default:
      // Exhaustive check con never:
      // Si añades un nuevo color al tipo Semaforo,
      // TypeScript marcará un error AQUÍ obligándote a manejarlo
      const _exhaustive: never = color;
      return _exhaustive;
  }
}
```

> 💡 El patrón de **exhaustive checking** con `never` es una de las técnicas más valiosas de TypeScript. Garantiza que cuando añadas una nueva variante a un tipo unión, el compilador te obligue a manejarla en todos los `switch`.

---

### 6.2 Bucles

#### 6.2.1 `for` clásico

```typescript
for (let i = 0; i < 5; i++) {
  console.log(`Iteración ${i}`);
}
```

#### 6.2.2 `for...of` — iterar valores (el más usado)

`for...of` es la forma **recomendada** para iterar sobre arrays, strings y cualquier iterable:

```typescript
const frutas: string[] = ["mango", "guanábana", "maracuyá"];

for (const fruta of frutas) {
  console.log(fruta); // TypeScript sabe que fruta es string
}

// Con desestructuración de tuplas
const estudiantes: [string, number][] = [["Daniel", 4.5], ["Santiago", 3.8]];

for (const [nombre, nota] of estudiantes) {
  console.log(`${nombre}: ${nota}`);
}
```

#### 6.2.3 `for...in` — iterar claves de objetos

```typescript
const config = { tema: "oscuro", idioma: "es", fuente: 14 };

for (const clave in config) {
  console.log(`${clave}: ${config[clave as keyof typeof config]}`);
}
```

#### 6.2.4 `while` y `do...while`

```typescript
// while: verifica la condición ANTES de ejecutar
let contador = 0;
while (contador < 3) {
  console.log(contador);
  contador++;
}

// do...while: ejecuta AL MENOS UNA VEZ, luego verifica
let intentos = 0;
do {
  intentos++;
  console.log(`Intento ${intentos}`);
} while (intentos < 3);
```

---

### 6.3 Control de Flujo Avanzado

#### 6.3.1 Discriminated Unions (Pattern Matching)

Combina tipos unión con una propiedad discriminante para crear patrones de control de flujo extremadamente seguros:

```typescript
// Cada variante tiene una propiedad 'tipo' única que las distingue
type Figura =
  | { tipo: "circulo";    radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "triangulo";  base: number;  altura: number };

function calcularArea(figura: Figura): number {
  switch (figura.tipo) {
    case "circulo":
      return Math.PI * figura.radio ** 2;
      // TypeScript sabe que figura.radio existe aquí ✅
    case "rectangulo":
      return figura.ancho * figura.alto;
      // TypeScript sabe que figura.ancho y figura.alto existen aquí ✅
    case "triangulo":
      return (figura.base * figura.altura) / 2;
  }
}

calcularArea({ tipo: "circulo", radio: 5 });         // ✅
// calcularArea({ tipo: "circulo", ancho: 5 });      // ❌ ancho no existe en circulo
```

---

## 🏗️ Capítulo 7 — Clases

### 7.1 Fundamentos de Clases

Las clases en TypeScript son plantillas para crear objetos que comparten la misma estructura y comportamiento. TypeScript extiende las clases de JavaScript con modificadores de acceso, propiedades tipadas y características avanzadas.

> 💬 **Analogía:** Una clase es como el plano de una casa. El plano define la estructura (habitaciones, puertas, ventanas) y el comportamiento (iluminación, calefacción). Cada casa construida a partir del plano es un objeto (instancia). Todas comparten la estructura, pero cada una tiene sus propios valores (color, muebles, habitantes).

---

### 7.2 Declaración Básica de una Clase

```typescript
class Estudiante {
  // Propiedades tipadas
  nombre: string;
  edad: number;
  carrera: string;
  promedio: number;

  // Constructor: se ejecuta cuando haces new Estudiante(...)
  constructor(nombre: string, edad: number, carrera: string) {
    this.nombre = nombre;
    this.edad = edad;
    this.carrera = carrera;
    this.promedio = 0; // valor inicial
  }

  // Método
  presentarse(): string {
    return `Soy ${this.nombre}, tengo ${this.edad} años y estudio ${this.carrera}`;
  }
}

// Crear una instancia (un "objeto" de la clase)
const alumno = new Estudiante("Daniel", 18, "Ingeniería de Software");
console.log(alumno.presentarse());
```

---

### 7.3 Modificadores de Acceso

TypeScript ofrece cuatro modificadores que controlan la visibilidad de propiedades y métodos:

|Modificador|Accesible desde|Uso común|
|---|---|---|
|`public`|Cualquier lugar (por defecto)|APIs públicas de la clase|
|`private`|Solo dentro de la clase|Datos internos, implementación|
|`protected`|Clase actual y subclases|Datos compartidos en herencia|
|`readonly`|Solo lectura después de asignar|Constantes de instancia|

```typescript
class CuentaBancaria {
  public    titular: string;
  private   saldo: number;
  protected banco: string;
  readonly  numeroCuenta: string;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.banco = "Banco Humboldt";
    this.numeroCuenta = this.generarNumero();
  }

  private generarNumero(): string {
    return `CTA-${Date.now()}`;
  }

  public depositar(monto: number): void {
    if (monto <= 0) throw new Error("Monto inválido");
    this.saldo += monto;
  }

  public consultarSaldo(): number {
    return this.saldo;
  }
}

const cuenta = new CuentaBancaria("Daniel", 1000);
cuenta.depositar(500);
console.log(cuenta.consultarSaldo()); // 1500
// cuenta.saldo = 0;                  // ❌ Error: saldo es private
```

---

### 7.4 Sintaxis Abreviada del Constructor

TypeScript permite declarar y asignar propiedades directamente en el constructor, eliminando código repetitivo:

```typescript
// ❌ Forma larga (repetitiva)
class ProductoLargo {
  nombre: string;
  precio: number;
  constructor(nombre: string, precio: number) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// ✅ Forma abreviada (recomendada en 2026)
// El modificador en el constructor hace TODO automáticamente
class Producto {
  constructor(
    public readonly nombre: string,
    public          precio: number,
    private         stock: number = 0,
  ) {}

  vender(cantidad: number): boolean {
    if (cantidad > this.stock) return false;
    this.stock -= cantidad;
    return true;
  }
}
```

---

### 7.5 Herencia

La herencia permite crear clases especializadas a partir de clases base con `extends`:

```typescript
// Clase base (padre)
class Animal {
  constructor(
    protected nombre: string,
    protected edad: number,
  ) {}

  presentarse(): string {
    return `Soy ${this.nombre}, tengo ${this.edad} años`;
  }
}

// Clase derivada (hija)
class Perro extends Animal {
  constructor(
    nombre: string,
    edad: number,
    private raza: string,
  ) {
    super(nombre, edad); // ← OBLIGATORIO: llamar al constructor padre primero
  }

  // Sobrescribir método del padre (override es obligatorio en modo strict)
  override presentarse(): string {
    return `${super.presentarse()} y soy un ${this.raza}`;
  }

  ladrar(): string {
    return "¡Guau!";
  }
}

const rex = new Perro("Rex", 5, "Labrador");
console.log(rex.presentarse());
// "Soy Rex, tengo 5 años y soy un Labrador"
```

> 📌 La palabra clave `override` indica explícitamente que un método sobrescribe al del padre. Es obligatorio activar `noImplicitOverride` en `tsconfig.json` para detectar errores.

---

### 7.6 Clases Abstractas

Las clases abstractas definen un contrato que las subclases deben cumplir. **No se pueden instanciar directamente**:

```typescript
abstract class FiguraGeometrica {
  constructor(public readonly color: string) {}

  // Métodos abstractos: DEBEN ser implementados por subclases (sin cuerpo aquí)
  abstract calcularArea(): number;
  abstract calcularPerimetro(): number;

  // Método concreto: disponible para todas las subclases (tiene implementación)
  describir(): string {
    return `Figura ${this.color}, área: ${this.calcularArea().toFixed(2)}`;
  }
}

class Circulo extends FiguraGeometrica {
  constructor(color: string, private radio: number) {
    super(color);
  }

  calcularArea(): number {
    return Math.PI * this.radio ** 2;
  }

  calcularPerimetro(): number {
    return 2 * Math.PI * this.radio;
  }
}

// const fig = new FiguraGeometrica("rojo"); // ❌ No se puede instanciar clase abstracta
const circulo = new Circulo("azul", 5);      // ✅
console.log(circulo.describir());
// "Figura azul, área: 78.54"
```

---

## 📐 Capítulo 8 — Interfaces

### 8.1 ¿Qué es una Interface?

Una **interface** define la "forma" (shape) que debe tener un objeto. Es un contrato que especifica qué propiedades y métodos debe tener un objeto, sin proporcionar la implementación.

> 💬 **Analogía:** Una interface es como un formulario de inscripción universitaria: define los campos obligatorios (nombre, edad, carrera) y opcionales (teléfono, foto). Cada estudiante llena el formulario con sus datos, pero todos siguen la misma estructura.

---

### 8.2 Declaración de Interfaces

```typescript
// Interface básica
interface Persona {
  nombre: string;
  edad: number;
  email: string;
  telefono?: string; // Opcional con ?
}

// Uso: el objeto DEBE cumplir con la interface
const profesor: Persona = {
  nombre: "Arle Morales",
  edad: 35,
  email: "arle@humboldt.edu.co",
  // telefono es opcional, no es necesario incluirlo
};

// ❌ Error: falta la propiedad 'email'
// const invalido: Persona = { nombre: "Ana", edad: 20 };
```

---

### 8.3 Interfaces con Métodos

```typescript
interface Vehiculo {
  marca: string;
  modelo: string;
  anio: number;
  velocidadMaxima: number;

  // Solo las firmas de los métodos, sin implementación
  acelerar(velocidad: number): void;
  frenar(): void;
  obtenerInfo(): string;
}

// Implementación del objeto
const miAuto: Vehiculo = {
  marca: "Toyota",
  modelo: "Corolla",
  anio: 2026,
  velocidadMaxima: 200,

  acelerar(velocidad: number): void {
    console.log(`Acelerando a ${velocidad} km/h`);
  },
  frenar(): void {
    console.log("Frenando...");
  },
  obtenerInfo(): string {
    return `${this.marca} ${this.modelo} (${this.anio})`;
  },
};
```

---

### 8.4 Extensión de Interfaces

Las interfaces pueden extender otras para crear jerarquías de tipos (similar a la herencia de clases):

```typescript
interface EntidadBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Usuario extends EntidadBase {
  nombre: string;
  email: string;
  rol: "admin" | "editor" | "lector";
}

interface Administrador extends Usuario {
  permisos: string[];
  nivel: number;
}

// Administrador tiene TODAS las propiedades:
// id, createdAt, updatedAt, nombre, email, rol, permisos, nivel
const admin: Administrador = {
  id: "admin-001",
  createdAt: new Date(),
  updatedAt: new Date(),
  nombre: "Laura Pérez",
  email: "laura@humboldt.edu.co",
  rol: "admin",
  permisos: ["crear", "editar", "eliminar"],
  nivel: 3,
};
```

---

### 8.5 Interfaces vs Type Aliases

En TypeScript 2026, ambos son muy similares pero existen diferencias importantes:

|Característica|`interface`|`type`|
|---|---|---|
|Extensión|`extends` (herencia)|`&` (intersección)|
|Declaración fusionada|✅ Sí (declaration merging)|❌ No|
|Uniones|❌ No soporta|✅ Sí (`A \| B`)|
|Tipos primitivos|❌ No|✅ Sí (`type Edad = number`)|
|Tuplas|Limitado|✅ Sí nativo|
|Uso recomendado|Contratos de objetos, APIs|Uniones, alias, utilidades|

> 💡 **Regla práctica:** Usa `interface` cuando definas la forma de un objeto o un contrato para clases. Usa `type` cuando necesites uniones, intersecciones, tipos condicionales o alias de tipos primitivos.

---

### 8.6 Implementación de Interfaces en Clases

Una clase puede implementar **múltiples interfaces** (a diferencia de la herencia, que solo permite una clase padre):

```typescript
interface Notificable {
  enviarNotificacion(mensaje: string): Promise<boolean>;
  obtenerNotificaciones(): Promise<string[]>;
}

interface Logeable {
  registrarAccion(accion: string): void;
}

// implements obliga a la clase a tener TODOS los métodos de las interfaces
class ServicioUsuario implements Notificable, Logeable {
  private logs: string[] = [];

  async enviarNotificacion(mensaje: string): Promise<boolean> {
    console.log(`Enviando: ${mensaje}`);
    return true;
  }

  async obtenerNotificaciones(): Promise<string[]> {
    return ["Bienvenido", "Actualización disponible"];
  }

  registrarAccion(accion: string): void {
    this.logs.push(`[${new Date().toISOString()}] ${accion}`);
  }
}
```

---

## 🚀 Capítulo 9 — Temas Avanzados

### 9.1 Genéricos (Generics)

Los genéricos permiten crear componentes reutilizables que trabajan con **múltiples tipos** manteniendo la seguridad de tipos. Son la herramienta más poderosa del sistema de tipos de TypeScript.

> 💬 **Analogía:** Un genérico es como una caja con una etiqueta de tipo. Puedes tener `Caja<Libro>`, `Caja<Zapatos>` o `Caja<Medicinas>`. La caja es la misma estructura, pero el contenido está restringido al tipo que indiques en la etiqueta.

```typescript
// Función genérica: T es un parámetro de tipo (como un "tipo variable")
function identidad<T>(valor: T): T {
  return valor;
}

// TypeScript infiere T automáticamente
const texto  = identidad("hola"); // T = string
const numero = identidad(42);     // T = number

// Clase genérica: estructura de datos tipada
class Pila<T> {
  private elementos: T[] = [];

  push(elemento: T): void {
    this.elementos.push(elemento);
  }

  pop(): T | undefined {
    return this.elementos.pop();
  }

  peek(): T | undefined {
    return this.elementos.at(-1);
  }

  get tamanio(): number {
    return this.elementos.length;
  }
}

const pilaNumeros = new Pila<number>();
pilaNumeros.push(10);
pilaNumeros.push(20);
// pilaNumeros.push("texto"); // ❌ Error de tipo

const pilaTextos = new Pila<string>();
pilaTextos.push("primero");
```

#### 9.1.1 Restricciones en Genéricos (Constraints)

```typescript
// Restringir T a tipos que tengan propiedad 'length'
interface ConLongitud {
  length: number;
}

function mostrarLongitud<T extends ConLongitud>(elemento: T): string {
  return `Longitud: ${elemento.length}`;
}

mostrarLongitud("hola");    // ✅ string tiene length
mostrarLongitud([1, 2, 3]); // ✅ array tiene length
// mostrarLongitud(42);     // ❌ number no tiene length
```

---

### 9.2 Módulos e Importaciones

El sistema de módulos organiza el código en archivos separados con importaciones y exportaciones tipadas:

```typescript
// ─── archivo: modelos/usuario.ts ───
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
}

export type RolUsuario = "admin" | "editor" | "lector";

export function crearUsuario(nombre: string, email: string): Usuario {
  return { id: crypto.randomUUID(), nombre, email };
}

// ─── archivo: servicios/auth.ts ───
// 'import type' solo importa tipos (se elimina en la compilación a JS)
// Esto mejora el rendimiento del bundler
import { type Usuario, type RolUsuario, crearUsuario } from "../modelos/usuario";

const nuevo: Usuario = crearUsuario("Daniel", "daniel@mail.com");
```

> 📌 En TypeScript 2026, usa siempre `import type` cuando importes solo tipos. Le indica a Bun que esas importaciones no generan código JavaScript, optimizando el bundle final.

---

### 9.3 Tipos de Utilidad (Utility Types)

TypeScript incluye tipos de utilidad predefinidos que transforman tipos existentes. Son **esenciales** para código profesional:

|Utility Type|Descripción|Ejemplo|
|---|---|---|
|`Partial<T>`|Todas las propiedades opcionales|`Partial<Usuario>`|
|`Required<T>`|Todas las propiedades obligatorias|`Required<Config>`|
|`Readonly<T>`|Todas las propiedades de solo lectura|`Readonly<Estado>`|
|`Pick<T, K>`|Selecciona propiedades específicas|`Pick<Usuario, 'nombre' \| 'email'>`|
|`Omit<T, K>`|Excluye propiedades específicas|`Omit<Usuario, 'id'>`|
|`Record<K, V>`|Objeto con claves K y valores V|`Record<string, number>`|
|`ReturnType<F>`|Tipo de retorno de una función|`ReturnType<typeof fetch>`|
|`Awaited<T>`|Desenvuelve una promesa|`Awaited<Promise<string>>`|

```typescript
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
}

// Partial: para actualizaciones parciales (solo envías lo que cambias)
function actualizarProducto(id: string, datos: Partial<Producto>): void {
  // datos puede contener cualquier subconjunto de propiedades
}
actualizarProducto("prod-001", { precio: 29.99 }); // ✅ Solo precio
actualizarProducto("prod-001", { stock: 100 });    // ✅ Solo stock

// Omit: para crear sin ID (el servidor lo genera automáticamente)
type CrearProducto = Omit<Producto, "id">;

// Pick: para vistas reducidas (solo lo que necesitas mostrar)
type ProductoResumen = Pick<Producto, "nombre" | "precio">;
```

---

### 9.4 Enums

Los enums definen un conjunto de constantes con nombre. En TypeScript 2026, se prefieren los **union types literales** sobre enums clásicos:

```typescript
// Enum numérico (el valor es un número)
enum DiaSemana {
  Lunes    = 1,
  Martes,    // 2 automático
  Miercoles, // 3
  Jueves,    // 4
  Viernes,   // 5
  Sabado,    // 6
  Domingo,   // 7
}

const hoy: DiaSemana = DiaSemana.Lunes;

// Enum de strings (más legible en depuración)
enum EstadoPedido {
  Pendiente  = "PENDIENTE",
  EnProceso  = "EN_PROCESO",
  Enviado    = "ENVIADO",
  Entregado  = "ENTREGADO",
  Cancelado  = "CANCELADO",
}

// ✅ Alternativa moderna preferida en 2026: union literal
// No genera código JavaScript adicional (son solo tipos)
type Estado = "pendiente" | "en_proceso" | "enviado" | "entregado";
```

> 💡 En proyectos nuevos de 2026, se prefieren los **union types literales** sobre enums clásicos. Los union literals no generan código JavaScript adicional (son solo tipos) y funcionan mejor con el tree-shaking de los bundlers.

---

### 9.5 Manejo de Errores Tipado — Patrón Result

TypeScript 2026 promueve el manejo de errores tipado y predecible, **sin excepciones**:

```typescript
// Patrón Result: en lugar de throw, retornas un objeto que indica éxito o fallo
type Result<T, E = Error> =
  | { success: true;  data: T }
  | { success: false; error: E };

// Función que retorna Result en vez de lanzar excepciones
function dividir(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: "División por cero" };
  }
  return { success: true, data: a / b };
}

// Uso seguro del resultado
const resultado = dividir(10, 3);

if (resultado.success) {
  console.log(`Resultado: ${resultado.data}`);   // TypeScript sabe que .data existe
} else {
  console.error(`Error: ${resultado.error}`);    // TypeScript sabe que .error existe
}
```

---

### 9.6 Programación Asincrónica Tipada

TypeScript tipifica completamente las promesas y `async/await`:

```typescript
// Definir el tipo de lo que esperas recibir de la API
interface DatosAPI {
  usuarios: { id: number; nombre: string }[];
  total: number;
}

// Promise<DatosAPI> dice: "esta función retorna una promesa que resolverá a DatosAPI"
async function obtenerDatos(url: string): Promise<DatosAPI> {
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }

  const datos: DatosAPI = await respuesta.json();
  return datos;
}

// Uso con manejo de errores
async function main(): Promise<void> {
  try {
    const datos = await obtenerDatos("https://api.ejemplo.com/users");
    console.log(`Total de usuarios: ${datos.total}`);

    for (const usuario of datos.usuarios) {
      console.log(`- ${usuario.nombre}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    }
  }
}
```

---

### 9.7 Decoradores (TypeScript 5.x+ Estándar)

Los decoradores modifican el comportamiento de clases y sus miembros de forma declarativa:

```typescript
// Decorador de método: medir tiempo de ejecución
function medirTiempo<T extends (...args: any[]) => any>(
  target: T,
  context: ClassMethodDecoratorContext
) {
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const inicio = performance.now();
    const resultado = target.apply(this, args);
    const fin = performance.now();
    console.log(`${String(context.name)}: ${(fin - inicio).toFixed(2)}ms`);
    return resultado;
  };
}

class ServicioDatos {
  @medirTiempo
  procesarRegistros(datos: number[]): number {
    return datos.reduce((sum, n) => sum + n, 0);
  }
}

const servicio = new ServicioDatos();
servicio.procesarRegistros([1, 2, 3, 4, 5]);
// procesarRegistros: 0.03ms
```

---

### 9.8 Validación con Zod

**Zod** es la librería de validación más utilizada en el ecosistema TypeScript 2026. Define esquemas que validan datos en runtime e infieren tipos automáticamente:

```bash
# Instalar Zod
bun add zod
```

```typescript
import { z } from "zod";

// Definir un esquema de validación
const EsquemaEstudiante = z.object({
  nombre:   z.string().min(2).max(100),
  edad:     z.number().int().min(16).max(100),
  email:    z.string().email(),
  carrera:  z.enum(["ingenieria", "medicina", "derecho"]),
  promedio: z.number().min(0).max(5).optional(),
});

// Inferir el tipo TypeScript automáticamente del esquema
// ¡No tienes que definir la interface por separado!
type Estudiante = z.infer<typeof EsquemaEstudiante>;

// Validar datos de cualquier origen (formulario, API, JSON)
const resultado = EsquemaEstudiante.safeParse({
  nombre:  "Daniel",
  edad:    18,
  email:   "daniel@humboldt.edu.co",
  carrera: "ingenieria",
});

if (resultado.success) {
  console.log(resultado.data); // Tipo: Estudiante ✅
} else {
  console.error(resultado.error.issues); // Lista de errores de validación
}
```

---

## 🎓 Capítulo 10 — Proyecto Práctico Integrador

### 10.1 Descripción del Proyecto

Sistema de Gestión Académica construido con TypeScript y Bun. Integra tipado, interfaces, clases, genéricos, funciones flecha y manejo de errores.

Estructura de archivos:

```
academia/
├── index.ts
├── types/
│   └── academico.ts
├── repositorios/
│   └── repositorio.ts
└── servicios/
    └── academico.ts
```

---

### 10.2 Definición de Tipos e Interfaces

```typescript
// ─── types/academico.ts ───

// Union literals modernos en vez de enums
type Carrera =
  | "ingenieria_sistemas"
  | "ingenieria_industrial"
  | "administracion"
  | "derecho"
  | "medicina";

type EstadoMatricula = "activa" | "suspendida" | "graduado" | "retirado";

// Interfaces base con herencia
interface EntidadBase {
  readonly id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Persona extends EntidadBase {
  nombre: string;
  apellido: string;
  email: string;
  documento: string;
}

interface Estudiante extends Persona {
  matricula: string;
  carrera: Carrera;
  semestre: number;
  estado: EstadoMatricula;
  promedio: number;
}

interface Materia {
  codigo: string;
  nombre: string;
  creditos: number;
  profesor: string;
}

interface Inscripcion {
  estudianteId: string;
  materiaId: string;
  nota?: number;
  periodo: string;
}
```

---

### 10.3 Clase Genérica de Repositorio

```typescript
// ─── repositorios/repositorio.ts ───

// Patrón Result tipado
type Result<T, E = string> =
  | { ok: true;  valor: T }
  | { ok: false; error: E };

// Repositorio genérico: funciona con CUALQUIER entidad que extienda EntidadBase
class Repositorio<T extends EntidadBase> {
  private datos: Map<string, T> = new Map();

  agregar(entidad: T): Result<T> {
    if (this.datos.has(entidad.id)) {
      return { ok: false, error: `ID ${entidad.id} ya existe` };
    }
    this.datos.set(entidad.id, { ...entidad, updatedAt: new Date() });
    return { ok: true, valor: entidad };
  }

  obtener(id: string): Result<T> {
    const entidad = this.datos.get(id);
    if (!entidad) {
      return { ok: false, error: `Entidad ${id} no encontrada` };
    }
    return { ok: true, valor: entidad };
  }

  actualizar(id: string, datos: Partial<Omit<T, 'id'>>): Result<T> {
    const existente = this.datos.get(id);
    if (!existente) {
      return { ok: false, error: `Entidad ${id} no encontrada` };
    }
    const actualizado = { ...existente, ...datos, updatedAt: new Date() } as T;
    this.datos.set(id, actualizado);
    return { ok: true, valor: actualizado };
  }

  listar(): T[] {
    return Array.from(this.datos.values());
  }

  filtrar(predicado: (entidad: T) => boolean): T[] {
    return this.listar().filter(predicado);
  }

  get cantidad(): number {
    return this.datos.size;
  }
}
```

---

### 10.4 Servicio Académico

```typescript
// ─── servicios/academico.ts ───

class ServicioAcademico {
  // Instancias del repositorio genérico para cada entidad
  private repoEstudiantes = new Repositorio<Estudiante>();
  private repoMaterias    = new Repositorio<Materia & EntidadBase>();

  registrarEstudiante(
    datos: Omit<Estudiante, 'id' | 'createdAt' | 'updatedAt' | 'promedio'>
  ): Result<Estudiante> {
    const estudiante: Estudiante = {
      ...datos,
      id:        crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      promedio:  0,
    };
    return this.repoEstudiantes.agregar(estudiante);
  }

  obtenerMejoresEstudiantes(minPromedio: number = 4.0): Estudiante[] {
    return this.repoEstudiantes
      .filtrar((e) => e.promedio >= minPromedio && e.estado === "activa")
      .sort((a, b) => b.promedio - a.promedio);
  }

  generarReporte(): string {
    const estudiantes   = this.repoEstudiantes.listar();
    const activos       = estudiantes.filter((e) => e.estado === "activa");
    const promedioGeneral = activos.length > 0
      ? activos.reduce((sum, e) => sum + e.promedio, 0) / activos.length
      : 0;

    return [
      `Total estudiantes:     ${estudiantes.length}`,
      `Estudiantes activos:   ${activos.length}`,
      `Promedio general:      ${promedioGeneral.toFixed(2)}`,
    ].join("\n");
  }
}
```

---

### 10.5 Ejecución del Proyecto

```typescript
// ─── index.ts ───

const servicio = new ServicioAcademico();

// Registrar un estudiante
const resultado = servicio.registrarEstudiante({
  nombre:    "Daniel",
  apellido:  "Barrientos",
  email:     "daniel@humboldt.edu.co",
  documento: "1234567890",
  matricula: "2026-001",
  carrera:   "ingenieria_sistemas",
  semestre:  1,
  estado:    "activa",
});

if (resultado.ok) {
  console.log(`✅ Estudiante registrado: ${resultado.valor.nombre}`);
} else {
  console.error(`❌ Error: ${resultado.error}`);
}

// Generar reporte
console.log(servicio.generarReporte());
```

```bash
# Ejecutar el proyecto con Bun
bun run index.ts

# Ejecutar con hot reload durante desarrollo
bun --watch index.ts
```

> 💡 **Ejercicio final:** Extiende el proyecto añadiendo: (1) una interfaz para `Profesor`, (2) un método para inscribir materias con validación de prerrequisitos, (3) un sistema de calificaciones que actualice el promedio automáticamente.

---

## 📖 Glosario de Términos

|Término|Definición|
|---|---|
|**Inferencia de tipos**|Capacidad de TypeScript para deducir automáticamente el tipo de una variable|
|**Type guard**|Expresión condicional que refina el tipo de una variable en un bloque de código|
|**Union type**|Tipo que permite múltiples tipos posibles, separados por `\|`|
|**Intersection type**|Tipo que combina múltiples tipos en uno, usando `&`|
|**Generic**|Parámetro de tipo que permite crear componentes reutilizables (`<T>`)|
|**Discriminated union**|Unión donde cada variante tiene una propiedad discriminante común|
|**Utility type**|Tipo predefinido que transforma otros tipos (`Partial`, `Pick`, `Omit`, etc.)|
|**Type alias**|Nombre personalizado para un tipo, definido con la palabra clave `type`|
|**Interface**|Contrato que define la forma de un objeto|
|**Decorator**|Función que modifica el comportamiento de clases o sus miembros|
|**Arrow function**|Función con sintaxis concisa (`=>`) que hereda el contexto `this`|
|**Tuple**|Array con longitud fija y tipos definidos por posición|
|**Runtime**|Entorno de ejecución de código (Bun, Node.js, Deno)|
|**Bundler**|Herramienta que empaqueta múltiples archivos en uno optimizado|
|**Tree-shaking**|Eliminación de código muerto durante el empaquetado|
|**Narrowing**|Proceso por el cual TypeScript reduce el tipo posible dentro de un bloque|
|**Hoisting**|Elevación de declaraciones al inicio del scope antes de ejecutar|
|**Superconjunto**|Lenguaje que contiene otro lenguaje completo (TS ⊇ JS)|

---

## 🔗 Bibliografía y Recursos

### Documentación Oficial

|Recurso|Para qué|
|---|---|
|[TypeScript Official Docs](https://www.typescriptlang.org/docs/)|Referencia completa del lenguaje|
|[TypeScript en 5 minutos](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)|Repaso rápido|
|[TypeScript Playground](https://www.typescriptlang.org/play)|Probar código TS online sin instalar nada|
|[Bun Documentation](https://bun.sh/docs)|Todo sobre el runtime moderno|
|[Zod Documentation](https://zod.dev)|Validación de esquemas|
|[Biome Documentation](https://biomejs.dev)|Linter + formatter|

### Aprendizaje Profundo

|Recurso|Tipo|Para qué|
|---|---|---|
|[TypeScript Deep Dive](https://basarat.gitbook.io/typescript)|Libro gratuito|Fundamentos avanzados con ejemplos|
|[Total TypeScript](https://www.totaltypescript.com/tutorials)|Tutoriales|Desde básico hasta avanzado, gratis|
|[javascript.info — Arrays](https://javascript.info/array-methods)|Tutorial|Los mejores ejemplos de `map`, `filter`, `reduce`|
|[MDN — Array.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)|Docs en español|Referencia de `map`|
|[MDN — Array.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)|Docs en español|Referencia de `filter`|
|[MDN — Array.reduce()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)|Docs en español|Referencia de `reduce`|
|[ECMAScript Specification](https://tc39.es/ecma262/)|Especificación|El estándar oficial del lenguaje|

### Extensiones recomendadas para VS Code / Neovim

```bash
# En VS Code, instalar desde la terminal:
# - TypeScript Language Features (viene con VS Code)
# - Error Lens: muestra errores inline en el código
# - Pretty TypeScript Errors: errores más legibles
# - Biome: linter integrado

# Instalar Error Lens desde CLI de VS Code
code --install-extension usernamehw.errorlens
code --install-extension biomejs.biome

# Para Neovim, en Fedora con tu setup:
# Usar nvim-lspconfig con tsserver o typescript-language-server
sudo dnf install typescript-language-server
```

---

> _"Primero hazlo funcionar. Luego hazlo limpio. Solo después, hazlo rápido."_  
> — Kent Beck

---

_Universidad Alexander von Humboldt · Facultad de Ingeniería de Software · 2026_  
_Material didáctico de uso académico_