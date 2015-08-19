if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load({
      v: '3',
      libraries: 'geometry,places'
    });

  });
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.events({
    'click #toggle': function() {
      $("#tuckedMenu").toggleClass('custom-menu-tucked');
      $("#toggle").toggleClass('x');
    }
  });

  Template.map.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {

        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: 15,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            position: google.maps.ControlPosition.TOP_RIGHT,
            mapTypeIds: [
              google.maps.MapTypeId.ROADMAP
            ]
          },
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT
          }
        };
      }
    }
  });

  /*Template.menubar.events({
    'keyup #placessearch': function(event) {
      if (event.target.value && event.target.value.length>3) {
        getPlacesService().getQueryPredictions({
          input: event.target.value
        }, displaySuggestions);
      }
    }
  });*/

  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      var centerControlDiv = document.createElement('div');
      // Set CSS for the control border.
      var controlUI = document.createElement('div');
      controlUI.style.backgroundColor = '#fff';
      controlUI.style.border = '1px solid gray';
      controlUI.style.borderRadius = '3px';
      controlUI.style.cursor = 'pointer';
      controlUI.style.textAlign = 'center';
      controlUI.title = 'Click to recenter the map';
      centerControlDiv.appendChild(controlUI);

      // Set CSS for the control interior.
      var controlText = document.createElement('div');
      controlText.style.color = 'rgb(25,25,25)';
      controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
      controlText.style.paddingLeft = '5px';
      controlText.style.paddingRight = '5px';
      controlText.className = "widget-mylocation-button";
      controlText.innerHTML = '<img src="icons/centerme.png"/>';
      controlUI.appendChild(controlText);

      // Setup the click event listeners: simply set the map to Chicago.
      controlUI.addEventListener('click', function() {
        map.instance.setCenter(Geolocation.latLng());
      });

      centerControlDiv.index = 1;
      map.instance.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
      // Geo Complete 
      var options = {};


      $("#placessearch").geocomplete(options)
        .bind("geocode:result", function(event, result) {
          var marker = new google.maps.Marker({
            position: result.geometry.location,
            animation: google.maps.Animation.DROP,
            map: map.instance
          });
          map.instance.setCenter(result.geometry.location);
        })
        .bind("geocode:error", function(event, status) {
          console.log("ERROR: " + status);
        })
        .bind("geocode:multiple", function(event, results) {
          console.log("Multiple: " + results.length + " results found");
        });

      var latLng = Geolocation.latLng();

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng.lat, latLng.lng),
        animation: google.maps.Animation.DROP,
        map: map.instance,
        icon: 'icons/currentloc.png'
      });

    });
  });
}
if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}