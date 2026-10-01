const etiquetas = new Set<string>();

etiquetas.add("tecnología");
etiquetas.add("IA");
etiquetas.add("tecnología");
etiquetas.add("desarrollo");
etiquetas.add("IA");

console.log("Tamaño:", etiquetas.size);
console.log(etiquetas);
console.log("Tiene 'IA':", etiquetas.has("IA"));

etiquetas.delete("desarrollo");
console.log(etiquetas);