import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is included in the ₹99 test ride?',
    answer: 'We bring 5 curated bicycles to your home based on your preferences. You get to test ride all of them in your neighbourhood with expert guidance. The ₹99 booking fee is fully adjusted in your final purchase.',
  },
  {
    question: 'Do you deliver across all of Bangalore?',
    answer: 'Yes! We deliver across Bangalore — from Whitefield to Yelahanka, Koramangala to Electronic City. Home test rides and free delivery are available across the city.',
  },
  {
    question: 'Is EMI / financing available?',
    answer: 'Yes, we offer 0% EMI options on select bicycles through leading banks and NBFC partners. EMI starts from as low as ₹999/month. Our team will help you with the paperwork during purchase.',
  },
  {
    question: 'What warranty do I get?',
    answer: 'All bicycles come with the manufacturer\'s warranty (typically 2-5 years on frame). Additionally, we provide free servicing for the first year and doorstep maintenance support throughout the warranty period.',
  },
  {
    question: 'Do you service all bicycle brands?',
    answer: 'Yes, our Shimano-certified technicians service all brands — Hero, Firefox, Emotorad, Giant, Raleigh, and more. Doorstep service starts at just ₹349, and we also offer annual maintenance packages.',
  },
  {
    question: 'Can I exchange my old bicycle?',
    answer: 'Absolutely! We accept all brands and conditions for exchange. You can get up to ₹10,000 off on your new bicycle. We even offer home pickup for your old cycle — no need to bring it to us.',
  },
  {
    question: 'What if I don\'t like any of the 5 bicycles?',
    answer: 'No problem at all! There\'s zero pressure to buy. If none of the 5 bikes suit you, we can arrange another session with different models, or you can visit our Yelahanka showroom to explore our full collection.',
  },
  {
    question: 'How do I reach you for support?',
    answer: 'You can WhatsApp us at +91 98444 43844 (we reply within 5 minutes), call us directly, or email support@bharathcyclehub.store. Our showroom in Yelahanka is open Mon-Sun, 10AM to 8:30PM.',
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className={`font-medium text-sm sm:text-base pr-4 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-white/90 group-hover:text-primary'}`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-primary bg-primary/10 rotate-45' : 'border-white/10 group-hover:border-primary'}`}>
          <svg className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-5 pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 2);

  return (
    <section className="py-8 sm:py-12 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-primary text-xs sm:text-sm uppercase tracking-[0.25em] font-medium mb-3">
            Got Questions?
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-3 tracking-wider uppercase">
            Frequently Asked
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-light">
            Everything you need to know about buying from Bharath Cycle Hub
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-dark-light rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/[0.06]"
        >
          {visibleFaqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}

          {faqs.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-2 pt-3 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
            >
              {showAll ? 'Show Less' : `View All ${faqs.length} Questions`}
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-gray-500 text-sm mb-3">Still have questions?</p>
          <a
            href="https://wa.me/919844443844?text=Hi%2C%20I%20have%20a%20question%20about%20your%20bicycles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20BD5A] font-medium text-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat with us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
