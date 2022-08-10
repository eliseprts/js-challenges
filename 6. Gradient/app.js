const colorLabels = [...document.querySelectorAll(".inputGroup label")]
const colorPickers = [...document.querySelectorAll("input[type='color']")]
const orientationValue = document.querySelector(".orientationValue")

const gradientData = {
    angle: 90,
    colors: ["#FF5F6D", "#FFC371"]
}

// Set gradient in bg
function populateUI() {

    colorLabels[0].textContent = gradientData.colors[0]
    colorLabels[1].textContent = gradientData.colors[1]

    colorPickers[0].value = gradientData.colors[0]
    colorPickers[1].value = gradientData.colors[1]

    colorLabels[0].style.background = gradientData.colors[0]
    colorLabels[1].style.background = gradientData.colors[1]

    document.body.style.background = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

    orientationValue.textContent = `${gradientData.angle}°`

    // Adapt font color in inputs : ex. if font color black if bg color is light
    adaptInputsColor()
}
populateUI()

function adaptInputsColor() {
    colorLabels.forEach(label => {
        // Retrieve color without #
        const hexColor = label.textContent.replace("#", "")
        // Retrieve only red value of the color
        const red = parseInt(hexColor.slice(0, 2), 16)
        const green = parseInt(hexColor.slice(2, 4), 16)
        const blue = parseInt(hexColor.slice(4, 6), 16)
        // Calculate brightness
        const yiq = (red * 299 + green * 587 + blue * 144) / 1000
        // Change font color depending on brightness
        if (yiq >= 128) {
            label.style.color = "#111"
        }
        else {
            label.style.color = "#f1f1f1"
        }
    })
}

// Change orientationValue in label depending on range input
const rangeInput = document.querySelector(".inpRange")
rangeInput.addEventListener("input", handleOrientation)

function handleOrientation() {
    gradientData.angle = rangeInput.value
    orientationValue.textContent = `${gradientData.angle}°`
    populateUI()
}

// Change colors in gradientData object
colorPickers.forEach(input => input.addEventListener("input", colorInputModification))
function colorInputModification(e) {
    const currentInput = e.target
    const currentIndex = colorPickers.indexOf(e.target)

    gradientData.colors[currentIndex] = currentInput.value.toUpperCase()
    populateUI()
}

// Manage copy button
const copyBtn = document.querySelector(".copyBtn")
copyBtn.addEventListener("click", handleGradientCopy)

let lock = false

function handleGradientCopy() {

    const gradient = `linear-gradient(${gradientData.angle}deg, ${gradientData.colors[0]}, ${gradientData.colors[1]})`

    navigator.clipboard.writeText(gradient)

    if (lock) return

    lock = true
    copyBtn.classList.add("active")

    setTimeout(() => {
        copyBtn.classList.remove("active")
        lock = false
    }, 1000)
}

// Manage random button
const randomBtn = document.querySelector(".randomBtn")
randomBtn.addEventListener("click", createRandomGradient)

function createRandomGradient() {
    for (let i = 0; i < colorLabels.length; i++) {
        randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        gradientData.colors[i] = randomColor.toUpperCase()
    }

    populateUI()
}