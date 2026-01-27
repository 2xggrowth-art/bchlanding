import { motion } from 'framer-motion';

const brands = [
  {
    name: 'Hero Cycles',
    logo: '/brands/hero.png'
  },
  {
    name: 'Firefox',
    logo: '/brands/firefox.png'
  },
  {
    name: 'Aoki',
    logo: '/brands/aoki.png'
  },
  {
    name: 'Raleigh',
    logo: '/brands/raleigh.jpg'
  },
  {
    name: 'EMotorad',
    logo: '/brands/emotorad.png'
  },
  {
    name: 'Hercules',
    logo: '/brands/hercules.png'
  },
  {
    name: 'Giant',
    logo: '/brands/giant.png'
  }
];

export default function BrandsMarquee() {
  // Quadruple the brands array for seamless loop and sufficient width
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-8 bg-gray-bg overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <p className="text-center text-gray-text text-lg font-medium uppercase tracking-wider">
          Trusted Brands We Work With
        </p>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-bg to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-bg to-transparent z-10" />

        <motion.div
          className="flex items-center"
          animate={{
            x: [0, '-50%']
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-12 px-2 mr-16 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
