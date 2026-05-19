const { sendMessage, getArtisanMessages } = require('../controller/message');
const { Authentication } = require('../middlewares/auth');
const router = require('express').Router()

router.post('/message/:artisanId', Authentication, sendMessage);

router.get('/getMessage', Authentication, getArtisanMessages)

module.exports = router