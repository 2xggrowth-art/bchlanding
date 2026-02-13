import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const categoryData = [
  {
    name: 'Kids',
    slug: 'kids',
    tagline: 'Ages 3–12',
    description: 'Safe, colourful cycles with training wheels & sturdy frames',
    image: '/kids.jpg',
  },
  {
    name: 'Geared',
    slug: 'geared',
    tagline: '21–27 Speed',
    description: 'Multi-speed bicycles for versatile riding on any terrain',
    image: '/geared.jpg',
  },
  {
    name: 'MTB',
    slug: 'mountain',
    tagline: 'Trail Ready',
    description: 'Rugged MTBs with suspension, disc brakes & aggressive tread',
    image: '/MTB.jpg',
  },
  {
    name: 'City',
    slug: 'city',
    tagline: 'Daily Commute',
    description: 'Comfortable everyday bicycles for urban commutes & leisure',
    image: '/city.jpg',
  },
  {
    name: 'E-Bikes',
    slug: 'electric',
    tagline: 'Power Assist',
    description: 'Pedal-assist & throttle e-bikes with long-range batteries',
    image: '/ecyle.jpg',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    tagline: 'Gear & Safety',
    description: 'Essential biking gear, safety equipment & performance upgrades',
    image: '/cycling-accessories.jpg',
  },
];

export default function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleClick = (index) => {
    if (!isMobile) return;
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-8 sm:py-12 bg-gray-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-4">
            Browse by Category
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-dark mb-5 tracking-wider uppercase">
            Find Your Perfect Ride
          </h2>
          <p className="text-gray-text/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-light hidden sm:block">
            Explore our curated collection across 6 categories — hover to discover
          </p>
        </div>

        {/* Category Strips */}
        <div className="flex h-[420px] sm:h-[520px] md:h-[560px] gap-1.5 sm:gap-3 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          {categoryData.map((cat, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={cat.slug}
                className="relative overflow-hidden cursor-pointer group transition-[flex] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                style={{ flex: isActive ? 4 : 1 }}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onClick={() => handleClick(index)}
              >
                {/* Background Image — lazy loaded */}
                <div className="absolute inset-0">
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10 z-[1]" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-[1]" />

                {/* Collapsed State - Vertical Label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
                    >
                      <span
                        className="text-white font-display text-sm sm:text-lg md:text-xl tracking-[0.2em] uppercase whitespace-nowrap"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                        }}
                      >
                        {cat.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed bottom accent */}
                {!isActive && (
                  <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 text-center">
                    <div className="w-5 sm:w-6 h-0.5 rounded-full mx-auto bg-primary" />
                  </div>
                )}

                {/* Expanded State - Full Info */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-8 md:p-10"
                    >
                      <motion.p
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium mb-1.5 sm:mb-3"
                      >
                        {cat.tagline}
                      </motion.p>

                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="font-display text-2xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase mb-1.5 sm:mb-3"
                      >
                        {cat.name}
                      </motion.h3>

                      <motion.p
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.25 }}
                        className="text-white/60 text-[11px] sm:text-sm max-w-xs leading-snug sm:leading-relaxed font-light mb-3 sm:mb-6"
                      >
                        {cat.description}
                      </motion.p>

                      <motion.div
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <Link
                          to={`/products?category=${cat.slug}`}
                          className="group/btn inline-flex items-center gap-2 bg-white text-dark px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-sm font-semibold tracking-wide hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Explore
                          <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
