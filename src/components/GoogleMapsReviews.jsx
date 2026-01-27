
import { motion } from 'framer-motion';

export default function GoogleMapsReviews() {
    const reviews = [
        {
            name: "Rahul Sharma",
            rating: 5,
            date: "2 months ago",
            text: "Bought the EM Doodle for my son. The home test ride service was a game changer! The technician explained everything clearly. Highly recommended!",
            image: "https://lh3.googleusercontent.com/a-/ALV-UjWab-j...=s120-c-rp-mo-br100" // Placeholder or generic
        },
        {
            name: "Priya Gowda",
            rating: 5,
            date: "1 month ago",
            text: "Excellent service by Bharath Cycle Hub. We visited the store in HSR Layout and were impressed by the collection. We eventually booked the home delivery.",
            image: "https://lh3.googleusercontent.com/a-/ALV-UjX...=s120-c-rp-mo-br100"
        },
        {
            name: "Vikram Singh",
            rating: 5,
            date: "3 weeks ago",
            text: "Was skeptical about buying an e-cycle online, but the physical store presence gave me confidence. Great after-sales support too.",
            image: "https://lh3.googleusercontent.com/a-/ALV-UjY...=s120-c-rp-mo-br100"
        }
    ];

    return (
        <section className="py-16 sm:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm uppercase mb-4">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Visit Our Experience Center
                    </div>
                    <h2 className="font-display text-4xl sm:text-5xl font-normal text-dark mb-4">
                        Bangalore's Most Trusted<br />E-Cycle Store
                    </h2>
                    <p className="text-gray-text text-lg max-w-2xl mx-auto">
                        Experience our premium collection in person at our HSR Layout store, or book a home visit. Rated 4.9/5 by 500+ happy parents.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Reviews Section */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-dark">4.9/5</div>
                                <div className="text-gray-text">Based on 500+ Google Reviews</div>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-8 h-8 ml-auto" />
                        </motion.div>

                        <div className="space-y-4">
                            {reviews.map((review, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-50 p-6 rounded-2xl border border-gray-100"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-dark">{review.name}</h4>
                                                <div className="text-xs text-gray-400">{review.date}</div>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full block text-center py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            See All Reviews on Google
                        </motion.a>
                    </div>
                </div>
            </div>
        </section>
    );
}
