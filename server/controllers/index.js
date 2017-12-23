var fetchUserInfo = require('../api_helpers/full_contact.js');
var db = require('../../database');
var request = require('request');

const get = function (req, res) {
  db.fetchProfiles((profiles) => {
      respond(res, 200, profiles);
  })
};

const post = function (req, res) {
  const email = req.body;
  
  fetchUserInfo(email, (err, apiResponse, apiBody) => {
    console.log('api body', apiBody, 'type:', typeof apiBody);
    if (apiResponse.statusCode === 404) {
      console.log('No results found for', email);
      respond(res, 404);   
      
    } else if (apiResponse.statusCode === 202) {
      console.log('Waiting for results for', email, 'will try again in 3 minutes');
      refetchFromApi(email);
      respond(res, 202); 

    } else {
      console.log('Results found for', email, 'saving to db');
      db.saveProfile(email, apiBody, (err, profile) => respond(res, 201));
    }
  });
};

const refetchFromApi = function(email) {
    setTimeout((email) => {
      fetchUserInfo(email), (err, apiResponse, apiBody) => {
        if (apiResponse.statusCode === 404) {
          console.log('No results found for', email);
          db.saveProfile(email, 'Nothing found!', (err, profile) => respond(res, 404));      

        } else if (api.Response.statusCode === 202) {
          console.log('Waiting for results for', email, 'will try again in 3 minutes');
          refetchFromApi(profile);

        } else {
          console.log('Results found for', email, 'saving to db');
          db.saveProfile(email, apiBody, (err, profile) =>  respond(res, 201));
        }
      }
    }, 1000 * 60 * 3);
};

const preview = function(req, res) {
  request(req.body, function(err, getResponse, body) {
    if (err) console.error('error retrieving preview', err);
    else {
      respond(res, 200, body);
    }
  });
}

const deleteProfile = (req, res) => {
  db.deleteProfile(req.body, (err) => {
    if (err) console.error('Error deleting from db');
    else {
      respond(res, 202);
    }
  });
};

const respond = function(res, statusCode, body = null) {
  statusCode === 200 ? res.status(statusCode).send(body) : res.status(statusCode).end();
};

module.exports.get = get;
module.exports.post = post;
module.exports.preview = preview;
module.exports.delete = deleteProfile;