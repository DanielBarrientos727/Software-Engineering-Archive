diff --git a/ejercicio3_alcaldia.ts b/ejercicio3_alcaldia.ts
index 94de3583c3ff41e04fcdf4f808f7556401c4ba03..8dee999ea5b048fc2e8d88ed6e390cda482ddc04 100644
--- a/ejercicio3_alcaldia.ts
+++ b/ejercicio3_alcaldia.ts
@@ -1,62 +1,90 @@
-// Salario mínimo
-const SALARIO_MINIMO = 1300000;
+export interface Persona {
+    nombre: string;
+    edad: number;
+}
+
+export interface ResultadoSubsidio {
+    persona: Persona;
+    subsidio: number;
+}
+
+export interface ResumenAlcaldia {
+    resultados: ResultadoSubsidio[];
+    totalPersonas: number;
+    cont60a80: number;
+    cont80mas: number;
+    contNo: number;
+    totalDinero: number;
+}
 
-// Subsidios
-const SUBSIDIO_12 = SALARIO_MINIMO * 0.12;
-const SUBSIDIO_15 = SALARIO_MINIMO * 0.15;
+export const SALARIO_MINIMO = 1300000;
+export const SUBSIDIO_12 = SALARIO_MINIMO * 0.12;
+export const SUBSIDIO_15 = SALARIO_MINIMO * 0.15;
 
-// Datos
 const nombres = ["Carlos Pérez", "María López", "Juan Torres", "Rosa Gómez", "Luis Herrera"];
 const edades = [65, 82, 45, 78, 91];
 
-// Contadores
-let cont60a80 = 0;
-let cont80mas = 0;
-let contNo = 0;
-let totalDinero = 0;
+export const personas: Persona[] = nombres.map((nombre, index) => ({ nombre, edad: edades[index] ?? 0 }));
+
+export function calcularSubsidioPorEdad(edad: number, subsidio12: number, subsidio15: number): number {
+    if (edad >= 60 && edad <= 80) {
+        return subsidio12;
+    }
 
-console.log("=== SUBSIDIOS ===");
+    if (edad > 80) {
+        return subsidio15;
+    }
 
-// Recorrer personas
-for (let i = 0; i < nombres.length; i++) {
+    return 0;
+}
 
-    let nombre = nombres[i];
-    let edad = edades[i];
+export function calcularResumenAlcaldia(listaPersonas: Persona[], subsidio12: number, subsidio15: number): ResumenAlcaldia {
+    const resultados = listaPersonas.map((persona) => ({
+        persona,
+        subsidio: calcularSubsidioPorEdad(persona.edad, subsidio12, subsidio15)
+    }));
 
-    let subsidio = 0;
+    const cont60a80 = resultados.filter((r) => r.persona.edad >= 60 && r.persona.edad <= 80).length;
+    const cont80mas = resultados.filter((r) => r.persona.edad > 80).length;
+    const contNo = resultados.filter((r) => r.subsidio === 0).length;
+    const totalDinero = resultados.reduce((acc, r) => acc + r.subsidio, 0);
 
-    if (edad >= 60 && edad <= 80) {
-        subsidio = SUBSIDIO_12;
-        cont60a80++;
-    } 
-    else if (edad > 80) {
-        subsidio = SUBSIDIO_15;
-        cont80mas++;
-    } 
-    else {
-        contNo++;
-    }
+    return {
+        resultados,
+        totalPersonas: listaPersonas.length,
+        cont60a80,
+        cont80mas,
+        contNo,
+        totalDinero
+    };
+}
 
-    // Solo mostrar si tiene subsidio
-    if (subsidio > 0) {
-        totalDinero = totalDinero + subsidio;
+export function reportarAlcaldia(resumen: ResumenAlcaldia): void {
+    console.log("=== SUBSIDIOS ===");
 
-        console.log("------------------");
-        console.log("Nombre: " + nombre);
-        console.log("Edad: " + edad);
-        console.log("Subsidio: $" + subsidio);
+    for (const resultado of resumen.resultados) {
+        if (resultado.subsidio > 0) {
+            console.log("------------------");
+            console.log("Nombre: " + resultado.persona.nombre);
+            console.log("Edad: " + resultado.persona.edad);
+            console.log("Subsidio: $" + resultado.subsidio);
+        }
     }
-}
 
-// Resumen
-console.log("==================");
-console.log("RESUMEN");
+    console.log("==================");
+    console.log("RESUMEN");
+    console.log("Total personas: " + resumen.totalPersonas);
+    console.log("60 a 80 años: " + resumen.cont60a80);
+    console.log("Más de 80: " + resumen.cont80mas);
+    console.log("No aplican: " + resumen.contNo);
+    console.log("------------------");
+    console.log("Total dinero: $" + resumen.totalDinero);
+    console.log("==================");
+}
 
-console.log("Total personas: " + nombres.length);
-console.log("60 a 80 años: " + cont60a80);
-console.log("Más de 80: " + cont80mas);
-console.log("No aplican: " + contNo);
+export function ejecutarEjercicio3(): void {
+    const resumen = calcularResumenAlcaldia(personas, SUBSIDIO_12, SUBSIDIO_15);
+    reportarAlcaldia(resumen);
+}
 
-console.log("------------------");
-console.log("Total dinero: $" + totalDinero);
-console.log("==================");
\ No newline at end of file
+ejecutarEjercicio3();
