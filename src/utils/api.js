// API utilities for lead management

// Use local backend in development, Vercel in production
const API_BASE_URL = '/api';

export const api = {
  // Save a new lead
  async saveLead(leadData) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          category: leadData.category || 'General',
          source: leadData.source || 'unknown'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save lead');
      }

      const result = await response.json();
      return {
        id: result.leadId,
        ...leadData,
        createdAt: result.lead?.createdAt || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error saving lead:', error);
      throw error;
    }
  },

  // Update lead payment status
  async updatePaymentStatus(leadId, paymentData) {
    try {
      // For now, just return success
      // In production, this would update Firestore via backend API
      console.log('Updating payment status:', { leadId, paymentData });
      return {
        success: true,
        leadId,
        ...paymentData
      };
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },

  // Update an existing lead
  async updateLead(leadId, leadData) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update lead');
      }

      const result = await response.json();
      return result.lead;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },

  // Get all leads (admin only)
  async getLeads(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/leads`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const result = await response.json();
      return result.leads || [];
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }
};
