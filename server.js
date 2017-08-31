"use strict"

let express = require('express');
let app = express();

let passport = require('passport');
let session = require('express-session');
let bodyParser = require('body-parser');

// BodyParser Config
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

// Passport Config
app.use(session({ secret: 'magic bullet syndrome', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session





app.get('/', function(req, res) {
    res.send('Welcome to roning passport sequelize - powderhorn');
});


app.listen(3100, function(err) {
    if (!err)
        console.log('App listening on port 3100!');
    else console.log(err);
});