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