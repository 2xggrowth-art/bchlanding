/**
 * Authenticated API Utility
 *
 * JWT-based (no Firebase dependency).
 * Reads token from localStorage or provided getIdToken function.
 */

const TOKEN_KEY = 'bch_admin_token';

/**
 * Make an authenticated API request
 */
export async function authenticatedFetch(url, options = {}) {
  try {
    let idToken;

    if (options.getIdToken) {
      idToken = await options.getIdToken();
    } else {
      idToken = localStorage.getItem(TOKEN_KEY);
      if (!idToken) {
        throw new Error('User is not authenticated');
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
      ...options.headers
    };

    const fetchOptions = {
      method: options.method || 'GET',
      headers
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Authenticated API request failed:', error);
    throw error;
  }
}

/**
 * Admin API Service
 */
export class AdminAPI {
  constructor(getIdToken) {
    this.getIdToken = getIdToken;
  }

  async verifyAdmin() {
    return await authenticatedFetch('/api/admin/verify', {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

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

    const url = `/api/lead${queryParams.toString() ? `?${queryParams}` : ''}`;
    return await authenticatedFetch(url, {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  async getLead(leadId) {
    return await authenticatedFetch(`/api/lead/${leadId}`, {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  async updateLead(leadId, updates) {
    return await authenticatedFetch(`/api/lead/${leadId}`, {
      method: 'PATCH',
      body: updates,
      getIdToken: this.getIdToken
    });
  }

  async deleteLead(leadId) {
    return await authenticatedFetch(`/api/lead/${leadId}`, {
      method: 'DELETE',
      getIdToken: this.getIdToken
    });
  }

  async getAdminUsers() {
    return await authenticatedFetch('/api/admin/users', {
      method: 'GET',
      getIdToken: this.getIdToken
    });
  }

  async createAdminUser(userData) {
    return await authenticatedFetch('/api/admin/users', {
      method: 'POST',
      body: userData,
      getIdToken: this.getIdToken
    });
  }

  async setAdminRole(email, role = 'admin') {
    return await authenticatedFetch('/api/admin/set-admin-role', {
      method: 'POST',
      body: { email, role, isAdmin: true },
      getIdToken: this.getIdToken
    });
  }
}

export default { authenticatedFetch, AdminAPI };
