// app/components/Header.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';
import { useCart } from '~/hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const cart = useCart();

  // Debug del carrito
  useEffect(() => {
    console.log('🛒 CARRITO DEBUG - Estado actual:', {
      items: cart?.items || [],
      totalItems: cart?.totalItems || 0,
      totalPrice: cart?.totalPrice || 0,
    });
    (window as any).cartDebug = cart;
  }, [cart]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openCart = () => {
    console.log('🛒 Abriendo carrito, estado:', cart);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCheckout = () => {
    console.log('💰 Abriendo checkout...');
    if (cart.items.length === 0) {
      alert('Tu carrito está vacío. Agrega algunos productos antes de comprar.');
      return;
    }
    setIsCheckoutOpen(true);
    closeCart();
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleBackToCart = () => {
    closeCheckout();
    openCart();
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="py-3 px-4 sm:px-6 lg:px-10 flex items-center fixed top-0 w-full justify-between z-50 bg-black/10 backdrop-blur-sm text-white">
      <nav className="container mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex flex-grow basis-0">
          <Link to="/" onClick={handleLinkClick}>
            <svg 
              version="1.0" 
              xmlns="http://www.w3.org/2000/svg"
              width="330.000000pt" 
              height="153.000000pt" 
              viewBox="0 0 330.000000 153.000000"
              preserveAspectRatio="xMidYMid meet"
              className="h-10 w-24 sm:h-12 sm:w-28 transition-colors duration-500"
            >
              <g 
                transform="translate(0.000000,153.000000) scale(0.100000,-0.100000)"
                fill="#ffffffff" 
                stroke="none"
              >
                <path d="M726 1478 c-44 -99 -196 -555 -222 -664 -14 -60 -39 -159 -56 -221 -30 -109 -32 -112 -57 -108 -281 48 -303 44 -363 -53 -38 -62 -28 -66 155 -58 89 4 172 9 184 12 l22 6 -28 -94 c-38 -125 -57 -236 -44 -249 12 -12 68 112 118 261 l32 95 118 12 c78 9 127 19 144 30 l26 17 -40 8 c-22 4 -82 5 -134 2 l-94 -7 7 29 c4 16 70 155 147 309 148 299 189 401 189 474 0 98 -44 251 -73 251 -4 0 -19 -24 -31 -52z"/>
                <path d="M2688 1487 c-18 -13 -123 -301 -141 -382 -9 -43 -16 -54 -56 -80 -61 -40 -63 -41 -51 -10 5 14 10 40 10 56 0 25 -4 29 -29 29 -27 0 -28 2 -34 56 -6 60 -25 97 -58 115 -20 10 -28 4 -88 -59 -61 -64 -73 -84 -145 -248 -44 -99 -91 -196 -105 -216 -14 -21 -64 -65 -111 -98 -66 -48 -91 -60 -115 -58 -26 3 -30 7 -33 37 -4 37 51 140 138 260 26 36 55 81 64 99 9 17 20 32 25 32 5 0 14 -20 21 -45 24 -87 50 -41 50 90 0 49 -7 75 -35 133 -31 65 -37 72 -64 72 -24 0 -38 -11 -79 -62 -62 -79 -128 -188 -183 -302 -36 -74 -43 -100 -47 -164 -5 -98 21 -154 88 -189 76 -40 110 -30 243 71 l37 28 0 -27 c0 -40 47 -82 103 -90 68 -10 96 0 152 58 41 43 59 74 99 172 27 66 56 126 65 133 81 64 111 81 111 64 0 -33 -37 -157 -73 -247 -19 -50 -38 -107 -42 -127 -6 -34 -5 -39 20 -50 25 -11 37 -7 150 52 l124 65 29 -28 c41 -39 99 -47 146 -19 l34 20 -10 -29 c-13 -37 -5 -57 25 -64 18 -5 58 13 162 71 l138 78 -31 14 c-29 14 -32 13 -94 -27 l-63 -41 -3 54 c-5 92 27 170 178 426 43 72 73 136 80 171 12 53 11 57 -18 115 -33 65 -71 107 -88 96 -17 -11 -37 -56 -80 -179 -21 -62 -41 -113 -45 -113 -4 0 -10 11 -13 25 -11 44 -45 32 -118 -42 -113 -116 -248 -356 -248 -443 0 -20 -9 -32 -37 -48 -21 -12 -53 -31 -71 -43 l-33 -21 6 68 c11 117 33 172 134 344 92 155 131 239 131 282 0 27 -54 129 -82 155 -20 19 -27 21 -40 10z m-318 -381 c0 -2 -15 -13 -34 -24 -19 -11 -50 -44 -70 -74 -42 -62 -45 -59 -12 16 16 35 34 60 53 70 26 14 63 21 63 12z m636 -166 c-10 -45 -26 -106 -37 -135 -23 -63 -97 -150 -135 -159 -33 -9 -64 1 -64 21 0 28 60 129 122 204 33 41 74 93 91 116 17 24 32 41 35 39 2 -3 -3 -41 -12 -86z m-666 41 c0 -32 -11 -51 -30 -51 -29 0 -32 15 -9 44 24 31 39 33 39 7z m-124 -66 c-3 -8 -1 -27 4 -41 9 -24 14 -25 50 -19 51 9 51 0 5 -92 -60 -120 -113 -159 -117 -85 -3 71 2 107 28 180 14 39 28 72 31 72 3 0 3 -7 -1 -15z"/>
                <path d="M415 1311 c7 -25 -4 -51 -22 -51 -26 0 -109 -77 -133 -123 l-24 -44 34 -134 c18 -74 35 -164 38 -200 4 -61 3 -67 -19 -83 -13 -9 -36 -16 -50 -16 -34 0 -89 45 -89 73 0 12 18 47 41 80 36 51 40 62 34 95 -10 54 -30 80 -72 91 -59 17 -63 15 -63 -29 0 -21 -20 -109 -45 -195 -25 -86 -43 -160 -40 -166 8 -12 42 -12 50 1 4 6 16 3 32 -10 59 -46 195 -64 259 -34 46 22 91 75 104 123 9 33 6 52 -16 122 -14 45 -41 117 -60 160 -39 89 -42 132 -13 174 l20 30 -7 -35 c-3 -19 -11 -42 -17 -51 -13 -20 -2 -50 15 -43 7 2 29 28 48 57 19 28 50 71 68 95 31 40 32 46 22 78 -12 35 -40 54 -81 54 -15 0 -19 -5 -14 -19z"/>
                <path d="M1020 1270 c0 -13 -7 -20 -20 -20 -69 0 -313 -350 -335 -479 -9 -54 9 -122 41 -152 36 -34 101 -42 147 -18 l37 19 -2 -43 c-3 -40 -2 -42 27 -45 23 -2 59 13 138 58 58 33 110 60 114 60 5 0 14 -9 20 -20 22 -34 71 -53 125 -47 30 4 46 2 43 -3 -4 -6 -15 -10 -25 -10 -47 0 -132 -109 -176 -226 -26 -69 -32 -173 -15 -247 10 -40 45 -87 66 -87 15 0 96 171 130 275 32 95 36 104 65 172 20 45 25 51 41 42 12 -6 19 -21 19 -40 0 -48 -16 -69 -53 -69 l-32 -1 24 -19 c33 -28 68 -25 102 9 24 24 29 38 29 75 0 38 -6 52 -33 83 l-34 36 69 126 c158 289 178 350 152 459 -17 69 -52 134 -69 129 -5 -2 -21 -25 -34 -52 -30 -62 -145 -367 -177 -465 -26 -85 -64 -130 -110 -133 -28 -2 -29 -1 -27 44 0 28 16 82 37 133 20 47 53 125 73 174 47 112 55 186 23 237 -19 30 -27 36 -52 33 -27 -3 -36 -13 -73 -81 -23 -43 -62 -136 -86 -205 -35 -102 -44 -141 -44 -198 l0 -70 -55 -35 c-30 -19 -58 -35 -62 -37 -14 -6 -9 106 7 151 8 24 40 89 70 145 l56 102 -6 72 c-9 98 -20 124 -71 158 -50 35 -64 37 -64 10z m-55 -332 c-7 -29 -19 -86 -25 -127 -11 -67 -16 -78 -59 -122 -40 -41 -53 -49 -84 -49 -49 0 -54 16 -23 77 20 41 192 273 201 273 2 0 -3 -24 -10 -52z m309 -620 c-30 -95 -54 -178 -54 -186 0 -7 -4 -10 -10 -7 -38 23 52 338 102 358 7 3 14 6 14 6 1 1 -23 -76 -52 -171z"/>
                <path d="M1586 298 c-16 -89 -32 -174 -36 -190 -8 -27 -7 -28 26 -28 33 0 34 1 34 39 0 57 8 71 40 71 35 0 39 -6 41 -64 l2 -46 44 0 c38 0 44 3 39 18 -12 35 -56 298 -56 330 l0 32 -53 0 -53 0 -28 -162z m89 -45 c5 -20 1 -23 -21 -23 l-26 0 7 67 c10 95 18 107 27 38 4 -33 10 -70 13 -82z"/>
                <path d="M1825 271 l0 -191 40 0 40 0 -3 55 c-4 53 -3 55 22 55 14 0 40 13 58 29 32 29 33 32 33 110 0 108 -15 124 -118 129 l-72 4 0 -191z m109 127 c30 -42 14 -168 -21 -168 -10 0 -13 22 -13 95 0 53 4 95 9 95 6 0 17 -10 25 -22z"/>
                <path d="M2065 270 l0 -190 40 0 40 0 -3 55 c-4 52 -3 55 20 55 23 0 66 23 81 44 35 51 28 156 -14 198 -25 25 -35 28 -96 28 l-68 0 0 -190z m110 130 c33 -37 18 -170 -20 -170 -12 0 -15 18 -15 95 0 52 4 95 8 95 5 0 17 -9 27 -20z"/>
                <path d="M2332 431 c-1 -29 -48 -300 -58 -333 -4 -15 1 -18 28 -18 32 0 33 2 35 40 2 58 9 70 42 70 31 0 41 -17 41 -77 0 -32 1 -33 44 -33 44 0 45 0 36 27 -5 16 -21 101 -37 191 l-28 162 -51 0 c-49 0 -51 -1 -52 -29z m63 -138 l7 -63 -27 0 c-23 0 -26 3 -21 23 3 13 8 49 12 82 8 68 17 54 29 -42z"/>
                <path d="M2545 270 l0 -190 40 0 41 0 -4 73 -4 72 21 -21 c14 -13 24 -38 28 -72 l6 -52 38 0 c38 0 38 0 33 33 -10 55 -24 95 -40 107 -12 11 -11 16 10 37 45 45 45 147 -1 183 -20 16 -41 20 -97 20 l-71 0 0 -190z m123 120 c23 -44 -4 -140 -40 -140 -4 0 -8 39 -8 86 0 76 2 85 17 82 10 -2 23 -14 31 -28z"/>
                <path d="M2795 270 l0 -190 83 0 82 0 0 51 0 51 -26 -31 c-14 -17 -34 -31 -45 -31 -17 0 -19 8 -19 75 0 80 7 88 51 65 17 -10 19 -7 19 35 0 46 0 46 -22 31 -39 -28 -48 -21 -48 39 0 51 2 55 23 55 12 0 33 -7 45 -16 21 -15 22 -14 22 20 l0 36 -82 0 -83 0 0 -190z"/>
                <path d="M3008 270 l3 -190 84 0 85 0 0 49 0 49 -29 -29 c-16 -16 -39 -29 -51 -29 -22 0 -22 1 -18 170 l3 170 -40 0 -40 0 3 -190z"/>
              </g>
            </svg>
          </Link>
        </div>

        {/* Menú de navegación principal - Desktop */}
        <nav className="hidden xl:flex">
          <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
            <li><Link to="/catalog/T-Shirts" onClick={handleLinkClick}>T-Shirts</Link></li>
            <li><Link to="/catalog/Shorts" onClick={handleLinkClick}>Shorts</Link></li>
            <li><Link to="/catalog/Hoodies" onClick={handleLinkClick}>Hoodies</Link></li>
            <li><Link to="/catalog/Jackets" onClick={handleLinkClick}>Jackets</Link></li>
            <li><Link to="/catalog/Accessories" onClick={handleLinkClick}>Accessories</Link></li>
            <li><Link to="/contacto" onClick={handleLinkClick}>Contactanos</Link></li>
          </ul>
        </nav>

        {/* Menú de acciones - Desktop */}
        <nav className="hidden xl:flex flex-grow justify-end basis-0">
          <ul className="flex text-sm [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2">
            <li><Link to="/catalog" onClick={handleLinkClick}>Tienda</Link></li>
            <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
            <li>
              <CartIcon onClick={openCart} />
            </li>
          </ul>
        </nav>

        {/* Botón menú hamburguesa - Mobile */}
        <div className="xl:hidden flex items-center gap-4">
          <CartIcon onClick={openCart} />
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-t border-white/20">
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col text-lg [&>li>a]:transition-colors [&>li>a]:duration-500 [&>li>a]:text-current [&>li>a]:font-medium [&>li>a]:inline-block [&>li>a]:px-6 [&>li>a]:py-3 [&>li>a]:w-full">
              <li><Link to="/catalog/T-Shirts" onClick={handleLinkClick}>T-Shirts</Link></li>
              <li><Link to="/catalog/Shorts" onClick={handleLinkClick}>Shorts</Link></li>
              <li><Link to="/catalog/Hoodies" onClick={handleLinkClick}>Hoodies</Link></li>
              <li><Link to="/catalog/Jackets" onClick={handleLinkClick}>Jackets</Link></li>
              <li><Link to="/catalog/Accessories" onClick={handleLinkClick}>Accessories</Link></li>
              <li><Link to="/catalog" onClick={handleLinkClick}>Tienda</Link></li>
              <li><Link to="/contacto" onClick={handleLinkClick}>Contactanos</Link></li>
              <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
            </ul>
          </nav>
        </div>
      )}

      {/* Modales */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={closeCart}
        onCheckout={openCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        onBackToCart={handleBackToCart}
      />
    </header>
  );
};

export default Header;