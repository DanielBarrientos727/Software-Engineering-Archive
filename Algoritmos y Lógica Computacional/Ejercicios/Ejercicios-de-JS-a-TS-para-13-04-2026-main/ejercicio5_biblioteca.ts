diff --git a/ejercicio5_biblioteca.ts b/ejercicio5_biblioteca.ts
index 81b77f9f76aa9269dcaae8a6ec4e81c5d3f3ffd5..8f1f8756cf71f87b527c51b09a8d08448c1e3e8a 100644
--- a/ejercicio5_biblioteca.ts
+++ b/ejercicio5_biblioteca.ts
@@ -1,86 +1,142 @@
 /**
  * SISTEMA DE GESTIÓN DE MULTAS - BIBLIOTECH
  * Calcula sanciones por préstamos que exceden el límite de 7 días.
  */
 
-// --- CONFIGURACIÓN DE POLÍTICAS ---
-const DIAS_GRACIA: number = 7;
-const MULTA_DIARIA: number = 1500;
-const RECARGO_GRAVE: number = 10000; // Se aplica si el retraso supera los 15 días
-const UMBRAL_RECARGO: number = 15;
-
-// --- BASE DE DATOS ---
-const usuarios: string[] = ["Ana Garcia", "Pedro Ramirez", "Lucia Torres"];
-// Cada sub-arreglo representa los días que el usuario tuvo cada libro
-const prestamosPorUsuario: number[][] = [
-    [5, 10, 20], // Ana
-    [3, 8],      // Pedro
-    [7, 15, 6]   // Lucia
+export interface UsuarioPrestamos {
+    nombre: string;
+    prestamos: number[];
+}
+
+export interface MultaLibro {
+    indiceLibro: number;
+    diasPrestamo: number;
+    diasRetraso: number;
+    multa: number;
+}
+
+export interface ReporteUsuario {
+    nombre: string;
+    multasPorLibro: MultaLibro[];
+    acumuladoUsuario: number;
+    estadoUsuario: string;
+}
+
+export interface ResumenBiblioteca {
+    reportesUsuario: ReporteUsuario[];
+    usuariosAuditados: number;
+    totalLibros: number;
+    devolucionesATiempo: number;
+    devolucionesTarde: number;
+    totalRecaudacion: number;
+}
+
+export const DIAS_GRACIA = 7;
+export const MULTA_DIARIA = 1500;
+export const RECARGO_GRAVE = 10000;
+export const UMBRAL_RECARGO = 15;
+
+const usuarios = ["Ana Garcia", "Pedro Ramirez", "Lucia Torres"];
+const prestamosPorUsuario = [
+    [5, 10, 20],
+    [3, 8],
+    [7, 15, 6]
 ];
 
-// --- ESTADÍSTICAS GLOBALES ---
-let totalMultasRecaudadas: number = 0;
-let contadorLibrosPuntuales: number = 0;
-let contadorLibrosRetrasados: number = 0;
+export const datosUsuarios: UsuarioPrestamos[] = usuarios.map((nombre, i) => ({
+    nombre,
+    prestamos: prestamosPorUsuario[i] ?? []
+}));
 
-/**
- * PROCESAMIENTO PRINCIPAL
- * Recorremos los usuarios y, dentro de cada uno, sus libros prestados.
- */
-for (let i = 0; i < usuarios.length; i++) {
-    const nombre = usuarios[i];
-    const libros = prestamosPorUsuario[i];
-    let acumuladoUsuario: number = 0;
-
-    console.log(`\n--- EXPEDIENTE: ${nombre.toUpperCase()} ---`);
-    console.log(`Libros procesados: ${libros.length}`);
-
-    // Procesamiento individual de libros
-    for (let j = 0; j < libros.length; j++) {
-        const diasPrestamo = libros[j];
-        
-        // Calculamos los días de retraso (mínimo 0)
-        const diasRetraso = Math.max(0, diasPrestamo - DIAS_GRACIA);
-        let multaLibro = 0;
-
-        // Lógica de cálculo de multa
-        if (diasRetraso === 0) {
-            contadorLibrosPuntuales++;
-            console.log(`  Libro ${j + 1}: [PUNTUAL] (${diasPrestamo} días)`);
-        } else {
-            contadorLibrosRetrasados++;
-            
-            // Cálculo base: días de retraso por la multa diaria
-            multaLibro = diasRetraso * MULTA_DIARIA;
-
-            // Si el retraso es grave, se añade la multa adicional
-            if (diasRetraso > UMBRAL_RECARGO) {
-                multaLibro += RECARGO_GRAVE;
+export function calcularMultaLibro(diasPrestamo: number): { diasRetraso: number; multa: number } {
+    const diasRetraso = Math.max(0, diasPrestamo - DIAS_GRACIA);
+    let multa = 0;
+
+    if (diasRetraso > 0) {
+        multa = diasRetraso * MULTA_DIARIA;
+        if (diasRetraso > UMBRAL_RECARGO) {
+            multa += RECARGO_GRAVE;
+        }
+    }
+
+    return { diasRetraso, multa };
+}
+
+export function calcularResumenBiblioteca(usuariosConPrestamos: UsuarioPrestamos[]): ResumenBiblioteca {
+    let devolucionesATiempo = 0;
+    let devolucionesTarde = 0;
+
+    const reportesUsuario = usuariosConPrestamos.map((usuario) => {
+        const multasPorLibro = usuario.prestamos.map((diasPrestamo, indiceLibro) => {
+            const resultado = calcularMultaLibro(diasPrestamo);
+            if (resultado.diasRetraso === 0) {
+                devolucionesATiempo++;
+            } else {
+                devolucionesTarde++;
             }
 
-            console.log(`  Libro ${j + 1}: [RETRASO] ${diasRetraso} días extra - Multa: $${multaLibro.toLocaleString("es-CO")}`);
+            return {
+                indiceLibro,
+                diasPrestamo,
+                diasRetraso: resultado.diasRetraso,
+                multa: resultado.multa
+            };
+        });
+
+        const acumuladoUsuario = multasPorLibro.reduce((acc, item) => acc + item.multa, 0);
+        const estadoUsuario = acumuladoUsuario > 0 ? "⚠️ DEUDOR" : "✅ AL DÍA";
+
+        return {
+            nombre: usuario.nombre,
+            multasPorLibro,
+            acumuladoUsuario,
+            estadoUsuario
+        };
+    });
+
+    const totalRecaudacion = reportesUsuario.reduce((acc, r) => acc + r.acumuladoUsuario, 0);
+
+    return {
+        reportesUsuario,
+        usuariosAuditados: usuariosConPrestamos.length,
+        totalLibros: devolucionesATiempo + devolucionesTarde,
+        devolucionesATiempo,
+        devolucionesTarde,
+        totalRecaudacion
+    };
+}
+
+export function reportarBiblioteca(resumen: ResumenBiblioteca): void {
+    for (const reporteUsuario of resumen.reportesUsuario) {
+        console.log(`\n--- EXPEDIENTE: ${reporteUsuario.nombre.toUpperCase()} ---`);
+        console.log(`Libros procesados: ${reporteUsuario.multasPorLibro.length}`);
+
+        for (const detalle of reporteUsuario.multasPorLibro) {
+            if (detalle.diasRetraso === 0) {
+                console.log(`  Libro ${detalle.indiceLibro + 1}: [PUNTUAL] (${detalle.diasPrestamo} días)`);
+            } else {
+                console.log(`  Libro ${detalle.indiceLibro + 1}: [RETRASO] ${detalle.diasRetraso} días extra - Multa: $${detalle.multa.toLocaleString("es-CO")}`);
+            }
         }
 
-        acumuladoUsuario += multaLibro;
+        console.log(`SUBTOTAL USUARIO: $${reporteUsuario.acumuladoUsuario.toLocaleString("es-CO")} - ${reporteUsuario.estadoUsuario}`);
     }
 
-    // Clasificación del usuario según su comportamiento
-    const estadoUsuario = acumuladoUsuario > 0 ? "⚠️ DEUDOR" : "✅ AL DÍA";
-    console.log(`SUBTOTAL USUARIO: $${acumuladoUsuario.toLocaleString("es-CO")} - ${estadoUsuario}`);
+    console.log("\n" + "=".repeat(45));
+    console.log("          RESUMEN EJECUTIVO BIBLIOTECH");
+    console.log("=".repeat(45));
+    console.log(`Usuarios auditados:    ${resumen.usuariosAuditados}`);
+    console.log(`Total libros:          ${resumen.totalLibros}`);
+    console.log(`Devoluciones a tiempo: ${resumen.devolucionesATiempo}`);
+    console.log(`Devoluciones tarde:    ${resumen.devolucionesTarde}`);
+    console.log("-".repeat(45));
+    console.log(`TOTAL RECAUDACIÓN:     $${resumen.totalRecaudacion.toLocaleString("es-CO")}`);
+    console.log("=".repeat(45));
+}
 
-    totalMultasRecaudadas += acumuladoUsuario;
+export function ejecutarEjercicio5(): void {
+    const resumen = calcularResumenBiblioteca(datosUsuarios);
+    reportarBiblioteca(resumen);
 }
 
-/**
- * REPORTE GERENCIAL FINAL
- */
-console.log("\n" + "=".repeat(45));
-console.log("          RESUMEN EJECUTIVO BIBLIOTECH");
-console.log("=".repeat(45));
-console.log(`Usuarios auditados:    ${usuarios.length}`);
-console.log(`Total libros:          ${contadorLibrosPuntuales + contadorLibrosRetrasados}`);
-console.log(`Devoluciones a tiempo: ${contadorLibrosPuntuales}`);
-console.log(`Devoluciones tarde:    ${contadorLibrosRetrasados}`);
-console.log("-".repeat(45));
-console.log(`TOTAL RECAUDACIÓN:     $${totalMultasRecaudadas.toLocaleString("es-CO")}`);
-console.log("=".repeat(45));
\ No newline at end of file
+ejecutarEjercicio5();

