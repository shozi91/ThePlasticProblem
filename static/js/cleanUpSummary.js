tableData = []
colorScale = []
 d3.json("/summary_earth").then(function(data){
     var dataLength = data.length
    data.forEach(function(data,index){
         catItems = data.Categorized_Items
         totals = data.Total_Items
        var d = {
            label: catItems,
            value: totals
        }
        var color = 0
        if(dataLength < 100){
            color = index/100
        }
        else{
            color = index/dataLength
        }
        
         tableData.push(d)
         colorScale.push(d3.interpolateViridis(color))
     })
     tableData.sort(function(first,second){
         return second.value-first.value
     });


    const options = {
        block: {
            dynamicHeight: true,
            highlight: true,
            minHeight: 40,
            fill:{
                scale: colorScale
            }
        },
        chart: {
            width : Math.round((window.innerWidth)*0.75),
            height: 1900,
            animate:1,
            curve:{
                enabled: true,
                height: 30
            }

        },
        label:{
            fontFamily: "Open Sans",
        }
    };
    
    const chart = new D3Funnel('#funnel');
    chart.draw(tableData, options);
 });


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
          .bindPopup("<h3>Volunteers: " + data[i].TotalVolunteers + "</h3><hr><h4> Total Items Collected: "+ data[i].Totalltems_EventRecord +  "</h4>"))
      }
  
      // Add our marker cluster layer to the map
      myMap.addLayer(markers);
  
  }
  
  d3.json("/cleanup").then(function(data){
    createMap(data)
  
  });
  