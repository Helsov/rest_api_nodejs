const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/users');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/users', urlencodedParser, ctrlUser.userList);
router.post('/users', ctrlUser.userCreate);
router.delete('/users/:idUser', ctrlUser.userDeleted);

module.exports = router;