var Geolocation = require('./modules/geolocation');
var Log = require('./modules/log');

var infos = document.querySelector('#infos');
var log = new Log(infos);

console.log(log);

var geo = new Geolocation();
geo.localize(function (position) {
	log.send('Position found', 'green');
	log.send('Lattitude: ' + position.coords.latitude, 'green');
	log.send('Longitude: ' + position.coords.longitude, 'green');
	log.send('Accuracy: ' + position.coords.accuracy, 'green');

	log.send('Sending request');
});

log.send('Looking for your position');