import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import DBConstants from './DatabaseConstants.js';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "tractor-driver-data.firebaseapp.com",
    projectId: "tractor-driver-data",
    storageBucket: "tractor-driver-data.appspot.com",
    messagingSenderId: "688935767962",
    appId: "1:688935767962:web:d3d8d7569fd2470dfef423"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const JOINING_DATE = new Date(2026, 7, 6); // 06-August-2026

document.addEventListener('DOMContentLoaded', async () => {
    showProcessingPopup();
    renderMonthCardsSkeleton();
    enableMouseDragScroll();

    let driverData = {};
    let dailyWorkData = {};
    let noWorkDays = 0;

    try {
        // Fetch Driver Salary & Leave Data
        const driverPath = DBConstants.JcbDriverDB || "JcbDriverDB";
        const driverSnapshot = await get(ref(db, driverPath));

        if (driverSnapshot.exists()) {
            driverData = driverSnapshot.val() || {};
        }

        // Fetch Daily Work Data
        const dailyWorkPath = DBConstants.DailyWorkDB
            || "Daily Work-2026-2027";

        const dailyWorkSnapshot = await get(ref(db, dailyWorkPath));

        if (dailyWorkSnapshot.exists()) {
            dailyWorkData = dailyWorkSnapshot.val() || {};
        }

        // Calculate No Work Days using both datasets
        noWorkDays = calculateNoWorkDays(driverData, dailyWorkData);


        if (Object.keys(driverData).length > 0) {
            generateTable(driverData, noWorkDays);
        } else {
            showEmptyState(noWorkDays);
        }

    } catch (error) {
        console.error("Firebase Fetch Error:", error);
        showEmptyState(0);
    } finally {
        hideProcessingPopup();
    }
});


/* =========================================
   NO WORK DAYS CALCULATION
========================================= */

function calculateNoWorkDays(driverData, dailyWorkData) {

    // 1. Collect all dates on which daily work was recorded.
    const workDates = new Set();

    Object.values(dailyWorkData || {}).forEach(record => {

        if (record && record.Date) {

            const dateKey = normalizeDate(record.Date);

            if (dateKey) {
                workDates.add(dateKey);
            }
        }
    });

    // 2. Collect actual leave dates of this driver.
    const leaveDates = new Set();

    const leaves = driverData && driverData.Leaves
        ? driverData.Leaves
        : {};

    Object.values(leaves).forEach(leave => {

        if (leave && leave.Date) {

            const dateKey = normalizeDate(leave.Date);

            if (dateKey) {
                leaveDates.add(dateKey);
            }
        }
    });

    // 3. Check every date from joining date to today.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(JOINING_DATE);
    checkDate.setHours(0, 0, 0, 0);

    let totalNoWorkDays = 0;

    while (checkDate <= today) {

        const formattedDate = formatDateKey(checkDate);

        const hasWork = workDates.has(formattedDate);
        const isDriverOnLeave = leaveDates.has(formattedDate);

        // Count if:
        // A. No work was recorded on this date.
        // OR
        // B. This actual driver was on leave on this date.
        if (!hasWork || isDriverOnLeave) {
            totalNoWorkDays++;
        }

        checkDate.setDate(checkDate.getDate() + 1);
    }

    return totalNoWorkDays;
}


// Convert any supported date value into YYYY-MM-DD.
function normalizeDate(value) {

    if (!value) return null;

    const dateString = String(value).trim().split('T')[0];

    // Already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }

    // DD-MM-YYYY
    const dmy = dateString.match(/^(\d{2})-(\d{2})-(\d{4})$/);

    if (dmy) {
        return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;
    }

    // DD/MM/YYYY
    const slashDate = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (slashDate) {
        return `${slashDate[3]}-${slashDate[2]}-${slashDate[1]}`;
    }

    return null;
}


// Format JavaScript Date into YYYY-MM-DD.
function formatDateKey(date) {

    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}


/* =========================================
   LOADER
========================================= */

function showProcessingPopup() {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.style.display = 'flex';
}

function hideProcessingPopup() {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.style.display = 'none';
}


/* =========================================
   MONTH CARDS
========================================= */

