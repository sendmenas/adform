(function() {
	const Main = window.CLASSES.Main = function() {
		this.dataUrl = 'https://raw.githubusercontent.com/zemirco/sf-city-lots-json/master/citylots.json';
		this.streetsContainer = document.getElementById('container');
		this.loader = document.getElementById('spinner');
		this.cityArr = [];
	};

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
	}
})();