// Initializes the page with a default plot
d3.json("../global_plastic_production").then(function(data){
  console.log(data)

  function init() {
    data = [{
      x: [1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015],
      y: [2000000,2000000,2000000,3000000,3000000,4000000,5000000,5000000,6000000,7000000,8000000,9000000,11000000,13000000,15000000,17000000,20000000,23000000,27000000,32000000,35000000,38000000,44000000,51000000,52000000,46000000,54000000,59000000,64000000,71000000,70000000,72000000,73000000,80000000,86000000,90000000,96000000,104000000,110000000,114000000,120000000,124000000,132000000,137000000,151000000,156000000,168000000,180000000,188000000,202000000,213000000,218000000,231000000,241000000,256000000,263000000,280000000,295000000,281000000,288000000,313000000,325000000,338000000,352000000,367000000,381000000] }];

    Plotly.newPlot("plot", data);
  }

  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);

  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");

    // Initialize x and y arrays
    var x = [];
    var y = [];

    if (dataset === 'Plastic_Production') {
      x = [1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
      y = [2000000,2000000,2000000,3000000,3000000,4000000,5000000,5000000,6000000,7000000,8000000,9000000,11000000,13000000,15000000,17000000,20000000,23000000,27000000,32000000,35000000,38000000,44000000,51000000,52000000,46000000,54000000,59000000,64000000,71000000,70000000,72000000,73000000,80000000,86000000,90000000,96000000,104000000,110000000,114000000,120000000,124000000,132000000,137000000,151000000,156000000,168000000,180000000,188000000,202000000,213000000,218000000,231000000,241000000,256000000,263000000,280000000,295000000,281000000,288000000,313000000,325000000,338000000,352000000,367000000,381000000];
    }

    if (dataset === 'Discarded') {
      x = [1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
      y = [2000000,2000000,2000000,3000000,3000000,4000000,5000000,5000000,6000000,7000000,8000000,9000000,11000000,13000000,15000000,17000000,20000000,23000000,27000000,32000000,35000000,38000000,44000000,51000000,52000000,46000000,54000000,59000000,64000000,71000000,70000000,70776000,71248000,77520000,82732000,85950000,91008000,97864000,102080000,104196000,108000000,109864000,115104000,117546000,127444000,129480000,137088000,144360000,148144000,156348000,161880000,162628000,169092000,173038000,180224000,181470000,189280000,195290000,182088000,182592000,194060000,196950000,200096000,203456000,206988000,209550000];
    }

    if (dataset === 'Incinerated') {
      x = [1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
      y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1224000,1752000,2480000,3268000,4050000,4992000,6136000,7260000,8322000,9600000,10788000,12408000,13837000,16308000,17940000,20496000,23220000,25568000,28886000,31950000,34226000,37884000,41211000,45568000,48655000,53760000,58705000,57886000,61344000,68860000,73775000,79092000,84832000,91016000,97155000];
    }

    if (dataset === 'Recycled') {
      x = [1950,1951,1952,1953,1954,1955,1956,1957,1958,1959,1960,1961,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
      y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,660000,1482000,1920000,3348000,4488000,5617000,7248000,8580000,10416000,12420000,14288000,16766000,19170000,21146000,24024000,26751000,30208000,32875000,36960000,41005000,41026000,44064000,50080000,54275000,58812000,63712000,68996000,74295000];
    }

    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
  }

  init();

  
});


