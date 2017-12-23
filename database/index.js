var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB || 'mongodb://localhost/profiler', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var profileSchema = mongoose.Schema({
    info: String,
    email: String
});

var Profile = mongoose.model('Profile', profileSchema);

var saveProfile = function(email, profile, cb) {
    Profile.find({email: email}, (err, profiles) => {
        if (err) console.error('Error during save to db:', err);

        if (!profiles.length) {
            var newProf = new Profile({
                info: profile,
                email: email
            });
            
            console.log('created profile model', newProf);
            newProf.save(cb);
        }
    });
};

var updateProfile = function(email, profile, cb)  {
    Profile.update({email: email}, {info: profile}, cb);
}

var fetchProfiles = function(cb) {
    Profile.find().exec((err, profiles) => {
        cb(profiles.map((profile) => {
            return {
                email: profile.email,
                info: JSON.parse(profile.info)
            }
        }));
    });
}

var profileExists = function(email, cb) {
    Profile.find({email: email}).exec(cb);
}

module.exports.saveProfile = saveProfile;
module.exports.fetchProfiles = fetchProfiles;
module.exports.updateProfile = updateProfile;