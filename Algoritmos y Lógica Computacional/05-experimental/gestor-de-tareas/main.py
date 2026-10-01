"""
Gestor de Tareas — To-Do App con interfaz gráfica
Autor: generado con Python 3 + Tkinter
"""

import tkinter as tk
from tkinter import messagebox
import json
import os
import uuid

# ─────────────────────────────────────────────────────────────────────────────
#  Persistencia
# ─────────────────────────────────────────────────────────────────────────────

DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tasks.json")

def load_tasks() -> list:
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                # Compatibilidad: asegurar que cada tarea tenga "priority"
                for t in data:
                    t.setdefault("priority", "Media")
                return data
        except (json.JSONDecodeError, IOError):
            return []
    return []

def save_tasks(tasks: list) -> None:
    try:
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(tasks, f, ensure_ascii=False, indent=2)
    except IOError as e:
        messagebox.showerror("Error al guardar", f"No se pudieron guardar las tareas:\n{e}")


# ─────────────────────────────────────────────────────────────────────────────
#  Paleta de colores
# ─────────────────────────────────────────────────────────────────────────────

BG         = "#16162A"   # fondo principal
SURFACE    = "#1F1F3A"   # paneles
SURFACE2   = "#2A2A4A"   # entradas / filas
BORDER     = "#35356A"   # bordes sutiles
ACCENT     = "#7C3AED"   # violeta — botón principal
ACCENT_H   = "#9161F4"   # hover del acento
SUCCESS    = "#10B981"   # verde — completado
DANGER     = "#EF4444"   # rojo — eliminar
WARNING    = "#F59E0B"   # ámbar — prioridad media
TEXT       = "#E2E8F0"   # texto principal
MUTED      = "#6272A4"   # texto secundario
DONE_BG    = "#1A1A30"   # fondo tarea completada
DONE_FG    = "#4A5A8A"   # texto tarea completada
WHITE      = "#FFFFFF"

PRIORITY_CFG = {
    "Alta":  {"fg": "#EF4444", "icon": "▲"},
    "Media": {"fg": "#F59E0B", "icon": "◆"},
    "Baja":  {"fg": "#10B981", "icon": "▼"},
}
PRIORITY_ORDER = {"Alta": 0, "Media": 1, "Baja": 2}

PLACEHOLDER = "Escribe una nueva tarea..."


# ─────────────────────────────────────────────────────────────────────────────
#  Widget: fila de tarea
# ─────────────────────────────────────────────────────────────────────────────

class TaskRow(tk.Frame):
    """Representa una tarea individual en la lista."""

    def __init__(self, parent, task: dict, on_toggle, on_delete):
        done = task["done"]
        row_bg = DONE_BG if done else SURFACE2
        super().__init__(parent, bg=row_bg)

        self.task = task

        # Barra lateral de color (prioridad)
        bar_color = PRIORITY_CFG[task["priority"]]["fg"]
        tk.Frame(self, bg=bar_color, width=5).pack(side="left", fill="y")

        # ── Contenido central ──
        content = tk.Frame(self, bg=row_bg, padx=14, pady=10)
        content.pack(side="left", fill="both", expand=True)

        icon      = PRIORITY_CFG[task["priority"]]["icon"]
        icon_fg   = PRIORITY_CFG[task["priority"]]["fg"]
        title_txt = ("✓  " + task["title"]) if done else task["title"]
        title_fg  = DONE_FG if done else TEXT
        title_fnt = ("Segoe UI", 11) if done else ("Segoe UI", 11, "bold")

        top_row = tk.Frame(content, bg=row_bg)
        top_row.pack(fill="x")

        # Ícono de prioridad
        tk.Label(top_row, text=icon, fg=icon_fg, bg=row_bg,
                 font=("Segoe UI", 10)).pack(side="left", padx=(0, 8))

        # Título
        tk.Label(top_row, text=title_txt, fg=title_fg, bg=row_bg,
                 font=title_fnt, anchor="w").pack(side="left", fill="x", expand=True)

        # Badge de prioridad
        tk.Label(top_row, text=f" {task['priority']} ",
                 fg=icon_fg, bg=row_bg,
                 font=("Segoe UI", 8, "bold")).pack(side="right")

        # ── Botones de acción ──
        btn_area = tk.Frame(self, bg=row_bg, padx=10)
        btn_area.pack(side="right", fill="y")

        toggle_text  = "↩ Reabrir" if done else "✓ Listo"
        toggle_color = MUTED      if done else SUCCESS

        self._make_btn(btn_area, toggle_text, toggle_color,
                       lambda: on_toggle(self.task["id"])).pack(side="left", padx=(0, 4))

        self._make_btn(btn_area, "✕", DANGER,
                       lambda: on_delete(self.task["id"])).pack(side="left")

        # Separador inferior
        tk.Frame(self, bg=BORDER, height=1).pack(side="bottom", fill="x")

    @staticmethod
    def _make_btn(parent, text, color, command) -> tk.Button:
        return tk.Button(
            parent, text=text, fg=color, bg=SURFACE,
            activebackground=SURFACE2, activeforeground=color,
            font=("Segoe UI", 8, "bold"), relief="flat",
            cursor="hand2", padx=10, pady=5, command=command,
        )


