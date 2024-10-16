import Chart from "./Chart/Chart.js";
import { buttonZoom } from "./another/buttonZoom.js";

const data1 = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2023, 0, i * 2),
    value: Math.random() * 100
}));

// Инициализация графика

const chart = new Chart("#chart-container", data1)

