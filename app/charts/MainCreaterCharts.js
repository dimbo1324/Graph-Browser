import { TimelineEditor } from "./chart/TimelineEditor.js";
import { LineChart } from "./chart/LineChart.js";
import { DisplayOptions } from "./chart/DisplayOptions.js";

export class MainCreaterCharts {
    #timelineEditor;
    #displayOptions;
    #data;
    #canvasId;

    constructor(data, canvasId = "line-chart") {
        this.#canvasId = canvasId;
        this.#data = data;
        this.#timelineEditor = new TimelineEditor(this.#data, this.#canvasId);
        this.#displayOptions = new DisplayOptions(this.#timelineEditor.getNewData());
        this.#getLineChart();
    }

    #getLineChart() {
        return new LineChart(this.#displayOptions.getDisplayOptions(), this.#canvasId);
    }
}
