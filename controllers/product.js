const Product = require('../models/product')
const mongodb = require('mongodb')



exports.getAddProducts = (req, res) => {

    //res.sendFile(path.join(rootDir,'views/','add-product.html'))
    // res.send('<form action="/admin/product" method="post"><input type="text" name="product"><button type="submit" value="">Add Product</button> </form>')
    res.render('add-product', { pageTitle: 'Add Product',isAuthenticated:req.isAuthenticated() })
}


exports.postAddProduct = (req, res) => {

    const productName = req.body.productName
    const imgUrl = req.body.imgUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product({ productName, imgUrl, price, description })

    product.save().then(() => {
        console.log("Inserted successfully");
        res.redirect('/')
    })

}

exports.getProducts = (req, res, next) => {

    if(!req.isAuthenticated())
    {
        
        console.log(req.isAuthenticated);
        res.render('login',{pageTitle:"Login",isAuthenticated:req.isAuthenticated()})
    }
    Product.find()
        .then(products => {

            res.render('shop', { products: products, pageTitle: 'Shop',isAuthenticated:req.isAuthenticated() })
        })



}

exports.getProduct = (req, res) => {
    const prodId = req.params.id;
    console.log(prodId);
    Product.findById(prodId)
        .then(product => {
            res.render('productdetails', { pageTitle: product.productName, prodId: prodId, product: product,isAuthenticated:req.isAuthenticated() })
        })
}

exports.getEditProduct = (req, res) => {
    const prodId = req.params.id;
    Product.findById(prodId)
        .then(product => {
            res.render('edit_product', { pageTitle: "Edit Product", product: product,isAuthenticated:req.isAuthenticated() })
        })
}

exports.postEditProduct = (req, res) => {
    const UproductName = req.body.productName
    const UimgUrl = req.body.imgUrl
    const Uprice = req.body.price
    const Udescription = req.body.description
    const prodId = req.body.id
    
    Product.findByIdAndUpdate((new mongodb.ObjectId(prodId)),
        {
            productName:UproductName,
            imgUrl:UimgUrl,
            price:Uprice,
            description:Udescription
        })
        .then(() => {
            console.log("Updated successfully");
            res.redirect('/')
        })
}

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.id;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            res.redirect('/')
        })

}




