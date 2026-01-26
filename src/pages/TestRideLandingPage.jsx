import { useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero';
import BrandsMarquee from '../components/BrandsMarquee';
import ProductShowcase from '../components/ProductShowcase';
import VideoTestimonials from '../components/VideoTestimonials';
import Offers from '../components/Offers';
import WhyUs from '../components/WhyUs';
import ValueProposition from '../components/ValueProposition';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import QuizContainer from '../components/Quiz/QuizContainer';
import ExpertPromise from '../components/ExpertPromise';
import UserDataForm from '../components/UserDataForm';
import RazorpayPayment from '../components/RazorpayPayment';
import SuccessScreen from '../components/SuccessScreen';
import { api } from '../utils/api';

export default function TestRideLandingPage({ onCTAClick: externalCTAClick }) {
  const [currentStage, setCurrentStage] = useState('landing'); // landing, quiz, expertPromise, userdata, payment, success
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [userData, setUserData] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [ctaSource, setCtaSource] = useState(null);
  const heroRef = useRef(null);

  // Sticky CTA visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && currentStage === 'landing') {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowStickyCTA(heroBottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStage]);

  const handleStartQuiz = (source = 'test-ride-landing') => {
    setCtaSource(source);
    setCurrentStage('userdata');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Expose handleStartQuiz to parent via callback
  useEffect(() => {
    if (externalCTAClick) {
      // This allows the header to trigger the quiz
    }
  }, [externalCTAClick]);

  const handleQuizComplete = async (answers) => {
    setQuizAnswers(answers);

    // Update lead with quiz answers
    if (leadId) {
      try {
        await api.updateLead(leadId, {
          quizAnswers: answers,
          updatedAt: new Date().toISOString()
        });
        console.log('✅ Lead updated successfully with quiz answers:', leadId, answers);
      } catch (error) {
        console.error('❌ Error updating lead with quiz answers:', error);
        // We continue anyway even if update fails, to not block the user
      }
    } else {
      console.warn('⚠️ No leadId found, cannot update lead with quiz answers');
    }

    // Progress to payment
    setCurrentStage('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToUserData = () => {
    setCurrentStage('userdata');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserDataSubmit = async (data) => {
    setUserData(data);

    // If lead already exists, update it instead of creating a new one
    if (leadId) {
      try {
        await api.updateLead(leadId, {
          name: data.name,
          phone: data.phone,
          updatedAt: new Date().toISOString()
        });
        console.log('✅ Lead updated with new contact info:', leadId);
      } catch (error) {
        console.error('❌ Error updating lead info:', error);
      }
    } else {
      // Create lead immediately after contact info is submitted
      try {
        const lead = await api.saveLead({
          name: data.name,
          phone: data.phone,
          category: 'Test Ride',
          source: ctaSource || 'test-ride-landing'
        });
        setLeadId(lead.id);
        console.log('✅ Lead created early:', lead.id, lead);
      } catch (error) {
        console.error('❌ Error creating lead early:', error);
      }
    }

    setCurrentStage('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);

    // Track Google Ads conversion
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-11326000229/O5i-CNWt6-kbEOWY1Jgq',
        'transaction_id': paymentData.paymentId || '',
        'value': 99.0,
        'currency': 'INR'
      });
      console.log('Google Ads conversion tracked:', paymentData.paymentId);
    }

    // Track Google Tag Manager purchase success event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'purchase_success'
    });
    console.log('GTM purchase_success event tracked');

    setCurrentStage('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    alert('Payment failed: ' + error.description + '. Please try again.');
  };

  const handleBackToLanding = () => {
    setCurrentStage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render success screen as full page replacement (optional, but keeps it clean)
  if (currentStage === 'success') {
    return <SuccessScreen userData={userData} />;
  }

  // Landing page (with layout) - Quiz shows as overlay on top
  return (
    <div className="relative">
      {/* Modal Overlays */}
      {currentStage === 'expertPromise' && (
        <ExpertPromise
          quizAnswers={quizAnswers}
          onContinue={handleContinueToUserData}
        />
      )}

      {currentStage === 'userdata' && (
        <UserDataForm
          onSubmit={handleUserDataSubmit}
          onBack={() => setCurrentStage('landing')}
          skipConfirmation={true}
          submitLabel="Continue"
          stepLabel="Step 1 of 3"
        />
      )}

      {currentStage === 'quiz' && (
        <QuizContainer
          onComplete={handleQuizComplete}
          onBack={() => setCurrentStage('userdata')}
        />
      )}

      {currentStage === 'payment' && (
        <RazorpayPayment
          userData={userData}
          quizAnswers={quizAnswers}
          leadId={leadId}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onBack={() => setCurrentStage('quiz')}
          onCancel={() => setCurrentStage('landing')}
        />
      )}
      {/* Main landing sections */}
      <div ref={heroRef}>
        <Hero onCTAClick={() => handleStartQuiz('test-ride-hero')} />
      </div>
      <BrandsMarquee />
      <ProductShowcase onCTAClick={() => handleStartQuiz('test-ride-products')} />
      <VideoTestimonials onCTAClick={() => handleStartQuiz('test-ride-videos')} />
      <ValueProposition />
      {/* <Offers onCTAClick={() => handleStartQuiz('test-ride-offers')} /> */}
      <WhyUs />
      <HowItWorks />
      <Testimonials />
      <SocialProof />
      <FAQ />

      {/* Final CTA section - Full width red */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-primary relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-6 tracking-wider uppercase">
            Give Your Child Their Dream E-Cycle
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book your expert home visit now. Our team will call you within 5 minutes of booking. Join 10,000+ happy Bangalore families today.
          </p>
          <button
            onClick={() => handleStartQuiz('test-ride-final-cta')}
            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-primary bg-white rounded-[50px] shadow-2xl hover:bg-gray-bg transition-all duration-300 hover:scale-105 uppercase tracking-wide"
          >
            <span>BOOK NOW - ONLY ₹99</span>
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden safe-bottom">
          <div className="bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
            <button
              onClick={() => handleStartQuiz('test-ride-sticky-cta')}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-white bg-primary rounded-[50px] shadow-lg hover:bg-primary-dark active:scale-95 transition-all duration-300 uppercase tracking-wide"
            >
              <span>BOOK NOW</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <p className="text-center text-xs text-gray-text mt-2 font-medium">
              ₹99 BOOKING FEE • ADJUSTABLE ON PURCHASE
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
