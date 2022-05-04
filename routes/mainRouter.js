const express = require("express")
const router = express.Router()
const controller = require('../controllers/mainController')
const validator = require('../middleware/validator')

router.post('/loggedIn', controller.loggedIn)
router.post('/register', validator.registerValidator, controller.register)
router.post('/login', validator.loginValidator, controller.login)
router.post('/newthread', validator.threadValidator, controller.newThread)
router.post('/newcomment', validator.commentValidator, controller.newComment)

module.exports = router