// src/lib.rs
// Lógica completa de la calculadora, compilable a WebAssembly.
// Expuesta a JavaScript mediante wasm-bindgen.

use wasm_bindgen::prelude::*;

// ---------------------------------------------------------------------------
// Tipos internos
// ---------------------------------------------------------------------------

/// Operador aritmético pendiente de aplicar.
/// No se expone a JS — es estado interno puro de Rust.
#[derive(Clone, PartialEq)]
enum Op {
    Add, // +
    Sub, // -
    Mul, // ×
    Div, // ÷
    None,
}

// ---------------------------------------------------------------------------
// Struct principal — máquina de estados de la calculadora
// ---------------------------------------------------------------------------

/// Calculadora completa. Su estado vive en el heap de WASM.
/// JS mantiene un puntero opaco a esta instancia.
#[wasm_bindgen]
pub struct Calculator {
    /// Cadena visible en el display principal (ej: "3.14")
    display: String,

    /// Operando izquierdo guardado al presionar un operador
    stored: f64,

    /// Operador pendiente (esperando el operando derecho)
    operator: Op,

    /// True → el próximo dígito comienza un número nuevo.
    /// Se activa tras presionar un operador o "=".
    start_new: bool,

    /// True → ya hay un punto decimal en el número actual.
    /// Evita entradas como "3.1.4".
    has_decimal: bool,

    /// Línea secundaria: muestra la expresión parcial, ej: "12 × "
    expression: String,

    /// True → ocurrió un error (ej: div/0). Bloquea la entrada.
    error: bool,
}

// ---------------------------------------------------------------------------
// API pública — todo lo que JavaScript puede llamar
// ---------------------------------------------------------------------------

#[wasm_bindgen]
impl Calculator {
    /// Constructor. Se llama desde JS como `new Calculator()`.
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Calculator {
            display: "0".into(),
            stored: 0.0,
            operator: Op::None,
            start_new: false,
            has_decimal: false,
            expression: String::new(),
            error: false,
        }
    }

    /// Procesa un dígito (0-9) presionado desde botón o teclado.
    pub fn press_digit(&mut self, d: &str) -> String {
        // No aceptar input mientras haya error
        if self.error {
            return self.display.clone();
        }

        if self.start_new {
            // Después de operador o "=": reemplazar display con el nuevo dígito
            self.display = if d == "0" { "0".into() } else { d.into() };
            self.start_new = false;
            self.has_decimal = false;
        } else if self.display == "0" {
            // Reemplazar el cero inicial, excepto si sigue un decimal
            self.display = d.into();
        } else if self.display.len() < 13 {
            // Limitar a 13 caracteres para que el número quepa en el display
            self.display.push_str(d);
        }

        self.display.clone()
    }

    /// Procesa el botón de punto decimal.
    pub fn press_decimal(&mut self) -> String {
        if self.error {
            return self.display.clone();
        }

        if self.start_new {
            // Comenzar nuevo número directamente con "0."
            self.display = "0.".into();
            self.start_new = false;
            self.has_decimal = true;
            return self.display.clone();
        }

        // Solo agregar "." si no existe uno ya
        if !self.has_decimal {
            self.display.push('.');
            self.has_decimal = true;
        }

        self.display.clone()
    }

    /// Procesa un operador (+, -, ×, ÷).
    /// Si hay un operador pendiente anterior, lo evalúa primero (chaining).
    pub fn press_operator(&mut self, op: &str) -> String {
        // Si estábamos en error, limpiar primero
        if self.error {
            self.reset();
        }

        let current: f64 = self.display.parse().unwrap_or(0.0);

        // Chaining: si ya había un operador pendiente Y el usuario ingresó
        // un segundo número, evaluar la expresión previa antes de seguir.
        if self.operator != Op::None && !self.start_new {
            match self.evaluate(self.stored, current) {
                Ok(result) => {
                    self.stored = result;
                    self.display = Self::format_number(result);
                }
                Err(msg) => {
                    self.display = msg;
                    self.error = true;
                    self.expression = String::new();
                    return self.display.clone();
                }
            }
        } else {
            // Guardar el número actual como operando izquierdo
            self.stored = current;
        }

        // Actualizar expresión visible en la línea secundaria
        self.expression = format!("{} {}", Self::format_number(self.stored), op);
        self.operator = Self::parse_op(op);
        self.start_new = true;
        self.has_decimal = false;

        self.display.clone()
    }

    /// Evalúa la expresión completa al presionar "=".
    pub fn press_equals(&mut self) -> String {
        if self.error {
            self.reset();
            return self.display.clone();
        }

        // Nada que evaluar sin operador pendiente
        if self.operator == Op::None {
            return self.display.clone();
        }

        let right: f64 = self.display.parse().unwrap_or(0.0);

        // Guardar la expresión completa antes de evaluar
        let full_expr = format!("{} {} =", self.expression, Self::format_number(right));

        match self.evaluate(self.stored, right) {
            Ok(result) => {
                self.expression = full_expr;
                self.display = Self::format_number(result);
                self.stored = result;
                self.operator = Op::None;
                self.start_new = true;
                // Re-detectar si el resultado ya tiene decimal
                self.has_decimal = self.display.contains('.');
            }
            Err(msg) => {
                self.display = msg;
                self.error = true;
                self.expression = full_expr;
            }
        }

        self.display.clone()
    }

    /// Borra el último carácter del número actual (botón ⌫).
    pub fn press_backspace(&mut self) -> String {
        // No retroceder si estamos esperando un número nuevo o en error
        if self.error || self.start_new {
            return self.display.clone();
        }

        if self.display.len() <= 1 {
            // Si solo queda un carácter, volver a "0"
            self.display = "0".into();
            self.has_decimal = false;
        } else {
            let last_char = self.display.chars().last().unwrap();
            if last_char == '.' {
                self.has_decimal = false;
            }
            self.display.pop();
        }

        self.display.clone()
    }

    /// Limpia todo y regresa al estado inicial (botón C / Escape).
    pub fn press_clear(&mut self) -> String {
        self.reset();
        self.display.clone()
    }

    /// Retorna la cadena del display principal (para leer sin modificar estado).
    pub fn get_display(&self) -> String {
        self.display.clone()
    }

    /// Retorna la línea de expresión secundaria.
    pub fn get_expression(&self) -> String {
        self.expression.clone()
    }

    /// Retorna true si hay un error activo (útil para el JS si necesita stilo).
    pub fn is_error(&self) -> bool {
        self.error
    }
}

