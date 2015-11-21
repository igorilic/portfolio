var express = require('express');
var router = express.Router();
var log = require('../lib/log.js')(module);
var Album = require('../models/album.js');
    

router.route('/albums')
    .get(function(req, res) {
        return Album.find(function(err, albums) {
            if (!err) {
                return res.json(albums);
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({ error: 'Server error '});
            }
        });
    })
    .post(function(req, res) {
        var album = new Album({
            id: req.body.id,
            title: req.body.title,
            desc: req.body.desc,
            pics: req.body.pics
        });
    
        album.save(function(err) {
            if (!err) {
                log.info('album created');
                return res.send({status: 'OK', album: album});
            } else {
                console.log(err);
                if (err.name === 'Validation errod') {
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

router.route('/albums/:id')
    .get(function(req, res) {
        return Album.findById(req.params.id, function(err, album) {
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
    })
    .put(function (req, res){
        return Album.findById(req.params.id, function(err, album) {
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
                    log.info('album updated');
                    return res.send({status: 'OK', album: album});
                } else {
                    console.log(err);
                    if (err.name === 'Validation errod') {
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
    })
    .delete(function (req, res){
        return Album.findById(req.param.id, function(err, album) {
            if (!album) {
                res.statusCode = 404;
                return res.send({error: 'Not found'});
            }
            return album.remove(function(err) {
                if (!err) {
                    log.info('album removed');
                    return res.send({status: 'OK'});
                } else {
                    res.statusCode = 500;
                    log.error('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        });
    })
    .post(function(req, res) {
       // TODO post image
    });

router.get('', function (req, res) {
    res.send('API is running');
});
module.exports = router;