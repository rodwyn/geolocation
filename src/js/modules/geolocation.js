var Geolocation = function () {

	if(!this.isAvailable) {
		console.warn('The geolocation API is not available in your browser');
	}

}

Geolocation.prototype = {

	isAvailable: function () {
		return navigator.geolocation;
	},

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