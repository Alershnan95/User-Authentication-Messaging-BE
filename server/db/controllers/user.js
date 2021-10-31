import User from '../models/user';

const passwordHandler = require("../../utils/password_handler");
const tokenHandler = require("../../utils/token_handler");

export const createUser = async (newUser) => {
    try {
        // Check if the user exists
        const userExist = await User.findOne({
            email: newUser.email
        });
        if (userExist) {
            throw `User with email ${newUser.email} already exists`;
        }

        // Generate the hash
        newUser.passwordHashed = await passwordHandler.encrypt(newUser.password);

        const user = new User(newUser);
        const savedUser = await user.save();
        const token = await tokenHandler.generate(savedUser);
        return {
            newUser: savedUser,
            token: token
        };
    } catch (err) {
        throw err;
    }
};

export const findUserByEmail = async (email) => {
    try {
        return await User.findOne({
            email: email,
        }).lean();
    } catch (err) {
        throw err;
    }
};

/**
 * Functionality used to get the list of available users
 * from the database
 * @returns {Array} user list
 */
export const getUsers = async () => {
    try {
        return await User.find({}, { email: 1 });
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    getUsers
};