<!DOCTYPE html>
<html>
    <head>
        <title>Assignment 2-d3</title>
        <script src="https://d3js.org/d3.v5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.25.6/d3-legend.js"></script>
    </head>
    <body>
        <div class="chart"></div>
        <script>
            let height = 500;
            let width = 500;
            let margin = 50;
            let legendMargin = 100;

            d3.csv("cars-sample.csv").then(function(data) {
                let svg = d3.select('.chart')
                    .append('svg')
                    .attr('class', 'chart')
                    .attr("width", width + margin + margin + legendMargin)
                    .attr("height", height + margin + margin)
                    .append("g")
                    .attr("transform", "translate(" + margin + "," + margin + ")");

                let x = d3.scaleLinear()
                    .domain([1500, 5000])
                    .range([0, width]);

                let y = d3.scaleLinear()
                    .domain([8, 48])
                    .range([height, 0]);

                let xAxis = d3.axisBottom(x).ticks(4);
                let yAxis = d3.axisLeft(y).ticks(5);

                let color = {};
                color["bmw"] = "f7d4cd";
                color["ford"] = "91b738";
                color["honda"] = "23ea8d";
                color["mercedes"] = "90d6ed";
                color["toyota"] = "f5a5f7";

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -height/2)
                    .attr("y", -margin + 10)
                    .style("fill","black")
                    .style("text-anchor", "middle")
                    .text("MPG");

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .append("text")
                    .attr("x", width/2)
                    .attr("y", margin - 10)
                    .style("fill","black")
                    .style("text-anchor", "middle")
                    .text("Weight");

                svg.append("rect")
                    .attr("x","0")
                    .attr("y","0")
                    .attr("width",width)
                    .attr("height",height)
                    .style("fill","e8e7e5");

                svg.append("g")
                    .attr("class", "grid")
                    .attr("transform", "translate(0," + height + ")")
                    .style("stroke","none")
                    .style("stoke-opacity", 0.5)
                    .call(d3.axisBottom(x).ticks(4).tickSize(-height).tickFormat(""));

                svg.append("g")
                    .attr("class", "grid")
                    .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(""));

                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .insert("circle")
                    .attr("opacity", 0.5)
                    .attr("r", function (d) { return d.Weight/500; })
                    .style("fill", function (d) { return color[d.Manufacturer]; })
                    .attr("cx", function (d) { return x(d.Weight); })
                    .attr("cy", function (d) { return y(d.MPG); });

                let ordinal = d3.scaleOrdinal()
                    .domain(["bmw", "ford", "honda", "mercedes", "toyota"])
                    .range([ color["bmw"],  color["ford"], color["honda"], color["mercedes"], color["toyota"]]);

                svg.append("g")
                    .attr("class", "legendOrdinal")
                    .attr("transform", "translate(520,20)");

                let legendOrdinal = d3.legendColor()
                    .title("Manufacturer")
                    .shape("path", d3.symbol().type(d3.symbolCircle).size(25)())
                    .shapePadding(10)
                    .scale(ordinal);

                svg.select(".legendOrdinal")
                    .call(legendOrdinal);

                let sizeScale = d3.scaleOrdinal().domain([2000,3000,4000]).range([2000/500, 3000/500, 4000/500]);

                svg.append("g")
                    .attr("class", "legendSize")
                    .attr("transform", "translate(520, 250)")
                    .attr("x","0")
                    .attr("y","0")
                    .attr("width",width)
                    .attr("height",height);

                let legendSize = d3.legendSize()
                    .title("Weight")
                    .scale(sizeScale)
                    .shape('circle')
                    .shapePadding(10)
                    .labelOffset(20);

                svg.select(".legendSize")
                    .call(legendSize)
            })
        </script>
    </body>
