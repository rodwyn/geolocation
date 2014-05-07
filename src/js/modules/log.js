var Log = function (el) {
	this.el = el;
}

Log.prototype = {
	
	send: function (message, color) {		
		var line = document.createElement('div');
		if(typeof color !== 'undefined') {
			line.style.color = color;	
		}
		line.innerHTML = message;
		this.el.appendChild(line);
	}

}

module.exports = Log;