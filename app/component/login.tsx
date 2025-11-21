import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "~/service/AuthService";

export default function Login() {
  // Estados de datos
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Estados de interfaz
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  
  const navigate = useNavigate();

  // Lógica de Login (CONECTADA AL BACKEND REAL)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("⚠️ Debes ingresar tu usuario y contraseña.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("📡 Conectando con MS-Auth...");
      await AuthService.login(username, password);
      
      // Si pasa, es porque el backend respondió con Token
      navigate("/"); // Redirige al home sin alerta molesta
    } catch (err) {
      console.error(err);
      setError("❌ Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showForgot ? (
        // 🔹 VISTA RECUPERAR CONTRASEÑA (Diseño Visual)
        <div className="flex min-h-full mt-24 flex-col justify-center px-6 py-12 lg:px-8 pb-24">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Recuperar contraseña 🔒
            </h3>

            <p className="text-gray-300 text-sm mb-6 text-center">
              Ingresa tu usuario para recibir instrucciones.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`📩 Funcionalidad en construcción (Simulado)`);
                setShowForgot(false);
              }}
            >
              <input
                type="text"
                placeholder="Tu usuario o correo"
                className="w-full mb-4 p-3 rounded bg-white/5 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-semibold transition-colors"
              >
                Enviar solicitud
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full mt-4 text-sm text-indigo-400 hover:text-indigo-300"
              >
                ← Volver al inicio de sesión
              </button>
            </form>
          </div>
        </div>
      ) : (
        // 🔹 VISTA LOGIN (Conectada al Backend)
        <div className="flex min-h-full mt-24 flex-col justify-center px-6 py-12 lg:px-8 pb-24">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
              Acceso a StayCold
            </h2>
            <p className="text-center text-sm text-gray-400 mt-2">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input Usuario */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                  Usuario (Username)
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md bg-white/5 border border-gray-600 px-3 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Ej: admin"
                  />
                </div>
              </div>

              {/* Input Contraseña */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white/5 border border-gray-600 px-3 py-2 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="••••••"
                  />
                </div>
              </div>

              {/* Mensaje de Error */}
              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded text-sm text-center">
                  {error}
                </div>
              )}

              {/* Botón Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all ${
                    loading 
                      ? "bg-indigo-800 cursor-not-allowed" 
                      : "bg-indigo-600 hover:bg-indigo-500"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </span>
                  ) : (
                    "Ingresar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}