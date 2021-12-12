const espress = require('express');
const { route } = require('express/lib/application');
// const router = espress.Router();
const router = require('express-promise-router')()
const UserController = require('../controllers/user');
const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')

router.route('/getall')
    .get(UserController.getAllUser)
router.route('/createUser')
    .post(validateBody(schemas.userSchema), UserController.createUser)
router.route('/getSingle/:UserId')
    .get(validateParam(schemas.idSchema, 'UserId'), UserController.getSingle)
router.route('/replaceUser/:UserId')
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)
router.route('/updateUserDeck/:userId/decks')
    .get(UserController.getUserDesk)
    .post(UserController.newUserDesk)
router.route('/auth/google').post(passport.authenticate('google-plus-token', { session: false }), UserController.singInWithGoogle);
router.route('/secret').get(passport.authenticate('jwt', { session: false }), UserController.secretUser)
router.route('/singIn').post(passport.authenticate('local', { session: false }), UserController.singIn)
router.route('/singUp').post(UserController.singUp)

module.exports = router