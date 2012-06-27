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
		    //_.bindAll( this, "click" );
            //this.render();

            var width = options.width, height = options.height;
            var projection = d3.geo.albersUsa().scale(width).translate([0, 0]);
            this.projection = projection;

            var path = d3.geo.path().projection(projection);
            this.path = path;

            var svg = d3.select("#map").append("svg").attr("width", width).attr("height", height);
            svg.append("rect").attr("class", "background").attr("width", width).attr("height", height).on("click", click);

            states = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")").append("g").attr("id", "states");

            d3.json("json/us-states.json", function(json) {
                states.selectAll("path").data(json.features).enter().append("path").attr("d", path).on("mouseover", function(datum, index) {
                    d3.select(this).style("fill", "blue");
                }).on("mouseout", function(datum, index) {
                    d3.select(this).style("fill", "white");
                }).on("dblclick", click).call(drag);
            });

            var drag = d3.behavior.drag().origin(Object).on("drag", dragmove);

            states.selectAll("path").transition().duration(1000).attr("d", path);
            this.states = states;

            var zoomed = false;

            function dragmove(d) {
                var x = 0, y = 0;

                console.log("drag");
                var centroid = path.centroid(d);
                x = -centroid[0];
                y = -centroid[1];

                states.transition().attr("transform", "translate(" + x + "," + y + ")"))
            }

            function click(d) {
                var k = 1;

                if (!zoomed) {
                    k = 4;
                    zoomed = true;
                } else {
                    zoomed = false;
                }

                states.transition().duration(1000).attr("transform", "scale(" + k + ")").style("stroke-width", 1.5 / k + "px");
            }
        },

        render: function() {
            $(this.el).html(this.template());
	    }

  });

  return MapView;
});
