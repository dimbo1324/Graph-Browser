import { chartConfig } from "./options.js";

export default class Chart {
    constructor(container, data) {
        this.container = container;
        this.data = data.map(d => ({
            date: new Date(d.x),
            value: Number(d.y)
        }));
        this.margin = chartConfig.margin;
        this.width = chartConfig.initialWidth - this.margin.left - this.margin.right;
        this.height = this.width / chartConfig.coefficientHeight;
        this.initChart();
    }

    initChart() {
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        this.svg.append("defs")
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("x", this.margin.left)
            .attr("y", this.margin.top);

        this.g = this.svg.append("g")
            .attr("clip-path", "url(#clip)")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 2]);

        this.xAxis = this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${this.margin.left},${this.height + this.margin.top})`);

        this.yAxis = this.svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        this.line = d3.line()
            .x(d => this.x(d.date))
            .y(d => this.y(d.value));

        this.path = this.g.append("path")
            .datum(this.data)
            .attr("class", "line")
            .attr("d", this.line)
            .style("fill", "none")
            .style("stroke", chartConfig.lineColor)
            .style("stroke-width", chartConfig.strokeWidth);

        this.points = this.g.selectAll(".point")
            .data(this.data)
            .enter().append("circle")
            .attr("class", "point")
            .attr("r", chartConfig.pointRadius)
            .attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value))
            .style("fill", chartConfig.lineColor);

        this.zoom = d3.zoom()
            .scaleExtent([0.1, 100000])
            .translateExtent([[0, 0], [this.width, this.height]])
            .extent([[0, 0], [this.width, this.height]])
            .on("zoom", (event) => this.zoomed(event));

        this.svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("x", this.margin.left)
            .attr("y", this.margin.top)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(this.zoom);

        this.render();
    }

    render() {
        this.x.domain(d3.extent(this.data, d => d.date));
        this.y.domain([0, d3.max(this.data, d => d.value + 0.5 * (d.value))]);

        this.xAxis.call(d3.axisBottom(this.x)
            .tickFormat(d3.timeFormat("%Y-%m-%d %H:%M:%S.%L")));

        this.yAxis.call(d3.axisLeft(this.y).ticks(25)); // Устанавливает 10 делений на оси Y ```

        this.path.attr("d", this.line(this.data));

        this.points.attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value));
    }

    zoomed(event) {
        const transform = event.transform;
        const newX = transform.rescaleX(this.x);

        this.xAxis.call(d3.axisBottom(newX)
            .tickFormat(d => {
                const scale = newX.domain();
                const [minDate, maxDate] = scale;
                const diff = maxDate - minDate;

                if (diff < 1000) return d3.timeFormat("%S.%L")(d);
                else if (diff < 60000) return d3.timeFormat("%H:%M:%S")(d);
                else if (diff < 3600000) return d3.timeFormat("%H:%M")(d);
                else if (diff < 86400000) return d3.timeFormat("%H:00")(d);
                else if (diff < 31536000000) return d3.timeFormat("%Y-%m-%d")(d);
                return d3.timeFormat("%Y")(d);
            }));

        this.yAxis.call(d3.axisLeft(this.y).ticks(25)); // Устанавливает 10 делений на оси Y ```

        this.path.attr("d", d3.line()
            .x(d => newX(d.date))
            .y(d => this.y(d.value))(this.data));

        this.points.attr("cx", d => newX(d.date))
            .attr("cy", d => this.y(d.value));
    }
}