var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/pics', getPics);
//router.get('/perspic', getPerspic);
router.get('/pics/:id', getImage);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
//////////////

function getPerspic(req, res, next) {
    res.status(200).send(data.perspic);
}

function getPics(req, res, next) {
    res.status(200).send(data.pics);
}

function getImage(req, res, next) {
    var id = +req.params.id;
    var pic = data.pics.filter(function(p) {
        return p.id === id;
    })[0];

    if (pic) {
        res.status(200).send(pic);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

