import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  flex: isActive ? 4 : 1,
                  transition: 'flex 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  willChange: 'flex',
                }}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onMouseLeave={() => !isMobile && setActiveIndex(null)}
                onClick={() => handleClick(index)}
              >
                {/* Background Image — native lazy loading, no JS overhead */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10 z-[1]" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 z-[1]" />

                {/* Collapsed State - Vertical Label */}
                <div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: isActive ? 'none' : 'auto',
                  }}
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
                </div>

                {/* Collapsed bottom accent */}
                <div
                  className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-10 text-center"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div className="w-5 sm:w-6 h-0.5 rounded-full mx-auto bg-primary" />
                </div>

                {/* Expanded State - Full Info (always mounted, CSS-only show/hide) */}
                <div
                  className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-8 md:p-10"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.35s ease 0.1s',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <p
                    className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium mb-1.5 sm:mb-3"
                    style={{
                      transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'transform 0.4s ease 0.15s, opacity 0.4s ease 0.15s',
                    }}
                  >
                    {cat.tagline}
                  </p>

                  <h3
                    className="font-display text-2xl sm:text-4xl md:text-5xl text-white tracking-wider uppercase mb-1.5 sm:mb-3"
                    style={{
                      transform: isActive ? 'translateY(0)' : 'translateY(16px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'transform 0.4s ease 0.2s, opacity 0.4s ease 0.2s',
                    }}
                  >
                    {cat.name}
                  </h3>

                  <p
                    className="text-white/60 text-[11px] sm:text-sm max-w-xs leading-snug sm:leading-relaxed font-light mb-3 sm:mb-6"
                    style={{
                      transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'transform 0.4s ease 0.25s, opacity 0.4s ease 0.25s',
                    }}
                  >
                    {cat.description}
                  </p>

                  <div
                    style={{
                      transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                      opacity: isActive ? 1 : 0,
                      transition: 'transform 0.4s ease 0.3s, opacity 0.4s ease 0.3s',
                    }}
                  >
                    <Link
                      to={`/products?category=${cat.slug}`}
                      className="inline-flex items-center gap-2 bg-white text-dark px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-[11px] sm:text-sm font-semibold tracking-wide hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore
                      <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
