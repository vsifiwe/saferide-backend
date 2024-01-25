const { Message } = require('../models/message.model');

class MessageService {
    constructor() {
        this.messages = [];
    }

    // get all messages from DB
    async getMessages() {
        const messages = await Message.findAll()
        return {
            "messages": messages,
            "code": 200,
          };
    }

    // add new message to DB
    async addMessage(message, username) {
        await Message.create({ username: username, message: message })
        return {
            "message": "success", 
            "code": 200,
          }
    }
}

module.exports = MessageService