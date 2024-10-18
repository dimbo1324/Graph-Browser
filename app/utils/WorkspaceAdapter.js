import Observable from "../notifications/Observable.js";

export default class WorkspaceAdapter {
    #idContainer;
    #classContainer;
    #container;
    #observable;
    #workspaceAdapterButton;
    #callback;
    #operation;
    constructor(idContainer, classContainer, idAdapterButton, callback, operation) {
        this.#idContainer = idContainer;
        this.#classContainer = classContainer;
        this.#container = this.#findContainer();
        this.#observable = new Observable();
        this.#workspaceAdapterButton = document.getElementsByClassName(idAdapterButton)[0];
        this.#callback = callback;
        this.#operation = operation; // Сохраняем функцию в поле 
        this.#observable.addObserver('offsetWidth', (newWidth) => {
            console.log(`Ширина изменена на: ${newWidth}px`);
        });

        this.adaptingWorkspace();
    }

    #findContainer() {
        if (this.#idContainer) {
            const element = document.getElementById(this.#idContainer);
            if (!element) {
                throw new Error(`Элемент с id "${this.#idContainer}" не найден.`);
            }
            return element;
        } else if (this.#classContainer) {
            const element = document.getElementsByClassName(this.#classContainer)[0];
            if (!element) {
                throw new Error(`Элемент с классом "${this.#classContainer}" не найден.`);
            }
            return element;
        } else {
            throw new Error("Не задан ни id, ни класс контейнера.");
        }
    }

    #updateWidth(newWidth) {
        this.#observable.notifyObservers('offsetWidth', newWidth);
        if (this.#callback) {
            this.#callback(newWidth);
        }
    }

    adaptingWorkspace() {
        this.#workspaceAdapterButton.addEventListener('click', () => {
            const newWidth = this.#container.offsetWidth;

            if (this.#operation) {
                this.#operation();
            }

            // Обновляем ширину графика в конфиге
            this.#updateWidth(newWidth);
        });
    }

    getCurrentWidth() {
        return this.#container.offsetWidth;
    }
}
