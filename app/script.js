import Chart from "./Chart/Chart.js";

const data1 = Array.from({ length: 3000 }, (_, i) => ({
    date: new Date(2023, 0, i * 2),
    value: Math.random() * 100
}));

// Инициализация графика
new Chart("#chart-container", data1);

