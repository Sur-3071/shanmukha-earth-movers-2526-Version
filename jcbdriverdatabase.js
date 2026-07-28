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
                    hideProcessingPopup();
                    alert("The Amount Must be in Integer");
                    datarebuild();
                }
            }
            else {
                hideProcessingPopup();
                alert("Please Enter Amount");
                datarebuild();
            }
        }
        else {
            hideProcessingPopup();
            alert("Please Select Month");
            datarebuild();
        }
    }
    else {
        hideProcessingPopup();
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
    showProcessingPopup();
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
            hideProcessingPopup();
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
    console.log("Generating table with data:", data);

    // Properly scoped map: [Total Paid, Leave Count]
    const monthsMap = {
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

    const salaryDiv = document.getElementById("salaryTableContainer");
    const leaveDiv = document.getElementById("leaveTableContainer");

    salaryDiv.innerHTML = "";
    leaveDiv.innerHTML = "";

    // ==========================
    // 1. Calculate Leave Count First
    // ==========================
    if (data.Leaves) {
        Object.values(data.Leaves).forEach(entry => {
            if (monthsMap[entry.Month]) {
                monthsMap[entry.Month][1]++;
            }
        });
    }

    // ==========================
    // 2. Salary Table
    // ==========================
    if ((data.Salary && Object.keys(data.Salary).length > 0) || (data.Leaves && Object.keys(data.Leaves).length > 0)) {

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
        const leaveGroups = {};

        // Salary Grouping
        Object.values(data.Salary || {}).forEach(entry => {
            if (!salaryGroups[entry.Month]) salaryGroups[entry.Month] = [];
            salaryGroups[entry.Month].push(entry);
        });

        // Leave Grouping
        Object.values(data.Leaves || {}).forEach(entry => {
            if (!leaveGroups[entry.Month]) leaveGroups[entry.Month] = [];
            leaveGroups[entry.Month].push(entry);
        });

        let overallTotal = 0;
        const monthOrder = Object.keys(monthsMap);
        const driverSalary = 23000;
        const allowedLeaves = 2;
        const perDaySalary = Math.round(driverSalary / 30); // ₹767 per day

        monthOrder.forEach((month) => {
            const salaryEntries = salaryGroups[month] || [];
            const leaveEntries = leaveGroups[month] || [];

            // Skip months with no records
            if (salaryEntries.length === 0 && leaveEntries.length === 0) {
                return;
            }

            // Month Header
            const monthHeader = document.createElement("tr");
            monthHeader.innerHTML = `
                <td colspan="4" style="background:#1976d2; color:white; font-weight:bold; text-align:center; font-size:18px; padding:10px;">
                    ${month} (1st - 31st Cycle)
                </td>
            `;
            table.appendChild(monthHeader);

            let monthTotal = 0;

            // Render Salary Entries
            salaryEntries.forEach(entry => {
                const amount = parseFloat(entry.Salary) || 0;
                monthTotal += amount;
                monthsMap[entry.Month][0] += amount;

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td style="white-space: nowrap;">${formatDate(entry.Date)}</td>
                    <td>${entry.PaymentMethod || 'Phonepe'}</td>
                    <td>${entry.Purpose || 'Salary Payment'}</td>
                    <td>₹${amount.toLocaleString("en-IN")}</td>
                `;
                table.appendChild(row);
            });

            // Salary Cut Calculation
            const totalLeaves = monthsMap[month][1];
            const extraLeaves = Math.max(0, totalLeaves - allowedLeaves);
            const salaryCut = extraLeaves * perDaySalary;

            if (salaryCut > 0) {
                const cutRow = document.createElement("tr");
                cutRow.innerHTML = `
                    <td colspan="3" style="background:#ffebee; color:#d32f2f; font-weight:bold;">
                        Salary Cut (${extraLeaves} Extra Leave${extraLeaves > 1 ? "s" : ""})
                    </td>
                    <td style="background:#ffebee; color:#d32f2f; font-weight:bold;">
                        -₹${salaryCut.toLocaleString("en-IN")}
                    </td>
                `;
                table.appendChild(cutRow);
            }

            // Subtotal Calculation
            const finalMonthTotal = monthTotal + salaryCut;
            overallTotal += finalMonthTotal;

            const subtotalRow = document.createElement("tr");
            subtotalRow.innerHTML = `
                <td colspan="3" style="font-weight:bold; background:#e3f2fd;">
                    ${month} Total
                </td>
                <td style="font-weight:bold; background:#e3f2fd;">
                    ₹${finalMonthTotal.toLocaleString("en-IN")}
                </td>
            `;
            table.appendChild(subtotalRow);
        });

        // Overall Total Row
        const totalRow = document.createElement("tr");
        totalRow.classList.add("total-row");
        totalRow.innerHTML = `
            <td colspan="3">Overall Total</td>
            <td>₹${overallTotal.toLocaleString("en-IN")}</td>
        `;
        table.appendChild(totalRow);

        box.appendChild(table);
        salaryDiv.appendChild(box);

    } else {
        salaryDiv.innerHTML = `
            <div style="padding:10px; font-size:14px; font-weight:600; color:#b00020; background:#ffe5e8; border:1px solid #ffb3bd; border-radius:8px; text-align:center; margin-top:8px;">
                No Salary Records Found
            </div>
        `;
    }

    // ==========================
    // 3. Leave Table
    // ==========================
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
            if (!leaveGroups[entry.Month]) leaveGroups[entry.Month] = [];
            leaveGroups[entry.Month].push(entry);
        });

        let overallLeaves = 0;
        const monthOrder = Object.keys(monthsMap);

        monthOrder.forEach((month) => {
            const leaveEntries = leaveGroups[month] || [];

            if (leaveEntries.length === 0) return;

            const monthHeader = document.createElement("tr");
            monthHeader.innerHTML = `
                <td colspan="2" style="background:#43a047; color:white; font-weight:bold; text-align:center; font-size:18px; padding:10px;">
                    ${month} (1st - 31st Cycle)
                </td>
            `;
            table.appendChild(monthHeader);

            leaveEntries.forEach(entry => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${formatDate(entry.Date)}</td>
                    <td>${entry.Purpose}</td>
                `;
                table.appendChild(row);
                overallLeaves++;
            });

            const subtotalRow = document.createElement("tr");
            subtotalRow.innerHTML = `
                <td style="font-weight:bold; background:#e8f5e9;">${month} Total Leaves</td>
                <td style="font-weight:bold; background:#e8f5e9;">${leaveEntries.length}</td>
            `;
            table.appendChild(subtotalRow);
        });

        const totalRow = document.createElement("tr");
        totalRow.classList.add("total-row");
        totalRow.innerHTML = `
            <td>Overall Leaves</td>
            <td>${overallLeaves}</td>
        `;
        table.appendChild(totalRow);

        box.appendChild(table);
        leaveDiv.appendChild(box);

    } else {
        leaveDiv.innerHTML = `
            <div style="padding:10px; font-size:14px; font-weight:600; color:#b00020; background:#ffe5e8; border:1px solid #ffb3bd; border-radius:8px; text-align:center; margin-top:8px;">
                No Leave Records Found
            </div>
        `;
    }

    // Pass monthly summary map to card update function
    updateMonthCards(monthsMap);
}

function updateMonthCards(monthsMap) {
    const driverSalary = 23000;  
    const allowedLeaves = 2;     
    const perDaySalary = Math.round(driverSalary / 30); 

    if (typeof hideProcessingPopup === "function") hideProcessingPopup();

    Object.keys(monthsMap).forEach(month => {
        const card = document.getElementById(`card-${month}`);
        if (card) {
            const salaryEl = card.querySelector(".salary");
            const totalsalaryEl = card.querySelector(".total-salary");
            const salarycut = card.querySelector(".cut-salary");
            const remainingSalaryEl = card.querySelector(".remaining-salary");
            const leavesEl = card.querySelector(".leaves");
            const remainingLeavesEl = card.querySelector(".remaining-leaves");
            const extraLeavesEl = card.querySelector(".extra-leaves");

            const totalSalaryTaken = monthsMap[month][0];
            const totalLeaves = monthsMap[month][1];

            const extraLeaves = Math.max(0, totalLeaves - allowedLeaves);
            const remainingLeaves = Math.max(0, allowedLeaves - totalLeaves);
            const salaryCutAmount = perDaySalary * extraLeaves;
            const totalEffectiveSalary = totalSalaryTaken + salaryCutAmount;
            const finalRemainingSalary = driverSalary - totalEffectiveSalary;

            if (salaryEl) salaryEl.textContent = `₹${totalSalaryTaken.toLocaleString("en-IN")}`;
            if (leavesEl) leavesEl.textContent = `${totalLeaves}`;
            if (remainingLeavesEl) remainingLeavesEl.textContent = `${remainingLeaves}`;
            if (extraLeavesEl) extraLeavesEl.textContent = `${extraLeaves}`;
            if (salarycut) salarycut.textContent = `₹${salaryCutAmount.toLocaleString("en-IN")}`;
            if (totalsalaryEl) totalsalaryEl.textContent = `₹${totalEffectiveSalary.toLocaleString("en-IN")}`;
            if (remainingSalaryEl) remainingSalaryEl.textContent = `₹${finalRemainingSalary.toLocaleString("en-IN")}`;
        }
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

// console.log(formattedDate);


