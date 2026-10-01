function potencia(base: number, exponente: number): number {

    if(exponente === 0) {
        return 1
    }

    return base * potencia(base, exponente - 1)
}

console.log(potencia(3, 3))
console.log(potencia(5, 4))
console.log(potencia(10, 2))