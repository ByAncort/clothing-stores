import React, { useEffect, useState } from "react";
import { ProviderService, type Provider, type ProviderDto } from "~/service/ProviderService";

export default function ProvidersPanel() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para el formulario de nuevo proveedor
  const [newProvider, setNewProvider] = useState<ProviderDto>({
    nombre: "", rut: "", direccion: "", telefono: "", email: "", web: "", contacto: ""
  });

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setLoading(true);
      const data = await ProviderService.getAllActive();
      setProviders(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los proveedores (¿Backend MS-Proveedores apagado?)");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ProviderService.create(newProvider);
      alert("Proveedor creado exitosamente");
      setNewProvider({ nombre: "", rut: "", direccion: "", telefono: "", email: "", web: "", contacto: "" });
      loadProviders();
    } catch (err) {
      alert("Error al crear proveedor");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar proveedor?")) return;
    try {
      await ProviderService.delete(id);
      loadProviders();
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  if (loading) return <div className="text-white p-4">Cargando proveedores...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">Gestión de Proveedores</h2>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded">{error}</div>}

      {/* FORMULARIO DE CREACIÓN */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="text-lg font-bold text-indigo-400 mb-4">Nuevo Proveedor</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Nombre Empresa" required className="bg-black border border-gray-700 rounded p-2 text-white"
            value={newProvider.nombre} onChange={e => setNewProvider({...newProvider, nombre: e.target.value})} />
          
          <input type="text" placeholder="RUT (12345678-9)" required className="bg-black border border-gray-700 rounded p-2 text-white"
            value={newProvider.rut} onChange={e => setNewProvider({...newProvider, rut: e.target.value})} />
            
          <input type="email" placeholder="Email" required className="bg-black border border-gray-700 rounded p-2 text-white"
            value={newProvider.email} onChange={e => setNewProvider({...newProvider, email: e.target.value})} />
            
          <input type="text" placeholder="Teléfono" className="bg-black border border-gray-700 rounded p-2 text-white"
            value={newProvider.telefono} onChange={e => setNewProvider({...newProvider, telefono: e.target.value})} />
            
          <input type="text" placeholder="Dirección" className="bg-black border border-gray-700 rounded p-2 text-white md:col-span-2"
            value={newProvider.direccion} onChange={e => setNewProvider({...newProvider, direccion: e.target.value})} />
            
          <input type="text" placeholder="Nombre Contacto" className="bg-black border border-gray-700 rounded p-2 text-white"
            value={newProvider.contacto} onChange={e => setNewProvider({...newProvider, contacto: e.target.value})} />
            
          <input type="text" placeholder="Sitio Web" className="bg-black border border-gray-700 rounded p-2 text-white"
            value={newProvider.web} onChange={e => setNewProvider({...newProvider, web: e.target.value})} />

          <button type="submit" className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-bold mt-2">
            Guardar Proveedor
          </button>
        </form>
      </div>

      {/* LISTA DE PROVEEDORES */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black text-gray-200 uppercase">
            <tr>
              <th className="p-3">Empresa</th>
              <th className="p-3">RUT</th>
              <th className="p-3">Email</th>
              <th className="p-3">Contacto</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {providers.map((prov) => (
              <tr key={prov.id} className="hover:bg-gray-800">
                <td className="p-3 font-medium text-white">{prov.nombre}</td>
                <td className="p-3">{prov.rut}</td>
                <td className="p-3">{prov.email}</td>
                <td className="p-3">{prov.contacto}</td>
                <td className="p-3 text-right">
                    <button onClick={() => handleDelete(prov.id)} className="text-red-400 hover:text-red-300 hover:underline">
                        Eliminar
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {providers.length === 0 && !loading && <p className="text-center py-8 text-gray-500">No hay proveedores registrados.</p>}
      </div>
    </div>
  );
}