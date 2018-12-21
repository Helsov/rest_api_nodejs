const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    idUser: {
        type: Number,
        default: Date.now()
    },
    name: {
        type: String
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
},{
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
});

const Users = mongoose.model('Users', usersSchema, 'users');
module.exports = Users;