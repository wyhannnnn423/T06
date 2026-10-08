const populateFilters = (data) => {
    // Step 7.3 Set up buttons and event listeners
    const buttonPanel = d3.select("#filters_screen"); // 适配你的 template ID

    const buttons = buttonPanel.selectAll("button")
        .data(filters_screen)
        .join("button")
        .text(d => d.label)
        .attr("class", d => d.isActive ? "active" : "") // Attach class "active"
        .on("click", function(event, d) {
            // Update active state
            filters_screen.forEach(f => f.isActive = false);
            d.isActive = true;

            // Update button visual classes
            buttons.attr("class", f => f.isActive ? "active" : "");

            // Pass the id and data to update function
            updateHistogram(d.id, data);
        });

    // Step 7.4 Update the histogram
    const updateHistogram = (filterId, originalData) => {
        let updatedData = originalData;

        // Filter based on screen tech
        if (filterId !== "all") {
            updatedData = originalData.filter(d => d.screenTech === filterId);
        }

        // Use filtered data to update the bins
        const updatedBins = binGenerator(updatedData);

        // Update Y scale
        const maxCount = d3.max(updatedBins, d => d.length);
        yScale.domain([0, maxCount]);

        const innerChart = d3.select("#histogram g");

        // Transition Y axis
        innerChart.select(".y-axis")
            .transition()
            .duration(500)
            .call(d3.axisLeft(yScale));

        // Draw histogram rectangles and apply transitions
        innerChart.selectAll("rect")
            .data(updatedBins)
            .join("rect")
            .transition()
            .duration(500)
            .attr("x", d => xScale(d.x0) + 1)
            .attr("y", d => yScale(d.length))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", BarColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 1);
    };
};