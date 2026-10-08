// Load the data
d3.csv("data/Ex6_TVdata.csv").then(data => {
    // Format the data
    data.forEach(d => {
        d.energyConsumption = +d.energyConsumption;
    });

    // Log the data to the console
    console.log("Loaded data:", data);

    // Call functions to draw histogram and populate filters
    drawHistogram(data);
    populateFilters(data);
});