package pdf1;

import java.util.Scanner;

public class Reto2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Ingresa tu año de nacimiento: ");
        int anoNacimiento = scanner.nextInt();

        System.out.print("Ingresa el año actual: ");
        int anoActual = scanner.nextInt();

        int edad = anoActual - anoNacimiento;

        System.out.println("Tienes aproximadamente " + edad + " años.");

        scanner.close();
    }
}