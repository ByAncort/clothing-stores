import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Interface para la respuesta del login
interface LoginResponse {
  token: string;
  tokenType: string;
  issuedAt: string;
  expiresAt: string;
  username: string;
  roles: Array<{
    id: number;
    name: string;
    permissions: any[];
  }>;
  message: string | null;
  _links: {
    self: { href: string };
    "validate-token": { href: string };
  };
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("⚠️ Debes ingresar tu usuario y contraseña.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9010/api/auth/login', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data: LoginResponse = await response.json();
      
      // Guardar el token en localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify({
        username: data.username,
        roles: data.roles,
        expiresAt: data.expiresAt
      }));

      setLoading(false);
      alert("✅ Inicio de sesión exitoso");
      navigate("/");

    } catch (error: any) {
      setLoading(false);
      setError(error.message || "❌ Error al iniciar sesión. Intenta nuevamente.");
      console.error("Login error:", error);
    }
  };

  // Función para recuperar contraseña
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username) {
      setError("⚠️ Ingresa tu usuario para recuperar la contraseña.");
      return;
    }

    try {
      setLoading(true);
      
      // Simulación de envío de recuperación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`📩 Se envió un enlace de recuperación para el usuario: ${username}`);
      setShowForgot(false);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      setError("❌ Error al enviar el enlace de recuperación.");
    }
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
              Ingresa tu usuario para recibir un enlace de recuperación.
            </p>

            <form onSubmit={handleForgotPassword}>
              <input
                type="text"
                placeholder="Tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-3 p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />

              {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-300 text-white py-2 rounded font-semibold"
              >
                {loading ? "Enviando..." : "Enviar enlace"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setError("");
                }}
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
              Iniciar sesión en tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Usuario
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-100"
                  >
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      ¿Olvidaste tu contraseña?
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
                    placeholder="Ingresa tu contraseña"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 disabled:bg-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {loading ? "Ingresando..." : "Iniciar sesión"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}