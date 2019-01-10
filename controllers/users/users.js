const Users = require('../../models/users');
const validation = require('./validation');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const jwtMW = exjwt({
    secret: 'keyboard cat 0GBldsyunb9EKBt2ZbuiGLAUgr43kswp6xXK ever'
});

let sessions;

const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
};

const userCreate = (req, res) => {
    validation.validateRegister(req.body.login, (result)=>{
        if(!result){
            Users.create({
                name: req.body.name,
                login: req.body.login,
                password: validation.hashPassword(req.body.password),
            }, (err, succes) => {
                err ? (
                    console.log(err),
                    sendJSONresponse(res, 400, err)
                ) : (
                    console.log(succes),
                    sendJSONresponse(res, 201, succes)
                )
            });
        }
    })
    
};

const getUser = (req, res) => {
    let login = req.params.login;
    console.log(login)
    if(login){
        Users.findOne({
            'login': login
        })
        .exec((err, succes) => {
            if (!succes) {
                sendJSONresponse(res, 404, {
                    "message": "Данные не найдены"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(succes);
            sendJSONresponse(res, 200, succes);
        })
    }
}

// const userSignIn = (req, res) => {
//     let login = req.body.login;
//     let password = req.body.password;
//     console.log(sessions);

//     validation.validateSignIn(login, password, (result) => {
//         result ? (
//             sessions = req.session,
//             sessions.login = login,
//             res.send('Success')
//         ) : res.send('Пароль не совпал')
//     });
// }

const userListAdd = (req, res) => {
    sendJSONresponse(res, 200, {
        "status": "success"
    })
};

const userList = (req, res) => {
    Users.find()
        .exec((err, succes) => {
            if (!succes) {
                sendJSONresponse(res, 404, {
                    "message": "Данные не найдены"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log(succes);
            sendJSONresponse(res, 200, succes);
        })
};

const userDeleted = (req, res) => {
    let idUser = req.params.idUser;
    console.log(idUser);
    if (idUser) {
        Loc.findOneAndRemove(idUser)
            .exec((err, succes) => {
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
};

const userAuthen = (req, res) => {
    res.send('You are authenticated');
}

const userLogin = (req, res) => {
    let { login, password } = req.body;
    console.log(sessions);

    validation.validateSignIn(login, password, (result) => {
        result ? (
            sessions = req.session,
            sessions.login = login,
            token = jwt.sign({ login: login }, 'keyboard cat 4 ever', { expiresIn: 129600 }),
            res.json({
                sucess: true,
                err: null,
                token
            })
        ) : (
            res.json({
                sucess: false,
                token: null,
                err: 'Логин или пароль не совпадает'
            }),
            console.log('Логин или пароль не совпадает')
        )
    });
}

module.exports = {
    userListAdd,
    userList,
    userCreate,
    userDeleted,
    // userSignIn,
    getUser,
    jwtMW,
    userAuthen,
    userLogin
};