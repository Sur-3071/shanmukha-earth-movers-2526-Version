import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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
// Get a reference to the database service
const db = getDatabase(app);

var monthsMap = {
    "January": [0, 0],
    "February": [0, 0],
    "March": [0, 0],
    "April": [0, 0],
    "May": [0, 0],
    "June": [0, 0],
    "July": [0, 0],
    "August": [0, 0],
    "September": [0, 0],
    "October": [0, 0],
    "November": [0, 0],
    "December": [0, 0]
};

document.getElementById('submit10').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("d1").value;
    const wid = document.getElementById("wid1").value;
    const purpose = document.getElementById("work1").value;
    const monthname = document.getElementById("monthDropdown").value;


    document.getElementById("userForm9").reset();
    showProcessingPopup();
    if (dat.length > 0) {
        if (monthname.length > 0) {
            if (purpose.length > 0) {
                const db1 = DBConstants.JcbDriverDB;
                const db2 = "Leaves";
                const dataRefset = ref(db, `${db1}/${db2}/${wid}`);
                try {
                    await set(dataRefset, {
                        Date: dat,
                        Month: monthname,
                        Purpose: purpose
                    });
                    hideProcessingPopup();

                    document.getElementById("paymentSuccessPopup2").style.display = "flex";

                    document.getElementById("done").style.display = "block";
                    setTimeout(() => {
                        removedone();
                    }, 2500);

                } catch (error) {
                    alert("An error occurred. Please try again.");
                }
            }
            else {
                alert("Please Enter purpose of Leave");
                datarebuild();
            }
        }
        else {
            alert("Please Select Month");
            datarebuild();
        }
    }
    else {
        alert("Please Choose Date");
        datarebuild();
    }
    function datarebuild() {
        document.getElementById("d1").value = dat;
        document.getElementById("wid1").value = wid;
        document.getElementById("work1").value = purpose;
    }
    function removedone() {
        document.getElementById("paymentSuccessPopup2").style.display = "none";

        document.getElementById("done").style.display = "none";
    }
});


document.getElementById('submit20').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("d2").value;
    const wid = document.getElementById("wid2").value;
    const amount = document.getElementById("work2").value;
    const monthname = document.getElementById("monthDropdown1").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const purpose = document.getElementById("reason").value;
    document.getElementById("userForm8").reset();
    showProcessingPopup();
    if (dat.length > 0) {
        if (monthname.length > 0) {
            if (amount.length > 0) {
                if (isAllDigits(amount)) {
                    const db1 = DBConstants.JcbDriverDB;
                    const db2 = "Salary";
                    const dataRefset = ref(db, `${db1}/${db2}/${wid}`);
                    try {
                        await set(dataRefset, {
                            Date: dat,
                            Month: monthname,
                            Salary: amount,
                            PaymentMethod: paymentMethod,
                            Purpose: purpose
                        });
                        hideProcessingPopup();

                        document.getElementById("paymentSuccessPopup2").style.display = "flex";

                        document.getElementById("done").style.display = "block";
                        setTimeout(() => {
                            removedone();
                        }, 2500);

                    } catch (error) {
                        alert("An error occurred. Please try again.");
                    }
                }
                else {
                    alert("The Amount Must be in Integer");
                    datarebuild();
                }
            }
            else {
                alert("Please Enter Amount");
                datarebuild();
            }
        }
        else {
            alert("Please Select Month");
            datarebuild();
        }
    }
    else {
        alert("Please Choose Date");
        datarebuild();
    }
    function datarebuild() {
        document.getElementById("d2").value = dat;
        document.getElementById("wid2").value = wid;
        document.getElementById("work2").value = amount;
    }

    function isAllDigits(str) {
        return /^\d+$/.test(str);
    }
    function removedone() {
        document.getElementById("paymentSuccessPopup2").style.display = "none";
        document.getElementById("done").style.display = "none";
    }
});

document.getElementById('toggleBtn').addEventListener('click', async function (e) {
    e.preventDefault();
    const salaryDiv = document.getElementById("salaryTableContainer");
    const leaveDiv = document.getElementById("leaveTableContainer");
    try {
        // Access the database and retrieve data
        const db1 = DBConstants.JcbDriverDB;
        const dataRefset = ref(db, `${db1}`);
        const snapshot = await get(dataRefset);


        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            generateTable(data);

        } else {
            salaryDiv.innerHTML = `<div style="padding: 10px; 
                                     font-size: 14px; 
                                     font-weight: 600; 
                                     color: #b00020; 
                                     background: #ffe5e8; 
                                     border: 1px solid #ffb3bd; 
                                     border-radius: 8px; 
                                     text-align: center;
                                     margin-top: 8px;">
                           No Salary Records Found
                       </div>`;

            leaveDiv.innerHTML = `<div style="padding: 10px; 
                                     font-size: 14px; 
                                     font-weight: 600; 
                                     color: #b00020; 
                                     background: #ffe5e8; 
                                     border: 1px solid #ffb3bd; 
                                     border-radius: 8px; 
                                     text-align: center;
                                     margin-top: 8px;">
                           No Leave Records Found
                       </div>`;
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }

});

