import CreateChart from "./utils/CreateChart.js";
import { data } from "./data/data.js";
import DateFormatter from "./data/utils/DateFormatter.js";

new DateFormatter(data)

const newData = data

new CreateChart(newData).render(document.getElementById("chart"))

