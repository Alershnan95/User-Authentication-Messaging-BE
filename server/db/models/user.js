import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    id: {
        type: Number,
    },
    email: {
        type: String,
        required: [true, 'can\'t be blank'],
    },
    name: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    passwordHashed: {
        type: String
    },
    timeZone: {
        type: String,
        default: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
},
    { timestamps: true });

user.index({
    email: 1,
}, {
    unique: true
});

export default mongoose.model('User', user);