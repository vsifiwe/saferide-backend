const express = require('express')
const MessageController = require('../controllers/message.controller')
const { authenticateToken } = require('../helpers/middleware');

// initializations
const router = express.Router()
const messageController = new MessageController()

router.get('', authenticateToken, messageController.getAllMessages)
router.post('', authenticateToken, messageController.addNewMessage)

module.exports = router