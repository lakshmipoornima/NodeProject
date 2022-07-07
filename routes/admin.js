const express = require('express')
const path=require('path')
const router = express.Router()

const rootDir=require('../utils/path')
const productController=require('../controllers/product')


router.get('/add-product',productController.getAddProducts)

router.get('/edit_product/:id',productController.getEditProduct)

router.post('/product',productController.postAddProduct )

router.post('/update_product',productController.postEditProduct)

router.post('/delete_product',productController.postDeleteProduct)

module.exports=router

