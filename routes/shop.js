const express = require('express')

const path=require('path')
const rootDir=require('../utils/path')
const productController=require('../controllers/product')


const router = express.Router()

router.get('/',productController.getProducts)

router.get('/product/:id',productController.getProduct)

module.exports=router