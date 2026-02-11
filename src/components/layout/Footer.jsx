import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 px-4 bg-dark border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <img src="/BCHlogo1.png" alt="Bharath Cycle Hub" className="h-10 sm:h-12 mb-4 mx-auto sm:mx-0" />
            <p className="text-gray-text text-sm leading-relaxed">
              First in Bangalore! Get 5 cycles delivered to your home for test ride at just ₹99. Expert guidance, home test rides, and complete confidence.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wide">Contact Us</h4>
            <div className="space-y-3 text-sm text-gray-text">
              <div className="flex items-start gap-2 justify-center sm:justify-start">
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Main Road, Chikka Bommasandra,<br />Yelahanka, Bengaluru, Karnataka 560064</span>
              </div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:support@bharathcyclehub.store" className="hover:text-primary transition-colors">support@bharathcyclehub.store</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wide">Quick Links</h4>
            <div className="space-y-1 text-sm">
              <Link to="/" className="block text-gray-text hover:text-primary transition-colors py-1.5 sm:py-0.5">Home</Link>
              <Link to="/test-ride" className="block text-gray-text hover:text-primary transition-colors py-1.5 sm:py-0.5">Book Test Ride - ₹99 Only</Link>
              <Link to="/privacy-policy" className="block text-gray-text hover:text-primary transition-colors py-1.5 sm:py-0.5">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-text hover:text-primary transition-colors py-1.5 sm:py-0.5">Terms of Service</Link>
              <Link to="/disclaimer" className="block text-gray-text hover:text-primary transition-colors py-1.5 sm:py-0.5">Disclaimer</Link>
            </div>
          </div>

          {/* Google Map */}
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wide">Visit Us</h4>
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/10 h-[200px]">
              <iframe
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Main%20Road,%20Chikka%20Bommasandra,%20Yelahanka,%20Bengaluru,%20Karnataka%20560064&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <p className="text-gray-text text-xs mt-2">Yelahanka, Bengaluru</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.instagram.com/bharathcyclehub?igsh=bGJqNG5qZHRsMmdl"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary active:bg-primary transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@bharathcyclehub?si=rNOy1owyFxN3O_Ap"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary active:bg-primary transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-text text-sm">
            &copy; 2026 Bharath Cycle Hub. All rights reserved.
          </p>
          <p className="text-gray-text/60 text-xs mt-2">
            Premium guidance for confident bicycle decisions
          </p>
        </div>
      </div>
    </footer>
  );
}
