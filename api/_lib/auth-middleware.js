/**
 * Authentication Middleware
 *
 * Uses JWT tokens (no Firebase dependency).
 * Provides role-based access control (RBAC).
 */

import { verifyToken } from './jwt-auth.js';

/**
 * Extract Bearer token from Authorization header
 */
function extractToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader) return null;
  if (authHeader.startsWith('Bearer ')) return authHeader.substring(7);
  return authHeader;
}

/**
 * Verify user is authenticated. Returns decoded token or sends 401.
 */
async function requireAuth(req, res) {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Missing authentication token.'
      });
      return null;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    return decoded;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: error.message || 'Invalid or expired token'
    });
    return null;
  }
}

/**
 * Verify user is authenticated AND has admin role.
 */
async function requireAdmin(req, res) {
  const decoded = await requireAuth(req, res);
  if (!decoded) return null;

  if (!decoded.admin) {
    res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Admin access required.'
    });
    return null;
  }

  return decoded;
}

/**
 * Verify user has a specific role.
 */
async function requireRole(req, res, allowedRoles) {
  const decoded = await requireAuth(req, res);
  if (!decoded) return null;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (!decoded.role || !roles.includes(decoded.role)) {
    res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: `Required role: ${roles.join(' or ')}. Your role: ${decoded.role || 'none'}`
    });
    return null;
  }

  return decoded;
}

/**
 * Optional auth — verifies if token present, doesn't fail if missing.
 */
async function optionalAuth(req) {
  try {
    const token = extractToken(req);
    if (!token) return null;
    const decoded = verifyToken(token);
    req.user = decoded;
    return decoded;
  } catch {
    return null;
  }
}

function isAdmin(req) {
  return req.user && req.user.admin === true;
}

function hasRole(req, allowedRoles) {
  if (!req.user) return false;
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(req.user.role);
}

function getCurrentUserId(req) {
  return req.user ? req.user.uid : null;
}

/**
 * Set CORS headers
 */
function setCorsHeaders(res, options = {}) {
  const {
    allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5175'],
    methods = 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders = 'Content-Type, Authorization',
    credentials = true,
    requestOrigin
  } = options;

  let originToSet = requestOrigin || '*';
  if (originToSet === 'null' || !originToSet) originToSet = '*';

  res.setHeader('Access-Control-Allow-Origin', originToSet);
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', allowedHeaders);

  if (credentials && originToSet !== '*') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
}

/**
 * Handle OPTIONS preflight
 */
function handleCors(req, res) {
  setCorsHeaders(res, { requestOrigin: req.headers.origin });
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

export {
  requireAuth,
  requireAdmin,
  requireRole,
  optionalAuth,
  extractToken,
  isAdmin,
  hasRole,
  getCurrentUserId,
  setCorsHeaders,
  handleCors
};
