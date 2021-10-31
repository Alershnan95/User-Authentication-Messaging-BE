import Message from '../models/message';
const { ObjectId } = require('mongodb');

export const sendMessage = async (newMessage) => {
    try {
        const message = new Message(newMessage);
        return await message.save()
    } catch (err) {
        throw err;
    }

};

export const getCount = async (receiver) => {
    try {
        const receivers = receiver.map((item) => ObjectId(item));
        return await Message.countDocuments({ receiver: { "$size": receivers.length, "$all": receivers } });
    } catch (err) {
        throw err;
    }

};

export const fetchMessages = async (request) => {
    try {
        const { receiver } = request;
        return await Message.find({ receiver: ObjectId(receiver) }).sort({ createdAt: -1 });
    } catch (err) {
        throw err;
    }

};

module.exports = {
    sendMessage,
    getCount,
    fetchMessages
};