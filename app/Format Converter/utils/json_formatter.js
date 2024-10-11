
export default class JSONFormatter {
    constructor(dateConverter) {
        this.dateConverter = dateConverter;
    }

    formatData(rawData) {
        return rawData.map(row => {
            const date = this.dateConverter.formatDate(row[0]);
            const time = row[1] || '';
            const value = row[2] || '';

            const dateTime = this.dateConverter.convertToDateTime(date, time);

            return {
                x: dateTime,
                y: value
            };
        }).filter(row => row.x && row.y);
    }
}
