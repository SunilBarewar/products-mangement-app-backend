const { registerUser, loginUser } = require('../Controllers/authController');

const router = require('express').Router();

router.post('/register',registerUser)
router.post('/login',loginUser)

module.exports = router