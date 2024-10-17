export default class Render {
    #data
    constructor(data) {
        this.#data = data
    }
    #render() {
        this.x.domain(d3.extent(this.data, d => d.date))
        const minY = d3.min(this.data, d => d.value)
        const maxY = d3.max(this.data, d => d.value)
        this.y.domain([minY < 0 ? minY * 1.1 : 0, maxY * 1.1])

        this.xAxis.call(d3.axisBottom(this.x)
            .tickFormat(d3.timeFormat("%Y-%m-%d %H:%M:%S.%L"))
            .tickSize(-this.height))

        this.yAxis.call(d3.axisLeft(this.y)
            .ticks(chartConfig.ticks)
            .tickSize(-this.width))

        this.path.attr("d", this.line(this.data))

        this.points.attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value))
    }
}