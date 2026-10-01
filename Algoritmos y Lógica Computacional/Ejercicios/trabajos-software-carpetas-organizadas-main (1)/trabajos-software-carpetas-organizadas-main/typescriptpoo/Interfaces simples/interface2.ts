interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descuento?: number;
    descripcion?: string;
}

const producto1: Producto = {
    id: 1,
    nombre: "Laptop Gamer",
    precio: 3500000,
    descuento: 10,
    descripcion: "Laptop con RTX 4060 y 16GB RAM"
};

const producto2: Producto = {
    id: 2,
    nombre: "Mouse",
    precio: 80000
};

function mostrarProducto(producto: Producto): void {

    const precioFinal = producto.descuento
        ? producto.precio - (producto.precio * producto.descuento / 100)
        : producto.precio;

    console.log("=== PRODUCTO ===");
    console.log("ID:", producto.id);
    console.log("Nombre:", producto.nombre);
    console.log("Precio original: $", producto.precio);

    if (producto.descuento) {
        console.log("Descuento:", producto.descuento + "%");
    }
    if (producto.descripcion) {
        console.log("Descripción:", producto.descripcion);
    }

    console.log("Precio final: $", precioFinal);
    console.log("----------------------");
}

mostrarProducto(producto1);
mostrarProducto(producto2);