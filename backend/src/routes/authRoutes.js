import express from 'express';
import {
  getMe,
  getUsersForAdmin,
  signin,
  signup,
  updateUserRole
} from '../controllers/authController.js';
import { allowRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', protect, getMe);
router.get('/admin/users', protect, allowRoles('admin'), getUsersForAdmin);
router.patch('/admin/users/:id/role', protect, allowRoles('admin'), updateUserRole);

export default router;
