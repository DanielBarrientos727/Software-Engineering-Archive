const usuarioGuardado = "admin";
const contraseñaGuardada = "132435";

function login(usuario: string, contraseña: string): void {
  if (usuario === "") throw new Error("El usuario no puede estar vacío");
  if (contraseña.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres");
  if (usuario !== usuarioGuardado || contraseña !== contraseñaGuardada) throw new Error("Usuario o contraseña incorrectos");
  console.log("Login exitoso");
}

try { login("admin", "132435"); } catch (e) { console.log((e as Error).message); }
try { login("", "132435"); } catch (e) { console.log((e as Error).message); }
try { login("admin", "13243"); } catch (e) { console.log((e as Error).message); }