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
    if (yDomain === undefined) yDomain = [d3.min(Y), d3.max(Y) * 1.3];

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

    const zoom = d3.zoom()
        .scaleExtent([1, 10]) // Минимальный и максимальный уровни масштабирования .translateExtent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
        .extent([[marginLeft, marginTop], [width - marginRight, height - marginBottom]])
        .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
        const transform = event.transform;
        const zx = transform.rescaleX(xScale);
        const zy = transform.rescaleY(yScale);

        gx.call(xAxis.scale(zx));
        gy.call(yAxis.scale(zy));
        path.attr("d", line.x(i => zx(X[i])).y(i => zy(Y[i])));
    }

    return svg.node();
}

function transformedData(obj) {
    return obj.map(d => ({
        x: new Date(d.x),
        y: d.y
    }));
}

const data = [
    { "x": "2024-07-31T21:01:00.719Z", "y": 3 },
    { "x": "2024-08-01T02:11:59.738Z", "y": 5 },
    { "x": "2024-08-01T02:12:05.142Z", "y": 56 },
    { "x": "2024-08-01T02:14:03.857Z", "y": 12 },
    { "x": "2024-08-01T02:14:09.259Z", "y": 19 },
    { "x": "2024-08-01T02:14:14.666Z", "y": 1 },
    { "x": "2024-08-01T02:14:20.064Z", "y": -12 },
    { "x": "2024-08-01T02:15:03.233Z", "y": 5 },
];

const dataMain = transformedData(data);

document.getElementById('chart').appendChild(LineChart(dataMain, {
    x: d => d.x,
    y: d => d.y,
    yLabel: "Value",
    width: 800,
    height: 500,
    color: "steelblue"
}));

console.log(dataMain);
