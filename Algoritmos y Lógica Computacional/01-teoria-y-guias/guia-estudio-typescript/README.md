¡Entendido! Aquí tienes el contenido íntegro en formato **Markdown (.md)**, redactado de forma general y profesional para que funcione como una documentación estándar o guía de estudio completa, manteniendo todos los detalles técnicos y los tips estratégicos.

---

````markdown
# 📘 TypeScript desde Cero Absoluto

Guía completa de preparación para el curso de Programación con el profesor **Arle Morales**. Este documento cubre desde la configuración del entorno en **Fedora Linux** hasta conceptos avanzados de tipado y patrones de diseño en TypeScript.

| Conceptos | Ejemplos de Código | Meta                 |
| :-------- | :----------------- | :------------------- |
| **25+**   | **100+**           | **Dominio Total 💪** |

---

## 00. Setup · Fedora Linux · Bun

En este curso se utiliza **Bun** como runtime y gestor de paquetes. A diferencia de Node.js, Bun procesa archivos `.ts` de forma nativa, eliminando la necesidad de configurar transpiladores externos para el desarrollo local.

### 1. Instalación en Fedora (Konsole)

Para instalar Bun en entornos basados en Fedora/KDE, ejecute:

```bash
# Instalación del binario
curl -fsSL [https://bun.sh/install](https://bun.sh/install) | bash

# Aplicar cambios al PATH (o reinicie la terminal)
source ~/.bashrc

# Verificar versión instalada
bun --version
```
````

### 2. Comandos Esenciales

- **Inicializar proyecto:** `bun init` (Genera automáticamente `package.json`, `tsconfig.json` e `index.ts`).
- **Ejecución simple:** `bun index.ts`.
- **Modo Observador (Hot Reload):** `bun --watch index.ts` (Reinicia el proceso al detectar cambios en el archivo).

> ⚠️ **Nota para exámenes:** El comando `bun --watch` es la forma estándar de ejecutar con recarga automática. Evite confundirlo con comandos de compilación manual.

---

## 01. Conceptos Fundamentales

TypeScript es un **Superset** de JavaScript que añade **Tipado Estático**.

- **Detección de errores:** JavaScript detecta errores en _Runtime_ (ejecución), mientras que TypeScript los detecta en _Compile-time_ (escritura/compilación).
- **Flujo:** Código TS (`.ts`) → Compilación/Interpretación → Código JS (`.js`).

---

## 02. Sistema de Tipos: Primitivos y Colecciones

### Tipos Primitivos

```typescript
let nombre: string = "Arle";
let edad: number = 40;
let esActivo: boolean = true;
// BigInt requiere el sufijo 'n' y es para valores que exceden la precisión de Number
let granNumero: bigint = 9007199254740991n;
```

### Arrays y Tuplas

- **Array:** Lista dinámica de elementos del mismo tipo.
- **Tupla:** Estructura de longitud fija donde cada posición tiene un tipo definido.

```typescript
// Array dinámico
let stack: string[] = ["TS", "JS"];
stack.push("Rust");

// Tupla definida (readonly para evitar mutaciones post-declaración)
const coordenada: readonly [lat: number, lng: number] = [4.6, -74.08];
```

---

## 03. Tipos Especiales: `any`, `unknown` y `never`

| Tipo      | Definición                                                                                | Seguridad               |
| :-------- | :---------------------------------------------------------------------------------------- | :---------------------- |
| `any`     | Permite cualquier valor sin restricciones.                                                | 🚨 Nula (Evitar su uso) |
| `unknown` | Acepta cualquier valor pero obliga a realizar un _Type Guard_ (`typeof`) antes de operar. | ✅ Alta                 |
| `never`   | Representa un valor que no debería existir (ej. funciones que siempre lanzan error).      | 🔒 Exhaustiva           |

---

## 04. Programación Orientada a Objetos (POO)

### Modificadores de Acceso

Controlan la visibilidad de los miembros de una clase:

1.  `public`: Acceso desde cualquier lugar (default).
2.  `private`: Acceso restringido exclusivamente a la clase que lo define.
3.  `protected`: Acceso permitido en la clase base y sus subclases (`extends`).

### Herencia y Clases Abstractas

```typescript
abstract class Figura {
  constructor(protected color: string) {}
  // Método sin implementación que debe ser definido por las subclases
  abstract calcularArea(): number;
}

class Cuadrado extends Figura {
  constructor(
    color: string,
    private lado: number,
  ) {
    super(color); // Invocación obligatoria al constructor del padre
  }

  override calcularArea(): number {
    return this.lado * this.lado;
  }
}
```

---

## 05. Interfaces vs Type Aliases

| Característica     | `interface`                              | `type`                                              |
| :----------------- | :--------------------------------------- | :-------------------------------------------------- |
| **Uso ideal**      | Definir la estructura de objetos/clases. | Definir uniones, intersecciones o tipos primitivos. |
| **Extensión**      | Mediante `extends`.                      | Mediante intersecciones (`&`).                      |
| **Unión de tipos** | No soportado.                            | Soportado (`type ID = string \| number`).           |

---

## 06. Genéricos `<T>`

Los genéricos permiten crear funciones o clases que operan sobre tipos abstractos, los cuales se definen al momento de la instanciación.

```typescript
class Contenedor<T> {
  private contenido?: T;

  setValor(valor: T) {
    this.contenido = valor;
  }
  getValor(): T | undefined {
    return this.contenido;
  }
}

const texto = new Contenedor<string>();
texto.setValor("Hola Mundo"); // ✅ Correcto
```

---

## 07. Patrón "Exhaustive Checking"

Garantiza que todos los casos de una unión de tipos sean manejados dentro de una estructura de control (como `switch`).

```typescript
type Operacion = "SUMA" | "RESTA";

function procesar(op: Operacion) {
  switch (op) {
    case "SUMA":
      return "+";
    case "RESTA":
      return "-";
    default:
      // Si se agrega un nuevo tipo a 'Operacion' y no se incluye en el switch,
      // esta línea lanzará un error de compilación.
      const _check: never = op;
      return _check;
  }
}
```

---

## 08. Tipos de Utilidad (Utility Types)

TypeScript provee transformaciones integradas para tipos existentes:

- `Partial<T>`: Convierte todas las propiedades en opcionales.
- `Required<T>`: Convierte todas las propiedades en obligatorias.
- `Pick<T, Keys>`: Crea un tipo seleccionando un conjunto específico de llaves.
- `Omit<T, Keys>`: Crea un tipo eliminando llaves específicas.
- `Readonly<T>`: Impide la reasignación de todas las propiedades.

---

## 💡 Recomendaciones Técnicas

1.  **Optional Chaining (`?.`):** Permite leer propiedades anidadas sin riesgo de errores `null` o `undefined`.
2.  **Nullish Coalescing (`??`):** Operador lógico que devuelve el operando de la derecha cuando el de la izquierda es `null` o `undefined` (a diferencia de `||`, respeta valores como `0` o `""`).
3.  **Non-null Assertion (`!`):** Úselo solo cuando esté 100% seguro de que un valor no es nulo; de lo contrario, prefiera validaciones seguras.

```

```
