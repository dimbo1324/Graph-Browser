import ZoomableChart from "./utils/ZoomableChart.js";

// Пример использования
const data = [
    [new Date('2024-08-01T00:01:00Z'), 10518.47, 1],
    [new Date('2024-08-02T00:01:00Z'), 10600.00, 2],
    // другие данные...
];

const width = 928;
const height = 500;

const x = d3.scaleUtc()
    .domain(d3.extent(data, d => d[0]))
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([height, 0]);

const z = d3.scaleOrdinal(d3.schemeCategory10);

const xAxis = g => g.attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

const yAxis = g => g.call(d3.axisLeft(y).ticks(height / 40));

const grid = (g, x, y) => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
        .selectAll("line")
        .data(x.ticks())
        .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", 0)
        .attr("y2", height))
    .call(g => g.append("g")
        .selectAll("line")
        .data(y.ticks())
        .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", 0)
        .attr("x2", width));

const chart = new ZoomableChart(data, {
    width,
    height,
    x,
    y,
    z,
    xAxis,
    yAxis,
    grid
});

document.getElementById('chart-container').appendChild(chart.render());
