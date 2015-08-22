landingmap = null;
if (Meteor.isClient) {
  Meteor.startup(function() {});

  Template.map.rendered = function() {
    createLandingMap();
  }

  Template.menubar.rendered = function(){
    if(landingmap){
      addSearchControl(landingmap);
    }
  }

  Template.body.events({
    'click #toggle': function() {
      $("#tuckedMenu").toggleClass('custom-menu-tucked');
      $("#toggle").toggleClass('x');
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}