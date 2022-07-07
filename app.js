
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const session=require('express-session')
const {initializePassport}=require('./controllers/passport')
const passport=require('passport')
initializePassport(passport)

app.set('view engine', 'ejs')
app.set('views', 'views')

const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin')
const userRoutes=require('./routes/user')
const shopRoutes = require('./routes/shop')
app.use(bodyParser.urlencoded({ extended: true }))
const rootDir = require('./utils/path')
//const MongoConnect=require('./models/database').MongoConnect
const mongoose = require('mongoose')



app.use(express.static(path.join(__dirname, 'public')))


app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(userRoutes)

app.use(errorController.getError)

mongoose.connect("mongodb+srv://poornima91:poornima1991@cluster0.qoamf.mongodb.net/cart?retryWrites=true&w=majority")
    .then(() => {
        app.listen(3000, () => {
            console.log("Server started listening on port 3000...")
        })
    })


// MongoConnect(client=>{
//     app.listen(3000,()=>{
//         console.log("Server started listening on port 3000...")
//     })
// })



