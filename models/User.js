const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
        name: {
            type: String,
            required: true,
            min: 5,
            max: 255,
            trim: true
        },
        email: {
            type: String,
            required: true,
            min: 5,
            max: 255,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
            trim: true

        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);