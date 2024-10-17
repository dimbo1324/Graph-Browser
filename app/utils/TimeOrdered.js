export default class TimeOrdered {
    #data
    #currentDate
    #previousDate

    constructor(data) {
        this.#data = data;
    }

    isTimeOrdered() {
        if (this.#data.length < 2) {
            return true;
        }

        for (let i = 1; i < this.#data.length; i++) {
            this.#currentDate = new Date(this.#data[i].x);
            this.#previousDate = new Date(this.#data[i - 1].x);

            if (this.#currentDate < this.#previousDate) {
                console.error(`Порядок нарушен: текущая дата (${this.#data[i].x}) меньше предыдущей (${this.#data[i - 1].x})`);
                return false;
            }
        }

        return true;
    }
}