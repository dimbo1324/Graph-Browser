
// const btn = document.createElement('button')
// btn.textContent = 'btn'
// btn.classList = 'btn'
// document.getElementById("manage-container").appendChild(btn)


// // Пример использования метода сброса зума, под нее сделать отдельную кнопку
// btn.addEventListener('click', () => {
//     zoomableChart.reset();
// });

export function createButton(textContent, classList) {
    const button = document.createElement('button')
    button.textContent = textContent
    button.classList = classList
    document.getElementById("manage-container").appendChild(button)
    return button
}