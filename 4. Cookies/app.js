const inputs = document.querySelectorAll("input");

// Form validation
inputs.forEach(input => {
    input.addEventListener("invalid", handleValidation);
    input.addEventListener("input", handleValidation);
})

function handleValidation(e) {
    if (e.type === "invalid") {
        e.target.setCustomValidity("Ce champ ne peut être vide")
    } else if (e.type === "input") {
        e.target.setCustomValidity("")
    }
}

// CREATE COOKIES

const cookieForm = document.querySelector("form");
cookieForm.addEventListener("submit", handleForm);

function handleForm(e) {

    e.preventDefault()

    const newCookie = {}

    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name")
        newCookie[nameAttribute] = input.value
    })
    // Set expiration date (1 week before creation)
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    // console.log(newCookie)

    createCookie(newCookie);
    // Remove value of input
    cookieForm.reset();
}

function createCookie(newCookie) {

    if (doesCookieExists(newCookie.name)) {
        createToast({ name: newCookie.name, state: "modifié", color: "orangered" })
    } else {
        createToast({ name: newCookie.name, state: "créé", color: "green" })
    }

    // Create cookie
    document.cookie = `${encodeURIComponent(newCookie.name)} = ${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.toUTCString()}`;

    // Display automatically new created cookie when cookies list is displayed
    if (cookiesList.children.length) {
        displayCookies()
    }

}

// Check if cookie already exist
function doesCookieExists(name) {

    // Collect existing cookies, delete space and split where there is ;
    const cookies = document.cookie.replace(/\s/g, "").split(";");

    // Collect only the name by browsing existing cookies, spliting them into array where there is = and just keeping first part
    const cookiesName = cookies.map(cookie => cookie.split("=")[0]);
    // console.log(cookies, cookiesName);

    // Based on collected cookies names, check if the new created cookies already exist
    const cookiePresence = cookiesName.find(cookie => cookie === encodeURIComponent(name));

    // Return true or false depending on previous action
    return cookiePresence;
}

// Toasts
const toastContainer = document.querySelector(".toastContainer");

function createToast({ name, state, color }) {
    const toastInfo = document.createElement("p");
    toastInfo.className = "toast";
    toastInfo.textContent = `Cookie ${name} ${state}.`
    toastInfo.style.backgroundColor = color;
    toastContainer.appendChild(toastInfo)

    setTimeout(() => {
        toastInfo.remove()
    }, 2500)
}

// DISPLAY COOKIES LIST

const cookiesList = document.querySelector(".cookiesList");
const displayCookiesBtn = document.querySelector(".displayCookiesBtn");
const infoTxt = document.querySelector(".infoTxt");

displayCookiesBtn.addEventListener("click", displayCookies);

let lock = false;
function displayCookies() {

    // Remove cookies list if already displayed
    if (cookiesList.children.length) cookiesList.textContent = "";

    const cookies = document.cookie.replace(/\s/g, "").split(";").reverse();

    // Display message if no cookie
    if (!cookies[0]) {
        if (lock) return;
        lock = true;
        infoTxt.textContent = "Pas de cookie à afficher, créez-en un !";
        setTimeout(() => {
            infoTxt.textContent = "";
            lock = false;
        }, 1500);
        return;
    }

    // Create cookies cards
    createElements(cookies)
}

function createElements(cookies) {

    cookies.forEach(cookie => {
        // Create cookie card
        const formatCookie = cookie.split("=");
        const listItem = document.createElement("li");
        const name = decodeURIComponent(formatCookie[0])
        listItem.innerHTML = `
            <p>
                <span>Nom :</span> ${name}
            </p>
            <p>
                <span>Valeur :</span> ${decodeURIComponent(formatCookie[1])}
            </p>
            <button>X</button>
        `;
        // Delete cookie
        listItem.querySelector("button").addEventListener("click", e => {
            createToast({ name: name, state: "supprimé", color: "crimson" });
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
            e.target.parentElement.remove();
        })
        // Add cookie card to the list
        cookiesList.appendChild(listItem);
    })

}