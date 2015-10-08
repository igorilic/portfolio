var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Images = new Schema({
    url: {
        type: String,
        required: true
    },
    tag: [String]
});

var AlbumSchema = new Schema({
    id: Number,
    title: String,
    desc: String,
    featureUrl: String,
    created: {
        type: Date,
        default: Date.now()
    },
    pics: [Images]
});

mongoose.model('Album', AlbumSchema);
