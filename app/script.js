// Данные для графика
const data = [
    { date: "2023-01-01T00:00:00Z", close: 150 },
    { date: "2023-02-01T00:00:00Z", close: 160 },
    { date: "2023-03-01T00:00:00Z", close: 155 },
    { date: "2023-04-01T00:00:00Z", close: 170 },
    { date: "2023-05-01T00:00:00Z", close: 180 },
    { date: "2023-06-01T00:00:00Z", close: 175 }
];

// Парсинг даты
const parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%SZ");
const aapl = data.map(d => ({ date: parseDate(d.date), close: d.close }));

// Функция для создания графика
function createChart() {
    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    const x = d3.scaleUtc()
        .domain(d3.extent(aapl, d => d.date))
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(aapl, d => d.close)])
        .nice()
        .range([height - marginBottom, marginTop]);

    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));

    const zoom = d3.zoom()
        .scaleExtent([0.5, 32])
        .on("zoom", zoomed);

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    const gGrid = svg.append("g");

    const gDot = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-linecap", "round");

    gDot.append("path")
        .datum(aapl)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

    const gx = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    const gy = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Daily close ($)"));

    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

    function zoomed({ transform }) {
        const zx = transform.rescaleX(x);
        const zy = transform.rescaleY(y);
        gDot.attr("transform", transform).attr("stroke-width", 1.5 / transform.k);
        gx.call(d3.axisBottom(zx).ticks(width / 80).tickSizeOuter(0));
        gy.call(d3.axisLeft(zy).ticks(height / 40));
    }

    document.body.appendChild(svg.node());
}

// Вызов функции для построения графика
createChart();

