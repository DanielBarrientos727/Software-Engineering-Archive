📌 Una breve investigacion sobre los Operadores en JavaScript

JavaScript (lenguaje embebido en el navegador, ya sea firefox o brave) tiene distintos tipos de operadores que nos permiten realizar
asignaciones, comparaciones, operaciones lógicas, manipulación de
cadenas y decisiones condicionales dentro del código. Todos estos
operadores están documentados oficialmente en MDN Web Docs, una fuente
de referencia estándar en desarrollo web.

🔹 1. Operadores de Asignación

Los operadores de asignación permiten guardar o actualizar valores en
variables. El operador básico = asigna el valor de la derecha al
operando de la izquierda.

Operador Significado x = y Asigna el valor de y a x x += y x = x + y x
-= y x = x - y x \*= y x = x \* y x /= y x = x / y x %= y x = x % y x
\*\*= y x = x \*\* y (potencia) Esto es útil para reducir líneas de
código y hacer cálculos sobre la misma variable. 🔹 2. Operadores de
Comparación

Los operadores de comparación comparan valores y devuelven true o false.
En JavaScript, hay operadores que realizan comparaciones con conversión
de tipos y otros estrictos, que respetan también el tipo de dato.

Operador ¿Qué compara? == Igualdad (con conversión de tipos) ===
Igualdad estricta (valor y tipo) != No igual (con conversión) !== No
igual estricto \> Mayor que \< Menor que \>= Mayor o igual \<= Menor o
igual Por ejemplo, \"3\" == 3 devuelve true porque == convierte tipos
antes de comparar, pero \"3\" === 3 devuelve false porque los tipos no
coinciden. 🔹 3. Operadores Lógicos

Los operadores lógicos trabajan con valores booleanos (true/false) y
también pueden devolver otros tipos de valores en JavaScript según si
son truthy o falsy.

Operador Significado && AND lógico \` ! NOT lógico

&& devuelve el primer valor falsy o el último valor si todos son truthy.

\|\| devuelve el primer valor truthy o el último valor si todos son
falsy.

! invierte el valor lógico.

Estos operadores permiten combinar condiciones y controlar el flujo
lógico de un programa.

🔹 4. Operadores de Cadena de Texto

JavaScript permite concatenar cadenas de texto usando el operador +.

Si ambos operandos son cadenas, el operador + une (concatena) las
cadenas:

\"Hola \" + \"mundo\" // → \"Hola mundo\"

El operador += también puede usarse para concatenar y asignar al mismo
tiempo:

let text = \"Hola \"; text += \"JavaScript\"; // → \"Hola JavaScript\"

Estas operaciones son útiles para construir mensajes y textos dinámicos
en programas.

🔹 5. Operador Ternario

El operador ternario es único porque usa 3 operandos y funciona como un
if compacto.

Sintaxis condición ? valorSiTrue : valorSiFalse

Funcionamiento

Si condición es verdadera (true), el operador retorna valorSiTrue.

Si condición es falsa (false), retorna valorSiFalse.

Ejemplo let edad = 18; let status = edad \>= 18 ? \"Mayor\" : \"Menor\";

En este caso, si edad es 18 o más, status recibe \"Mayor\"; de lo
contrario recibe \"Menor\".

📝 Conclusiones

JavaScript ofrece una variedad de operadores para controlar el flujo y
manipular valores en el código:

Asignación permite guardar y actualizar variables.

Comparación permite evaluar relaciones entre valores.

Lógicos permiten combinar condiciones.

Cadenas se unen con + y +=.

Ternario permite decisiones rápidas y concisas.

Estos operadores constituyen la base lógica de cualquier programa en
JavaScript y son esenciales para implementar lógica, condiciones y
transformaciones de datos.

