function LineChart(data, {
    x = ([x]) => x,
    y = ([, y]) => y,
    defined,
    curve = d3.curveLinear,
    marginTop = 20,
    marginRight = 30,
    marginBottom = 30,
    marginLeft = 40,
    width = 640,
    height = 400,
    xType = d3.scaleUtc,
    xDomain,
    xRange = [marginLeft, width - marginRight],
    yType = d3.scaleLinear,
    yDomain,
    yRange = [height - marginBottom, marginTop],
    yFormat,
    yLabel,
    color = "currentColor",
    strokeLinecap = "round",
    strokeLinejoin = "round",
    strokeWidth = 1.5,
    strokeOpacity = 1,
} = {}) {
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const I = d3.range(X.length);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];

    let xScale = xType(xDomain, xRange);
    let yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

    const line = d3.line()
        .defined(i => D[i])
        .curve(curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const gx = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

    const gy = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const path = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-opacity", strokeOpacity)
        .attr("d", line(I));

    const brush = d3.brushX()
        .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
        .on("end", brushed);

    svg.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushed(event) {
        const selection = event.selection;
        if (selection === null) {
            xScale.domain(xDomain);
            yScale.domain(yDomain);
        } else {
            const [x0, x1] = selection.map(xScale.invert);
            xScale.domain([x0, x1]);
            svg.select(".brush").call(brush.move, null);
        }
        updateChart();
    }

    function updateChart() {
        gx.call(xAxis.scale(xScale));
        gy.call(yAxis.scale(yScale));
        path.attr("d", line(I));
    }

    return svg.node();
}

const data = [
    { x: new Date("2024-03-15T10:45:30.123Z"), y: 10234 },
    { x: new Date("2024-04-20T14:22:15.456Z"), y: 10345 },
    { x: new Date("2024-06-10T08:55:45.789Z"), y: 10456 },
    { x: new Date("2024-09-05T16:35:20.012Z"), y: 10567 },
    { x: new Date("2024-11-18T12:10:05.678Z"), y: 10678 },

];

// Отрисовка графика
document.getElementById('chart').appendChild(LineChart(data, {
    x: d => d.x,
    y: d => d.y,
    yLabel: "Value",
    width: 800,
    height: 500,
    color: "steelblue"
}));
