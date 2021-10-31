import mongoose from 'mongoose';
import { MONGO_CONSTANTS, CONSTANTS } from '../config/constants';

export const connector = () => {
    try {
        mongoose.connect(
            process.env.MONGO_DB_URI,
            {},
            err => {
                if (err) {
                    console.error(`👎 ${MONGO_CONSTANTS.CONNECTION_ERROR} 👎`, err);
                    throw err;
                }
                console.info(`👍 ${MONGO_CONSTANTS.CONNECTION_SUCCESSFUL} 👍`);
            }
        );
    } catch (err) {
        console.error(`👎 ${MONGO_CONSTANTS.CONNECTION_ERROR} 👎`, err);
    }
};

let db = mongoose.connection;

db.on(MONGO_CONSTANTS.DISCONNECTED, () => {
    console.info(`⚠️  ${MONGO_CONSTANTS.CONNECTION_DISCONNECTED} ⚠️`);
});

// Stopping all the open connection of database when the process is stopped.
process.on(MONGO_CONSTANTS.SIGINT, () => {
    mongoose.connection.close(() => {
        console.info(`⚠️  ${MONGO_CONSTANTS.PROCESS_TERMINATED} ⚠️`);
        // eslint-disable-next-line no-process-exit
        process.exit(CONSTANTS.NUMBERS.ZERO);
    });
});