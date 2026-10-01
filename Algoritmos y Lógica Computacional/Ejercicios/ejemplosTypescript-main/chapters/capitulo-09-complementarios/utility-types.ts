// Esta línea convierte el archivo en módulo y evita colisiones globales.
export {};

// Esta interface modela un usuario base.
interface User {
  // Esta propiedad guarda el identificador.
  id: string;
  // Esta propiedad guarda el nombre.
  name: string;
  // Esta propiedad guarda el correo.
  email: string;
  // Esta propiedad guarda el rol.
  role: "admin" | "student";
}

// Este tipo toma solo las propiedades públicas.
type PublicUser = Pick<User, "id" | "name" | "role">;

// Este tipo omite el correo para ciertos contextos.
type UserWithoutEmail = Omit<User, "email">;

// Este tipo construye un diccionario tipado por ids.
type UserMap = Record<string, PublicUser>;

// Esta constante representa un usuario público.
const publicUser: PublicUser = { id: "1", name: "Valeria", role: "student" };

// Esta constante representa un usuario sin correo.
const userWithoutEmail: UserWithoutEmail = { id: "2", name: "Tomás", role: "admin" };

// Esta constante representa un mapa de usuarios.
const userMap: UserMap = {
  "1": publicUser,
  "2": { id: "2", name: "Tomás", role: "admin" },
};

// Este `console.log` imprime los tipos de utilidad en acción.
console.log({ publicUser, userWithoutEmail, userMap });
