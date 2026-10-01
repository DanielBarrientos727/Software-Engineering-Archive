class Producto {

    readonly id: number
    public nombre: string
    private precio: number
    private stock: number

    constructor(
        id: number,
        nombre: string,
        precio: number,
        stock: number
    ) {

        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
    }

    aumentarPrecio(porcentaje: number): void {
        this.precio += this.precio * (porcentaje / 100)
    }
    reducirStock(cantidad: number): void {

        this.stock -= cantidad

    }
    mostrarFicha(): void {

        console.log("ID:", this.id)
        console.log("Nombre:", this.nombre)
        console.log("Precio:", this.precio)
        console.log("Stock:", this.stock)

    }

}

const producto1 = new Producto(
    1,
    "Laptop",
    2000,
    10
)

producto1.reducirStock(2)

producto1.aumentarPrecio(10)

producto1.mostrarFicha()