var albums = require('./controllers/album.server.controller');

module.exports = function(app) {
    app.route('/api/albums')
        .get(albums.list)
        .post(albums.create);

    app.route('/api/albums/:albumId')
        .get(albums.read)
        .put(albums.update)
        .delete(albums.delete);

    app.param('albumId', albums.albumById);
};
