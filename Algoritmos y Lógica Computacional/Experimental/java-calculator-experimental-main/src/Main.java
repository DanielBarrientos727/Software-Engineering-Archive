// Main.java
// Punto de entrada de la aplicación.
//
// SwingUtilities.invokeLater garantiza que la UI se construya
// en el Event Dispatch Thread (EDT) — el hilo que Swing usa
// para toda la interacción gráfica. Crear un JFrame fuera del
// EDT es técnicamente incorrecto y causa bugs raros en algunos
// sistemas operativos.

import javax.swing.*;
import java.awt.*;

public class Main {

    public static void main(String[] args) {

        // ── Configurar Look & Feel antes de crear cualquier ventana ──
        configureLookAndFeel();

        // ── Crear y mostrar la ventana en el hilo correcto ───────────
        SwingUtilities.invokeLater(CalculatorUI::new);
    }

    /**
     * Intenta usar el L&F nativo del SO para que la ventana se vea
     * bien en Windows, macOS y Linux.
     * Si falla (entorno sin escritorio, etc.), Swing usa su propio
     * Metal L&F — que igual funciona correctamente con nuestros
     * colores personalizados.
     *
     * FlatLaf o Nimbus serían alternativas más modernas, pero
     * requieren dependencias externas. Para compilar solo con
     * javac, usamos lo que trae el JDK.
     */
    private static void configureLookAndFeel() {
        // Habilitar anti-aliasing global de fuentes (clave en Linux)
        System.setProperty("awt.useSystemAAFontSettings", "on");
        System.setProperty("swing.aatext", "true");

        // En macOS: usar la barra de menú nativa y el nombre de la app
        System.setProperty("apple.laf.useScreenMenuBar", "true");
        System.setProperty("com.apple.mrj.application.apple.menu.about.name", "CALC");

        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            // Silencioso — Swing usa Metal L&F por defecto si esto falla
        }

        // Forzar fondo oscuro en los JOptionPane (por si acaso)
        UIManager.put("Panel.background",     new Color(0x11, 0x11, 0x11));
        UIManager.put("OptionPane.background", new Color(0x11, 0x11, 0x11));
    }
}
