import Converter from "./Format Converter/localIndex.js";
import { createLineChart } from "./Charting/createLineChart.js";


const converter = new Converter(() => {
    console.log(123);
});
converter.init();

// Предположим, что aapl - это массив данных с полями date и close
const aapl = [
    { date: new Date("2023-01-01"), close: 1520 },
    { date: new Date("2023-01-02"), close: 155 },
    // Добавьте больше данных по необходимости
];

const width = 928; // Определите ширину
const height = 600; // Определите высоту
const basis = 100; // Определите базис, если он используется



const chart = createLineChart(aapl);
document.body.appendChild(chart);
