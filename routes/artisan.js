const { createArtisan, artisanLogin, getArtisan } = require('../controller/artisan');

const router = require('express').Router();

router.post('/registerArtisan', createArtisan )

router.post('/loginArtisan', artisanLogin)

router.post('/getArtisan', getArtisan)

module.exports = router