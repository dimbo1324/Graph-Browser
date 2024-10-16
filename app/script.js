import Chart from "./Chart/Chart.js";


// Пример данных
const data = Array.from({ length: 222 }, (_, i) => ({
    date: new Date(2023, 0, i),
    value: Math.random() * 100
}));

// Инициализация графика
new Chart("#chart-container", data);
