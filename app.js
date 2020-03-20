
var width = 500;
var height = 500;
var padding = 20; // Offsets the svgs


//   var yMax = d3.max(studentScores, 
//     d => (d["math score"] + d["reading score"] + d["writing scoree"]))
var yScale = d3.scaleLinear()
                .domain(d3.extent(regionData, 
                    d => d.subscribersPer100))
                .range([height - padding, padding])
var xScale = d3.scaleLinear()
                .domain(d3.extent(regionData, 
                    d => d.adultLiteracyRate))
                .range([padding, width -padding])

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(regionData)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.adultLiteracyRate))
        .attr("cy", d=> yScale(d.subscribersPer100))
        .attr("r", 5)
        .on("mouseover", d=>{
            d3.select("#currentCountry")
                .text(d.region)
        })