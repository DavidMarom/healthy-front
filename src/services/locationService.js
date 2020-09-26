var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optionnal depending of the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyD48cLvI1UnPBN9VwVQCC7mggtK5SYqxBU', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode('', function(err, res) {
  console.log(res);
});

// Or using Promise
geocoder.geocode('29 champs elysée paris')
  .then(function(res) {
    console.log(res);
  })
  .catch(function(err) {
    console.log(err);
  });