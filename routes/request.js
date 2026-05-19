const { createRequest } = require('../controller/request');
const { Authentication } = require('../middlewares/auth');
const router = require('express').Router()

router.post('/request', Authentication, createRequest)

module.exports = router