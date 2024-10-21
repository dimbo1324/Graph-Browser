import { MainCreaterCharts } from "./charts/MainCreaterCharts.js";
import { ResetZoom } from "./zoom/ResetZoom.js";


const data = [
    { x: "2024-07-31T21:01:00.719Z", y: 10520 },
    { x: "2024-08-01T02:11:59.738Z", y: 10519 },
    { x: "2024-08-01T02:12:05.142Z", y: 10520 },
]



new ResetZoom(new MainCreaterCharts(data))