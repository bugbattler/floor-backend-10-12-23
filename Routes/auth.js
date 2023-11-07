const express = require('express');
const { signup, signin ,requireSignin, updateUser, updatePassword} = require('../Controllers/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../Validator/auth');
const router = express.Router();
router.post('/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/signin',validateSigninRequest, isRequestValidated, signin);
module.exports = router;