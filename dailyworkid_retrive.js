import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import DBConstants from './DatabaseConstants.js';
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
        const dataRefget = ref(db2, DBConstants.Customers);
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

// document.addEventListener("click", async function (e) {

//     const db1 = DBConstants.DailyWorkDB;

//     if (
//         e.target.classList.contains("payment-btn")
//     ) {

//         try {

//             let btn = e.target;

//             let customerId = btn.id;

//             // =====================================
//             // GET LOCAL STORAGE
//             // =====================================

//             let data =
//                 JSON.parse(
//                     localStorage.getItem(
//                         "unpaidCustomerslistdata"
//                     )
//                 ) || {};

//             // =====================================
//             // FIND ACTIVITY USING workid
//             // =====================================

//             let activity = null;

//             for (const key in data) {

//                 if (
//                     data[key].workid == customerId
//                 ) {

//                     activity = data[key];

//                     break;
//                 }
//             }

//             // =====================================
//             // NOT FOUND
//             // =====================================

//             if (!activity) {

//                 console.log(
//                     "Activity not found"
//                 );

//                 return;
//             }

//             // =====================================
//             // TOGGLE STATUS
//             // =====================================

//             let currentStatus =
//                 activity.Payment || "UnPaid";

//             let newStatus =
//                 currentStatus === "Paid"
//                     ? "UnPaid"
//                     : "Paid";

//             activity.Payment =
//                 newStatus;

//             // =====================================
//             // UPDATE LOCAL STORAGE
//             // =====================================

//             // localStorage.setItem(
//             //     "unpaidCustomerslistdata",
//             //     JSON.stringify(data)
//             // );

//             // =====================================
//             // FIREBASE UPDATE
//             // =====================================

//             const updatedData = {

//                 Contract:
//                     activity.Contract,

//                 Date:
//                     activity.Date,

//                 Disel:
//                     activity.Disel,

//                 Ending:
//                     activity.Ending,

//                 Name:
//                     activity.Name,

//                 Payment:
//                     newStatus,

//                 PhoneNumber:
//                     activity.PhoneNumber,

//                 Price:
//                     activity.Price,

//                 Shift:
//                     activity.Shift,

//                 Starting:
//                     activity.Starting,

//                 TotalTime:
//                     activity.TotalTime,

//                 Trips:
//                     activity.Trips,

//                 Villagename:
//                     activity.Villagename,

//                 Description:
//                     activity.Description,

//                 Drivers:
//                     activity.Drivers,

//                 HoursPrice:
//                     activity.HoursPrice,

//                 TripsPrice:
//                     activity.TripsPrice,

//                 Beta:
//                     activity.Beta || 0,

//                 OverallPrice:
//                     activity.OverallPrice,

//                 HoursTrips:
//                     activity.HoursTrips,

//                 HoursTripsAmount:
//                     activity.HoursTripsAmount,

//                 HoursDrivers:
//                     activity.HoursDrivers,

//                 JcbTripPrice:
//                     activity.JcbTripPrice
//             };

//             const transactionRef =
//                 ref(
//                     db2,
//                     `${db1}/${customerId}`
//                 );

//             await set(
//                 transactionRef,
//                 updatedData
//             );

//             // =====================================
//             // BUTTON UI
//             // =====================================

//             btn.innerText =
//                 newStatus;

//             btn.style.backgroundColor =
//                 newStatus === "Paid"
//                     ? "green"
//                     : "red";


//                     document.getElementById("paymentSuccessPopup5").style.display = "flex";
//                     // document.getElementById("done").style.display = "block";
//                     setTimeout(() => {
//                         document.getElementById("paymentSuccessPopup5").style.display = "none";
//                     }, 1500);

//                     // let newPaymentStatus = updatedCustomer.paymentStatus;

//                     let unpaidCustomerslistdata =
//                         JSON.parse(localStorage.getItem("unpaidCustomerslistdata")) || [];

//                     let paidCustomerslistdata =
//                         JSON.parse(localStorage.getItem("paidCustomerslistdata")) || [];

//                     // Remove customer from both lists first
//                     unpaidCustomerslistdata =
//                         unpaidCustomerslistdata.filter(x => x.workid !== wid);

//                     paidCustomerslistdata =
//                         paidCustomerslistdata.filter(x => x.workid !== wid);

//                     // Add to correct list
//                     if (newStatus === "Paid") {
//                         paidCustomerslistdata.push(customerData);
//                     } else {
//                         unpaidCustomerslistdata.push(customerData);
//                     }

//                     localStorage.setItem(
//                         "unpaidCustomerslistdata",
//                         JSON.stringify(unpaidCustomerslistdata)
//                     );

