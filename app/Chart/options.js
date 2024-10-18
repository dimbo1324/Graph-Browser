import { chartObj } from "./Chart.js";


import { proxyHeader } from "./proxyHeader.js"
import WorkspaceAdapter from "../utils/WorkspaceAdapter.js"
const workspaceAdapter = new WorkspaceAdapter("chart-container", '', "adapt-the-dimensions", (newWidth) => {
    config.initialWidth = newWidth;
    chartObj.resetZoom();
});
const config = {
    margin: { top: 0, right: 40, bottom: 40, left: 60 },
    initialWidth: workspaceAdapter.getCurrentWidth(),
    coefficientHeight: 2,
    pointRadius: 4,
    strokeWidth: 2,
    zoomScaleExtent: [1, 10],
    zoomTranslateExtent: [[0, 0], [8000, 8000]],
    lineColor: "green "
};
document.addEventListener('widthChanged', (event) => {
    const newWidth = event.detail.newWidth;
    config.initialWidth = newWidth;
});
export const chartConfig = new Proxy(config, proxyHeader)
console.log(config.initialWidth);




















