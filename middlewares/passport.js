const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET, AuthenGoogleID, ClientSecretID } = require('../config/index')
const User = require('../models/user')

//authen google 
passport.use(new GooglePlusTokenStrategy({
    clientID: AuthenGoogleID,
    clientSecret: ClientSecretID
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({
            authenGoogleId: profile.id,
            authType: "google"
        });
        if (user) return done(null, user)
        const userNew = new User({
            authType: "google",
            authenGoogleId: profile.id,
            email: profile.emails[0].value
        })
        await userNew.save()
        done(null, userNew)
    } catch (error) {}
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET

}, async(payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if (!user) return (null, false)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) return done(null, false)
    const isCorretPassword = await user.isValidPassword(password)
    if (!isCorretPassword) return done(null, false)
    return done(null, user)
}))