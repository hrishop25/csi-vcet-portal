import express from 'express';
import { getMembers, createMember } from '../controllers/memberController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getMembers);
router.post('/', protect, createMember);

export default router;
