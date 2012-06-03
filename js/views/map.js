define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/map.html',
  'd3'
], function($, _, Backbone, templateMap) {

  var MapView = Backbone.View.extend({
    	tagName: "div",
        className: "map",
        template: _.template(templateMap),

  	    initialize: function(options) {
		    _.bindAll( this, "click" );
            //this.render();

            var width = options.width, height = options.height;
            var projection = d3.geo.albersUsa().scale(width).translate([0, 0]);
            this.projection = projection;

            var path = d3.geo.path().projection(projection);
            this.path = path;

            var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);
            svg.append("rect").attr("class", "background").attr("width", width).attr("height", height).on("click", this.click);

            states = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")").append("g").attr("id", "states");

            d3.json("json/us-states.json", function(json) {
                states.selectAll("path").data(json.features).enter().append("path").attr("d", path).on("mouseover", function(datum, index) {
                    d3.select(this).style("fill", "blue");
                }).on("mouseout", function(datum, index) {
                    d3.select(this).style("fill", "red ");
                }).on("click", this.click);
            });

            states.selectAll("path").transition().duration(1000).attr("d", path);
            this.states = states;

	    },	

        click: function(d) {
            var x = 0, y = 0, k = 1;

            console.log(d);
            if (d && centered !== d) {
                var centroid = path.centroid(d);
                x = -centroid[0];
                y = -centroid[1];
                k = 4;
                centered = d;
            } else {
                centered = null;
            }

            this.states.transition().duration(1000).attr("transform", "scale(" + k + ")translate(" + x + "," + y + ")").style("stroke-width", 1.5 / k + "px");

        },

        render: function() {
            $(this.el).html(this.template());
	    }

  });

  return MapView;
});
