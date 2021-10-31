import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { CONSTANTS } from './config/constants';
import { allowCrossDomain } from './cors';
import router from './api/routes/index';

import { connector } from './db/index';

const app = express();

const cookieParser = require('cookie-parser');

function startExpressServer (){
    app.use(express.json({ limit: CONSTANTS.BODY_PARSER_LIMIT }));
    app.use(express.urlencoded({
        limit: CONSTANTS.BODY_PARSER_LIMIT,
        extended: true,
        parameterLimit: CONSTANTS.BODY_PARSER_PARAMETER_LIMIT
    }));
    app.use(cookieParser());

    // enable cors
    app.use((req, res, next) => {
        allowCrossDomain(req, res, next);
    });

    // enable options response
    app.options('*', cors());

    // use routes
    app.use(CONSTANTS.API.PREFIX, router);

    // Server Listening
    app.listen(CONSTANTS.PORT, async (err) => {
        if (err) {
            throw new Error(`Error while starting the server ${err} AND THE WORKER ID IS ${process.pid}`);
        }
        console.log("Running First Test on Port " + CONSTANTS.PORT);
        await connector();
    });

}

startExpressServer();

export default app;