const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
        name: {
            type: String,
            required: true,
            min: 5,
            max: 255
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024

        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);