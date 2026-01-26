import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function VideoTestimonials({ onCTAClick }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const scrollContainerRef = useRef(null);

  // Replace these with actual BCH YouTube video IDs from your channels
  const videos = [
    {
      id: "dQw4w9WgXcQ", // Replace with actual BCH video ID
      title: "Father's Joy - Auto Driver Buys Dream E-Cycle for His Son",
      channel: "BCH Main",
      views: "2.5M",
      likes: "85K",
      thumbnail: "https://images.unsplash.com/photo-1612833609963-0e62e1f5d9c3?auto=format&fit=crop&w=600&q=80",
      description: "Emotional moment when Ramesh, an auto driver, surprises his 14-year-old son with his dream e-cycle using our EMI option."
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video ID
      title: "14-Year-Old's Reaction to BCH Doodle E-Cycle",
      channel: "EM Doodle BCH",
      views: "1.8M",
      likes: "62K",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
      description: "Watch Arjun's priceless reaction when he test rides the EM Doodle for the first time at his home."
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video ID
      title: "From Mobile Games to E-Cycle Adventures",
      channel: "Wattson Wheelz",
      views: "3.2M",
      likes: "95K",
      thumbnail: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=600&q=80",
      description: "Mother shares how her son stopped gaming 6 hours daily and now rides his BCH e-cycle for 2 hours every evening."
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video ID
      title: "Bangalore to Nandi Hills - Umesh's E-Cycle Journey",
      channel: "Wattson Wheelz",
      views: "4.1M",
      likes: "125K",
      thumbnail: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&w=600&q=80",
      description: "Watch Umesh explore Karnataka on his BCH e-cycle. He owns 6 e-cycles and 6 hybrids - all from BCH!"
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video ID
      title: "30 Kids Group Ride - BCH Champions Community",
      channel: "BCH Main",
      views: "1.5M",
      likes: "48K",
      thumbnail: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=600&q=80",
      description: "Sunday group ride with 30+ BCH kids from Yelahanka. Join the coolest e-cycle community in Bangalore!"
    },
    {
      id: "dQw4w9WgXcQ", // Replace with actual video ID
      title: "Why We Chose BCH Over Decathlon - Parent's Honest Review",
      channel: "BCH Main",
      views: "2.9M",
      likes: "78K",
      thumbnail: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
      description: "IT professional explains why he chose BCH's home test ride service for his daughter's first e-cycle."
    }
  ];

  const handleVideoClick = (videoId) => {
    setActiveVideo(videoId);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-50 border border-red-200 mb-6">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-bold text-red-600 uppercase tracking-wide">Real Stories from BCH Families</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-dark mb-4 tracking-wider uppercase">
            See Why 10,000+ Families<br />Trust BCH
          </h2>
          <p className="text-lg sm:text-xl text-gray-text max-w-3xl mx-auto mb-6">
            Watch real parents and kids share their BCH experience. These aren't actors - they're actual Bangalore families who chose BCH for their children's happiness.
          </p>

          {/* Social Proof Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-dark">750K</div>
                <div className="text-sm text-gray-text">Instagram Followers</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-dark">250K</div>
                <div className="text-sm text-gray-text">YouTube Subscribers</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-dark">4.7/5</div>
                <div className="text-sm text-gray-text">Google Rating</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop Only */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-primary items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-primary items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Videos Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-[20px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-primary flex-shrink-0 w-[320px] sm:w-[360px] snap-center"
                onClick={() => handleVideoClick(video.id)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl"
                    >
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Stats Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                      {video.views}
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {video.likes}
                    </div>
                  </div>
                </div>

                {/* Video Details */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-text">{video.channel}</span>
                  </div>

                  <h3 className="text-lg font-bold text-dark mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-text leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emotional Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-[30px] p-8 sm:p-12 my-12 border border-primary/20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">❤️</div>
            <h3 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
              "Your Childhood Had Limits.<br />Theirs Doesn't Have To."
            </h3>
            <p className="text-lg text-gray-text leading-relaxed mb-6">
              Every week, we witness fathers who grew up with struggles gift their children the joy they never had. Like Ramesh, an auto driver who told us: "I never owned a cycle. But my son will have the best e-cycle in Bangalore." That's the BCH promise - helping parents turn their love into their child's happiness.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md">
                <span className="text-2xl">🎁</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-dark">Free Gifts Worth ₹5,000</div>
                  <div className="text-xs text-gray-text">Helmet, Gloves, Knee Pads</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-md">
                <span className="text-2xl">💳</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-dark">0% EMI from ₹999/month</div>
                  <div className="text-xs text-gray-text">Make it affordable for every family</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-6">
            Join 10,000+ Happy Bangalore Families
          </h3>
          <p className="text-lg text-gray-text mb-8 max-w-2xl mx-auto">
            Book a home test ride now. Let our experts help your child find their perfect e-cycle. Our team will call you within 5 minutes of booking.
          </p>
          <motion.button
            onClick={() => onCTAClick && onCTAClick()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-primary rounded-[50px] shadow-2xl hover:bg-primary-dark transition-all duration-300 uppercase tracking-wide"
          >
            <span>Book Home Visit - ₹99</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
          <p className="text-sm text-gray-text mt-4 font-medium">
            ₹99 fully adjustable on purchase • We'll call you in 5 minutes • Bangalore only
          </p>
        </motion.div>
      </div>

      {/* Video Modal (Optional - for embedded playback) */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
