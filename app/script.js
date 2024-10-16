import Chart from "./Chart/Chart.js";

const data1 = Array.from({ length: 233 }, (_, i) => ({
    date: new Date(2023, 0, 1, 0, 0, 0, i),
    value: Math.random() * 20000
}));

new Chart("#chart-container", data1)


