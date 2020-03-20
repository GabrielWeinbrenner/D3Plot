
var width = 1200;
var height = 600;
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

var colorScale = d3.scaleLinear()
                    .domain(d3.extent(
                        regionData, d=>{
                            return d.growthRate
                        }
                    ))
                    .range(['red','green'])
var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(
                        regionData, d=>{
                            return d.urbanPopulationRate
                        }
                    ))
                    .range([5,20])

var xAxis = d3.axisBottom(xScale);
d3.select("svg")
    .append("g")
        .attr("transform", 
            "translate(0,"+(height-padding)+")")
        .call(xAxis);
var yAxis = d3.axisLeft(yScale);
d3.select("svg")
    .append("g")
        .attr("transform", "translate("+padding+",0)")
        .call(yAxis);
d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(regionData)
    .enter()
    .append("circle")
        .attr("cx", d => xScale(d.adultLiteracyRate))
        .attr("cy", d=> yScale(d.subscribersPer100))
        .attr("r", d=>radiusScale(d.urbanPopulationRate))
        .attr("fill", d=> colorScale(d.growthRate))
        .on("mouseover", d=>{
            d3.select("#currentCountry")
                .text(d.region + " " + d.growthRate)
        })