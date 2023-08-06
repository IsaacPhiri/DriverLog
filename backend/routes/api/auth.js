const express = require('express');
const router = express.Router();
const { signinDriver, signinAdmin } = require('../../controllers/authController');

router.post('/signin-driver', signinDriver);
router.post('/signin-admin', signinAdmin);

module.exports = router;