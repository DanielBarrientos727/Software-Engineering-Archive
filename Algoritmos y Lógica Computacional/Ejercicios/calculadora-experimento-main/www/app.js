/**
 * app.js — Punto de entrada del frontend.
 *
 * Responsabilidades:
 *  1. Importar e inicializar el módulo WASM generado por wasm-pack.
 *  2. Crear una instancia de Calculator (struct Rust).
 *  3. Conectar los botones del HTML con los métodos de la calculadora.
 *  4. Conectar el teclado físico.
 *  5. Actualizar el display después de cada acción.
 *
 * Nota sobre el path del import:
 *   wasm-pack --target web genera ./pkg/rust_calculator.js
 *   (el nombre del package en Cargo.toml con guiones → guiones bajos)
 */

// Importación del módulo WASM. 'init' inicializa el runtime,
// 'Calculator' es la clase generada a partir del struct Rust.
import init, { Calculator } from '../pkg/rust_calculator.js';

// ─────────────────────────────────────────────────────────────────────────────
// Bootstrap: esperar a que WASM esté listo antes de mostrar la UI
// ─────────────────────────────────────────────────────────────────────────────

async function bootstrap() {
  // Inicializar el runtime WASM (descarga y compila el .wasm si no está cacheado)
  await init();

  // Crear la instancia de la calculadora (estado vive en la memoria WASM)
  const calc = new Calculator();

  // Ocultar loader, mostrar app
  document.getElementById('loader').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  // Conectar toda la lógica de UI
  setupUI(calc);
}

// ─────────────────────────────────────────────────────────────────────────────
// setupUI: registrar listeners y definir updateDisplay
// ─────────────────────────────────────────────────────────────────────────────

function setupUI(calc) {
  // Referencias al DOM — buscamos una sola vez, no en cada evento
  const displayEl    = document.getElementById('display');
  const expressionEl = document.getElementById('expression');

  /**
   * Refleja el estado actual de la calculadora en el HTML.
   * Llamada después de CADA acción (botón o tecla).
   */
  function updateDisplay() {
    const value      = calc.get_display();
    const expression = calc.get_expression();
    const isError    = calc.is_error();

    displayEl.textContent    = value;
    expressionEl.textContent = expression;

    // Clase 'error' cambia el color del display a rojo
    displayEl.classList.toggle('error', isError);

    // Reducir font-size si el número es muy largo (más de 9 caracteres)
    const len = value.length;
    if (len > 12)      displayEl.style.fontSize = '22px';
    else if (len > 9)  displayEl.style.fontSize = '30px';
    else if (len > 6)  displayEl.style.fontSize = '36px';
    else               displayEl.style.fontSize = '';   // volver al default CSS
  }

  // ── Botones numéricos ──────────────────────────────────────────────────────
  // Seleccionamos todos los botones con atributo data-digit
  document.querySelectorAll('[data-digit]').forEach(btn => {
    btn.addEventListener('click', () => {
      calc.press_digit(btn.dataset.digit);
      updateDisplay();
    });
  });

  // ── Botones de operador ────────────────────────────────────────────────────
  // Los botones del HTML usan los símbolos visibles (×, ÷, −, +)
  // El Rust también los recibe así; ver parse_op() en lib.rs
  document.querySelectorAll('[data-op]').forEach(btn => {
    btn.addEventListener('click', () => {
      // El botón − usa el carácter Unicode "−" (U+2212), pero enviamos "-"
      const op = btn.dataset.op === '−' ? '-' : btn.dataset.op;
      calc.press_operator(op);
      updateDisplay();
    });
  });

  // ── Botones de acción ──────────────────────────────────────────────────────
  // Manejamos todos los data-action en un solo listener delegado en el keypad
  document.querySelector('.keypad').addEventListener('click', e => {
    const action = e.target.dataset.action;
    if (!action) return; // el clic fue en un btn-num o btn-op, ya manejado

    switch (action) {
      case 'clear':   calc.press_clear();   break;
      case 'back':    calc.press_backspace(); break;
      case 'decimal': calc.press_decimal(); break;
      case 'equals':  calc.press_equals();  break;
    }
    updateDisplay();
  });

  // ── Soporte de teclado físico ──────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    // Ignorar si el foco está en un input de texto (aunque no tenemos ninguno)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    let handled = true; // asumir que la tecla es nuestra; revertir si no

    if (e.key >= '0' && e.key <= '9') {
      calc.press_digit(e.key);

    } else if (e.key === '.') {
      calc.press_decimal();

    } else if (e.key === '+') {
      calc.press_operator('+');

    } else if (e.key === '-') {
      calc.press_operator('-');

    } else if (e.key === '*') {
      calc.press_operator('×');

    } else if (e.key === '/') {
      // Prevenir la búsqueda rápida del navegador (Firefox)
      e.preventDefault();
      calc.press_operator('÷');

    } else if (e.key === 'Enter' || e.key === '=') {
      calc.press_equals();

    } else if (e.key === 'Backspace') {
      calc.press_backspace();

    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
      calc.press_clear();

    } else {
      handled = false; // tecla no reconocida, no actualizar
    }

    if (handled) {
      updateDisplay();
      // Feedback visual: resaltar brevemente el botón correspondiente
      flashKey(e.key);
    }
  });

  /**
   * Feedback visual al usar el teclado físico:
   * agrega la clase 'active' al botón equivalente por ~100ms.
   */
  function flashKey(key) {
    let selector = null;

    if (key >= '0' && key <= '9') {
      selector = `[data-digit="${key}"]`;
    } else if (key === '.') {
      selector = `[data-action="decimal"]`;
    } else if (key === '+')       selector = `[data-op="+"]`;
    else if (key === '-')         selector = `[data-op="−"]`; // botón usa −
    else if (key === '*')         selector = `[data-op="×"]`;
    else if (key === '/')         selector = `[data-op="÷"]`;
    else if (key === 'Enter' || key === '=') selector = `[data-action="equals"]`;
    else if (key === 'Backspace') selector = `[data-action="back"]`;
    else if (key === 'Escape')    selector = `[data-action="clear"]`;

    if (selector) {
      const btn = document.querySelector(selector);
      if (btn) {
        btn.classList.add('key-flash');
        setTimeout(() => btn.classList.remove('key-flash'), 120);
      }
    }
  }

  // Inicializar display con estado inicial de la calculadora
  updateDisplay();
}

// ─────────────────────────────────────────────────────────────────────────────
// Arrancar — manejar errores de carga de WASM
// ─────────────────────────────────────────────────────────────────────────────

bootstrap().catch(err => {
  // Si WASM falla (archivo no encontrado, navegador sin soporte, etc.)
  const loader = document.getElementById('loader');
  loader.innerHTML = `
    <p style="color:#c04040;font-family:'Share Tech Mono',monospace;font-size:13px;text-align:center">
      Error cargando WASM.<br>
      Ejecuta <code>wasm-pack build --target web</code><br>
      y sirve el proyecto con un servidor HTTP.
    </p>
  `;
  console.error('WASM bootstrap failed:', err);
});
