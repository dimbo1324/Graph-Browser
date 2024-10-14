import { createLineChart } from "../Charting/createLineChart.js";
import { converter } from "./vars.js";

export function generateGraph() {
    converter.getConverter().processFile()
    const [data1, data2] = converter.getData(); // Объявление переменных

    console.log(data1, data2);

    // Убедитесь, что createLineChart возвращает элемент, который можно добавить в DOM
    // const chart = createLineChart(data1);
    // document.body.appendChild(chart);
}
