// Calculator.java
// Máquina de estados de la calculadora — lógica pura, sin Swing.
// Exactamente el mismo modelo que el lib.rs de la versión WASM:
// operando guardado, operador pendiente, flags de control.

public class Calculator {

    // ─────────────────────────────────────────────────────────────
    // Estado interno
    // ─────────────────────────────────────────────────────────────

    /** Cadena visible en el display principal. */
    private String display = "0";

    /** Operando izquierdo guardado al presionar un operador. */
    private double stored = 0.0;

    /**
     * Operador pendiente: "+", "-", "×", "÷", o "" si no hay ninguno.
     * Usamos String en lugar de enum para simplificar la interfaz con la UI.
     */
    private String operator = "";

    /** true → el próximo dígito comienza un número nuevo. */
    private boolean startNew = false;

    /** true → ya hay punto decimal en el número actual. */
    private boolean hasDecimal = false;

    /** Línea secundaria: expresión parcial (ej: "12 × "). */
    private String expression = "";

    /** true → ocurrió un error; bloquea la entrada hasta que se limpie. */
    private boolean error = false;

    // ─────────────────────────────────────────────────────────────
    // API pública — llamada por la UI
    // ─────────────────────────────────────────────────────────────

    /** Procesa un dígito (0–9). */
    public void pressDigit(String d) {
        if (error) return;

        if (startNew) {
            // Después de operador o "=": reemplazar display
            display = d.equals("0") ? "0" : d;
            startNew = false;
            hasDecimal = false;
        } else if (display.equals("0")) {
            // Reemplazar el cero inicial
            display = d;
        } else if (display.length() < 13) {
            // Limitar a 13 caracteres para que quepa en el display
            display += d;
        }
    }

    /** Procesa el punto decimal. */
    public void pressDecimal() {
        if (error) return;

        if (startNew) {
            display = "0.";
            startNew = false;
            hasDecimal = true;
            return;
        }
        if (!hasDecimal) {
            display += ".";
            hasDecimal = true;
        }
    }

    /**
     * Procesa un operador (+, -, ×, ÷).
     * Si había un operador pendiente y un segundo número ingresado,
     * evalúa primero (chaining: 3 + 4 × → muestra 7 antes de ×).
     */
    public void pressOperator(String op) {
        if (error) reset();

        double current = parseDisplay();

        // Chaining: evaluar expresión anterior antes de registrar el nuevo op
        if (!operator.isEmpty() && !startNew) {
            double result = evaluate(stored, current, operator);
            if (Double.isInfinite(result) || Double.isNaN(result)) {
                display = "÷ 0 indefinido";
                error = true;
                expression = "";
                return;
            }
            stored = result;
            display = formatNumber(result);
        } else {
            stored = current;
        }

        operator = op;
        expression = formatNumber(stored) + " " + op;
        startNew = true;
        hasDecimal = false;
    }

    /** Evalúa la expresión completa al presionar "=". */
    public void pressEquals() {
        if (error) { reset(); return; }
        if (operator.isEmpty()) return;

        double right = parseDisplay();
        String fullExpr = expression + " " + formatNumber(right) + " =";

        double result = evaluate(stored, right, operator);

        if (Double.isInfinite(result) || Double.isNaN(result)) {
            display = "÷ 0 indefinido";
            error = true;
            expression = fullExpr;
            return;
        }

        expression = fullExpr;
        display = formatNumber(result);
        stored = result;
        operator = "";
        startNew = true;
        hasDecimal = display.contains(".");
    }

    /** Borra el último carácter (⌫). */
    public void pressBackspace() {
        if (error || startNew) return;

        if (display.length() <= 1) {
            display = "0";
            hasDecimal = false;
        } else {
            char last = display.charAt(display.length() - 1);
            if (last == '.') hasDecimal = false;
            display = display.substring(0, display.length() - 1);
        }
    }

    /** Limpia todo (C). */
    public void pressClear() {
        reset();
    }

    // ─────────────────────────────────────────────────────────────
    // Getters — la UI los llama para refrescar el display
    // ─────────────────────────────────────────────────────────────

    public String getDisplay()    { return display;    }
    public String getExpression() { return expression; }
    public boolean isError()      { return error;      }

    // ─────────────────────────────────────────────────────────────
    // Helpers privados
    // ─────────────────────────────────────────────────────────────

    private void reset() {
        display    = "0";
        stored     = 0.0;
        operator   = "";
        startNew   = false;
        hasDecimal = false;
        expression = "";
        error      = false;
    }

    /** Aplica el operador a (a, b). */
    private double evaluate(double a, double b, String op) {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "×": return a * b;
            case "÷": return b == 0.0 ? Double.POSITIVE_INFINITY : a / b;
            default:  return b;
        }
    }

    /**
     * Convierte double a String legible:
     * - Enteros sin ".0"
     * - Decimales con hasta 10 dígitos, sin ceros finales
     */
    static String formatNumber(double n) {
        if (Double.isNaN(n))      return "Error";
        if (Double.isInfinite(n)) return n > 0 ? "Overflow" : "-Overflow";

        if (n == Math.floor(n) && Math.abs(n) < 1e12) {
            return String.valueOf((long) n);
        }

        // Hasta 10 decimales, recortando ceros finales
        String s = String.format("%.10f", n);
        s = s.replaceAll("0+$", "").replaceAll("\\.$", "");
        return s;
    }

    private double parseDisplay() {
        try {
            return Double.parseDouble(display);
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }
}
