import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import GoogleMapsReviews from '../components/GoogleMapsReviews';
import BicycleInsurance from '../components/BicycleInsurance';
import ScreenTimeReplacement from '../components/ScreenTimeReplacement';
import ProcessVideo from '../components/ProcessVideo';
import Accessories from '../components/Accessories';
import Community from '../components/Community';
import CustomerProfiles from '../components/CustomerProfiles';
import CTAButton from '../components/CTAButton';
import { api } from '../utils/api';

export default function TestRideLandingPage({ onCTAClick: externalCTAClick }) {
  const [currentStage, setCurrentStage] = useState('landing'); // landing, quiz, expertPromise, userdata, payment, success
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [userData, setUserData] = useState(null);
  const [leadId, setLeadId] = useState(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [ctaSource, setCtaSource] = useState(null);
  const heroRef = useRef(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('open') === 'true') {
      handleStartQuiz('direct-nav');
    }
  }, [searchParams]);

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

      {/* Phase 2: Process Video - How Home Test Ride Works */}
      <ProcessVideo onCTAClick={() => handleStartQuiz('test-ride-process')} />

      {/* <ProductShowcase onCTAClick={() => handleStartQuiz('test-ride-products')} /> */}

      {/* Phase 2: Screen Time Replacement */}
      <ScreenTimeReplacement />

      {/* Phase 3: Accessories */}
      <Accessories onCTAClick={() => handleStartQuiz('test-ride-accessories')} />

      {/* <VideoTestimonials onCTAClick={() => handleStartQuiz('test-ride-videos')} /> */}
      <ValueProposition />

      {/* <Offers onCTAClick={() => handleStartQuiz('test-ride-offers')} /> */}
      <WhyUs />

      {/* Phase 3: Community */}
      <Community onCTAClick={() => handleStartQuiz('test-ride-community')} />

      {/* Phase 3: Customer Profiles */}
      {/* <CustomerProfiles /> */}

      {/* Phase 2: Google Maps & Reviews */}
      {/* <GoogleMapsReviews /> */}

      {/* Phase 2: Insurance */}
      {/* <BicycleInsurance onCTAClick={() => handleStartQuiz('test-ride-insurance')} /> */}

      {/* <HowItWorks /> */}
      {/* <Testimonials /> */}
      <SocialProof onCTAClick={() => handleStartQuiz('test-ride-final-cta')} />
      <FAQ />

      {/* Sticky mobile CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden safe-bottom">
          <div className="bg-white border-t border-gray-200 shadow-2xl px-4 py-3 flex justify-center">
            <CTAButton
              onClick={() => handleStartQuiz('test-ride-sticky-cta')}
              className="w-full"
            >
              BOOK NOW
            </CTAButton>
          </div>
          <p className="text-center text-xs text-gray-text mt-2 font-medium">
            ₹99 BOOKING FEE • ADJUSTABLE ON PURCHASE
          </p>
        </div>
      )}
    </div>
  );
}
