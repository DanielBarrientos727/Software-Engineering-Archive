interface Vehiculo {
    readonly placa: string;
    marca: string;
    modelo: string;
    año: number;
    Kilometraje: number;
    disponible: boolean;
}

const vehiculo1: Vehiculo = { 
    placa: "275cdm",
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020,
    Kilometraje: 15000,
    disponible: true
};
const vehiculo2: Vehiculo = {
    placa: "789CMS",
    marca: "Honda",
    modelo: "Civic",
    año: 2019,
    Kilometraje: 20000,
    disponible: false
};
const vehiculo3: Vehiculo = {
    placa: "423GKS",
    marca: "Ford",  
    modelo: "Focus",
    año: 2021,
    Kilometraje: 10000,
    disponible: true
};
console.log(vehiculo1);