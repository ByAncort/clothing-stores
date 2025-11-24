import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "~/service/AuthService";
import { OrderService, type Order } from "~/service/OrderService";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Verificar si está logueado
    if (!AuthService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    // 2. Obtener usuario del token (decodificar básico o guardado en localStorage)
    // Por simplicidad, asumiremos que guardamos el username al login, 
    // si no, lo sacamos del token.
    // *Truco rápido:* Vamos a leer el token y sacar el "sub" (username) si es JWT,
    // o simplemente mostrar "Usuario" si no quieres decodificar ahora.
    const token = AuthService.getToken();
    if(token) {
        // Decodificación básica de JWT (Payload es la parte 2)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const username = payload.sub || "Usuario";
            setUser(username);
            loadOrders(username);
        } catch (e) {
            setUser("Cliente");
            setLoading(false);
        }
    }
  }, []);

  const loadOrders = async (username: string) => {
    try {
      // 3. Cargar historial
      const data = await OrderService.getMyOrders(username);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  if (loading) return <div className="p-10 text-center text-white">Cargando perfil...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-4xl mx-auto">
        
        {/* Encabezado del Perfil */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 flex flex-col md:flex-row justify-between items-center border border-gray-800">
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-wide">Mi Perfil</h1>
            <p className="text-gray-400 mt-2">Bienvenido de vuelta, <span className="text-indigo-400 font-bold">{user}</span></p>
          </div>
          <button 
            onClick={handleLogout}
            className="mt-4 md:mt-0 bg-red-600/20 border border-red-600 text-red-500 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all font-bold text-sm uppercase"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Historial de Pedidos */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase">Historial de Pedidos</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Aún no has realizado compras.</p>
              <button onClick={() => navigate("/")} className="mt-4 text-indigo-600 font-bold hover:underline">
                Ir a la tienda
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-4 rounded-tl-lg"># Orden</th>
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 text-right rounded-tr-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold">#{order.id}</td>
                      <td className="p-4">{new Date(order.fecha).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                          {order.estado}
                        </span>
                      </td>
                      <td className="p-4 text-right font-bold text-black">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}