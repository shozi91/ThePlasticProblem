
function createMap(data){

  // Creating map object
  var myMap = L.map("map", {
    center: [29.081209, 1.123285],
    zoom: 3
  });

  // Adding tile layer to the map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

  

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < data.length; i++) {

      // Set the data location property to a variable


        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([data[i].lat, data[i].lon])
          .bindPopup(data[i].Totalltems_EventRecord));
    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

}

d3.json("/cleanup").then(function(data){
  createMap(data)

});
