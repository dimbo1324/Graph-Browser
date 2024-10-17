import { chartConfig } from "./options.js"

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

    reset() {
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity);
    }

    #render() {
        this.x.domain(d3.extent(this.data, d => d.date));
        const minY = d3.min(this.data, d => d.value);
        const maxY = d3.max(this.data, d => d.value);
        this.y.domain([minY < 0 ? minY * 1.1 : 0, maxY * 1.1]);

        this.xAxis.call(d3.axisBottom(this.x)
            .tickFormat(d3.timeFormat("%Y-%m-%d %H:%M:%S.%L"))
            .tickSize(-this.height));

        this.yAxis.call(d3.axisLeft(this.y)
            .ticks(chartConfig.ticks)
            .tickSize(-this.width));

        this.path.attr("d", this.line(this.data));

        this.points.attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value));
    }

    #zoomed(event) {
        const transform = event.transform;
        const newX = transform.rescaleX(this.x);
        const newY = transform.rescaleY(this.y);

        // Обновляем ось X с учетом нового масштаба
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
            })
            .tickSize(-this.height));

        this.yAxis.call(d3.axisLeft(newY)
            .ticks(chartConfig.ticks)
            .tickSize(-this.width));

        this.path.attr("d", d3.line()
            .x(d => newX(d.date))
            .y(d => newY(d.value))(this.data));

        this.points.attr("cx", d => newX(d.date))
            .attr("cy", d => newY(d.value));
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
        this.y = d3.scaleLinear().range([this.height, 0]);

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
            .translateExtent([[-Infinity, -Infinity], [Infinity, Infinity]])
            .extent([[0, 0], [this.width, this.height]])
            .on("zoom", (event) => this.#zoomed(event));

        this.svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("x", this.margin.left)
            .attr("y", this.margin.top)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(this.zoom)
            .on("mousedown", () => {
                this.svg.style("cursor", "grabbing");
            })
            .on("mouseup", () => {
                this.svg.style("cursor", "default");
            });

        this.#render();
    }
}