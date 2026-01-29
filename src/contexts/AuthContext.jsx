/**
 * Authentication Context Provider
 *
 * JWT-based authentication (no Firebase dependency).
 * Token stored in localStorage for persistence.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const TOKEN_KEY = 'bch_admin_token';
const USER_KEY = 'bch_admin_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    const restore = async () => {
      try {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (savedToken && savedUser) {
          // Verify token is still valid with backend
          const response = await fetch('/api/admin/verify', {
            headers: { 'Authorization': `Bearer ${savedToken}` }
          });

          if (response.ok) {
            const data = await response.json();
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIdToken(savedToken);
            setIsAdmin(data.admin || userData.admin || false);
          } else {
            // Token expired or invalid
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
          }
        }
      } catch (err) {
        console.error('Session restore failed:', err);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  /**
   * Login with email and password
   */
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      // Store in state and localStorage
      setUser(data.user);
      setIdToken(data.token);
      setIsAdmin(data.user.admin || false);

      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      return { success: true, user: data.user, token: data.token };
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      setUser(null);
      setIdToken(null);
      setIsAdmin(false);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  /**
   * Get current ID token (for API calls)
   */
  const getIdToken = async () => {
    return idToken || localStorage.getItem(TOKEN_KEY);
  };

  /**
   * Refresh claims (no-op for JWT — re-verify with backend)
   */
  const refreshClaims = async () => {
    try {
      const token = idToken || localStorage.getItem(TOKEN_KEY);
      if (!token) return;

      const response = await fetch('/api/admin/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.admin || false);
      }
    } catch (err) {
      console.error('Failed to refresh claims:', err);
    }
  };

  const value = {
    user,
    loading,
    error,
    idToken,
    isAdmin,
    login,
    logout,
    getIdToken,
    refreshClaims
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
