import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "tractor-driver-data.firebaseapp.com",
    projectId: "tractor-driver-data",
    storageBucket: "tractor-driver-data.appspot.com",
    messagingSenderId: "688935767962",
    appId: "1:688935767962:web:d3d8d7569fd2470dfef423"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
// Get a reference to the database service
document.getElementById("submit3").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    RePrintHome();
    // Get the value from the input field

});

async function RePrintHome() {
    // alert("hi");
    // var dat = document.getElementById("dat1").value.trim();
    // Validate the input (optional)

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `Homeexp`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data);
            generateHomeTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}

function generateHomeTable(data) {
    let out = `<table border="1px">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Amount</th>
        </tr>`;
    var amt = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (customerPhone !== "Home") {
                amt += parseInt(activity.Price);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
            }
        }
    }
    out += `<tr>
    <td colspan="3" id="col">Total Expenses</td>
    <td id="am">${amt}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("homeexp").innerHTML = out;
}

