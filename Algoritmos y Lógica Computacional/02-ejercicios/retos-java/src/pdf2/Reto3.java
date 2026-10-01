package pdf2;

import java.util.Scanner;

public class Reto3 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingresa un número del 1 al 10: ");
        int n = scanner.nextInt();

        System.out.println("--- Tabla del " + n + " ---");
        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }

        scanner.close();
    }
}