placesservice = null;
displaySuggestions = function(predictions, status) {
	if (status != google.maps.places.PlacesServiceStatus.OK) {
		alert(status);
		return;
	}

	predictions.forEach(function(prediction) {
		/*
		var li = document.createElement('li');
		li.appendChild(document.createTextNode(prediction.description));
		document.getElementById('results').appendChild(li);
		*/
		console.info(prediction);
	});
};

getPlacesService = function() {
	if (GoogleMaps.loaded()) {
		if (placesservice == null) {
			placesservice = new google.maps.places.AutocompleteService();
		} 
		return placesservice;
	} else {
		console.error("Google Maps Not Loaded!!!");
	}
}