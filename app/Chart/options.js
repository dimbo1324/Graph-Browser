import { proxyHeader } from "./proxyHeader.js";
const config = {
    margin: { top: 0, right: 40, bottom: 40, left: 40 },
    initialWidth: 750,
    coefficientHeight: 2,
    pointRadius: 2,
    strokeWidth: 0.75,
    zoomScaleExtent: [1, 10],
    zoomTranslateExtent: [[0, 0], [8000, 8000]],
    lineColor: "black"
};


export const chartConfig = new Proxy(config, proxyHeader)
