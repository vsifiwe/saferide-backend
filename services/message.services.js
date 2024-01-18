const { Message } = require('../models/message.model');

class MessageService {
    constructor() {
        this.messages = [];
    }

    async getMessages() {
        const messages = await Message.findAll()
        console.log("All messages:", JSON.stringify(messages, null, 2));
    }

    async addMessage(message, username) {
        await Message.create({ username: username, message: message })
        console.log("Message created: " + message)
    }
}

module.exports = MessageService