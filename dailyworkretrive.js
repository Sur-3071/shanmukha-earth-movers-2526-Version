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
// Get a reference to the database service
document.getElementById("submit2").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    var d1 = document.getElementById("search");
    var n = document.getElementById("search");
    n.value = "";
    d1.style.display = "block";
    RePrint();
    // Get the value from the input field

});

async function RePrint() {
    // var dat = document.getElementById("dat1").value.trim();
    // Validate the input (optional)

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, DBConstants.DailyWorkDB);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            generateTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data 2730936");
    }
}
document.getElementById("search").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    RePrintSearch();

});

async function RePrintSearch() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, DBConstants.DailyWorkDB);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            SearchTable(data);

        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}

let extraAmountsCache = {}; // Example: { "Suresh": 1200, "Ravi": 0 }

async function loadAllExtraAmountsOnce() {
    const db1 = DBConstants.CustomersAmount;
    const customersRef = ref(db, db1);

    try {
        const snapshot = await get(customersRef);

        if (!snapshot.exists()) {
            extraAmountsCache = {};
            return;
        }

        const data = snapshot.val();
        const cache = {};

        // Build map { username: amount }
        for (const name in data) {
            const customer = data[name];
            cache[name] = customer.ExtraAmount || 0;
        }

        extraAmountsCache = cache; // assign final structure

    } catch (error) {
        console.error("Error loading ExtraAmounts:", error);
        extraAmountsCache = {};
    }
}
function getCachedExtraAmount(name) {
    return extraAmountsCache[name] || 0;
}

await loadAllExtraAmountsOnce();


