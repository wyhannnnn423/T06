const drawHistogram = (data) => {
    // Step 6.1 Set up the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Responsive SVG
        .classed("responsive-svg-container", true);

    // Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Step 6.2 Set up bins
    const bins = binGenerator(data);
    console.log("Bins:", bins); // Log the bins to the console for debugging

    // Step 6.3: Define the Scales
    const minBins = bins[0].x0; // Lower bound of the first bin
    const maxBins = bins[bins.length - 1].x1; // Upper bound of the last bin
    const maxCount = d3.max(bins, d => d.length); // Get the maximum length of the bins

    // Define scales from shared constants
    xScale.domain([minBins, maxBins]).range([0, innerWidth]);
    yScale.domain([0, maxCount]).range([innerHeight, 0]);

    // Step 6.4: Draw the bars of the histogram
    innerChart.selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", d => xScale(d.x0) + 1)
        .attr("y", d => yScale(d.length))
        .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", BarColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 1);

    // Step 6.5: Add bottom axis
    const bottomAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .attr("class", "axis-label")
        .call(bottomAxis)
        .append("text")
        .attr("x", innerWidth)
        .attr("y", 30)
        .attr("fill", "black")
        .attr("text-anchor", "end")
        .text("Energy Consumption (kWh/year)");

    // Step 6.6: Add left axis
    const leftAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .attr("class", "y-axis axis-label")
        .call(leftAxis);
};