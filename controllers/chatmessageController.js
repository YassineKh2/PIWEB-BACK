const Chatmessage = require("../models/chatmessage");

const addChatMessage = async (data) => {
    try {
        const newChatMessage = new Chatmessage({
        message: data.message,
        sender: data.sender,
        receiver: data.receiver,
        });
        await newChatMessage.save();
        return newChatMessage;
    } catch (error) {
        return error.message
    }
}

module.exports = { addChatMessage };