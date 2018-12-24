const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/users/users');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/getUsers', urlencodedParser, ctrlUser.userList);
router.post('/addUser', ctrlUser.userCreate);
router.delete('/:idUser', ctrlUser.userDeleted);
router.post('/signIn', ctrlUser.userSignIn);

module.exports = router;