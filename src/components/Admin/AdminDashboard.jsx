import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { AdminAPI } from '../../utils/auth-api';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, paid: 0, unpaid: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    paymentStatus: 'all',      // all, paid, unpaid
    category: 'all',           // all, Contact, Test Ride, EMI, Exchange, General
    fromDate: '',              // Date string (YYYY-MM-DD)
    toDate: ''                 // Date string (YYYY-MM-DD)
  });
  const [error, setError] = useState(null);

  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { user, logout, getIdToken } = useAuth();
  const adminAPI = new AdminAPI(getIdToken);

  useEffect(() => {
    fetchLeads(true); // Initial load
  }, []);

  // Refetch when filters change
  // Refetch when filters change
  useEffect(() => {
    fetchLeads(true);
  }, [filters]);

  const fetchLeads = async (isReset = false) => {
    try {
      if (isReset) {
        setLoading(true);
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      // Build filter object for API
      const apiFilters = {
        limit: 20 // Fetch 20 at a time
      };

      if (!isReset && nextCursor) {
        apiFilters.cursor = nextCursor;
      }

      if (filters.paymentStatus !== 'all') {
        apiFilters.status = filters.paymentStatus.toUpperCase();
      }
      if (filters.category !== 'all') {
        apiFilters.category = filters.category;
      }
      if (filters.fromDate) {
        apiFilters.fromDate = filters.fromDate;
      }
      if (filters.toDate) {
        apiFilters.toDate = filters.toDate;
      }

      const response = await adminAPI.getLeads(apiFilters);

      if (response.success) {
        const newLeads = response.leads || [];

        if (isReset) {
          setLeads(newLeads);
        } else {
          setLeads(prev => [...prev, ...newLeads]);
        }

        setNextCursor(response.nextCursor);
        setHasMore(!!response.nextCursor && newLeads.length > 0);

        // Always update stats
        if (response.stats) {
          setStats(response.stats);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching leads:', error);
      setError(error.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDeleteLead = async (leadId, leadName) => {
    if (!window.confirm(`Are you sure you want to delete the lead for "${leadName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await adminAPI.deleteLead(leadId);
      if (response.success) {
        // Refresh leads list
        // Refresh leads list
        await fetchLeads(true);
        console.log(`✅ Lead deleted: ${leadId}`);
      }
    } catch (error) {
      console.error('❌ Error deleting lead:', error);
      setError(error.message || 'Failed to delete lead');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      'PAID': 'bg-green-100 text-green-800 border-green-300',
      'UNPAID': 'bg-orange-100 text-orange-800 border-orange-300',
      'PENDING': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'FAILED': 'bg-red-100 text-red-800 border-red-300'
    };

    return badges[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getCategoryBadge = (category) => {
    const badges = {
      'Test Ride': {
        classes: 'bg-blue-100 text-blue-800 border-blue-300',
        label: 'TEST RIDE'
      },
      '99 Offer': {
        classes: 'bg-blue-100 text-blue-800 border-blue-300',
        label: 'TEST RIDE'
      },
      'Contact': {
        classes: 'bg-red-100 text-red-800 border-red-400',
        label: 'CONTACT'
      },
      'EMI': {
        classes: 'bg-green-100 text-green-800 border-green-300',
        label: 'EMI'
      },
      'Exchange': {
        classes: 'bg-purple-100 text-purple-800 border-purple-300',
        label: 'EXCHANGE'
      },
      'General': {
        classes: 'bg-gray-100 text-gray-800 border-gray-300',
        label: 'GENERAL'
      }
    };

    // If source is test-ride-landing, always treat as Test Ride for visual consistency
    const effectiveCategory = (category === 'General' || !category) &&
      (arguments[1]?.source === 'test-ride-landing') // We'll pass lead object as 2nd arg
      ? 'Test Ride'
      : category;

    const badge = badges[effectiveCategory] || badges[category] || badges['General'];

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${badge.classes}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-bg">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-normal text-dark uppercase tracking-wider">
                CRM Dashboard
              </h1>
              <p className="text-sm text-gray-text mt-1">
                Welcome, {user?.displayName || user?.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 font-bold text-sm uppercase tracking-wide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[20px] flex items-center gap-3"
          >
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-bold text-red-800">Error loading data</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[20px] p-6 border-l-4 border-primary shadow-sm"
          >
            <div className="text-sm font-bold text-gray-text uppercase tracking-wide mb-2">Total Leads</div>
            <div className="text-3xl font-display text-dark">{stats.total}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[20px] p-6 border-l-4 border-green-500 shadow-sm"
          >
            <div className="text-sm font-bold text-gray-text uppercase tracking-wide mb-2">Paid</div>
            <div className="text-3xl font-display text-green-600">{stats.paid}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[20px] p-6 border-l-4 border-orange-500 shadow-sm"
          >
            <div className="text-sm font-bold text-gray-text uppercase tracking-wide mb-2">Unpaid</div>
            <div className="text-3xl font-display text-orange-600">{stats.unpaid}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[20px] p-6 border-l-4 border-blue-500 shadow-sm"
          >
            <div className="text-sm font-bold text-gray-text uppercase tracking-wide mb-2">Revenue</div>
            <div className="text-3xl font-display text-blue-600">₹{stats.revenueInRupees || 0}</div>
          </motion.div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-[20px] p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-dark uppercase tracking-wide">Filters</h3>
            <button
              onClick={() => setFilters({ paymentStatus: 'all', category: 'all', fromDate: '', toDate: '' })}
              className="text-sm text-primary hover:underline font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Row 1: Payment Status Pills */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setFilters({ ...filters, paymentStatus: 'all' })}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${filters.paymentStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-text hover:bg-gray-200'
                }`}
            >
              All ({stats.total || 0})
            </button>
            <button
              onClick={() => setFilters({ ...filters, paymentStatus: 'paid' })}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${filters.paymentStatus === 'paid'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-text hover:bg-gray-200'
                }`}
            >
              Paid ({stats.paid || 0})
            </button>
            <button
              onClick={() => setFilters({ ...filters, paymentStatus: 'unpaid' })}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all ${filters.paymentStatus === 'unpaid'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-text hover:bg-gray-200'
                }`}
            >
              Unpaid ({stats.unpaid || 0})
            </button>
            <button
              onClick={() => fetchLeads(true)}
              disabled={loading}
              className="ml-auto px-4 py-2 rounded-full bg-dark text-white font-bold text-sm uppercase tracking-wide hover:bg-dark/90 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Row 2: Category Dropdown + Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
              >
                <option value="all">All Categories</option>
                <option value="Test Ride">Test Ride</option>
                <option value="Contact">Contact</option>
                <option value="EMI">EMI Inquiry</option>
                <option value="Exchange">Exchange</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                From Date
              </label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-xs font-bold text-gray-text uppercase tracking-wide mb-2">
                To Date
              </label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                className="w-full px-4 py-2 rounded-full border-2 border-dark/10 focus:border-primary focus:outline-none text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
          {loading && leads.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-text font-medium">Loading leads...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-text mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-text font-medium">No leads found</p>
              <p className="text-sm text-gray-text mt-2">
                {filters.paymentStatus !== 'all' || filters.category !== 'all' ? 'Try changing the filters' : 'Leads will appear here once customers book test rides'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-bg border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Source</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Requirements</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-dark uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-dark uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead, index) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`
                        hover:bg-gray-50 transition-colors duration-200
                        ${lead.category === 'Test Ride' || lead.category === '99 Offer' ? 'bg-blue-50/30 border-l-4 border-blue-500' : ''}
                        ${lead.category === 'Contact' ? 'bg-red-50/30 border-l-4 border-red-500' : ''}
                      `}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-text">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-dark">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 group"
                        >
                          <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          {lead.phone}
                        </a>
                      </td>
                      {/* Category Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(lead.category || 'General', lead)}
                      </td>
                      {/* Source Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-text">
                          {lead.source || 'unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {lead.quizAnswers && Object.entries(lead.quizAnswers).map(([key, value]) => (
                            <span
                              key={key}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-dark/5 text-dark border border-dark/10"
                            >
                              {value}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {lead.payment?.transactionId ? (
                          <span className="font-mono text-xs text-gray-600">
                            {lead.payment.transactionId.substring(0, 12)}...
                          </span>
                        ) : (
                          <span className="text-gray-text italic">No payment</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusBadge(lead.payment?.status || 'UNPAID')
                          }`}>
                          {lead.payment?.status || 'UNPAID'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDeleteLead(lead.id, lead.name)}
                          disabled={loading}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 disabled:opacity-50"
                          title="Delete Lead"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && leads.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchLeads(false)}
              disabled={loadingMore}
              className="px-6 py-3 rounded-full bg-white border border-gray-200 text-dark font-bold text-sm uppercase tracking-wide hover:bg-gray-50 hover:border-primary transition-all duration-300 shadow-sm flex items-center gap-2"
            >
              {loadingMore ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                  Loading More...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Load More Leads
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-text">
          <p>Showing {leads.length} lead{leads.length !== 1 ? 's' : ''}</p>
          <p className="mt-2">
            🔒 Secured with Firebase Authentication
          </p>
        </div>
      </div>
    </div>
  );
}
