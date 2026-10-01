const celsius: number[] = [0, 20, 37, 100, -10];
const fahrenheit = celsius.map((c) => c * 9/5 + 32);

console.log("Celsius:", celsius);
console.log("Fahrenheit:", fahrenheit);