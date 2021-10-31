import express from 'express';
import auth from './auth';
import message from './message';

const router = express.Router();

auth(router);
message(router);

export default router;