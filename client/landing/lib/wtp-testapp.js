landingmap=null;
if (Meteor.isClient) {  
  Meteor.startup(function() {});

  Template.map.rendered = function() {
    createLandingMap();
  }
}


if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}