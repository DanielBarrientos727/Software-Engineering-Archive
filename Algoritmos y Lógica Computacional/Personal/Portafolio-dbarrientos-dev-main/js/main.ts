// ═══════════════════════════════════════
// INIT
// ═══════════════════════════════════════
document.addEventListener("DOMContentLoaded", (): void => {

  console.log("Sistema inicializado 🚀");

// ═══════════════════════════════════════
// MODO OSCURO / CLARO (persistente)
// ═══════════════════════════════════════

const botonTema: HTMLButtonElement = document.createElement("button");
botonTema.textContent = "🌙 / ☀️";
botonTema.style.margin = "1rem 0";

const contenedor = document.querySelector(".contenedor");

if (contenedor instanceof HTMLElement) {
  contenedor.prepend(botonTema);
}

// Aplicar tema guardado al cargar
const temaGuardado: string | null = localStorage.getItem("tema");

if (temaGuardado === "light") {
  document.body.classList.add("light-mode");
}

// Evento click
botonTema.addEventListener("click", (): void => {
  document.body.classList.toggle("light-mode");

  const esClaro = document.body.classList.contains("light-mode");

  localStorage.setItem("tema", esClaro ? "light" : "dark");
});

  // ═══════════════════════════════════════
  // SALUDO DINÁMICO
  // ═══════════════════════════════════════
  const hora: number = new Date().getHours();
  let saludo: string = "Hola";

  if (hora < 12) saludo = "Buenos días";
  else if (hora < 18) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  const titulo = document.querySelector("h1") as HTMLHeadingElement | null;

  if (titulo) {
    titulo.textContent = `${saludo}, soy dbarrientos-dev ⌬ħ`;
  }

  // ═══════════════════════════════════════
  // CONFIRMACIÓN DE FORMULARIO
  // ═══════════════════════════════════════
  const form = document.querySelector("form") as HTMLFormElement | null;

  if (form) {
    form.addEventListener("submit", (e: Event): void => {
      e.preventDefault();

      alert("Formulario enviado (simulación). Buen trabajo 👍");
      form.reset();
    });
  }

  // ═══════════════════════════════════════
  // EFECTO HOVER EN PROYECTOS
  // ═══════════════════════════════════════
  const filas = document.querySelectorAll("tbody tr");

  filas.forEach((fila: Element): void => {
    const filaHTML = fila as HTMLElement;

    filaHTML.addEventListener("mouseenter", (): void => {
      filaHTML.style.transform = "scale(1.02)";
      filaHTML.style.transition = "0.2s";
    });

    filaHTML.addEventListener("mouseleave", (): void => {
      filaHTML.style.transform = "scale(1)";
    });
  });

});