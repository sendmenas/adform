function makeRequests() {
	const requestTestUrl = 'https://www.w3schools.com/js/demo_get2.asp?';
	const queue = new window.CLASSES.QueueHandler();
	for (let i = 1; i <= 100; i++) {
		if (i == 6) {
			queue.addToQueue('GET', requestTestUrl + 'fname=priority&lname=1', 1);
		} else if (i == 7) {
			queue.addToQueue('GET', requestTestUrl + 'fname=priority&lname=2', 2);
		} else if (i == 8) {
			queue.addToQueue('GET', requestTestUrl + 'fname=priority&lname=3', 3);
		} else {
			queue.addToQueue('GET', requestTestUrl + 'fname=Henry&lname=Ford', 0);
		}			
	}
}