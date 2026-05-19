const multer = require('multer');
const { Authentication } = require('../middlewares/auth');
const { uploadProduct, allProduct, collection } = require('../controller/product');

const router = require('express').Router();

const upload = multer(
    {
        dest: '/upload'
    }
)

router.post('/uploadProduct', Authentication,upload.single('productImage'), uploadProduct)

router.get('/allProduct', allProduct)

router.get('/product/:collections', collection)

module.exports = router