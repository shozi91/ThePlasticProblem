//select tic change
var animaltic = d3.select("#ticAnimal");
animaltic.on("change", runAnimal);
var li2 = d3.select('#li2');
//create array
var animals = [];

function runAnimal() {
    d3.event.preventDefault();
    if (animaltic.property("checked")) {
        li2.append('select').attr("class", "form-control").attr("id", "selectanimal");
        d3.json("/impactstudies").then(function (data) {
            console.log(data)

            data.forEach(function (info) {
                console.log(`animal lisg ${info.Animal}`)
                animals.push(info.Animal);
            });

            let unique_animals = [...new Set(animals)];
            console.log(unique_animals);

            var select = document.getElementById("selectanimal");
            for (var i = 0; i < unique_animals.length; i++) {
                var opt = unique_animals[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            };
        });
    }
    else {
        d3.select('#selectanimal').remove();
    };
};




