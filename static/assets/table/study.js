//select tic change
var studytic = d3.select("#ticStudy");
studytic.on("change", runStudy);
var li1 = d3.select('#li1');
//create array
var studies = [];

function runStudy() {
  // d3.event.preventDefault();
  if (studytic.property("checked")) {
    li1.append('select').attr("class", "form-control").attr("id", "selectstudy");
    d3.json("/impactstudies").then(function (data) {
      console.log(data)

      data.forEach(function (info) {
        studies.push(info.Study);
      });

      let unique_studies = [...new Set(studies)];
      console.log(unique_studies);

      var select = document.getElementById("selectstudy");
      for (var i = 0; i < unique_studies.length; i++) {
        var opt = unique_studies[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      };
    });
  }

  else {
    d3.select('#selectstudy').remove();
  }
};