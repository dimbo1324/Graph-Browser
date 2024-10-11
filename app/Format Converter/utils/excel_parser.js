
export default class ExcelParser {
    constructor(data) {
        this.workbook = XLSX.read(data, { type: 'array' });
    }

    parseSheet(sheetIndex, startRow = 3, startCol = 0, endCol = 2) {
        const sheetName = this.workbook.SheetNames[sheetIndex];
        const worksheet = this.workbook.Sheets[sheetName];

        const range = XLSX.utils.decode_range(worksheet['!ref']);
        range.s.r = startRow;
        range.s.c = startCol;
        range.e.c = endCol;
        worksheet['!ref'] = XLSX.utils.encode_range(range);

        const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        return rawData;
    }
}
