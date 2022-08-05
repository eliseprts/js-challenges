// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".errorMsg");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {

    e.preventDefault()

    if (input.value === "") {
        errorMsg.textContent = "Oops... Veuillez remplir le champ.";
        return;
    } else {
        errorMsg.textContent = "";
        // Display loader
        loader.style.display = "flex";
        // Remove previous results when user search for another term
        results.textContent = "";
        wikiApiCall(input.value);
    }

}

// Fetch results

async function wikiApiCall(searchInput) {

    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        createCards(data.query.search)
    }
    catch (error) {
        errorMsg.textContent = `${error}`;
        loader.style.display = "none";
    }


}

// Display results

function createCards(data) {

    if (!data.length) {
        errorMsg.textContent = "Il n'y a aucun résultat pour votre recherche";
        loader.style.display = "none";
        return;
    }

    data.forEach(el => {
        const url = `https://en.wikipedia.org/?curid=${el.pageid}`
        const card = document.createElement("div");
        card.className = "resultItem";
        card.innerHTML = `
            <h3 class="resultTitle">
                <a href=${url} target="_blank">${el.title}</a>
            </h3>
            <a class="resultLink" href=${url} target="_blank">${url}</a>
            <span class="resultSnippet"> ${el.snippet} </span>
        `

        results.appendChild(card);
    });
    loader.style.display = "none";

}