function renderMonthCardsSkeleton() {

    const wrapper = document.getElementById("monthGridView");
    if (!wrapper) return;

    wrapper.innerHTML = monthOrder.map(month => `
        <div class="month-card-view" id="card-${month}">
            <h3>${month}</h3>

            <div class="month-item">
                Salary Taken:
                <span class="salary">₹0</span>
            </div>

            <div class="month-item">
                Leaves Taken:
                <span class="leaves total-leaves">0</span>
            </div>

            <div class="month-item">
                Allowed Leaves:
                <span>2</span>
            </div>

            <div class="month-item">
                Remaining Leaves:
                <span class="remaining-leaves">2</span>
            </div>

            <div class="month-item">
                Extra Leaves:
                <span class="extra-leaves">0</span>
            </div>

            <div class="month-item">
                Salary Cut:
                <span class="cut-salary">₹0</span>
            </div>

            <div class="month-item">
                Total Salary:
                <span class="total-salary">₹0</span>
            </div>

            <div class="month-item">
                Remaining Balance:
                <span class="remaining-salary">₹23,000</span>
            </div>
        </div>
    `).join('');
}


/* =========================================
   EMPTY STATE
========================================= */

function showEmptyState(noWorkDays = 0) {

    const salaryDiv = document.getElementById("salaryTableContainer");
    const leaveDiv = document.getElementById("leaveTableContainer");

    const message = `
        <div class="empty-state-box">
            No records found for this driver.
        </div>
    `;

    if (salaryDiv) salaryDiv.innerHTML = message;
    if (leaveDiv) leaveDiv.innerHTML = message;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const joiningDate = new Date(JOINING_DATE);
    joiningDate.setHours(0, 0, 0, 0);

    const totalElapsed = today >= joiningDate
        ? Math.floor((today - joiningDate) / (1000 * 60 * 60 * 24)) + 1
        : 0;

    resetSummaryMetrics(totalElapsed, 0, 0, noWorkDays);
}


/* =========================================
   GENERATE SALARY AND LEAVE TABLES
========================================= */

