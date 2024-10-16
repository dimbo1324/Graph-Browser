import Button from "./htmlComponents/Button.js";
import { ConvertToJSON } from "./Format Converter/main.js";

document.addEventListener('DOMContentLoaded', () => {
    const converter = new ConvertToJSON('upload', 'output', 'downloadSheet1', 'downloadSheet2');

    document.getElementById('processFileButton').addEventListener('click', () => {
        converter.processFile((data1, data2) => {

            console.log("Данные для листа 1:", data1);
            console.log("Данные для листа 2:", data2);

        });
    });
});
