/*
 * life.c — El Juego de la Vida de Conway
 *
 * Un autómata celular: células en una grilla que nacen, sobreviven
 * o mueren según cuántos vecinos vivos tienen. Reglas simples →
 * comportamiento emergente infinitamente complejo.
 *
 * John Conway (1970): "No diseñé la vida. La encontré."
 *
 * Compilar:  gcc -O2 -o life life.c
 * Ejecutar:  ./life
 *
 * Controles:
 *   Q / Ctrl-C  → salir
 *   R           → aleatorizar el tablero
 *   P / ESPACIO → pausar / reanudar
 *   N           → avanzar un paso (en pausa)
 *   1–5         → cargar un patrón predefinido
 *   +/-         → aumentar/bajar velocidad
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>   /* usleep */
#include <termios.h>  /* raw mode: input sin Enter */
#include <fcntl.h>    /* O_NONBLOCK para lectura no bloqueante */

/* ── Dimensiones del tablero ───────────────────────────────── */
#define COLS  80
#define ROWS  28

/* Una celda: 0 = muerta, 1 = viva */
typedef unsigned char Cell;

/* ── Estado global ─────────────────────────────────────────── */
static Cell grid[ROWS][COLS];   /* tablero actual */
static Cell next[ROWS][COLS];   /* tablero del siguiente tick */

static long generation = 0;     /* contador de generaciones */
static int  paused     = 0;     /* 1 si el juego está pausado */
static int  delay_us   = 80000; /* delay entre frames (microsegundos) */
static int  running    = 1;     /* 0 para salir del loop principal */

/* ── Terminal: guardar configuración original ──────────────── */
static struct termios original_term;

/* ═══════════════════════════════════════════════════════════════
 * TERMINAL — raw mode y colores ANSI
 * ═══════════════════════════════════════════════════════════════ */

/*
 * Activa el "raw mode" de la terminal:
 * - Deshabilita el eco (el input no se imprime)
 * - Deshabilita el modo canónico (input caracter a caracter, sin Enter)
 * - Hace que read() sea no-bloqueante (retorna inmediatamente si no hay input)
 *
 * Esto es lo que usan editores como vim bajo el capó.
 */
static void terminal_raw_mode(void) {
    struct termios raw;
    tcgetattr(STDIN_FILENO, &original_term);  /* guardar configuración original */
    raw = original_term;

    raw.c_lflag &= ~(ECHO | ICANON);  /* sin eco, sin líneas */
    raw.c_cc[VMIN]  = 0;              /* read() retorna aunque no haya input */
    raw.c_cc[VTIME] = 0;              /* sin timeout */

    tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);

    /* Hacer stdin no-bloqueante a nivel fd */
    int flags = fcntl(STDIN_FILENO, F_GETFL, 0);
    fcntl(STDIN_FILENO, F_SETFL, flags | O_NONBLOCK);
}

/* Restaurar terminal al salir (importante: sin esto el shell queda roto) */
static void terminal_restore(void) {
    tcsetattr(STDIN_FILENO, TCSAFLUSH, &original_term);
    /* Mostrar cursor nuevamente */
    printf("\033[?25h");
    /* Limpiar pantalla al salir */
    printf("\033[2J\033[H");
    fflush(stdout);
}

/* Mover cursor a posición (fila, col) — base 1 */
#define CURSOR_GOTO(r, c)  printf("\033[%d;%dH", (r), (c))

/* Colores ANSI */
#define ANSI_RESET      "\033[0m"
#define ANSI_BOLD       "\033[1m"
#define ANSI_DIM        "\033[2m"

/* Colores de celda — ámbar/dorado sobre fondo oscuro */
#define COLOR_ALIVE     "\033[38;2;232;184;64m"   /* #E8B840 — dorado brillante */
#define COLOR_DEAD      "\033[38;2;28;28;28m"     /* #1C1C1C — casi negro */
#define COLOR_UI_TITLE  "\033[38;2;200;152;48m"   /* #C89830 — dorado */
#define COLOR_UI_DIM    "\033[38;2;80;80;80m"     /* #505050 — gris */
#define COLOR_UI_ALERT  "\033[38;2;192;64;64m"    /* #C04040 — rojo */
#define COLOR_UI_KEY    "\033[38;2;160;176;255m"  /* azul claro — teclas */


/* ═══════════════════════════════════════════════════════════════
 * LÓGICA DEL AUTÓMATA CELULAR
 * ═══════════════════════════════════════════════════════════════ */

/* Limpia el tablero (todas las células muertas) */
static void grid_clear(void) {
    memset(grid, 0, sizeof(grid));
    generation = 0;
}

/*
 * Llena el tablero con células vivas al azar.
 * density: porcentaje de células vivas (0–100).
 * Un 30% da tableros interesantes sin colapsar enseguida.
 */
static void grid_randomize(int density) {
    grid_clear();
    for (int r = 0; r < ROWS; r++)
        for (int c = 0; c < COLS; c++)
            grid[r][c] = (rand() % 100 < density) ? 1 : 0;
}