// ---------------------------------------------------------------------------
// Métodos privados (helpers internos, no expuestos a JS)
// ---------------------------------------------------------------------------

impl Calculator {
    /// Reinicia completamente el estado de la calculadora.
    fn reset(&mut self) {
        self.display = "0".into();
        self.stored = 0.0;
        self.operator = Op::None;
        self.start_new = false;
        self.has_decimal = false;
        self.expression = String::new();
        self.error = false;
    }

    /// Aplica el operador actual a (a, b). Retorna Ok(resultado) o Err(mensaje).
    fn evaluate(&self, a: f64, b: f64) -> Result<f64, String> {
        match &self.operator {
            Op::Add => Ok(a + b),
            Op::Sub => Ok(a - b),
            Op::Mul => Ok(a * b),
            Op::Div => {
                if b == 0.0 {
                    Err("÷ 0 undefined".into())
                } else {
                    Ok(a / b)
                }
            }
            Op::None => Ok(b),
        }
    }

    /// Convierte un f64 en String legible:
    /// - Enteros sin ".0"
    /// - Decimales con hasta 10 dígitos, sin ceros finales
    /// - Manejo de infinito y NaN
    fn format_number(n: f64) -> String {
        if n.is_nan() {
            return "Error".into();
        }
        if n.is_infinite() {
            return if n > 0.0 { "Overflow".into() } else { "-Overflow".into() };
        }

        // Si el número cabe como entero exacto, no mostrar decimales
        if n.fract() == 0.0 && n.abs() < 1e12 {
            return format!("{}", n as i64);
        }

        // Formato con hasta 10 decimales, recortando ceros finales
        let formatted = format!("{:.10}", n);
        let trimmed = formatted.trim_end_matches('0').trim_end_matches('.');
        trimmed.to_string()
    }

    /// Convierte el string del operador al enum interno.
    fn parse_op(op: &str) -> Op {
        match op {
            "+" => Op::Add,
            "-" => Op::Sub,
            "×" | "*" => Op::Mul,
            "÷" | "/" => Op::Div,
            _ => Op::None,
        }
    }
}
