const carrito: string[] = [];

carrito.push("katana", "shuriken", "cuchillo");
carrito.unshift("espada");
carrito.pop();
console.log(carrito.includes("shuriken"));
console.log("Total de productos:", carrito.length);
console.log(carrito);