import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContactFormModal from '../ContactFormModal';

export default function Header({ transparent = false, onCTAClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const location = useLocation();

  const isTestRidePage = location.pathname.startsWith('/test-ride');

  // Track scroll position for transparent header
  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  const bgClass = transparent
    ? isScrolled
      ? 'bg-dark/70 backdrop-blur-sm shadow-lg'
      : 'bg-transparent'
    : 'bg-white shadow-md';

  const textClass = transparent
    ? 'text-white'
    : 'text-dark';

  const linkClass = transparent
    ? 'text-white/90 hover:text-white'
    : 'text-gray-text hover:text-dark';

  // Use different logo based on background
  const logoSrc = transparent ? '/logo1.png' : '/BCHwebsitelogo.png';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoSrc}
              alt="Bharath Cycle Hub Logo"
              className="h-12 sm:h-14 w-auto"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className={`font-medium transition-colors px-4 py-2 ${linkClass}`}>
              Home
            </Link>
            <Link to="/test-ride" className={`font-medium transition-colors px-4 py-2 ${linkClass}`}>
              Test Ride
            </Link>
            <a href="#offers" className={`font-medium transition-colors px-4 py-2 ${linkClass}`}>
              Offers
            </a>
            <a href="#why-us" className={`font-medium transition-colors px-4 py-2 ${linkClass}`}>
              Why Us
            </a>

            {/* Contact Button */}
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="flex items-center gap-2 bg-green-600 text-white font-bold px-5 py-2.5 rounded-full hover:bg-green-700 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              CONTACT US
            </button>

            {/* Book Now Button - only on test ride page */}
            {isTestRidePage && onCTAClick && (
              <button
                onClick={onCTAClick}
                className="bg-primary text-white font-bold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-lg"
              >
                BOOK NOW
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="flex items-center gap-1 bg-green-600 text-white font-bold px-4 py-2 rounded-full text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              CONTACT
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${textClass}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col gap-2 pt-4">
              <Link
                to="/"
                className={`font-medium px-4 py-2 rounded-lg ${linkClass} hover:bg-white/10`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/test-ride"
                className={`font-medium px-4 py-2 rounded-lg ${linkClass} hover:bg-white/10`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Test Ride
              </Link>
              <a href="#offers" className={`font-medium px-4 py-2 rounded-lg ${linkClass} hover:bg-white/10`}>
                Offers
              </a>
              <a href="#why-us" className={`font-medium px-4 py-2 rounded-lg ${linkClass} hover:bg-white/10`}>
                Why Us
              </a>
              {isTestRidePage && onCTAClick && (
                <button
                  onClick={() => { onCTAClick(); setMobileMenuOpen(false); }}
                  className="bg-primary text-white font-bold px-6 py-3 rounded-full mt-2"
                >
                  BOOK NOW
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Contact Us"
      />
    </header>
  );
}
