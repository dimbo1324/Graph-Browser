export class TimelineEditor {
    #data;
    #canvasId;

    constructor(data, canvasId) {
        this.#data = data;
        this.#canvasId = canvasId;
    }

    #edit() {
        return this.#data.map((point) => {
            const roundedTime = new Date(Math.round(new Date(point.x).getTime() / 1000) * 1000);
            return {
                x: roundedTime,
                y: point.y,
            };
        });
    }

    getNewData() {
        return this.#edit();
    }
}