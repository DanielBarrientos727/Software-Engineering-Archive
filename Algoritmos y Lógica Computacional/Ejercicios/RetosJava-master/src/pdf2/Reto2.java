package pdf2;

import java.util.Scanner;

public class Reto2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingresa el primer número: ");
        int a = scanner.nextInt();
        System.out.print("Ingresa el segundo número: ");
        int b = scanner.nextInt();
        System.out.print("Ingresa el tercer número: ");
        int c = scanner.nextInt();

        // Forma 1: Con estructura if-else
        int mayorIf;
        if (a >= b && a >= c) {
            mayorIf = a;
        } else if (b >= a && b >= c) {
            mayorIf = b;
        } else {
            mayorIf = c;
        }
        System.out.println("[If-Else] El número mayor es: " + mayorIf);

        // Forma 2: Con operador ternario
        int mayorTernario = (a >= b) ? ((a >= c) ? a : c) : ((b >= c) ? b : c);
        System.out.println("[Ternario] El número mayor es: " + mayorTernario);

        scanner.close();
    }
}