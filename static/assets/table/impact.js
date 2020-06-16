//select tic change
var impacttic = d3.select("#ticImpact");
impacttic.on("change", runImpact);
var li5 = d3.select('#li5');
//create state array
var impacts = [];

function runImpact() {
  // d3.event.preventDefault();
  if (impacttic.property("checked")) {
    li5.append('select').attr("class", "form-control").attr("id", "selectimpact");
    d3.json("/impactstudies").then(function (data) {
      console.log(data)

      data.forEach(function (info) {
        impacts.push(info.Impact);
      });

      let unique_impacts = [...new Set(impacts)];
      console.log(unique_impacts);

      var select = document.getElementById("selectimpact");
      for (var i = 0; i < unique_impacts.length; i++) {
        var opt = unique_impacts[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      };
    });
  }
  else {
    d3.select('#selectimpact').remove();
  };
};






