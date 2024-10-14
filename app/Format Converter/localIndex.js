import ConvertToJSON from "../Format Converter/utils/main.js";

export default class Converter {
    #converter
    constructor() {
        this.#converter = new ConvertToJSON('upload', 'output', 'downloadSheet1', 'downloadSheet2');
        [this.data1, this.data2] = this.#converter.getLists()
    }

    getData() {
        return [this.data1, this.data2]
    }

    getConverter() {
        return this.#converter
    }

    buttonAction(fn) {
        document.getElementById('processFileButton').addEventListener('click', () => {
            if (typeof fn === 'function') {
                fn();
            }
            else {
                console.error('Переданный параметр не является функцией');
            }
        });
    }
}
