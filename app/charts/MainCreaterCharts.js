import { TimelineEditor } from "./chart/TimelineEditor.js";
import { LineChart } from "./chart/LineChart.js";
import { DisplayOptions } from "./chart/DisplayOptions.js";

export class MainCreaterCharts {
    #timelineEditor;
    #displayOptions;
    #data1;
    #data2;
    #canvasId;

    constructor(data1, data2, canvasId = "line-chart") {
        this.#canvasId = canvasId;
        this.#data1 = data1;
        this.#data2 = data2;
        this.#timelineEditor = new TimelineEditor(this.#data1, this.#data2, this.#canvasId);
        console.log(this.#timelineEditor);

        this.#displayOptions = new DisplayOptions(this.#timelineEditor.getNewData());
        this.#getLineChart();
    }

    #getLineChart() {
        return new LineChart(this.#displayOptions.getDisplayOptions(), this.#canvasId);
    }
}
