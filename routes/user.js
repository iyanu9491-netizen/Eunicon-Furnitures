const { register, login, forgotPassword } = require("../controller/user");
const { Authentication } = require('../middlewares/auth')
const { registerValidator } = require('../middlewares/validator');
const router = require('express').Router();


router.post('/register', registerValidator, register);
router.post('/login', login)
router.post('/forgot-password',forgotPassword)
module.exports = router
