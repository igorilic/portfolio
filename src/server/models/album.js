var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Images = new Schema({
	kind: {
		type: String,
		enum: ['thumbnail', 'detail'],
		required: true
	},
	url: {
		type: String,
		required: true
	}
});

/**
 * Album Schema
 */

var Album = new Schema({
    id: Number,
    title: String,
    desc: String,
    modified: {
        type: Date,
        default: Date.now()
    },
    pics: [Images]
});

module.exports = mongoose.model('Album', Album);
