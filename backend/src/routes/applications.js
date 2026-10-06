import express from 'express';
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  exportApplicationsCSV,
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public apply endpoint is also directly accessible at POST /api/applications or POST /api/apply
router.post('/', submitApplication);

// Admin Protected routes
router.get('/', protect, getApplications);
router.get('/export/csv', protect, exportApplicationsCSV);
router.patch('/:id', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

export default router;