function generateTable(data) {

    monthsMap = {
        "January": [0, 0],
        "February": [0, 0],
        "March": [0, 0],
        "April": [0, 0],
        "May": [0, 0],
        "June": [0, 0],
        "July": [0, 0],
        "August": [0, 0],
        "September": [0, 0],
        "October": [0, 0],
        "November": [0, 0],
        "December": [0, 0]
    };


    // console.log("📦 Incoming Data:", data);
    const salaryDiv = document.getElementById("salaryTableContainer");
    const leaveDiv = document.getElementById("leaveTableContainer");

    salaryDiv.innerHTML = "";
    leaveDiv.innerHTML = "";

    if (data.Salary && Object.keys(data.Salary).length > 0) {

    const box = document.createElement("div");
    box.classList.add("table-box", "salary-table");

    const table = document.createElement("table");

    table.innerHTML = `
        <caption>💰 Salary Data</caption>
        <tr>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Purpose</th>
            <th>Amount (₹)</th>
        </tr>
    `;

    const salaryGroups = {};

    Object.values(data.Salary).forEach(entry => {

        const cycleMonth =
            entry.Month;

        if (!salaryGroups[cycleMonth]) {
            salaryGroups[cycleMonth] = [];
        }

        salaryGroups[cycleMonth].push(entry);
    });

    let overallTotal = 0;

    Object.keys(salaryGroups).forEach(month => {

        const monthHeader =
            document.createElement("tr");

        monthHeader.innerHTML = `
            <td colspan="4"
                style="
                    background:#1976d2;
                    color:white;
                    font-weight:bold;
                    text-align:center;
                    font-size:18px;
                    padding:10px;
                ">
                ${month}
                (18th - 17th Cycle)
            </td>
        `;

        table.appendChild(monthHeader);

        let monthTotal = 0;

        salaryGroups[month].forEach(entry => {

            const amount =
                parseFloat(entry.Salary) || 0;

            monthTotal += amount;
            overallTotal += amount;

            monthsMap[entry.Month][0] += parseInt(amount);

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${entry.Date}</td>
                <td>${entry.PaymentMethod === undefined ? 'Phonepe' : entry.PaymentMethod}</td>
                <td>${entry.Purpose === undefined ? 'Salary Payment' : entry.Purpose}</td>
                <td>₹${amount.toLocaleString("en-IN")}</td>
            `;

            table.appendChild(row);
        });

        const subtotalRow =
            document.createElement("tr");

        subtotalRow.innerHTML = `
            <td colspan="3"
                style="
                    font-weight:bold;
                    background:#e3f2fd;
                ">
                ${month} Total
            </td>

            <td
                style="
                    font-weight:bold;
                    background:#e3f2fd;
                ">
                ₹${monthTotal.toLocaleString("en-IN")}
            </td>
        `;

        table.appendChild(subtotalRow);
    });

    const totalRow =
        document.createElement("tr");

    totalRow.classList.add("total-row");

    totalRow.innerHTML = `
        <td colspan="3">
            Overall Total
        </td>

        <td>
            ₹${overallTotal.toLocaleString("en-IN")}
        </td>
    `;

    table.appendChild(totalRow);

    box.appendChild(table);
    salaryDiv.appendChild(box);

} else {

    salaryDiv.innerHTML = `
        <div style="
            padding:10px;
            font-size:14px;
            font-weight:600;
            color:#b00020;
            background:#ffe5e8;
            border:1px solid #ffb3bd;
            border-radius:8px;
            text-align:center;
            margin-top:8px;
        ">
            No Salary Records Found
        </div>
    `;
}


    if (data.Leaves && Object.keys(data.Leaves).length > 0) {

    const box = document.createElement("div");
    box.classList.add("table-box", "leave-table");

    const table = document.createElement("table");

    table.innerHTML = `
        <caption>🌴 Leave Data</caption>
        <tr>
            <th>Date</th>
            <th>Purpose</th>
        </tr>
    `;

    const leaveGroups = {};

    Object.values(data.Leaves).forEach(entry => {

        const cycleMonth =entry.Month;

        if (!leaveGroups[cycleMonth]) {
            leaveGroups[cycleMonth] = [];
        }

        leaveGroups[cycleMonth].push(entry);
    });

    let overallLeaves = 0;

    Object.keys(leaveGroups).forEach(month => {

        const monthHeader =
            document.createElement("tr");

        monthHeader.innerHTML = `
            <td colspan="2"
                style="
                    background:#43a047;
                    color:white;
                    font-weight:bold;
                    text-align:center;
                    font-size:18px;
                    padding:10px;
                ">
                ${month}
                (18th - 17th Cycle)
            </td>
        `;

        table.appendChild(monthHeader);

        let monthLeaves = 0;

        leaveGroups[month].forEach(entry => {

            monthsMap[entry.Month][1] += 1;

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${entry.Date}</td>
                <td>${entry.Purpose}</td>
            `;

            table.appendChild(row);

            monthLeaves++;
            overallLeaves++;
        });

        const subtotalRow =
            document.createElement("tr");

        subtotalRow.innerHTML = `
            <td
                style="
                    font-weight:bold;
                    background:#e8f5e9;
                ">
                ${month} Total Leaves
            </td>

            <td
                style="
                    font-weight:bold;
                    background:#e8f5e9;
                ">
                ${monthLeaves}
            </td>
        `;

        table.appendChild(subtotalRow);
    });

    const totalRow =
        document.createElement("tr");

    totalRow.classList.add("total-row");

    totalRow.innerHTML = `
        <td>
            Overall Leaves
        </td>

        <td>
            ${overallLeaves}
        </td>
    `;

    table.appendChild(totalRow);

    box.appendChild(table);
    leaveDiv.appendChild(box);

} else {

    leaveDiv.innerHTML = `
        <div style="
            padding:10px;
            font-size:14px;
            font-weight:600;
            color:#b00020;
            background:#ffe5e8;
            border:1px solid #ffb3bd;
            border-radius:8px;
            text-align:center;
            margin-top:8px;
        ">
            No Leave Records Found
        </div>
    `;
}
    updateMonthCards(monthsMap);

}

