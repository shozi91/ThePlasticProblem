// from data.js
var tbody = d3.select("tbody");
var form = d3.select("form");
var button = d3.select("#filter-btn");
var impactData = [];

function buildTable(data) {
    tbody.html("");
    data.forEach(function (info) {
        var row = tbody.append("tr");
        Object.entries(info).forEach(function ([key, value]) {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

function selectedValue(selector) {
    var input = d3.select(selector);
    if (input.empty()) {
        return null;
    }

    var value = input.property("value");
    return value || null;
}

function runEnter() {
    if (d3.event) {
        d3.event.preventDefault();
    }

    var filter = {
        Study: selectedValue("#selectstudy"),
        Encounter_type: selectedValue("#selectencounter"),
        Animal: selectedValue("#selectanimal"),
        Predominant_debris_type: selectedValue("#selectdebris"),
        Impact: selectedValue("#selectimpact"),
    };

    Object.keys(filter).forEach(function (key) {
        if (!filter[key]) {
            delete filter[key];
        }
    });

    var filteredData = impactData.filter(function (item) {
        for (var key in filter) {
            if (item[key] === undefined || item[key] !== filter[key]) {
                return false;
            }
        }
        return true;
    });

    buildTable(filteredData);
}

d3.json("/impactstudies").then(function (data) {
    impactData = data;
    buildTable(impactData);
});

button.on("click", runEnter);
form.on("submit", runEnter);
