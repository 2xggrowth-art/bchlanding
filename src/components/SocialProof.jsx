import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

export default function SocialProof({ onCTAClick }) {
  const socialStats = [
    {
      platform: "YouTube",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      count: "2.35 LAKH",
      label: "SUBSCRIBERS",
      subtext: "10 Crore+ Views",
      link: "https://youtube.com/@bharathcyclehub?si=rNOy1owyFxN3O_Ap"
    },
    {
      platform: "Instagram",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      count: "50K+",
      label: "FOLLOWERS",
      subtext: "Active Community",
      link: "https://www.instagram.com/bharathcyclehub?igsh=bGJqNG5qZHRsMmdl"
    }
  ];

  return (
    <section className="bg-dark-light relative overflow-hidden">
      <div className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* 1. Main Header: Give Your Child Their Dream E-Cycle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-2 tracking-wider uppercase">
              Give Your <span className="text-primary">Child Their Dream</span> E-Cycle
            </h2>
          </motion.div>

          {/* 2. Secondary Header: Trusted By */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h3 className="font-display text-2xl sm:text-3xl font-normal text-white mb-2 tracking-wider uppercase opacity-90">
              TRUSTED BY 2.35 LAKH+
            </h3>
            <p className="text-base sm:text-lg text-gray-light max-w-2xl mx-auto">
              Bangalore's most trusted bicycle experts with <span className="text-white font-semibold">10 Crore+ video views</span>
            </p>
          </motion.div>

          {/* 3. Social stats grid */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            {socialStats.map((stat, index) => (
              <motion.a
                key={index}
                href={stat.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-center gap-4 p-5 rounded-[20px] bg-dark-lighter border border-white/10 hover:border-primary/50 transition-all duration-300 block"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <div>
                  <div className="font-display text-3xl text-primary mb-0.5 tracking-wider">{stat.count}</div>
                  <div className="text-sm text-gray-light font-semibold tracking-wide">{stat.platform} {stat.label}</div>
                  {stat.subtext && (
                    <div className="text-xs text-gray-light/70 mt-0.5">{stat.subtext}</div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>

          {/* 4. Engagement metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8"
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
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-center p-3 rounded-[15px] bg-dark border border-white/10"
              >
                <div className="font-display text-xl sm:text-2xl text-primary mb-1 tracking-wider">{metric.value}</div>
                <div className="text-[10px] sm:text-xs text-gray-light font-semibold uppercase tracking-wide">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* 5. Small CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mt-6"
          >
            <CTAButton onClick={onCTAClick}>
              BOOK NOW - ONLY ₹99
            </CTAButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
