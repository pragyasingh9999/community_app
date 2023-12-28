const express = require('express');
const router = express.Router();

const handleUserLogin = require('../controller/authController/login');
const handleSignUpUser = require('../controller/authController/signup');
const handleReturnUserInfo = require('../controller/authController/userinfo');

router.route('/signup')
    .post(handleSignUpUser);

router.route('/signin')
    .get(handleUserLogin);

router.route('/me')
    .get(handleReturnUserInfo);

module.exports = router;