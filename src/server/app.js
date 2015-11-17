var express = require('express');
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var log = require('./lib/log')(module);
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./lib/config');
var port = process.env.PORT || config.get('port');
var oauth2 = require('./lib/oauth2');
var app = express();

var AlbumModel = require('./lib/mongoose').AlbumModel;


app.use(logger('dev'));
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

/**
 * Passport
 */
app.use(passport.initialize());
require('./lib/auth');

app.post('/oauth/token', oauth2.token);
app.get('/api/userInfo', passport.authenticate('bearer', { session: false }),
    function(req, res) {
        res.json({
            user_id: req.user.userId,
            name: req.user.username,
            scope: req.authInfo.scope
        });
    }
);

app.get('/api/albums', function(req, res) {
    return AlbumModel.find(function(err, albums) {
        if (!err) {
            return res.send(albums);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({ error: 'Server error '});
        }
    });
});

app.post('/api/albums', function(req, res) {
    var album = new AlbumModel({
        id: req.body.id,
        title: req.body.title,
        desc: req.body.desc,
        pics: req.body.pics
    });
    
    album.save(function(err) {
        if (!err) {
            log.info("album created");
            return res.send({status: 'OK', album: album});
        } else {
            console.log(err);
            if (err.name == 'Validation errod') {
                res.statusCode = 400;
                res.send({ error: 'Validation error'});
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error'});
            }
            
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

app.get('/api/albums/:id', function(req, res) {
    return AlbumModel.findById(req.params.id, function(err, album) {
        if (!album) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
        
        if (!err) {
            return res.send({status: 'OK', album: album});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

app.put('/api/albums/:id', function (req, res){
    return AlbumModel.findById(req.params.id, function(err, album) {
        if (!album) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
        
        album.id = req.body.id;
        album.title = req.body.title;
        album.desc = req.body.desc;
        album.pics = req.body.pics;
        
        return album.save(function(err) {
            if (!err) {
                log.info("album updated");
                return res.send({status: 'OK', album: album});
            } else {
                console.log(err);
                if (err.name == 'Validation errod') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error'});
                }
            
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });    
});

app.delete('/api/albums/:id', function (req, res){
    return AlbumModel.findById(req.param.id, function(err, album) {
        if (!album) {
            res.statusCode = 404;
            return res.send({error: 'Not found'});
        }
        return album.remove(function(err) {
            if (!err) {
                log.info("album removed");
                return res.send({status: 'OK'});
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.use(express.static('./src/client/'));
app.use(express.static('./'));
app.use(express.static('./tmp'));
app.use('/*', express.static('./src/client/index.html'));

/**
 * 404
 */
app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(port, function() {
	log.info('Server is up and running at port ' + port);
});