function generateTable(data, noWorkDays = 0) {

    const monthsMap = {};

    monthOrder.forEach(month => {
        monthsMap[month] = [0, 0];
    });

    const salaryDiv = document.getElementById("salaryTableContainer");
    const leaveDiv = document.getElementById("leaveTableContainer");

    if (salaryDiv) salaryDiv.innerHTML = "";
    if (leaveDiv) leaveDiv.innerHTML = "";

    // Group Leave Data
    const leaveGroups = {};

    if (data.Leaves) {

        Object.values(data.Leaves).forEach(entry => {

            if (entry && entry.Month && monthsMap[entry.Month]) {

                monthsMap[entry.Month][1]++;

                if (!leaveGroups[entry.Month]) {
                    leaveGroups[entry.Month] = [];
                }

                leaveGroups[entry.Month].push(entry);
            }
        });
    }

    // Group Salary Data
    const salaryGroups = {};

    if (data.Salary) {

        Object.values(data.Salary).forEach(entry => {

            if (entry && entry.Month && monthsMap[entry.Month]) {

                const salaryVal = parseFloat(entry.Salary) || 0;

                monthsMap[entry.Month][0] += salaryVal;

                if (!salaryGroups[entry.Month]) {
                    salaryGroups[entry.Month] = [];
                }

                salaryGroups[entry.Month].push(entry);
            }
        });
    }

    const driverSalary = 23000;
    const allowedLeaves = 2;
    const perDaySalary = Math.round(driverSalary / 30);

    let grandTotalPaid = 0;
    let grandTotalLeaves = 0;

    // Salary Table
    if (
        (data.Salary && Object.keys(data.Salary).length > 0) ||
        (data.Leaves && Object.keys(data.Leaves).length > 0)
    ) {

        const box = document.createElement("div");
        box.className = "table-box";

        const title = document.createElement("div");
        title.className = "table-title";
        title.innerHTML = "💰 Salary Payment Log";

        box.appendChild(title);

        const scrollContainer = document.createElement("div");
        scrollContainer.className = "table-scroll-container";

        const table = document.createElement("table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Purpose</th>
                    <th>Amount (₹)</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        monthOrder.forEach(month => {

            const salaryEntries = salaryGroups[month] || [];
            const leaveEntries = leaveGroups[month] || [];

            if (
                salaryEntries.length === 0 &&
                leaveEntries.length === 0
            ) {
                return;
            }

            const monthHeader = document.createElement("tr");
            monthHeader.className = "month-header-row";

            monthHeader.innerHTML = `
                <td colspan="4">
                    ${month} (6th - 5th Cycle)
                </td>
            `;

            tbody.appendChild(monthHeader);

            let monthPaidTotal = 0;

            salaryEntries.forEach(entry => {

                const amount = parseFloat(entry.Salary) || 0;

                monthPaidTotal += amount;

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td style="white-space: nowrap;">
                        ${formatDate(entry.Date)}
                    </td>

                    <td>${entry.PaymentMethod || 'PhonePe'}</td>

                    <td>${entry.Purpose || 'Salary Payment'}</td>

                    <td style="font-weight: 600; color: var(--success);">
                        ₹${amount.toLocaleString("en-IN")}
                    </td>
                `;

                tbody.appendChild(row);
            });

            // Salary Cut Calculation
            const totalLeaves = monthsMap[month][1];

            const extraLeaves = Math.max(
                0,
                totalLeaves - allowedLeaves
            );

            const salaryCut = extraLeaves * perDaySalary;

            if (salaryCut > 0) {

                const cutRow = document.createElement("tr");

                cutRow.innerHTML = `
                    <td colspan="3"
                        style="color: var(--danger); font-weight: 600;">
                        Salary Cut (${extraLeaves} Extra Leave${extraLeaves > 1 ? "s" : ""})
                    </td>

                    <td style="color: var(--danger); font-weight: 700;">
                        ₹${salaryCut.toLocaleString("en-IN")}
                    </td>
                `;

                tbody.appendChild(cutRow);
            }

            const finalMonthTotal = monthPaidTotal + salaryCut;

            grandTotalPaid += finalMonthTotal;

            const subtotalRow = document.createElement("tr");

            subtotalRow.innerHTML = `
                <td colspan="3"
                    style="font-weight: 700; color: #a5b4fc;">
                    ${month} Total Effective Deduction
                </td>

                <td style="font-weight: 700; color: #a5b4fc;">
                    ₹${finalMonthTotal.toLocaleString("en-IN")}
                </td>
            `;

            tbody.appendChild(subtotalRow);
        });

        const totalRow = document.createElement("tr");
        totalRow.className = "total-row";

        totalRow.innerHTML = `
            <td colspan="3">Overall Total</td>

            <td style="color: var(--success);">
                ₹${grandTotalPaid.toLocaleString("en-IN")}
            </td>
        `;

        tbody.appendChild(totalRow);

        scrollContainer.appendChild(table);
        box.appendChild(scrollContainer);

        if (salaryDiv) {
            salaryDiv.appendChild(box);
        }

    } else if (salaryDiv) {

        salaryDiv.innerHTML = `
            <div class="empty-state-box">
                No Salary Records Found
            </div>
        `;
    }


    // Leave Table
    if (data.Leaves && Object.keys(data.Leaves).length > 0) {

        const box = document.createElement("div");
        box.className = "table-box";

        const title = document.createElement("div");
        title.className = "table-title";
        title.innerHTML = "🌴 Leave History";

        box.appendChild(title);

        const scrollContainer = document.createElement("div");
        scrollContainer.className = "table-scroll-container";

        const table = document.createElement("table");

        table.innerHTML = `
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Purpose</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const tbody = table.querySelector("tbody");

        monthOrder.forEach(month => {

            const leaveEntries = leaveGroups[month] || [];

            if (leaveEntries.length === 0) return;

            const monthHeader = document.createElement("tr");
            monthHeader.className = "month-header-row";

            monthHeader.innerHTML = `
                <td colspan="2">
                    ${month} (6th - 5th Cycle)
                </td>
            `;

            tbody.appendChild(monthHeader);

            leaveEntries.forEach(entry => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td style="white-space: nowrap;">
                        ${formatDate(entry.Date)}
                    </td>

                    <td>${entry.Purpose || 'Personal Work'}</td>
                `;

                tbody.appendChild(row);

                grandTotalLeaves++;
            });

            const subtotalRow = document.createElement("tr");

            subtotalRow.innerHTML = `
                <td style="font-weight: 700; color: var(--warning);">
                    ${month} Total Leaves
                </td>

                <td style="font-weight: 700; color: var(--warning);">
                    ${leaveEntries.length}
                </td>
            `;

            tbody.appendChild(subtotalRow);
        });

        const totalRow = document.createElement("tr");
        totalRow.className = "total-row";

        totalRow.innerHTML = `
            <td>Overall Leaves</td>

            <td style="color: var(--warning);">
                ${grandTotalLeaves} Days
            </td>
        `;

        tbody.appendChild(totalRow);

        scrollContainer.appendChild(table);
        box.appendChild(scrollContainer);

        if (leaveDiv) {
            leaveDiv.appendChild(box);
        }

    } else if (leaveDiv) {

        leaveDiv.innerHTML = `
            <div class="empty-state-box">
                No Leave Records Found
            </div>
        `;
    }

    // Update Month Cards
    updateMonthCards(monthsMap);

    // Calculate Total Elapsed Days
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const joiningDate = new Date(JOINING_DATE);
    joiningDate.setHours(0, 0, 0, 0);

    const totalElapsed = today >= joiningDate
        ? Math.floor((today - joiningDate) / (1000 * 60 * 60 * 24)) + 1
        : 0;

    // Update all Summary Metrics
    resetSummaryMetrics(
        totalElapsed,
        grandTotalPaid,
        grandTotalLeaves,
        noWorkDays
    );
}


/* =========================================
   UPDATE MONTH CARDS
========================================= */

function updateMonthCards(monthsMap) {

    const driverSalary = 23000;
    const allowedLeaves = 2;
    const perDaySalary = Math.round(driverSalary / 30);

    Object.keys(monthsMap).forEach(month => {

        const card = document.getElementById(`card-${month}`);

        if (card) {

            const salaryEl = card.querySelector(".salary");
            const totalsalaryEl = card.querySelector(".total-salary");
            const salarycut = card.querySelector(".cut-salary");
            const remainingSalaryEl = card.querySelector(".remaining-salary");
            const leavesEl = card.querySelector(".total-leaves");
            const remainingLeavesEl = card.querySelector(".remaining-leaves");
            const extraLeavesEl = card.querySelector(".extra-leaves");

            const totalSalaryTaken = monthsMap[month][0];
            const totalLeaves = monthsMap[month][1];

            const extraLeaves = Math.max(
                0,
                totalLeaves - allowedLeaves
            );

            const remainingLeaves = Math.max(
                0,
                allowedLeaves - totalLeaves
            );

            const salaryCutAmount = perDaySalary * extraLeaves;

            const totalEffectiveSalary =
                totalSalaryTaken + salaryCutAmount;

            const finalRemainingSalary =
                driverSalary - totalEffectiveSalary;

            if (salaryEl) {
                salaryEl.textContent =
                    `₹${totalSalaryTaken.toLocaleString("en-IN")}`;
            }

            if (leavesEl) {
                leavesEl.textContent = `${totalLeaves}`;
            }

            if (remainingLeavesEl) {
                remainingLeavesEl.textContent = `${remainingLeaves}`;
            }

            if (extraLeavesEl) {
                extraLeavesEl.textContent = `${extraLeaves}`;
            }

            if (salarycut) {
                salarycut.textContent =
                    `₹${salaryCutAmount.toLocaleString("en-IN")}`;
            }

            if (totalsalaryEl) {
                totalsalaryEl.textContent =
                    `₹${totalEffectiveSalary.toLocaleString("en-IN")}`;
            }

            if (remainingSalaryEl) {
                remainingSalaryEl.textContent =
                    `₹${finalRemainingSalary.toLocaleString("en-IN")}`;
            }
        }
    });
}


/* =========================================
   SUMMARY METRICS
========================================= */

function resetSummaryMetrics(
    daysWorked,
    totalSalary,
    totalLeaves,
    noWorkDays = 0
) {

    const daysEl = document.getElementById("summaryDaysWorked");
    const salaryEl = document.getElementById("summarySalary");
    const leavesEl = document.getElementById("summaryLeaves");
    const noWorkEl = document.getElementById("summaryNoWorkDays");

    if (daysEl) {
        daysEl.textContent = `${daysWorked} Days`;
    }

    if (salaryEl) {
        salaryEl.textContent =
            `₹${totalSalary.toLocaleString("en-IN")}`;
    }

    if (leavesEl) {
        leavesEl.textContent = `${totalLeaves} Days`;
    }

    if (noWorkEl) {
        noWorkEl.textContent = `${noWorkDays-totalLeaves} Days`;
    }
}


/* =========================================
   MOUSE DRAG SCROLL
========================================= */

function enableMouseDragScroll() {

    const slider = document.getElementById('monthGridView');

    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {

        isDown = true;

        startX = e.pageX - slider.offsetLeft;

        scrollLeft = slider.scrollLeft;

        slider.style.cursor = 'grabbing';
    });

    slider.addEventListener('mouseleave', () => {

        isDown = false;

        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {

        isDown = false;

        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {

        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;

        const walk = (x - startX) * 2;

        slider.scrollLeft = scrollLeft - walk;
    });
}


/* =========================================
   DATE FORMATTING
========================================= */

function formatDate(dateString) {

    if (!dateString) return "N/A";

    const normalized = normalizeDate(dateString);

    if (normalized) {

        const [year, month, day] = normalized.split("-");

        return `${day}-${month}-${year}`;
    }

    return dateString;
}