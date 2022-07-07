const Product = require('../models/product')
const mongodb = require('mongodb')



exports.getAddProducts = (req, res) => {

    //res.sendFile(path.join(rootDir,'views/','add-product.html'))
    // res.send('<form action="/admin/product" method="post"><input type="text" name="product"><button type="submit" value="">Add Product</button> </form>')
    res.render('add-product', { pageTitle: 'Add Product' })
}


exports.postAddProduct = (req, res) => {
   
    const productName = req.body.productName
    const imgUrl = req.body.imgUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(productName, imgUrl, price, description)

    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            //console.log(products);
            res.render('shop', { products: products, pageTitle: 'Shop' })
        })



}

exports.getProduct = (req, res) => {
    const prodId = req.params.id;
    console.log(prodId);
    Product.findById(prodId)
        .then(product => {
            res.render('productdetails', { pageTitle: product.productName, prodId: prodId, product: product })
        })
}

exports.getEditProduct = (req, res) => {
    const prodId = req.params.id;
    Product.findById(prodId)
        .then(product => {
            res.render('edit_product', { pageTitle: "Edit Product", product: product })
        })
}

exports.postEditProduct = (req, res) => {
    const UproductName = req.body.productName
    const UimgUrl = req.body.imgUrl
    const Uprice = req.body.price
    const Udescription = req.body.description
    const prodId = req.body.id
    console.log(typeof prodId);
    const product=new Product(UproductName,UimgUrl,Uprice,Udescription,new mongodb.ObjectId(prodId))
    
    console.log("postEditProduct", product);

    product.save()
    
    res.redirect('/')
  

}

exports.postDeleteProduct=(req,res)=>{
    const prodId=req.body.id;
    Product.deleteById(prodId)
    .then(()=>{
        res.redirect('/')
    })
   
}




