# 🚀 Ejercicios de JavaScript a TypeScript

Colección de 5 ejercicios prácticos en TypeScript orientados a lógica de negocio: lavandería, pedidos, subsidios, parqueadero y biblioteca.

## 📦 Archivos del proyecto

Los ejercicios reales del repositorio son:

- `ejercicio1_lavanderia.ts`
- `ejercicio2_hamburguesas.ts`
- `ejercicio3_alcaldia.ts`
- `ejercicio4_parqueadero.ts`
- `ejercicio5_biblioteca.ts`

---

## 🛠️ Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```

2. Instala dependencias con Bun:

   ```bash
   bun install
   ```

> Si prefieres ejecutar con `ts-node`, instala también:
>
> ```bash
> npm i -D typescript ts-node
> ```

---

## ▶️ Cómo ejecutar cada ejercicio

Puedes usar **Bun** (recomendado en este repo) o **ts-node**.

### Ejercicio 1: Lavandería
- Bun:
  ```bash
  bun ejercicio1_lavanderia.ts
  ```
- ts-node:
  ```bash
  npx ts-node ejercicio1_lavanderia.ts
  ```

### Ejercicio 2: Hamburguesas
- Bun:
  ```bash
  bun ejercicio2_hamburguesas.ts
  ```
- ts-node:
  ```bash
  npx ts-node ejercicio2_hamburguesas.ts
  ```

### Ejercicio 3: Alcaldía (Subsidios)
- Bun:
  ```bash
  bun ejercicio3_alcaldia.ts
  ```
- ts-node:
  ```bash
  npx ts-node ejercicio3_alcaldia.ts
  ```

### Ejercicio 4: Parqueadero
- Bun:
  ```bash
  bun ejercicio4_parqueadero.ts
  ```
- ts-node:
  ```bash
  npx ts-node ejercicio4_parqueadero.ts
  ```

### Ejercicio 5: Biblioteca
- Bun:
  ```bash
  bun ejercicio5_biblioteca.ts
  ```
- ts-node:
  ```bash
  npx ts-node ejercicio5_biblioteca.ts
  ```

---

## ✅ Nota breve de validación de datos esperados

- **`ejercicio1_lavanderia.ts`**: `horas` debe ser número entero mayor o igual a 0. El descuento aplica desde 12 horas.
- **`ejercicio2_hamburguesas.ts`**: las claves de `pedidos` deben coincidir exactamente con los `nombre` de `combos` y las cantidades deben ser enteros ≥ 0.
- **`ejercicio3_alcaldia.ts`**: `nombres` y `edades` deben tener la misma longitud; cada edad debe ser un número entero válido.
- **`ejercicio4_parqueadero.ts`**: `tipos` y `horas` deben tener igual tamaño; `tipo` debe ser 1 (moto), 2 (carro) o 3 (camioneta), y `horas` ≥ 0.
- **`ejercicio5_biblioteca.ts`**: `usuarios` y `prestamosPorUsuario` deben estar alineados por índice; cada día de préstamo debe ser número entero ≥ 0.

---

## 🧪 Sugerencia de verificación rápida

Para validar compilación de TypeScript:

```bash
npx tsc --noEmit
```
