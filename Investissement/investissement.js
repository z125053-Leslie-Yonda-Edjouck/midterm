"use strict";

// Get the results container
const resultsDiv = document.getElementById("results");

// Boucle principale pour répéter les calculs
let continuer = true;
do {
    // Get investment amount - loop until user enters a positive number
    let investment = 0;
    do {
        investment = parseFloat(prompt("Enter investment amount as xxxxx.xx", 10000));
    } while (isNaN(investment) || investment <= 0);

    // Get interest rate - loop until user enters a number between 0 and 15
    let rate = 0;
    do {
        rate = parseFloat(prompt("Enter interest rate as xx.x", 7.5));
    } while (isNaN(rate) || rate <= 0 || rate >= 15);

    // Get number of years - loop until user enters a positive number
    let years = 0;
    do {
        years = parseInt(prompt("Enter number of years", 10));
    } while (isNaN(years) || years <= 0);

    // Calculate future value and display yearly results
    let futureValue = investment;

    // Create a container for this calculation
    const calculationDiv = document.createElement("div");
    calculationDiv.classList.add("calculation");

    // Display user inputs in <h4>
    const inputHeader = document.createElement("h4");
    inputHeader.textContent = `Investment amount = $${investment.toFixed(2)} | Interest rate = ${rate}% | Years = ${years}`;
    calculationDiv.appendChild(inputHeader);

    // Loop to calculate and display interest and value for each year
    for (let i = 1; i <= years; i++) {
        let interest = futureValue * (rate / 100); // Calculate interest for the year
        futureValue += interest; // Update future value
        // Display yearly result in <p>
        const yearlyResult = document.createElement("p");
        yearlyResult.textContent = `Year ${i}: Interest = $${interest.toFixed(2)} | Value = $${futureValue.toFixed(2)}`;
        calculationDiv.appendChild(yearlyResult);
    }

    // Add a separator if there are previous calculations
    if (resultsDiv.children.length > 0) {
        const separator = document.createElement("hr");
        resultsDiv.appendChild(separator);
    }

    // Append the calculation to the results div
    resultsDiv.appendChild(calculationDiv);

    // Trigger animations for the new elements
    setTimeout(() => {
        calculationDiv.querySelectorAll("h4, p").forEach(element => {
            element.classList.add("visible");
        });
    }, 100);

    // Ask if the user wants to continue
    let response = prompt("Do you want to add another calculation? (y/n)", "n");
    continuer = (response && response.toLowerCase() === "y");
} while (continuer);
