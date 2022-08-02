const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// Select form + bmiValue + result
const form = document.querySelector("form");
const bmiValue = document.querySelector(".bmiValue");
const result = document.querySelector(".result");

// Add event listener to form
form.addEventListener("submit", handleForm);

function handleForm(event) {

  event.preventDefault();

  calculateBMI();

}

// Select the inputs
const inputs = document.querySelectorAll("input");

// Calculate BMI
function calculateBMI() {
  // Recover the value of the inputs
  const height = inputs[0].value;
  const weight = inputs[1].value;

  // Check if the value of the inputs are correct
  if (!height || !weight || height <= 0 || weight <= 0) {
    handleError();
    return;
  }

  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1); // IMC = poids en kg / taille² en m

  console.log(BMI);

  displayResult(BMI);

}

// Handle errors
function handleError() {
  bmiValue.textContent = "Oups...";
  bmiValue.style.color = "inherit";
  result.textContent = "Remplissez correctement tous les champs";
  bmiValue.style.color = "inherit";
}

// Display result
function displayResult(BMI) {

  // Search the result in the object BMIdata
  const rank = BMIData.find(data => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  })
  console.log(rank);

  bmiValue.textContent = BMI;
  bmiValue.style.color = `${rank.color}`;
  result.textContent = `Résultat : ${rank.name}`;
}