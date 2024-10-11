import { ConvertToJSON } from "../Format Converter/utils/main.js";

export default class Converter {
    constructor(callback, sheet1Data = [], sheet2Data = []) {
        this.sheet1Data = sheet1Data;
        this.sheet2Data = sheet2Data;
        this.callback = callback;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const converter = new ConvertToJSON('upload', 'output', 'downloadSheet1', 'downloadSheet2');

        document.getElementById('processFileButton').addEventListener('click', () => {
            converter.processFile((processedSheet1Data, processedSheet2Data) => {
                this.sheet1Data = processedSheet1Data;
                this.sheet2Data = processedSheet2Data;
                this.callback(this.sheet1Data, this.sheet2Data);
            });
        });
    }
}
