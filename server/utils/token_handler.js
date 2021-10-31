import * as jwt from 'jsonwebtoken';

import { CONSTANTS } from '../config/constants';

export const generate = async (user) => {
    try {
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };
        return await jwt.sign(payload, CONSTANTS.JWT.SECRET_KEY);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    generate
};