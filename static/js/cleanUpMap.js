
function createMap(markerData) {
    console.log(markerData)
    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 10,
      tileSize: 256,
      id: "light-v10",
      accessToken: API_KEY
    });
  
    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
      "Light Map": lightmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Clean Ups": markerData
    };
  
    // Create the map object with options
    var map = L.map("map", {
        center: [29.081209, 1.123285],
        zoom: 2,
        layers: [lightmap, markerData]
    });
  
    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }

  function createMarkers(data){
    var cleanupMarkers = [];

    for (var index = 0; index < data.length; index++){
        var cleanUpPoint = data[index];

        var cleanMarker = L.marker([cleanUpPoint.lat, cleanUpPoint.lon])
        .bindPopup("<h3>Volunteers: " + cleanUpPoint.TotalVolunteers + "</h3><hr><h4> Total Items Collected: "+ cleanUpPoint.Totalltems_EventRecord +  "</h4>")
        
        cleanupMarkers.push(cleanMarker)
    }

    createMap(L.layerGroup(cleanupMarkers));
  }

d3.json("/cleanup").then(function(data){
   createMarkers(data)

 });