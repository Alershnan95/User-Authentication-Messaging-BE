import { Router } from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';

import { sendMessage, getCount, fetchMessages } from '../../services/message/send';

export default (app) => {
    const router = Router();
    app.use('/message', router);

    router.route('/send').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                sender: Joi.string().required(),
                receiver: Joi.array().required(),
                message: Joi.string().required(),
                senderName: Joi.string().required()
            })
        }), sendMessage);

    router.route('/count').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                receiver: Joi.array().required()
            })
        }), getCount);

    router.route('/user').post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                receiver: Joi.string().required()
            })
        }), fetchMessages);

    app.use(errors());
}