function generateTable(data) {
    // Get today's date
    const today = new Date();

    // Extract year, month, and day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month
    const day = String(today.getDate()).padStart(2, '0'); // Ensures 2-digit day

    // Print today's date in YYYY-MM-DD format
    var collection = 0;
    var recovery = 0;
    let out = `<table border="1px" class="wide-table">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize1">Description</th>
            <th id="csize">Disel</th>
            <th id="csize">Trips</th>
            <th id="csize2">Drivers</th>
            <th id="csize">Trips Price</th>
            <th id="csize">JCB Trips Price</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">HoursPrice</th>
            <th id="csize">Driver Beta</th>
            <th id="csize">Payment Status</th>
            <th id="csize">Edit Data</th>
            <th id="csize">Jcb Price</th>
            <th id="csize">Jcb Recovery Amount</th>
            <th id="csize">Overall Price</th>
            <th id="csize">Overall Recovery Amount</th>
        </tr>`;
    var l = [];
    var workday = 0;
    var totaltime = 0;
    var hou = 0;
    var mint = 0;
    var totaltrips = 0;
    var totalcontarct = 0;
    var disel = 0;
    // alert("1");
    var overallcollection = 0;
    var overallrecoveryamount = 0;
    const processedCustomers = new Set();
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            disel += parseInt(activity.Disel)
            var editid = customerPhone + "v";
            collection += parseInt(activity.Price);
            var amount = activity.Payment === "Paid" ? 0 : activity.Price;
            var overallrecovery = activity.Payment === "Paid" ? 0 : activity.OverallPrice;
            var balanaceamount = 0;
            var customerName = activity.Name;
            var HoursDrivers = 0;
            if (activity.HoursDrivers !== undefined && activity.HoursDrivers !== "undefined" && activity.HoursDrivers !== null) {
                let str = activity.HoursDrivers || "";
                // alert(str);
                let count = 0;

                for (let i = 0; i < str.length; i++) {
                    if (str[i] === "=") {
                        count++;
                    }
                }

                if (count > 1) {

                    let arr = str.split(" ").filter(Boolean);
                    // console.log(arr);
                    let result = "";

                    for (let i = 0; i < arr.length; i += 3) {
                        if (arr[i] && arr[i + 2]) {       // <— check before adding
                            result += arr[i] + " = " + arr[i + 2] + "\n";
                        }
                    }
                    // console.log(result);

                    result = result.replace(/\n/g, "<br>");
                    HoursDrivers = result;

                }
                else {
                    HoursDrivers = str;
                }

            }
            // console.log(activity.Drivers);
            var LDrivers = 0;
            if (activity.Drivers !== undefined) {
                let str = activity.Drivers;
                let count1 = 0;

                for (let i = 0; i < str.length; i++) {
                    if (str[i] === "=") {
                        count1++;
                    }
                }
                if (count1 > 1) {
                    // alert("yes more then two drivers");
                    let arr = str.split(" ").filter(Boolean);
                    let result = "";

                    for (let i = 0; i < arr.length; i += 3) {
                        if (arr[i] && arr[i + 2]) {       // <— check before adding
                            result += arr[i] + " = " + arr[i + 2] + "\n";
                        }
                    }

                    result = result.replace(/\n/g, "<br>");
                    LDrivers = result;
                }
                else {
                    LDrivers = str;
                }
            }
            if (!processedCustomers.has(customerName) && activity.Payment === "UnPaid") {

                balanaceamount = getCachedExtraAmount(customerName);
                processedCustomers.add(customerName);
                if (amount < parseInt(balanaceamount)) {
                    amount = 0;
                }
                else {
                    amount = parseInt(amount) - parseInt(balanaceamount);
                }
                overallrecovery = parseInt(overallrecovery) - parseInt(balanaceamount);
            }
            recovery += parseInt(amount);
            overallrecoveryamount += parseInt(overallrecovery);


            if (activity.Trips !== "--") {
                totaltrips += parseInt(activity.Trips);
            }
            if (activity.Contract !== "--") {
                totalcontarct += parseInt(activity.Contract);
            }
            // alert("4.5");
            if (activity.Starting !== "--") {
                var timesplit = activity.TotalTime;
                var v = timesplit.split(':');
                hou += parseInt(v[0]);
                mint += parseInt(v[1]);
            }
            // alert("5");

            if (!l.includes(activity.Date)) {
                workday += 1;
                l.push(activity.Date);
            }
            // if(customerPhone==="206")
            // {
            //     alert(activity.Drivers);
            // }
            const payment = activity.Payment.trim().toLowerCase();

            // Determine color based on payment
            let bgColor = "";
            if (payment === "paid") {
                bgColor = "green";
            } else if (payment === "unpaid") {
                bgColor = "red";
            }
            var totalamount = parseInt(activity.Price);
            // if (activity.Beta !== undefined && activity.Beta !== "undefined" && activity.Beta !== null) {
            //     amount=parseInt(amount)+parseInt(activity.Beta);
            // }
            var beta = activity.Beta === "undefined" || activity.Beta === undefined || activity.Beta === "undefined" ? 0 : activity.Beta
            // console.log(beta);
            var drivers = "";
            var tripamount = "";
            var jcbtripamount = "--";
            var totaltractortrips = 0;
            if (activity.Drivers === "--") {
                drivers = HoursDrivers;
                totaltractortrips = activity.HoursTrips;
                tripamount = activity.HoursTripsAmount
            }
            else {
                drivers = LDrivers;
                tripamount = activity.TripsPrice;
                jcbtripamount = activity.JcbTripPrice;
                totaltractortrips = activity.Trips;
            }
            // console.log()
            var overallpricemoney = isNaN(activity.OverallPrice) || activity.OverallPrice === undefined ? activity.Price : activity.OverallPrice;

            overallcollection += parseInt(overallpricemoney);
            const originalDate = new Date(activity.Date);

            const day = String(originalDate.getDate()).padStart(2, '0');
            const month = String(originalDate.getMonth() + 1).padStart(2, '0');
            const year = originalDate.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;

            out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${formattedDate}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Description}</td>
                        <td>${activity.Disel}</td>
                        <td>${totaltractortrips}</td>
                        <td>${drivers}</td>
                        <td>${tripamount}</td>
                        <td>${jcbtripamount}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td>${activity.HoursPrice}</td>
                        <td>${beta}</td>
                        <td><button type="button" class="pay" id="${customerPhone}"
            style="background-color: ${bgColor}; color: white; padding: 5px 12px; border: none; border-radius: 5px; font-weight: bold;">
            ${activity.Payment}</td>                        
                        <td><button type="button" id=${editid} class="edit">Edit</button></td>
                        <td>${totalamount}</td>
                        <td>${amount}</td>
                        <td>${overallpricemoney}</td>
                        <td>${overallrecovery}</td>
                    </tr>`;







        }
    }
    var mintohou = parseInt(mint / 60);
    mint = mint - 60 * mintohou;
    hou += mintohou;
    totaltime = hou + ":" + mint;
    out += `<tr>
    <td colspan="5" id="col">Total Work Analaysis</td>
    <td id="am">${disel}</td>
    <td  id="am">${totaltrips}</td>
    <td colspan="3" id="col">Drivers</td>
    <td id="am">${totalcontarct}</td>
    <td id="am" colspan="4">${totaltime}</td>
    <td id="am" colspan="3">Work In Price</td>
    <td id="am">${collection}</td>
    <td id="am">${recovery}</td>
    <td id="am">${overallcollection}</td>
    <td id="am">${overallrecoveryamount}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
    const sortedDates = l.sort((a, b) => new Date(a) - new Date(b));
    var dat1 = sortedDates[0];
    var dat2 = year + "-" + month + "-" + day;
    const date1 = new Date(dat1);
    const date2 = new Date(dat2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;
    // Convert the difference to days
    const differenceInDays = (differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    let led = `<table border="1px">
     <tr>
        <th id="bal1">Total Work</th>
        <th id="bal1">Collected Money</th>
        <th id="bal1">Recovery Money</th>
        <th id="bal1">Total Days</th>
        <th id="bal1">Working Days</th>
        <th id="bal1">Holidays</th>
        <th id="bal1">Oil</th>
        <th id="bal1">Maintainance</th>
        <th id="bal1">JCB EMI</th>
        <th id="bal1">Home Expenses</th>
        <th id="bal1">Salary</th>
        <th id="bal1">Profit</th>

    </tr>`;
    var pro = collection - (disel) - (differenceInDays * 3700);
    led += `<tr>
    <td class="lsize">${collection}</td>
    <td>${collection - recovery}</td>
    <td>${recovery}</td>
    <td>${differenceInDays}</td>
    <td>${workday}</td>
    <td>${differenceInDays - workday}</td>
    <td>${disel}</td>
    <td>${differenceInDays * 400}</td>
    <td>${differenceInDays * 1800}</td>
    <td>${differenceInDays * 665}</td>
    <td>${differenceInDays * 835}</td>
    <td>${pro}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger").innerHTML = led;
}

document.addEventListener("click", async function (e1) {
    // e1.preventDefault();
    if (e1.target && e1.target.className === "edit") {
        var modal = document.getElementById("myModal");

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

        document.getElementById("dat").value = Date;
        document.getElementById("wid").value = id;
        document.getElementById("name").value = Name;
        document.getElementById("vil").value = Villagename;
        document.getElementById("hrsrate").value = hrsamt;
        document.getElementById("dis").value = Disel;
        document.getElementById("con").value = Contract;
        document.getElementById("desc").value = desc;
        document.getElementById("stime").value = Starting
        document.getElementById("etime").value = Ending;
        document.getElementById("ttime").value = TotalTime;
        document.getElementById("rate").value = Price;
        document.getElementById("trprate").value = trpamt;
        document.getElementById("jcbtrprate").value = jcbtrpamt;
        document.getElementById("trips").value = Trips;
        document.getElementById("output").value = output;
        document.getElementById("worktype").value = worktype;
        document.getElementById("pay").value = payment;
        document.getElementById("beta").value = beta;
        document.getElementById("trprate1").value = hourstrpamt;
        document.getElementById("output1").value = hoursdrivers;
        document.getElementById("trips1").value = hourstrips;
        editData();
        editData1();
        if (worktype == "Hours") {
            document.getElementById("loading").style.display = "none";
            document.getElementById("contract").style.display = "none";
            document.getElementById("hours").style.display = "block";
            document.getElementById("loading1").style.display = "block"
        }
        else {
            if (worktype == "Loading") {
                document.getElementById("hours").style.display = "none";
                document.getElementById("loading").style.display = "block";
                document.getElementById("contract").style.display = "none";
            }
            else {
                document.getElementById("hours").style.display = "none";
                document.getElementById("loading").style.display = "none";
                document.getElementById("contract").style.display = "block";
            }
        }
        // RePrintSearch();
        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
            RePrintSearch();
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                RePrintSearch();
            }
        }
    }
})
function editData() {
    // preventDefault();
    const container = document.getElementById('container43');
    const rawText = document.getElementById('output').value.trim();
    container.innerHTML = `<button class="add-button" onclick="addRow()">Add Driver</button>`;

    const lines = rawText.split('\n');
    var nonpaytrips = 0;
    lines.forEach(line => {
        const [driver, trips] = line.split('=').map(item => item.trim());

        if (driver && trips) {
            if(driver.toLowerCase().includes("own")) {
                nonpaytrips += parseInt(trips);
            }
            const newRow = document.createElement('div');
            newRow.className = 'row';
            newRow.innerHTML = `
        <input type="text" placeholder="Driver Name" name="driverName[]" value="${driver}" onchange="removereadonly()" required>
        <input type="number" placeholder="Trips" name="trips[]" value="${trips}"  required onkeyup="updateTotalTrips()">
        <button class="remove-button" onclick="removeRow(this)">X</button>
      `;
            container.appendChild(newRow);
        }
    });
    document.getElementById("noncompanytractors").value = nonpaytrips;
}

function editData1() {
    // preventDefault();
    const container = document.getElementById('container2');
    const rawText = document.getElementById('output1').value.trim();
    container.innerHTML = `<button class="add-button" onclick="addRow1()">Add Driver</button>`;

    const lines = rawText.split('\n');
    var nonpaytrips = 0;
    lines.forEach(line => {
        const [driver, trips] = line.split('=').map(item => item.trim());

        if (driver && trips) {
             if(driver.toLowerCase().includes("own")) {
                nonpaytrips += parseInt(trips);
            }
            const newRow = document.createElement('div');
            newRow.className = 'row1';
            newRow.innerHTML = `
        <input type="text" placeholder="Driver Name" name="driverName1[]" value="${driver}" onchange="removereadonly()" required>
        <input type="number" placeholder="Trips" name="trips1[]" value="${trips}"  required onkeyup="updateTotalTrips1()">
        <button class="remove-button" onclick="removeRow1(this)">X</button>
      `;
            container.appendChild(newRow);
        }
        document.getElementById("hoursnoncompanytractors").value = nonpaytrips;
    });
}

function SearchTable(data) {
    var d = document.getElementById("ledger");
    var name = document.getElementById("search").value.trim();
    // console.log(name.length);

    if (name.length > 0) {
        d.style.display = "none";

        var collection = 0, recovery = 0;
        var overaldueamountrecovery = 0;
        var totalhou = 0, totalmint = 0;
        var totaltrips = 0, totalcontarct = 0, disel = 0;
        var overallcollections = 0;

        let out = `<table border="1px">
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize1">Description</th>
            <th id="csize">Disel</th>
            <th id="csize">Trips</th>
            <th id="csize2">Drivers</th>
            <th id="csize">Trips Price</th>
            <th id="csize">JCB Trips Price</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">HoursPrice</th>
            <th id="csize">Driver Beta</th>
            <th id="csize">Payment Status</th>
            <th id="csize">Edit Data</th>
            <th id="csize">Jcb Price</th>
            <th id="csize">Jcb Recovery Amount</th>
            <th id="csize">Overall Price</th>
            <th id="csize">Overall Recovery Amount</th>
        </tr>`;

        // Group by Name
        let groupedData = {};
        const processedCustomers = new Set();
        for (const customerPhone in data) {
            if (data.hasOwnProperty(customerPhone)) {
                const activity = data[customerPhone];
                if (
                    activity.Name.includes(name) ||
                    activity.Villagename.includes(name) ||
                    activity.Payment === name
                ) {
                    if (!groupedData[activity.Name]) {
                        groupedData[activity.Name] = [];
                    }
                    groupedData[activity.Name].push({ id: customerPhone, activity });
                }
            }
        }

        // ✅ Sort Names A–Z
        const sortedNames = Object.keys(groupedData).sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
        );

        // Loop through sorted names
        sortedNames.forEach(personName => {
            const entries = groupedData[personName];

            // ✅ Sort person's entries by Date
            entries.sort((a, b) => new Date(a.activity.Date) - new Date(b.activity.Date));

            // Subtotals
            let subDisel = 0, subTrips = 0, subContract = 0, subPrice = 0, subRecovery = 0;
            let subHou = 0, subMint = 0;
            var overaldueamountsubrecovery = 0;
            var overallsubcollections = 0;

            // Header row for person
            out += `<tr><td colspan="22" style="background-color:#e0e0e0; font-weight:bold;">${personName}</td></tr>`;

            entries.forEach(entry => {
                const customerPhone = entry.id;
                const activity = entry.activity;

                const thisDisel = parseInt(activity.Disel || 0);
                const thisPrice = parseInt(activity.Price || 0);
                const thisoverallPrice = parseInt(activity.OverallPrice || 0);
                const thisTrips = activity.Trips !== "--" ? parseInt(activity.Trips) : 0;
                const thisContract = activity.Contract !== "--" ? parseInt(activity.Contract) : 0;

                disel += thisDisel;
                collection += thisPrice;
                totaltrips += thisTrips;
                totalcontarct += thisContract;

                subDisel += thisDisel;
                subPrice += thisPrice;
                subTrips += thisTrips;
                subContract += thisContract;

                if (activity.Starting !== "--") {
                    const v = activity.TotalTime.split(':');
                    const h = parseInt(v[0]);
                    const m = parseInt(v[1]);
                    totalhou += h;
                    totalmint += m;
                    subHou += h;
                    subMint += m;
                }

                const payment = activity.Payment.trim().toLowerCase();
                const bgColor = payment === "paid" ? "green" : (payment === "unpaid" ? "red" : "");

                var amount = activity.Payment === "Paid" ? 0 : thisPrice;
                var overalldueamount = activity.Payment === "Paid" ? 0 : thisoverallPrice;
                // alert("Iam coming..");
                var customerName = personName;
                var balanaceamount = 0;
                if (!processedCustomers.has(customerName) && activity.Payment === "UnPaid") {

                    balanaceamount = getCachedExtraAmount(customerName);
                    processedCustomers.add(customerName);
                    if (amount < parseInt(balanaceamount)) {
                        amount = 0;
                    }
                    else {
                        amount = parseInt(amount) - parseInt(balanaceamount);
                    }
                    overalldueamount = parseInt(overalldueamount) - parseInt(balanaceamount);
                }
                overaldueamountrecovery += overalldueamount;
                overaldueamountsubrecovery += isNaN(overalldueamount) ? 0 : overalldueamount;
                overallsubcollections += isNaN(activity.OverallPrice) ? 0 : activity.OverallPrice;


                var LDrivers = 0;
                var HoursDrivers = 0;
                if (activity.HoursDrivers !== undefined && activity.HoursDrivers !== "undefined" && activity.HoursDrivers !== null) {
                    let str = activity.HoursDrivers || "";
                    // alert(str);
                    let count = 0;

                    for (let i = 0; i < str.length; i++) {
                        if (str[i] === "=") {
                            count++;
                        }
                    }

                    if (count > 1) {

                        let arr = str.split(" ").filter(Boolean);
                        // console.log(arr);
                        let result = "";

                        for (let i = 0; i < arr.length; i += 3) {
                            if (arr[i] && arr[i + 2]) {       // <— check before adding
                                result += arr[i] + " = " + arr[i + 2] + "\n";
                            }
                        }
                        // console.log(result);

                        result = result.replace(/\n/g, "<br>");
                        HoursDrivers = result;

                    }
                    else {
                        HoursDrivers = str;
                    }

                }
                // console.log(activity.Drivers);
                var LDrivers = 0;
                if (activity.Drivers !== undefined) {
                    let str = activity.Drivers;
                    let count1 = 0;

                    for (let i = 0; i < str.length; i++) {
                        if (str[i] === "=") {
                            count1++;
                        }
                    }
                    if (count1 > 1) {
                        // alert("yes more then two drivers");
                        let arr = str.split(" ").filter(Boolean);
                        let result = "";

                        for (let i = 0; i < arr.length; i += 3) {
                            if (arr[i] && arr[i + 2]) {       // <— check before adding
                                result += arr[i] + " = " + arr[i + 2] + "\n";
                            }
                        }

                        result = result.replace(/\n/g, "<br>");
                        LDrivers = result;
                    }
                    else {
                        LDrivers = str;
                    }
                }
                var drivers = "";
                var tripamount = "";
                var jcbtripamount = "--";

                if (activity.Drivers === "--") {
                    drivers = HoursDrivers;
                    tripamount = activity.HoursTripsAmount
                }
                else {
                    drivers = LDrivers;
                    tripamount = activity.TripsPrice;
                    jcbtripamount = activity.JcbTripPrice;
                }
                // alert("hi");

                recovery += amount;
                subRecovery += amount;
                overallcollections += isNaN(activity.OverallPrice) ? 0 : activity.OverallPrice;

                const editid = customerPhone + "v";

                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Description}</td>
                        <td>${activity.Disel}</td>
                        <td>${activity.Trips}</td>
                        <td>${drivers}</td>
                        <td>${tripamount}</td>
                        <td>${jcbtripamount}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td>${activity.HoursPrice}</td>
                        <td>${activity.Beta}</td>
                        <td><button type="button" class="pay" id="${customerPhone}"
                        style="background-color: ${bgColor}; color: white; padding: 5px 12px; border: none; border-radius: 5px; font-weight: bold;">
                        ${activity.Payment}</button></td>
                    <td><button type="button" id=${editid} class="edit">Edit</button></td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>
                        <td>${activity.OverallPrice}</td>
                        <td>${overalldueamount}</td>
                    </tr>`;
            });

            // Subtotal time
            const subMinToHou = Math.floor(subMint / 60);
            subMint = subMint % 60;
            subHou += subMinToHou;
            const subTime = subHou + ":" + (subMint < 10 ? "0" + subMint : subMint);

            // Subtotal row
            out += `<tr style="background-color:#f0f0f0; font-weight:bold;">
                <td colspan="5">Subtotal for ${personName}</td>
                <td>${subDisel}</td>
                <td>${subTrips}</td>
                <td colspan="3">Loading</td>
                <td>${subContract}</td>
                <td colspan="4">${subTime}</td>
                <td colspan="3">Sub Total</td>
                <td>${subPrice}</td>
                <td>${subRecovery}</td>
                <td>${overallsubcollections}</td>
                <td>${overaldueamountsubrecovery}</td>
            </tr>`;
        });

        // Convert total minutes
        const mintohou = Math.floor(totalmint / 60);
        totalmint = totalmint % 60;
        totalhou += mintohou;
        const totaltime = totalhou + ":" + (totalmint < 10 ? "0" + totalmint : totalmint);

        // Grand total row
        out += `<tr style="background-color:#d0ffd0; font-weight:bold;">
            <td colspan="5" id="col">Total Work Analysis</td>
            <td id="am">${disel}</td>
            <td id="am">${totaltrips}</td>
            <td colspan="3">Loading</td>
            <td id="am">${totalcontarct}</td>
            <td id="am" colspan="4">${totaltime}</td>
            <td id="am" colspan="3">Grand Total</td>
            <td id="am">${collection}</td>
            <td id="am">${recovery}</td>
            <td>${overallcollections}</td>
            <td>${overaldueamountrecovery}</td>
        </tr>`;

        out += `</table>`;
        document.getElementById("enterdata").innerHTML = out;
    } else {
        d.style.display = "block";
        RePrint();
    }
}




