import { showDrums } from "./drums/drums"
import { showKeyboard } from "./keyboard/keyboard"

export const showStudio = () => {
    const header = document.createElement('h1')
    header.innerHTML = "HELLO STUDIO"
    document.body.appendChild(header)
    showDrums()
    showKeyboard()
}