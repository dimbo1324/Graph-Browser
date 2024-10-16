import { plottingPoints } from "./plottingPoints.js";


export const width = 928;

export const height = 600;

export const k = (height / width);

export const x = d3.scaleLinear()
    .domain([-4.5, 4.5])
    .range([0, width]);

export const y = d3.scaleLinear()
    .domain([-4.5 * k, 4.5 * k])
    .range([height, 0]);

export const z = d3.scaleOrdinal()
    .domain(plottingPoints.map(d => d[2]))
    .range(d3.schemeCategory10);

export const xAxis = (g, x) => g.attr("transform", `translate(0,${height})`)
    .call(d3.axisTop(x).ticks(12));

export const yAxis = (g, y) => g.call(d3.axisRight(y).ticks(12 * k));

export const grid = (g, x, y) => g.attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g
        .selectAll(".x")
        .data(x.ticks(12))
        .join(
            enter => enter.append("line").attr("class", "x").attr("y2", height),
            update => update,
            exit => exit.remove()
        )
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d)))
    .call(g => g
        .selectAll(".y")
        .data(y.ticks(12 * k))
        .join(
            enter => enter.append("line").attr("class", "y").attr("x2", width),
            update => update,
            exit => exit.remove()
        )
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d)));
