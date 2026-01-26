import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero({ onCTAClick }) {
  const navigate = useNavigate();

  const handleDoubleClick = (e) => {
    // Prevent navigation if double-clicking buttons or links
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }

    // If already on /test-ride, do nothing
    if (window.location.pathname === '/test-ride') {
      return;
    }
    navigate('/test-ride');
  };

  return (
    <section
      className="relative h-screen flex flex-col overflow-hidden pt-[72px]"
      onDoubleClick={handleDoubleClick}
    >
      {/* HD E-bike background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1920&q=90")',
          objectFit: 'cover'
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main headline - Parent focused */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight tracking-wider uppercase text-white"
            >
              Give Your Child The<br />
              <span className="text-primary">Perfect E-Cycle</span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl">Expert-Guided Home Test Rides</span>
            </motion.h1>

            {/* Subheadline - Value focused for parents */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-5 max-w-3xl mx-auto"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-3">
                Expert Home Visit for Just <span className="text-primary price-heat-glow">₹99</span>
              </p>
              <p className="text-base sm:text-lg text-white/90 mb-2 font-semibold leading-relaxed">
                Test 5 Premium E-Cycles at Your Doorstep • Expert Safety Guidance • Perfect Match Guaranteed
              </p>
              <p className="text-xs sm:text-sm text-white/70">
                Trusted by 10,000+ Bangalore families. Our experts help your child find the safest, most suitable e-cycle for their joy and your peace of mind.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.button
              onClick={onCTAClick}
              whileHover={{ y: -3, boxShadow: "0 25px 50px rgba(220, 38, 38, 0.5)" }}
              whileTap={{ scale: 0.98 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ scale: { duration: 2, repeat: Infinity, repeatDelay: 1 } }}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold text-white bg-primary rounded-full shadow-2xl hover:bg-primary-dark transition-all duration-300 uppercase tracking-wide"
            >
              <span>BOOK EXPERT HOME VISIT - ₹99</span>
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </motion.button>

            {/* Value props */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-dark">TEST 5 E-CYCLES</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="font-semibold text-dark">AT YOUR HOME</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-dark">SAFETY CERTIFIED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { value: "10,000+", label: "HAPPY FAMILIES", sublabel: "Trust BCH" },
            { value: "1M+", label: "SOCIAL FOLLOWING", sublabel: "Instagram + YouTube" },
            { value: "4.7★", label: "GOOGLE RATING", sublabel: "2,500+ Reviews" },
            { value: "₹19,400", label: "E-CYCLES FROM", sublabel: "0% EMI Available" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/95 backdrop-blur-sm border border-white rounded-xl p-3 sm:p-4 text-center hover:bg-white transition-all duration-300 shadow-lg"
            >
              <div className="text-2xl sm:text-3xl font-display text-primary mb-1 tracking-wider font-bold">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-dark font-bold tracking-wide uppercase">{stat.label}</div>
              <div className="text-[9px] sm:text-[10px] text-gray-text font-medium">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
