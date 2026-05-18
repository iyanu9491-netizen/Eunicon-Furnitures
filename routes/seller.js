const { registerSeller, loginSeller } = require("../controller/seller");
const router = require('express').Router();

router.post('/registerSeller', registerSeller)

router.post('/loginSeller', loginSeller)

module.exports = router