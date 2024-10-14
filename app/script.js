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

    const circles = svg.append("g")
        .selectAll("circle")
        .data(I)
        .join("circle")
        .attr("cx", i => xScale(X[i]))
        .attr("cy", i => yScale(Y[i]))
        .attr("r", 3)
        .attr("fill", color);

    const linesX = svg.append("g")
        .selectAll("line.x")
        .data(I)
        .join("line")
        .attr("class", "x")
        .attr("x1", i => xScale(X[i]))
        .attr("x2", i => xScale(X[i]))
        .attr("y1", i => yScale(Y[i]))
        .attr("y2", height - marginBottom)
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "4,4");

    const linesY = svg.append("g")
        .selectAll("line.y")
        .data(I)
        .join("line")
        .attr("class", "y")
        .attr("x1", marginLeft)
        .attr("x2", i => xScale(X[i]))
        .attr("y1", i => yScale(Y[i]))
        .attr("y2", i => yScale(Y[i]))
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "4,4");

    const zoom = d3.zoom()
        .scaleExtent([1, 10])
        .extent([
            [marginLeft, marginTop],
            [width - marginRight, height - marginBottom]
        ])
        .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
        const transform = event.transform;
        const zx = transform.rescaleX(xScale);
        const zy = transform.rescaleY(yScale);

        gx.call(xAxis.scale(zx));
        gy.call(yAxis.scale(zy));
        path.attr("d", line.x(i => zx(X[i])).y(i => zy(Y[i])));

        circles.attr("cx", i => zx(X[i]))
            .attr("cy", i => zy(Y[i]));

        linesX.attr("x1", i => zx(X[i]))
            .attr("x2", i => zx(X[i]))
            .attr("y1", i => zy(Y[i]))
            .attr("y2", height - marginBottom);

        linesY.attr("x1", marginLeft)
            .attr("x2", i => zx(X[i]))
            .attr("y1", i => zy(Y[i]))
            .attr("y2", i => zy(Y[i]));
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
    {
        "x": "2024-07-31T21:01:00.719Z",
        "y": 10518.47
    },
    {
        "x": "2024-07-31T21:11:01.707Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:11:12.510Z",
        "y": 10518.47
    },
    {
        "x": "2024-07-31T21:11:39.484Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:11:44.884Z",
        "y": 10518.47
    },
    {
        "x": "2024-07-31T21:12:06.460Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:12:22.641Z",
        "y": 10518.47
    },
    {
        "x": "2024-07-31T21:12:38.852Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:12:49.637Z",
        "y": 10518.47
    },
    {
        "x": "2024-07-31T21:13:00.427Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:24:52.814Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:24:58.222Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:25:41.416Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:25:46.802Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:26:02.992Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:26:08.396Z",
        "y": 10518.69
    },
    {
        "x": "2024-07-31T21:26:29.984Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:42:57.906Z",
        "y": 10519.11
    },
    {
        "x": "2024-07-31T21:43:03.301Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:46:34.168Z",
        "y": 10519.11
    },
    {
        "x": "2024-07-31T21:46:44.950Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:47:23.093Z",
        "y": 10519.11
    },
    {
        "x": "2024-07-31T21:47:33.889Z",
        "y": 10518.9
    },
    {
        "x": "2024-07-31T21:48:22.459Z",
        "y": 10519.11
    },
    {
        "x": "2024-07-31T21:48:27.864Z",
        "y": 10518.9
    }
]

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
