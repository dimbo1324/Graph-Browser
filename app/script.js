import Chart from "./Chart/Chart.js";


// Пример данных
const data1 = Array.from({ length: 222 }, (_, i) => ({
    date: new Date(2023, 0, i * 2),
    value: Math.random() * 100
}));

const data2 = Array.from({ length: 222 }, (_, i) => ({
    date: new Date(2023, 0, i),
    value: Math.random() * 100
}));

console.log(data1);

// Инициализация графика
new Chart("#chart-container", data1, data2);

