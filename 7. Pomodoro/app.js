let initialTime = 5;
let restTime = 5;

// Display formatted time
function returnFormattedTime(time) {
    return `${Math.trunc(time / 60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

const displayWorkTime = document.querySelector(".work-display-time")
const displayRestTime = document.querySelector(".rest-display-time")

displayWorkTime.textContent = returnFormattedTime(initialTime)
displayRestTime.textContent = returnFormattedTime(restTime)

// Play
const startPauseBtn = document.querySelector(".start-btn")
startPauseBtn.addEventListener("click", togglePomodoro)

let currentInterval = false
let timerID
function togglePomodoro() {
    // Change btn image
    handlePlayPause()

    // Check if there is already an interval in progress (currentInterval = true). If yes, stop the function. If no, pass currentInterval to true and continue the function
    if (currentInterval) return
    currentInterval = true

    // Change time
    initialTime--
    displayWorkTime.textContent = returnFormattedTime(initialTime)
    handleAnimation({ work: true, rest: false })

    timerID = setInterval(handleTicks, 1000)
}

let pause = true;
function handlePlayPause() {
    if (startPauseBtn.firstElementChild.src.includes("play")) {
        startPauseBtn.firstElementChild.src = "ressources/pause.svg"
        pause = false;
    }
    else {
        startPauseBtn.firstElementChild.src = "ressources/play.svg"
        pause = true;
    }
}

// Animation
function handleAnimation(itemState) {
    for (const item in itemState) {
        if (itemState[item]) {
            document.querySelector(`.${item}`).classList.add("active")
        } else {
            document.querySelector(`.${item}`).classList.remove("active")
        }
    }
}

const cycles = document.querySelector(".cycles")
let cyclesNbr = 0

function handleTicks() {

    if (!pause && initialTime > 0) {
        initialTime--
        displayWorkTime.textContent = returnFormattedTime(initialTime)
        handleAnimation({ work: true, rest: false })
    }
    else if (!pause && initialTime === 0 && restTime > 0) {
        restTime--
        displayRestTime.textContent = returnFormattedTime(restTime)
        handleAnimation({ work: false, rest: true })
    }
    else if (!pause && initialTime === 0 && restTime === 0) {
        handleAnimation({ work: true, rest: false })
        initialTime = 1799
        restTime = 300
        displayWorkTime.textContent = returnFormattedTime(initialTime)
        displayRestTime.textContent = returnFormattedTime(restTime)
        cyclesNbr++
        cycles.textContent = `Cycle(s) : ${cyclesNbr}`
    }
}

// Reset
const resetBtn = document.querySelector(".reset-btn")
resetBtn.addEventListener("click", handleReset)

function handleReset() {

    // Reset time
    initialTime = 1800
    restTime = 300
    displayWorkTime.textContent = returnFormattedTime(initialTime)
    displayRestTime.textContent = returnFormattedTime(restTime)

    // Reset animation
    handleAnimation({ work: true, rest: false })

    // Reset play/pause btn
    startPauseBtn.firstElementChild.src = "./ressources/play.svg"

    // Reset cycles
    cycles.textContent = "Cycle(s) : 0"

    clearInterval(timerID)
    currentInterval = false
}