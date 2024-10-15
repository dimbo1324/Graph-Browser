import ZoomableChart from "./utils/ZoomableChart.js";

// Генерация данных
const data = (() => {
    const random = d3.randomNormal(0, 0.5);
    const sqrt3 = Math.sqrt(3);
    return [].concat(
        Array.from({ length: 300 }, () => [random() + sqrt3, random() + 1, 0]),
        Array.from({ length: 300 }, () => [random() - sqrt3, random() + 1, 1]),
        Array.from({ length: 300 }, () => [random(), random() - 1, 2])
    );
})();

const width = 928;
const height = 600;
const k = height / width; // Коэффициент масштабирования для оси y

const x = d3.scaleLinear()
    .domain([-4.5, 4.5])
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([1 * k, 8 * k])
    .range([height, 0]);

const z = d3.scaleOrdinal()
    .domain(data.map(d => d[2]))
    .range(d3.schemeCategory10);

const xAxis = (g, x) => g.attr("transform", `translate(0,${height})`)
    .call(d3.axisTop(x).ticks(12));

const yAxis = (g, y) => g.call(d3.axisRight(y).ticks(12 * k));

const grid = (g, x, y) => g.attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g
        .selectAll(".x")
        .data(x.ticks(12))
        .join(
            enter => enter.append("line").attr("class", "x").attr("y2", height),
            update => update,
            exit => exit.remove()
        )
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d)))
    .call(g => g
        .selectAll(".y")
        .data(y.ticks(12 * k))
        .join(
            enter => enter.append("line").attr("class", "y").attr("x2", width),
            update => update,
            exit => exit.remove()
        )
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d)));

// Создание и отображение графика
const chart = new ZoomableChart({
    data,
    width,
    height,
    x,
    y,
    z,
    xAxis,
    yAxis,
    grid
});

// Добавляем график в контейнер
const container = document.getElementById('chart-container');
chart.render(container);

// Пример использования метода сброса зума
document.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        chart.reset();
    }
});
