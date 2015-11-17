var log                 = require('./lib/log')(module);
var mongoose            = require('./lib/mongoose').mongoose;
var UserModel           = require('./lib/mongoose').UserModel;
var ClientModel         = require('./lib/mongoose').ClientModel;
var AccessTokenModel    = require('./lib/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./lib/mongoose').RefreshTokenModel;
var faker               = require('Faker');

UserModel.remove({}, function(err) {
    var user = new UserModel({ username: "igor", password: "password" });
    user.save(function(err, user) {
        if(err) return log.error(err);
        else log.info("New user - %s:%s",user.username,user.password);
    });

    for(var i=0; i<4; i++) {
        var user = new UserModel({ username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0] });
		
        user.save(function(err, user) {
            if(err) return log.error(err);
            else log.info("New user - %s:%s",user.username,user.password);
        });
    }
});

ClientModel.remove({}, function(err) {
    var client = new ClientModel({ name: "OurService iOS client v1", clientId: "mobileV1", clientSecret:"abc123456" });
    client.save(function(err, client) {
        if(err) return log.error(err);
        else log.info("New client - %s:%s",client.clientId,client.clientSecret);
    });
});
AccessTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});
RefreshTokenModel.remove({}, function (err) {
    if (err) return log.error(err);
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);