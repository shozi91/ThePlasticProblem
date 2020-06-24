// from data.js
var tbody = d3.select("tbody");

d3.json("/impactstudies").then(function (data) {
    console.log(data)


    data.forEach(function (info) {
        console.log(info);
        var row = tbody.append("tr");
        Object.entries(info).forEach(function ([key, value]) {
            console.log(key, value);
            // Append a cell to the row for each value
            // in the weather report object
            var cell = row.append("td");
            cell.text(value);
        });
    });
});


// YOUR CODE HERE!
// Select the form
var form = d3.select("form");

// Select the button
var button = d3.select("#filter-btn");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {
    d3.json("/impactstudies").then(function (data) {
        console.log(data)

        //clean the table
        tbody.html("");
        d3.event.preventDefault();


        // Prevent the page from refreshing
        // d3.event.preventDefault();



        // Select the input element and get the raw HTML node
        var inputstudy = d3.select("#selectstudy");
        var inputencounter = d3.select("#selectencounter");
        var inputanimal = d3.select("#selectanimal");
        var inputdebris = d3.select("#selectdebris");
        var inputimpact = d3.select("#selectimpact");



        // Get the value property of the input element
        try {
            var inputValue1 = inputstudy.property("value");
        }
        catch (err) {
            inputValue1 = 0;
        };


        try {
            var inputValue2 = inputencounter.property("value");
        }
        catch (err) {
            inputValue2 = 0;
        };

        try {
            var inputValue3 = inputanimal.property("value");
        }
        catch (err) {
            inputValue3 = 0;
        };

        try {
            var inputValue4 = inputdebris.property("value");
        }
        catch (err) {
            inputValue4 = 0;
        };

        try {
            var inputValue5 = inputimpact.property("value");
        }
        catch (err) {
            inputValue5 = 0;
        };



        console.log(inputValue1);
        console.log(inputValue2);
        console.log(inputValue3);
        console.log(inputValue4);
        console.log(inputValue5);


        var filter = {
            Study: inputValue1,
            Encounter_type: inputValue2,
            Animal: inputValue3,
            Predominant_debris_type: inputValue4,
            Impact: inputValue5,
        };

        Object.keys(filter).forEach(key => {
            if (filter[key] === 0) delete filter[key];
        });

        console.log(filter);


        var filteredData

        filteredData = data.filter(function (item) {
            for (var key in filter) {
                if (item[key] === undefined || item[key] != filter[key])
                    return false;
            }
            return true;
        });
        console.log(filteredData);


        filteredData.forEach(function (info) {
            console.log(info);
            var row = tbody.append("tr");
            Object.entries(info).forEach(function ([key, value]) {
                console.log(key, value);
                // Append a cell to the row for each value
                // in the weather report object
                var cell = row.append("td");
                cell.text(value);
            });

        });
    });
}
