diff --git a/ejercicio4_parqueadero.ts b/ejercicio4_parqueadero.ts
index 9554459e4c779707e9465682cb677da695ce8b29..61ceb6d26737bde58003310c6c627d6a472b4616 100644
--- a/ejercicio4_parqueadero.ts
+++ b/ejercicio4_parqueadero.ts
@@ -1,89 +1,109 @@
-// Tipos de vehículo (simple)
-const MOTO = 1;
-const CARRO = 2;
-const CAMIONETA = 3;
+export interface RegistroVehiculo {
+    tipo: number;
+    horas: number;
+}
+
+export interface CobroVehiculo {
+    registro: RegistroVehiculo;
+    nombreTipo: string;
+    tarifa: number;
+    costo: number;
+    descuento: number;
+    total: number;
+}
+
+export interface ResumenParqueadero {
+    cobros: CobroVehiculo[];
+    motos: number;
+    carros: number;
+    camionetas: number;
+    totalDinero: number;
+    promedioHoras: number;
+}
 
-// Tarifas
-const TARIFA_MOTO = 2000;
-const TARIFA_CARRO = 4000;
-const TARIFA_CAMIONETA = 6000;
+export const MOTO = 1;
+export const CARRO = 2;
+export const CAMIONETA = 3;
+
+export const TARIFA_MOTO = 2000;
+export const TARIFA_CARRO = 4000;
+export const TARIFA_CAMIONETA = 6000;
 
-// Datos
 const tipos = [1, 2, 3, 1, 3, 2, 1];
 const horas = [3, 9, 5, 10, 2, 8, 6];
 
-// Contadores
-let motos = 0;
-let carros = 0;
-let camionetas = 0;
-
-let totalDinero = 0;
-let totalHoras = 0;
-
-for (let i = 0; i < tipos.length; i++) {
-
-    let tipo = tipos[i];
-    let tiempo = horas[i];
-
-    let tarifa = 0;
-    let nombre = "";
-
-    // Determinar tipo
-    if (tipo === MOTO) {
-        tarifa = TARIFA_MOTO;
-        nombre = "Moto";
-        motos++;
-    } 
-    else if (tipo === CARRO) {
-        tarifa = TARIFA_CARRO;
-        nombre = "Carro";
-        carros++;
-    } 
-    else if (tipo === CAMIONETA) {
-        tarifa = TARIFA_CAMIONETA;
-        nombre = "Camioneta";
-        camionetas++;
-    } 
-    else {
-        console.log("Tipo inválido");
-        continue;
-    }
+export const registros: RegistroVehiculo[] = tipos.map((tipo, index) => ({ tipo, horas: horas[index] ?? 0 }));
 
-    let costo = tarifa * tiempo;
-    let descuento = 0;
+export function obtenerTarifaYNombre(tipo: number): { tarifa: number; nombreTipo: string } | null {
+    if (tipo === MOTO) return { tarifa: TARIFA_MOTO, nombreTipo: "Moto" };
+    if (tipo === CARRO) return { tarifa: TARIFA_CARRO, nombreTipo: "Carro" };
+    if (tipo === CAMIONETA) return { tarifa: TARIFA_CAMIONETA, nombreTipo: "Camioneta" };
+    return null;
+}
 
-    // Descuento si >= 8 horas
-    if (tiempo >= 8) {
-        descuento = costo * 0.20;
-    }
+export function calcularCobroVehiculo(registro: RegistroVehiculo): CobroVehiculo | null {
+    const tipoInfo = obtenerTarifaYNombre(registro.tipo);
+    if (!tipoInfo) return null;
+
+    const costo = tipoInfo.tarifa * registro.horas;
+    const descuento = registro.horas >= 8 ? costo * 0.2 : 0;
+    const total = costo - descuento;
+
+    return {
+        registro,
+        nombreTipo: tipoInfo.nombreTipo,
+        tarifa: tipoInfo.tarifa,
+        costo,
+        descuento,
+        total
+    };
+}
 
-    let total = costo - descuento;
+export function calcularResumenParqueadero(listaRegistros: RegistroVehiculo[]): ResumenParqueadero {
+    const cobros = listaRegistros
+        .map((registro) => calcularCobroVehiculo(registro))
+        .filter((cobro): cobro is CobroVehiculo => cobro !== null);
 
-    console.log("----------------------");
-    console.log("Vehículo: " + nombre);
-    console.log("Horas: " + tiempo);
-    console.log("Total: $" + total);
+    const motos = cobros.filter((cobro) => cobro.registro.tipo === MOTO).length;
+    const carros = cobros.filter((cobro) => cobro.registro.tipo === CARRO).length;
+    const camionetas = cobros.filter((cobro) => cobro.registro.tipo === CAMIONETA).length;
 
-    totalDinero = totalDinero + total;
-    totalHoras = totalHoras + tiempo;
-}
+    const totalDinero = cobros.reduce((acc, cobro) => acc + cobro.total, 0);
+    const totalHoras = cobros.reduce((acc, cobro) => acc + cobro.registro.horas, 0);
+    const promedioHoras = cobros.length > 0 ? totalHoras / cobros.length : 0;
 
-// Promedio
-let promedio = 0;
-if (tipos.length > 0) {
-    promedio = totalHoras / tipos.length;
+    return { cobros, motos, carros, camionetas, totalDinero, promedioHoras };
 }
 
-// Resumen
-console.log("======================");
-console.log("RESUMEN");
+export function reportarParqueadero(resumen: ResumenParqueadero, listaRegistros: RegistroVehiculo[]): void {
+    for (const registro of listaRegistros) {
+        const cobro = calcularCobroVehiculo(registro);
 
-console.log("Motos: " + motos);
-console.log("Carros: " + carros);
-console.log("Camionetas: " + camionetas);
+        if (!cobro) {
+            console.log("Tipo inválido");
+            continue;
+        }
+
+        console.log("----------------------");
+        console.log("Vehículo: " + cobro.nombreTipo);
+        console.log("Horas: " + registro.horas);
+        console.log("Total: $" + cobro.total);
+    }
 
-console.log("----------------------");
-console.log("Total ganado: $" + totalDinero);
-console.log("Promedio horas: " + promedio);
+    console.log("======================");
+    console.log("RESUMEN");
+    console.log("Motos: " + resumen.motos);
+    console.log("Carros: " + resumen.carros);
+    console.log("Camionetas: " + resumen.camionetas);
+    console.log("----------------------");
+    console.log("Total ganado: $" + resumen.totalDinero);
+    console.log("Promedio horas: " + resumen.promedioHoras);
+    console.log("======================");
+}
+
+export function ejecutarEjercicio4(): void {
+    const resumen = calcularResumenParqueadero(registros);
+    reportarParqueadero(resumen, registros);
+}
 
-console.log("======================");
\ No newline at end of file
+ejecutarEjercicio4();
