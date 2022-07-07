const User = require('../models/user')
const Product=require('../models/product')
const bcrypt=require('bcrypt')

exports.loginUser = (req, res) => {
    
    res.render('login', { pageTitle: "Login",isAuthenticated:req.isAuthenticated()})
}

exports.registerUser = (req, res) => {
    res.render('register', { pageTitle: "Registration",isAuthenticated:req.isAuthenticated() })
}

exports.postRegister = async (req, res) => {

    let email = req.body.email
    let password = await bcrypt.hash(req.body.password,10)

    let user = new User({ email: email, password: password })
    user.save((err, registerUser) => {
        if (err) throw err
        console.log(registerUser);
        res.redirect('/login')
    })

}

exports.logout=(req,res)=>{
    console.log("logout value: ",req.isAuthenticated());
  
    req.logout((err) =>{
        if (err) {
            return err;
            }
      res.render('login', { pageTitle: "Login",isAuthenticated:req.isAuthenticated()})
      });
   
}

exports.postLogin = (req, res) => {
    let email = req.body.email
    let password = req.body.password
    
    
  
    User.findOne({ email: email }, (err, user) => {
        
        if (!user) {
            console.log("Invalid User..");
            res.render('register', { pageTitle: "Registration" })
        }
        else {
           // let authenticated=true;
            Product.find()
            .then(products=>{
                console.log(password," ",user.password);
                    res.render('shop', { pageTitle: "Shop",products:products})
               
            })
            
        }

    })




}