/*
 * Cuenta los vecinos vivos de la célula en (r, c).
 * El tablero es TOROIDAL: los bordes se conectan entre sí
 * (el borde derecho toca el izquierdo, el superior al inferior).
 * Esto evita que los patrones "caigan" por el borde.
 */
static int count_neighbors(int r, int c) {
    int count = 0;
    for (int dr = -1; dr <= 1; dr++) {
        for (int dc = -1; dc <= 1; dc++) {
            if (dr == 0 && dc == 0) continue; /* ignorar la célula misma */

            /* Módulo con ROWS/COLS para el toroide */
            int nr = (r + dr + ROWS) % ROWS;
            int nc = (c + dc + COLS) % COLS;
            count += grid[nr][nc];
        }
    }
    return count;
}

/*
 * Calcula la siguiente generación.
 *
 * Las cuatro reglas de Conway:
 *   1. Célula viva con < 2 vecinos → muere (subpoblación)
 *   2. Célula viva con 2 o 3 vecinos → sobrevive
 *   3. Célula viva con > 3 vecinos → muere (sobrepoblación)
 *   4. Célula muerta con exactamente 3 vecinos → nace
 *
 * Nota: calculamos el estado futuro en 'next' antes de aplicarlo.
 * Si modificáramos 'grid' directamente, las células ya procesadas
 * afectarían el resultado de las siguientes — error clásico de
 * implementación de autómatas celulares.
 */
static void grid_step(void) {
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS; c++) {
            int n = count_neighbors(r, c);
            Cell alive = grid[r][c];

            if (alive) {
                /* Reglas 1, 2, 3 */
                next[r][c] = (n == 2 || n == 3) ? 1 : 0;
            } else {
                /* Regla 4 */
                next[r][c] = (n == 3) ? 1 : 0;
            }
        }
    }

    /* Copiar el tablero siguiente al actual */
    memcpy(grid, next, sizeof(grid));
    generation++;
}


/* ═══════════════════════════════════════════════════════════════
 * PATRONES PREDEFINIDOS
 * Los patrones más famosos del Game of Life.
 * Se centran en el tablero al cargarse.
 * ═══════════════════════════════════════════════════════════════ */

/* Copia un patrón (array de strings) al centro del tablero */
static void load_pattern(const char *rows[], int nrows) {
    grid_clear();
    int start_r = (ROWS - nrows) / 2;

    for (int r = 0; r < nrows; r++) {
        int len = (int)strlen(rows[r]);
        int start_c = (COLS - len) / 2;
        for (int c = 0; c < len; c++) {
            if (rows[r][c] == 'O' || rows[r][c] == '#') {
                int gr = start_r + r;
                int gc = start_c + c;
                if (gr >= 0 && gr < ROWS && gc >= 0 && gc < COLS)
                    grid[gr][gc] = 1;
            }
        }
    }
}

/* 1. Glider — el patrón más famoso. Se mueve en diagonal. */
static void pattern_glider(void) {
    /* Sembrar varios gliders para que sea más visual */
    const char *p[] = {
        ".O.",
        "..O",
        "OOO"
    };
    /* Cuatro gliders en esquinas distintas */
    int offsets[4][2] = {{2,2},{2,60},{18,2},{18,60}};
    grid_clear();
    for (int i = 0; i < 4; i++) {
        int sr = offsets[i][0], sc = offsets[i][1];
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < 3; c++) {
                if (p[r][c] == 'O')
                    grid[(sr+r)%ROWS][(sc+c)%COLS] = 1;
            }
        }
    }
}

/* 2. Pulsar — oscilador de período 3, simétrico y hermoso */
static void pattern_pulsar(void) {
    const char *p[] = {
        "..OOO...OOO..",
        ".............",
        "O....O.O....O",
        "O....O.O....O",
        "O....O.O....O",
        "..OOO...OOO..",
        ".............",
        "..OOO...OOO..",
        "O....O.O....O",
        "O....O.O....O",
        "O....O.O....O",
        ".............",
        "..OOO...OOO..",
    };
    const int n = sizeof(p) / sizeof(p[0]);
    load_pattern(p, n);
}

/* 3. R-pentomino — caos puro. 5 células → 1103 generaciones de actividad */
static void pattern_r_pentomino(void) {
    const char *p[] = {
        ".OO",
        "OO.",
        ".O."
    };
    const int n = sizeof(p) / sizeof(p[0]);
    load_pattern(p, n);
}

/* 4. Acorn — 7 células que tardan 5206 generaciones en estabilizarse */
static void pattern_acorn(void) {
    const char *p[] = {
        ".O.....",
        "...O...",
        "OO..OOO"
    };
    const int n = sizeof(p) / sizeof(p[0]);
    load_pattern(p, n);
}

