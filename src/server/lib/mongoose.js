var mongoose = require('mongoose');
var log = require('./log')(module);
var crypto = require('crypto');
var config = require('./config');

mongoose.connect('mongodb://localhost/albums');
var db = mongoose.connection;

db.on('error', function(err) {
	log.error('connection error:', err.message);
});

db.once('open', function callback() {
	log.info('Connected to DB!');
});

var Schema = mongoose.Schema;

/**
 * Schemas
 */

var User = new Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

User.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt)
				.update(password)
				.digest('hex');
};

User.virtual('userId')
	.get(function() {
		return this.id;
	});

User.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = crypto.randomBytes(32).toString('hex');
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword; });
	
User.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

var UserModel = mongoose.model('User', User);

/**
 * Client
 */

var Client = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	clientId: {
		type: String,
		unique: true,
		required: true
	},
	clientSecret: {
		type: String,
		required: true
	}
});

var ClientModel = mongoose.model('Client', Client);

/**
 * Access Token
 */

var AccessToken = new Schema({
	userId: {
		type: String,
		required: true
	},
	clientId: {
		type: String,
		required: true
	},
	token: {
		type: String,
		unique: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

var AccessTokenModel = mongoose.model('AccessToken', AccessToken);

/**
 * Refresh Token
 */
var RefreshToken = new Schema({
	userId: {
		type: String,
		required: true
	},
	clientId: {
		type: String,
		required: true
	},
	token: {
		type: String,
		unique: true,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

var RefreshTokenModel = mongoose.model('RefreshToken', RefreshToken);

/**
 * Images Schema
 */
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

var AlbumModel = mongoose.model('Album', Album);

// exports
module.exports.AlbumModel = AlbumModel;
module.exports.UserModel = UserModel;
module.exports.ClientModel = ClientModel;
module.exports.AccessTokenModel = AccessTokenModel;
module.exports.RefreshTokenModel = RefreshTokenModel;