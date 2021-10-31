import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';

import { addUser } from '../../services/user/create';
import { userLogin } from '../../services/auth/login';
import { getUsers } from '../../services/auth/login';

export default (app) => {
    const router = Router();
    app.use('/auth', router);

    router.route('/test').get(async (req, res) => {
        res.send('Route Test GET method');
    });

    router.route('/signup').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                name: Joi.string().required(),
                password: Joi.string().required()
            })
        }), addUser);

    router.route('/login').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required(),
                password: Joi.string().required()
            })
        }), userLogin);

    /**
   * Route to fetch a list of all users
   */
    router.route('/').get(getUsers);

    app.use(errors());
}