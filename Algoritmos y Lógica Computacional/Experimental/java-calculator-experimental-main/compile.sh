#!/bin/bash
# compile.sh — Compila el proyecto con javac puro (sin build tools)
# Uso: ./compile.sh

set -e  # detener si algo falla

echo "── Compilando java-calculator ──"

# Crear carpeta de clases si no existe
mkdir -p out

# Compilar todos los .java de src/
# -d out    : poner los .class en la carpeta out/
# -encoding : evitar problemas con los caracteres Unicode (×, ÷, ⌫, etc.)
javac -encoding UTF-8 -d out src/*.java

echo "✓ Compilación exitosa"
echo "  Ejecutar: ./run.sh"
