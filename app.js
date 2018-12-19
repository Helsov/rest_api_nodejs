const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config');
const app = express();
const router = require('./routes/index');
const port = process.env.PORT || db.config.Port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use('/api', router);

app.listen(port, ()=>{
    console.log(`Подключились к порту: ${port}`);
});
