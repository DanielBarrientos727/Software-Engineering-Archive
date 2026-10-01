function cuentaRegresiva(n: number): void {

    if(n === 0) {
        console.log("YA")
        return
    }

    console.log(n)

    cuentaRegresiva(n - 1)
}

cuentaRegresiva(10)