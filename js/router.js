// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/map'
], function ($, _, Backbone, MapView) {

  var AppRouter = Backbone.Router.extend({

    routes: {
      '*actions': 'defaultAction'
    },

    initialize: function(options) {
        //_.bindAll( this, "show", "filter");
        var mapView = new MapView( { el: "#map", width: 800, height: 400 } );
    },

    show: function(movieId) {
    },

    defaultAction: function(event) {
    }

  });

  var initialize = function() {
    var app_router = new AppRouter;
    Backbone.history.start();
  };

  return {
      initialize: initialize
  }

});
