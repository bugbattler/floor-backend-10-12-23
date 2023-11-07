const express = require('express');
const { signup, signin ,requireSignin, getUser} = require('../../Controllers/Admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../Validator/auth');
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);
router.get('/admin/get', getUser);

module.exports = router;