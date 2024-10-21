import { MainCreaterCharts } from "./charts/MainCreaterCharts.js";
import { ConvertToJSON } from "./convertor/main.js";

document.addEventListener('DOMContentLoaded', () => {
    const converter = new ConvertToJSON('upload', 'output', 'downloadSheet1', 'downloadSheet2');

    document.getElementById('processFileButton').addEventListener('click', () => {
        converter.processFile((data1, data2) => {

            new MainCreaterCharts(data1, data2)


        });
    });
});