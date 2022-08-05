const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector(".quizForm");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();

    const results = [];

    const radioButtons = document.querySelectorAll("input[type='radio']:checked");

    radioButtons.forEach((radioButton, index) => {
        if (radioButton.value === responses[index]) {
            results.push(true);
        } else {
            results.push(false);
        }
    })

    // console.log(radioButtons);
    // console.log(results);

    showResults(results);
    addColors(results);
}

// Show the result in the result block

const titleResult = document.querySelector(".results h2");
const markResult = document.querySelector(".mark")
const helpResult = document.querySelector(".help");

function showResults(results) {

    const errorsNumber = results.filter(el => el === false).length;
    // console.log(errorsNumber);

    switch (errorsNumber) {
        case 0:
            titleResult.textContent = "✔️ Bravo, c'est un sans faute ! ✔️";
            helpResult.style.display = "block";
            helpResult.textContent = "Quelle culture...";
            markResult.style.display = "block";
            markResult.innerHTML = "Score : <span>5 / 5</span>";
            break;
        case 1:
            titleResult.textContent = "✨ Vous y êtes presque ! ✨";
            helpResult.style.display = "block";
            helpResult.textContent = "Retentez une autre réponse dans la case rouge, puis revalidez.";
            markResult.style.display = "block";
            markResult.innerHTML = "Score : <span>4 / 5</span>";
            break;
        case 2:
            titleResult.textContent = "✨ Encore un effort ... 👀";
            helpResult.style.display = "block";
            helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis revalidez.";
            markResult.style.display = "block";
            markResult.innerHTML = "Score : <span>3 / 5</span>";
            break;
        case 3:
            titleResult.textContent = "👀 Il reste quelques erreurs. 😭";
            helpResult.style.display = "block";
            helpResult.textContent = "Retentez une autre réponse dans les cases rouges, puis revalidez.";
            markResult.style.display = "block";
            markResult.innerHTML = "Score : <span>2 / 5</span>";
            break;
        case 4:
            titleResult.textContent = `😭 Peut mieux faire ! 😭`;
            helpResult.textContent =
                "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            helpResult.style.display = "block";
            markResult.innerHTML = "Score : <span>1 / 5</span>";
            markResult.style.display = "block";
            break;
        case 5:
            titleResult.textContent = `👎 Peut mieux faire ! 👎`;
            helpResult.style.display = "block";
            helpResult.textContent =
                "Retentez une autre réponse dans les cases rouges, puis re-validez !";
            markResult.style.display = "block";
            markResult.innerHTML = "Score : <span>0 / 5</span>";
            break;
        default:
            titleResult.textContent = "Wops, cas innatendu.";
    }
}

// Add bg color to question block according to whether the answer is true (green) or false (red)

const questions = document.querySelectorAll(".questionBlock");

function addColors(results) {
    results.forEach((response, index) => {
        if (results[index]) {
            questions[index].style.backgroundImage = "linear-gradient(to right, #a8ff78, #78ffd6)";
        } else {
            questions[index].style.backgroundImage = "linear-gradient(to right, #f5567b, #fd674c)";
        }
    })
}

// Reset color of question block after submitting and when user change his answer

const radioInputs = document.querySelectorAll("input[type='radio']");

radioInputs.forEach(radioInput => radioInput.addEventListener("input", resetColor));

function resetColor(e) {

    const index = e.target.getAttribute("name").slice(1) - 1;
    // console.log(index);
    const parentQuestionBlock = questions[index];
    // Remove gradient (bg image) et set bg color to #fafafa
    parentQuestionBlock.style.backgroundColor = "#fafafa";
    parentQuestionBlock.style.backgroundImage = "none";
}