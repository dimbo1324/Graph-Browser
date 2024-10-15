import ZoomableChart from "./ZoomableChart.js";
import { plottingPoints } from "./parametrs/plottingPoints.js";
import { width, height, k, x, y, z, xAxis, yAxis, grid, } from "./parametrs/coefficients.js";

export const zoomableChart = new ZoomableChart({
    data: plottingPoints,
    width,
    height,
    x,
    y,
    z,
    xAxis,
    yAxis,
    grid
});
export function doZoom() {
    const container = document.getElementById('chart-container');
    zoomableChart.render(container);
    return zoomableChart
}

export default class Zoom {
    constructor() {

    }
}