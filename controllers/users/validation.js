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
    Users.findOne({
        "login" : login,
    }, (err, result) => {
        if(result){
            bcrypt.compare(password, result.password, (err, res) => {
                if (res) {
                    console.log('Успешная авторизация ', result);
                    callback(true);
                } else {
                    return console.log('Пароль не совпал ', err);
                } 
            })
        }
        else{
            console.log('Ошибка авторизации ', err);
            callback(false);
        }
    });
}

module.exports = {
    validateRegister,
    validateSignIn,
    hashPassword
}