//                     localStorage.setItem(
//                         "paidCustomerslistdata",
//                         JSON.stringify(paidCustomerslistdata)
//                     );

//                     setTimeout(() => {
//                         document.getElementById("myModal7").style.display = "none";
//                     }, 1500);

//                     const clickablecustomerElement = document.getElementById(`UnPaid-${name}`)
//                     setTimeout(() => {

//                         closePopup5();
//                         closePopup6();

//                         const recoveryBtn = document.getElementById("recoveryamount");

//                         if (recoveryBtn) {
//                             recoveryBtn.click();
//                         }

//                         setTimeout(() => {

//                             if (clickablecustomerElement) {
//                                 clickablecustomerElement.click();
//                             }

//                         }, 300); // small delay is enough

//                     }, 1500);

//         } catch (error) {

//             console.log(error);
//         }
//     }
// });

// document.addEventListener("click", async function (e) {

//     const db1 = DBConstants.DailyWorkDB;

//     if (!e.target.classList.contains("payment-btn")) return;

//     try {
//         showProcessingPopup();

//         const btn = e.target;
//         const customerId = btn.id; // workid

//         // =====================================
//         // LOAD LOCAL STORAGE
//         // =====================================

//         let unpaidCustomerslistdata =
//             JSON.parse(localStorage.getItem("unpaidCustomerslistdata")) || [];

//         let paidCustomerslistdata =
//             JSON.parse(localStorage.getItem("paidCustomerslistdata")) || [];

//         // =====================================
//         // FIND CUSTOMER (FROM BOTH LISTS)
//         // =====================================

//         let activity = null;

//         for (const item of unpaidCustomerslistdata) {
//             if (item.workid == customerId) {
//                 activity = item;
//                 break;
//             }
//         }

//         if (!activity) {
//             for (const item of paidCustomerslistdata) {
//                 if (item.workid == customerId) {
//                     activity = item;
//                     break;
//                 }
//             }
//         }

//         if (!activity) {
//             console.log("Activity not found");
//             return;
//         }

//         // =====================================
//         // TOGGLE STATUS
//         // =====================================

//         const newStatus =
//             activity.Payment === "Paid" ? "UnPaid" : "Paid";

//         activity.Payment = newStatus; // KEEP workid safe here

//         // =====================================
//         // FIREBASE CLEAN COPY (REMOVE workid)
//         // =====================================

//         const activityCopy = { ...activity };
//         delete activityCopy.workid;

//         const updatedData = {
//             ...activityCopy,
//             Payment: newStatus
//         };

//         const transactionRef =
//             ref(db2, `${db1}/${customerId}`);

//         await set(transactionRef, updatedData);

//         // =====================================
//         // UPDATE LOCAL STORAGE LISTS
//         // =====================================

//         unpaidCustomerslistdata =
//             unpaidCustomerslistdata.filter(x => x.workid !== customerId);

//         paidCustomerslistdata =
//             paidCustomerslistdata.filter(x => x.workid !== customerId);

//         if (newStatus === "Paid") {
//             paidCustomerslistdata.push({
//                 ...activity,
//                 workid: customerId,
//                 Payment: newStatus
//             });
//         } else {
//             unpaidCustomerslistdata.push({
//                 ...activity,
//                 workid: customerId,
//                 Payment: newStatus
//             });
//         }

//         localStorage.setItem(
//             "unpaidCustomerslistdata",
//             JSON.stringify(unpaidCustomerslistdata)
//         );

//         localStorage.setItem(
//             "paidCustomerslistdata",
//             JSON.stringify(paidCustomerslistdata)
//         );

//         // =====================================
//         // UI UPDATE
//         // =====================================

//         btn.innerText = newStatus;
//         btn.style.backgroundColor =
//             newStatus === "Paid" ? "green" : "red";
//                                         hideProcessingPopup();

//         document.getElementById("paymentSuccessPopup5").style.display = "flex";

//         setTimeout(() => {
//             document.getElementById("paymentSuccessPopup5").style.display = "none";
//         }, 1500);

//         // =====================================
//         // REFRESH TABLE
//         // =====================================

//         setTimeout(() => {

//             const recoveryBtn = document.getElementById("recoveryamount");
//             if (recoveryBtn) recoveryBtn.click();

//         }, 1500);

//     } catch (error) {
//         console.log(error);
//     }
// });

