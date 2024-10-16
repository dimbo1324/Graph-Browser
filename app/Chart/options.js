import { proxyHeader } from "./proxyHeader.js";
const config = {
    margin: { top: 20, right: 20, bottom: 30, left: 40 },
    initialWidth: 8000,
    coefficientHeight: 17,
    pointRadius: 2,
    strokeWidth: 0.75,
    zoomScaleExtent: [1, 10],
    zoomTranslateExtent: [[0, 0], [8000, 8000]],
    lineColor: "black"
};

export const chartConfig = new Proxy(config, proxyHeader)