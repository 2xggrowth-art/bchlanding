import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link, useNavigationType } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import LazyImage from '../components/LazyImage';
// Phase 1 Components
import ReviewSummary from '../components/Product/ReviewSummary';
import TrustBadges from '../components/Product/TrustBadges';
import StockStatus from '../components/Product/StockStatus';
import EMICalculator from '../components/Product/EMICalculator';
import ProductTabs from '../components/Product/ProductTabs';
// Phase 2 Components
import SizeGuideSection from '../components/Product/SizeGuideSection';
import WarrantyServiceSection from '../components/Product/WarrantyServiceSection';
import { getCachedProducts } from '../utils/productsCache';
import { api } from '../utils/api';

const WHATSAPP_NUMBER = '919876543210';

// Human-readable spec labels
const specLabels = {
  wheelSize: 'Wheel Size',
  frameType: 'Frame',
  gearCount: 'Gears',
  brakeType: 'Brakes',
  weight: 'Weight',
  ageRange: 'Age Range',
  suspension: 'Suspension',
  motor: 'Motor',
  battery: 'Battery',
  range: 'Range',
};

const badgeStyles = {
  Bestseller: 'bg-primary text-white',
  'New Arrival': 'bg-green-500 text-white',
  'Top Pick': 'bg-primary-dark text-white',
  'Value Pick': 'bg-orange-500 text-white',
};

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [productsList, setProductsList] = useState([]); // Dynamic products list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const navType = useNavigationType();

  const category = useMemo(
    () => (product ? categories.find((c) => c.slug === product.category) : null),
    [product]
  );

  const similarProducts = useMemo(() => {
    if (!product || productsList.length === 0) return [];
    return productsList
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, productsList]);

  // Build full gallery: main image + gallery images (deduplicated)
  const allGalleryImages = useMemo(() => {
    if (!product) return [];
    const imgs = [product.image];
    if (product.gallery?.length) {
      product.gallery.forEach((url) => {
        if (url && !imgs.includes(url)) imgs.push(url);
      });
    }
    return imgs;
  }, [product]);

  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
    setSelectedColor(null);
    setSelectedImageIdx(0);
  }, [productId, navType]);

  // Load product from shared cache (single API call, shared across pages)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        // getCachedProducts returns merged list (API + local), cached for 5 min
        const allProds = await getCachedProducts();
        if (cancelled) return;

        setProductsList(allProds);

        const found = allProds.find((p) => p.id === productId);
        if (!found) {
          setError('Product not found');
        } else {
          setProduct(found);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load product');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [productId]);

  // Loading state - skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-bg px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] w-full aspect-square rounded-2xl" style={{ animation: 'shimmer 1.5s ease-in-out infinite' }} />
            <div className="space-y-4">
              <div className="animate-pulse bg-gray-200 h-8 w-3/4 rounded" />
              <div className="animate-pulse bg-gray-200 h-5 w-1/2 rounded" />
              <div className="animate-pulse bg-gray-200 h-10 w-32 rounded" />
              <div className="space-y-2">
                <div className="animate-pulse bg-gray-200 h-4 w-full rounded" />
                <div className="animate-pulse bg-gray-200 h-4 w-5/6 rounded" />
                <div className="animate-pulse bg-gray-200 h-4 w-4/6 rounded" />
              </div>
              <div className="flex gap-3 pt-4">
                <div className="animate-pulse bg-gray-200 h-12 w-40 rounded-full" />
                <div className="animate-pulse bg-gray-200 h-12 w-40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 404 — product not found
  if (!product || error) {
    return (
      <div className="min-h-screen bg-gray-bg flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-dark mb-4">404</h1>
          <p className="text-gray-text text-lg mb-6">
            {error || 'Product not found'}
          </p>
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/products');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-dark text-white rounded-full font-semibold hover:bg-primary transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (₹${product.price.toLocaleString('en-IN')}). Please share more details.`
  )}`;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} — BCH`,
          text: `Check out ${product.name} at ₹${product.price.toLocaleString('en-IN')} on Bharath Cycle Hub!`,
          url: shareUrl,
        });
      } catch {
        // user cancelled share
      }
    } else {
      navigator.clipboard?.writeText(shareUrl);
    }
  };

  // Match gallery images to a color using urlKey (exact substring) or color name keywords (fallback)
  const getImagesForColor = (colorName) => {
    if (!colorName || allGalleryImages.length <= 1) return allGalleryImages;
    const colorObj = product.colors?.find((c) => c.name === colorName);
    let matched;
    if (colorObj?.urlKey) {
      // Exact substring match for explicit urlKey (handles path segments like "7.65Ah/BLUE")
      const key = colorObj.urlKey.toLowerCase();
      matched = allGalleryImages.filter((url) => url.toLowerCase().includes(key));
    } else {
      // Keyword matching fallback for color name
      const keywords = colorName.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().split(' ').filter(Boolean);
      matched = allGalleryImages.filter((url) => {
        const urlLower = url.toLowerCase();
        return keywords.some((kw) => kw.length >= 3 && urlLower.includes(kw));
      });
    }
    if (matched.length === 0) return allGalleryImages;
    // Full per-color gallery (3+ matches, e.g. Emotorad): show only matched
    if (matched.length >= 3) return matched;
    // Few matches (1-2 swatch images): show them first, then remaining photos
    const rest = allGalleryImages.filter((url) => !matched.includes(url));
    return [...matched, ...rest];
  };

  // Active gallery based on selected color
  const activeGallery = selectedColor ? getImagesForColor(selectedColor) : allGalleryImages;

  // Preload all gallery images so switching is instant
  useEffect(() => {
    activeGallery.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [activeGallery]);

  // Handle color selection
  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    setSelectedImageIdx(0);
  };

  // Build specs array from all available fields
  const specsArray = Object.entries(product.specs || {})
    .map(([key, value]) => ({
      label: specLabels[key] || key,
      value,
      key,
    }))
    .filter((s) => s.value);

  return (
    <div className="min-h-screen bg-gray-bg pb-20 lg:pb-0">
      {/* Back Nav */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 -mt-[72px] sm:-mt-[80px]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/products');
              }
            }}
            className="flex items-center gap-2 text-sm font-semibold text-dark hover:text-primary transition-colors min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm font-semibold text-dark hover:text-primary transition-colors min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
          {/* Left — Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-[140px]"
          >
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGallery[selectedImageIdx] || activeGallery[0]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LazyImage
                    src={activeGallery[selectedImageIdx] || activeGallery[0]}
                    alt={`${product.name}${selectedColor ? ` - ${selectedColor}` : ''}`}
                    className={`w-full aspect-square sm:aspect-[4/3] ${(activeGallery[selectedImageIdx] || activeGallery[0])?.toLowerCase().endsWith('.png') ? 'p-4' : ''}`}
                    objectFit={(activeGallery[selectedImageIdx] || activeGallery[0])?.toLowerCase().endsWith('.png') ? 'contain' : 'cover'}
                    eager
                  />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <span
                  className={`absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${badgeStyles[product.badge] || 'bg-gray-500 text-white'}`}
                >
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500 text-white">
                  {discount}% OFF
                </span>
              )}
              {/* Image counter */}
              {activeGallery.length > 1 && (
                <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-black/50 text-white">
                  {selectedImageIdx + 1} / {activeGallery.length}
                </span>
              )}
              {/* Prev/Next arrows */}
              {activeGallery.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIdx((prev) => prev === 0 ? activeGallery.length - 1 : prev - 1)}
                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImageIdx((prev) => prev === activeGallery.length - 1 ? 0 : prev + 1)}
                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white/80 hover:bg-white shadow flex items-center justify-center transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 sm:w-4 sm:h-4 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {activeGallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {activeGallery.map((url, idx) => (
                  <button
                    key={url + idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === selectedImageIdx
                      ? 'border-primary shadow-md scale-105'
                      : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img src={url} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Color Swatches */}
            {product.colors?.length > 0 && (
              <div className="mt-4 bg-white rounded-xl p-3 border border-gray-100">
                <p className="text-xs font-bold text-dark uppercase tracking-wide mb-2">
                  Colour: <span className="text-primary font-semibold normal-case">{selectedColor || 'All'}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(selectedColor === color.name ? null : color.name)}
                      className={`group relative w-9 h-9 rounded-full border-2 transition-all ${selectedColor === color.name
                        ? 'border-primary scale-110 shadow-md'
                        : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                        }`}
                      title={color.name}
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{ background: color.hex?.startsWith('linear') ? color.hex : color.hex }}
                      />
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 lg:mt-0"
          >
            {/* Category breadcrumb */}
            {category && (
              <Link
                to={`/products?category=${category.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-3 hover:underline"
              >
                {category.name}
              </Link>
            )}

            {/* Name */}
            <h1 className="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-wide uppercase mb-2 break-words">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-gray-text text-sm sm:text-base mb-4 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* PHASE 1: Review Summary */}
            {product.reviews && (
              <ReviewSummary
                averageRating={product.reviews.averageRating}
                totalReviews={product.reviews.totalReviews}
              />
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 sm:gap-3 mb-6 flex-wrap">
              <span className="text-2xl sm:text-4xl font-bold text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-base sm:text-lg text-gray-text line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-green-600">
                    Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
                  </span>
                </>
              )}
            </div>

            {/* PHASE 1: Trust Badges */}
            <TrustBadges />

            {/* PHASE 1: Stock Status */}
            <StockStatus
              stock={product.stock || 20}
              recentPurchases={product.recentPurchases}
            />

            {/* PHASE 1: EMI Calculator */}
            <EMICalculator price={product.price} />

            {/* CTA buttons - visible on desktop, hidden on mobile (shown in sticky bar) */}
            <div className="hidden lg:flex gap-3 mb-8">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="flex-1 py-3.5 rounded-full bg-dark text-white font-bold text-base transition-colors hover:bg-primary"
              >
                Enquire Now
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-green-500 text-white font-bold text-base hover:bg-green-600 transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.359 0-4.549-.678-6.413-1.848l-.446-.291-2.651.889.889-2.651-.291-.446A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Mobile inline CTA - shows before scroll to sticky bar */}
            <div className="flex lg:hidden gap-2 mb-6">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="flex-1 py-3 rounded-full bg-dark text-white font-bold text-sm transition-colors hover:bg-primary active:bg-primary min-h-[44px]"
              >
                Enquire Now
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors flex-shrink-0 min-h-[44px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.359 0-4.549-.678-6.413-1.848l-.446-.291-2.651.889.889-2.651-.291-.446A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
            </div>

          </motion.div>
        </div>

        {/* PHASE 1: Product Tabs (replaces old specs table) */}
        <ProductTabs product={product} />


        {/* Compare Bikes */}
        <CompareBikes currentProduct={product} allProducts={productsList} />

        {/* PHASE 2: Size Guide Section */}
        {product.sizeGuide?.hasGuide && (
          <SizeGuideSection sizeGuide={product.sizeGuide} productName={product.name} />
        )}

        {/* PHASE 2: Warranty & Service Section */}
        <WarrantyServiceSection warranty={product.warranty} category={product.category} />

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="font-display text-xl sm:text-2xl font-bold text-dark uppercase tracking-wider mb-6">
              Similar <span className="text-primary">Bikes</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-stretch">
              {similarProducts.map((p) => (
                <Link key={p.id} to={`/products/${p.id}`} className="flex flex-col h-full">
                  <ProductCard
                    product={p}
                    onEnquire={(prod) => {
                      navigate(`/products/${prod.id}`);
                    }}
                  />
                </Link>
              ))}
            </div>
          </motion.section>
        )}

      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] safe-bottom">
        <div className="flex gap-2 px-4 py-3">
          <button
            onClick={() => setEnquiryOpen(true)}
            className="flex-1 py-3 rounded-full bg-dark text-white font-bold text-sm transition-colors active:bg-primary min-h-[44px]"
          >
            Enquire Now
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-green-500 text-white font-bold text-sm active:bg-green-600 transition-colors flex-shrink-0 min-h-[44px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.359 0-4.549-.678-6.413-1.848l-.446-.291-2.651.889.889-2.651-.291-.446A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryOpen && (
          <EnquiryModal
            product={product}
            onClose={() => setEnquiryOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────
// Compare Bikes
// ────────────────────────────────────────

// All comparable spec keys in display order
const compareSpecKeys = [
  'wheelSize', 'frameType', 'gearCount', 'brakeType', 'weight',
  'ageRange', 'suspension', 'motor', 'battery', 'range',
];

function CompareBikes({ currentProduct, allProducts = [] }) {
  const [bikeA, setBikeA] = useState(currentProduct.id);
  const [bikeB, setBikeB] = useState('');
  const [isOpenA, setIsOpenA] = useState(false);
  const [isOpenB, setIsOpenB] = useState(false);

  // Reset bikeA when current product changes
  useEffect(() => {
    setBikeA(currentProduct.id);
    setBikeB('');
  }, [currentProduct.id]);

  const productA = allProducts.find((p) => p.id === bikeA) || currentProduct;
  const productB = bikeB ? allProducts.find((p) => p.id === bikeB) : null;

  // Get all spec keys present in either bike
  const activeSpecKeys = compareSpecKeys.filter(
    (key) => productA.specs?.[key] || (productB && productB.specs?.[key])
  );

  const discountA = productA.mrp > productA.price ? Math.round(((productA.mrp - productA.price) / productA.mrp) * 100) : 0;
  const discountB = productB && productB.mrp > productB.price ? Math.round(((productB.mrp - productB.price) / productB.mrp) * 100) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 sm:mt-16"
    >
      <h2 className="font-display text-xl sm:text-2xl font-bold text-dark uppercase tracking-wider mb-6">
        Compare <span className="text-primary">Bikes</span>
      </h2>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Bike Selectors + Images */}
        <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[120px_1fr_1fr] gap-0 min-w-0">
          {/* Empty top-left cell (desktop only) */}
          <div className="hidden sm:block" />

          {/* Bike A Selector */}
          <div className="border-r border-b border-gray-100 p-2.5 sm:p-4 min-w-0">
            <div className="relative">
              <button
                onClick={() => { setIsOpenA(!isOpenA); setIsOpenB(false); }}
                className="w-full flex items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-3 py-2.5 sm:py-2.5 bg-dark text-white rounded-xl text-[11px] sm:text-sm font-bold min-h-[40px]"
              >
                <span className="truncate">{productA.name}</span>
                <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpenA ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isOpenA && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                  >
                    {allProducts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setBikeA(p.id); setIsOpenA(false); }}
                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-bg transition-colors ${p.id === bikeA ? 'bg-primary/10 text-primary font-bold' : 'text-dark'}`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-3 aspect-[4/3] rounded-xl overflow-hidden bg-gray-bg">
              <LazyImage src={productA.image} alt={productA.name} className="w-full h-full" />
            </div>
          </div>

          {/* Bike B Selector */}
          <div className="border-b border-gray-100 p-2.5 sm:p-4 min-w-0">
            <div className="relative">
              <button
                onClick={() => { setIsOpenB(!isOpenB); setIsOpenA(false); }}
                className={`w-full flex items-center justify-between gap-1 sm:gap-2 px-2.5 sm:px-3 py-2.5 sm:py-2.5 rounded-xl text-[11px] sm:text-sm font-bold min-h-[40px] ${productB ? 'bg-primary text-white' : 'bg-gray-200 text-gray-text'}`}
              >
                <span className="truncate">{productB ? productB.name : 'Select a bike'}</span>
                <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpenB ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {isOpenB && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                  >
                    {allProducts.filter((p) => p.id !== bikeA).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => { setBikeB(p.id); setIsOpenB(false); }}
                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-bg transition-colors ${p.id === bikeB ? 'bg-primary/10 text-primary font-bold' : 'text-dark'}`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {productB ? (
              <div className="mt-3 aspect-[4/3] rounded-xl overflow-hidden bg-gray-bg">
                <LazyImage src={productB.image} alt={productB.name} className="w-full h-full" />
              </div>
            ) : (
              <div className="mt-3 aspect-[4/3] rounded-xl bg-gray-bg flex items-center justify-center">
                <div className="text-center text-gray-text">
                  <svg className="w-10 h-10 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-xs font-medium">Pick a bike to compare</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Row */}
        <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[120px_1fr_1fr] border-b border-gray-100">
          <div className="hidden sm:flex items-center px-4 py-3 bg-gray-bg">
            <span className="text-xs font-bold text-dark uppercase tracking-wide">Price</span>
          </div>
          <div className="flex flex-col items-center justify-center px-2 sm:px-3 py-2.5 sm:py-4 border-r border-gray-100">
            <span className="text-sm sm:text-2xl font-bold text-primary">₹{productA.price.toLocaleString('en-IN')}</span>
            {discountA > 0 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-text line-through">₹{productA.mrp.toLocaleString('en-IN')}</span>
                <span className="text-xs font-bold text-green-600">{discountA}% off</span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center px-2 sm:px-3 py-2.5 sm:py-4">
            {productB ? (
              <>
                <span className="text-sm sm:text-2xl font-bold text-primary">₹{productB.price.toLocaleString('en-IN')}</span>
                {discountB > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-text line-through">₹{productB.mrp.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-bold text-green-600">{discountB}% off</span>
                  </div>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-300">—</span>
            )}
          </div>
        </div>

        {/* Spec Rows */}
        {activeSpecKeys.map((key) => {
          const valA = productA.specs?.[key] || '—';
          const valB = productB ? (productB.specs?.[key] || '—') : null;
          return (
            <div key={key} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[120px_1fr_1fr] border-b border-gray-100 last:border-b-0">
              {/* Label — hidden on mobile, shown on sm+ */}
              <div className="hidden sm:flex items-center px-4 py-3 bg-gray-bg">
                <span className="text-xs font-bold text-dark uppercase tracking-wide">{specLabels[key]}</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2 sm:px-3 py-2.5 sm:py-3 border-r border-gray-100 text-center">
                <span className="text-[10px] font-bold text-gray-text uppercase tracking-wide sm:hidden mb-0.5">{specLabels[key]}</span>
                <span className="text-[11px] sm:text-sm font-semibold text-dark">{valA}</span>
              </div>
              <div className="flex flex-col items-center justify-center px-2 sm:px-3 py-2.5 sm:py-3 text-center">
                {productB ? (
                  <>
                    <span className="text-[10px] font-bold text-gray-text uppercase tracking-wide sm:hidden mb-0.5">{specLabels[key]}</span>
                    <span className="text-[11px] sm:text-sm font-semibold text-dark">{valB}</span>
                  </>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ────────────────────────────────────────
// Enquiry Modal (same pattern as ProductsPage)
// ────────────────────────────────────────

function EnquiryModal({ product, onClose }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    else if (formData.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) errs.phone = 'Enter a valid 10-digit mobile number';
    return errs;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const errs = validate();
      setErrors((prev) => ({ ...prev, [field]: errs[field] || '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, phone: true });
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      await api.saveLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        source: 'product-detail',
        quizAnswers: {
          interestedProduct: product.name,
          category: product.category,
          price: product.price,
        },
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (₹${product.price.toLocaleString('en-IN')}). Please share more details.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <LazyImage src={product.image} alt={product.name} className="w-16 h-12 rounded-lg flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-dark truncate">{product.name}</h3>
            <p className="text-base font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
              {product.mrp > product.price && (
                <span className="text-xs text-gray-text line-through ml-2 font-normal">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="p-5">
          {status === 'success' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">Thank you!</h3>
              <p className="text-gray-text text-sm mb-6">We'll contact you shortly about the {product.name}.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-full font-semibold text-sm hover:bg-green-600 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.359 0-4.549-.678-6.413-1.848l-.446-.291-2.651.889.889-2.651-.291-.446A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                Chat on WhatsApp
              </a>
              <button onClick={onClose} className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">Close</button>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark mb-2">Something went wrong</h3>
              <p className="text-gray-text text-sm mb-6">Please try again or contact us on WhatsApp.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setStatus('idle')} className="px-5 py-2.5 bg-dark text-white rounded-full font-semibold text-sm hover:bg-primary transition-colors">Try Again</button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-green-500 text-white rounded-full font-semibold text-sm hover:bg-green-600 transition-colors">WhatsApp</a>
              </div>
            </motion.div>
          )}

          {(status === 'idle' || status === 'loading') && (
            <>
              <h2 className="text-lg font-bold text-dark mb-1">Enquire Now</h2>
              <p className="text-sm text-gray-text mb-4">Fill in your details and we'll get back to you.</p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="detail-name" className="block text-xs font-bold text-dark mb-1 uppercase tracking-wide">Name <span className="text-red-500">*</span></label>
                  <input id="detail-name" type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')} className={`w-full px-3 py-2.5 rounded-xl bg-gray-50 border-2 text-sm transition-colors outline-none ${errors.name && touched.name ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'}`} placeholder="Your full name" autoComplete="name" disabled={status === 'loading'} />
                  {errors.name && touched.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="detail-phone" className="block text-xs font-bold text-dark mb-1 uppercase tracking-wide">Phone <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">+91</span>
                    <input id="detail-phone" type="tel" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} onBlur={() => handleBlur('phone')} className={`w-full pl-12 pr-3 py-2.5 rounded-xl bg-gray-50 border-2 text-sm transition-colors outline-none ${errors.phone && touched.phone ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-primary'}`} placeholder="9876543210" autoComplete="tel" maxLength="10" disabled={status === 'loading'} />
                  </div>
                  {errors.phone && touched.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="detail-email" className="block text-xs font-bold text-dark mb-1 uppercase tracking-wide">Email <span className="text-gray-400 font-normal normal-case">(optional)</span></label>
                  <input id="detail-email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border-2 border-gray-200 focus:border-primary text-sm transition-colors outline-none" placeholder="you@example.com" autoComplete="email" disabled={status === 'loading'} />
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full py-3 rounded-full bg-dark text-white font-bold text-sm transition-colors hover:bg-primary disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {status === 'loading' ? (<><div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />Sending...</>) : 'Get Expert Advice'}
                </button>
              </form>
              <p className="text-[10px] text-gray-text text-center mt-3">Your information is secure and will only be used to assist your purchase.</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
