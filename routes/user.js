const { register } = require("../controller/user");
const router = require('express').Router();


router.post('/register', register);

router.put('/profile', register);

module.exports = router