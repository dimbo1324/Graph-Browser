export default class CreateChart {
    #data;
    #width;
    #height;
    #marginTop;
    #marginRight;
    #marginBottom;
    #marginLeft;
    #x;
    #y;
    #line;
    #svg;
    #tooltip;

    constructor(data, {
        width = 928,
        height = 500,
        marginTop = 20,
        marginRight = 30,
        marginBottom = 30,
        marginLeft = 40,
    } = {}) {
        this.#data = data;
        this.#width = width;
        this.#height = height;
        this.#marginTop = marginTop;
        this.#marginRight = marginRight;
        this.#marginBottom = marginBottom;
        this.#marginLeft = marginLeft;

        this.#declareXScale();
        this.#declareYScale();
        this.#declareLine();
        this.#createSVGContainer();
        this.#addAxes();
        this.#addLinePath();
        this.#createTooltip();
    }

    #declareXScale() {
        this.#x = d3.scaleUtc(d3.extent(this.#data, d => d.Date), [this.#marginLeft, this.#width - this.#marginRight]);
    }

    #declareYScale() {
        this.#y = d3.scaleLinear([0, d3.max(this.#data, d => d.Close)], [this.#height - this.#marginBottom, this.#marginTop]);
    }

    #declareLine() {
        this.#line = d3.line()
            .x(d => this.#x(d.Date))
            .y(d => this.#y(d.Close));
    }

    #createSVGContainer() {
        this.#svg = d3.create("svg")
            .attr("viewBox", [0, 0, this.#width, this.#height])
            .attr("width", this.#width)
            .attr("height", this.#height)
            .attr("style", "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;")
            .style("-webkit-tap-highlight-color", "transparent")
            .style("overflow", "visible")
            .on("pointerenter pointermove", this.#pointermoved.bind(this))
            .on("pointerleave", this.#pointerleft.bind(this))
            .on("touchstart", event => event.preventDefault());
    }

    #addAxes() {
        this.#svg.append("g")
            .attr("transform", `translate(0,${this.#height - this.#marginBottom})`)
            .call(d3.axisBottom(this.#x).ticks(this.#width / 80).tickSizeOuter(0));

        this.#svg.append("g")
            .attr("transform", `translate(${this.#marginLeft},0)`)
            .call(d3.axisLeft(this.#y).ticks(this.#height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.selectAll(".tick line").clone()
                .attr("x2", this.#width - this.#marginLeft - this.#marginRight)
                .attr("stroke-opacity", 0.1))
            .call(g => g.append("text")
                .attr("x", -this.#marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Daily Close ($)"));
    }

    #addLinePath() {
        this.#svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", this.#line(this.#data));
    }

    #createTooltip() {
        this.#tooltip = this.#svg.append("g");
    }

    #pointermoved(event) {
        const bisect = d3.bisector(d => d.Date).center;
        const i = bisect(this.#data, this.#x.invert(d3.pointer(event)[0]));
        this.#tooltip.style("display", null);
        this.#tooltip.attr("transform", `translate(${this.#x(this.#data[i].Date)},${this.#y(this.#data[i].Close)})`);

        const path = this.#tooltip.selectAll("path")
            .data([,])
            .join("path")
            .attr("fill", "white")
            .attr("stroke", "black");

        const text = this.#tooltip.selectAll("text")
            .data([,])
            .join("text")
            .call(text => text
                .selectAll("tspan")
                .data([this.#formatDate(this.#data[i].Date), this.#formatValue(this.#data[i].Close)])
                .join("tspan")
                .attr("x", 0)
                .attr("y", (_, i) => `${i * 1.1}em`)
                .attr("font-weight", (_, i) => i ? null : "bold")
                .text(d => d));

        this.#size(text, path);
    }

    #pointerleft() {
        this.#tooltip.style("display", "none");
    }

    #formatValue(value) {
        return value.toLocaleString("en", {
            style: "currency",
            currency: "USD"
        });
    }

    #formatDate(date) {
        return date.toLocaleString("en", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC"
        });
    }

    #size(text, path) {
        const { x, y, width: w, height: h } = text.node().getBBox();
        text.attr("transform", `translate(${-w / 2},${15 - y})`);
        path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
    }

    render(container) {
        container.appendChild(this.#svg.node());
    }
}