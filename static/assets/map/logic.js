// Create a map object
var myMap = L.map("map", {
  center: [10, -50],
  zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 3,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give each city a different radius based on its population
function markerSize(All_sizes_tonnes) {
  return All_sizes_tonnes *15;
}

// Each city object contains the city's name, location and population

d3.json("/surface_plastic_mass_by_ocean").then(function (data) {
  console.log(data)
});


var cities = [
  {Entity: "Indian Ocean",location: [-20.73, 78.81], All_sizes_tonnes: 59130},
  {Entity: "Mediterranean Sea",location: [36.22 , 17.82], All_sizes_tonnes: 23150},
  {Entity: "North Atlantic",location: [36.64,-41.41], All_sizes_tonnes: 56470},
  {Entity: "North Pacific",location: [38.0, -145.0], All_sizes_tonnes: 96400},
  {Entity: "South Atlantic",location: [-28.24,-15.57], All_sizes_tonnes: 12780},
  {Entity: "South Pacific",location: [-23.6, -137.0], All_sizes_tonnes: 21020}];

// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: "transparent",
    fillColor: "neon",
    // Setting our circle's radius equal to the output of our markerSize function
    // This will make our marker's size proportionate to its population
    radius: markerSize(cities[i].All_sizes_tonnes)
  }).bindPopup("<h1>" + cities[i].Entity + "</h1> <hr> <h3>Tonnes of Plastic Garbage: " + cities[i].All_sizes_tonnes + "</h3>").addTo(myMap);
}


myMap.fitBounds([
  [36.64,-141.41],
  [-20.73, 78.81]])

  
//   $('.navbar-expand').on('shown.bs.collapse', function() {
//     myMap.fitBounds([
//       [36.64,-141.41],
//       [-20.73, 78.81]])
//   });


// $('.navbar-collapse').on('shown.bs.collapse', function() {
//   myMap.fitBounds([
//     [36.64,-141.41],
//     [-20.73, 78.81]])
// });

//window.addEventListener("resize", myFunction);


//function myFunction() {
  //myMap.fitBounds([
    //[36.64,-141.41],
   // [-20.73, 78.81]])
//};


// /*Scroll to top when arrow up clicked BEGIN*/
// $(window).scroll(function() {
//   var height = $(window).scrollTop();
//   if (height > 100) {
//       $('#back2Top').fadeIn();
//   } else {
//       $('#back2Top').fadeOut();
//   }
// });
// $(document).ready(function() {
//   $("#back2Top").click(function(event) {
//       event.preventDefault();
//       $("html, body").animate({ scrollTop: 0 }, "slow");
//       return false;
//   });

// });
/*Scroll to top when arrow up clicked END*/
