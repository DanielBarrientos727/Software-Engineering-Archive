const visitas: string[] = ["Colombia", "México", "Brasil", "Colombia", "Argentina", "México", "Chile"];

const unicos = new Set<string>(visitas);

console.log("Países distintos:", unicos.size);
console.log([...unicos].sort());