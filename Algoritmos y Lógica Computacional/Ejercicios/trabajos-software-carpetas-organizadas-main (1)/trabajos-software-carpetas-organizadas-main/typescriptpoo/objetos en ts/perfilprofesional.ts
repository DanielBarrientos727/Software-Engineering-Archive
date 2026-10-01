type Perfil = {
  nombre: string;
  profesion: string;
  experiencia: number;
  habilidades: string[];
};

const perfil: Perfil = { nombre: "vanessa", profesion: "Desarrolladora", experiencia: 6, habilidades: ["TypeScript", "React", "Node"] };

const perfilClonado = { ...perfil, nombre: "sebastian", experiencia: 2 };

console.log(perfil);
console.log(perfilClonado);
console.log(Object.keys(perfil));