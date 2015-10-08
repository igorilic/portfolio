var mongoose = require('mongoose'),
    Album = mongoose.model('Album');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var album = new Album(req.body);

    album.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(album);
        }
    });
};

exports.list = function(req, res) {
    Album.find({})
        .sort('-created')
        .exec(function(err, albums) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(albums);
            }
        });
};

// params
exports.albumById = function(req, res, next, id) {
    Album.findById(id)
        .exec(function(err, album) {
            if (err) {
                return next(err);
            }

            if (!album) {
                return next(new Error('Failed to load Album ') + id);
            }

            req.album = album;
            next();
        });
};

// find album by id
exports.read = function(req, res) {
    res.json(req.album);
};

// update album by id
exports.update = function(req, res) {
    var album = req.album;

    album.id = req.body.id;
    album.title = req.body.title;
    album.desc = req.body.desc;
    album.featureUrl = req.body.featureUrl;
    album.pics = req.body.pics;
    album.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(album);
        }
    });
};

// delete album
exports.delete = function(req, res) {
    var album = req.album;

    album.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(album);
        }
    });
};
