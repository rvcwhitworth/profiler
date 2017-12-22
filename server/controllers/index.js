var fetchUserInfo = require('../api_helpers/full_contact.js');
var db = require('../../database');

const get = function (req, res) {
  db.fetchProfiles((err, profiles) => {
    if (err) {
      console.error('Error retrieving from db', err);
      respond(res, 500);
    } else {
      respond(res, 200, profiles);
    }
  })
};

const post = function (req, res) {
  const email = req.body;
  
  fetchUserInfo(email, (err, apiResponse, apiBody) => {
    if (apiResponse.statusCode === 404) {
      console.log('No results found for', email);
      db.saveProfile(email, 'Nothing found!', (err, profile) => respond(res, 404));   
      
    } else if (apiResponse.statusCode === 202) {
      console.log('Waiting for results for', email, 'will try again in 3 minutes');
      db.saveProfile(email, null, refetchFromApi);
      respond(res, 202); 

    } else {
      console.log('Results found for', email, 'saving to db');
      db.saveProfile(email, apiBody, (err, profile) => respond(res, 201));
    }
  });
};

const refetchFromApi = function(err, profile) {
    setTimeout((profile) => {
      fetchUserInfo(profile.email), (err, apiResponse, apiBody) => {
        if (apiResponse.statusCode === 404) {
          console.log('No results found for', email);
          db.saveProfile(profile.email, 'Nothing found!', (err, profile) => respond(res, 404));      

        } else if (api.Response.statusCode === 202) {
          console.log('Waiting for results for', email, 'will try again in 3 minutes');
          refetchFromApi(null, profile);

        } else {
          console.log('Results found for', email, 'saving to db');
          db.saveProfile(profile.email, apiBody, (err, profile) =>  respond(res, 201));
        }
      }
    }, 1000 * 60 * 3);
};

const respond = function(res, statusCode, body = null) {
  statusCode === 200 ? res.status(statusCode).send(body) : res.status(statusCode).end();
};

module.exports.get = get;
module.exports.post = post;