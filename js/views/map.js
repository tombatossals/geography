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

            var projection = d3.geo.albersUsa()
                            .scale(width)
                            .translate([width / 2, height / 2]);

            var path = d3.geo.path().projection(projection);

            var zoom = d3.behavior.zoom()
                         .translate(projection.translate())
                         .scale(projection.scale())
                         .scaleExtent([height, 8 * height])
                         .on("zoom", zoom);

            var svg = d3.select("#map").append("svg")
                        .attr("width", width)
                        .attr("height", height);

            var states = svg.append("g")
                            .attr("id", "states")
                            .call(zoom);

            states.append("rect")
                  .attr("class", "background")
                  .attr("width", width)
                  .attr("height", height);

            d3.json("json/us-states.json", function(json) {
                states.selectAll("path")
                      .data(json.features)
                      .enter().append("path")
                      .attr("d", path)
                      .on("click", click);
            });

            function click(d) {
                var centroid = path.centroid(d),
                               translate = projection.translate();

                projection.translate([
                        translate[0] - centroid[0] + width / 2,
                        translate[1] - centroid[1] + height / 2
                ]);

                zoom.translate(projection.translate());

                states.selectAll("path").transition().duration(1000).attr("d", path);
            }

            function zoom() {
                projection.translate(d3.event.translate).scale(d3.event.scale);
                states.selectAll("path").attr("d", path);
            }

        },

        render: function() {
            $(this.el).html(this.template());
	    }

  });

  return MapView;
});
