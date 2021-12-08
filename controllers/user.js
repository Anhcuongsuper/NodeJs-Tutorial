const User = require('../models/user')
const Deck = require('../models/Deck')

// callback 
// const index = (req, res, next) => {
//     User.find({}, function(err, users) {
//         if (err) next(err)
//         return res.status(200).json({
//             dataSource: users
//         })
//     })
// }

// const createNewUser = (req, res, next) => {
//     const newUser = new User(req.body)
//     newUser.save((err, user) => {
//         return res.status(201).json(user)
//     })
// }

// Promiss way
// const index = (req, res, next) => {
//     User.find({}).then((users) => {
//         return res.status(201).json({ users })
//     }).catch((err) => next(err))
// }
// const createNewUser = (req, res, next) => {
//     const newUser = new User(req.body)
//     newUser.save().then((users) => {
//         return res.status(201).json({ users })
//     }).catch((err) => next(err))
// }

// Async/Await

const index = async function(req, res, next) {
    const users = await User.find({})
    return res.status(200).json({ users })
}
const newUserDesk = async function(req, res, next) {
    //create a new deck
    const { userId } = req.params;
    //get user
    const newDeck = new Deck(req.body);
    // get user
    const user = await User.findById(userId);
    // assign user as a deck's owner
    newDeck.owner = user;
    // save the deck
    await newDeck.save();
    //add deck to user's decks array 'decks'
    user.decks.push(newDeck._id)
    await user.save()
    res.status(201).json({ deck: newDeck })
}
const getUserDesk = async function(req, res, next) {
    const { userId } = req.params
    const user = await User.findById(userId).populate('decks')
    return res.status(200).json({ decks: user.decks })
}
const singleUser = async function(req, res, next) {
    const { UserId } = req.value.params;
    const user = await User.findById(UserId)
    return res.status(200).json({ user })
}

const createNewUser = async function(req, res, next) {
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json({ user: newUser })
}

const replaceUser = async(req, res, next) => {
    const { UserId } = req.params
    const newUser = req.body
    await User.findByIdAndUpdate(UserId, newUser)
    return res.status(200).json({
        status: 1,
        message: 'Replace user success'
    })
}
const updateUser = async(req, res, next) => {
    const { UserId } = req.params
    const newUser = req.body
    await User.findByIdAndUpdate(UserId, newUser)
    return res.status(200).json({
        status: 1,
        message: 'Update user success'
    })
}
module.exports = {
    getAllUser: index,
    createUser: createNewUser,
    getSingle: singleUser,
    replaceUser: replaceUser,
    updateUser: updateUser,
    getUserDesk: getUserDesk,
    newUserDesk: newUserDesk
}