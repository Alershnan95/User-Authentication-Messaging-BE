import { StatusCodes } from 'http-status-codes';

const messageController = require('../../db/controllers/message');

export const sendMessage = async (req, res, next) => {
    try {
        const message = req.body;
        const newMessage = await messageController.sendMessage(message);
        if (!newMessage._id) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .send({ message: 'Something went wrong' });
        };
        return res.status(StatusCodes.CREATED).send({ message: newMessage });
    }
    catch (error) {
        next(error);
        return 'Error';
    }
}

export const getCount = async (req, res, next) => {
    try {
        const { receiver } = req.body;
        const count = await messageController.getCount(receiver);
        return res.status(StatusCodes.OK).send({ count });
    }
    catch (error) {
        next(error);
        return 'Error';
    }
}

export const fetchMessages = async (req, res, next) => {
    try {
        const messages = await messageController.fetchMessages(req.body);
        return res.status(StatusCodes.OK).send({ messages });
    }
    catch (error) {
        next(error);
        return 'Error';
    }
}

module.exports = {
    sendMessage,
    getCount,
    fetchMessages
};