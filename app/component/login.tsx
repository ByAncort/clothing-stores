import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "~/service/AuthService";

export default function Login() {
  // Estado para saber si estamos logueando o registrando
  const [isRegistering, setIsRegistering] = useState(false); // <--- ESTADO CLAVE

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isRegistering) {
        // --- LÓGICA REGISTRO ---
        if (!email.includes("@")) throw new Error("Ingresa un email válido.");
        
        await AuthService.register(username, email, password);
        
        setSuccessMsg("¡Cuenta creada con éxito! Ahora inicia sesión.");
        setIsRegistering(false); // Cambiamos a la vista de login automáticamente
        setPassword(""); 
      } else {
        // --- LÓGICA LOGIN ---
        await AuthService.login(username, password);
        navigate("/"); // Ir al home
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocurrió un error. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-24 pb-24 bg-black">
      {/* Título */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <h2 className="text-center text-3xl font-bold tracking-tight text-white uppercase font-bebas">
          {isRegistering ? "Únete a StayCold" : "Acceso a StayCold"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {isRegistering 
            ? "Crea tu cuenta para acceder a la colección" 
            : "Ingresa tus credenciales para continuar"}
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-gray-900 py-8 px-6 shadow rounded-lg sm:px-10 border border-gray-800">
          
          {/* Mensaje de éxito al registrarse */}
          {successMsg && (
            <div className="mb-4 bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded text-sm text-center">
                {successMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Campo Usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Usuario (Username)
              </label>
              <div className="mt-1">
                <input
                  type="text" required
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ej: usuario123"
                />
              </div>
            </div>

            {/* Campo Email (Solo visible en Registro) */}
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    type="email" required
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>
            )}

            {/* Campo Contraseña */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">Contraseña</label>
              </div>
              <div className="mt-1">
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-700 bg-gray-800 text-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {!isRegistering && (
                  <div className="text-right mt-1">
                      <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                          ¿Olvidaste tu contraseña?
                      </a>
                  </div>
              )}
            </div>

            {/* Mensaje de Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded text-sm text-center">
                {error}
              </div>
            )}

            {/* Botón Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    loading ? 'bg-indigo-800 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {loading ? "Procesando..." : (isRegistering ? "Crear Cuenta" : "Ingresar")}
              </button>
            </div>
          </form>

          {/* --- AQUÍ ESTÁ EL SWITCH DE REGISTRO/LOGIN --- */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-900 px-2 text-gray-400">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={() => {
                        setIsRegistering(!isRegistering);
                        setError("");
                        setSuccessMsg("");
                        setEmail(""); // Limpiamos email al cambiar
                    }}
                    className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                    {isRegistering 
                        ? "¿Ya tienes cuenta? Inicia sesión" 
                        : "¿No tienes cuenta? Regístrate aquí"}
                </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}