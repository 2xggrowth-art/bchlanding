/**
 * Lightweight visitor tracking utility
 * Sends events to /api/analytics/visitor via sendBeacon (non-blocking)
 */

// Generate a session-stable visitor ID
function getVisitorId() {
  let id = sessionStorage.getItem('bch_visitor_id');
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    sessionStorage.setItem('bch_visitor_id', id);
  }
  return id;
}

/**
 * Track a visitor event
 * @param {string} action - page_view | popup_shown | whatsapp_click | call_click | dismiss
 * @param {string} page - Page pathname
 * @param {Object} [extra] - Optional extra data
 */
export function trackVisitor(action, page, extra = {}) {
  try {
    const payload = {
      visitorId: getVisitorId(),
      action,
      page: page || '/',
      referrer: document.referrer || null,
      screenWidth: window.innerWidth,
      ...extra
    };

    navigator.sendBeacon(
      '/api/analytics/visitor',
      JSON.stringify(payload)
    );
  } catch (_) {
    // Silent fail — tracking should never break UX
  }
}
