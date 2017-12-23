const request = require('request');
const config = require('../../config.js');

module.exports = function fetchUserInfo (email, cb) {
    const options = {
        url: `https://api.fullcontact.com/v2/person.json?email=${email}`,
        headers: {
            'X-FullContact-APIKey': process.env.API_KEY || config.FULL_CONTACT_KEY
        }
    }

    request(options, cb);
}