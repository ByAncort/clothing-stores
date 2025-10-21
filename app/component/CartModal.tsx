interface CartItemProps {
  item: {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    color?: string;
  };
  onRemove: (id: string | number) => void;
  onIncrement: (id: string | number) => void;
  onDecrement: (id: string | number) => void;
}

function CartItem({ item, onRemove, onIncrement, onDecrement }: CartItemProps) {
  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
      {/* Imagen */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />

      {/* Información del producto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>

        {/* Variantes (talla, color) */}
        {(item.size || item.color) && (
          <div className="flex gap-2 mt-1 text-sm text-gray-600">
            {item.size && <span>Talla: {item.size}</span>}
            {item.color && <span>Color: {item.color}</span>}
          </div>
        )}

        {/* Precio + Controles */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </span>

          {/* Controles de cantidad + eliminar */}
          <div className="flex items-center gap-2">
            {/* - */}
            <button
              onClick={() => onDecrement(item.id)}
              className={`w-7 h-7 flex items-center justify-center rounded
                          text-white bg-rose-600 hover:bg-rose-700
                          disabled:bg-rose-300 disabled:cursor-not-allowed`}
              aria-label="Disminuir cantidad"
              disabled={item.quantity <= 1}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>

            <span className="w-8 text-center font-medium">{item.quantity}</span>

            {/* + */}
            <button
              onClick={() => onIncrement(item.id)}
              className={`w-7 h-7 flex items-center justify-center rounded
                          text-white bg-emerald-600 hover:bg-emerald-700`}
              aria-label="Aumentar cantidad"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            {/* Eliminar */}
            <button
              onClick={() => onRemove(item.id)}
              className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Eliminar producto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
