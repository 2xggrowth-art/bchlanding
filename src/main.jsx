import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
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

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <Layout>
                <MainLandingPage />
              </Layout>
            }
          />

          {/* Test Ride Landing Page - New URL */}
          <Route
            path="/test-ride/*"
            element={
              <Layout headerTransparent showFooter>
                <TestRideLandingPage />
              </Layout>
            }
          />

          {/* Products Catalog Page */}
          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />

          {/* Product Detail Page */}
          <Route
            path="/products/:productId"
            element={
              <Layout>
                <ProductDetailPage />
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
                <PrivacyPolicy />
              </Layout>
            }
          />
          <Route
            path="/terms"
            element={
              <Layout>
                <Terms />
              </Layout>
            }
          />
          <Route
            path="/disclaimer"
            element={
              <Layout>
                <Disclaimer />
              </Layout>
            }
          />

          {/* Admin Panel - no layout */}
          <Route path="/admin" element={<AdminPanel />} />

          {/* 404 - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
