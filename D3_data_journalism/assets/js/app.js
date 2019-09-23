/* 
D3 Homework - Data Journalism and D3
*/

// Set width, height and margins for chart
var svgWidth = 900;
var svgHeight = 520;

var margin = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(demoData) {
      // Step 1: Parse Data/Cast as numbers
      // ==============================
        demoData.forEach(function(data) {
          data.poverty = +data.poverty;
          data.healthcare = +data.healthcare;
          data.abbr = data.abbr;
        });

      // Step 2: Create scale functions
      // ==============================
        var xLinearScale = d3.scaleLinear()
            .domain([0, d3.max(demoData, d => d.poverty)])
            .range([0, width]);
        
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(demoData, d => d.healthcare)])
            .range([height, 0]);

      // Step 3: Create axis functions
      // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

      // Step 4: Append Axes to the chart
      // ==============================
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

      // Step 5: Create Circles
      // ==============================
        chartGroup.selectAll("circle")
            .data(demoData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", "12")
            .attr("fill", "steelblue");
          // Append text to circles 

        chartGroup.selectAll()
            .data(demoData)
            .enter()
            .append("text")
            .attr("x", d => xLinearScale(d.poverty))
            .attr("y", d => yLinearScale(d.healthcare))
            .style("font-size", "10px")
            .style("text-anchor", "middle")
            .style('fill', 'white')
            .text(d => (d.abbr));
        
      // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left - 2)
            .attr("x", 0 - (height / 2) - 50)
            .attr("dy", "1em")
            .attr("class", "axisText")
            .attr("font-family", "sans-serif")
            .text("Lacks Healthcare (%)");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
            .attr("class", "axisText")
            .attr("font-family", "sans-serif")
            .text("In Poverty (%)");
    });

    