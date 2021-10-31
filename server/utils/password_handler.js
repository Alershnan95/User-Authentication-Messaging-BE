import Cryptr from 'cryptr';

import { CONSTANTS } from '../config/constants';
const cryptr = new Cryptr(CONSTANTS.CRYPTR_KEY.SECRET);

export const encrypt = async (password) => {
    try {
        return await cryptr.encrypt(password);
    } catch (err) {
        throw err;
    }
};

export const decrypt = async (encryptedPassword) => {
    try {
        return await cryptr.decrypt(encryptedPassword);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    encrypt,
    decrypt
};