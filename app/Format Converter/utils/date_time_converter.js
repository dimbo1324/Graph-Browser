export class DateTimeConverter {
    excelDateToJSDate(serial) {
        const excelStartDate = new Date(1899, 11, 30);
        const days = parseInt(serial, 10);
        return new Date(excelStartDate.setDate(excelStartDate.getDate() + days));
    }

    formatDate(date) {
        if (typeof date === 'number') {
            date = this.excelDateToJSDate(date);
        }

        if (date instanceof Date && !isNaN(date)) {
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }
        return '';
    }

    convertToDateTime(dateStr, timeStr) {
        const [day, month, year] = dateStr.split('.');
        let [hours, minutes, seconds] = timeStr.split(':');
        let milliseconds = '000';

        if (seconds && seconds.includes('.')) {
            [seconds, milliseconds] = seconds.split('.');
        }

        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
        return new Date(formattedDate);
    }
}
