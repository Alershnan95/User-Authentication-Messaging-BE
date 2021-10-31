import { CORS, CONSTANTS } from './config/constants';
import { StatusCodes } from 'http-status-codes';

export const allowCrossDomain = (req, res, next) => {
    const origin = req.headers.origin || CONSTANTS.LOCAL_HOST; // for allowing localhost api hits
    const whitelist = CORS.ALLOWED_DOMAINS.split(',');
  
    if (whitelist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', CORS.CORS_ALLOW_METHODS);
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', CORS.HEADERS);
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', CORS.CREDENTIAL_STATUS);
      // Pass to next layer of middleware
      return next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        error: CORS.CORS_REJECT
      });
    }
  };
  
  module.exports = {
    allowCrossDomain
  };