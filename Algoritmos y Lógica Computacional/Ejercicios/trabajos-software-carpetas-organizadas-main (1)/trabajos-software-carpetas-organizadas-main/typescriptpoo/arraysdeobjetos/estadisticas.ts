const ventas = [
  { id: 1, vendedor: "sebastian", monto: 500000, region: "Norte" },
  { id: 2, vendedor: "miguel", monto: 320000, region: "Sur" },
  { id: 3, vendedor: "steeven", monto: 780000, region: "Centro" },
  { id: 4, vendedor: "santiago", monto: 150000, region: "Norte" },
  { id: 5, vendedor: "daniel", monto: 430000, region: "Sur" },
  { id: 6, vendedor: "david", monto: 620000, region: "sur" },
];

const mayorVenta = ventas.reduce((max, v) => v.monto > max.monto ? v : max);

const totalPorRegion = ventas.reduce((acc, v) => {
  acc[v.region] = (acc[v.region] ?? 0) + v.monto;
  return acc;
}, {} as Record<string, number>);

const vendedoresUnicos = [...new Set(ventas.map((v) => v.vendedor))];

console.log("Mayor venta:", mayorVenta);
console.log("Total por región:", totalPorRegion);
console.log("Vendedores únicos:", vendedoresUnicos);