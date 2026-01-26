import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, headerTransparent = false, showFooter = true, onCTAClick }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={headerTransparent} onCTAClick={onCTAClick} />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
