import { showKeyboard } from "./tools/keyboard/keyboard"
import { showDrums } from "./tools/drums/drums"
import { showStudio } from "./tools/studio";

const location = window.location.pathname;
if (location.length == 0) {
    location = '/'
}

switch (location) {
    case '/studio':
        showStudio()
        break;
    case '/keyboard':
        showKeyboard()
        break;
    case '/drums':
        showDrums()
        break;
    default:
        showStudio()
        break;
}

document.body.appendChild(document.createElement('br'))
