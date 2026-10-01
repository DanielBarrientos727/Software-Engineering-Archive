package pdf1;

import java.util.Scanner;

public class Reto4 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingresa la temperatura en grados Celsius: ");
        double celsius = scanner.nextDouble();

        // Usamos 9.0 / 5.0 para evitar la división entera
        double fahrenheit = celsius * (9.0 / 5.0) + 32;

        System.out.println(celsius + " °C equivalen a " + fahrenheit + " °F.");

        scanner.close();
    }
}