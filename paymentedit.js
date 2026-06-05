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
const db = getDatabase(app);

document.addEventListener("click", async function (e1) {
    // e1.preventDefault();
    if (e1.target && e1.target.className === "payment-edit-btn") {
        // alert("Payment edit clicked.");
        var modal = document.getElementById("myModal7");

        // Get the button that opens the modal
        var btnId = e1.target.id;
        let id = btnId.replaceAll('v', '');

        // Get the button element using the ID
        var btn = document.getElementById(btnId);

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `${DBConstants.DailyWorkDB}/${id}`);
        const snapshot = await get(dataRefget);
        var data;
        if (snapshot.exists()) {
            data = snapshot.val();
        }
        // console.log(data);
        let payment = data.Payment;
        var Contract = data.Contract;
        var Date = data.Date;
        var Ending = data.Ending;
        var Name = data.Name;
        // var PhoneNumber = data.PhoneNumber;
        var Disel = data.Disel;
        var Price = data.Price;
        // alert(data.Description);
        var desc = "--";
        if (data.Description != "undefined") {
            var desc = data.Description
        }

        // var Shift = data.Shift;
        var output = data.Drivers;
        var Starting = data.Starting;
        var TotalTime = data.TotalTime;
        var hrsamt = data.HoursPrice === "undefined" || data.HoursPrice === undefined ? 0 : data.HoursPrice;
        var trpamt = data.TripsPrice;
        var jcbtrpamt = data.JcbTripPrice;
        var Trips = data.Trips;
        var Villagename = data.Villagename;
        // alert(data.Beta==="undefined"?0:data.Beta);
        var beta = data.Beta === "undefined" || data.Beta === undefined ? 0 : data.Beta;
        var hourstrpamt = data.HoursTripsAmount === "undefined" || data.HoursTripsAmount === undefined ? 0 : data.HoursTripsAmount;
        var hoursdrivers = data.HoursDrivers === "undefined" || data.HoursDrivers === undefined ? 0 : data.HoursDrivers;
        var hourstrips = data.HoursTrips === "undefined" || data.HoursTrips === undefined ? 0 : data.HoursTrips;
        if (Trips === "--" && Contract === "--") {
            var worktype = "Hours";
        }
        else {
            if (Trips === "--" && Starting === "--") {
                var worktype = "Contract";
            }
            else {
                if (Starting === "--" && Contract === "--") {
                    var worktype = "Loading";
                }
            }
        }
        // alert(worktype);
        // var worktype="Contarct";
                document.getElementById("userForm").reset();

      document.getElementById("dat7").value = Date;

document.getElementById("wid7").value = id;

document.getElementById("name7").value = Name;

document.getElementById("vil7").value = Villagename;

document.getElementById("hrsrate7").value = hrsamt;

document.getElementById("dis7").value = Disel;

document.getElementById("con7").value = Contract;

document.getElementById("desc7").value = desc;

document.getElementById("stime7").value = Starting;

document.getElementById("etime7").value = Ending;

document.getElementById("ttime7").value = TotalTime;

document.getElementById("rate7").value = Price;

document.getElementById("trprate7").value = trpamt;

document.getElementById("jcbtrprate7").value = jcbtrpamt;

document.getElementById("trips7").value = Trips;

document.getElementById("output7").value = output;

document.getElementById("worktype7").value = worktype;

document.getElementById("pay7").value = payment;

document.getElementById("beta7").value = beta;

document.getElementById("trprate17").value = hourstrpamt;

document.getElementById("output17").value = hoursdrivers;

document.getElementById("trips17").value = hourstrips;

editData7();

editData17();

if (worktype == "Hours") {

    document.getElementById("loading7").style.display = "none";

    document.getElementById("contract7").style.display = "none";

    document.getElementById("hours7").style.display = "block";

    document.getElementById("loading17").style.display = "block";

}
else {

    if (worktype == "Loading") {

        document.getElementById("hours7").style.display = "none";

        document.getElementById("loading7").style.display = "block";

        document.getElementById("contract7").style.display = "none";

    }
    else {

        document.getElementById("hours7").style.display = "none";

        document.getElementById("loading7").style.display = "none";

        document.getElementById("contract7").style.display = "block";
    }
}
        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
})


function editData7() {

    const container =
        document.getElementById('container437');

    const rawText =
        document.getElementById('output7').value.trim();

    container.innerHTML = `
        <button type="button"
                class="add-button"
                onclick="addRow7()">
            Add Driver
        </button>
    `;

    const lines = rawText.split('\n');

    var nonpaytrips = 0;

    lines.forEach(line => {

        const [driver, trips] =
            line.split('=').map(item => item.trim());

        if (driver && trips) {

            if (driver.toLowerCase().includes("own")) {

                nonpaytrips += parseInt(trips);
            }

            const newRow =
                document.createElement('div');

            newRow.className = 'row7';

            newRow.innerHTML = `

                <input type="text"
                       placeholder="Driver Name"
                       name="driverName7[]"
                       value="${driver}"
                       onchange="removereadonly7()"
                       required>

                <input type="number"
                       placeholder="Trips"
                       name="trips7[]"
                       value="${trips}"
                       required
                       onkeyup="updateTotalTrips7()">

                <button type="button"
                        class="remove-button"
                        onclick="removeRow7(this)">
                        X
                </button>
            `;

            container.appendChild(newRow);
        }
    });

    document.getElementById("noncompanytractors7").value =
        nonpaytrips;
}




