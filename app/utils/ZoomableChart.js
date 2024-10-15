export default class ZoomableChart {
    #data;
    #width;
    #height;
    #x;
    #y;
    #z;
    #xAxis;
    #yAxis;
    #grid;
    #svg;
    #gDot;
    #gGrid;
    #gx;
    #gy;
    #zoom;

    constructor(data, {
        width = 928,
        height = 500,
        x,
        y,
        z,
        xAxis,
        yAxis,
        grid
    } = {}) {
        this.#data = data;
        this.#width = width;
        this.#height = height;
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#xAxis = xAxis;
        this.#yAxis = yAxis;
        this.#grid = grid;

        this.#initializeChart();
    }

    #initializeChart() {
        this.#zoom = d3.zoom()
            .scaleExtent([0.5, 32])
            .on("zoom", this.#zoomed.bind(this));

        this.#svg = d3.create("svg")
            .attr("viewBox", [0, 0, this.#width, this.#height]);

        this.#gGrid = this.#svg.append("g");

        this.#gDot = this.#svg.append("g")
            .attr("fill", "none")
            .attr("stroke-linecap", "round");

        this.#gDot.selectAll("path")
            .data(this.#data)
            .join("path")
            .attr("d", d => `M${this.#x(d[0])},${this.#y(d[1])}h0`)
            .attr("stroke", d => this.#z(d[2]));

        this.#gx = this.#svg.append("g");
        this.#gy = this.#svg.append("g");

        this.#svg.call(this.#zoom).call(this.#zoom.transform, d3.zoomIdentity);
    }

    #zoomed({ transform }) {
        const zx = transform.rescaleX(this.#x).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(this.#y).interpolate(d3.interpolateRound);
        this.#gDot.attr("transform", transform).attr("stroke-width", 5 / transform.k);
        this.#gx.call(this.#xAxis, zx);
        this.#gy.call(this.#yAxis, zy);
        this.#gGrid.call(this.#grid, zx, zy);
    }

    reset() {
        this.#svg.transition()
            .duration(750)
            .call(this.#zoom.transform, d3.zoomIdentity);
    }

    render(container) {
        container.appendChild(this.#svg.node());
    }
}
