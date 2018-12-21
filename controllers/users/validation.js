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
        "password": password 
    }, (err, result) => {
        if(result){
            console.log('Успешная авторизация');
            console.log(result);
            callback(true);
        }
        else{
            console.log('Ошибка авторизации');
            console.log(err);
            callback(false);
        }
    });
}

module.exports = {
    validateRegister,
    validateSignIn,
    hashPassword
}







// const Users = require('../../models/users');
// const bcrypt = require('bcryptjs');

// const hashPassword = (password) => {
//     try {
//       const salt = bcrypt.genSaltSync(10);
//       const hashPass = bcrypt.hashSync(password, salt);
//       сonsole.log('СОль ', salt)
//       console.log('Хеш', hashPass);
//       return hashPass;
//     } catch(error) {
//       throw new Error('Ошибка хеширования', error)
//     }
// }

// const validateRegister = (login, callback) => {
//     Users.findOne({
//         "login": login,
//     }, (err, result) => {
//         if (result == null) {
//             console.log('returning false')
//             callback(false)
//         } else {
//             console.log('returning true')
//             callback(true)
//         }
//     });
// };

// const validateSignIn = (name, password, callback) => {
//     const hash = hashPassword(password);
//     Users.findOne({
//         "name" : name,
//         "password": password 
//     }, (err, result) => {
//         if(result == null){
//             console.log('Ошибка авторизации');
//             callback(false);
//         }
//         else{
//             console.log('Успешная авторизация');
//             callback(true);
//             hashPassword(password) 
//         }
//     });
//     Users.findOneAndUpdate( {"name": name}, {
//         "password": hashPassword(password)
//     }, (err, res) => {
//         if(res){
//             hashPassword(password) 
//             console.log('Пароль измененн');
//         } else {
//             console.log('Пароль не измененн');
            
//         }
//     });
// }

// module.exports = {
//     validateRegister,
//     validateSignIn,
//     hashPassword
// }