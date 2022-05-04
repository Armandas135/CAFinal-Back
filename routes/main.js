const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')
const threadController = require('../controllers/threadController')

const {
    registerValidator,
    loginValidator
} = require('../middleware/userMiddleware')

const {
    threadValidator,
    commentValidator,
} = require('../middleware/threadMiddleware')

router.post('/loggedIn', userController.loggedIn)
router.post('/register', registerValidator, userController.register)
router.post('/login', loginValidator, userController.login)
router.post('/newthread', threadValidator, threadController.newThread)
router.post('/newcomment', commentValidator, threadController.newComment)

module.exports = router