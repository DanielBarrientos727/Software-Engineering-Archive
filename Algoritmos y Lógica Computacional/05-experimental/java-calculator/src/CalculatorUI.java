// CalculatorUI.java
// Ventana principal de la calculadora. Construye y conecta:
//   - El panel de display (expresión + número)
//   - El teclado de botones (RoundedButton en GridLayout)
//   - El listener de teclado físico
// No tiene lógica aritmética — todo va a Calculator.java.

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.*;

public class CalculatorUI extends JFrame {

    // ─────────────────────────────────────────────────────────────
    // Paleta de colores — misma que el CSS de la versión WASM
    // ─────────────────────────────────────────────────────────────

    // Fondos
    private static final Color C_BG        = hex("#080808"); // página
    private static final Color C_SURFACE   = hex("#111111"); // tarjeta
    private static final Color C_SURFACE2  = hex("#181818"); // display
    private static final Color C_BORDER    = hex("#282828"); // bordes

    // Botones
    private static final Color C_BTN_NUM   = hex("#1C1C1C");
    private static final Color C_BTN_NUM_H = hex("#262626");
    private static final Color C_BTN_NUM_A = hex("#1A1A1A");

    private static final Color C_BTN_OP    = hex("#2A2010");
    private static final Color C_BTN_OP_H  = hex("#3D3010");
    private static final Color C_BTN_OP_A  = hex("#221A08");

    private static final Color C_BTN_CLR   = hex("#200D0D");
    private static final Color C_BTN_CLR_H = hex("#2E1010");

    private static final Color C_BTN_BACK  = hex("#141420");
    private static final Color C_BTN_BCK_H = hex("#1C1C30");

    private static final Color C_EQUALS    = hex("#C89830");
    private static final Color C_EQUALS_H  = hex("#E8B840");
    private static final Color C_EQUALS_A  = hex("#A07A20");

    // Texto
    private static final Color C_DORADO    = hex("#C89830"); // acentos
    private static final Color C_DORADO_B  = hex("#E8B840"); // display principal
    private static final Color C_TEXT_OP   = hex("#D4A843"); // label operadores
    private static final Color C_TEXT_NUM  = hex("#CCCCCC"); // label números
    private static final Color C_TEXT_DIM  = hex("#606060"); // texto secundario
    private static final Color C_TEXT_ERR  = hex("#C04040"); // error
    private static final Color C_TEXT_BACK = hex("#8090CC"); // label ⌫
    private static final Color C_TEXT_CLR  = hex("#E06060"); // label C

    // ─────────────────────────────────────────────────────────────
    // Componentes del display
    // ─────────────────────────────────────────────────────────────

    private final JLabel expressionLabel; // línea secundaria (ej: "12 × ")
    private final JLabel displayLabel;    // número principal

    // ─────────────────────────────────────────────────────────────
    // Lógica
    // ─────────────────────────────────────────────────────────────

    private final Calculator calc = new Calculator();

    // ─────────────────────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────────────────────

