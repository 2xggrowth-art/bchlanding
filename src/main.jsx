import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import { PageSkeleton } from './components/Skeleton';
import './index.css';

// Lazy load pages for code splitting
const MainLandingPage = lazy(() => import('./pages/MainLandingPage'));
const TestRideLandingPage = lazy(() => import('./pages/TestRideLandingPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const AdminPanel = lazy(() => import('./AdminPanel'));

// Skeleton-based loading (replaces spinner)
const PageLoader = () => <PageSkeleton />;

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Landing Page */}
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <Layout headerTransparent={true}>
                <PageTransition><MainLandingPage /></PageTransition>
              </Layout>
            }
          />

          {/* Test Ride Landing Page - New URL */}
          <Route
            path="/test-ride/*"
            element={
              <Layout headerTransparent showFooter>
                <PageTransition><TestRideLandingPage /></PageTransition>
              </Layout>
            }
          />

          {/* Products Catalog Page */}
          <Route
            path="/products"
            element={
              <Layout headerTransparent>
                <PageTransition><ProductsPage /></PageTransition>
              </Layout>
            }
          />

          {/* Product Detail Page */}
          <Route
            path="/products/:productId"
            element={
              <Layout>
                <PageTransition><ProductDetailPage /></PageTransition>
              </Layout>
            }
          />

          {/* Redirect old URL to new URL */}
          <Route
            path="/test-5-get-1/*"
            element={<Navigate to="/test-ride" replace />}
          />

          {/* Legal Pages */}
          <Route
            path="/privacy-policy"
            element={
              <Layout>
                <PageTransition><PrivacyPolicy /></PageTransition>
              </Layout>
            }
          />
          <Route
            path="/terms"
            element={
              <Layout>
                <PageTransition><Terms /></PageTransition>
              </Layout>
            }
          />
          <Route
            path="/disclaimer"
            element={
              <Layout>
                <PageTransition><Disclaimer /></PageTransition>
              </Layout>
            }
          />

          {/* Admin Panel - no layout */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* 404 - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