document.getElementById("submit1").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    document.getElementById("search").value = "";
    RePrint1();
});
async function RePrint1() {
    // Get the value from the input field
    var startdate = document.getElementById("dat1").value.trim();
    var enddate = document.getElementById("dat2").value.trim();
    // Validate the input (optional)
    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, DBConstants.DailyWorkDB);
        const dataRefget1 = ref(db2, DBConstants.Homeexpenses);
        const snapshot = await get(dataRefget);
        const snapshot1 = await get(dataRefget1);


        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            const data1 = snapshot1.val();
            generateTableByDate(data, startdate, enddate, data1);

        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }

}
function generateTableByDate(data, startdate, enddate, data1) {
    var collection = 0;
    let out = `<table border="1px">
       <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize1">Description</th>
            <th id="csize1">Disel</th>
            <th id="csize">Trips</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">Driver Beta</th>
            <th id="csize">Price</th>
            <th id="csize">Recovery</th>
        </tr>`;

    // Define two dates
    const date1 = new Date(startdate);
    const date2 = new Date(enddate);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;

    // Convert the difference to days
    const differenceInDays = (differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    var l = [];
    var workday = 0;
    var recovery = 0;
    var totaltime = 0;
    var hou = 0;
    var mint = 0;
    var totaltrips = 0;
    var totalcontarct = 0;
    var disel = 0;
    const processedCustomers = new Set();
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Date >= startdate && activity.Date <= enddate) {
                var amount = activity.Payment === "Paid" ? 0 : activity.Price;
                var overalldueamount = activity.Payment === "Paid" ? 0 : activity.OverallPrice;
                var customerName = activity.Name;
                var balanaceamount = 0;
                if (!processedCustomers.has(customerName) && activity.Payment === "UnPaid") {

                    balanaceamount = getCachedExtraAmount(customerName);
                    processedCustomers.add(customerName);
                    if (amount < parseInt(balanaceamount)) {
                        amount = 0;
                    }
                    else {
                        amount = parseInt(amount) - parseInt(balanaceamount);
                    }
                    overalldueamount = parseInt(overalldueamount) - parseInt(balanaceamount);
                }
                var editid = customerPhone + "v";
                disel += parseInt(activity.Disel);
                recovery += parseInt(amount);
                if (!l.includes(activity.Date)) {
                    workday += 1;
                    l.push(activity.Date);
                }
                if (activity.Trips !== "--") {
                    totaltrips += parseInt(activity.Trips);
                }
                if (activity.Contract !== "--") {
                    totalcontarct += parseInt(activity.Contract);
                }
                if (activity.Starting !== "--") {
                    var timesplit = activity.TotalTime;
                    var v = timesplit.split(':');
                    hou += parseInt(v[0]);
                    mint += parseInt(v[1]);
                }
                collection = collection + parseInt(activity.Price);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Description}</td>
                        <td>${activity.Disel}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td>${activity.Beta}</td>
                        <td>${activity.Price}</td>
                        <td>${amount}</td>

                    </tr>`;
            }
        }
    }
    var mintohou = parseInt(mint / 60);
    mint = mint - 60 * mintohou;
    hou += mintohou;
    totaltime = hou + ":" + mint;
    out += `<tr>
           <td colspan="5" id="col">Total Work Analaysis</td>
            <td id="am">${disel}</td>
            <td id="am">${totaltrips}</td>
            <td id="am">${totalcontarct}</td>
            <td id="am" colspan="4">${totaltime}</td>
            <td id="am">${collection}</td>
            <td id="am">${recovery}</td>
            </tr>`;
    out += `</table>`;
    document.getElementById("enterdata").innerHTML = out;
    let led = `<table border="1px">
    <tr>
        <th id="bal1">Total Work</th>
        <th id="bal1">Collected Money</th>
        <th id="bal1">Recovery Money</th>
        <th id="bal1">Total Days</th>
        <th id="bal1">Working Days</th>
        <th id="bal1">Holidays</th>
        <th id="bal1">Oil</th>
        <th id="bal1">Maintainance</th>
        <th id="bal1">JCB EMI</th>
        <th id="bal1">Home Expenses</th>
        <th id="bal1">Salary</th>
        <th id="bal1">Profit</th>

    </tr>`;
    var pro = collection - (disel) - (differenceInDays * 3700)
    led += `<tr>
    <td>${collection}</td>
    <td>${collection - recovery}</td>
    <td>${recovery}</td>
    <td>${differenceInDays}</td>
    <td>${workday}</td>
    <td>${differenceInDays - workday}</td>
    <td>${disel}</td>
    <td>${differenceInDays * 400}</td>
    <td>${differenceInDays * 1800}</td>
    <td>${differenceInDays*665}</td>
    <td>${differenceInDays * 835}</td>
    <td>${pro}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger").innerHTML = led;
    generateHomeTablebydate(data1, startdate, enddate);
}
document.addEventListener("click", async function (e1) {
    if (e1.target && e1.target.className === "pay") {
        // alert("its editing point...");
        e1.preventDefault();
        var id = e1.target.id;
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, `${DBConstants.DailyWorkDB}/${id}`);
        const snapshot = await get(dataRefget);
        var data;
        if (snapshot.exists()) {
            data = snapshot.val();
        }
        let payment = data.Payment;
        if (payment === "UnPaid") {
            payment = "Paid";
        }
        else {
            payment = "UnPaid";
        }
        document.getElementById(id).textContent = payment;

        const db1 = DBConstants.DailyWorkDB;
        const paymentstatus = ref(db, `${db1}/${id}`);
        var beta = 0;
        var HoursTrips = 0;
        var HoursTripsAmount = 0;
        var HoursDrivers = 0;
        var jcbtripprice = 0;
        if (data.Beta !== undefined) {
            beta = data.Beta;
        }
        if (data.HoursTrips !== undefined) {
            HoursTrips = data.HoursTrips;
        }
        if (data.HoursTripsAmount !== undefined) {
            HoursTripsAmount = data.HoursTripsAmount;
        }
        if (data.HoursDrivers !== undefined) {
            HoursDrivers = data.HoursDrivers;
        }
        if (data.JcbTripPrice !== undefined) {
            jcbtripprice = data.JcbTripPrice;
        }
        // alert(beta);


        await set(paymentstatus, {
            Contract: data.Contract,
            Payment: payment,
            Date: data.Date,
            Ending: data.Ending,
            Name: data.Name,
            PhoneNumber: data.PhoneNumber,
            Beta: beta,
            HoursTrips: HoursTrips,
            HoursTripsAmount: HoursTripsAmount,
            HoursDrivers: HoursDrivers,
            JcbTripPrice: jcbtripprice,
            Disel: data.Disel,
            Price: data.Price,
            Shift: data.Shift,
            Starting: data.Starting,
            Description: data.Description,
            Drivers: data.Drivers,
            HoursPrice: data.HoursPrice,
            TripsPrice: data.TripsPrice,
            TotalTime: data.TotalTime,
            OverallPrice: data.OverallPrice,
            Trips: data.Trips,
            Villagename: data.Villagename
        });
        RePrintSearch();
    }
    else {
        if (e1.target && e1.target.className === "pays") {
            e1.preventDefault();
            var id = e1.target.id;
            const db2 = getDatabase(app);
            const dataRefget = ref(db2, `${DBConstants.DailyWorkDB}/${id}`);
            const snapshot = await get(dataRefget);
            var data;
            if (snapshot.exists()) {
                data = snapshot.val();
            }
            let payment = data.Payment;
            if (payment === "UnPaid") {
                payment = "Paid";
            }
            else {
                payment = "UnPaid";
            }
            document.getElementById(id).textContent = payment;
            const db1 = DBConstants.DailyWorkDB;
            var beta = 0;
            var HoursTrips = 0;
            var HoursTripsAmount = 0;
            var HoursDrivers = 0;
            var jcbtripprice = 0;
            if (data.Beta !== undefined) {
                beta = data.Beta;
            }
            if (data.HoursTrips !== undefined) {
                HoursTrips = data.HoursTrips;
            }
            if (data.HoursTripsAmount !== undefined) {
                HoursTripsAmount = data.HoursTripsAmount;
            }
            if (data.HoursDrivers !== undefined) {
                HoursDrivers = data.HoursDrivers;
            }
            if (data.JcbTripPrice !== undefined) {
                jcbtripprice = data.JcbTripPrice;
            }
            const paymentstatus = ref(db, `${db1}/${id}`);
            await set(paymentstatus, {
                Contract: data.Contract,
                Payment: payment,
                Date: data.Date,
                Ending: data.Ending,
                Name: data.Name,
                PhoneNumber: data.PhoneNumber,
                Beta: beta,
                HoursTrips: HoursTrips,
                HoursTripsAmount: HoursTripsAmount,
                HoursDrivers: HoursDrivers,
                Disel: data.Disel,
                Price: data.Price,
                Shift: data.Shift,
                Starting: data.Starting,
                Description: data.Description,
                Drivers: data.Drivers,
                HoursPrice: data.HoursPrice,
                TripsPrice: data.TripsPrice,
                JcbTripPrice: jcbtripprice,
                TotalTime: data.TotalTime,
                OverallPrice: data.OverallPrice,
                Trips: data.Trips,
                Villagename: data.Villagename
            });
            RePrint1();
        }
    }
});

