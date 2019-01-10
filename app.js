const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config');
const app = express();
const router = require('./routes/users');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || db.config.Port;

app.use(session({store: new MongoStore({
    url: db.config.mongoUri,
    ttl: 14 * 24 * 60 * 60,
    autoReconnect: true,
  }), secret: '0GBldsyunb9EKBt2ZbuiGLAUgr43kswp6xXK', resave: true, saveUninitialized: true}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    } else {
        next(err);
    }
});

app.use('/users', router);

app.use((req, res, next) => {
    res.status(404).send('ERROR 404');
});

app.listen(port, ()=>{
    console.log(`Подключились к порту: ${port}`);
});
