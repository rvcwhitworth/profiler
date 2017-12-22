var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/profiler', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var profile = mongoose.Schema({
    //TODO write schema
});

var Profile = mongoose.model('Profile', userSchema);

var saveProfile = function(profile) {
    //TODO
};

var fetchProfile = function(id) {
    //TODO
}

module.exports.saveProfile = saveProfile;
module.exports.fetchProfile = fetchProfile;