# ✦ Gestor de Tareas

Una aplicación de escritorio para gestionar tus tareas diarias, construida con
Python 3 y Tkinter. Interfaz limpia con tema oscuro, prioridades y filtros.

---

## 📁 Estructura del proyecto

```
todo_app/
├── main.py       ← Código fuente principal (todo en un archivo)
├── tasks.json    ← Base de datos local (se crea automáticamente)
└── README.md     ← Este archivo
```

---

## ⚙️ Requisitos

- **Python 3.10 o superior** (por el uso de `match/case`)
- **Tkinter** — viene incluido con Python en Windows y macOS.
  En Linux (Debian/Ubuntu/Fedora):

```bash
# Debian / Ubuntu
sudo apt install python3-tk

# Fedora
sudo dnf install python3-tkinter
```

No se necesitan librerías externas (`pip install ...`). ✅

---

## 🚀 Cómo ejecutarlo

1. Abre una terminal en la carpeta `todo_app/`.
2. Ejecuta:

```bash
python3 main.py
```

En Windows también puedes hacer doble clic en `main.py` si Python está
asociado al tipo de archivo `.py`.

---

## 🧩 Funcionalidades

| Función              | Descripción                                              |
|----------------------|----------------------------------------------------------|
| ➕ Agregar tarea     | Escribe en el campo y pulsa **Agregar** o presiona Enter |
| ✅ Marcar como listo | Botón **✓ Listo** en cada tarea                          |
| ↩ Reabrir           | Botón **↩ Reabrir** en tareas completadas                |
| ✕ Eliminar          | Botón rojo **✕** en cada tarea                           |
| 🎯 Prioridades       | Alta ▲, Media ◆, Baja ▼ — con colores distintos          |
| 🔍 Filtros           | Todas / Pendientes / Completadas                         |
| 💾 Persistencia      | Las tareas se guardan en `tasks.json` automáticamente    |

---

## 🎨 Diseño

- Tema oscuro con paleta violeta/verde/ámbar/rojo
- Barra lateral de color por prioridad en cada tarea
- Indicador visual claro para tareas completadas (ícono ✓ + texto atenuado)
- Lista scrollable para muchas tareas
- Barra de estado con conteo en tiempo real

---

## 🛡️ Manejo de errores

- No se pueden agregar tareas vacías (muestra advertencia)
- Si `tasks.json` está corrupto, la app inicia con lista vacía
- Si no se puede guardar el archivo, muestra un mensaje de error

---

## 📝 Notas técnicas

- **Persistencia**: JSON local en el mismo directorio que `main.py`
- **IDs únicos**: cada tarea tiene un UUID para identificación segura
- **Sin dependencias externas**: solo módulos de la biblioteca estándar
