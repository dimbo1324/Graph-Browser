class ZoomableChart {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.width = 8000 - this.margin.left - this.margin.right;
        this.height = this.width / 17
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
            .attr("id", "clip") // уникальный ID для привязки к элементам графика
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

        // Добавляем линию графика
        this.path = this.g.append("path")
            .datum(this.data)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(d => this.x(d.date))
                .y(d => this.y(d.value)))
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", 1.5);
    }

    zoomed(event) {
        const transform = event.transform;
        const newX = transform.rescaleX(this.x);

        // Обновление оси X и положения линии графика при зуме
        this.xAxis.call(d3.axisBottom(newX));
        this.path.attr("d", d3.line()
            .x(d => newX(d.date))
            .y(d => this.y(d.value)));
    }
}

// Пример данных
const data = Array.from({ length: 22220 }, (_, i) => ({
    date: new Date(2023, 0, i),
    value: Math.random() * 100
}));

// Инициализация графика
new ZoomableChart("#chart-container", data);