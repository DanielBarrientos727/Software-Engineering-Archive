import java.util.ArrayList;
import java.util.List;

// ==========================================
// 1. HERENCIA Y POLIMORFISMO (Vehículos)
// ==========================================

// Clase Padre
abstract class Vehiculo {
    protected String placa;

    public Vehiculo(String placa) {
        this.placa = placa;
    }

    // Método abstracto (Polimorfismo: cada hijo lo calculará a su manera)
    public abstract double calcularTarifa(int horas);
}

// Clase Hija 1: Carro
class Carro extends Vehiculo {
    public Carro(String placa) {
        super(placa);
    }

    @Override
    public double calcularTarifa(int horas) {
        return horas * 4000; // El carro paga 4000 la hora
    }
}

// Clase Hija 2: Moto (Corregido el error de escritura de Vehiculo)
class Moto extends Vehiculo {
    public Moto(String placa) {
        super(placa);
    }

    @Override
    public double calcularTarifa(int horas) {
        return horas * 2000; // La moto paga 2000 la hora
    }
}

// ==========================================
// 2. AGREGACIÓN (Usuario tiene Vehículos)
// ==========================================
class Usuario {
    private String nombre;
    private List<Vehiculo> misVehiculos; // Relación de Agregación

    public Usuario(String nombre) {
        this.nombre = nombre;
        this.misVehiculos = new ArrayList<>();
    }

    public void agregarVehiculo(Vehiculo v) {
        misVehiculos.add(v);
    }

    public String getNombre() {
        return nombre;
    }

    public List<Vehiculo> getMisVehiculos() {
        return misVehiculos;
    }
}

// ==========================================
// 3. COMPOSICIÓN (Parqueadero crea y destruye Cupos)
// ==========================================
class Cupo {
    private int numeroCupo;
    private boolean ocupado;

    // Espacio corregido en 'public Cupo'
    public Cupo(int numeroCupo) {
        this.numeroCupo = numeroCupo;
        this.ocupado = false;
    }

    public int getNumeroCupo() {
        return numeroCupo;
    }
}

class ParqueaderoCentrico {
    private String nombreZona; // Variable declarada correctamente
    private List<Cupo> cupos; // Relación de Composición

    public ParqueaderoCentrico(String nombreZona, int cantidadCupos) {
        this.nombreZona = nombreZona;
        this.cupos = new ArrayList<>();
        
        // Creamos los cupos internamente
        for (int i = 1; i <= cantidadCupos; i++) {
            cupos.add(new Cupo(i));
        }
    }

    public void mostrarEstado() {
        System.out.println("Parqueadero en " + nombreZona + " tiene " + cupos.size() + " cupos disponibles.");
    }
}

// ==========================================
// CLASE PRINCIPAL (Sin 'public' para que coincida con el archivo)
// ==========================================
class Main {
    public static void main(String[] args) {
        // 1. Creamos un usuario de Armenia
        Usuario carlos = new Usuario("Carlos Gómez");

        // 2. Creamos vehículos (usando Herencia)
        Vehiculo miCarro = new Carro("XYZ-123");
        Vehiculo miMoto = new Moto("ABC-456");

        // 3. Agregamos los vehículos al usuario (Agregación)
        carlos.agregarVehiculo(miCarro);
        carlos.agregarVehiculo(miMoto);

        // 4. Creamos el parqueadero con sus cupos (Composición)
        ParqueaderoCentrico parqueaderoBolivar = new ParqueaderoCentrico("Plaza de Bolívar", 10);
        parqueaderoBolivar.mostrarEstado();

        // 5. Probamos el Polimorfismo (Calculando tarifas distintas)
        System.out.println("\n--- Calculando Tarifas por 3 horas ---");
        System.out.println("Tarifa Carro (" + miCarro.placa + "): $" + miCarro.calcularTarifa(3));
        System.out.println("Tarifa Moto (" + miMoto.placa + "): $" + miMoto.calcularTarifa(3));
    }
}