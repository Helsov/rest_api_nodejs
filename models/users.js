const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    idUser: {
        type: Number,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const Users = mongoose.model('Users', usersSchema, 'users');
module.exports = Users;