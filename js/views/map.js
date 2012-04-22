define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/map.html',
  'order!d3'
], function($, _, Backbone, templateMap) {

  var MapView = Backbone.View.extend({
    	tagName: "div",
        className: "map",
        template: _.template(templateMap),

  	    initialize: function(options) {
		    _.bindAll( this, "zoom" );
            //this.render();

            var width = options.width, height = options.height;
            var projection = d3.geo.albersUsa().scale(width).translate([width / 2, height / 2]);
            this.projection = projection;

            var path = d3.geo.path().projection(projection);
            this.path = path;

            var svg = d3.select("#map").append("svg");
            var zoom = d3.behavior.zoom().translate(projection.translate())
                                         .scale(projection.scale())
                                         .scaleExtent([height, 8 * height])
                                         .on("zoom", this.zoom);
            var states = svg.append("g").attr("id", "states").call(zoom);
            this.states = states;

            d3.json("json/us-states.json", function(json) {
                states.selectAll("path").data(json.features).enter().append("path").attr("d", path).on("mouseover", function(datum, index) {
                    d3.select(this).style("fill", "blue");
                }).on("mouseout", function(datum, index) {
                    d3.select(this).style("fill", "red ");
                });
            });

            this.states.selectAll("path").transition().duration(1000).attr("d", path);

	    },	

        zoom: function() {
            this.projection.translate(d3.event.translate).scale(d3.event.scale);
            this.states.selectAll("path").attr("d", this.path);
        },

        render: function() {
            $(this.el).html(this.template());
	    }

  });

  return MapView;
});
