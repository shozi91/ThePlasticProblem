//select tic change
var encountertic = d3.select("#ticEncounter");
encountertic.on("change", runEncounter);
var li3 = d3.select('#li3');
//create array
var encounters = [];

function runEncounter() {
    d3.event.preventDefault();
    if (encountertic.property("checked")) {
        li3.append('select').attr("class", "form-control").attr("id", "selectencounter");
        d3.json("/impactstudies").then(function (data) {
            console.log(data)

            data.forEach(function (info) {
                encounters.push(info.Encounter_type);
            });
            let unique_encounters = [...new Set(encounters)];
            console.log(unique_encounters);

            var select = document.getElementById("selectencounter");
            for (var i = 0; i < unique_encounters.length; i++) {
                var opt = unique_encounters[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            };
        });
    }

    else {
        d3.select('#selectencounter').remove();
    };
};




