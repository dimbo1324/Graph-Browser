import { doZoom, zoomableChart } from "./utils/ZoomableChart/main.js";
import { createButton } from "./htmlElements/buttons.js";
doZoom()


/*
__________________________________________________________________
Возвращает обзор
__________________________________________________________________
*/
createButton('zoom', 'zoom').addEventListener('click', () => {
    zoomableChart.reset();
});
/*
__________________________________________________________________
__________________________________________________________________
*/