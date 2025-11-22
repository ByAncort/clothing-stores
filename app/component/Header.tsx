// app/components/Header.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartIcon from './CartIcon';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';
import { useCart } from '~/hooks/useCart';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cart = useCart();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    if (cart.items.length === 0) {
      alert('Tu carrito está vacío. Agrega algunos productos antes de comprar.');
      return;
    }
    setIsCheckoutOpen(true);
    closeCart();
  };

  const closeCheckout = () => setIsCheckoutOpen(false);
  const handleBackToCart = () => {
    closeCheckout();
    openCart();
  };

  const navLinks = [
    { name: 'T-Shirts', path: '/catalog/T-Shirts' },
    { name: 'Shorts', path: '/catalog/Shorts' },
    { name: 'Hoodies', path: '/catalog/Hoodies' },
    { name: 'Jackets', path: '/catalog/Jackets' },
    { name: 'Accessories', path: '/catalog/Accessories' },
    { name: 'Contactanos', path: '/contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-2' : 'bg-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo className="h-8 w-auto sm:h-10 text-white hover:text-gray-300 transition-colors duration-300" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            <ul className="flex gap-6 text-sm font-medium tracking-wide uppercase">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="relative text-white/80 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="hidden xl:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium uppercase text-white/80 hover:text-white transition-colors">
              Tienda
            </Link>
            <Link to="/login" className="text-sm font-medium uppercase text-white/80 hover:text-white transition-colors">
              Login
            </Link>
            <div className="border-l border-white/20 pl-6">
              <CartIcon onClick={openCart} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-4">
            <CartIcon onClick={openCart} />
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
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
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`xl:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          style={{ top: '0', paddingTop: '80px' }}
        >
          <nav className="container mx-auto px-6 flex flex-col gap-6 h-full overflow-y-auto">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-2xl font-oswald uppercase text-white hover:text-gray-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="border-t border-white/10 pt-4 mt-2">
                <Link
                  to="/catalog"
                  className="text-xl font-oswald uppercase text-white/80 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-xl font-oswald uppercase text-white/80 hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Modals */}
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
    </>
  );
};

export default Header;