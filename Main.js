(function() {
	/**
	* @constructor
	*/
	const Main = window.CLASSES.Main = function() {
		this.cityArr = [];
		this.dataUrl = 'https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json';
		this.streetsContainer = document.getElementById('container');
		this.loader = document.getElementById('spinner');
		this.button = document.getElementById('button');
		this.button.addEventListener('click', this.makeRequests);
	};

	/**
	* Request data with city name
	*/
	Main.prototype.getData = function() {
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				this.loader.style = 'display: none;';
				const data = JSON.parse(xhttp.responseText);
				const itemsArr = data.features;
				let streetName = "";
				for (let i = 0; i < itemsArr.length; i++) {
					if (itemsArr[i].properties && itemsArr[i].properties.STREET && this.cityArr.indexOf(itemsArr[i].properties.STREET) == -1) {
						streetName = itemsArr[i].properties.STREET;
						this.cityArr.push(streetName);
						const itemDiv = document.createElement('div');
						itemDiv.innerText = this.cityArr.length + '. ' + streetName;
						this.streetsContainer.appendChild(itemDiv);
					}
				}
			}
		};
		xhttp.open("GET", this.dataUrl, true);
		xhttp.send();
	};

	/**
	* Make 100 request (some with different priority)
	*/
	Main.prototype.makeRequests = function(e) {
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
				queue.addToQueue('GET', requestTestUrl + 'fname=Henry&lname=Ford');
			}			
		}
	};
})();