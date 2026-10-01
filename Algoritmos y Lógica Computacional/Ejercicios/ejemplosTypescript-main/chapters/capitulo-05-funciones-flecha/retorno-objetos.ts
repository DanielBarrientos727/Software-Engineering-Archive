// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta función flecha retorna un objeto literal usando paréntesis.
const createStudentCard = (name: string, grade: number) => ({
  // Esta propiedad guarda el nombre recibido.
  name,
  // Esta propiedad guarda la nota recibida.
  grade,
  // Esta propiedad calcula si se aprobó.
  passed: grade >= 3,
});

// Esta constante genera una tarjeta académica.
const studentCard = createStudentCard("Paula", 4.3);

// Este `console.log` imprime el objeto retornado implícitamente.
console.log(studentCard);
