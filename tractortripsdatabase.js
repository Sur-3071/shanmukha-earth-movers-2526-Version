import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import DBConstants from "./DatabaseConstants.js";

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
// Get a reference to the database service
const db = getDatabase(app);

document.getElementById('submit').addEventListener('click', function (e) {
    // alert(" hi its coming");
    e.preventDefault();
    showProcessingPopup();
    const d = document.getElementById("tractd1").value;
    const drivername = document.getElementById("dname1").value;

    const customer = document.getElementById("cname").value;
    const day = document.getElementById("time").value;
    const price = document.getElementById("aname").value;
    const trips = document.getElementById("tractortrips").value;
    const wid = document.getElementById("wid10").value;
    const db1 = DBConstants.TractorTrips;
    const db2 = DBConstants.TractorAmount;
    if (d.length > 0 && drivername.length > 0 && customer.length > 0 && price.length > 0 && trips.length > 0) {
        // Set data to Firebase database
        const dataRefget = ref(db, `${db1}/${drivername}/`);
        const dataRefset = ref(db, `${db1}/${wid}`);

        set(dataRefset, {
            Date: d,
            CustomerName: customer,
            Shift: day,
            Driver: drivername,
            Price: price,
            Trips: trips
        })
            .then(() => {
                hideProcessingPopup();

                document.getElementById("form").reset();
                document.getElementById("paymentSuccessPopup5").style.display = "flex";
                // document.getElementById("done").style.display = "block";
                setTimeout(() => {
                    document.getElementById("paymentSuccessPopup5").style.display = "none";
                }, 3000);
                GetSystemId("wid10");
            })
            .catch((error) => {
                hideProcessingPopup();
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        hideProcessingPopup();
        alert("Please Enter All The Fields Properly");
    }
});

export function editDriverData(e) {
    // alert("Editing data...");
    e.preventDefault();
    showProcessingPopup();
    const d = document.getElementById("editdate").value;
    // alert(d);
    const sytemid = document.getElementById("sno").value;
    const drivername = document.getElementById("drivername").value;
    const customer = document.getElementById("ecname").value;
    const day = document.getElementById("daytype").value;
    const price = document.getElementById("eprice").value;
    const trips = document.getElementById("etrips").value;
    // const wid = document.getElementById("wid1").value;


    // alert(price+" "+trips);
    // alert(drivername);
    const db1 = DBConstants.TractorTrips;
    const db2 = DBConstants.TractorAmount;
    // alert(d.length+" "+drivername.length+" "+customer.length+" "+price.length+" "+trips.length);
    if (d.length > 0 && drivername.length > 0 && customer.length > 0 && price.length > 0 && trips.length > 0) {
        // Set data to Firebase database
        const dataRefget = ref(db, `${db1}/${drivername}/`);
        const dataRefset = ref(db, `${db1}/${sytemid}`);

        set(dataRefset, {
            Date: d,
            CustomerName: customer,
            Shift: day,
            Driver: drivername,
            Price: price,
            Trips: trips
        })
            .then(() => {
                hideProcessingPopup();

                document.getElementById("form").reset();
                document.getElementById("paymentSuccessPopup5").style.display = "flex";
                // document.getElementById("done").style.display = "block";
                setTimeout(() => {
                    document.getElementById("paymentSuccessPopup5").style.display = "none";
                }, 3000);
                getDataBtn.click();
            })
            .catch((error) => {
                hideProcessingPopup();
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        hideProcessingPopup();
        alert("Please Enter All The Fields Properly for editing");
    }
}
window.editDriverData = editDriverData;
amountdataentry.addEventListener('click', function (e) {
    e.preventDefault();
    showProcessingPopup();
    const d = document.getElementById("tractd2").value;
    const drivername = document.getElementById("dname3").value;
    const pur = document.getElementById("pur").value;
    const amount = document.getElementById("amount").value;
    const wid = document.getElementById("wid30").value;
    const db2 = DBConstants.TractorAmount;

    // Set data to Firebase database
    if (d.length > 0 && drivername.length > 0 && amount.length > 0) {
        const dataRefget = ref(db, `${db2}/${drivername}/`);
        const dataRefset = ref(db, `${db2}/${wid}/`);

        set(dataRefset, {
            Date: d,
            Driver: drivername,
            Amount: amount,
            Purpose: pur
        })
            .then(() => {
                hideProcessingPopup();

                document.getElementById("form1").reset();
                document.getElementById("paymentSuccessPopup5").style.display = "flex";
                // document.getElementById("done").style.display = "block";
                setTimeout(() => {
                    document.getElementById("paymentSuccessPopup5").style.display = "none";
                }, 3000);
                GetSystemId("wid30");
            })
            .catch((error) => {
                hideProcessingPopup();
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        hideProcessingPopup();
        alert("Please Fill All The Fields");
    }
});

getDataBtn.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();
    document.querySelector(".customer-title").textContent = drivername;
    const db1 = DBConstants.TractorTrips;
    showProcessingPopup();
    if (!drivername || drivername === "select Driver Name") {
        hideProcessingPopup();
        alert("Please Select Driver Name");
        return;
    }

    try {
        const dataRefget = ref(db, db1);
        const snapshot = await get(dataRefget);

        if (!snapshot.exists()) {
            hideProcessingPopup();
            alert("No trips data available");
            return;
        }

        const allData = snapshot.val();
        const filteredData = {};

        // 🔍 SEARCH EACH ENTRY
        for (const uid in allData) {
            if (allData.hasOwnProperty(uid)) {
                const record = allData[uid];

                if (record.Driver === drivername) {
                    filteredData[uid] = record;
                }
            }
        }

        if (Object.keys(filteredData).length === 0) {
            hideProcessingPopup();
            alert(`No trips found for ${drivername}`);
            return;
        }
        hideProcessingPopup();
        // Send only matching records
        displaytripsdata(filteredData, drivername);

    } catch (error) {
        hideProcessingPopup();
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load data");
    }
});


updatebtn.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();
    const db1 = DBConstants.TractorTrips;
    showProcessingPopup();
    if (!drivername || drivername === "select Driver Name") {
        alert("Please Select Driver Name");
        return;
    }

    try {
        const dataRefget = ref(db, db1);
        const snapshot = await get(dataRefget);

        if (!snapshot.exists()) {
            hideProcessingPopup();
            alert("No trips data available");
            return;
        }

        const allData = snapshot.val();
        const filteredData = {};

        // 🔍 SEARCH EACH ENTRY
        for (const uid in allData) {
            if (allData.hasOwnProperty(uid)) {
                const record = allData[uid];

                if (record.Driver === drivername) {
                    filteredData[uid] = record;
                }
            }
        }

        if (Object.keys(filteredData).length === 0) {
            hideProcessingPopup();
            alert(`No trips found for ${drivername}`);
            return;
        }
        hideProcessingPopup();
        displayUpdatedtripsdata(filteredData)

    } catch (error) {
        hideProcessingPopup();
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load data");
    }
});


getamount.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();
    const db1 = DBConstants.TractorAmount;
    showProcessingPopup();
    if (!drivername || drivername === "select Driver Name") {
        hideProcessingPopup();
        alert("Please Select Driver Name");
        return;
    }

    try {
        const dataRefget = ref(db, db1);
        const snapshot = await get(dataRefget);

        if (!snapshot.exists()) {
            hideProcessingPopup();
            alert("No amount data available");
            return;
        }

        const allData = snapshot.val();
        const filteredData = {};

        // 🔍 SEARCH EACH UNIQUE ID ENTRY
        for (const uid in allData) {
            if (allData.hasOwnProperty(uid)) {
                const record = allData[uid];

                // match by driver
                if (record.Driver === drivername) {
                    filteredData[uid] = record;
                }
            }
        }

        if (Object.keys(filteredData).length === 0) {
            hideProcessingPopup();
            alert(`No amount records found for ${drivername}`);
            return;
        }

        // Send only matched data
        hideProcessingPopup();
        displayamountdata(filteredData);

    } catch (error) {
        hideProcessingPopup();
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load amount data");
    }
});

