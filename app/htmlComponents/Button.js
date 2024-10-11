export default class Button {

    #button
    constructor(childeClass, textContent, callBack = () => {
        console.log(`Я кнопка "${textContent}", дай мне задачу :)`)
    }, parentId = "main_container") {
        this.parentId = parentId
        this.childeClass = childeClass
        this.textContent = textContent
        this.callBack = callBack
        this.#button = document.createElement('button')
        this.#makeButton()
        this.#assignFunctionality()
    }

    #makeButton() {
        this.#button.className = this.childeClass
        this.#button.textContent = this.textContent
        document.getElementById(this.parentId).appendChild(this.#button)
    }

    #assignFunctionality() {
        this.#button.addEventListener('click', () => {
            this.callBack()
        })
    }
}