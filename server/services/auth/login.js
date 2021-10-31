import { StatusCodes } from 'http-status-codes';

const userController = require('../../db/controllers/user')
const passwordHandler = require("../../utils/password_handler");
const tokenHandler = require("../../utils/token_handler");

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = { ...req.body };

        const user = await userController.findUserByEmail(email);
        if (!user) { return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Credentials does not match' }) };

        // Verify password
        const userPassword = await passwordHandler.decrypt(user.passwordHashed);
        if (!(user && (userPassword === password))) {
            return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Credentials does not match' });
        }
        const token = await tokenHandler.generate(user);
        res.status(StatusCodes.OK).send({ token, user });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await userController.getUsers();
        if (!(users && users.length)) {
            return res.status(StatusCodes.NOT_FOUND).send({ message: 'No users found' });
        }
        return res.status(StatusCodes.OK).send({ users: users });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    userLogin,
    getUsers
};