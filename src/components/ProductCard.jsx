import { motion } from 'framer-motion';
import LazyImage from './LazyImage';

const badgeStyles = {
  'Bestseller': 'bg-primary text-white',
  'New Arrival': 'bg-green-500 text-white',
  'Top Pick': 'bg-primary-dark text-white',
  'Value Pick': 'bg-orange-500 text-white',
};

export default function ProductCard({ product, onEnquire, onClick }) {
  const { name, price, mrp, image, specs, badge, shortDescription } = product;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const displaySpecs = [
    { label: specs.wheelSize, key: 'wheelSize' },
    { label: specs.gearCount, key: 'gearCount' },
    { label: specs.frameType, key: 'frameType' },
    { label: specs.brakeType, key: 'brakeType' },
  ].filter((s) => s.label);

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={() => onClick && onClick(product)}
    >
      {/* Image */}
      <div className="relative">
        <LazyImage
          src={image}
          alt={name}
          className="w-full aspect-[4/3]"
        />
        {badge && (
          <span className={`absolute top-2 left-2 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${badgeStyles[badge] || 'bg-gray-500 text-white'}`}>
            {badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-green-500 text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-1.5 sm:gap-2">
        {/* Name */}
        <h3 className="text-sm sm:text-base font-bold text-dark line-clamp-2 leading-snug font-sans">
          {name}
        </h3>

        {/* Short description */}
        {shortDescription && (
          <p className="text-[11px] sm:text-xs text-gray-text leading-relaxed line-clamp-1">
            {shortDescription}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap mt-0.5">
          <span className="text-lg sm:text-xl font-bold text-primary">
            {'\u20b9'}{price.toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
            <span className="text-[11px] sm:text-sm text-gray-text line-through">
              {'\u20b9'}{mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Specs chips */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1">
          {displaySpecs.slice(0, 3).map((spec) => (
            <span
              key={spec.key}
              className="inline-flex items-center gap-0.5 sm:gap-1 text-[9px] sm:text-xs bg-gray-bg text-gray-text rounded-full px-1.5 sm:px-2 py-0.5"
            >
              {spec.label}
            </span>
          ))}
        </div>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />

        {/* CTAs */}
        <div className="mt-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick(product);
            }}
            className="flex-1 py-2 sm:py-2.5 rounded-full border-2 border-dark text-dark text-xs sm:text-sm font-bold transition-colors duration-200 hover:bg-dark hover:text-white"
          >
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnquire(product);
            }}
            className="flex-1 py-2 sm:py-2.5 rounded-full bg-dark text-white text-xs sm:text-sm font-bold transition-colors duration-200 hover:bg-primary active:bg-primary-dark"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
