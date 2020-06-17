function makeplot() {
    Plotly.d3.csv("../mws/global_plastics_production.csv", function(data){ processData(data) } );
};
   
function processData(allRows) {

   console.log(allRows);
   var x = [], y = [], standard_deviation = [];

   for (var i=0; i<allRows.length; i++) {
       row = allRows[i];
       x.push( row['Year'] );
       y.push( row['Global_plastic_Production_tonnes'] );
   }
   console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
   makePlotly( x, y, standard_deviation );
}

function makePlotly( x, y, standard_deviation ){
   var plotDiv = document.getElementById("plot");
   var traces = [{
       x: x, 
       y: y
   }];

   Plotly.newPlot('myDiv', traces, 
       {title: 'Plotting CSV data from AJAX call'});
};
 makeplot();