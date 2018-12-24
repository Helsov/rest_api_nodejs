const Users = require('../../models/users');
const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        let hashPass = bcrypt.hashSync(password, salt);
        return hashPass;
    } catch(error) {
        throw new Error('Ошибка хеширования', error)
    }
};

const validPass = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, res) => {
        res ? callback(true) : console.log('Пароль не совпал ', err);
    })
};

const validateRegister = (login, callback) => {
    Users.findOne({
        "login": login,
    }, (err, result) => {
        result == null ? callback(false) : callback(true)
    });
};

const validateSignIn = (login, password, callback) => {
    Users.findOne({
        "login" : login,
    }, (err, result) => {
        result ? validPass(password, result.password, callback) : callback(false);
    });
}

module.exports = {
    validateRegister,
    validateSignIn,
    hashPassword
}