    public CalculatorUI() {
        // ── Configuración del JFrame ──────────────────────────────
        setTitle("CALC — Java × Swing");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // ── Panel raíz con fondo oscuro ───────────────────────────
        JPanel root = new JPanel(new BorderLayout());
        root.setBackground(C_BG);
        root.setBorder(new EmptyBorder(20, 20, 20, 20));

        // ── Tarjeta de la calculadora ─────────────────────────────
        JPanel card = new JPanel(new BorderLayout(0, 14));
        card.setBackground(C_SURFACE);
        card.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(C_BORDER, 1),
            new EmptyBorder(18, 18, 18, 18)
        ));

        // ── Display ───────────────────────────────────────────────

        // Fuente del display: preferir JetBrains Mono → Courier New → monoespaciada
        Font displayFont = loadMonoFont(42);
        Font exprFont    = loadMonoFont(12);

        expressionLabel = new JLabel("", SwingConstants.RIGHT);
        expressionLabel.setFont(exprFont);
        expressionLabel.setForeground(C_TEXT_DIM);
        expressionLabel.setPreferredSize(new Dimension(0, 20));

        displayLabel = new JLabel("0", SwingConstants.RIGHT);
        displayLabel.setFont(displayFont);
        displayLabel.setForeground(C_DORADO_B);

        JPanel displayWrapper = new JPanel();
        displayWrapper.setLayout(new BoxLayout(displayWrapper, BoxLayout.Y_AXIS));
        displayWrapper.setBackground(C_SURFACE2);
        displayWrapper.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(C_BORDER, 1),
            new EmptyBorder(12, 16, 10, 16)
        ));
        displayWrapper.setPreferredSize(new Dimension(300, 86));

        expressionLabel.setAlignmentX(Component.RIGHT_ALIGNMENT);
        displayLabel.setAlignmentX(Component.RIGHT_ALIGNMENT);

        // Dar al expresión y display todo el ancho disponible
        expressionLabel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 20));
        displayLabel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 50));

        displayWrapper.add(expressionLabel);
        displayWrapper.add(Box.createVerticalGlue());
        displayWrapper.add(displayLabel);

        // ── Teclado ───────────────────────────────────────────────
        JPanel keypad = buildKeypad();

        // ── Badge "JAVA × SWING" ──────────────────────────────────
        JLabel badge = new JLabel("JAVA × SWING", SwingConstants.CENTER);
        badge.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 10));
        badge.setForeground(new Color(200, 152, 48, 120));
        badge.setBorder(new EmptyBorder(0, 0, 6, 0));

        card.add(displayWrapper, BorderLayout.NORTH);
        card.add(keypad, BorderLayout.CENTER);
        card.add(badge, BorderLayout.SOUTH);

        root.add(card, BorderLayout.CENTER);
        setContentPane(root);

        // ── Teclado físico ────────────────────────────────────────
        setupKeyboardListener();

        // ── Finalizar ventana ─────────────────────────────────────
        pack();
        setMinimumSize(getSize());
        setLocationRelativeTo(null); // centrar en pantalla
        setVisible(true);

        // Foco en la ventana para recibir KeyEvents
        requestFocusInWindow();
    }

    // ─────────────────────────────────────────────────────────────
    // Construcción del teclado
    // ─────────────────────────────────────────────────────────────

    /**
     * Layout del grid (4 columnas × 5 filas):
     *
     *   [C]  [⌫]  [×]  [÷]
     *   [7]  [8]  [9]  [-]
     *   [4]  [5]  [6]  [+]
     *   [1]  [2]  [3]  [ ]    ← celda vacía
     *   [0 — span 2] [.] [=]
     */
    private JPanel buildKeypad() {
        // Usamos un panel con GridBagLayout para poder hacer span en el 0 y =
        JPanel keypad = new JPanel(new GridBagLayout());
        keypad.setBackground(C_SURFACE);

        // Fuente de los botones
        Font btnFont = new Font("Barlow", Font.BOLD, 18);
        if (!btnFont.getFamily().equals("Barlow")) {
            // Barlow no disponible — usar SansSerif bold
            btnFont = new Font(Font.SANS_SERIF, Font.BOLD, 18);
        }

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.fill   = GridBagConstraints.BOTH;
        gbc.insets = new Insets(5, 5, 5, 5); // gap de 5px entre botones
        gbc.weightx = 1.0;
        gbc.weighty = 1.0;

        // Altura estándar de cada botón
        final int BTN_H = 58;

        // ── Fila 0: C ⌫ × ÷ ────────────────────────────────────

        RoundedButton btnC = makeBtn("C", btnFont,
            C_BTN_CLR, C_BTN_CLR_H, hex("#1A0808"), C_TEXT_CLR, C_BORDER);
        btnC.setPreferredSize(new Dimension(0, BTN_H));
        btnC.addActionListener(e -> { calc.pressClear(); updateDisplay(); });
        addBtn(keypad, btnC, gbc, 0, 0, 1, 1);

        RoundedButton btnBack = makeBtn("⌫", btnFont,
            C_BTN_BACK, C_BTN_BCK_H, hex("#0E0E1A"), C_TEXT_BACK, C_BORDER);
        btnBack.addActionListener(e -> { calc.pressBackspace(); updateDisplay(); });
        addBtn(keypad, btnBack, gbc, 1, 0, 1, 1);

        RoundedButton btnMul = makeOpBtn("×", btnFont);
        btnMul.addActionListener(e -> { calc.pressOperator("×"); updateDisplay(); });
        addBtn(keypad, btnMul, gbc, 2, 0, 1, 1);

        RoundedButton btnDiv = makeOpBtn("÷", btnFont);
        btnDiv.addActionListener(e -> { calc.pressOperator("÷"); updateDisplay(); });
        addBtn(keypad, btnDiv, gbc, 3, 0, 1, 1);

        // ── Fila 1: 7 8 9 - ────────────────────────────────────

        addDigitBtn(keypad, gbc, btnFont, "7", 0, 1);
        addDigitBtn(keypad, gbc, btnFont, "8", 1, 1);
        addDigitBtn(keypad, gbc, btnFont, "9", 2, 1);

        RoundedButton btnSub = makeOpBtn("−", btnFont);
        btnSub.addActionListener(e -> { calc.pressOperator("-"); updateDisplay(); });
        addBtn(keypad, btnSub, gbc, 3, 1, 1, 1);

        // ── Fila 2: 4 5 6 + ────────────────────────────────────

        addDigitBtn(keypad, gbc, btnFont, "4", 0, 2);
        addDigitBtn(keypad, gbc, btnFont, "5", 1, 2);
        addDigitBtn(keypad, gbc, btnFont, "6", 2, 2);

        RoundedButton btnAdd = makeOpBtn("+", btnFont);
        btnAdd.addActionListener(e -> { calc.pressOperator("+"); updateDisplay(); });
        addBtn(keypad, btnAdd, gbc, 3, 2, 1, 1);

        // ── Fila 3: 1 2 3 (celda vacía) ────────────────────────

        addDigitBtn(keypad, gbc, btnFont, "1", 0, 3);
        addDigitBtn(keypad, gbc, btnFont, "2", 1, 3);
        addDigitBtn(keypad, gbc, btnFont, "3", 2, 3);

        // Celda vacía para cuadrar el grid
        JPanel spacer = new JPanel();
        spacer.setBackground(C_SURFACE);
        addBtn(keypad, spacer, gbc, 3, 3, 1, 1);

        // ── Fila 4: 0 (span 2) . = ─────────────────────────────

        RoundedButton btnZero = makeBtn("0", btnFont,
            C_BTN_NUM, C_BTN_NUM_H, C_BTN_NUM_A, C_TEXT_NUM, C_BORDER);
        // Alinear el label a la izquierda, como en la versión web
        btnZero.setHorizontalAlignment(SwingConstants.LEFT);
        btnZero.setFont(btnFont);
        btnZero.addActionListener(e -> { calc.pressDigit("0"); updateDisplay(); });
        addBtn(keypad, btnZero, gbc, 0, 4, 2, 1); // span 2 columnas

        RoundedButton btnDot = makeBtn(".", btnFont,
            C_BTN_NUM, C_BTN_NUM_H, C_BTN_NUM_A, C_TEXT_NUM, C_BORDER);
        btnDot.addActionListener(e -> { calc.pressDecimal(); updateDisplay(); });
        addBtn(keypad, btnDot, gbc, 2, 4, 1, 1);

        // Botón = con su propio color dorado
        RoundedButton btnEq = makeBtn("=",
            new Font(Font.SANS_SERIF, Font.BOLD, 22),
            C_EQUALS, C_EQUALS_H, C_EQUALS_A,
            hex("#0A0A0A"), C_EQUALS);
        btnEq.addActionListener(e -> { calc.pressEquals(); updateDisplay(); });
        addBtn(keypad, btnEq, gbc, 3, 4, 1, 1);

        return keypad;
    }

    // ─────────────────────────────────────────────────────────────
    // Helpers de construcción de botones
    // ─────────────────────────────────────────────────────────────

    /** Crea un RoundedButton numérico y lo conecta al Calculator. */
    private void addDigitBtn(JPanel panel, GridBagConstraints gbc,
                              Font font, String digit, int col, int row) {
        RoundedButton btn = makeBtn(digit, font,
            C_BTN_NUM, C_BTN_NUM_H, C_BTN_NUM_A, C_TEXT_NUM, C_BORDER);
        btn.addActionListener(e -> { calc.pressDigit(digit); updateDisplay(); });
        addBtn(panel, btn, gbc, col, row, 1, 1);
    }

    /** RoundedButton para operadores (estilo ámbar cálido). */
    private RoundedButton makeOpBtn(String label, Font font) {
        return makeBtn(label, font, C_BTN_OP, C_BTN_OP_H, C_BTN_OP_A,
                       C_TEXT_OP, C_BORDER);
    }

    /** Factory genérico para RoundedButton. */
    private RoundedButton makeBtn(String label, Font font,
                                  Color bg, Color bgH, Color bgA,
                                  Color fg, Color border) {
        RoundedButton btn = new RoundedButton(label, bg, bgH, bgA, fg, border);
        btn.setFont(font);
        btn.setPreferredSize(new Dimension(0, 58));
        return btn;
    }

    /** Agrega un componente al GridBagLayout con las constraints dadas. */
    private void addBtn(JPanel panel, Component comp, GridBagConstraints gbc,
                        int col, int row, int spanX, int spanY) {
        gbc.gridx     = col;
        gbc.gridy     = row;
        gbc.gridwidth = spanX;
        gbc.gridheight = spanY;
        panel.add(comp, gbc);
    }

    // ─────────────────────────────────────────────────────────────
    // Actualizar display
    // ─────────────────────────────────────────────────────────────

    /**
     * Refleja el estado de Calculator en el display.
     * Llamado después de cada acción (botón o tecla).
     */
    private void updateDisplay() {
        String value = calc.getDisplay();
        String expr  = calc.getExpression();
        boolean err  = calc.isError();

        expressionLabel.setText(expr.isEmpty() ? " " : expr);
        displayLabel.setText(value);

        // Color del número: ámbar normal, rojo si hay error
        displayLabel.setForeground(err ? C_TEXT_ERR : C_DORADO_B);

        // Reducir font-size si el número es largo
        int len = value.length();
        int size;
        if      (len > 12) size = 22;
        else if (len > 9)  size = 28;
        else if (len > 6)  size = 34;
        else               size = 42;

        Font base = displayLabel.getFont();
        displayLabel.setFont(base.deriveFont((float) size));
    }

    // ─────────────────────────────────────────────────────────────
    // Soporte de teclado físico
    // ─────────────────────────────────────────────────────────────

    private void setupKeyboardListener() {
        // KeyListener en el JFrame captura teclas cuando la ventana tiene foco
        addKeyListener(new KeyAdapter() {
            @Override
            public void keyPressed(KeyEvent e) {
                int code = e.getKeyCode();
                char ch  = e.getKeyChar();

                if (ch >= '0' && ch <= '9') {
                    calc.pressDigit(String.valueOf(ch));

                } else if (ch == '.') {
                    calc.pressDecimal();

                } else if (ch == '+') {
                    calc.pressOperator("+");

                } else if (ch == '-') {
                    calc.pressOperator("-");

                } else if (ch == '*') {
                    calc.pressOperator("×");

                } else if (ch == '/') {
                    calc.pressOperator("÷");

                } else if (code == KeyEvent.VK_ENTER || ch == '=') {
                    calc.pressEquals();

                } else if (code == KeyEvent.VK_BACK_SPACE) {
                    calc.pressBackspace();

                } else if (code == KeyEvent.VK_ESCAPE
                        || ch == 'c' || ch == 'C') {
                    calc.pressClear();

                } else {
                    return; // tecla no reconocida: no refrescar
                }

                updateDisplay();
            }
        });
    }

    // ─────────────────────────────────────────────────────────────
    // Utilidades
    // ─────────────────────────────────────────────────────────────

    /** Parsea un color hexadecimal CSS a java.awt.Color. */
    private static Color hex(String hex) {
        hex = hex.replace("#", "");
        int r = Integer.parseInt(hex.substring(0, 2), 16);
        int g = Integer.parseInt(hex.substring(2, 4), 16);
        int b = Integer.parseInt(hex.substring(4, 6), 16);
        return new Color(r, g, b);
    }

    /**
     * Intenta cargar una fuente monoespaciada con carácter:
     * JetBrains Mono → Courier New → java monoespaciada por defecto.
     */
    private static Font loadMonoFont(int size) {
        // Chequear si JetBrains Mono está instalada en el sistema
        for (String name : new String[]{"JetBrains Mono", "Courier New",
                                        "Consolas", "Courier", Font.MONOSPACED}) {
            Font f = new Font(name, Font.PLAIN, size);
            // getFamily() retorna el nombre real si el sistema la encontró
            if (!f.getFamily().equals(Font.DIALOG)) {
                return f;
            }
        }
        return new Font(Font.MONOSPACED, Font.PLAIN, size);
    }
}
