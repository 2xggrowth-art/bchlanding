/**
 * Authenticated API Utility
 *
 * This module provides utilities for making authenticated API calls
 * to the backend with Firebase ID token
 *
 * Usage:
 * import { authenticatedFetch } from './utils/auth-api';
 *
 * const data = await authenticatedFetch('/api/leads', {
 *   method: 'GET',
 *   getIdToken: () => yourTokenGetter()
 * });
 */

import { auth } from '../config/firebase';

/**
 * Make an authenticated API request
 * Automatically includes Firebase ID token in Authorization header
 *
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @param {Function} options.getIdToken - Function to get ID token (from useAuth hook)
 * @param {string} options.method - HTTP method (GET, POST, etc.)
 * @param {Object} options.body - Request body (will be JSON stringified)
 * @param {Object} options.headers - Additional headers
 * @returns {Promise<any>} Response data
 * @throws {Error} If request fails or user is not authenticated
 */
export async function authenticatedFetch(url, options = {}) {
  try {
    // Get ID token
    let idToken;

    if (options.getIdToken) {
      // Use provided getIdToken function (from useAuth hook)
      idToken = await options.getIdToken();
    } else {
      // Fallback: Get token directly from Firebase auth
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('User is not authenticated');
      }
      idToken = await currentUser.getIdToken();
    }

    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
      ...options.headers
    };

    // Prepare fetch options
    const fetchOptions = {
      method: options.method || 'GET',
      headers
    };

    // Add body if provided (for POST, PATCH, etc.)
    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    // Make request
    const response = await fetch(url, fetchOptions);

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }

    return data;

  } catch (error) {
    console.error('❌ Authenticated API request failed:', error);
    throw error;
  }
}

/**
 * Admin API Service
 * Provides methods for common admin API operations
 */
export class AdminAPI {
  constructor(getIdToken) {
    this.getIdToken = getIdToken;
  }

  /**
   * Verify admin token
   */
  async verifyAdmin() {
    return await authenticatedFetch('/api/admin/verify', {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  /**
   * Get all leads with stats
   */
  async getLeads(filters = {}) {
    const queryParams = new URLSearchParams();

    if (filters.status) queryParams.append('status', filters.status);
    if (filters.leadStatus) queryParams.append('leadStatus', filters.leadStatus);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.fromDate) queryParams.append('fromDate', filters.fromDate);
    if (filters.toDate) queryParams.append('toDate', filters.toDate);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.cursor) queryParams.append('cursor', filters.cursor);
    if (filters.orderBy) queryParams.append('orderBy', filters.orderBy);
    if (filters.order) queryParams.append('order', filters.order);

    const url = `/api/leads${queryParams.toString() ? `?${queryParams}` : ''}`;

    return await authenticatedFetch(url, {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  /**
   * Get single lead by ID
   */
  async getLead(leadId) {
    return await authenticatedFetch(`/api/leads/${leadId}`, {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  /**
   * Update lead
   */
  async updateLead(leadId, updates) {
    return await authenticatedFetch(`/api/leads/${leadId}`, {
      method: 'PATCH',
      body: updates,
      getIdToken: this.getIdToken
    });
  }

  /**
   * Delete lead
   */
  async deleteLead(leadId) {
    return await authenticatedFetch(`/api/leads/${leadId}`, {
      method: 'DELETE',
      getIdToken: this.getIdToken
    });
  }

  /**
   * Get all admin users (super admin only)
   */
  async getAdminUsers() {
    return await authenticatedFetch('/api/admin/users', {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  /**
   * Create new admin user (super admin only)
   */
  async createAdminUser(userData) {
    return await authenticatedFetch('/api/admin/users', {
      method: 'POST',
      body: userData,
      getIdToken: this.getIdToken
    });
  }

  /**
   * Set admin role for user (super admin only)
   */
  async setAdminRole(email, role = 'admin') {
    return await authenticatedFetch('/api/admin/set-admin-role', {
      method: 'POST',
      body: { email, role, isAdmin: true },
      getIdToken: this.getIdToken
    });
  }
}

/**
 * React Hook: useAdminAPI
 * Use this in components to get an AdminAPI instance
 *
 * @example
 * import { useAdminAPI } from './utils/auth-api';
 *
 * function MyComponent() {
 *   const adminAPI = useAdminAPI();
 *
 *   const loadLeads = async () => {
 *     const data = await adminAPI.getLeads();
 *     console.log(data.leads);
 *   };
 * }
 */
export function useAdminAPI() {
  // This needs to be used inside a component with useAuth
  // Import useAuth from AuthContext
  const { getIdToken } = require('../contexts/AuthContext').useAuth();
  return new AdminAPI(getIdToken);
}

export default {
  authenticatedFetch,
  AdminAPI,
  useAdminAPI
};
