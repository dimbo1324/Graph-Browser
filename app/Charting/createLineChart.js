import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { LineChart } from "./LineChart.js";

export function createLineChart(data) {
    const chart = LineChart(data, {
        x: d => d.date,
        y: d => d.close,
        yLabel: "Условные единицы",
        width: 500,
        height: 500,
        color: "steelblue"
    });
    return chart;
}