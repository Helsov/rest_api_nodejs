const mongoose = require('mongoose');
const crypto = require('crypto');
const Users = require('../models/users');

const setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    return this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512');
};

const sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

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
}

const userListAdd = function (req, res) {
    sendJSONresponse(res, 200, {
        "status": "success"
    })
};

const userList = function (req, res) {
    Users.find()
        .exec((err, location) => {
            if (!location) {
                sendJSONresponse(res, 404, {
                    "message": "Данные не найдены"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(location);
            sendJSONresponse(res, 200, location);
        })
};

const userCreate = function (req, res) {
    console.log(req.body);
    validateRegister(req.body.login, (result)=>{
        if(!result){
            Users.create({
                name: req.body.name,
                login: req.body.login,
                password: setPassword(req.body.password),
            }, function (err, location) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 400, err);
                } else {
                    console.log(location);
                    sendJSONresponse(res, 201, location);
                }
            });
        }
    })
    
};

const userDeleted = function (req, res) {
    let idUser = req.params.idUser;
    console.log(idUser);
    if (idUser) {
        Users.findOneAndRemove(idUser)
            .exec(function (err, location) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log("Пользователь " + idUser + " был удален");
                sendJSONresponse(res, 204, null);
            })
    } else {
        sendJSONresponse(res, 404, {
            "message": "Данные не найдены и не были удалены"
        });
    }
}

module.exports = {
    userListAdd,
    userList,
    userCreate,
    userDeleted
};