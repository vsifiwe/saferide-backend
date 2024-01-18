const { Message } = require('../models/message.model');

class MessageService {
    constructor() {
        this.messages = [];
    }

    async getMessages() {
        const messages = await Message.findAll()
        return messages;
    }

    async addMessage(message, username) {
        await Message.create({ username: username, message: message })
    }
}

module.exports = MessageService