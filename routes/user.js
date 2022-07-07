const express = require('express')
const path=require('path')
const router = express.Router()
const passport=require('passport')

const userController=require('../controllers/user')

router.get('/login',userController.loginUser)

router.get('/register',userController.registerUser)

router.post('/register',userController.postRegister)

router.get('/logout',userController.logout)

//router.post('/login',userController.postLogin)
router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:('/login')
    
}))
module.exports=router