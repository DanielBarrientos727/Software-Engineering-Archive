interface Producto {
  nombre: string;
  bodega: "A" | "B" | "C";
  unidades: number;
}

const productos: Producto[] = [
  { nombre: "Silla", bodega: "A", unidades: 30 },
  { nombre: "Mesa", bodega: "B", unidades: 15 },
];

const inventario = productos.reduce(
  (acc, p) => {
    acc[p.bodega] += p.unidades;
    return acc;
  },
  { A: 0, B: 0, C: 0 }
);