document.getElementById("submit3").addEventListener("click", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    var d1 = document.getElementById("typech");
    var n = document.getElementById("typech");
    n.value = "";
    d1.style.display = "block";
    RePrintHome();
    // Get the value from the input field

});
document.getElementById("typech").addEventListener("change", async function (e1) {
    e1.preventDefault(); // Prevent default form submission behavior
    RePrintHome();
    // Get the value from the input field

});

async function RePrintHome() {
    // alert("hi");
    // var dat = document.getElementById("dat1").value.trim();
    // Validate the input (optional)

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, DBConstants.Homeexpenses);
        const snapshot = await get(dataRefget);
        // alert("coming");
        // Check if data exists
        if (snapshot.exists()) {
            // alert("coming");
            const data = snapshot.val();
            // console.log(data);
            var v1 = document.getElementById("typech").value;
            // alert(v1);
            if (v1 === "") {
                // alert("comming");
                v1 = "1";
            }
            // alert(v1.length);
            if (v1.length > 1) {
                generateHomeTableSearch(data, v1)
            }
            else {
                generateHomeTable(data);
            }
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data ");
    }
}
function generateHomeTablebydate(data, startdate, enddate) {

    // console.log(data);

    let out1 = `<table border="1px">
        <tr>
            <th id="csize">Purpose Id</th>
            <th id="csize1">Date</th>
             <th id="csize1">Person Type</th>
            <th id="csize1">Purpose Type</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Home Expenses</th>
            <th id="csize1">Farming</th>
            <th id="csize1">Jcb</th>
             <th id="csize1">Salary</th>
            <th id="csize1">Amount</th>
        </tr>`;
    var amt = 0;
    var f1 = 0;
    var j1 = 0;
    var h1 = 0;
    var s1 = 0;
    var s2 = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (customerPhone !== "Home") {
                if (activity.Date >= startdate && activity.Date <= enddate) {

                    if (activity.Type === "Farming") {
                        f1 += parseInt(activity.Price);
                    }
                    else {
                        if (activity.Type === "Jcb") {
                            j1 += parseInt(activity.Price);
                        }
                        else {
                            if (activity.Type === "Salary") {
                                s1 += parseInt(activity.Salary);
                            }
                            else {
                                if (activity.Type === "Salary Expenses") {
                                    s2 += parseInt(activity.SalaryExp);
                                }
                                else {
                                    h1 += parseInt(activity.Home);
                                }
                            }
                        }
                    }
                    amt += parseInt(activity.Price);
                    out1 += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                         <td>${activity.PersonType}</td>
                        <td>${activity.Type}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Home}</td>
                        <td>${activity.Farming}</td>
                        <td>${activity.Jcb}</td>
                        <td>${activity.Salary}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
                }
            }
        }
    }
    out1 += `<tr>
    <td colspan="5" id="col">Total Expenses</td>
    <td id="am">${h1}</td>
    <td id="am">${f1}</td>
    <td id="am">${j1}</td>
    <td id="am">${s1}</td>
    <td id="am">${amt}</td>
    </tr>`;
    out1 += `</table>`;
    document.getElementById("homeexp").innerHTML = out1;
}

