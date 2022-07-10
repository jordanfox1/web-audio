 export function createGainSlider(primaryGainControl) {
    const label = document.createElement('label')
    label.innerText = 'Gain'
    label.setAttribute("for", 'Gain')

    const slider = document.createElement('input')
    slider.setAttribute("type", "range")
    slider.setAttribute("name", 'Gain')

    // console.log(slider.value)
    slider.addEventListener('change', (e) => {
        // console.log(e.target.value)
        const input = e.target.value * 0.0005
        // console.log(input)
        primaryGainControl.gain.setValueAtTime(input, 0)
    })
    document.body.appendChild(label)
    document.body.appendChild(slider)
}