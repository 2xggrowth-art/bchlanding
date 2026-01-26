import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import MainLandingPage from './pages/MainLandingPage';
import TestRideLandingPage from './pages/TestRideLandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import AdminPanel from './AdminPanel';
import './index.css';

function App() {
  return (
    <BrowserRouter>
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
        <Route
          path="*"
          element={
            <Layout>
              <MainLandingPage />
            </Layout>
          }
        />
      </Routes>
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
