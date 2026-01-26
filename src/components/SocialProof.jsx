import { motion } from 'framer-motion';

export default function SocialProof() {
  const socialStats = [
    {
      platform: "YouTube",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      count: "2.35 LAKH",
      label: "SUBSCRIBERS",
      subtext: "10 Crore+ Views"
    },
    {
      platform: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      count: "50K+",
      label: "FOLLOWERS",
      subtext: "Active Community"
    }
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-dark-light">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4 tracking-wider uppercase">
            TRUSTED BY 2.35 LAKH+
          </h2>
          <p className="text-lg sm:text-xl text-gray-light max-w-2xl mx-auto">
            Bangalore's most trusted bicycle experts with <span className="text-white font-semibold">10 Crore+ video views</span>
          </p>
        </motion.div>

        {/* Social stats grid */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {socialStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex items-center gap-6 p-8 rounded-[20px] bg-dark-lighter border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white">
                {stat.icon}
              </div>
              <div>
                <div className="font-display text-4xl text-primary mb-1 tracking-wider">{stat.count}</div>
                <div className="text-sm text-gray-light font-semibold tracking-wide">{stat.platform} {stat.label}</div>
                {stat.subtext && (
                  <div className="text-xs text-gray-light/70 mt-1">{stat.subtext}</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {[
            { value: "18.7L", label: "Total Likes" },
            { value: "38.8K", label: "Comments" },
            { value: "5.7L", label: "Views (Last 7 Days)" },
            { value: "98%", label: "India Based" }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              className="text-center p-4 rounded-[15px] bg-dark border border-white/10"
            >
              <div className="font-display text-2xl sm:text-3xl text-primary mb-1 tracking-wider">{metric.value}</div>
              <div className="text-xs text-gray-light font-semibold uppercase tracking-wide">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-bold text-white uppercase tracking-wide">
              Real Guidance • Real Results • Real Peace of Mind
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
