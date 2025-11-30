import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

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
const monthsMap = {
  "January":  [0, 0],
  "February": [0, 0],
  "March":    [0, 0],
  "April":    [0, 0],
  "May":      [0, 0],
  "June":     [0, 0],
  "July":     [0, 0],
  "August":   [0, 0],
  "September":[0, 0],
  "October":  [0, 0],
  "November": [0, 0],
  "December": [0, 0]
};


document.getElementById('submit1').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("d1").value;
    const wid = document.getElementById("wid1").value;
    const purpose = document.getElementById("work1").value;
    const monthname=document.getElementById("monthDropdown").value;


    document.getElementById("userForm1").reset();

    if (dat.length > 0) {
        if(monthname.length>0)
        {
            if (purpose.length > 0) {
                const db1 = "JcbDriverData";
                const db2 = "Leaves";
                const dataRefset = ref(db, `${db1}/${db2}/${wid}`);
                try {
                    await set(dataRefset, {
                        Date: dat,
                        Month:monthname,
                        Purpose: purpose
                    });
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
        else
        {
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
        document.getElementById("done").style.display = "none";
    }
});


document.getElementById('submit2').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("d2").value;
    const wid = document.getElementById("wid2").value;
    const amount = document.getElementById("work2").value;
    const monthname=document.getElementById("monthDropdown1").value;
    document.getElementById("userForm2").reset();

    if (dat.length > 0) {
        if(monthname.length>0)
        {
            if (amount.length > 0) {
                if (isAllDigits(amount)) {
                    const db1 = "JcbDriverData";
                    const db2 = "Salary";
                    const dataRefset = ref(db, `${db1}/${db2}/${wid}`);
                    try {
                        await set(dataRefset, {
                            Date: dat,
                            Month:monthname,
                            Salary: amount
                        });
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
        else{
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
        document.getElementById("done").style.display = "none";
    }
});

document.getElementById('toggleBtn').addEventListener('click', async function (e) {
    e.preventDefault();
    try {
        // Access the database and retrieve data
        const db1 = "JcbDriverData";
        const dataRefset = ref(db, `${db1}`);
        const snapshot = await get(dataRefset);


        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            generateTable(data);

        } else {
            alert("Zero Leaves and Zero salary.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }

});

function generateTable(data) {
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
                <th>Amount (₹)</th>
            </tr>
        `;

        let totalSalary = 0;

        Object.values(data.Salary).forEach(entry => {
            const row = document.createElement("tr");
            const amount = parseFloat(entry.Salary) || 0;
            totalSalary += amount;
            monthsMap[entry.Month][0] += parseInt(amount);
            row.innerHTML = `
                <td>${entry.Date}</td>
                <td>${amount.toLocaleString("en-IN")}</td>
            `;
            table.appendChild(row);
        });

        // Add total row
        const totalRow = document.createElement("tr");
        totalRow.classList.add("total-row");
        totalRow.innerHTML = `
            <td>Total</td>
            <td>₹${totalSalary.toLocaleString("en-IN")}</td>
        `;
        table.appendChild(totalRow);

        box.appendChild(table);
        salaryDiv.appendChild(box);
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
    }

    // 🌴 LEAVE TABLE (Date + Purpose)
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

        let totalLeaves = 0;

        Object.values(data.Leaves).forEach(entry => {
            const row = document.createElement("tr");
            monthsMap[entry.Month][1] += 1;
            row.innerHTML = `
                <td >${entry.Date}</td>
                <td>${entry.Purpose}</td>
            `;
            table.appendChild(row);
            totalLeaves += 1; // count each leave
        });

        // Add total row
        const totalRow = document.createElement("tr");
        totalRow.classList.add("total-row");
        totalRow.innerHTML = `
            <td>Total</td>
            <td>${totalLeaves}</td>
        `;
        table.appendChild(totalRow);

        box.appendChild(table);
        leaveDiv.appendChild(box);
    } else {
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
    updateMonthCards(monthsMap);
// 
}
function updateMonthCards(monthlySummary) {
    const driverSalary = 16000;   // fixed base salary per month
    const allowedLeaves = 2;      // standard allowed leaves per month

   Object.keys(monthsMap).forEach(month => {
    const card = document.getElementById(`card-${month}`);
    // console.log(month);
        if (card) {
            const salaryEl = card.querySelector(".salary");
            const salarycut = card.querySelector(".cut-salary");
            const remainingSalaryEl = card.querySelector(".remaining-salary");
            const leavesEl = card.querySelector(".leaves");
            const remainingLeavesEl = card.querySelector(".remaining-leaves");
            const extraLeavesEl = card.querySelector(".extra-leaves");

            // 🧮 Core calculations
            const totalSalaryTaken = monthsMap[month][0];
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
            const perDaySalary = 534;

            // Calculate salary cut
            const salaryCutAmount = perDaySalary * extraLeaves;
            salarycut.textContent = `₹${salaryCutAmount.toLocaleString("en-IN")}`;

            // Calculate remaining salary after deduction
            const finalRemainingSalary = 16000-totalSalaryTaken - salaryCutAmount;
            remainingSalaryEl.textContent = `₹${finalRemainingSalary.toLocaleString("en-IN")}`;

        }
    });
}


