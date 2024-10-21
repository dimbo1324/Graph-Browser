import TimelineEditor from "./chart/TimelineEditor.js"
import LineChart from "./chart/LineChart.js"
import DisplayOptions from "./chart/DisplayOptions.js"



export default class MainCreaterCharts {
    #timelineEditor
    #lineChart
    #displayOptions
    #data
    #canvasId
    constructor(data, canvasId = "line-chart") {
        this.#canvasId = canvasId
        this.#data = data
        this.#timelineEditor = new TimelineEditor(this.#data)
        this.#displayOptions = new DisplayOptions(this.#timelineEditor.getNewData())
        this.#lineChart = new LineChart(this.#displayOptions.getDisplayOptions(), this.#canvasId)
    }

    
}