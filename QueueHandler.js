(function() {
	/**
	* @constructor
	*/
	const QueueHandler = window.CLASSES.QueueHandler = function() {
		this.queue = [];
		this.runningRequest = 0;
	}

	/**
	* Add request to queue
	* @param {String} method - request method (POST, GET etc.)
	* @param {String} url - request url address
	* @param {Int} priority - request priority
	*/
	QueueHandler.prototype.addToQueue = function(method, url, priority = 0) {
		if (this.runningRequest < 5) {
			this.makeCall(method, url);
		} else {
			if (priority > 0) {
				if (this.queue.length > 0) {
					for (let i = 0; i < this.queue.length; i++) {
						let arrItem = this.queue[i];
						if (arrItem.priority < priority) {
							this.queue.splice(i, 0, { method, url, priority });
							break;
						}
					}
				} else {
					this.queue.push({ method, url, priority })
				}
			} else {
				this.queue.push({ method, url, priority })
			}
		}
	}

	/**
	* Check for pending request in queue
	*/
	QueueHandler.prototype.checkQueue = function() {
		if (this.queue.length > 0) {
			let props = this.queue[0];
			this.makeCall(props.method, props.url);
			this.queue.shift();
		}
	}

	/**
	* Make request to url
	* @param {String} method - request method (POST, GET etc.)
	* @param {String} url - request url address
	*/
	QueueHandler.prototype.makeCall = function(method, url) {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				this.runningRequest--;
				this.checkQueue();
			}
		}
		this.runningRequest++;
		xhttp.open(method, url, true);
		xhttp.send();
	}

})();