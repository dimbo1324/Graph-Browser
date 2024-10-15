
export function createButton(textContent, classList) {
    const button = document.createElement('button')
    button.textContent = textContent
    button.classList = classList
    document.getElementById("manage-container").appendChild(button)
    return button
}