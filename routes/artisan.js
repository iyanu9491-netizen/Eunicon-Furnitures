const { createArtisan, artisanLogin, getArtisan, allArtisan, profession } = require('../controller/artisan');

const router = require('express').Router();

router.post('/registerArtisan', createArtisan )

router.post('/loginArtisan', artisanLogin)

router.post('/getArtisan', getArtisan)

router.get('/allArtisan', allArtisan)

router.get('/artisan/:profession', profession)

module.exports = router