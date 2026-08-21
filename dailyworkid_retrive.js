import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get, set, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import DBConstants from './DatabaseConstants.js';
import { getExtraAmount } from "./dailyworkdatabase.js";
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

async function deleteWork(customerName, workId) {
    try {
        const workRef = ref(
            db2,
            `2026-2027_CustomersAmount/${customerName}/${workId}`
        );

        const snapshot = await get(workRef);

        if (!snapshot.exists()) {
            alert("Cannot delete: Transcation is Modified Using Overall Payment Method.");
            return false;
        }

        await remove(workRef);

        console.log("Work deleted successfully");
        return true;

    } catch (error) {
        console.error("Delete error:", error);
        alert("Cannot delete: Transcation is Modified Using Overall Payment Method.");

        return false;
    }
}

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
        const CustomerName = btn.dataset.name;
        const WorkAmount = btn.dataset.amount;
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = String(todayDate.getMonth() + 1).padStart(2, "0");
        const day = String(todayDate.getDate()).padStart(2, "0");
        const dte = `${year}-${month}-${day}`;
        if (newStatus === "UnPaid") {
            const deletionResult = await deleteWork(CustomerName, customerId);
            if (!deletionResult) {
                hideProcessingPopup();
                return;
            }
        }
        if (newStatus === "Paid") {
            const result = getExtraAmount(
                WorkAmount,
                CustomerName,
                customerId,
                dte,
                "Not Required",
                "Individual Payment"
            );

            if (result === false) {
                return; // Stop executing the remaining code in this function
            }
            else {
                const db1 = DBConstants.CustomersAmount;
                const dataRefset = ref(db2, `${db1}/${CustomerName}/${customerId}`);
                await set(dataRefset, {
                    Date: dte,
                    Name: CustomerName,
                    Villagename: "Not Required",
                    Amount: WorkAmount,
                    PaymentType: "Individual Payment"
                });
                setTimeout(() => {
                    location.reload();
                }, 10000);
            }
        }


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
