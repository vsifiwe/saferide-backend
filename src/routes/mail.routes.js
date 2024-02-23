const express = require('express')
const MailController = require('../controllers/mail.controller')

// initializations
const router = express.Router()
const mainController = new MailController()

router.post('/send', mainController.sendMessage)

module.exports = router