const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/users/users');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/getUsers', urlencodedParser, ctrlUser.userList);
router.post('/addUser', ctrlUser.userCreate);
router.delete('/:idUser', ctrlUser.userDeleted);
//router.post('/signIn', ctrlUser.userSignIn);
router.get('/getUser/:login', ctrlUser.getUser);

router.get('/authen', ctrlUser.jwtMW, ctrlUser.userAuthen);
router.post('/login', ctrlUser.userLogin)

module.exports = router;