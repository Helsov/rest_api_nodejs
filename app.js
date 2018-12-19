const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config');
const app = express();
const router = require('./routes/index');
const cors = require('cors')
const port = process.env.PORT || db.config.Port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', port);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(cors);
app.use('/api', router);

app.listen(port, ()=>{
    console.log(`Подключились к порту: ${port}`);
});
