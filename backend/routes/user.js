const express = require('express');
const router = express.Router();
const { googleLogin } = require('../controllers/userController');
// import { loginUser, signupUser } from '../controllers/userController';


const { signupUser, loginUser } = require('../controllers/userController');

//login
router.post('/login', loginUser);

//signup
router.post('/signup', signupUser);

router.post('/google', googleLogin);

module.exports = router;