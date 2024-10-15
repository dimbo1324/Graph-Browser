import CreateChart from "./utils/CreateChart.js";
import { data } from "./data/data.js";


const obj1 = new CreateChart(data)
obj1.render(document.getElementById("chart"))