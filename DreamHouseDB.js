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


document.getElementById('submitBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    const id = document.getElementById("id");
    const date = document.getElementById("date");
    const amount = document.getElementById("amount");
    const payment = document.getElementById("payment");
    const payer = document.getElementById("payer");
    const ptype = document.getElementById("ptype");
    const desc = document.getElementById("desc");
    const DreamHouseDB = DBConstants.DreamHouseDB;
    // Remove old error styles
    [date, amount, payment, payer, desc].forEach(f => f.style.border = "1px solid #ddd");

    // Validation function
    function showError(field, message) {
        field.style.border = "2px solid red";
        field.focus();
        alert(message);
    }

    // Field-wise validation
    if (!date.value) {
        showError(date, "Please select Date");
        return;
    }

    if (!payment.value) {
        showError(payment, "Please select Payment Method");
        return;
    }

    if (!amount.value) {
        showError(amount, "Please enter Amount");
        return;
    }

    if (!payer.value) {
        showError(payer, "Please enter Payer name");
        return;
    }

    if (!ptype.value) {
        showError(ptype, "Please select Purpose Type");
        return;
    }

    if (!desc.value) {
        showError(desc, "Please enter Description");
        return;
    }

    // If all valid → save
    try {
        await set(ref(db, `${DreamHouseDB}/${id.value}`), {
            date: date.value,
            amount: amount.value,
            payment: payment.value,
            payer: payer.value,
            purposeType: ptype.value,
            description: desc.value
        });

        // Success popup
        const done = document.getElementById("done");
        done.style.display = "block";

        setTimeout(() => { done.style.display = "none"; }, 2000);

        // Clear form AFTER success
        document.getElementById("expenseForm").reset();

        // Generate new ID
        id.value = genId();

    } catch (error) {
        alert("❌ Error saving data");
    }
});


const DREAM_HOUSE_DB = DBConstants.DreamHouseDB;

// 🔥 ID GENERATION
function genId() {
    return "DH-" + new Date().getTime();
}
document.getElementById("id").value = genId();



// 🔥 RETRIEVE DATA
document.getElementById("retrieveBtn").addEventListener("click", async () => {
    const box = document.getElementById("tableContainer");
    const totalBox = document.getElementById("totalBox");

    box.innerHTML = `
<div class="loader">
    <div class="spinner"></div>
    <p>Loading expenses...</p>
</div>`;
    totalBox.innerHTML = "";

    try {
        const snap = await get(ref(db, DREAM_HOUSE_DB));

        if (!snap.exists()) {
            box.innerHTML = `
<div class="empty-state">
    <div class="empty-icon">🏡</div>
    <div class="empty-title">No Expenses Yet</div>
    <div class="empty-sub">Start adding your dream house expenses ✨</div>
</div>`;
            return;
        }

        let total = 0;

        let html = `<table>
<tr>
<th>ID</th>
<th>Date</th>
<th>Amount</th>
<th>Payment</th>
<th>Payer</th>
<th>Type</th>
<th>Description</th>
<th>Action</th>
</tr>`;

        Object.entries(snap.val()).forEach(([key, d]) => {
            const amt = parseFloat(d.amount) || 0;
            total += amt;

            html += `
    <tr>
        <td>${key}</td>
        <td>${d.date}</td>
        <td>₹${amt.toLocaleString("en-IN")}</td>
        <td>${d.payment}</td>
        <td>${d.payer}</td>
        <td>${d.purposeType}</td>
        <td>${d.description || ""}</td>
        <td>
            <button onclick="editRow('${key}')">✏️ Edit</button>
        </td>
    </tr>`;
        });

        html += "</table>";
        box.innerHTML = html;

        html += "</table>";
        box.innerHTML = html;

        // 🔥 TOTAL DISPLAY
        totalBox.innerHTML = `💰 Total Spent: ₹${total.toLocaleString("en-IN")}`;

    } catch (e) {
        box.innerHTML = "<div class='empty'>Error loading data</div>";
    }
});


// 🔥 OPEN EDIT MODAL
window.editRow = async function (id) {
    const snap = await get(ref(db, `${DREAM_HOUSE_DB}/${id}`));

    if (snap.exists()) {
        const d = snap.val();

        document.getElementById("editId").value = id;
        document.getElementById("editDate").value = d.date;
        document.getElementById("editAmount").value = d.amount;
        document.getElementById("editPayment").value = d.payment;
        document.getElementById("editPayer").value = d.payer;
        document.getElementById("editType").value = d.purposeType;
        document.getElementById("editDesc").value = d.description;

        document.getElementById("editModal").style.display = "flex";
    }
}

// 🔥 CLOSE MODAL
window.closeModal = function () {
    document.getElementById("editModal").style.display = "none";
}

// 🔥 UPDATE DATA
window.updateData = async function () {
    const id = document.getElementById("editId").value;

    await set(ref(db, `${DREAM_HOUSE_DB}/${id}`), {
        date: document.getElementById("editDate").value,
        amount: document.getElementById("editAmount").value,
        payment: document.getElementById("editPayment").value,
        payer: document.getElementById("editPayer").value,
        purposeType: document.getElementById("editType").value,
        description: document.getElementById("editDesc").value
    });

    closeModal();

    // 🔥 AUTO REFRESH TABLE
    document.getElementById("retrieveBtn").click();
}