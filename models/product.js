const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const productSchema=new Schema({
    productName:String,
    imgUrl:String,
    price:Number,
    description:String
});

module.exports=mongoose.model("Product",productSchema)





// const products = []
// const mongodb = require('mongodb')
// const getDb = require('./database').getDb

// module.exports = class Product {
//     constructor(name, imgUrl, price, description, id) {
//         this.productName = name
//         this.imgUrl = imgUrl
//         this.price = price
//         this.description = description
//         this._id = id
//     }

//     save() {


//         const db = getDb()
//         let dbop;
//         if (this._id) {
//             console.log("Id exists");
//             dbop = db.collection('products')
//                 .updateOne({ _id: new mongodb.ObjectId(this._id) },
//                     { $set: this })
//                     .then(msg=>{
//                         console.log("Updated successfully");
//                     })
//         }

//         else {
//             console.log("New Id");
//             dbop = db.collection('products')
//                 .insertOne(this).then(msg=>{
//                     console.log("Inserted successfully");
//                 })


//         }
//         return dbop.then(result => {
//             console.log(result);
//         })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     static fetchAll() {
//         const db = getDb()
//         return db.collection('products')
//             .find()
//             .toArray()
//             .then(products => { return products })
//             .catch(err => { console.log(err) })
//     }

//     static findById(prodId) {
//         const db = getDb()
//         return db.collection('products')
//             .findOne({ _id: new mongodb.ObjectId(prodId) })
//             .then(product => {
//                 return product
//             })
//             .catch(err => { console.log(err) })

//     }
// static deleteById(prodId){
//     console.log("Inside delete function");
//     console.log("ProdID:",prodId);
//     const db=getDb()
//     return db.collection('products')
//     .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//     .then(result=>{
//         console.log("Deleted succesfully the product with id:",prodId);
//     })
// }


// }