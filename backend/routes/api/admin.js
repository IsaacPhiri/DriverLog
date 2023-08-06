const express = require('express');
const router = express.Router();
const { getAdmin, getAdmins, createAdmin, updateAdmin, deleteAdmin } = require('../../controllers/adminController');

// routes
router.get('/', getAdmins);
router.post('/create-admin', createAdmin);
router.route('/:id').get(getAdmin).put(updateAdmin).delete(deleteAdmin);

module.exports = router;