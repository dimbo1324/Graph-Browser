export default class DateFormatter {
    #dateFromJson
    #nameCoordinateAxis
    constructor(dateFromJson, nameCoordinateAxis = 'x') {
        this.#dateFromJson = dateFromJson
        this.#nameCoordinateAxis = nameCoordinateAxis
        this.#dateChanging()
    }

    #dateChanging() {
        for (let i = 0; i < this.#dateFromJson.length; i++) {
            this.#dateFromJson[i][this.#nameCoordinateAxis] = new Date(this.#dateFromJson[i][this.#nameCoordinateAxis]);
        }
    }
}