function updateMonthCards(monthlySummary) {
    const driverSalary = 15000;   // fixed base salary per month
    const allowedLeaves = 2;      // standard allowed leaves per month

    Object.keys(monthsMap).forEach(month => {
        const card = document.getElementById(`card-${month}`);
        // console.log(month);
        if (card) {
            const salaryEl = card.querySelector(".salary");
            const totalsalaryEl = card.querySelector(".total-salary");
            const salarycut = card.querySelector(".cut-salary");
            const remainingSalaryEl = card.querySelector(".remaining-salary");
            const leavesEl = card.querySelector(".leaves");
            const remainingLeavesEl = card.querySelector(".remaining-leaves");
            const extraLeavesEl = card.querySelector(".extra-leaves");

            // 🧮 Core calculations
            let totalSalaryTaken = monthsMap[month][0];
            const totalLeaves = monthsMap[month][1];

            const remainingSalary = Math.max(0, driverSalary - totalSalaryTaken);
            const remainingLeaves = Math.max(0, allowedLeaves - totalLeaves);
            const extraLeaves = totalLeaves > allowedLeaves ? totalLeaves - allowedLeaves : 0;

            // 🪄 Update values in UI
            salaryEl.textContent = `₹${totalSalaryTaken.toLocaleString("en-IN")}`;
            leavesEl.textContent = `${totalLeaves}`;
            remainingLeavesEl.textContent = `${remainingLeaves}`;
            extraLeavesEl.textContent = `${extraLeaves}`;

            // Calculate per-day salary
            const perDaySalary = 500;

            // Calculate salary cut
            const salaryCutAmount = perDaySalary * extraLeaves;
            // totalSalaryTaken += salaryCutAmount;
            // salaryEl.textContent = `₹${totalSalaryTaken.toLocaleString("en-IN")}`;

            salarycut.textContent = `₹${salaryCutAmount.toLocaleString("en-IN")}`;
            const totalsalary = totalSalaryTaken + salaryCutAmount;
            totalsalaryEl.textContent = `₹${totalsalary.toLocaleString("en-IN")}`;

            // Calculate remaining salary after deduction
            const finalRemainingSalary = 15000 - totalsalary;
            remainingSalaryEl.textContent = `₹${finalRemainingSalary.toLocaleString("en-IN")}`;

        }
    });
}


