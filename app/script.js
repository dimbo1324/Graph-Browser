import { data } from "./data/data.js";
import Chart from "./utils/Chart/Chart.js";
import DateFormatter from "./data/utils/dateFormatter.js";
import { doZoom } from "./utils/ZoomableChart/main.js";
/*
______________________________________________________________________
______________________________________________________________________
*/
new DateFormatter(data)
console.log(JSON.stringify(data));

const chart = new Chart(data)
chart.render(document.getElementById("chart"))

/*
______________________________________________________________________
______________________________________________________________________
*/
doZoom()
/*
______________________________________________________________________
______________________________________________________________________
*/