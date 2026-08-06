// Water Tracker
let waterCount = 5;

function addWater() {
    waterCount++;

    document.getElementById("water").innerHTML =
        waterCount + " Glasses";

    if (waterCount >= 8) {
        alert("🎉 Great! Daily water intake completed.");
    }
}

// BMI Calculator
function calculateBMI() {

    let weight = parseFloat(document.getElementById("weight").value);

    let height = parseFloat(document.getElementById("height").value);

    if (isNaN(weight) || isNaN(height)) {

        document.getElementById("bmiResult").innerHTML =
            "Please enter valid values.";

        return;
    }

    height = height / 100;

    let bmi = weight / (height * height);

    let status = "";

    if (bmi < 18.5) {

        status = "Underweight";

    } else if (bmi < 25) {

        status = "Healthy";

    } else if (bmi < 30) {

        status = "Overweight";

    } else {

        status = "Obese";
    }

    document.getElementById("bmiResult").innerHTML =
        "BMI : " + bmi.toFixed(1) + " (" + status + ")";
}

// Emergency Button
const emergencyBtn = document.querySelector(".emergency button");

if (emergencyBtn) {
    emergencyBtn.addEventListener("click", function () {

        alert("🚨 Emergency SOS Activated!\nCalling emergency contact...");

    });
}

// Medicine Reminder Button
const medicineBtn = document.querySelectorAll("button")[2];

if (medicineBtn) {

    medicineBtn.addEventListener("click",function(){
        alert("medicine marked as taken");

    });
}
//welcome animation
window.onload=function(){
    const cards=
document.querySelectorAll(".card");  

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform =
"translateY(30px)";
        setTimeout(() => {
        card.style.transition =
"0.6s ease";
        card.style.opacity = "1";

        card.style.transform =
"translateY(0)";
        }, index * 120);
        });
         
    };