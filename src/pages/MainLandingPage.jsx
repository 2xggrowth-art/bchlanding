import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import SocialMediaShowcase from '../components/SocialMediaShowcase';
import ContactFormModal from '../components/ContactFormModal';

export default function MainLandingPage() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Offers Section */}
      <section id="offers" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-bg">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl text-center mb-12 tracking-wider uppercase">
            Exclusive Offers Just For You
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Offer 1: Emotorad */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[20px] p-8 shadow-xl border-t-4 border-primary relative overflow-hidden"
            >
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                HOT DEAL
              </span>
              <h3 className="font-display text-2xl mb-2 tracking-wide">Emotorad E-Bike</h3>
              <div className="text-4xl font-bold text-primary mb-4">₹19,400</div>
              <ul className="space-y-2 mb-6 text-gray-text">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Get 15 FREE Accessories (Worth ₹3,000)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  All Over Bengaluru Free Delivery
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  5 Years Warranty
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  0% EMI Available
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Home Service Available
                </li>
              </ul>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="block w-full bg-dark text-white text-center py-3 rounded-full font-bold hover:bg-primary transition-colors"
              >
                BOOK TEST RIDE
              </button>
            </motion.div>

            {/* Offer 2: Exchange */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[20px] p-8 shadow-xl border-t-4 border-primary relative overflow-hidden"
            >
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                EXCHANGE MELA
              </span>
              <h3 className="font-display text-2xl mb-2 tracking-wide">Exchange Offer</h3>
              <div className="text-4xl font-bold text-primary mb-4">Up to ₹10,000 OFF</div>
              <ul className="space-y-2 mb-6 text-gray-text">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Exchange Your Old Cycle
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  We Accept All Brands & Conditions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Instant Valuation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Home Pickup & Drop Available
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Gear Cycles Start @ ₹8,499
                </li>
              </ul>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="block w-full bg-dark text-white text-center py-3 rounded-full font-bold hover:bg-primary transition-colors"
              >
                GET VALUATION
              </button>
            </motion.div>

            {/* Offer 3: Service */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-[20px] p-8 shadow-xl border-t-4 border-primary relative overflow-hidden"
            >
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                SERVICE SPECIAL
              </span>
              <h3 className="font-display text-2xl mb-2 tracking-wide">Expert Cycle Service</h3>
              <div className="text-4xl font-bold text-primary mb-4">Starting ₹99</div>
              <ul className="space-y-2 mb-6 text-gray-text">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Doorstep Service @ ₹349
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Free In-Store Service Across Bengaluru
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  5 Years Guarantee + Warranty
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Shimano Authorized Technicians
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  Quick 60-Min Service
                </li>
              </ul>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="block w-full bg-dark text-white text-center py-3 rounded-full font-bold hover:bg-primary transition-colors"
              >
                BOOK SERVICE NOW
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl mb-6 tracking-wider uppercase">
                Why Bharath Cycle Hub?
              </h2>
              <p className="text-gray-text text-lg mb-8">
                Trusted by thousands of Bengaluru cyclists, we're not just a shop—we're your cycling partner for life.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Official Dealer</h4>
                    <p className="text-gray-text">Authorized Emotorad dealer with genuine parts & warranty</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">&#127968;</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Home Service</h4>
                    <p className="text-gray-text">We come to you! Pickup, repair & drop your cycle at home</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">&#128176;</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Best Prices</h4>
                    <p className="text-gray-text">Competitive pricing with EMI options & exchange offers</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80"
                alt="Bicycle Shop"
                className="w-full rounded-[20px] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Showcase */}
      <SocialMediaShowcase />

      {/* Book Test Ride CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl mb-6 tracking-wider uppercase">
            Want Expert Guidance?
          </h2>
          <p className="text-gray-text text-lg mb-8 max-w-2xl mx-auto">
            Book our Expert Home Test Ride service. We bring 5 curated bicycles to your doorstep based on your needs.
          </p>
          <Link
            to="/test-5-get-1"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl hover:bg-primary-dark transition-all"
          >
            BOOK HOME TEST RIDE - ONLY ₹99
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl mb-6 tracking-wider uppercase">
            Ready to Ride?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Contact us now and get a FREE home test ride today!
          </p>
          <div className="mt-8">
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="inline-block bg-dark text-white font-bold text-lg px-10 py-5 rounded-full hover:bg-dark-light transition-colors"
            >
              CONTACT US NOW - IT'S FREE!
            </button>
          </div>

          {/* Location Info */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="font-bold mb-2">Visit Our Showroom:</p>
            <p className="text-white/80">Chikka Bommasandra, Yelahanka, Bengaluru</p>
            <p className="text-white/80">Open: Monday - Sunday | 10 AM - 8:30 PM</p>
            <a
              href="https://share.google/xjhIzxTAV7LgqqHAZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-white underline hover:opacity-80"
            >
              &#128205; Get Directions on Google Maps
            </a>
            <br />
            <a
              href="https://www.instagram.com/bharathcyclehub/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-white underline hover:opacity-80"
            >
              &#128247; Follow us @bharathcyclehub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        title="Get In Touch"
      />
    </div>
  );
}
