

const User = require('../models/user')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy



exports.initializePassport = (passport) => {

    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email })

        if (!user) {
            console.log("User not found..");
            return done(null, { message: "User not found" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }
            else {
                console.log("Password mismatch...");
                return done(null, false, { message: "Password mismatch.." })
            }
        }
        catch (error) {
            return done(error)
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async(_id, done) => {
        try {
            const user=await User.findById({_id})
            return done(null,user)
        }
        catch(error){
            done(error,false)
        }
    })
}