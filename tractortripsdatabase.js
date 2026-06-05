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
            Date:d,
            CustomerName:customer,
            Shift:day,
            Driver:drivername,
            Price: price,
            Trips: trips
        })
            .then(() => {
                document.getElementById("form").reset();
                var d = document.getElementById("done10");
                d.style.display = "block";
                removedone()
                GetSystemId("wid10");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        alert("Please Enter All The Fields Properly");
    }
});
//  function GetSystemId(outputId) {
//         // alert("yes " + outputId);

//         const id = Date.now();

//         if (outputId === "1") {
//             document.getElementById("wid1").value = id;
//         }
//         else if (outputId === "3") {
//             document.getElementById("wid2").value = id;
//         }
//     }

export function editDriverData(e){
    alert("Editing data...");
    e.preventDefault();
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
            Date:d,
            CustomerName:customer,
            Shift:day,
            Driver:drivername,
            Price: price,
            Trips: trips
        })
            .then(() => {
                document.getElementById("form").reset();
                var d = document.getElementById("done5");
                d.style.display = "block";
                removedone1()
                getDataBtn.click();
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        alert("Please Enter All The Fields Properly for editing");
    }
}
window.editDriverData = editDriverData;
amountdataentry.addEventListener('click', function (e) {
    e.preventDefault();
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
            Date:d,
            Driver:drivername,
            Amount: amount,
            Purpose: pur
        })
            .then(() => {
                document.getElementById("form1").reset();
                var d = document.getElementById("done10");
                d.style.display = "block";
                removedone();
                GetSystemId("wid30");
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                alert("An error occurred. Please try again.");
            });
    }
    else {
        alert("Please Fill All The Fields");
    }
});
// getDataBtn.addEventListener('click', function () {
//     const drivername = document.getElementById("dname2").value;
//     const db1 = "Trips";
//     if (drivername != "select Driver Name") {
//         const dataRefget = ref(db, `${db1}/${drivername}/`);

//         get(dataRefget)
//             .then((snapshot) => {
//                 if (snapshot.exists()) {
//                     const data = snapshot.val();
//                     // console.log(data);
//                     displaytripsdata(data,drivername)

//                 } else {
//                     alert("No data available");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error occurred while fetching data: ", error);
//             });
//     }
//     else {
//         alert("Please Select Driver Name");
//     }
// });

getDataBtn.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();
    const db1 = DBConstants.TractorTrips;

    if (!drivername || drivername === "select Driver Name") {
        alert("Please Select Driver Name");
        return;
    }

    try {
        const dataRefget = ref(db, db1);
        const snapshot = await get(dataRefget);

        if (!snapshot.exists()) {
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
            alert(`No trips found for ${drivername}`);
            return;
        }

        // Send only matching records
        displaytripsdata(filteredData, drivername);

    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load data");
    }
});


updatebtn.addEventListener('click', async function () {
    // const drivername = document.getElementById("dname2").value;
    // const db1 = "Trips";
    // if (drivername != "select Driver Name") {
    //     const dataRefget = ref(db, `${db1}/${drivername}/`);

    //     get(dataRefget)
    //         .then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 const data = snapshot.val();
    //                 // console.log(data);
    //                 displayUpdatedtripsdata(data)

    //             } else {
    //                 alert("No data available");
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error occurred while fetching data: ", error);
    //         });
    // }
    // else {
    //     alert("Please Select Driver Name");
    // }

    const drivername = document.getElementById("dname2").value.trim();
    const db1 = DBConstants.TractorTrips;

    if (!drivername || drivername === "select Driver Name") {
        alert("Please Select Driver Name");
        return;
    }

    try {
        const dataRefget = ref(db, db1);
        const snapshot = await get(dataRefget);

        if (!snapshot.exists()) {
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
            alert(`No trips found for ${drivername}`);
            return;
        }
;
        displayUpdatedtripsdata(filteredData)

    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load data");
    }
});

// getamount.addEventListener('click', function () {
//     const drivername = document.getElementById("dname2").value;
//     const db1 = "Amount";
//     if (drivername != "select Driver Name") {
//         const dataRefget = ref(db, `${db1}/${drivername}/`);
//         get(dataRefget)
//             .then((snapshot) => {
//                 if (snapshot.exists()) {
//                     const data = snapshot.val();
//                     displayamountdata(data)

//                 } else {
//                     alert("No data available");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error occurred while fetching data: ", error);
//             });
//     }
//     else {
//         alert("Please Select Driver Name");
//     }
// });

getamount.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();
    const db1 = DBConstants.TractorAmount;

    if (!drivername || drivername === "select Driver Name") {
        alert("Please Select Driver Name");
        return;
    }

    try {
        const dataRefget = ref(db, db1);
        const snapshot = await get(dataRefget);

        if (!snapshot.exists()) {
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
            alert(`No amount records found for ${drivername}`);
            return;
        }

        // Send only matched data
        displayamountdata(filteredData);

    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load amount data");
    }
});

// getbal.addEventListener('click', function () {
//     const drivername = document.getElementById("dname2").value;
//     const db1 = "Trips";
//     const db2 = "Amount";
//     const dataRefget = ref(db, `${db1}/${drivername}/`);
//     const dataRefget1 = ref(db, `${db2}/${drivername}/`);
//     if (drivername != "select Driver Name") {
//         get(dataRefget).then((snapshot1) => {
//             if (snapshot1.exists()) {
//                 const data = snapshot1.val();
//                 displaybal1(data, drivername)
//             }
//             else {
//                 alert("No data available");
//             }
//         })
//             .catch((error) => {
//                 console.error("Error occurred while fetching data: ", error);
//             });
//         get(dataRefget1).then((snapshot1) => {
//             if (snapshot1.exists()) {
//                 const data = snapshot1.val();
//                 displaybal2(data);
//             }
//             else {
//                 alert("No data available");
//             }
//         })
//             .catch((error) => {
//                 console.error("Error occurred while fetching data: ", error);
//             });
//     }
//     else {
//         alert("Plesae Select Driver Name");
//     }
// });

getbal.addEventListener('click', async function () {

    const drivername = document.getElementById("dname2").value.trim();

    if (!drivername || drivername === "select Driver Name") {
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
            alert("No data found for this driver");
            return;
        }

        // Send to UI functions
        displaybal1(filteredTrips, drivername);
        displaybal2(filteredAmounts);

    } catch (error) {
        console.error("Error occurred while fetching data:", error);
        alert("Failed to load balance data");
    }
});




