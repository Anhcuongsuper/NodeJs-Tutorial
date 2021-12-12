const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    },
    authenGoogleId: {
        type: String,
        default: null
    },
    authenFacebookId: {
        type: String,
        default: null
    },
    authType: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local'
    },
    decks: [{
        type: Schema.Types.ObjectId,
        ref: 'Deck'
    }]
})
UserSchema.pre('save', async function(next) {
    try {
        if (this.authType != 'local') next()
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
    } catch (error) {
        next(error)
    }
})
UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password)
    } catch (error) {
        throw new Error(error)
    }
}
const User = mongoose.model('User', UserSchema)
module.exports = User