function generateHomeTableSearch(data, v1) {
    let out = `<table border="1px">
        <tr>
            <th id="csize">Purpose Id</th>
            <th id="csize1">Date</th>
             <th id="csize1">Person Type</th>
            <th id="csize1">Purpose Type</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Home Expenses</th>
            <th id="csize1">Farming</th>
            <th id="csize1">Jcb</th>
            <th id="csize1">Salary</th>
            <th id="csize1">Amount</th>
        </tr>`;
    var amt = 0;
    var f1 = 0;
    var j1 = 0;
    var h1 = 0;
    var c = 0;
    var s1 = 0;
    var s2 = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            // alert("yesss");
            // console.log(activity);
            if (customerPhone !== "Home") {
                // alert("yesss");
                if (v1 === "Suresh") {
                    if (activity.Type === "Farming" && activity.PersonType === "Suresh") {
                        f1 += parseInt(activity.Price);
                    }
                    else {
                        if (activity.Type === "Jcb" && activity.PersonType === "Suresh") {
                            j1 += parseInt(activity.Price);
                        }
                        else {
                            if (activity.Type === "Salary" && activity.PersonType === "Suresh") {
                                // alert("function12");
                                // alert(activity.Salary);

                                s1 += parseInt(activity.Salary);
                            }
                            else {
                                if (activity.Type === "Salary Expenses" && activity.PersonType === "Suresh") {
                                    s2 += parseInt(activity.SalaryExp);
                                }
                                else {
                                    if (activity.Type === "Home" && activity.PersonType === "Suresh") {

                                        h1 += parseInt(activity.Home);
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (v1 === "Dady") {
                        if (activity.Type === "Farming" && activity.PersonType === "Dady") {
                            f1 += parseInt(activity.Price);
                        }
                        else {
                            if (activity.Type === "Jcb" && activity.PersonType === "Dady") {
                                j1 += parseInt(activity.Price);
                            }
                            else {
                                if (activity.Type === "Salary" && activity.PersonType === "Dady") {
                                    // alert("function12");
                                    // alert(activity.Salary);

                                    s1 += parseInt(activity.Salary);
                                }
                                else {
                                    if (activity.Type === "Salary Expenses" && activity.PersonType === "Dady") {
                                        s2 += parseInt(activity.SalaryExp);
                                    }
                                    else {
                                        if (activity.Type === "Home" && activity.PersonType === "Dady") {

                                            h1 += parseInt(activity.Home);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (activity.Type === v1 || activity.PersonType === v1) {
                    if (v1 === "Salary") {
                        c += parseInt(activity.Salary);
                    }
                    else {
                        c += parseInt(activity.Price);
                    }
                    amt += parseInt(activity.Price);
                    out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                         <td>${activity.PersonType}</td>
                        <td>${activity.Type}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Home}</td>
                        <td>${activity.Farming}</td>
                        <td>${activity.Jcb}</td>
                        <td>${activity.Salary}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
                }
            }
        }
    }
    if (v1 === "Farming") {
        j1 = 0;
        h1 = 0;
        f1 = c;
        s1 = 0;
        s2 = 0;
    }
    else {
        if (v1 === "Jcb") {
            h1 = 0;
            f1 = 0;
            j1 = c;
            s1 = 0;
            s2 = 0;
        }
        else {
            if (v1 === "Home") {
                f1 = 0;
                j1 = 0;
                h1 = c;
                s1 = 0;
                s2 = 0;
            }
            else {
                if (v1 === "Salary") {
                    f1 = 0;
                    j1 = 0;
                    h1 = 0;
                    s1 = c;
                    s2 = 0;
                }
                else {
                    if (v1 === "Salary Expenses") {
                        f1 = 0;
                        j1 = 0;
                        h1 = 0;
                        s1 = 0;
                        s2 = c;
                    }

                }
            }
        }
    }
    out += `<tr>
    <td colspan="5" id="col">Total Expenses</td>
    <td id="am">${h1}</td>
    <td id="am">${f1}</td>
    <td id="am">${j1}</td>
    <td id="am">${s1}</td>
    <td id="am">${amt}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("homeexp").innerHTML = out;
}


function generateHomeTable(data) {
    // alert("coming");
    let out = `<table border="1px">
        <tr>
            <th id="csize">Purpose Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Person Type</th>
            <th id="csize1">Purpose Type</th>
            <th id="csize1">Purpose</th>
            <th id="csize1">Home Expenses</th>
            <th id="csize1">Farming</th>
            <th id="csize1">Jcb</th>
            <th id="csize1">Salary</th>
            <th id="csize1">Amount</th>
        </tr>`;
    var amt = 0;
    var f1 = 0;
    var j1 = 0;
    var h1 = 0;
    var s1 = 0;
    var s2 = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            // alert("function");
            if (customerPhone !== "Home") {
                if (activity.Type === "Farming") {
                    f1 += parseInt(activity.Price);
                }
                else {
                    if (activity.Type === "Jcb") {
                        j1 += parseInt(activity.Price);
                    }
                    else {
                        if (activity.Type === "Salary") {
                            // alert("function12");
                            // alert(activity.Salary);

                            s1 += parseInt(activity.Salary);
                        }
                        else {
                            if (activity.Type === "Salary Expenses") {
                                s2 += parseInt(activity.SalaryExp);
                            }
                            else {
                                h1 += parseInt(activity.Home);
                            }
                        }
                    }
                }
                amt += parseInt(activity.Price);
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.PersonType}</td>
                        <td>${activity.Type}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Home}</td>
                        <td>${activity.Farming}</td>
                        <td>${activity.Jcb}</td>
                        <td>${activity.Salary}</td>
                        <td>${activity.Price}</td>
                    </tr>`;
            }
        }
        // console.log(s2);
    }
    out += `<tr>
    <td colspan="5" id="col">Total Expenses</td>
    <td id="am">${h1}</td>
    <td id="am">${f1}</td>
    <td id="am">${j1}</td>
    <td id="am">${s1}</td>
    <td id="am">${amt}</td>
    </tr>`;
    out += `</table>`;
    document.getElementById("homeexp").innerHTML = out;
}
