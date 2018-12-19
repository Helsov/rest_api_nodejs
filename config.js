const mongoose = require('mongoose');

const config =  {
    Port: 3001,
    mongoUri: "mongodb://admin:admin1234@ds129914.mlab.com:29914/apidatabase",
    jwtSecret: "my secret text",
    hashAlgorithm: 'vlkl1234',
}

mongoose.connect(config.mongoUri, { useCreateIndex: true, useNewUrlParser: true });
mongoose.connection.on('connected', function(){
    console.log(`Успешное подключение к БД ${config.mongoUri}`);
});

mongoose.connection.on('error', function(err){
    console.log(`Ошибка ${err}`);
});

mongoose.connection.on('disconnected', function(){
    console.log(`Отключение от БД`);
});

//mongoose.disconnect();


module.exports = {
    config
};