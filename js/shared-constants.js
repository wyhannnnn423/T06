// Set dimensions and margins
const margin = { top: 20, right: 30, bottom: 40, left: 50 };
const width = 800; // total width of the chart
const height = 400; // total height of the chart
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Make the colours accessible globally
const BarColor = "#606464";
const bodyBackgroundColor = "#ffffff";

// Set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Step 6.2: Create a bin generator using d3.bin()
const binGenerator = d3.bin()
    .value(d => d.energyConsumption); // Accessor for energyConsumption

// Step 7.2: Make the filter options accessible globally
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];