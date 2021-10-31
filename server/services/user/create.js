import { StatusCodes } from 'http-status-codes';

const userController = require('../../db/controllers/user')

export const addUser = async(req, res, next) => {
    try {
      const formattedData = { ...req.body };
      const { newUser, token} = await userController.createUser(formattedData);
      if (!newUser._id) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .send({ message: 'Something went wrong' });
      }
      return res.status(StatusCodes.CREATED).send({ user: newUser, token: token });
    } catch (error) {
      next(error);
      return 'Error';
    }
  };

  module.exports = {
    addUser
  };