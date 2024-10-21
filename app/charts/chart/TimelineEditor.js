export class TimelineEditor {
    #data1;
    #data2;
    #canvasId;

    constructor(data1, data2, canvasId) {
        this.#data1 = data1;
        this.#data2 = data2;
        this.#canvasId = canvasId;
    }

    #editData(data) {
        return data.map((point) => {
            const roundedTime = new Date(Math.round(new Date(point.x).getTime() / 1000) * 1000);
            return {
                x: roundedTime,
                y: point.y,
            };
        });
    }

    getNewData() {
        const editedData1 = this.#editData(this.#data1);
        const editedData2 = this.#editData(this.#data2);
        return { data1: editedData1, data2: editedData2 };
    }
}
