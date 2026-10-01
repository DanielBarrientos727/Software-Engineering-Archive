# Game of Life — C

El autómata celular de John Conway (1970), en ~300 líneas de C.
Terminal con colores ANSI, input no bloqueante y 5 patrones clásicos.

## Compilar y ejecutar

```bash
gcc -O2 -o life life.c
./life
```

## Controles

| Tecla   | Acción                             |
|---------|------------------------------------|
| `R`     | Tablero aleatorio (30% densidad)   |
| `P` / Espacio | Pausar / reanudar            |
| `N`     | Avanzar un paso (en pausa)         |
| `1`     | Patrón: 4× Glider                  |
| `2`     | Patrón: Pulsar (oscilador período 3)|
| `3`     | Patrón: R-pentomino (caos)         |
| `4`     | Patrón: Acorn (5206 generaciones)  |
| `5`     | Patrón: Gosper Glider Gun          |
| `+`/`-` | Aumentar / bajar velocidad         |
| `Q`     | Salir                              |

## Las 4 reglas de Conway

1. Célula viva con **< 2** vecinos → muere (subpoblación)
2. Célula viva con **2 o 3** vecinos → sobrevive
3. Célula viva con **> 3** vecinos → muere (sobrepoblación)
4. Célula muerta con **exactamente 3** vecinos → nace

Reglas absurdamente simples → comportamiento emergente complejo.
Turing-completo: en teoría, puede computar cualquier función computable.

## Conceptos C usados

- Arrays 2D (`Cell grid[ROWS][COLS]`)
- `termios` — raw mode de terminal (input sin Enter, sin eco)
- `fcntl` — file descriptor no bloqueante (`O_NONBLOCK`)
- `memcpy` / `memset` — operaciones de memoria directa
- `atexit` — cleanup garantizado al salir
- Escape codes ANSI — colores y posicionamiento de cursor
- `usleep` — control de framerate
