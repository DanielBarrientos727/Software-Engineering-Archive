# java-calculator — Java × Swing

Calculadora desktop con tema dark terminal y acentos dorados.
Misma lógica y estética que la versión Rust/WASM — ahora con ventana nativa.

---

## Estructura de archivos

```
java-calculator/
├── src/
│   ├── Main.java           # Punto de entrada — configura L&F y lanza la UI
│   ├── Calculator.java     # Lógica pura: máquina de estados aritmética
│   ├── RoundedButton.java  # Componente Swing personalizado con esquinas redondeadas
│   └── CalculatorUI.java   # Ventana principal: display + teclado de botones
├── compile.sh              # Compilar en Linux/macOS
├── run.sh                  # Ejecutar en Linux/macOS
├── compile.bat             # Compilar en Windows
├── run.bat                 # Ejecutar en Windows
└── README.md
```

Después de compilar, se genera la carpeta `out/` con los `.class`.

---

## Requisitos

| Herramienta | Versión mínima |
|-------------|----------------|
| JDK         | 11+            |

Verificar: `java -version` y `javac -version`

---

## Cómo ejecutarlo

### Linux / macOS

```bash
chmod +x compile.sh run.sh
./compile.sh
./run.sh
```

### Windows

```cmd
compile.bat
run.bat
```

### Comando manual (cualquier OS)

```bash
mkdir out
javac -encoding UTF-8 -d out src/*.java
java -cp out Main
```

---

## Soporte de teclado

| Tecla        | Acción                 |
|--------------|------------------------|
| `0`–`9`      | Ingresar dígito        |
| `.`          | Punto decimal          |
| `+` `-` `*`  | Operadores             |
| `/`          | División               |
| `Enter` `=`  | Evaluar                |
| `Backspace`  | Borrar último dígito   |
| `Esc` / `c`  | Limpiar todo           |

---

## Decisiones técnicas

### Sin build tools (javac puro)
Cero dependencias externas. El JDK incluye todo lo necesario para compilar y
ejecutar Swing. Para un proyecto de portafolio de 4 archivos, Maven o Gradle
solo agregarían ruido.

### `Calculator.java` desacoplado de Swing
La lógica aritmética no sabe que existe una ventana. Esto permite:
- Testearla sin levantar GUI
- Portarla a Android, CLI o cualquier otro frontend
- Razonar sobre ella en aislamiento

El patrón es el mismo que en la versión Rust: estado centralizado,
métodos que lo mutan, getters para que la UI lo lea.

### `RoundedButton` como componente personalizado
Swing no tiene botones con esquinas redondeadas por defecto.
`setContentAreaFilled(false)` + `paintComponent()` override nos da
control total: fondo, borde, efecto hover, efecto press, anillo de foco —
todo dibujado con `Graphics2D` + antialiasing.

### `GridBagLayout` para el teclado
`GridLayout` uniform no permite el botón "0" de ancho doble.
`GridBagLayout` con `gridwidth=2` resuelve eso sin HTML ni paneles anidados.

### `SwingUtilities.invokeLater`
Swing no es thread-safe. Crear ventanas fuera del Event Dispatch Thread (EDT)
causa condiciones de carrera raras en Windows y macOS.
`invokeLater` garantiza que toda la UI se construya en el hilo correcto.

### Anti-aliasing explícito
En Linux (especialmente con JDK genérico), el texto Swing puede salir
pixelado si no se fuerza `awt.useSystemAAFontSettings=on`. Se setea
en `Main.java` antes de crear cualquier componente.

---

## Errores manejados

| Caso              | Display              |
|-------------------|----------------------|
| División por cero | `÷ 0 indefinido`     |
| Overflow          | `Overflow`           |
| NaN               | `Error`              |

Después de un error, cualquier operador o `C` reinicia la calculadora.
