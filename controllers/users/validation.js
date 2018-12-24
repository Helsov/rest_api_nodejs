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
}

const validateRegister = (login, callback) => {
    Users.findOne({
        "login": login,
    }, (err, result) => {
        if (result == null) {
            console.log('returning false')
            callback(false)
        } else {
            console.log('returning true')
            callback(true)
        }
    });
};

const validateSignIn = (login, password, callback) => {
    bcrypt.compare(password, hashPassword(password), (err, res) => {
        if (res) {
            Users.findOne({
                "login" : login
            }, (err, result) => {
                if(result){
                    console.log('Успешная авторизация ', result);
                    callback(true);
                }
                else{
                    console.log('Ошибка авторизации ', err);
                    callback(false);
                }
            });
        } else {
            console.log('Пароль не совпал ', err);
        }
    })
}

module.exports = {
    validateRegister,
    validateSignIn,
    hashPassword
}