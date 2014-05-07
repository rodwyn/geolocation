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