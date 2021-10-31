import dotenv from 'dotenv';
import { isUndefined } from 'lodash';

const ENVIRONMENT = process.env.NODE_ENV || 'LOCAL';

if (ENVIRONMENT === 'LOCAL') {
    const envFound = dotenv.config();
    if (!isUndefined(envFound.error)) {
        throw new Error('⚠️  Couldn\'t find .env file  ⚠️');
    }
} else {
    dotenv.config({
        path: ''
    });
}

export const CONSTANTS = {
    BODY_PARSER_LIMIT: '50mb',
    BODY_PARSER_PARAMETER_LIMIT: 5000,
    LOCAL_HOST: process.env.LOCAL_HOST || 'LOCAL',
    PORT: 8081,
    API: {
        PREFIX: '/api'
    },
    NUMBERS: {
        ZERO: 0,
    },
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY
    },
    CRYPTR_KEY: {
        SECRET: process.env.CRYPTR_KEY,
    }
};

export const CORS = {
    ALLOWED_DOMAINS: process.env.ALLOWED_DOMAINS,
    CORS_ALLOW_METHODS: 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    CREDENTIAL_STATUS: true,
    HEADERS: 'Content-Type, Authorization, Content-Length, X-Requested-With',
    CORS_REJECT: 'Request rejected'
};

export const MONGO_CONSTANTS = {
    CONNECTION_ERROR: 'Error in connecting Mongo',
    CONNECTION_SUCCESSFUL: 'Successfully connected to Mongo',
    CONNECTION_DISCONNECTED: 'Mongoose default connection is disconnected',
    PROCESS_TERMINATED:
        'The Application is terminated and all the Mongoose connection to the Database is disconnected',
    DISCONNECTED: 'disconnected',
    SIGINT: 'SIGINT'
};

module.exports = {
    CONSTANTS,
    CORS,
    MONGO_CONSTANTS,
};