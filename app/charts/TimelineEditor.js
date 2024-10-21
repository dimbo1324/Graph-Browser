export default class TimelineEditor {
    #data
    constructor(data) {
        this.#data = data
    }
    #edit() {
        return this.#data.map((point) => {
            const roundedTime = new Date(Math.round(new Date(point.x).getTime() / 1000) * 1000);
            return {
                x: roundedTime,
                y: point.y
            };
        });
    }

    getNewData() {
        return this.#edit()
    }
}
