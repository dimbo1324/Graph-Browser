export class LineChart {
    #ctx;
    #canvasId;
    #displayOptions;
    chartInstance;

    constructor(displayOptions, canvasId) {
        this.#canvasId = canvasId;
        this.#displayOptions = displayOptions;
        this.#ctx = document.getElementById(this.#canvasId);

        if (!this.#ctx) {
            throw new Error(`Canvas with id "${this.#canvasId}" not found.`);
        }

        this.#initChart();
    }

    #initChart() {
        this.chartInstance = new Chart(this.#ctx, this.#displayOptions);
    }

    getChartInstance() {
        return this.chartInstance;
    }
}