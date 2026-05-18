const multer = require('multer');
const { Authentication } = require('../middlewares/auth');
const { uploadProduct } = require('../controller/product');

const router = require('express').Router();

const upload = multer(
    {
        dest: '/upload'
    }
)

router.post('/uploadProduct', Authentication,upload.single('productImage'), uploadProduct)

module.exports = router