# ─────────────────────────────────────────────────────────────────────────────
#  Aplicación principal
# ─────────────────────────────────────────────────────────────────────────────

class ToDoApp(tk.Tk):

    FILTERS = [("all", "  Todas  "), ("pending", "  Pendientes  "), ("done", "  Completadas  ")]

    def __init__(self):
        super().__init__()
        self.tasks: list        = load_tasks()
        self.filter_mode: str   = "all"
        self._placeholder_on    = True

        self._setup_window()
        self._build_header()
        self._build_input_panel()
        self._build_filter_bar()
        self._build_task_list()
        self._build_status_bar()

        self._refresh_list()

    # ── Configuración de la ventana ──────────────────────────────────────────

    def _setup_window(self):
        self.title("Gestor de Tareas")
        self.geometry("700x640")
        self.minsize(500, 480)
        self.configure(bg=BG)
        self.resizable(True, True)
        # Icono en la barra de tareas (emoji Unicode como icono textual en título)
        self.wm_title("✦ Gestor de Tareas")

    # ── Header ───────────────────────────────────────────────────────────────

    def _build_header(self):
        header = tk.Frame(self, bg=BG)
        header.pack(fill="x", padx=28, pady=(22, 10))

        tk.Label(header, text="✦", fg=ACCENT,
                 bg=BG, font=("Segoe UI", 22, "bold")).pack(side="left")
        tk.Label(header, text="  Gestor de Tareas", fg=TEXT,
                 bg=BG, font=("Segoe UI", 18, "bold")).pack(side="left")

    # ── Panel de entrada ─────────────────────────────────────────────────────

    def _build_input_panel(self):
        panel = tk.Frame(self, bg=SURFACE)
        panel.pack(fill="x", padx=28, pady=(0, 14))

        inner = tk.Frame(panel, bg=SURFACE, padx=18, pady=14)
        inner.pack(fill="x")

        # — Fila de entrada de texto —
        row = tk.Frame(inner, bg=SURFACE)
        row.pack(fill="x")

        self.entry = tk.Entry(
            row, bg=SURFACE2, fg=MUTED,
            insertbackground=TEXT,
            font=("Segoe UI", 11),
            relief="flat", bd=0,
        )
        self.entry.pack(side="left", fill="x", expand=True, ipady=10, ipadx=12)
        self.entry.insert(0, PLACEHOLDER)
        self.entry.bind("<FocusIn>",  self._entry_focus_in)
        self.entry.bind("<FocusOut>", self._entry_focus_out)
        self.entry.bind("<Return>",   lambda _: self._add_task())

        tk.Button(
            row, text="  +  Agregar  ",
            fg=WHITE, bg=ACCENT,
            activebackground=ACCENT_H, activeforeground=WHITE,
            font=("Segoe UI", 10, "bold"),
            relief="flat", cursor="hand2", pady=10,
            command=self._add_task,
        ).pack(side="right", padx=(10, 0))

        # — Fila de prioridades —
        prow = tk.Frame(inner, bg=SURFACE)
        prow.pack(fill="x", pady=(12, 0))

        tk.Label(prow, text="Prioridad:", fg=MUTED, bg=SURFACE,
                 font=("Segoe UI", 9)).pack(side="left", padx=(0, 12))

        self.priority_var = tk.StringVar(value="Media")
        for label, cfg in PRIORITY_CFG.items():
            tk.Radiobutton(
                prow,
                text=f"{cfg['icon']}  {label}",
                variable=self.priority_var,
                value=label,
                fg=cfg["fg"],
                bg=SURFACE,
                selectcolor=SURFACE2,
                activebackground=SURFACE,
                activeforeground=cfg["fg"],
                font=("Segoe UI", 9, "bold"),
                cursor="hand2",
            ).pack(side="left", padx=8)

    def _entry_focus_in(self, _):
        if self._placeholder_on:
            self.entry.delete(0, "end")
            self.entry.config(fg=TEXT)
            self._placeholder_on = False

    def _entry_focus_out(self, _):
        if not self.entry.get().strip():
            self.entry.config(fg=MUTED)
            self.entry.insert(0, PLACEHOLDER)
            self._placeholder_on = True

    # ── Barra de filtros ─────────────────────────────────────────────────────

    def _build_filter_bar(self):
        bar = tk.Frame(self, bg=BG)
        bar.pack(fill="x", padx=28, pady=(0, 10))

        self.filter_btns: dict[str, tk.Button] = {}
        for mode, label in self.FILTERS:
            active = (mode == "all")
            btn = tk.Button(
                bar, text=label,
                fg=WHITE if active else MUTED,
                bg=ACCENT if active else SURFACE,
                activebackground=ACCENT_H, activeforeground=WHITE,
                font=("Segoe UI", 9, "bold"),
                relief="flat", cursor="hand2", pady=7,
                command=lambda m=mode: self._set_filter(m),
            )
            btn.pack(side="left", padx=(0, 6))
            self.filter_btns[mode] = btn

    def _set_filter(self, mode: str):
        self.filter_mode = mode
        for m, btn in self.filter_btns.items():
            btn.config(bg=ACCENT if m == mode else SURFACE,
                       fg=WHITE  if m == mode else MUTED)
        self._refresh_list()

    # ── Lista de tareas (canvas scrollable) ──────────────────────────────────

    def _build_task_list(self):
        outer = tk.Frame(self, bg=BG)
        outer.pack(fill="both", expand=True, padx=28, pady=(0, 0))

        self.canvas = tk.Canvas(outer, bg=BG, highlightthickness=0, bd=0)
        sb = tk.Scrollbar(outer, orient="vertical", command=self.canvas.yview)
        self.canvas.configure(yscrollcommand=sb.set)

        sb.pack(side="right", fill="y")
        self.canvas.pack(side="left", fill="both", expand=True)

        self.list_frame = tk.Frame(self.canvas, bg=BG)
        self._window_id = self.canvas.create_window(
            (0, 0), window=self.list_frame, anchor="nw"
        )

        self.list_frame.bind("<Configure>", self._on_frame_cfg)
        self.canvas.bind("<Configure>", self._on_canvas_cfg)
        self.canvas.bind("<Enter>",  lambda _: self.canvas.bind_all("<MouseWheel>", self._scroll))
        self.canvas.bind("<Leave>",  lambda _: self.canvas.unbind_all("<MouseWheel>"))

    def _on_frame_cfg(self, _):
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def _on_canvas_cfg(self, e):
        self.canvas.itemconfig(self._window_id, width=e.width)

    def _scroll(self, e):
        self.canvas.yview_scroll(int(-1 * (e.delta / 120)), "units")

    # ── Status bar ───────────────────────────────────────────────────────────

    def _build_status_bar(self):
        bar = tk.Frame(self, bg=SURFACE, pady=9)
        bar.pack(fill="x", side="bottom")

        self._status_var = tk.StringVar()
        tk.Label(bar, textvariable=self._status_var, fg=MUTED,
                 bg=SURFACE, font=("Segoe UI", 9)).pack(side="left", padx=24)

    # ── Lógica de tareas ─────────────────────────────────────────────────────

    def _add_task(self):
        title = self.entry.get().strip()

        if self._placeholder_on or not title or title == PLACEHOLDER:
            messagebox.showwarning(
                "Campo vacío",
                "Escribe una tarea antes de agregarla.",
                parent=self,
            )
            self.entry.focus_set()
            return

        self.tasks.append({
            "id":       str(uuid.uuid4()),
            "title":    title,
            "priority": self.priority_var.get(),
            "done":     False,
        })
        save_tasks(self.tasks)

        # Limpiar entrada
        self.entry.delete(0, "end")
        self.entry.config(fg=MUTED)
        self.entry.insert(0, PLACEHOLDER)
        self._placeholder_on = True

        self._refresh_list()

    def _toggle_task(self, task_id: str):
        for t in self.tasks:
            if t["id"] == task_id:
                t["done"] = not t["done"]
                break
        save_tasks(self.tasks)
        self._refresh_list()

    def _delete_task(self, task_id: str):
        self.tasks = [t for t in self.tasks if t["id"] != task_id]
        save_tasks(self.tasks)
        self._refresh_list()

    # ── Renderizado de la lista ───────────────────────────────────────────────

    def _refresh_list(self):
        for w in self.list_frame.winfo_children():
            w.destroy()

        # Filtrar
        match self.filter_mode:
            case "pending": visible = [t for t in self.tasks if not t["done"]]
            case "done":    visible = [t for t in self.tasks if t["done"]]
            case _:         visible = list(self.tasks)

        # Ordenar: pendientes primero, luego por prioridad
        visible.sort(key=lambda t: (t["done"], PRIORITY_ORDER.get(t["priority"], 1)))

        if not visible:
            msgs = {
                "all":     "No hay tareas todavía.\n¡Agrega una arriba! ✨",
                "pending": "¡Sin pendientes!\nBuen trabajo 🎉",
                "done":    "Aún no has completado\nninguna tarea.",
            }
            tk.Label(
                self.list_frame, text=msgs[self.filter_mode],
                fg=MUTED, bg=BG,
                font=("Segoe UI", 12), justify="center",
                pady=50,
            ).pack()
        else:
            for task in visible:
                TaskRow(self.list_frame, task,
                        on_toggle=self._toggle_task,
                        on_delete=self._delete_task
                        ).pack(fill="x", pady=(0, 4))

        # Actualizar barra de estado
        total   = len(self.tasks)
        done    = sum(1 for t in self.tasks if t["done"])
        pending = total - done
        self._status_var.set(
            f"{total} tarea{'s' if total != 1 else ''}  ·  "
            f"{pending} pendiente{'s' if pending != 1 else ''}  ·  "
            f"{done} completada{'s' if done != 1 else ''}"
        )


# ─────────────────────────────────────────────────────────────────────────────
#  Punto de entrada
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    app = ToDoApp()
    app.mainloop()
