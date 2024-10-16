class ZoomableChart {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.width = 8000 - this.margin.left - this.margin.right; // изменил ширину для удобства
        this.height = this.width / 17;
        this.initChart();
    }

    initChart() {
        // Создаем SVG-элемент
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        // Добавляем область обрезки (clipPath)
        this.svg.append("defs")
            .append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("x", this.margin.left)
            .attr("y", this.margin.top);

        // Группа для графика с применением clipPath
        this.g = this.svg.append("g")
            .attr("clip-path", "url(#clip)")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        // Настройка шкал
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        // Настройка осей
        this.xAxis = this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(${this.margin.left},${this.height + this.margin.top})`);

        this.yAxis = this.svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        // Определяем линию
        this.line = d3.line()
            .x(d => this.x(d.date))
            .y(d => this.y(d.value));

        // Добавляем путь для линии графика
        this.path = this.g.append("path")
            .datum(this.data)
            .attr("class", "line")
            .attr("d", this.line)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", 1.5);

        // Добавляем точки данных
        this.points = this.g.selectAll(".point")
            .data(this.data)
            .enter().append("circle")
            .attr("class", "point")
            .attr("r", 3)
            .attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value))
            .style("fill", "steelblue");

        // Добавляем Zoom
        this.zoom = d3.zoom()
            .scaleExtent([1, 10])
            .translateExtent([[0, 0], [this.width, this.height]])
            .extent([[0, 0], [this.width, this.height]])
            .on("zoom", (event) => this.zoomed(event));

        // Применяем область для зума
        this.svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("x", this.margin.left)
            .attr("y", this.margin.top)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(this.zoom);

        // Вызываем рендеринг
        this.render();
    }

    render() {
        // Установка доменов для шкал
        this.x.domain(d3.extent(this.data, d => d.date));
        this.y.domain([0, d3.max(this.data, d => d.value)]);

        // Рендерим оси
        this.xAxis.call(d3.axisBottom(this.x));
        this.yAxis.call(d3.axisLeft(this.y));

        // Обновляем линию графика
        this.path.attr("d", this.line(this.data));

        // Обновляем точки данных
        this.points.attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value));
    }

    zoomed(event) {
        const transform = event.transform;

        // Обновляем шкалы с учетом трансформации
        const newX = transform.rescaleX(this.x);
        const newY = transform.rescaleY(this.y);

        // Обновляем оси
        this.xAxis.call(d3.axisBottom(newX));
        this.yAxis.call(d3.axisLeft(newY));

        // Обновляем линию графика с новой шкалой X, сохраняя данные
        this.path.attr("d", d3.line()
            .x(d => newX(d.date))
            .y(d => newY(d.value))(this.data));

        // Обновляем точки данных с новыми координатами
        this.points.attr("cx", d => newX(d.date))
            .attr("cy", d => newY(d.value));
    }
}

// Пример данных
const data = Array.from({ length: 222 }, (_, i) => ({
    date: new Date(2023, 0, i),
    value: Math.random() * 100
}));

// Инициализация графика
new ZoomableChart("#chart-container", data);
