import { createLineChart } from "../Charting/createLineChart.js"


export function presentation(data1, data2) {
    const chart1 = createLineChart(data1)
    const chart2 = createLineChart(data2)
    console.log(data1);
    console.log(data2);

    document.body.appendChild(chart1)
}