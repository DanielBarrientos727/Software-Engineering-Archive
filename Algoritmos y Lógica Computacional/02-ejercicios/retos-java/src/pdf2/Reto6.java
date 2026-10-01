package pdf2;

import java.util.Scanner;

public class Reto6 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double saldo = 500.0; // Saldo inicial
        int opcion;

        do {
            System.out.println("\n=== MENÚ DEL CAJERO ===");
            System.out.println("1. Consultar saldo");
            System.out.println("2. Depositar dinero");
            System.out.println("3. Retirar dinero");
            System.out.println("4. Salir");
            System.out.print("Selecciona una opción: ");
            opcion = scanner.nextInt();

            switch (opcion) {
                case 1 -> System.out.printf("Tu saldo actual es: $%.2f%n", saldo);
                case 2 -> {
                    System.out.print("Ingresa el monto a depositar: $");
                    double deposito = scanner.nextDouble();
                    if (deposito > 0) {
                        saldo += deposito; // Asignación compuesta
                        System.out.printf("Depósito exitoso. Nuevo saldo: $%.2f%n", saldo);
                    } else {
                        System.out.println("El monto debe ser mayor a 0.");
                    }
                }
                case 3 -> {
                    System.out.print("Ingresa el monto a retirar: $");
                    double retiro = scanner.nextDouble();
                    if (retiro > saldo) {
                        System.out.println("Error: Fondos insuficientes.");
                    } else if (retiro <= 0) {
                        System.out.println("El monto debe ser mayor a 0.");
                    } else {
                        saldo -= retiro; // Asignación compuesta
                        System.out.printf("Retiro exitoso. Nuevo saldo: $%.2f%n", saldo);
                    }
                }
                case 4 -> System.out.println("¡Gracias por usar nuestros servicios! Hasta pronto.");
                default -> System.out.println("Opción no válida. Intenta de nuevo.");
            }

        } while (opcion != 4);

        scanner.close();
    }
}