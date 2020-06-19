

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
var data = d3.map();
var colorScheme = d3.schemeReds[9];
colorScheme.unshift("#eee")
var colorScale = d3.scaleThreshold()
    .domain([100001, 250001, 500001, 1000001, 2500001, 5000001, 10000001, 25000001, 50000001])
    .range(colorScheme);

// Legend
var g = svg.append("g")
    .attr("class", "legendThreshold")
    .attr("transform", "translate(20,20)");
g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Plastic Waste in Tonnes");
var labels = ['0-100,000', '100,001-250,000', '250,001-500,000', '500,001-1,000,000', '1,000,001-2,500,000', '2,500,001-5,000,000', '5,000,001-7,500,000', '7,500,001-10,000,000', '10,000,001-25,000,000', '>25,000,000'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3.queue()
    .defer(d3.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.json, "../data/plastic_waste_generation_total", function(d){data.set(d.Entity, +d.Plastic_Waste_Generation_tonnes); })
    .await(ready);

function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.Entity = data.get(d.name) || 0;
                // Set the color
                return colorScale(d.Plastic_Waste_Generation_tonnes);
            })
            .attr("d", path);
}