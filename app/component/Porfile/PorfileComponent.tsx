// ProfileComponent.tsx
import React, { useState, useEffect } from "react";
import { type Order } from "~/service/OrderService";
import type { UserProfile, UserUpdateData } from "~/types/user";

interface ProfileComponentProps {
  user: string | null;
  userProfile: UserProfile | null;
  orders: Order[];
  loading: boolean;
  editing: boolean;
  onLogout: () => void;
  onNavigateToStore: () => void;
  onEditToggle: () => void;
  onUpdateUser: (userData: UserUpdateData) => void;
}

export default function ProfileComponent({ 
  user, 
  userProfile,
  orders, 
  loading, 
  editing,
  onLogout, 
  onNavigateToStore,
  onEditToggle,
  onUpdateUser
}: ProfileComponentProps) {
  const [formData, setFormData] = useState<UserUpdateData>({
    username: "",
    direccion: "",
    telefono: ""
  });

  // Actualizar formData cuando userProfile cambie
  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || "",
        direccion: userProfile.direccion || "",
        telefono: userProfile.telefono || ""
      });
    }
  }, [userProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
  };

  const handleCancel = () => {
    // Restaurar los valores originales
    if (userProfile) {
      setFormData({
        username: userProfile.username || "",
        direccion: userProfile.direccion || "",
        telefono: userProfile.telefono || ""
      });
    }
    onEditToggle();
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
          <div className="flex gap-2 mt-4 md:mt-0">
            <button 
              onClick={onEditToggle}
              className="bg-blue-600/20 border border-blue-600 text-blue-400 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all font-bold text-sm uppercase"
            >
              {editing ? 'Cancelar' : 'Editar Perfil'}
            </button>
            <button 
              onClick={onLogout}
              className="bg-red-600/20 border border-red-600 text-red-500 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all font-bold text-sm uppercase"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Información del Usuario */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase">Información Personal</h2>
          
          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Nombre de usuario</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-2">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-bold transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide">Usuario</h3>
                <p className="text-white text-lg font-semibold">{userProfile?.username}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm uppercase tracking-wide">Teléfono</h3>
                <p className="text-white text-lg">{userProfile?.telefono || "No especificado"}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-gray-400 text-sm uppercase tracking-wide">Dirección</h3>
                <p className="text-white text-lg">{userProfile?.direccion || "No especificada"}</p>
              </div>
            </div>
          )}
        </div>

        {/* Historial de Pedidos */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase">Historial de Pedidos</h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Aún no has realizado compras.</p>
              <button onClick={onNavigateToStore} className="mt-4 text-indigo-600 font-bold hover:underline">
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