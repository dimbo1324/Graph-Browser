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

    constructor({
        data,
        width = 928,
        height = 600,
        x,
        y,
        z,
        xAxis,
        yAxis,
        grid
    }) {
        this.#data = data;
        this.#width = width;
        this.#height = height;
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#xAxis = xAxis;
        this.#yAxis = yAxis;
        this.#grid = grid;

        this.#initializeZoom();
        this.#createSVGContainer();
        this.#createChartElements();
        this.#applyZoom();
    }

    #initializeZoom() {
        this.#zoom = d3.zoom()
            .scaleExtent([0.5, 32])
            .on("zoom", this.#zoomed.bind(this));
    }

    #createSVGContainer() {
        this.#svg = d3.create("svg")
            .attr("viewBox", [0, 0, this.#width, this.#height]);
    }

    #createChartElements() {
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
    }

    #applyZoom() {
        this.#svg.call(this.#zoom).call(this.#zoom.transform, d3.zoomIdentity);
    }

    #zoomed({
        transform
    }) {
        const zx = transform.rescaleX(this.#x).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(this.#y).interpolate(d3.interpolateRound);

        // Ограничение перемещения в отрицательную область оси Y 
        const [minY, maxY] = zy.domain();
        let tY = transform.y;
        if (minY < 0) {
            const offset = this.#y(0) - this.#y(minY);
            tY += offset;
        }

        const limitedTransform = d3.zoomIdentity.translate(transform.x, tY).scale(transform.k);

        this.#gDot.attr("transform", limitedTransform).attr("stroke-width", 5 / limitedTransform.k);
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