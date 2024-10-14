import { LineChart } from "./LineChart.js";

export function createLineChart(data) {
    const chart = LineChart(data, {
        x: d => d.x,
        y: d => d.y,
        yLabel: "Условные единицы",
        width: 500,
        height: 500,
        color: "steelblue"
    });
    return chart;
}