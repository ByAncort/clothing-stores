import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "~/service/AuthService";
import { ProductService } from "~/service/ProductService";
import type { Producto } from "~/types/product";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Formulario vacío
  const [newProduct, setNewProduct] = useState({
    nombre: "", marca: "", precio: 0, stock: 10, 
    categoria: "Poleras", imagenUrl: "", descripcion: "", sku: ""
  });

  // 1. PROTECCIÓN: Si no hay login, mandarlo fuera.
  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      alert("Acceso denegado. Debes iniciar sesión.");
      navigate("/login");
    } else {
      loadProducts();
    }
  }, []);

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await ProductService.delete(id);
      setProducts(products.filter((p) => p.id !== id)); // Actualizar visualmente
      alert("Producto eliminado.");
    } catch (error) {
      alert(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ProductService.create(newProduct as any);
      alert("¡Producto creado exitosamente!");
      setNewProduct({ ...newProduct, nombre: "", sku: "", imagenUrl: "" }); // Limpiar
      loadProducts(); // Recargar lista
    } catch (error) {
      alert(error);
    }
  };

  if (loading) return <div className="p-20 text-white text-center">Cargando panel...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-wider">Panel de Control</h1>
          <button onClick={() => navigate("/")} className="text-gray-400 hover:text-white underline">
            ← Volver a la Tienda
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORMULARIO DE CREACIÓN */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 h-fit shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-indigo-400 uppercase">Nuevo Producto</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input 
                type="text" placeholder="Nombre del Producto" required
                className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-indigo-500 outline-none"
                value={newProduct.nombre} onChange={e => setNewProduct({...newProduct, nombre: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Marca" required className="w-full bg-black border border-gray-700 rounded p-3 text-white"
                    value={newProduct.marca} onChange={e => setNewProduct({...newProduct, marca: e.target.value})} />
                  <input type="text" placeholder="SKU" required className="w-full bg-black border border-gray-700 rounded p-3 text-white"
                    value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Precio" required className="w-full bg-black border border-gray-700 rounded p-3 text-white"
                    value={newProduct.precio || ''} onChange={e => setNewProduct({...newProduct, precio: Number(e.target.value)})} />
                  <input type="number" placeholder="Stock" required className="w-full bg-black border border-gray-700 rounded p-3 text-white"
                    value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
              </div>
              <select className="w-full bg-black border border-gray-700 rounded p-3 text-white"
                value={newProduct.categoria} onChange={e => setNewProduct({...newProduct, categoria: e.target.value})}
              >
                <option value="Poleras">Poleras</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Chaquetas">Chaquetas</option>
                <option value="Accesorios">Accesorios</option>
              </select>
              <input type="text" placeholder="URL Imagen (https://...)" required
                className="w-full bg-black border border-gray-700 rounded p-3 text-white"
                value={newProduct.imagenUrl} onChange={e => setNewProduct({...newProduct, imagenUrl: e.target.value})}
              />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded font-bold mt-2 uppercase tracking-wide transition-colors">
                Guardar Producto
              </button>
            </form>
          </div>

          {/* LISTA DE PRODUCTOS */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-indigo-400 uppercase">Inventario ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-black text-gray-200 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Img</th>
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Precio</th>
                    <th className="px-4 py-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-4 py-3">
                        <img src={product.imagenUrl || "https://placehold.co/50"} alt="" className="w-10 h-10 rounded object-cover bg-gray-700"/>
                      </td>
                      <td className="px-4 py-3 font-medium text-white">{product.nombre}</td>
                      <td className="px-4 py-3">{product.sku}</td>
                      <td className="px-4 py-3">${product.precio}</td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="text-red-400 hover:text-red-300 font-bold border border-red-900/50 bg-red-900/10 px-3 py-1 rounded hover:bg-red-900/30 transition-colors"
                        >
                          ELIMINAR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}