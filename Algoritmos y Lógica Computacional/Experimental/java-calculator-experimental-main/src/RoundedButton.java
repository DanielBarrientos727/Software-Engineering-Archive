// RoundedButton.java
// Botón personalizado que dibuja esquinas redondeadas, efecto hover
// y efecto de pulsado — Swing por defecto no hace esto.

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.awt.geom.RoundRectangle2D;

public class RoundedButton extends JButton {

    // ─────────────────────────────────────────────────────────────
    // Colores del botón (pasados desde CalculatorUI)
    // ─────────────────────────────────────────────────────────────

    private final Color bgNormal;   // fondo en reposo
    private final Color bgHover;    // fondo al pasar el cursor
    private final Color bgPress;    // fondo al hacer clic
    private final Color fgColor;    // color del texto/label
    private final Color borderColor;

    private static final int RADIUS = 10; // radio de las esquinas

    // Estado de interacción
    private boolean hovered = false;
    private boolean pressed = false;

    // ─────────────────────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────────────────────

    public RoundedButton(String label,
                         Color bgNormal, Color bgHover, Color bgPress,
                         Color fgColor,  Color borderColor) {
        super(label);
        this.bgNormal    = bgNormal;
        this.bgHover     = bgHover;
        this.bgPress     = bgPress;
        this.fgColor     = fgColor;
        this.borderColor = borderColor;

        // Desactivar toda la apariencia nativa de Swing
        setContentAreaFilled(false); // nosotros dibujamos el fondo
        setFocusPainted(false);      // sin rectángulo de foco nativo
        setBorderPainted(false);     // sin borde nativo
        setOpaque(false);            // fondo transparente del JButton base

        setForeground(fgColor);
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

        // ── Listeners de estado hover / press ────────────────────
        addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                hovered = true;
                repaint();
            }

            @Override
            public void mouseExited(MouseEvent e) {
                hovered = false;
                pressed = false;
                repaint();
            }

            @Override
            public void mousePressed(MouseEvent e) {
                pressed = true;
                repaint();
            }

            @Override
            public void mouseReleased(MouseEvent e) {
                pressed = false;
                repaint();
            }
        });

        // Feedback visual al usar teclado (Enter/Space sobre el botón enfocado)
        addFocusListener(new FocusAdapter() {
            @Override public void focusGained(FocusEvent e) { repaint(); }
            @Override public void focusLost(FocusEvent e)   { repaint(); }
        });
    }

    // ─────────────────────────────────────────────────────────────
    // Dibujo personalizado
    // ─────────────────────────────────────────────────────────────

    @Override
    protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();

        // Antialiasing para suavizar los bordes redondeados
        g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                            RenderingHints.VALUE_ANTIALIAS_ON);
        g2.setRenderingHint(RenderingHints.KEY_TEXT_ANTIALIASING,
                            RenderingHints.VALUE_TEXT_ANTIALIAS_LCD_HRGB);

        int w = getWidth();
        int h = getHeight();

        // ── Elegir color de fondo según estado ───────────────────
        Color bg;
        if (pressed)      bg = bgPress;
        else if (hovered) bg = bgHover;
        else              bg = bgNormal;

        // ── Fondo redondeado ─────────────────────────────────────
        g2.setColor(bg);
        g2.fillRoundRect(0, 0, w - 1, h - 1, RADIUS * 2, RADIUS * 2);

        // ── Borde ────────────────────────────────────────────────
        g2.setColor(borderColor);
        g2.setStroke(new BasicStroke(1f));
        g2.drawRoundRect(0, 0, w - 1, h - 1, RADIUS * 2, RADIUS * 2);

        // ── Anillo de foco (accesibilidad) ───────────────────────
        if (isFocusOwner()) {
            g2.setColor(new Color(200, 152, 48, 120)); // dorado semitransparente
            g2.setStroke(new BasicStroke(2f));
            g2.drawRoundRect(2, 2, w - 5, h - 5, RADIUS * 2, RADIUS * 2);
        }

        // ── Escalar font del label si el texto es muy largo ──────
        FontMetrics fm = g2.getFontMetrics(getFont());
        String text = getText();
        int textW = fm.stringWidth(text);
        int textH = fm.getAscent();

        // Centrar texto manualmente
        int x = (w - textW) / 2;
        int y = (h + textH) / 2 - fm.getDescent();

        // Efecto de press: desplazar texto 1px hacia abajo
        if (pressed) y += 1;

        g2.setColor(fgColor);
        g2.setFont(getFont());
        g2.drawString(text, x, y);

        g2.dispose();
    }

    /**
     * El shape del botón es un rectángulo redondeado.
     * Esto hace que los clics fuera de las esquinas no se registren
     * (correcto para botones con radio grande).
     */
    @Override
    public boolean contains(int x, int y) {
        Shape shape = new RoundRectangle2D.Float(
            0, 0, getWidth(), getHeight(), RADIUS * 2, RADIUS * 2
        );
        return shape.contains(x, y);
    }
}
