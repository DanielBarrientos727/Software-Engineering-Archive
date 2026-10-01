@echo off
REM compile.bat — Windows
echo -- Compilando java-calculator --
if not exist out mkdir out
javac -encoding UTF-8 -d out src\*.java
echo Compilacion exitosa. Ejecutar: run.bat
