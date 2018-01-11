const mongoose = require('mongoose');
// if we have more than 1 db to connect 
// const userPath = 'mongodb://localhost/users'; 
const peoplePath = 'mongodb://localhost/people'; 

mongoose.Promise = global.Promise;
const peopleConnection = mongoose.createConnection(peoplePath);
// For connecting another db
// const userConnection = mongoose.createConnection(userPath);

mongoose.connect(peoplePath, {useMongoClient : true})

mongoose.connection.on('connected', function(connection){
    console.log('Databases are connected now')
})

mongoose.connection.on('error', function(error){
    console.log('Databases are connected failed')
})

///disconnected is also one of the events as connected and error
