import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { inMemoryStore } from '../utils/seeder.js';
import { getDbStatus } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'csi_vcet_secret_key_2026');

      const { connected } = getDbStatus();

      if (connected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback to in-memory store
        const found = inMemoryStore.users.find(
          (u) => u._id === decoded.id || u.id === decoded.id || u.email === decoded.email
        );
        if (found) {
          const { password, ...safeUser } = found;
          req.user = safeUser;
        }
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user profile not found',
        });
      }

      next();
    } catch (error) {
      console.error('[Auth Error]', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token invalid or expired',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no bearer or query token provided',
    });
  }
};