getbal.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();
    showProcessingPopup();

    if (!drivername || drivername === "select Driver Name") {
        hideProcessingPopup();
        alert("Please Select Driver Name");
        return;
    }

    try {
        const tripsRef = ref(db, DBConstants.TractorTrips);
        const amountRef = ref(db, DBConstants.TractorAmount);

        // Fetch BOTH at once
        const [tripsSnap, amountSnap] = await Promise.all([
            get(tripsRef),
            get(amountRef)
        ]);

        // -------- FILTER TRIPS --------
        let filteredTrips = {};
        if (tripsSnap.exists()) {
            const tripsData = tripsSnap.val();

            for (const uid in tripsData) {
                if (tripsData[uid].Driver === drivername) {
                    filteredTrips[uid] = tripsData[uid];
                }
            }
        }

        // -------- FILTER AMOUNTS --------
        let filteredAmounts = {};
        if (amountSnap.exists()) {
            const amountData = amountSnap.val();

            for (const uid in amountData) {
                if (amountData[uid].Driver === drivername) {
                    filteredAmounts[uid] = amountData[uid];
                }
            }
        }

        if (
            Object.keys(filteredTrips).length === 0 &&
            Object.keys(filteredAmounts).length === 0
        ) {
            hideProcessingPopup();
            alert("No data found for this driver");
            return;
        }

        // Send to UI functions
        hideProcessingPopup();
        displaybal1(filteredTrips, drivername);
        displaybal2(filteredAmounts);

    } catch (error) {
        hideProcessingPopup();
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load balance data");
    }
});




