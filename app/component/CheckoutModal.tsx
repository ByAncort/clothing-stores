// app/components/CheckoutModal.tsx
import { useState, useEffect } from 'react';
import { useCart } from '~/hooks/useCart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart?: () => void;
}

type PaymentMethod = 'credit-card' | 'debit-card' | 'paypal' | 'cash';

export default function CheckoutModal({ isOpen, onClose, onBackToCart }: CheckoutModalProps) {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsProcessing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isProcessing]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onClose();
    }
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Procesando orden:', {
        customerInfo,
        paymentMethod,
        items,
        total: totalPrice
      });

      setStep(3);
      clearCart();
    } catch (error) {
      console.error('Error procesando la orden:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompleteOrder = () => {
    onClose();
    if (onBackToCart) onBackToCart();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-10 pb-10 px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {step === 1 && 'Información de Envío'}
              {step === 2 && 'Método de Pago'}
              {step === 3 && '¡Orden Completada!'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Paso {step} de 3
            </p>
          </div>
          
          {!isProcessing && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="px-6 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              Información
            </span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              Pago
            </span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              Confirmación
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={handleCustomerInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={handleCustomerInfoChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Método de Pago</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('credit-card')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors text-black ${
                    paymentMethod === 'credit-card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💳</span>
                    <span className="font-medium">Tarjeta de Crédito</span>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('debit-card')}
                  className={`p-4 border-2 rounded-lg text-left transition-colors text-black  ${
                    paymentMethod === 'debit-card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💳</span>
                    <span className="font-medium">Tarjeta de Débito</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Orden Completada!</h3>
              <p className="text-gray-600 mb-4">
                Tu orden ha sido procesada exitosamente.
              </p>
            </div>
          )}
        </div>

        {step < 3 && (
          <div className="border-t p-6 bg-gray-50">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Resumen de Orden</h4>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t p-6 bg-white">
          <div className="flex justify-between items-center">
            {step > 1 && step < 3 ? (
              <button
                onClick={handlePreviousStep}
                disabled={isProcessing}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
              >
                Atrás
              </button>
            ) : (
              <div>
                {step === 1 && onBackToCart && (
                  <button
                    onClick={onBackToCart}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Volver al Carrito
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {step < 2 ? (
                <button
                  onClick={handleNextStep}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continuar al Pago
                </button>
              ) : step === 2 ? (
                <button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    `Pagar $${totalPrice.toFixed(2)}`
                  )}
                </button>
              ) : (
                <button
                  onClick={handleCompleteOrder}
                  className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Continuar Comprando
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}