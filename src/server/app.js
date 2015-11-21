var express = require('express');
var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var hash = require('bcrypt-nodejs');
var logger = require('morgan');
var log = require('./lib/log')(module);
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./lib/config');
var port = process.env.PORT || config.get('port');
var LocalStrategy = require('passport-local' ).Strategy;
// mongoose
mongoose.connect('mongodb://localhost/albums');
var db = mongoose.connection;

db.on('error', function(err) {
    log.error('connection error:', err.message);
});

db.once('open', function callback() {
    log.info('Connected to DB!');
});

// user schema/model
var User = require('./models/user.js');
// app instance
var app = express();
// routes
var apiRoutes = require('./routes/api.js');
var userRoutes = require('./routes/userApi.js');

// app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
/**
 * Passport
 */
app.use(passport.initialize());
app.use(passport.session());
/**
 * Static
 */
app.use(express.static('./src/client'));
app.use(express.static('./src/data'));
app.use(express.static('.'));
app.use(express.static('./tmp'));
app.use('/*', express.static('./src/client/index.html'));

// configure passport
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/api', apiRoutes);
app.use('/user/', userRoutes);

/**
 * 404
 */
app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({error: 'Not found'});
    return;
});

app.use(function(err, req, res){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({error: err.message});
    return;
});

app.listen(port, function() {
	log.info('Server is up and running at port ' + port);
});