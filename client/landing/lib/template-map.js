createLandingMap = function() {
	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

	var map = L.map('map-canvas', {
		zoomControl: false,
		zoom: 18
	});
	L.tileLayer.provider('MapQuestOpen.OSM').addTo(map);
	//L.tileLayer.provider('OpenMapSurfer.Roads').addTo(map);
	//L.tileLayer.provider('HikeBike.HikeBike').addTo(map);

	addSearchControl(map);
	map.addControl(new L.Control.Zoom());
	addLeafletLocateControl(map);
	landingmap = map;
};

addSearchControl = function(map) {
	map.addControl(new L.Control.Search({
		position: 'topleft',
		container: 'placessearchbox',
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat', 'lon'],
		autoType: false,
		tipAutoSubmit: true,
		autoCollapse: false,
		autoCollapseTime: 20000,
		animateLocation: true,
		markerLocation: true,
		delayType: 800
	}));
};

addLeafletLocateControl = function(map) {
	var lc = L.control.locate({
		position: 'topleft', // set the location of the control
		drawCircle: false, // controls whether a circle is drawn that shows the uncertainty about the location
		follow: true, // follow the user's location
		setView: true, // automatically sets the map view to the user's location, enabled if `follow` is true
		keepCurrentZoomLevel: true, // keep the current map zoom level when displaying the user's location. (if `false`, use maxZoom)
		stopFollowingOnDrag: true, // stop following when the map is dragged if `follow` is true (deprecated, see below)
		remainActive: false, // if true locate control remains active on click even if the user's location is in view.
		markerClass: L.circleMarker, // L.circleMarker or L.marker
		circleStyle: {}, // change the style of the circle around the user's location
		markerStyle: {},
		followCircleStyle: {}, // set difference for the style of the circle around the user's location while following
		followMarkerStyle: {},
		icon: 'fa fa-map-marker', // class for icon, fa-location-arrow or fa-map-marker
		iconLoading: 'fa fa-spinner fa-spin', // class for loading icon
		circlePadding: [0, 0], // padding around accuracy circle, value is passed to setBounds
		metric: true, // use metric or imperial units
		onLocationError: function(err) {
			alert(err.message)
		}, // define an error callback function
		onLocationOutsideMapBounds: function(context) { // called when outside map boundaries
			alert(context.options.strings.outsideMapBoundsMsg);
		},
		showPopup: true, // display a popup when the user click on the inner marker
		strings: {
			title: "Show me where I am", // title of the locate control
			popup: "You are within {distance} {unit} from this point", // text to appear if user clicks on circle
			outsideMapBoundsMsg: "You seem located outside the boundaries of the map" // default message for onLocationOutsideMapBounds
		},
		locateOptions: {
		} // define location options e.g enableHighAccuracy: true or maxZoom: 10
	}).addTo(map);
	lc.start();
};

onLocationError = function(e) {
	alert(e.message);
}