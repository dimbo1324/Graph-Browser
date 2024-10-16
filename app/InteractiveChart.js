class ZoomableChart {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.margin = { top: 20, right: 20, bottom: 300, left: 40 };
        this.initChart();
    }

    initChart() {
        const containerElement = d3.select(this.container);
        this.width = containerElement.node().clientWidth + this.margin.left + this.margin.right;
        this.height = containerElement.node().clientHeight + this.margin.top + this.margin.bottom;

        this.svg = containerElement.append("svg")
            .attr("viewBox", `0 0 ${this.width + this.margin.left + this.margin.right} ${this.height + this.margin.top + this.margin.bottom}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        this.xAxis = this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${this.height})`);
        this.yAxis = this.svg.append("g")
            .attr("class", "y-axis");

        this.xGrid = this.svg.append("g")
            .attr("class", "x-grid")
            .attr("transform", `translate(0,${this.height})`);
        this.yGrid = this.svg.append("g")
            .attr("class", "y-grid");

        this.line = d3.line()
            .x(d => this.x(d.date))
            .y(d => this.y(d.value));

        this.path = this.svg.append("path")
            .attr("class", "line")
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", 1.5);

        this.zoom = d3.zoom()
            .scaleExtent([0.5, 32])
            .translateExtent([[-1000, -1000], [1000, 1000]])
            .on("zoom", (event) => this.zoomed(event));

        this.svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(this.zoom);

        this.render();
    }

    render() {
        this.x.domain(d3.extent(this.data, d => d.date));
        this.y.domain([0, d3.max(this.data, d => d.value)]);

        this.xAxis.call(d3.axisBottom(this.x));
        this.yAxis.call(d3.axisLeft(this.y));

        this.xGrid.call(d3.axisBottom(this.x)
            .tickSize(-this.height)
            .tickFormat(""))
            .selectAll("line")
            .style("stroke", "#e0e0e0");

        this.yGrid.call(d3.axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(""))
            .selectAll("line")
            .style("stroke", "#e0e0e0");

        this.path.datum(this.data)
            .attr("d", this.line);

        this.points = this.svg.selectAll(".point")
            .data(this.data)
            .join("circle")
            .attr("class", "point")
            .attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value))
            .attr("r", 4)
            .on("mouseover", (event, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.hideTooltip());
    }

    showTooltip(event, d) {
        d3.select(this.container).append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`)
            .style("background", "lightgrey")
            .style("padding", "5px")
            .style("border-radius", "4px")
            .html(`Date: ${d.date.toLocaleDateString()}<br>Value: ${d.value}`);
    }

    hideTooltip() {
        d3.select(this.container).selectAll(".tooltip").remove();
    }

    zoomed(event) {
        const transform = event.transform;
        const newX = transform.rescaleX(this.x);
        const newY = transform.rescaleY(this.y);

        this.xAxis.call(d3.axisBottom(newX));
        this.yAxis.call(d3.axisLeft(newY));

        this.xGrid.call(d3.axisBottom(newX)
            .tickSize(-this.height)
            .tickFormat(""));
        this.yGrid.call(d3.axisLeft(newY)
            .tickSize(-this.width)
            .tickFormat(""));

        this.path.attr("d", this.line.x(d => newX(d.date)).y(d => newY(d.value)));
        this.points.attr("cx", d => newX(d.date)).attr("cy", d => newY(d.value));
    }
}

// Пример использования
const data = Array.from({ length: 100 }, (_, i) => ({
    date: new Date(2023, 0, i),
    value: Math.random() * 100
}));

new ZoomableChart("#chart-container", data);
