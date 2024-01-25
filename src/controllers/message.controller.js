const MessageService = require('../services/message.services');

class MessageController {
    constructor() {
        this.messageService = new MessageService()
    }

    getAllMessages = async (req, res) => {
        const response = await this.messageService.getMessages()
        res.send(response)
      }
    addNewMessage = async (req, res) => {
      const message = req.body.message
      const username = req.user.username
    
      const response = await this.messageService.addMessage(message, username)
    
      res.send(response)
    }

}

module.exports = MessageController