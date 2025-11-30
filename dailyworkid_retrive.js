import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
const db2 = getDatabase(app);
// Get a reference to the database service

async function selectVillage() {
    try {
        const dataRefget = ref(db2, `Customers`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            getvillage(data);
        } else {

            alert("No data available for the selected date.");
        }
    } catch (error) {
        console.error("Detailed error: ", error);
        alert("Error occurred while fetching data 1234");
    }
}

function getvillage(data) {
    var cusname=document.getElementById("name").value;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            // console.log(activity,customerPhone)
            if (customerPhone !== "Customers_Id" && cusname===activity.Name) {
               document.getElementById("vill").value=activity. Villagename;
               break;
            }
        }
    }
}
async function selectVillage1() {
    try {
        const dataRefget = ref(db2, `Customers`);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            getvillage1(data);
        } else {

            alert("No data available for the selected date.");
        }
    } catch (error) {
        console.error("Detailed error: ", error);
        alert("Error occurred while fetching data 1234");
    }
}

function getvillage1(data) {
    var cusname=document.getElementById("name2").value;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            // console.log(activity,customerPhone)
            if (customerPhone !== "Customers_Id" && cusname===activity.Name) {
               document.getElementById("vil2").value=activity. Villagename;
               break;
            }
        }
    }
}
document.getElementById("name").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    try {
        // Access the database and retrieve data
        const db1 = "Work_Count";
        const dataRefget = ref(db2, `${db1}`);
        const snapshot = await get(dataRefget);
        selectVillage();
        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById("wid").value = data["Work_Id"];
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);
    }
});

document.getElementById("name1").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    try {
        // Access the database and retrieve data
        const db1 = "Customers_Id";
        const db3 = "Customers";
        const dataRefget = ref(db2, `${db3}/${db1}`);
        const snapshot = await get(dataRefget);
        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log(data);
            document.getElementById("cid").value = data;
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);
    }
});

document.getElementById("name2").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    try {
        // Access the database and retrieve data
        const db1 = "CustomersAmount_Id";
        const db3 = "CustomersAmount";
        const dataRefget = ref(db2, `${db3}/${db1}`);
        const snapshot = await get(dataRefget);
        selectVillage1();
        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            // console.log(data);
            document.getElementById("cid1").value = data;
        } else {
            alert("No data available");
        }
    } catch (error) {
        console.error("Error occurred while fetching data: ", error);
    }
});
