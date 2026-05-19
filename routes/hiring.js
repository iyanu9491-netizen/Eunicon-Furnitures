const { hireArtisan, viewPendingHire, hireStatus } = require('../controller/hiring');
const { Authentication } = require('../middlewares/auth');
const router = require('express').Router()

router.post('/hire/:artisanId', Authentication, hireArtisan);

router.get("/hire", Authentication, viewPendingHire);

router.patch("/hireAccept/:id", Authentication, hireStatus);

module.exports = router