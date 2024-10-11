import Button from "./htmlComponents/Button.js";
import * as d3 from 'd3-array';
import { Plot } from 'plot';
import Converter from "./Format Converter/localIndex.js";
/*
_______________________________________________________________________________________________________________________________
_______________________________________________________________________________________________________________________________
*/
const sftemp = [
    { date: new Date("2022-01-01"), low: 20, high: 30 },
    { date: new Date("2022-01-02"), low: 25, high: 35 },
    { date: new Date("2022-01-03"), low: 22, high: 32 },
    { date: new Date("2022-01-04"), low: 28, high: 38 },
    { date: new Date("2022-01-05"), low: 26, high: 36 },
    { date: new Date("2022-01-06"), low: 24, high: 34 },
    { date: new Date("2022-01-07"), low: 29, high: 39 },
    { date: new Date("2022-01-08"), low: 27, high: 37 },
    { date: new Date("2022-01-09"), low: 23, high: 33 },
    { date: new Date("2022-01-10"), low: 31, high: 41 }
];

const converter = new Converter(() => {
    console.log(123);
});
converter.init();

function createChart() {
    // Specify the chart’s dimensions.
    const width = 928;
    const height = 600;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    // Create the positional scales.
    const x = d3.scaleUtc()
        .domain(d3.extent(sftemp, d => d.date))
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain([d3.min(sftemp, d => d.low), d3.max(sftemp, d => d.high)]).nice(10)
        .range([height - marginBottom, marginTop]);

    // Create the area generator.
    const area = d3.area()
        .curve(d3.curveStep)
        .x(d => x(d.date))
        .y0(d => y(d.low))
        .y1(d => y(d.high));

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // Add the area path.
    svg.append("path")
        .datum(sftemp)
        .attr("fill", "steelblue")
        .attr("d", area);

    // Add the horizontal axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        .call(g => g.select(".domain").remove());

    // Add the vertical axis, a grid and an axis label.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Temperature (°F)"));

    return svg.node();
}

const chart = createChart();

Plot.plot({
    y: { label: "Temperature (°F)", grid: true },
    marks: [Plot.areaY(sftemp, { x: "date", y1: "low", y2: "high", fill: "steelblue", curve: "step" })]
});