document.addEventListener("click", async function (e) {

    const db1 = DBConstants.DailyWorkDB;

    if (!e.target.classList.contains("payment-btn")) return;

    try {

        showProcessingPopup();

        const btn = e.target;
        const customerId = btn.id; // workid
        const amount = parseInt(btn.dataset.amount) || 0;

        // =====================================
        // LOAD LOCAL STORAGE
        // =====================================

        let unpaidCustomerslistdata =
            JSON.parse(localStorage.getItem("unpaidCustomerslistdata")) || [];

        let paidCustomerslistdata =
            JSON.parse(localStorage.getItem("paidCustomerslistdata")) || [];

        // =====================================
        // FIND CUSTOMER
        // =====================================

        let activity = null;

        for (const item of unpaidCustomerslistdata) {

            if (item.workid == customerId) {
                activity = item;
                break;
            }
        }

        if (!activity) {

            for (const item of paidCustomerslistdata) {

                if (item.workid == customerId) {
                    activity = item;
                    break;
                }
            }
        }

        if (!activity) {

            hideProcessingPopup();
            console.log("Activity not found");
            return;
        }

        // =====================================
        // TOGGLE STATUS
        // =====================================

        const newStatus =
            activity.Payment === "Paid"
                ? "UnPaid"
                : "Paid";

        activity.Payment = newStatus;

        // =====================================
        // FIREBASE UPDATE
        // =====================================

        const activityCopy = { ...activity };
        delete activityCopy.workid;

        const updatedData = {
            ...activityCopy,
            Payment: newStatus
        };

        const transactionRef =
            ref(db2, `${db1}/${customerId}`);

        await set(transactionRef, updatedData);

        // =====================================
        // REMOVE FROM BOTH LISTS
        // =====================================

        unpaidCustomerslistdata =
            unpaidCustomerslistdata.filter(
                x => String(x.workid) !== String(customerId)
            );

        paidCustomerslistdata =
            paidCustomerslistdata.filter(
                x => String(x.workid) !== String(customerId)
            );

        // =====================================
        // ADD TO CORRECT LIST
        // =====================================

        if (newStatus === "Paid") {

            paidCustomerslistdata.push({
                ...activity,
                workid: customerId,
                Payment: newStatus
            });

        } else {

            unpaidCustomerslistdata.push({
                ...activity,
                workid: customerId,
                Payment: newStatus
            });
        }

        // =====================================
        // SAVE LOCAL STORAGE
        // =====================================

        localStorage.setItem(
            "unpaidCustomerslistdata",
            JSON.stringify(unpaidCustomerslistdata)
        );

        localStorage.setItem(
            "paidCustomerslistdata",
            JSON.stringify(paidCustomerslistdata)
        );

        // =====================================
        // BUTTON UI UPDATE
        // =====================================

        btn.innerText = newStatus;

        btn.style.backgroundColor =
            newStatus === "Paid"
                ? "green"
                : "red";

        // =====================================
        // BALANCE CELL UPDATE
        // =====================================

        let balanceCell =
            btn.closest("tr")
                ?.querySelector(".balance-amount");

        if (balanceCell) {

            balanceCell.innerText =
                newStatus === "Paid"
                    ? 0
                    : amount;
        }

        // =====================================
        // SUMMARY UPDATE
        // =====================================

        let unpaidCell =
            document.querySelector(".current-unpaid");

        let remainingCell =
            document.querySelector(".remaining-unpaid");

        if (unpaidCell) {

            let current =
                parseInt(unpaidCell.innerText) || 0;

            unpaidCell.innerText =
                newStatus === "Paid"
                    ? current - amount
                    : current + amount;
        }

        if (remainingCell) {

            let current =
                parseInt(remainingCell.innerText) || 0;

            remainingCell.innerText =
                newStatus === "Paid"
                    ? current - amount
                    : current + amount;
        }

        // =====================================
        // SUCCESS POPUP
        // =====================================

        hideProcessingPopup();

        document.getElementById(
            "paymentSuccessPopup5"
        ).style.display = "flex";

        setTimeout(() => {

            document.getElementById(
                "paymentSuccessPopup5"
            ).style.display = "none";

        }, 1500);

        // =====================================
        // CUSTOMER REFRESH
        // =====================================

        const customerName = activity.Name;

        const unpaidclickablecustomerElement =
            document.getElementById(
                `UnPaid-${customerName}`
            );

        const paidclickablecustomerElement =
            document.getElementById(
                `Paid-${customerName}`
            );

        setTimeout(() => {

            if (typeof closePopup5 === "function") {
                closePopup5();
            }

            if (typeof closePopup6 === "function") {
                closePopup6();
            }

            const recoveryBtn =
                document.getElementById(
                    "recoveryamount"
                );

            if (recoveryBtn) {
                recoveryBtn.click();
            }

            setTimeout(() => {

                if (newStatus === "UnPaid") {

                    if (
                        paidclickablecustomerElement
                    ) {
                        paidclickablecustomerElement.click();
                    }

                } else {

                    if (
                        unpaidclickablecustomerElement
                    ) {
                        unpaidclickablecustomerElement.click();
                    }
                }

            }, 300);

        }, 1500);

    } catch (error) {

        hideProcessingPopup();
        console.error(error);
        alert("Error updating payment status");
    }
});

