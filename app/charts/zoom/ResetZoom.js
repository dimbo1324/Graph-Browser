export class ResetZoom {
    #className;
    #button;
    #chart;

    constructor(chart, className = "reset-zoom") {
        this.#className = className;
        this.#chart = chart;
        this.#button = document.getElementsByClassName(this.#className)[0];
        this.#init();
    }

    #reset() {
        this.#chart.resetZoom();
    }

    #init() {
        if (this.#button) {

            this.#button.addEventListener("click", this.#reset.bind(this));
        } else {
            console.warn(`Button with class "${this.#className}" not found.`);
        }
    }
}
