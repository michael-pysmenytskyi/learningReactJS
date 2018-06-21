var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var port = 3034;
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

// var connection = mongoose.createConnection('mongodb://localhost:27017/testDb');
mongoose.connect('mongodb://localhost:27017/testDb');
var connection = mongoose.connection;

connection.once('connected', function () {
  console.log('-----connected to DB------');

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

  app.use(bodyParser.json());

  app.use(express.static('src'));

  app.use(expressSession({ // почитайте і запишіть собі на що ці параетри впливають
    name: 'test',
    key: 'testKey',
    secret: '1q2w3e4r5tdhgkdfhgejflkejgkdlgh8j0jge4547hh',
    resave: false, // resave session even it was not changed, mostly not needed
    rolling: true, // cookie will not be set on a response with an uninitialized session.
    saveUninitialized: false,
    store: new MongoStore({
      url: 'mongodb://localhost:27017/testDb',
      autoReconnect: true,
      ssl: false
    }),

    cookie: {
      maxAge: 31 * 24 * 60 * 60 * 1000 // One month
    }
  }));

  require('./routes/index')(app);

  app.listen(port, function () {
    console.log('server listening on port ' + port);
  });
});

connection.on('error', function (err) {
  console.log('Error', err);

  process.exit(1);
});