function editData17() {

    const container =
        document.getElementById('container21');

    const rawText =
        document.getElementById('output17').value.trim();

    container.innerHTML = `
        <button type="button"
                class="add-button"
                onclick="addRow17()">
            Add Driver
        </button>
    `;

    const lines = rawText.split('\n');

    var nonpaytrips = 0;

    lines.forEach(line => {

        const [driver, trips] =
            line.split('=').map(item => item.trim());

        if (driver && trips) {

            if (driver.toLowerCase().includes("own")) {

                nonpaytrips += parseInt(trips);
            }

            const newRow =
                document.createElement('div');

            newRow.className = 'row17';

            newRow.innerHTML = `

                <input type="text"
                       placeholder="Driver Name"
                       name="driverName17[]"
                       value="${driver}"
                       onchange="removereadonly7()"
                       required>

                <input type="number"
                       placeholder="Trips"
                       name="trips17[]"
                       value="${trips}"
                       required
                       onkeyup="updateTotalTrips17()">

                <button type="button"
                        class="remove-button"
                        onclick="removeRow17(this)">
                        X
                </button>
            `;

            container.appendChild(newRow);
        }

        document.getElementById(
            "hoursnoncompanytractors7"
        ).value = nonpaytrips;
    });
}



document.getElementById('submit8').addEventListener('click', async function (e) {
    e.preventDefault();
    // alert("Submit button clicked.");

   const dat = document.getElementById("dat7").value;

const wid = document.getElementById("wid7").value;

const name = document.getElementById("name7").value;

const villname = document.getElementById("vil7").value;

// const pno = document.getElementById("pno7").value;

const disel = document.getElementById("dis7").value;

var con = document.getElementById("con7").value;

var desc = document.getElementById("desc7").value;

var stime = document.getElementById("stime7").value;

var etime = document.getElementById("etime7").value;

var ttime = document.getElementById("ttime7").value;

const rate = document.getElementById("rate7").value;

var hrsamt = document.getElementById("hrsrate7").value;

var trpamt = document.getElementById("trprate7").value;

var jcbtrpamt = document.getElementById("jcbtrprate7").value;

var trips = document.getElementById("trips7").value;

var output = document.getElementById("output7").value;

var pay = document.getElementById("pay7").value;

const beta = document.getElementById("beta7").value;

var hourstrpamt = document.getElementById("trprate17").value;

var hoursdrivers = document.getElementById("output17").value;

var hourstrips = document.getElementById("trips17").value;

var hoursnoncompanytractors =
    document.getElementById("hoursnoncompanytractors7").value;

var noncompanytractors =
    document.getElementById("noncompanytractors7").value;

var overallamount = 0;
    // alert(trips+" "+con);
    if (trips.length > 0 && trips!=="--") {
        const jcb = parseInt(jcbtrpamt) || 0;
        const tripAmt = parseInt(trpamt) || 0;
        const tripCount = parseInt(trips) || 0;
        const b = parseInt(beta) || 0;

        overallamount = (jcb + tripAmt) * tripCount + b-(tripAmt * noncompanytractors);

    }
    else {
        // alert(trips+" "+con);
        if (con.length > 0 && con!=="--") {
            const c = parseInt(con) || 0;
            const b = parseInt(beta) || 0;

            overallamount = c + b;

        }
        else {
            const b = parseInt(beta) || 0;
            const r = parseInt(rate) || 0;
            const hAmt = parseInt(hourstrpamt) || 0;
            const hCnt = parseInt(hourstrips) || 0;
            const hoursnoncompanytractorstrips = parseInt(hoursnoncompanytractors) || 0;

            overallamount = b + r + (hAmt * hCnt)-((hAmt * hoursnoncompanytractorstrips));

        }
    }
    // alert(overallamount);
    if (stime.length === 0) {

        stime = "--";
        etime = "--";
        hrsamt = "--";
    }
    if (dat.length > 0) {
        if (name.length > 0) {
            if (villname.length > 0) {

                const db1 = DBConstants.DailyWorkDB;
                const db2 = "Work_Count";
                const db3 = "Work_Id";
                const w_id = ref(db, `${db2}`);
                const dataRefset = ref(db, `${db1}/${wid}`);
                var databasecount = ref(db, `${db2}/${db3}`);
                const snapshot = await get(databasecount);
                var workid = parseInt(snapshot.val());
                try {
                    if (workid == wid) {
                        await set(w_id, {
                            Work_Id: parseInt(wid) + 1
                        });
                    }
                    await set(dataRefset, {
                        Date: dat,
                        Name: name,
                        Villagename: villname,
                        PhoneNumber: "**",
                        Shift: "**",
                        Beta: beta,
                        HoursTrips: hourstrips,
                        HoursTripsAmount: hourstrpamt,
                        HoursDrivers: hoursdrivers,
                        Description: desc,
                        Contract: con,
                        Payment: pay,
                        Disel: disel,
                        Trips: trips,
                        Drivers: output,
                        HoursPrice: hrsamt,
                        TripsPrice: trpamt,
                        JcbTripPrice: jcbtrpamt,
                        OverallPrice: overallamount,
                        Starting: stime,
                        Ending: etime,
                        TotalTime: ttime,
                        Price: rate
                    });
                    document.getElementById("done7").style.display = "block";
                    removedone7();
                } catch (error) {
                    console.error("Error adding document: ", error);
                    alert("An error occurred. Please try again.");
                }


            }
            else {
                alert("Please Enter Village Name");
            }
        }
        else {
            alert("Please Enter Customer Name Or place Or Location Name");
        }
    }
    else {
        alert("Please Choose Date");
    }
});


