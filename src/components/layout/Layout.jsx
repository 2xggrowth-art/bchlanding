import Header from './Header';
import Footer from './Footer';
import TrustStrip from '../TrustStrip';
import FloatingWhatsApp from '../FloatingWhatsApp';
import BottomNav from '../BottomNav';
import CookieConsent from '../CookieConsent';
import TopProgressBar from '../TopProgressBar';
import ExitIntentPopup from '../ExitIntentPopup';
import PageViewTracker from '../PageViewTracker';

export default function Layout({ children, headerTransparent = false, showFooter = true, onCTAClick }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <PageViewTracker />
      <TopProgressBar />
      <Header transparent={headerTransparent} onCTAClick={onCTAClick} />
      {!headerTransparent && <TrustStrip />}
      <main className={`flex-1 overflow-x-hidden ${headerTransparent ? '' : 'pt-[72px] sm:pt-[80px]'}`}>
        {children}
      </main>
      {showFooter && <Footer />}
      <FloatingWhatsApp />
      <BottomNav />
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
}
