import express from 'express';
import { loginUser, getMe, getSystemHealth } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/health', getSystemHealth);

export default router;
