
//select tic change
var debristic = d3.select("#ticDebris");
debristic.on("change", runDebris);
var li4 = d3.select('#li4');
//create array
var debrises = [];

function runDebris() {
  // d3.event.preventDefault();
  if (debristic.property("checked")) {
    li4.append('select').attr("class", "form-control").attr("id", "selectdebris");
    d3.json("/impactstudies").then(function (data) {
      console.log(data)

      data.forEach(function (info) {
        debrises.push(info.Predominant_debris_type);
      });
      let unique_debrises = [...new Set(debrises)];
      console.log(unique_debrises);

      var select = document.getElementById("selectdebris");
      for (var i = 0; i < unique_debrises.length; i++) {
        var opt = unique_debrises[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      };
    });
  }
  else {
    d3.select('#selectdebris').remove();
  };
};
