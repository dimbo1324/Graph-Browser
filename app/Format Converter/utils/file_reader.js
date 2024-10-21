export class FileReaderUtility {
    constructor(inputElement) {
        this.fileInput = document.getElementById(inputElement);
    }

    readFile(callback) {
        const file = this.fileInput.files[0];
        if (!file) {
            alert("Пожалуйста, загрузите файл Excel.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            callback(data);
        };
        reader.readAsArrayBuffer(file);
    }
}
