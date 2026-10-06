import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getDbStatus } from '../config/db.js';
import { inMemoryStore, initInMemoryPasswords } from '../utils/seeder.js';

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET || 'csi_vcet_secret_key_2026', {
    expiresIn: '7d',
  });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    const { connected } = getDbStatus();
    let user = null;
    let isMatch = false;

    if (connected) {
      user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        isMatch = await user.matchPassword(password);
      }
    } else {
      await initInMemoryPasswords();
      const inMemUser = inMemoryStore.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (inMemUser) {
        user = inMemUser;
        isMatch = await bcrypt.compare(password, inMemUser.password);
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.',
      });
    }

    const token = generateToken(user._id || user.id, user.email, user.role);

    return res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        chapterDesignation: user.chapterDesignation,
      },
    });
  } catch (error) {
    console.error('[Login Controller Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
    dbStatus: getDbStatus(),
  });
};

export const getSystemHealth = async (req, res) => {
  return res.status(200).json({
    success: true,
    chapter: 'CSI VCET Student Chapter (Vidyavardhini College of Engineering and Technology)',
    status: 'ONLINE',
    timestamp: new Date().toISOString(),
    db: getDbStatus(),
  });
};
