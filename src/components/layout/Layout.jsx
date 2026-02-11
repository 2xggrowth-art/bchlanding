import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, headerTransparent = false, showFooter = true, onCTAClick }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full">
      <Header transparent={headerTransparent} onCTAClick={onCTAClick} />
      <main className={`flex-1 overflow-x-hidden ${headerTransparent ? '' : 'pt-[72px] sm:pt-[80px]'}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
