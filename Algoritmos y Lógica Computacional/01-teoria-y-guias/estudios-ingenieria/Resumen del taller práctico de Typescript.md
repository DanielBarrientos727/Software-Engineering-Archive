# 🟦 Taller Práctico de TypeScript

### Arrays, `map`, `filter` y `reduce` — Libro de Ejercicios

> **Universidad Alexander von Humboldt · Ingeniería de Software · Algoritmos 2026**  
> Guía explicada para primer semestre · Fedora Linux

---

## 📋 Tabla de Contenidos

- [⚙️ Setup en Fedora Linux](#%EF%B8%8F-setup-en-fedora-linux)
- [🧠 Conceptos Fundamentales](#-conceptos-fundamentales)
    - [Interfaces y Arrays de Objetos](#1-interfaces-y-arrays-de-objetos)
    - [map()](#2-el-m%C3%A9todo-map)
    - [filter()](#3-el-m%C3%A9todo-filter)
    - [reduce()](#4-el-m%C3%A9todo-reduce)
- [🏧 Ejercicio 1 — Cajero Automático](#-ejercicio-1--cajero-autom%C3%A1tico-principiante)
- [🏨 Ejercicio 2 — Reserva de Hotel](#-ejercicio-2--sistema-de-reserva-de-hotel-intermedio)
- [🫧 Ejercicio 3 — Alquiler de Lavadoras](#-ejercicio-3--alquiler-de-lavadoras-intermedio)
- [🏦 Ejercicio 4 — Fila de Banco](#-ejercicio-4--fila-de-banco-avanzado)
- [🎬 Ejercicio 5 — Venta de Boletas de Cine](#-ejercicio-5--venta-de-boletas-de-cine-avanzado)
- [✅ Buenas Prácticas](#-buenas-pr%C3%A1cticas-profesionales)
- [📚 Recursos para Estudiar Más](#-recursos-para-estudiar-m%C3%A1s)

---

## ⚙️ Setup en Fedora Linux

Antes de escribir una sola línea, necesitas TypeScript funcionando en tu máquina. Abre una terminal y ejecuta esto:

```bash
# 1. Instalar Node.js (viene con npm)
sudo dnf install nodejs -y

# 2. Verificar que instaló bien
node --version   # debería verse algo como v20.x.x
npm --version

# 3. Instalar TypeScript globalmente
npm install -g typescript ts-node

# 4. Verificar TypeScript
tsc --version    # TypeScript 5.x.x

# 5. Crear carpeta para el taller
mkdir taller-typescript && cd taller-typescript

# 6. Iniciar proyecto
npm init -y
npm install --save-dev typescript @types/node

# 7. Crear tsconfig.json
npx tsc --init
```

Para **ejecutar** tus archivos `.ts` sin compilar manualmente:

```bash
ts-node ejercicio1.ts
```

> 💡 **ts-node** es como ejecutar Python directamente sin compilar antes. En TypeScript normalmente hay que compilar a JavaScript primero, pero `ts-node` lo hace automático para desarrollo.

---

## 🧠 Conceptos Fundamentales

### 1. Interfaces y Arrays de Objetos

Una **interfaz** en TypeScript es como un contrato o molde. Le dice al compilador "este objeto SIEMPRE va a tener estas propiedades con estos tipos".

Piénsalo como una tabla de base de datos:

| Propiedad | Tipo      | Ejemplo    |
| --------- | --------- | ---------- |
| `id`      | `number`  | `1`        |
| `nombre`  | `string`  | `"Daniel"` |
| `activo`  | `boolean` | `true`     |
| `saldo`   | `number`  | `500000`   |

```typescript
// Definir el molde (interfaz)
interface Usuario {
  id: number;
  nombre: string;
  activo: boolean;
  saldo: number;
}

// Crear un array de objetos que siguen ese molde
const usuarios: Usuario[] = [
  { id: 1, nombre: "Daniel", activo: true,  saldo: 500000 },
  { id: 2, nombre: "Santiago", activo: false, saldo: 150000 },
  { id: 3, nombre: "Juan",    activo: true,  saldo: 320000 },
];
```

> 🔑 **Por qué importa:** Si escribes `usuario.nobre` (con typo), TypeScript te grita ANTES de ejecutar el código. Eso es el superpoder de TypeScript sobre JavaScript puro.

---

### 2. El método `map()`

`map()` **transforma** cada elemento de un array y devuelve un **nuevo array** del mismo tamaño. El original no se toca.

```
Array original: [1, 2, 3, 4]
Operación:       x => x * 2
Resultado:      [2, 4, 6, 8]
```

```typescript
const numeros = [1, 2, 3, 4, 5];

// Sin map (forma fea, manual)
const dobles: number[] = [];
for (let n of numeros) {
  dobles.push(n * 2);
}

// Con map (forma elegante)
const doblesMap = numeros.map(n => n * 2);
// → [2, 4, 6, 8, 10]

// Ejemplo real: extraer solo los nombres de un array de usuarios
const nombres = usuarios.map(u => u.nombre);
// → ["Daniel", "Santiago", "Juan"]

// Ejemplo real: formatear para mostrar
const resumen = usuarios.map(u => `${u.nombre}: $${u.saldo}`);
// → ["Daniel: $500000", "Santiago: $150000", "Juan: $320000"]
```

**Regla de oro:** Si quieres **transformar** cada elemento → usa `map()`.

---

### 3. El método `filter()`

`filter()` crea un **nuevo array** con solo los elementos que pasan una condición (predicado). Los que no pasan, se descartan.

```
Array original: [1, 2, 3, 4, 5, 6]
Condición:       x => x % 2 === 0   (solo pares)
Resultado:      [2, 4, 6]
```

```typescript
// Usuarios activos
const activos = usuarios.filter(u => u.activo);
// → [{ id:1, nombre:"Daniel", ... }, { id:3, nombre:"Juan", ... }]

// Usuarios con saldo mayor a 200000
const conBuenSaldo = usuarios.filter(u => u.saldo > 200000);

// Contar cuántos hay (filter + length)
const cantidadActivos = usuarios.filter(u => u.activo).length;
// → 2
```

**Regla de oro:** Si quieres **seleccionar** elementos según una condición → usa `filter()`.

---

### 4. El método `reduce()`

`reduce()` **colapsa** todo un array a un solo valor. Es el más poderoso pero también el más confuso al principio.

```
Array:    [100, 200, 300, 400]
Operación: sumar todo
Resultado: 1000
```

Tiene dos partes: un **acumulador** (lo que va guardando el resultado) y el **elemento actual**.

```typescript
const precios = [100, 200, 300, 400];

// Sumar todos los precios
const total = precios.reduce((acumulador, precio) => {
  return acumulador + precio;
}, 0); // ← el 0 es el valor inicial del acumulador
// → 1000

// Ejemplo con objetos: sumar saldos de todos los usuarios
const totalSaldos = usuarios.reduce((acc, u) => acc + u.saldo, 0);
// → 970000

// Ejemplo avanzado: promedio
const promedio = usuarios.reduce((acc, u) => acc + u.saldo, 0) / usuarios.length;
```

**Regla de oro:** Si quieres **resumir** un array en un solo número (suma, promedio, conteo) → usa `reduce()`.

---

### Comparación rápida

|Método|¿Qué hace?|¿Qué retorna?|Caso de uso|
|---|---|---|---|
|`map()`|Transforma cada elemento|Array del mismo tamaño|Extraer propiedades, formatear datos|
|`filter()`|Filtra según condición|Array más pequeño o igual|Buscar, separar, eliminar|
|`reduce()`|Acumula todo en uno|Un solo valor|Sumar, contar, agrupar|
|`find()`|Busca el primero que cumple|Un objeto o `undefined`|Buscar por ID|

---

## 🏧 Ejercicio 1 — Cajero Automático _(Principiante)_

> ⏱️ Tiempo estimado: 45 minutos

### El problema

Simular un cajero con historial de transacciones. El reto conceptual es manejar **estado mutable** (el saldo cambia) mientras mantienes un **historial inmutable** (el registro de lo que pasó nunca se borra).

### Operaciones requeridas

|Operación|¿Modifica el saldo?|¿Crea transacción?|Validación|
|---|---|---|---|
|Consultar saldo|❌|❌|Ninguna|
|Depositar|✅ (suma)|✅|Monto > 0|
|Retirar|✅ (resta)|✅|Fondos suficientes|
|Estado de cuenta|❌|❌|Ninguna|

### Estructuras de datos que necesitas

```typescript
// Estructura 1: cada movimiento que ocurre
interface Transaccion {
  id: number;                              // secuencial: 1, 2, 3...
  tipo: "deposito" | "retiro" | "consulta"; // solo estos valores válidos
  monto: number;
  fecha: Date;
  saldoResultante: number;                 // saldo DESPUÉS de la operación
}

// Estructura 2: la cuenta como un todo
interface CuentaBancaria {
  titular: string;
  saldo: number;                           // esto sí cambia
  transacciones: Transaccion[];            // esto solo crece, nunca se borra
}
```

### Esqueleto de solución orientado

```typescript
// Inicializar la cuenta
const cuenta: CuentaBancaria = {
  titular: "Daniel Barrientos",
  saldo: 0,
  transacciones: []
};

// Función para depositar
function depositar(monto: number): void {
  if (monto <= 0) {
    console.log("❌ El monto debe ser positivo");
    return;
  }

  cuenta.saldo += monto;

  const nuevaTransaccion: Transaccion = {
    id: cuenta.transacciones.length + 1,  // ID automático
    tipo: "deposito",
    monto: monto,
    fecha: new Date(),
    saldoResultante: cuenta.saldo
  };

  cuenta.transacciones.push(nuevaTransaccion);
  console.log(`✅ Depósito exitoso. Nuevo saldo: $${cuenta.saldo}`);
}

// Función para estado de cuenta usando map()
function estadoDeCuenta(): void {
  const lineas = cuenta.transacciones.map(t => {
    const signo = t.tipo === "deposito" ? "+" : "-";
    return `[${t.id}] ${t.tipo.toUpperCase()} ${signo}$${t.monto} → Saldo: $${t.saldoResultante}`;
  });

  console.log("\n=== ESTADO DE CUENTA ===");
  lineas.forEach(l => console.log(l));

  // Calcular estadísticas con filter() y reduce()
  const totalDepositado = cuenta.transacciones
    .filter(t => t.tipo === "deposito")
    .reduce((acc, t) => acc + t.monto, 0);

  const totalRetirado = cuenta.transacciones
    .filter(t => t.tipo === "retiro")
    .reduce((acc, t) => acc + t.monto, 0);

  console.log(`\nTotal depositado: $${totalDepositado}`);
  console.log(`Total retirado:   $${totalRetirado}`);
  console.log(`Saldo actual:     $${cuenta.saldo}`);
}
```

### Preguntas guía

- ¿Cómo asignas IDs únicos? → Mira `cuenta.transacciones.length + 1`
- ¿Qué pasa si retiras más de lo que tienes? → `if (monto > cuenta.saldo)` → rechazar
- ¿Cómo separas depósitos de retiros? → `filter(t => t.tipo === "deposito")`

---

## 🏨 Ejercicio 2 — Sistema de Reserva de Hotel _(Intermedio)_

> ⏱️ Tiempo estimado: 90 minutos

### Categorías de habitaciones

|Tipo|Precio/noche|Servicios|
|---|---|---|
|`economica`|$80|Servicios básicos|
|`estandar`|$150|TV, Wi-Fi, minibar|
|`suite`|$300|Lujo completo|

### Sistema de descuentos progresivos

|Noches|Descuento|Multiplicador|
|---|---|---|
|1 – 2|0%|× 1.00|
|3 – 5|5%|× 0.95|
|6 – 10|10%|× 0.90|
|11 o más|15%|× 0.85|

### Fórmula de precio

```
Precio Final = (tarifa_por_noche × noches) × (1 - descuento)
```

### Estructuras de datos

```typescript
type TipoHabitacion = "economica" | "estandar" | "suite";

interface Habitacion {
  tipo: TipoHabitacion;
  precioPorNoche: number;
  servicios: string[];
}

interface Reserva {
  id: number;
  cliente: string;
  habitacion: TipoHabitacion;
  noches: number;
  descuento: number;      // en decimal: 0.05, 0.10, etc.
  precioTotal: number;
  fechaReserva: Date;
}
```

### Lógica de descuento

```typescript
// Un diccionario de habitaciones (en lugar de if/else)
const HABITACIONES: Record<TipoHabitacion, Habitacion> = {
  economica: { tipo: "economica", precioPorNoche: 80,  servicios: ["Básicos"] },
  estandar:  { tipo: "estandar",  precioPorNoche: 150, servicios: ["TV", "Wi-Fi", "Minibar"] },
  suite:     { tipo: "suite",     precioPorNoche: 300, servicios: ["Lujo completo"] }
};

// Función pura para calcular descuento
function calcularDescuento(noches: number): number {
  if (noches >= 11) return 0.15;
  if (noches >= 6)  return 0.10;
  if (noches >= 3)  return 0.05;
  return 0;
}

// Función pura para calcular precio
function calcularPrecio(tipo: TipoHabitacion, noches: number): number {
  const tarifa = HABITACIONES[tipo].precioPorNoche;
  const descuento = calcularDescuento(noches);
  return tarifa * noches * (1 - descuento);
}
```

### Generación de reportes

```typescript
const reservas: Reserva[] = []; // aquí se guardan todas

function reportePorTipo(): void {
  const tipos: TipoHabitacion[] = ["economica", "estandar", "suite"];

  tipos.forEach(tipo => {
    const reservasTipo = reservas.filter(r => r.habitacion === tipo);
    const ingresos = reservasTipo.reduce((acc, r) => acc + r.precioTotal, 0);
    console.log(`${tipo}: ${reservasTipo.length} reservas → $${ingresos}`);
  });
}
```

### Preguntas guía

- ¿Cómo validas que el tipo de habitación sea válido? → `if (!(tipo in HABITACIONES))`
- ¿Cómo agrupas reservas por tipo? → `filter(r => r.habitacion === tipo)`
- ¿Cómo calculas ingresos totales? → `reduce((acc, r) => acc + r.precioTotal, 0)`

---

## 🫧 Ejercicio 3 — Alquiler de Lavadoras _(Intermedio)_

> ⏱️ Tiempo estimado: 75 minutos

### El concepto clave: estado compartido

Este ejercicio introduce algo crítico: **inventario con estado**. Una lavadora puede estar `disponible` u `ocupada`. Si está ocupada, nadie más puede alquilarla.

### Esquema de precios

|Horas|Descuento|Precio efectivo/hora|
|---|---|---|
|1 – 2|0%|$2.00|
|3 – 4|10%|$1.80|
|5 – 8|20%|$1.60|
|9 o más|30%|$1.40|

### Estructuras de datos

```typescript
interface Lavadora {
  id: number;
  disponible: boolean;   // ← este campo es el "estado compartido"
  modelo: string;
}

interface Alquiler {
  id: number;
  lavadoraId: number;
  cliente: string;
  horas: number;
  descuento: number;
  precioTotal: number;
  activo: boolean;       // true mientras está en uso, false cuando devuelve
  inicio: Date;
}
```

### Flujo de alquiler

```typescript
const lavadoras: Lavadora[] = [
  { id: 1, disponible: true, modelo: "Samsung A1" },
  { id: 2, disponible: true, modelo: "LG WaveForce" },
  { id: 3, disponible: true, modelo: "Whirlpool Pro" },
];

const alquileres: Alquiler[] = [];

function alquilarLavadora(cliente: string, horas: number): void {
  // 1. Encontrar la PRIMERA lavadora disponible
  const lavadora = lavadoras.find(l => l.disponible);

  if (!lavadora) {
    console.log("❌ No hay lavadoras disponibles");
    return;
  }

  // 2. Calcular precio
  const descuento = calcularDescuentoLavadora(horas);
  const precio = horas * 2 * (1 - descuento);

  // 3. Marcar como ocupada (mutación del estado)
  lavadora.disponible = false;

  // 4. Registrar el alquiler
  alquileres.push({
    id: alquileres.length + 1,
    lavadoraId: lavadora.id,
    cliente,
    horas,
    descuento,
    precioTotal: precio,
    activo: true,
    inicio: new Date()
  });

  console.log(`✅ Lavadora ${lavadora.id} alquilada por ${cliente} → $${precio}`);
}

function devolverLavadora(lavadoraId: number): void {
  // Cambiar estado en el inventario
  const lavadora = lavadoras.find(l => l.id === lavadoraId);
  if (lavadora) lavadora.disponible = true;

  // Cerrar el alquiler
  const alquiler = alquileres.find(a => a.lavadoraId === lavadoraId && a.activo);
  if (alquiler) alquiler.activo = false;

  console.log(`✅ Lavadora ${lavadoraId} devuelta`);
}
```

### Preguntas guía

- ¿Cómo muestro solo lavadoras disponibles? → `lavadoras.filter(l => l.disponible)`
- ¿Cómo calculo el total recaudado? → `alquileres.reduce((acc, a) => acc + a.precioTotal, 0)`
- ¿Cómo muestro alquileres con descuento ≥ 20%? → `alquileres.filter(a => a.descuento >= 0.20)`

---

## 🏦 Ejercicio 4 — Fila de Banco _(Avanzado)_

> ⏱️ Tiempo estimado: 120 minutos

### El concepto clave: estructura FIFO

**FIFO = First In, First Out** (el primero que entra es el primero en salir). Es exactamente como una fila física: el primero que llega es el primero en ser atendido.

```
Fila actual:  [Cliente1, Cliente2, Cliente3]
Se atiende:    ↑ este (el más antiguo)
Llega nuevo:                        Cliente4 ↓
Fila después: [Cliente2, Cliente3, Cliente4]
```

### Estados posibles de un cliente

```
esperando ──────────────────→ atendido
    ↑
  llega
```

### Estructura de datos

```typescript
type EstadoCliente = "esperando" | "atendido";

interface ClienteFila {
  turno: number;          // número secuencial único
  nombre: string;
  estado: EstadoCliente;
  horaLlegada: Date;
  horaAtencion?: Date;    // opcional: solo existe cuando es atendido
  horaFin?: Date;         // opcional: cuando termina su trámite
}
```

### Implementación FIFO

```typescript
let contadorTurnos = 0;
const fila: ClienteFila[] = [];

// LLEGA un cliente → se agrega AL FINAL
function agregarCliente(nombre: string): void {
  contadorTurnos++;
  fila.push({
    turno: contadorTurnos,
    nombre,
    estado: "esperando",
    horaLlegada: new Date()
  });
  console.log(`🎫 Turno #${contadorTurnos} asignado a ${nombre}`);
}

// ATENDER → tomar el primero que está esperando (FIFO)
function atenderSiguiente(): void {
  // filter para obtener solo los que esperan, luego [0] para el primero
  const enEspera = fila.filter(c => c.estado === "esperando");

  if (enEspera.length === 0) {
    console.log("✅ No hay clientes en espera");
    return;
  }

  const cliente = enEspera[0]; // el primero = el más antiguo = FIFO
  cliente.estado = "atendido";
  cliente.horaAtencion = new Date();

  const espera = (cliente.horaAtencion.getTime() - cliente.horaLlegada.getTime()) / 1000;
  console.log(`🔔 Atendiendo turno #${cliente.turno} - ${cliente.nombre} (esperó ${espera}s)`);
}

// Estadísticas con reduce()
function estadisticas(): void {
  const atendidos = fila.filter(c => c.estado === "atendido" && c.horaAtencion);

  if (atendidos.length === 0) {
    console.log("Aún no se ha atendido a nadie");
    return;
  }

  const totalEspera = atendidos.reduce((acc, c) => {
    const espera = c.horaAtencion!.getTime() - c.horaLlegada.getTime();
    return acc + espera;
  }, 0);

  const promedioMs = totalEspera / atendidos.length;
  const promedioSeg = promedioMs / 1000;

  console.log(`📊 En espera: ${fila.filter(c => c.estado === "esperando").length}`);
  console.log(`📊 Atendidos: ${atendidos.length}`);
  console.log(`📊 Tiempo promedio de espera: ${promedioSeg.toFixed(1)}s`);
}
```

### Preguntas guía

- ¿Cómo garantizo IDs únicos? → Variable `contadorTurnos` que solo incrementa, nunca baja
- ¿Cómo implemento FIFO exactamente? → `filter(esperando)[0]` = el primero de los que esperan
- ¿Cómo calculo tiempo de espera? → `horaAtencion - horaLlegada` en milisegundos
- ¿Cómo obtengo el promedio? → `reduce(sumar tiempos) / cantidad`

---

## 🎬 Ejercicio 5 — Venta de Boletas de Cine _(Avanzado)_

> ⏱️ Tiempo estimado: 120 minutos

### El proyecto final: todo junto

Este ejercicio combina todo lo aprendido. Tiene **3 entidades relacionadas**: películas, horarios y ventas.

### Precios por tipo de boleta

|Tipo|Precio|
|---|---|
|`adulto`|$10|
|`estudiante`|$7|
|`niño`|$5|

### Estructuras de datos

```typescript
type TipoBoleta = "adulto" | "estudiante" | "nino";

interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  duracionMin: number;
  horarios: string[];       // ["14:00", "17:30", "20:00"]
  capacidadPorHorario: number; // 100 asientos
}

interface Venta {
  id: number;
  peliculaId: number;
  horario: string;
  tipoBoleta: TipoBoleta;
  cantidad: number;
  total: number;
  fecha: Date;
}

// Precios como objeto (evita if/else)
const PRECIOS: Record<TipoBoleta, number> = {
  adulto: 10,
  estudiante: 7,
  nino: 5
};
```

### Flujo de validaciones

```typescript
const peliculas: Pelicula[] = [
  {
    id: 1,
    titulo: "Dune: Parte Tres",
    genero: "Ciencia Ficción",
    duracionMin: 165,
    horarios: ["14:00", "17:30", "21:00"],
    capacidadPorHorario: 100
  },
  // ... más películas
];

const ventas: Venta[] = [];

function comprarBoletas(
  peliculaId: number,
  horario: string,
  tipo: TipoBoleta,
  cantidad: number
): void {
  // 1. Validar que la película existe
  const pelicula = peliculas.find(p => p.id === peliculaId);
  if (!pelicula) {
    console.log("❌ Película no encontrada");
    return;
  }

  // 2. Validar que el horario existe para esa película
  if (!pelicula.horarios.includes(horario)) {
    console.log(`❌ Horario ${horario} no disponible para "${pelicula.titulo}"`);
    return;
  }

  // 3. Contar cuántas boletas ya se vendieron para ese horario
  const vendidas = ventas
    .filter(v => v.peliculaId === peliculaId && v.horario === horario)
    .reduce((acc, v) => acc + v.cantidad, 0);

  const disponibles = pelicula.capacidadPorHorario - vendidas;

  // 4. Validar disponibilidad
  if (cantidad > disponibles) {
    console.log(`❌ Solo quedan ${disponibles} asientos disponibles`);
    return;
  }

  // 5. Calcular y registrar
  const total = PRECIOS[tipo] * cantidad;

  ventas.push({
    id: ventas.length + 1,
    peliculaId,
    horario,
    tipoBoleta: tipo,
    cantidad,
    total,
    fecha: new Date()
  });

  console.log(`🎟️  ${cantidad} boleta(s) de ${tipo} para "${pelicula.titulo}" ${horario} → $${total}`);
}

// Reporte: películas populares (ocupación >= 70%)
function peliculasPopulares(): void {
  peliculas.forEach(p => {
    const totalVendidas = ventas
      .filter(v => v.peliculaId === p.id)
      .reduce((acc, v) => acc + v.cantidad, 0);

    // Una película tiene N horarios, cada uno con 100 asientos
    const capacidadTotal = p.horarios.length * p.capacidadPorHorario;
    const ocupacion = (totalVendidas / capacidadTotal) * 100;

    if (ocupacion >= 70) {
      console.log(`🔥 "${p.titulo}" - Ocupación: ${ocupacion.toFixed(1)}%`);
    }
  });
}
```

### Preguntas guía

- ¿`filter()` o `find()` para buscar película? → `find()` cuando buscas **uno solo** por ID; `filter()` cuando quieres **todos** los que cumplen algo
- ¿Cómo cuento boletas vendidas por horario? → `filter` por película y horario, luego `reduce` sumando cantidades
- ¿Cómo calculo % de ocupación? → `(vendidas / capacidadTotal) * 100`

---

## ✅ Buenas Prácticas Profesionales

### Nombres claros

```typescript
// ❌ Mal
const x = u.filter(i => i.a === true);

// ✅ Bien
const usuariosActivos = usuarios.filter(u => u.activo === true);
```

### Funciones pequeñas — una sola responsabilidad

```typescript
// ❌ Mal: una función hace todo
function procesarReserva(cliente, tipo, noches) {
  // 50 líneas de código mezclando lógica
}

// ✅ Bien: cada función hace UNA cosa
function calcularDescuento(noches: number): number { ... }
function calcularPrecio(tipo: TipoHabitacion, noches: number): number { ... }
function guardarReserva(reserva: Reserva): void { ... }
function mostrarReporte(): void { ... }
```

### Usa tipos en lugar de strings mágicos

```typescript
// ❌ Mal: cualquiera puede escribir "Deposito" con mayúscula y romper todo
tipo: string

// ✅ Bien: solo estos valores son válidos, TypeScript lo verifica
tipo: "deposito" | "retiro" | "consulta"
```

### Comenta el POR QUÉ, no el QUÉ

```typescript
// ❌ Inútil: el código ya dice eso
// sumar monto al saldo
cuenta.saldo += monto;

// ✅ Útil: explica la decisión de diseño
// El saldo se actualiza ANTES de registrar la transacción para que
// saldoResultante refleje el estado final correcto en el historial
cuenta.saldo += monto;
```

---

## 📚 Recursos para Estudiar Más

### TypeScript — Documentación oficial y tutoriales

|Recurso|Tipo|Para qué|
|---|---|---|
|[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)|Docs oficial|Referencia completa del lenguaje|
|[TypeScript en 5 minutos](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)|Tutorial|Repaso rápido de lo básico|
|[Execute Program — TypeScript](https://www.executeprogram.com/courses/typescript)|Curso interactivo|Práctica en el navegador|
|[Total TypeScript](https://www.totaltypescript.com/tutorials)|Tutoriales gratis|Desde básico hasta avanzado|

### Arrays y métodos funcionales

|Recurso|Tipo|Para qué|
|---|---|---|
|[MDN — Array.map()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)|Docs|Referencia de `map` en español|
|[MDN — Array.filter()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)|Docs|Referencia de `filter` en español|
|[MDN — Array.reduce()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)|Docs|Referencia de `reduce` en español|
|[javascript.info — Arrays](https://javascript.info/array-methods)|Tutorial|Los mejores ejemplos de cada método|

### Para practicar TypeScript en el navegador (sin instalar nada)

|Recurso|Para qué|
|---|---|
|[TypeScript Playground](https://www.typescriptlang.org/play)|Probar código TS online|
|[CodeSandbox](https://codesandbox.io)|Proyectos completos en el navegador|

### Programación funcional (el paradigma detrás de map/filter/reduce)

|Recurso|Tipo|Para qué|
|---|---|---|
|[Functional Programming for JS Developers](https://opensource.com/article/17/6/functional-javascript)|Artículo|Conceptos de FP en JS/TS|
|[Professor Frisby's Mostly Adequate Guide](https://mostly-adequate.gitbook.io/mostly-adequate-guide)|Libro gratis|Profundizar en FP (intermedio)|

### Herramientas útiles en Fedora

```bash
# Ver errores de TypeScript en tiempo real
tsc --watch

# Ejecutar TypeScript directamente (sin compilar)
ts-node archivo.ts

# Linter para TS (detecta errores de estilo)
npm install -g eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Extensión recomendada en VS Code
# "TypeScript Hero" o "Error Lens" para ver errores inline
```

---

## 🗺️ Resumen visual de todos los ejercicios

|Ejercicio|Nivel|Concepto clave|Métodos usados|
|---|---|---|---|
|1 — Cajero|🟢 Principiante|Estado mutable + historial inmutable|`map`, `filter`, `reduce`|
|2 — Hotel|🟡 Intermedio|Precios dinámicos + descuentos condicionales|`map`, `filter`, `reduce`|
|3 — Lavadoras|🟡 Intermedio|Inventario con estado (disponible/ocupado)|`filter`, `find`, `reduce`|
|4 — Fila Banco|🔴 Avanzado|Estructura FIFO + estadísticas temporales|`filter`, `map`, `reduce`|
|5 — Cine|🔴 Avanzado|Múltiples entidades relacionadas + validaciones|`find`, `filter`, `reduce`|

---

> _"Primero hazlo funcionar. Luego hazlo limpio. Solo después, hazlo rápido."_  
> — Kent Beck

---

