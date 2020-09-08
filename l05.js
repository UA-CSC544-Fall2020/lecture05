////////
//This javascript example uses d3.js to create a simple visualization of
//20 data points in a scatterplot
//
//Author: Joshua Levine
//Date: Sept. 8, 2020



////////
// Data initialization, 20 pairs of random numbers
let dataArray = [];

for (let i=0; i<20; i++) {
  dataArray.push({
    var1: Math.random(),
    var2: Math.random()
  });
}
 

////////
// Initialization of the SVG canvas and variables associated with it
let svg_width = 400;
let svg_height = 400;

let xPadding = 50;


let svg = d3.select("#div1")
  .append("svg")
  .attr("width", svg_width)
  .attr("height", svg_height)


////////
// Initialization of scales used for plotting
// Note that the range of data domain is [0,1] as Math.random() returns
// numbers in [0,1]
let xScale = d3.scaleLinear()
  .domain([0,1])
  .range([xPadding,svg_width-xPadding])

let yScale = d3.scaleLinear()
  .domain([0,1])
  .range([svg_height-100,100])

let colorScale = d3.scaleLinear()
  .domain([0,1])
  .range(["brown","steelblue"])


////////
// Drawing the scatterplot with a data join on dataArray
// uses the scales to do the data access
let circles = svg.selectAll("circle")
  .data(dataArray)
  .enter()
  .append("circle")
  .attr("r", 10)
  .attr("fill", function(d) {
    return colorScale(d.var1);
  })
  .attr("cx", function(d) {
    return xScale(d.var1);
  })
  .attr("cy", function(d) {
    return yScale(d.var2);
  })


////////
// Example of creating a data axis from a data scale
// Note that it is manually translated to appear in the right position.

let xAxis = d3.axisBottom().scale(xScale)

svg.append("g")
  .attr("transform", `translate(0,${svg_height-100})`)
  .call(xAxis);

