export default class LineChart {
    #ctx
    #canvasId
    #displayOptions
    constructor(displayOptions, canvasId = "line-chart") {
        this.#canvasId = canvasId
        this.#displayOptions = displayOptions
        this.#ctx = document.getElementById(this.#canvasId)
    }

    #initChart() {
        return new Chart(this.#ctx, this.#displayOptions)
    }

    getInitChart() {
        return this.#initChart()
    }
}


