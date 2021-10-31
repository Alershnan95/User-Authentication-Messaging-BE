import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const message = new Schema({
    id: {
        type: Number,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        validate: [arrayLimit, '{PATH} cant be empty'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timeZone: {
        type: String,
        default: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    senderName: {
        type: String,
        required: true
    }
},
    { timestamps: true });

function arrayLimit(val) {
    return val.length >= 1;
}

export default mongoose.model('Message', message);