class ZoomableChart {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
        this.width = 800 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;
        this.initChart();
    }

    initChart() {
        // Создаем SVG-элемент
        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        // Определяем шкалы
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);

        // Устанавливаем оси
        this.xAxis = this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${this.height})`);

        this.yAxis = this.svg.append("g")
            .attr("class", "y-axis");

        // Добавляем сетку (grid) для осей
        this.xGrid = this.svg.append("g")
            .attr("class", "x-grid")
            .attr("transform", `translate(0,${this.height})`);

        this.yGrid = this.svg.append("g")
            .attr("class", "y-grid");

        // Определяем линию
        this.line = d3.line()
            .x(d => this.x(d.date))
            .y(d => this.y(d.value));

        // Добавляем путь для линии графика
        this.path = this.svg.append("path")
            .attr("class", "line")
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", 1.5);

        // Добавляем Zoom
        this.zoom = d3.zoom()
            .scaleExtent([1, 10])
            .translateExtent([[0, 0], [this.width, this.height]])
            .extent([[0, 0], [this.width, this.height]])
            .on("zoom", (event) => this.zoomed(event));

        this.svg.append("rect")
            .attr("width", this.width)
            .attr("height", this.height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .call(this.zoom);

        // Вызов функции рендеринга
        this.render();
    }

    render() {
        // Устанавливаем домены для шкал
        this.x.domain(d3.extent(this.data, d => d.date));
        this.y.domain([0, d3.max(this.data, d => d.value)]);

        // Обновляем оси
        this.xAxis.call(d3.axisBottom(this.x));
        this.yAxis.call(d3.axisLeft(this.y));

        // Рендерим сетку (grid)
        this.xGrid.call(d3.axisBottom(this.x)
            .tickSize(-this.height)
            .tickFormat(""))
            .selectAll("line")
            .style("stroke", "#e0e0e0");

        this.yGrid.call(d3.axisLeft(this.y)
            .tickSize(-this.width)
            .tickFormat(""))
            .selectAll("line")
            .style("stroke", "#e0e0e0");

        // Рендерим линию графика
        this.path.datum(this.data)
            .attr("d", this.line);

        // Рендерим точки данных
        this.points = this.svg.selectAll(".point")
            .data(this.data)
            .join("circle")
            .attr("class", "point")
            .attr("cx", d => this.x(d.date))
            .attr("cy", d => this.y(d.value))
            .attr("r", 4)
            .on("mouseover", (event, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.hideTooltip());
    }

    showTooltip(event, d) {
        d3.select(this.container).append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("left", `${event.pageX + 5}px`)
            .style("top", `${event.pageY - 28}px`)
            .style("background", "lightgrey")
            .style("padding", "5px")
            .style("border-radius", "4px")
            .html(`Date: ${d.date.toLocaleDateString()}<br>Value: ${d.value}`);
    }

    hideTooltip() {
        d3.select(this.container).selectAll(".tooltip").remove();
    }

    zoomed(event) {
        const transform = event.transform;
        const newX = transform.rescaleX(this.x);

        // Обновляем ось X и сетку
        this.xAxis.call(d3.axisBottom(newX));
        this.xGrid.call(d3.axisBottom(newX)
            .tickSize(-this.height)
            .tickFormat(""));

        // Обновляем положение точек и линию графика
        this.path.attr("d", this.line.x(d => newX(d.date)));
        this.points.attr("cx", d => newX(d.date));
    }
}

// Генерируем примерные данные с датами и значениями
const data = Array.from({ length: 100 }, (_, i) => ({
    date: new Date(2023, 0, i),
    value: Math.random() * 100
}));

// Инициализируем график
new ZoomableChart("#chart-container", data);
