// Form validation
const inputsValidity = {
    user: false,
    email: false,
    password: false,
    confirmedPassword: false
}

const form = document.querySelector("form")
const container = document.querySelector(".container")

form.addEventListener("submit", handleForm)

let isAnimating = false
function handleForm(e) {
    e.preventDefault()

    const keys = Object.keys(inputsValidity)
    const failedInputs = keys.filter(key => !inputsValidity[key])

    if (failedInputs.length && !isAnimating) {
        isAnimating = true
        container.classList.add("shake")
        setTimeout(() => {
            container.classList.remove("shake")
            isAnimating = false
        }, 400)
        failedInputs.forEach(input => {
            const index = keys.indexOf(input)
            showValidation({ index: index, validation: false })
        })
    } else {
        alert("Données envoyées avec succès !")
    }
}


// Verification icons + error messages
const validationIcons = document.querySelectorAll(".icon-verif")
const validationTexts = document.querySelectorAll(".error-msg")

// Username validation
const userInput = document.querySelector(".input-group:nth-child(1) input")

userInput.addEventListener("blur", userValidation) // "blur" = when focus is removed
userInput.addEventListener("input", userValidation)

function userValidation() {
    if (userInput.value.length >= 3) {
        showValidation({ index: 0, validation: true })
        inputsValidity.user = true
    } else {
        showValidation({ index: 0, validation: false })
        inputsValidity.user = false
    }
}

// Show validation icon + text
function showValidation({ index, validation }) {
    if (validation) {
        validationIcons[index].style.display = "inline"
        validationIcons[index].src = "./ressources/check.svg"
        if (validationTexts[index]) validationTexts[index].style.display = "none"
    } else {
        validationIcons[index].style.display = "inline"
        validationIcons[index].src = "./ressources/error.svg"
        if (validationTexts[index]) validationTexts[index].style.display = "block"
    }

}

// Email validation
const mailInput = document.querySelector(".input-group:nth-child(2) input")

mailInput.addEventListener("blur", mailValidation)
mailInput.addEventListener("input", mailValidation)

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function mailValidation() {
    if (regexEmail.test(mailInput.value)) {
        showValidation({ index: 1, validation: true })
        inputsValidity.email = true
    } else {
        showValidation({ index: 1, validation: false })
        inputsValidity.email = false
    }
}

// Password validation
const pswdInput = document.querySelector(".input-group:nth-child(3) input")

pswdInput.addEventListener("blur", pswdValidation)
pswdInput.addEventListener("input", pswdValidation)

const pswdVerification = {
    length: false,
    symbol: false,
    number: false
}

const regexList = {
    symbol: /[^a-zA-Z0-9\s]/,
    number: /[0-9]/
}

let pswdValue

function pswdValidation(e) {
    pswdValue = pswdInput.value
    let validationResult = 0

    for (const prop in pswdVerification) {

        // Check length
        if (prop === "length") {
            if (pswdValue.length < 6) {
                pswdVerification.length = false
            } else {
                pswdVerification.length = true
                validationResult++
            }
            continue;
        }

        // Check number + symbol
        if (regexList[prop].test(pswdValue)) {
            pswdVerification[prop] = true
            validationResult++
        } else {
            pswdVerification[prop] = false
        }
    }

    // console.log(pswdVerification)
    // console.log(validationResult)

    if (validationResult !== 3) {
        showValidation({ index: 2, validation: false })
        inputsValidity.password = false
    } else {
        showValidation({ index: 2, validation: true })
        inputsValidity.password = true
    }

    pswdStrength()
}

// Display password strength
const lines = document.querySelectorAll(".lines div")

function pswdStrength() {
    const pswdLength = pswdInput.value.length

    if (!pswdLength) {
        addLines(0)
    } else if (pswdLength > 9 && pswdVerification.symbol && pswdVerification.number) {
        addLines(3)
    } else if (pswdLength > 6 && pswdVerification.symbol || pswdVerification.number) {
        addLines(2)
    } else {
        addLines(1)
    }

    function addLines(nbrOfLines) {
        lines.forEach((el, index) => {
            if (index < nbrOfLines) {
                el.style.display = "block"
            } else {
                el.style.display = "none"
            }
        })
    }

    if (validationIcons[3].style.display === "inline") {
        confirmPswd()
    }
}

// Password confirmation
const confirmPswdInput = document.querySelector(".input-group:nth-child(4) input")

confirmPswdInput.addEventListener("blur", confirmPswd)
confirmPswdInput.addEventListener("input", confirmPswd)

function confirmPswd() {
    const confirmedValue = confirmPswdInput.value

    if (!confirmedValue && !pswdValue) {
        validationIcons[3].style.display = "none"
    } else if (confirmedValue !== pswdValue) {
        showValidation({ index: 3, validation: false })
        inputsValidity.confirmedPassword = false
    } else {
        showValidation({ index: 3, validation: true })
        inputsValidity.confirmedPassword = true
    }
}