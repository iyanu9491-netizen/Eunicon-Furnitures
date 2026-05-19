const { register, login, forgotPassword, resetPassword, changePassword, getProfile } = require("../controller/user");
const { Authentication } = require('../middlewares/auth')
const { registerValidator, resetPasswordValidator, changePasswordValidator } = require('../middlewares/validator');
const router = require('express').Router();


router.post('/register', registerValidator, register);
router.post('/login', login)
router.post('/forgot-password',forgotPassword)
router.put('/profile', Authentication, getProfile)
router.post('/reset-password', resetPasswordValidator, resetPassword)
router.post('/change-password',Authentication, changePasswordValidator, changePassword)

module.exports = router
