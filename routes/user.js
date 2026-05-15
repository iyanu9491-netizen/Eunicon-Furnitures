const { register } = require("../controller/user");
const router = require('express').Router();


router.post('/register', register);

module.exports = router