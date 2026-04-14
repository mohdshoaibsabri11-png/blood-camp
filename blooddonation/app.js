// Blood Data (Dynamic)
const bloodGroups = [
    { type: "A+", units: 10 },
    { type: "O-", units: 2 },
    { type: "B+", units: 5 },
    { type: "AB-", units: 1 }
];

// Function to get status based on units
function getStatus(units) {
    if (units > 6) return { text: "Available", class: "available" };
    if (units > 3) return { text: "Low", class: "low" };
    return { text: "Critical", class: "critical" };
}

// Load Blood Data into UI
function loadBloodData() {
    const container = document.getElementById("bloodData");
    container.innerHTML = "";

    bloodGroups.forEach((blood, index) => {
        const status = getStatus(blood.units);

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${blood.type}</h3>
            <p>Units: ${blood.units}</p>
            <p class="${status.class}">${status.text}</p>
            <button onclick="donate('${blood.type}', ${index})">Donate</button>
        `;

        container.appendChild(card);
    });
}

// Donate Function (updates stock)
function donate(type, index) {
    bloodGroups[index].units += 1;
    alert(`Thank you for donating to ${type}!`);
    loadBloodData();
}

// Register Donor
function registerDonor(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const group = document.getElementById("group").value;

    if (name === "" || group === "") {
        alert("Please fill all details!");
        return;
    }

    alert(`Donor Registered: ${name} (${group})`);

    document.getElementById("donorForm").reset();
}

// Request Blood (reduces stock)
function requestBlood() {
    const group = document.getElementById("requestGroup").value;

    const blood = bloodGroups.find(b => b.type === group);

    if (!blood) {
        alert("Invalid blood group!");
        return;
    }

    if (blood.units > 0) {
        blood.units -= 1;
        alert(`Blood issued for ${group}`);
    } else {
        showEmergencyAlert();
    }

    loadBloodData();
}

// Emergency Alert
function showEmergencyAlert() {
    const alertBox = document.getElementById("alertBox");
    alertBox.style.display = "block";
    alertBox.innerText = "⚠ Critical Blood Shortage! Immediate Donation Needed!";

    setTimeout(() => {
        alertBox.style.display = "none";
    }, 4000);
}

// Search Blood Group
function searchBlood() {
    const search = document.getElementById("search").value.toUpperCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const type = card.querySelector("h3").innerText;
        card.style.display = type.includes(search) ? "block" : "none";
    });
}

// Page Load Initialization
window.onload = function () {
    loadBloodData();
};