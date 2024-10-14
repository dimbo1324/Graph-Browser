import FileReaderUtility from './file_reader.js';
import ExcelParser from './excel_parser.js';
import JSONFormatter from './json_formatter.js';
import DateTimeConverter from './date_time_converter.js';

export default class ConvertToJSON {
    #formattedData1 = [];
    #formattedData2 = [];

    constructor(fileInputId, outputId, downloadLink1Id, downloadLink2Id) {
        this.fileReader = new FileReaderUtility(fileInputId);
        this.outputElement = document.getElementById(outputId);
        this.downloadLink1 = document.getElementById(downloadLink1Id);
        this.downloadLink2 = document.getElementById(downloadLink2Id);
        this.dateTimeConverter = new DateTimeConverter();
        this.jsonFormatter = new JSONFormatter(this.dateTimeConverter);
    }

    processFile() {
        this.fileReader.readFile((data) => {
            const excelParser = new ExcelParser(data);
            const sheet1Data = excelParser.parseSheet(1);
            const sheet2Data = excelParser.parseSheet(2);

            this.#formattedData1 = this.jsonFormatter.formatData(sheet1Data);
            this.#formattedData2 = this.jsonFormatter.formatData(sheet2Data);

            this.updateDownloadLinks(this.#formattedData1, this.#formattedData2);

        });
    }

    updateDownloadLinks(formattedData1, formattedData2) {
        if (formattedData1 && formattedData2) {
            const jsonBlob1 = new Blob([JSON.stringify(formattedData1)], { type: 'application/json' });
            this.downloadLink1.href = URL.createObjectURL(jsonBlob1);
            this.downloadLink1.style.display = 'block';

            const jsonBlob2 = new Blob([JSON.stringify(formattedData2)], { type: 'application/json' });
            this.downloadLink2.href = URL.createObjectURL(jsonBlob2);
            this.downloadLink2.style.display = 'block';
        }
    }

    getLists() {
        return [this.#formattedData1, this.#formattedData2];
    }
}
