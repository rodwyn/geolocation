// load the modules
var Geolocation = require('./modules/geolocation');
var Log = require('./modules/log');

var infos = document.querySelector('#infos');
var log = new Log(infos);

var geo = new Geolocation();
// pass the callback to process the localize result
geo.localize(function (position) {

	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var accuracy = position.coords.accuracy;

	log.send('Position found');
	log.send('Lattitude: ' + latitude);
	log.send('Longitude: ' + longitude);
	log.send('Accuracy: ' + accuracy + '%');

	log.send('Preparing the request');

	// build the request url
	var url = 'http://localhost:8888/geolocation/build/php/api.php?lat=' + latitude + '&long=' + longitude + '&number=3';

	// new Ajax request
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	// on success
	request.onload = function () {
		if(request.status >= 200 && request.status < 400) {

			var hospitals = JSON.parse(request.responseText);
			log.send('Request success', '#98D69D');
			log.send('Data: ', '#B698D6');

			if(hospitals.length == 0) {
				log.send('Hospital list empty', '#E3445F');
			}

			// output the results
			for(var i = 0; i < hospitals.length; i++) {
				var hospital = hospitals[i];
				log.send('Hospital ' + hospital.name + ', ' + hospital.distance + 'km from here', '#B698D6');
			}

		} else {
			// the request was successful but not the response
			log.send('Request response error', '#E3445F');
		}
	};

	// on error
	request.onerror = function () {
		log.send('Request connection error', '#E3445F');
	};

	request.send();

	log.send('Request sent');
	log.send(url, '#D698B9');
});

log.send('Looking for your position');