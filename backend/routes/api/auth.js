const express = require('express');
const router = express.Router();
const { signinDriver, signinAdmin, logoutDriver } = require('../../controllers/authController');

router.post('/signin-driver', signinDriver);
router.post('/signin-admin', signinAdmin);
router.post('/logout', logoutDriver);

module.exports = router;