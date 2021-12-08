const espress = require('express');
// const router = espress.Router();
const router = require('express-promise-router')()
const UserController = require('../controllers/user');
const { validateParam, schemas } = require('../helpers/routerHelpers')


router.route('/getall')
    .get(UserController.getAllUser)

router.route('/createUser')
    .post(UserController.createUser)
router.route('/getSingle/:UserId')
    .get(validateParam(schemas.idSchema, 'UserId'), UserController.getSingle)
router.route('/replaceUser/:UserId')
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)
router.route('/updateUserDeck/:userId/decks')
    .get(UserController.getUserDesk)
    .post(UserController.newUserDesk)
module.exports = router