function getvillage(data) {
    var cusname = document.getElementById("name").value;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            // console.log(activity,customerPhone)
            if (customerPhone !== DBConstants.Customers_Id && cusname === activity.Name) {
                document.getElementById("vill").value = activity.Villagename;
                break;
            }
        }
    }
}
async function selectVillage1() {
    try {
        const dataRefget = ref(db2, DBConstants.Customers);
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
    var cusname = document.getElementById("name2").value;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            // console.log(activity,customerPhone)
            if (customerPhone !== DBConstants.Customers_Id && cusname === activity.Name) {
                document.getElementById("vil2").value = activity.Villagename;
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
        const db1 = DBConstants.Customers_Id;
        const db3 = DBConstants.Customers;
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

// document.getElementById("name2").addEventListener("change", async function (e1) {
//     e1.preventDefault(); // Prevent default form submission behavior
//     try {
//         // Access the database and retrieve data
//         const db1 = DBConstants.CustomersAmount_Id;
//         const db3 = DBConstants.CustomersAmount;
//         const dataRefget = ref(db2, `${db3}/${db1}`);
//         const snapshot = await get(dataRefget);
//         selectVillage1();
//         // Check if data exists
//         if (snapshot.exists()) {
//             const data = snapshot.val();
//             // console.log(data);
//             document.getElementById("cid1").value = data;
//         } else {
//             alert("No data available");
//         }
//     } catch (error) {
//         console.error("Error occurred while fetching data: ", error);
//     }
// });
document.getElementById("name2").addEventListener("change", function (e1) {
    e1.preventDefault();

    try {
        // Generate unique ID using current date & time
        GetUniqueId("cid1");

        // Continue existing functionality
        selectVillage1();

    } catch (error) {
        console.error("Error occurred while generating system ID: ", error);
    }
});

let timer = 60;

let countdown;

document.addEventListener(
    "click",
    async function (e1) {

        // =====================================
        // CHECK BUTTON ID
        // =====================================

        if (
            e1.target.id ===
            "pay-entire-amount-btn"
        ) {

            e1.preventDefault();

            try {

                // =============================
                // SHOW FORM
                // =============================

                document.getElementById(
                    "custamountcontainer2"
                ).style.display = "flex";

                // =============================
                // GET NAME
                // =============================

                const customerName =
                    e1.target.dataset.name;

                const villageName =
                    "Not Required";

                document.getElementById(
                    "name6"
                ).value = customerName;

                document.getElementById(
                    "vil6"
                ).value = villageName;

                document.getElementById(
                    "cid6"
                ).value = GetSystemIdforPayments("cid6");

                // =============================
                // TODAY DATE
                // =============================

                const today = new Date();

                const year =
                    today.getFullYear();

                const month =
                    String(
                        today.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        today.getDate()
                    ).padStart(2, "0");

                const formattedDate =
                    `${year}-${month}-${day}`;

                document.getElementById(
                    "dat6"
                ).value = formattedDate;

                // =============================
                // TIMER START
                // =============================

                timer = 60;

                clearInterval(
                    countdown
                );

                document.getElementById(
                    "timerText"
                ).innerText = timer;

                countdown =
                    setInterval(() => {

                        timer--;

                        document.getElementById(
                            "timerText"
                        ).innerText = timer;

                        if (timer <= 0) {

                            clearInterval(
                                countdown
                            );

                            document.getElementById(
                                "custamountcontainer2"
                            ).style.display = "none";
                        }

                    }, 1000);

                // =============================
                // GET ID
                // =============================

                // const db1 =
                //     DBConstants
                //         .CustomersAmount_Id;

                // const db3 =
                //     DBConstants
                //         .CustomersAmount;

                // const dataRefget =
                //     ref(
                //         db2,
                //         `${db3}/${db1}`
                //     );

                // const snapshot =
                //     await get(dataRefget);

                // if (
                //     snapshot.exists()
                // ) {

                //     const data =
                //         snapshot.val();

                //     document.getElementById(
                //         "cid6"
                //     ).value = data;

                // } else {

                //     alert(
                //         "No data available"
                //     );
                // }

            } catch (error) {

                console.error(
                    "Error occurred while fetching data:",
                    error
                );
            }
        }
    });


function GetUniqueId(outputId) {
    let id = Date.now();
    document.getElementById(outputId).value = id;
}
