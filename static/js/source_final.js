
// FOR PIE CHART


d3.json("/plastic_waste_by_sector").then(function(data){
    console.log(data)
    
    var labels = []
    var values = []

    data.forEach(function(data){
        labels.push(data.Entity)
        values.push(data.Primary_Plastic_Waste_Generation_tonnes)
    });

    var trace1 = {
        labels: labels,
        values: values,
        type: 'pie'
      };
      
      var data = [trace1];
      
      var layout = {
        title: "Plastic Waste by Sector (tonnes and %)",
      };
      
      Plotly.newPlot("plot", data, layout);

      console.log(labels)
      console.log(values)

 });

// FOR STACKED BAR CHART ***IF WE HAVE TIME, LOAD NEW FILE TO GET VOLUME AS OPPOSED TO %


 d3.csv("static/data/global_plastics_production_and_waste.csv").then(function(data){
    console.log(data)
    
    var x = []
    var y1 = []
    var y2 = []
    var y3 = []

    data.forEach(function(data){
        x.push(data.Year)
        y1.push(data.Discarded_tonnes)
        y2.push(data.Incinerated_tonnes)
        y3.push(data.Recycled_tonnes)
    });

        var trace1 = {
            x: x,
            y: y1,
            name: 'Discarded (Tonnes)',
            type: 'bar'
        };
      
        var trace2 = {
            x: x,
            y: y2,
            name: 'Incinerated (Tonnes)',
            type: 'bar'
        };

        var trace3 = {
            x: x,
            y: y3,
            name: 'Recycled (Tonnes)',
            type: 'bar'
        };
      var data = [trace1, trace2, trace3];
      
      var layout = {
        title: "The Fate of Plastics Produced since 1950 (place holder, put as header instead so we can play with it)",
        barmode: 'stack'};
      
      Plotly.newPlot('stackbar', data, layout)
    
 });
 

 // FOR MAP

var geojson;

function drawMap(data){

  var myMap = L.map("map", {
    center: [29.081209, 1.123285],
    zoom: 3
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "plastic_waste",

    // Set color scale
    scale: ["#ffffff","#e8be29","#dc8416","#b10026"],

    // Number of breaks in step range
    steps: 20,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Country Name: " + feature.properties.name + "<br>Plastic Waste (tonnes):<br>" + feature.properties.plastic_waste);
    }
  }).addTo(myMap);



  // Set up the legend
  var legend = L.control({ position: "bottomright", maxWidth: "10%" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];
    console.log(limits)

    // Add min & max
    var legendInfo = "<h1>Plastic Waste (tonnes)</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);
}

// Grab data with d3
d3.json("/plastic_waste_generation_total").then(function(data) {
  drawMap(data)

  console.log(data)
});
