
 d3.json("/summary_earth").then(function(data){
    tableData = []
    data.forEach(function(data){
         catItems = data.Categorized_Items
         totals = data.Total_Items
        var d = {
            label: catItems,
            value: totals
        }

         tableData.push(d)
     })
     tableData.sort(function(first,second){
         return second.value-first.value
     });
    const options = {
        block: {
            dynamicHeight: true,
            highlight: true,
            minHeight: 40,
        },
        chart: {
            width: 1000,
            height: 1900,
            animate:1,
            curve:{
                enabled: true,
                height: 10
            }

        }
    };
    
    const chart = new D3Funnel('#funnel');
    chart.draw(tableData, options);
    console.log(tableData)
 });




