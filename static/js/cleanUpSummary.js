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
    console.log(tableData)
 });