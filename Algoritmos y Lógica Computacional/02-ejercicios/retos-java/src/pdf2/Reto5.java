package pdf2;

public class Reto5 {

    public static String clasificarObjeto(Object obj) {
        return switch (obj) {
            case Integer i -> "Es un Entero con valor: " + i;
            case String s  -> "Es un String con texto: \"" + s + "\" (longitud " + s.length() + ")";
            case Double d  -> "Es un Double con valor: " + d;
            case null      -> "El objeto es nulo (null)";
            default        -> "Tipo de dato no clasificado: " + obj.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        System.out.println(clasificarObjeto(42));
        System.out.println(clasificarObjeto("¡Hola Java!"));
        System.out.println(clasificarObjeto(3.1416));
        System.out.println(clasificarObjeto(null));
        System.out.println(clasificarObjeto(true));
    }
}