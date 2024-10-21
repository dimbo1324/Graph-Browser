import { ResetZoom } from "../zoom/ResetZoom.js";

export class LineChart {
    #ctx;
    #canvasId;
    #displayOptions;
    #chartInstance;
    #resetZoom

    constructor(displayOptions, canvasId) {
        this.#canvasId = canvasId;
        this.#displayOptions = displayOptions;
        this.#ctx = document.getElementById(this.#canvasId);
        this.#chartInstance = new Chart(this.#ctx, this.#displayOptions);
        this.#resetZoom = new ResetZoom(this.#chartInstance)

        if (!this.#ctx) {
            throw new Error(`Canvas with id "${this.#canvasId}" not found.`);
        }
    }

    getChartInstance() {
        return this.#chartInstance
    }
}