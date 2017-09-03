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

// UI 
let hbs = require('express-handlebars')

app.set('views', './app/views')
app.engine('hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Models
var models = require("./app/models");


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);


//Routes
let authRoute = require('./app/routes/auth.js')(app, passport);


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

app.get('/', function(req, res) {
    res.send('Ronin sequelize_passport api - powderhorn');
});


//Sync Database
models.sequelize.sync().then(function() {

   console.log('Nice! Database looks fine')
}).catch(function(err) {
   console.log(err, "Something went wrong with the Database Update!")
});



app.listen(3100, function(err) {
    if (!err)
        console.log('App listening on port 3100!');
    else console.log(err);
});