import { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import BrandsMarquee from '../components/BrandsMarquee';
import ContactFormModal from '../components/ContactFormModal';
import LazyImage from '../components/LazyImage';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { getCachedProducts } from '../utils/productsCache';

// Lazy-load below-fold heavy components
const CategoryShowcase = lazy(() => import('../components/CategoryShowcase'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const SocialProof = lazy(() => import('../components/SocialProof'));
const FAQSection = lazy(() => import('../components/FAQSection'));

// Minimal section placeholder while lazy sections load
function SectionFallback() {
  return <div className="py-12 bg-gray-bg" />;
}

// ─── Animation Variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Hero Section ─────────────────────────────────────────────────
function PremiumHero({ onCTAClick }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/main2.jpg';
    img.onload = () => setHeroLoaded(true);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen min-h-[600px] max-h-[900px] flex flex-col overflow-hidden">
      {/* Placeholder bg while image loads */}
      <div className="absolute inset-0 bg-dark z-0" />

      {/* Parallax Background — GPU accelerated with will-change */}
      <motion.div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-opacity duration-700 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: 'url("/main2.jpg")',
          y: backgroundY,
          willChange: 'transform',
        }}
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/10 to-dark/50 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/15 to-transparent z-[1]" />

      {/* Hero Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center pt-[80px]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-white/70 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-4 sm:mb-6"
            >
              Bangalore's Premier E-Cycle Destination
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-4 sm:mb-8 tracking-wider uppercase"
            >
              Experience the{' '}
              <span className="text-primary">Future</span>
              <br />
              of Commuting
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="text-white/70 text-sm sm:text-lg md:text-xl max-w-xl leading-relaxed mb-6 sm:mb-10 font-light"
            >
              Curated electric &amp; premium bicycles for the modern Bangalore commuter.
              Ride smarter. Live better.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.8}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/test-ride"
                className="group inline-flex items-center gap-2 sm:gap-3 bg-red-600 text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full font-semibold text-sm sm:text-base tracking-wide hover:bg-red-700 transition-all duration-500 shadow-2xl"
              >
                Book a Test Ride
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm sm:text-base font-medium transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
              >
                Explore Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Value Props at Bottom of Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x divide-white/10 py-6 sm:py-8">
            <div className="text-center sm:text-left sm:px-6 first:sm:pl-0">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Official Emotorad Dealer</h4>
                  <p className="text-white/60 text-xs mt-0.5">Authorized with full warranty</p>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-left sm:px-6">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">Doorstep Service</h4>
                  <p className="text-white/60 text-xs mt-0.5">We come to you across Bangalore</p>
                </div>
              </div>
            </div>

            <div className="text-center sm:text-left sm:px-6 last:sm:pr-0">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <a href="tel:+919844443844" className="font-semibold text-white text-sm hover:text-primary transition-colors">
                    Call: +91 98444 43844
                  </a>
                  <p className="text-white/60 text-xs mt-0.5">Mon–Sun, 10AM – 8:30PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Featured Collection (Luxury Carousel) ─────────────────────
function FeaturedCollection() {
  const navigate = useNavigate();
  const [localProducts, setLocalProducts] = useState(products);

  useEffect(() => {
    let cancelled = false;
    getCachedProducts()
      .then((merged) => {
        if (!cancelled) setLocalProducts(merged);
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, []);

  const featuredList = useMemo(() => {
    const featured = localProducts
      .filter(
        (p) =>
          p.badge === 'Bestseller' ||
          p.badge === 'Top Pick' ||
          p.badge === 'New Arrival' ||
          p.badge === 'Value Pick'
      )
      .slice(0, 12);
    return featured.length > 0 ? featured : localProducts.slice(0, 12);
  }, [localProducts]);

  const handleEnquire = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  const handleDetail = useCallback((product) => {
    navigate(`/products/${product.id}`);
  }, [navigate]);

  return (
    <section className="py-8 sm:py-12 bg-gray-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-4">
            Handpicked for You
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-dark mb-5 tracking-wider uppercase">
            Explore Our Collection
          </h2>
          <p className="text-gray-text/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-light">
            50+ curated bicycles across 5 categories — each one handpicked by our experts
          </p>
        </div>
      </div>

      {/* Auto-Scrollable Products */}
      <div
        className="flex gap-6 overflow-x-auto pb-8 px-6 sm:px-8 scrollbar-hide snap-x snap-mandatory"
      >
        {featuredList.map((product) => (
          <div
            key={product.id}
            className="w-[260px] sm:w-[320px] flex-shrink-0 flex flex-col snap-start"
          >
            <ProductCard product={product} onEnquire={handleEnquire} onClick={handleDetail} />
          </div>
        ))}
      </div>

      {/* View All CTA */}
      <div className="text-center mt-8">
        <Link
          to="/products"
          className="group inline-flex items-center gap-3 bg-dark text-white font-medium text-sm sm:text-base px-8 sm:px-10 py-4 sm:py-5 rounded-full hover:bg-primary transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.25)]"
        >
          View All Products
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

// ─── Visual Story: Why Bharath Cycle Hub ──────────────────────────
function WhyBCHStory({ onCTAClick }) {
  const stories = [
    {
      number: '01',
      title: 'Expert Curation',
      description:
        "We don't stock everything — we stock what's worth riding. Each bicycle is handpicked by our experts who've helped 10,000+ Bangaloreans find their perfect ride.",
    },
    {
      number: '02',
      title: 'Your Home, Our Showroom',
      description:
        'Book a ₹99 test ride and we bring 5 curated bikes to your doorstep. Try them in your neighbourhood. No pressure, no rush.',
    },
    {
      number: '03',
      title: 'Lifetime Riding Partner',
      description:
        "From Shimano-certified servicing to 5-year warranties and doorstep maintenance — we're here long after the sale.",
    },
  ];

  return (
    <section id="why-us" className="py-8 sm:py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image Composition */}
          <div className="relative">
            <div className="group/img relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <LazyImage
                src="/store-hq.png"
                alt="Inside Bharath Cycle Hub showroom"
                className="w-full h-[400px] sm:h-[550px]"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -bottom-6 right-2 sm:right-8 bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-100 max-w-[200px]">
              <div className="font-display text-3xl sm:text-4xl text-primary tracking-wider">4.9</div>
              <div className="flex gap-0.5 my-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-text">Google Rating</p>
              <p className="text-[10px] text-gray-text mt-0.5">500+ Reviews</p>
            </div>
          </div>

          {/* Right: Story Content */}
          <div>
            <div className="mb-6">
              <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-3">
                Our Story
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4 tracking-wider uppercase">
                Why Bangalore Rides
                <br />
                <span className="text-primary">with Us</span>
              </h2>
              <p className="text-gray-text text-sm sm:text-base leading-relaxed max-w-md">
                More than a bicycle shop — we're building a cycling culture in Bangalore,
                one perfect ride at a time.
              </p>
            </div>

            {/* Numbered Stories */}
            <div className="space-y-8">
              {stories.map((story, i) => (
                <div
                  key={i}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-200 group-hover:border-primary flex items-center justify-center transition-colors duration-300">
                    <span className="font-display text-sm text-gray-text group-hover:text-primary transition-colors duration-300 tracking-wider">
                      {story.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark text-base sm:text-lg mb-1.5 group-hover:text-primary transition-colors duration-300">
                      {story.title}
                    </h3>
                    <p className="text-gray-text text-sm leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={onCTAClick}
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm border-b-2 border-primary hover:border-primary-dark pb-1 transition-colors duration-300"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Offers Section (Refined) ─────────────────────────────────────
function PremiumOffers({ onCTAClick }) {
  const offersScrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleOffersScroll = useCallback(() => {
    if (offersScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = offersScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    }
  }, []);

  const offers = [
    {
      tag: 'Featured',
      title: 'Emotorad E-Bikes',
      highlight: 'From ₹19,400',
      perks: ['15 free accessories worth ₹3,000', 'Free delivery across Bangalore', '5-year warranty', '0% EMI available'],
      cta: 'Explore E-Bikes',
      link: '/products?category=electric',
    },
    {
      tag: 'Exchange',
      title: 'Upgrade Your Ride',
      highlight: 'Up to ₹10,000 Off',
      perks: ['All brands & conditions accepted', 'Instant valuation', 'Home pickup available', 'Gear cycles from ₹8,499'],
      cta: 'Get Valuation',
      action: true,
    },
    {
      tag: 'Service',
      title: 'Expert Maintenance',
      highlight: 'From ₹99',
      perks: ['Doorstep service at ₹349', 'Shimano-certified technicians', '60-minute quick service', '5-year service guarantee'],
      cta: 'Book Service',
      action: true,
    },
  ];

  return (
    <section id="offers" className="py-8 sm:py-12 bg-gray-bg relative overflow-hidden scroll-mt-20">
      {/* Subtle decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/[0.03] to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-3">
            Exclusive Benefits
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-dark tracking-wider uppercase">
            More Than Just a Purchase
          </h2>
        </div>
      </div>

      {/* Mobile: Horizontal scroll | Desktop: Grid */}
      <div
        ref={offersScrollRef}
        onScroll={handleOffersScroll}
        className="flex sm:grid sm:grid-cols-3 gap-5 sm:gap-8 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 px-6 sm:px-8 snap-x snap-mandatory scrollbar-hide max-w-6xl sm:mx-auto"
      >
        {offers.map((offer, i) => (
          <div
            key={i}
            className="group relative bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-9 cursor-pointer border border-white/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-700 flex-shrink-0 w-[calc(100vw-3rem)] sm:w-auto snap-start hover:-translate-y-1.5"
            onClick={() => {
              if (offer.link) {
                window.location.href = offer.link;
              } else {
                onCTAClick();
              }
            }}
          >
            <span className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-primary mb-4 sm:mb-5">
              {offer.tag}
            </span>
            <h3 className="font-display text-xl sm:text-2xl mb-2 text-dark tracking-wider uppercase">
              {offer.title}
            </h3>
            <div className="text-2xl sm:text-3xl font-semibold text-dark mb-6 sm:mb-8 tracking-tight">
              {offer.highlight}
            </div>
            <ul className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
              {offer.perks.map((perk, j) => (
                <li key={j} className="flex items-start gap-2.5 sm:gap-3 text-sm text-gray-text/80 font-light">
                  <svg className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-sm font-medium text-dark group-hover:text-primary transition-colors duration-500">
              {offer.cta}
              <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar - Mobile only */}
      <div className="sm:hidden flex justify-center mt-4 px-6">
        <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-150"
            style={{ width: `${Math.max(33, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials (Luxury Carousel) ──────────────────────────────
const testimonials = [
  {
    name: 'Rahul Sharma',
    location: 'Whitefield',
    lifestyle: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop&auto=format&q=70',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=70',
    text: 'Best decision ever! Instead of buying blindly, I could try 5 different bikes at home. They explained every feature and helped me pick the perfect fit for my morning commute.',
    rating: 5,
    cycle: 'Emotorad Doodle',
    verified: true,
  },
  {
    name: 'Priya Menon',
    location: 'Koramangala',
    lifestyle: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&auto=format&q=70',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format&q=70',
    text: 'The team was incredibly patient with my kids trying different sizes. Got excellent guidance on which model would last them for years. Service after purchase is equally impressive!',
    rating: 5,
    cycle: 'Firefox Stardust',
    verified: true,
  },
  {
    name: 'Arun Kumar',
    location: 'HSR Layout',
    lifestyle: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=400&fit=crop&auto=format&q=70',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format&q=70',
    text: 'Tired of visiting 10 shops across Bangalore. BCH brought everything to my door! The booking fee was adjusted in the final price. No pressure, no hassle.',
    rating: 4,
    cycle: 'Hero Lectro F6i',
    verified: true,
  },
  {
    name: 'Sneha Reddy',
    location: 'Yelahanka',
    lifestyle: 'https://images.unsplash.com/photo-1505705694340-019e0d8a2e20?w=600&h=400&fit=crop&auto=format&q=70',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=70',
    text: 'Switched to e-cycle for my 8km commute. Saving ₹300/day on fuel! BCH made the entire process smooth — from test ride to doorstep delivery.',
    rating: 5,
    cycle: 'Emotorad T-Rex',
    verified: true,
  },
  {
    name: 'Vikram Singh',
    location: 'Indiranagar',
    lifestyle: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&h=400&fit=crop&auto=format&q=70',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format&q=70',
    text: 'Got a puncture 2 months in. Contacted BCH and a technician was at my doorstep within 90 minutes. This level of after-sales service is truly rare.',
    rating: 4,
    cycle: 'Tata Stryder Zeeta',
    verified: true,
  },
  {
    name: 'Meera Iyer',
    location: 'JP Nagar',
    lifestyle: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&h=400&fit=crop&auto=format&q=70',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format&q=70',
    text: 'As a parent, the 5-year warranty gave us real peace of mind. Exchange offer for our old cycle was genuinely fair. My daughter loves her new ride!',
    rating: 5,
    cycle: 'Firefox Flip',
    verified: true,
  },
];

function TestimonialScroller() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -520 : 520,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-4">
              Real Stories
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-dark tracking-wider uppercase">
              What Our Riders Say
            </h2>
          </div>
          {/* Navigation Arrows */}
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gray-200 hover:border-dark flex items-center justify-center text-gray-text hover:text-dark transition-all duration-300"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gray-200 hover:border-dark flex items-center justify-center text-gray-text hover:text-dark transition-all duration-300"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Luxury Carousel Cards */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 px-6 sm:px-8 scrollbar-hide snap-x snap-mandatory"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative flex-shrink-0 w-[340px] sm:w-[480px] rounded-3xl overflow-hidden cursor-pointer snap-start"
          >
            {/* Large Lifestyle Image — lazy loaded */}
            <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
              <LazyImage
                src={t.lifestyle}
                alt={`${t.name} riding`}
                className="absolute inset-0 w-full h-full"
                objectFit="cover"
              />
              {/* Elegant gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/30 to-transparent z-[1]" />

              {/* Quote overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-[2]">
                <svg className="w-6 h-6 text-primary/80 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed font-light line-clamp-3">
                  "{t.text}"
                </p>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="bg-gray-bg p-5 sm:p-6 flex items-center gap-4">
              <img
                src={t.photo}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-dark text-sm truncate">{t.name}</h4>
                  {t.verified && (
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 10-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-gray-text/60 text-xs font-light">{t.location}, Bangalore</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="flex gap-0.5 justify-end mb-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-primary text-[11px] font-medium">{t.cycle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Final CTA (compact, flows into footer) ─────────────────────
function FinalCTA({ onCTAClick }) {
  return (
    <section className="relative py-10 sm:py-14 overflow-hidden bg-dark">
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center">
          <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-4">
            Your Perfect Ride Awaits
          </p>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.2] mb-4 tracking-wider uppercase">
            Ready to <span className="text-primary">Transform</span> Your Commute?
          </h2>

          <p className="text-white/50 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed font-light">
            Visit our Yelahanka showroom or book a home test ride — zero pressure, 100% confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/test-ride"
              className="group inline-flex items-center gap-3 bg-primary text-white px-8 sm:px-10 py-4 rounded-full font-bold text-sm sm:text-base tracking-wide hover:shadow-xl hover:shadow-primary/30 transition-all duration-500"
            >
              Book Test Ride — ₹99
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <button
              onClick={onCTAClick}
              className="group inline-flex items-center gap-3 border border-white/20 text-white/80 px-8 sm:px-10 py-4 rounded-full font-medium text-sm sm:text-base tracking-wide hover:border-primary hover:text-primary transition-all duration-500"
            >
              Contact Our Team
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page Export ─────────────────────────────────────────────
export default function MainLandingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const openContact = useCallback(() => setIsContactFormOpen(true), []);

  return (
    <div>
      {/* 1. Premium Hero */}
      <PremiumHero onCTAClick={openContact} />

      {/* 2. Brands Marquee */}
      <BrandsMarquee />

      {/* 3. How It Works (lazy) */}
      <Suspense fallback={<SectionFallback />}>
        <HowItWorks />
      </Suspense>

      {/* 4. Category Showcase (lazy) */}
      <Suspense fallback={<SectionFallback />}>
        <CategoryShowcase />
      </Suspense>

      {/* 5. Featured Collection */}
      <FeaturedCollection />

      {/* 6. Why BCH — Visual Story */}
      <WhyBCHStory onCTAClick={openContact} />

      {/* 7. Premium Offers */}
      <PremiumOffers onCTAClick={openContact} />

      {/* 8. Testimonials */}
      <TestimonialScroller />

      {/* 9. Social Proof (lazy) */}
      <Suspense fallback={<SectionFallback />}>
        <SocialProof onCTAClick={openContact} />
      </Suspense>

      {/* 10. FAQ (lazy) */}
      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>

      {/* 11. Final CTA + Location */}
      <FinalCTA onCTAClick={openContact} />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Get In Touch"
      />
    </div>
  );
}
