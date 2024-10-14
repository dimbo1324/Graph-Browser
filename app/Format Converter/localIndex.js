import ConvertToJSON from "../Format Converter/utils/main.js";

export default class Converter {
    #converter
    constructor(callback, sheet1Data = [], sheet2Data = []) {
        this.sheet1Data = sheet1Data;
        this.sheet2Data = sheet2Data;
        this.callback = callback;
        this.#converter = new ConvertToJSON('upload', 'output', 'downloadSheet1', 'downloadSheet2');
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        document.getElementById('processFileButton').addEventListener('click', () => {
            this.#converter.processFile((processedSheet1Data, processedSheet2Data) => {
                this.sheet1Data = this.#converter.getList1();
                this.sheet2Data = this.#converter.getList2();

                this.callback(this.sheet1Data, this.sheet2Data);

                if (typeof this.additionalCallback === 'function') {
                    this.additionalCallback(this.sheet1Data, this.sheet2Data);
                }
            });
        });
    }
}