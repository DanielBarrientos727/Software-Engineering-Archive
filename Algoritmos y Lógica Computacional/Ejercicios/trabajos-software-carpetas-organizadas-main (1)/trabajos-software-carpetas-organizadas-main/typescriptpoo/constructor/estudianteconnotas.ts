class Estudiante {

    readonly codigo: number
    public nombre: string
    private notas: number[]

    constructor(codigo: number, nombre: string) {

        this.codigo = codigo
        this.nombre = nombre
        this.notas = []

    }

    agregarNota(n: number): void {

        this.notas.push(n)

    }

    promedio(): number {

        let suma = 0

        for(const nota of this.notas) {

            suma += nota

        }

        return suma / this.notas.length

    }

    aprobado(): boolean {

        return this.promedio() >= 3.0

    }

}

const estudiante1 = new Estudiante(
    101,
    "David"
)

estudiante1.agregarNota(4)
estudiante1.agregarNota(3)
estudiante1.agregarNota(5)
estudiante1.agregarNota(2)

console.log("Promedio:")
console.log(estudiante1.promedio())

console.log("¿Aprobó?")
console.log(estudiante1.aprobado())