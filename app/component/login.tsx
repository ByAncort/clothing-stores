import { useState } from "react"; //guardamos valores temporales
import { useNavigate } from "react-router-dom"; //nos movemos entre las paginas




export default function Login() {

const [email, setEmail] = useState<string>(""); // almacena el correo
const [password, setPassword] = useState<string>("");  // almacena la contraseña
const [error, setError] = useState<string>(""); // muestra errores si faltan datos
const [loading, setLoading] = useState<boolean>(false); // muestra un "cargando" opcional
const navigate = useNavigate(); // permite redirigir a otra página
const [showForgot, setShowForgot] = useState<boolean>(false);


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // evita que se recargue la página

  if (!email || !password) {
    setError("⚠️ Debes ingresar tu correo y contraseña.");
    return;
  }

  if (!email.includes("@")) {
    setError("📧 El correo no es válido.");
    return;
  }

  setError("");
  setLoading(true);

  // simulamos una espera de verificación
  setTimeout(() => {
    setLoading(false);
    alert("✅ Inicio de sesión exitoso (simulado)");
    navigate("/"); // puedes cambiar esta ruta según tu proyecto
  }, 1500);
};
 

  return (
    <>
      {showForgot ? (
        // 🔹 Vista de recuperar contraseña
        <div className="flex min-h-full mt-24 flex-col justify-center px-6 py-12 lg:px-8 pb-24">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Recuperar contraseña 🔒
            </h3>

            <p className="text-gray-300 text-sm mb-4 text-center">
              Ingresa tu correo para recibir un enlace de recuperación.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`📩 Se envió un enlace a ${email}`);
                setShowForgot(false);
              }}
            >
              <input
                type="email"
                placeholder="Tu correo registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded font-semibold"
              >
                Enviar enlace
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(false)} // 👈 vuelve al login
                className="w-full mt-3 text-sm text-indigo-400 hover:text-indigo-300"
              >
                ← Volver al inicio de sesión
              </button>
            </form>
          </div>
        </div>
      ) : (
        // 🔹 Vista normal de login
        <div className="flex min-h-full mt-24 flex-col justify-center px-6 py-12 lg:px-8 pb-24">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center items-center mx-auto h-10 w-auto">
              {/* SVG LOGO */}
            </div>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {loading ? "Ingresando..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