/* 5. Gosper Glider Gun — produce gliders infinitamente */
static void pattern_glider_gun(void) {
    const char *p[] = {
        "........................O...........",
        "......................O.O...........",
        "............OO......OO............OO",
        "...........O...O....OO............OO",
        "OO........O.....O...OO..............",
        "OO........O...O.OO....O.O...........",
        "..........O.....O.......O...........",
        "...........O...O....................",
        "............OO......................"
    };
    const int n = sizeof(p) / sizeof(p[0]);
    load_pattern(p, n);
}


/* ═══════════════════════════════════════════════════════════════
 * RENDERIZADO
 * ═══════════════════════════════════════════════════════════════ */

/*
 * Dibuja el tablero completo en la terminal.
 * Estrategia: mover cursor a (1,1) y reescribir cada celda.
 * Es mucho más rápido que limpiar la pantalla cada frame
 * (que causa parpadeo visible).
 *
 * Usamos bloques Unicode para una resolución "doble":
 *   '▀' (U+2580) = mitad superior
 * Esto permite mostrar dos filas lógicas por fila de terminal.
 * Aquí lo simplificamos a '█' (bloque completo) para mayor
 * compatibilidad con terminales básicas.
 */
static void render(void) {
    /* Ir al origen sin limpiar pantalla */
    CURSOR_GOTO(1, 1);

    /* ── Barra de título ──────────────────────────────────── */
    printf(COLOR_UI_TITLE ANSI_BOLD
           " GAME OF LIFE  "
           ANSI_RESET COLOR_UI_DIM
           "gen:%-6ld  "
           "%s"
           "vel:%d  ",
           generation,
           paused ? COLOR_UI_ALERT "[ PAUSADO ] " ANSI_RESET COLOR_UI_DIM : "",
           6 - (delay_us / 40000));
    printf(ANSI_RESET "\n");

    /* ── Tablero ──────────────────────────────────────────── */
    for (int r = 0; r < ROWS; r++) {
        printf(" "); /* margen izquierdo */
        for (int c = 0; c < COLS; c++) {
            if (grid[r][c]) {
                printf(COLOR_ALIVE "█" ANSI_RESET);
            } else {
                printf(COLOR_DEAD "·" ANSI_RESET);
            }
        }
        printf("\n");
    }

    /* ── Barra de controles ───────────────────────────────── */
    printf(COLOR_UI_DIM
           " "
           COLOR_UI_KEY "[R]" COLOR_UI_DIM "andom  "
           COLOR_UI_KEY "[P]" COLOR_UI_DIM "ausa  "
           COLOR_UI_KEY "[N]" COLOR_UI_DIM "ext  "
           COLOR_UI_KEY "[1-5]" COLOR_UI_DIM "patrón  "
           COLOR_UI_KEY "[+/-]" COLOR_UI_DIM "vel  "
           COLOR_UI_KEY "[Q]" COLOR_UI_DIM "uit"
           ANSI_RESET "\n");

    fflush(stdout);
}


/* ═══════════════════════════════════════════════════════════════
 * INPUT
 * ═══════════════════════════════════════════════════════════════ */

static void handle_input(void) {
    char c;
    /* read() no bloqueante: retorna -1 si no hay tecla presionada */
    if (read(STDIN_FILENO, &c, 1) != 1) return;

    switch (c) {
        case 'q': case 'Q':
            running = 0;
            break;

        case 'r': case 'R':
            grid_randomize(30);
            break;

        case 'p': case 'P': case ' ':
            paused = !paused;
            break;

        case 'n': case 'N':
            if (paused) grid_step();
            break;

        case '1': pattern_glider();     generation = 0; break;
        case '2': pattern_pulsar();     generation = 0; break;
        case '3': pattern_r_pentomino(); generation = 0; break;
        case '4': pattern_acorn();      generation = 0; break;
        case '5': pattern_glider_gun(); generation = 0; break;

        case '+': case '=':
            /* Bajar delay = más rápido. Mínimo 10ms */
            if (delay_us > 10000) delay_us -= 20000;
            if (delay_us < 10000) delay_us = 10000;
            break;

        case '-':
            /* Subir delay = más lento. Máximo 500ms */
            if (delay_us < 500000) delay_us += 20000;
            break;
    }
}


/* ═══════════════════════════════════════════════════════════════
 * MAIN
 * ═══════════════════════════════════════════════════════════════ */

int main(void) {
    srand((unsigned int)time(NULL));

    /* Ocultar cursor para evitar parpadeo */
    printf("\033[?25l");
    /* Limpiar pantalla */
    printf("\033[2J");

    terminal_raw_mode();
    /* Restaurar terminal al terminar (también en Ctrl-C) */
    atexit(terminal_restore);

    /* Empezar con un tablero aleatorio */
    grid_randomize(30);
    render();

    /* ── Loop principal ──────────────────────────────────────── */
    while (running) {
        handle_input();

        if (!paused) {
            grid_step();
            render();
        }

        usleep(delay_us);
    }

    return 0;
}
