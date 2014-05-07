(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./modules/geolocation":2,"./modules/log":3}],2:[function(require,module,exports){
var Geolocation = function () {
	if(!this.isAvailable) {
		console.warn('The geolocation API is not available in your browser');
	}
}

Geolocation.prototype = {

	/**
	 * Check if the api is available
	 * @return {Bool} 
	 */
	isAvailable: function () {
		return navigator.geolocation;
	},

	/**
	 * Start the localization
	 * @param {Function} callback
	 */
	localize: function (callback) {
		if(!this.isAvailable) {
			console.warn('The geolocation API is not available in your browser');
			return false;
		}

		navigator.geolocation.getCurrentPosition(callback, function (error) {
			console.log('Error', error);
		});
	}

}

module.exports = Geolocation;
},{}],3:[function(require,module,exports){
var Log = function (el) {
	this.el = el;
}

Log.prototype = {
		
	/**
	 * Log a new message
	 * @param {String} message
	 * @param {String} color
	 */
	send: function (message, color) {		
		var line = document.createElement('div');

		if(typeof color !== 'undefined') {
			line.style.color = color;
		}
		
		var span = document.createElement('span');
		span.innerHTML = '>';

		var text = document.createElement('p');
		text.innerHTML = message;

		line.appendChild(span);
		line.appendChild(text);
		
		this.el.appendChild(line);
	}

}

module.exports = Log;
},{}]},{},[1])