var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);
    console.log('Connected to ModulusIO MongoDB database');

    require('../models/album.model');

    return db;
};
