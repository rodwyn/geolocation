var Geolocation = require('./modules/geolocation');
var Log = require('./modules/log');

var infos = document.querySelector('#infos');
var log = new Log(infos);

console.log(log);

var geo = new Geolocation();
geo.localize(function (position) {

	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;

	log.send('Position found', 'green');
	log.send('Lattitude: ' + latitude, 'green');
	log.send('Longitude: ' + longitude, 'green');
	log.send('Accuracy: ' + accuracy, 'green');

	log.send('Preparing the request');

	var url = 'http://localhost:8888/geolocation/build/php/api.php?lat=' + latitude + '&long=' + longitude;

	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function () {
		if(request.status >= 200 && request.status < 400) {
			log.send('Request success', 'green');
		} else {
			log.send('Request response error', 'red');
		}
	};

	request.onerror = function () {
		log.send('Request connection error', 'red');
	};

	request.send();

	log.send('Request sent');
	log.send(url, 'blue');
});

log.send('Looking for your position');