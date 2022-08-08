const loader = document.querySelector(".loader")

if (navigator.geolocation) {
    // Function with two arguments : first if location is allowed, second if not allowed
    navigator.geolocation.getCurrentPosition(location => {
        const long = location.coords.longitude
        const lat = location.coords.latitude
        // console.log(location, long, lat)
        getWeatherData(long, lat)
    }, () => {
        loader.textContent = "Vous avez refusé la géolocalisation. L'application ne peut pas fonctionner. Veuillez l'activer."
    })
}

// Fetch data
async function getWeatherData(long, lat) {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=1ddc50603fb983232af214e4126dfb1c`)

        if (!res.ok) {
            throw new Error(`Erreur: ${res.status}`)
        }

        const weatherData = await res.json()
        console.log(weatherData)
        // Display data in top content
        populateMainInfo(weatherData)
        // Displai data in bottom content
        handleHours(weatherData.hourly)
        handleDays(weatherData.daily)
        // Display loader
        loader.classList.add("fadeOut")
    }
    catch (e) {
        loader.textContent = e
    }
}

// Display data in top content
const position = document.querySelector(".position")
const temperature = document.querySelector(".temperature")
const weatherImg = document.querySelector(".weatherImg")

const currentHour = new Date().getHours()

function populateMainInfo(weatherData) {
    // Temperature + position
    temperature.textContent = `${Math.trunc(weatherData.current.temp)}°`
    position.textContent = weatherData.timezone
    // Image
    if (currentHour >= 6 && currentHour < 21) {
        weatherImg.src = `./ressources/jour/${weatherData.current.weather[0].icon}.svg`
    } else {
        weatherImg.src = `./ressources/nuit/${weatherData.current.weather[0].icon}.svg`
    }
}

// Display forecasts per hour
const hourNames = document.querySelectorAll(".hourName")
const hourTemperatures = document.querySelectorAll(".hourTemp")

function handleHours(data) {

    hourNames.forEach((block, index) => {
        // Hours
        const incrementedHour = currentHour + index * 2
        if (incrementedHour > 24) {
            const calcul = incrementedHour - 24
            hourNames[index].textContent = `${calcul === 24 ? "OO" : calcul}h`
        }
        else if (incrementedHour === 24) {
            hourNames[index].textContent = "00h"
        }
        else {
            hourNames[index].textContent = `${incrementedHour}h`
        }
        // Temperatures
        hourTemperatures[index].textContent = `${Math.trunc(data[index * 2].temp)}°`
    })

}

// Display forecasts by day
const weekDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

const currentDay = new Date().toLocaleDateString("fr-FR", { weekday: "long" })
// console.log(currentDay)

// Reorder days starting from day after current day
const forecastDays = weekDays.slice(weekDays.indexOf(currentDay) + 1).concat(weekDays.slice(0, weekDays.indexOf(currentDay) + 1))
// console.log(forecastDays)

const dayNames = document.querySelectorAll(".dayName")
const dayTemperatures = document.querySelectorAll(".dayTemp")

function handleDays(data) {

    forecastDays.forEach((day, index) => {
        // Days
        dayNames[index].textContent = forecastDays[index].charAt(0).toUpperCase() + forecastDays[index].slice(1, 3)
        // Temperatures
        dayTemperatures[index].textContent = `${Math.trunc(data[index + 1].temp.day)}°`
    })
}

// Tabs
const tabsBtns = [...document.querySelectorAll(".tabs button")]
const tabsContent = [...document.querySelectorAll(".forecast")]

tabsBtns.forEach(btn => btn.addEventListener("click", handleTabs))

function handleTabs(e) {
    // Remove active in classList
    const indexToRemove = tabsBtns.findIndex(tab => tab.classList.contains("active"))
    tabsBtns[indexToRemove].classList.remove("active")
    tabsContent[indexToRemove].classList.remove("active")

    // Add active in classList to show forecasts corresponding to the clicked btn
    const indexToShow = tabsBtns.indexOf(e.target)
    tabsBtns[indexToShow].classList.add("active")
    tabsContent[indexToShow].classList.add("active")
}