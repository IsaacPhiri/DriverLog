const express = require('express');
const router = express.Router();
const { getAdmin, getAdmins, createAdmin, updateAdmin, deleteAdmin } = require('../../controllers/adminController');
const protect = require('../../middleware/authMiddleware');

// routes
router.get('/', protect, getAdmins);
router.post('/create-admin', createAdmin);
router.route('/:id').put(updateAdmin).delete(deleteAdmin);
router.get('/me', protect, getAdmin);

module.exports = router;