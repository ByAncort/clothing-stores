import React, { useState } from 'react';
import { useCart } from '~/hooks/useCart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onBackToCart }) => {
  const { items, totalPrice, clearCart } = useCart();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'credit_card' // Valor por defecto
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.address || !formData.email) {
        alert("Por favor completa todos los campos de envío.");
        return;
    }

    // Mensaje de confirmación con el método de pago elegido
    const metodoTexto = {
        'credit_card': 'Tarjeta de Crédito/Débito',
        'transfer': 'Transferencia Bancaria',
        'paypal': 'PayPal'
    }[formData.paymentMethod];

    const mensaje = `¡Pedido Confirmado!\n\nCliente: ${formData.fullName}\nMétodo de Pago: ${metodoTexto}\nTotal: $${totalPrice.toFixed(2)}\n\nTe enviaremos los detalles a ${formData.email}.`;
    
    alert(mensaje);
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Fondo oscuro backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Finalizar Compra</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido (Grid de 2 columnas en escritorio) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* COLUMNA IZQUIERDA: DATOS Y PAGO (Span 7) */}
            <div className="lg:col-span-7 space-y-6">
                <form id="checkout-form" onSubmit={handlePayment} className="space-y-5">
                    
                    {/* Sección Datos Personales */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-3 border-b border-gray-200 pb-2">Datos de Envío</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nombre Completo</label>
                                <input 
                                    type="text" name="fullName" required
                                    value={formData.fullName} onChange={handleInputChange}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2.5 text-gray-900 bg-white"
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Correo Electrónico</label>
                                <input 
                                    type="email" name="email" required
                                    value={formData.email} onChange={handleInputChange}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2.5 text-gray-900 bg-white"
                                    placeholder="juan@ejemplo.com"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Dirección</label>
                                    <input 
                                        type="text" name="address" required
                                        value={formData.address} onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2.5 text-gray-900 bg-white"
                                        placeholder="Av. Principal 123"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Ciudad</label>
                                    <input 
                                        type="text" name="city" required
                                        value={formData.city} onChange={handleInputChange}
                                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-2.5 text-gray-900 bg-white"
                                        placeholder="Santiago"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección Método de Pago */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-3 border-b border-gray-200 pb-2">Método de Pago</h3>
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Selecciona una opción</label>
                            <div className="relative">
                                <select 
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm border p-3 bg-white text-gray-900 appearance-none"
                                >
                                    <option value="credit_card">💳 Tarjeta de Crédito / Débito</option>
                                    <option value="transfer">🏦 Transferencia Bancaria</option>
                                    <option value="paypal">🅿️ PayPal</option>
                                </select>
                                {/* Icono de flecha para el select */}
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>

            {/* COLUMNA DERECHA: RESUMEN (Span 5) */}
            <div className="lg:col-span-5">
                <div className="bg-white p-5 rounded-xl border-2 border-gray-100 shadow-sm sticky top-0">
                    <h3 className="text-base font-bold text-gray-900 mb-4 uppercase">Resumen del Pedido</h3>
                    
                    <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                        <li key={`${item.id}-${item.size}`} className="flex gap-3 text-sm border-b border-gray-50 pb-3 last:border-0">
                             <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                                <img src={item.imagenUrl || (item as any).image} alt="" className="h-full w-full object-cover" />
                             </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="font-medium text-gray-900 truncate">
                                    {item.nombre || (item as any).name}
                                </span>
                                <span className="text-gray-500 text-xs">
                                    Cant: {item.quantity} {item.size ? `| ${item.size}` : ''}
                                </span>
                            </div>
                            <span className="font-bold text-gray-900">
                                ${(Number(item.precio || (item as any).price) * item.quantity).toFixed(2)}
                            </span>
                        </li>
                        ))}
                    </ul>

                    <div className="space-y-2 pt-2 border-t border-dashed border-gray-300">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Envío</span>
                            <span className="text-green-600 font-bold">GRATIS</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-900">
                            <span className="text-base font-bold text-gray-900">Total a Pagar</span>
                            <span className="text-xl font-extrabold text-black">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        form="checkout-form"
                        className="w-full mt-6 rounded-lg bg-black py-3.5 text-center text-sm font-bold text-white shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all uppercase tracking-wide"
                    >
                        Confirmar Pago
                    </button>
                    
                    <button
                        type="button"
                        onClick={onBackToCart}
                        className="w-full mt-3 rounded-lg border border-gray-200 bg-white py-2.5 text-center text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none transition-all"
                    >
                        Volver al Carrito
                    </button>
                </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;