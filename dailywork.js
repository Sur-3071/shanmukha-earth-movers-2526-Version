function timecal() {
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;

    // Convert the time strings to Date objects
    var startTime = new Date('1970-01-01T' + stime + 'Z');
    var endTime = new Date('1970-01-01T' + etime + 'Z');

    // If the end time is earlier in the day than the start time, add 24 hours to end time
    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    // Calculate the difference in milliseconds
    var diff = endTime - startTime;

    // Convert milliseconds to hours and minutes
    var diffHours = Math.floor(diff / (1000 * 60 * 60));
    var diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Format the total time as HH:MM
    var totalTime = diffHours.toString().padStart(2, '0') + ':' + diffMinutes.toString().padStart(2, '0');
    var c3 = parseInt(document.getElementById("hrsrate").value || "1000");
    // Calculate the total minutes and price
    var tmin = diffHours * 60 + diffMinutes;
    var pri = tmin * c3 / 60;
    // alert(pri);
    document.getElementById("ttime").value = totalTime;
    // alert(pri+" "+amt);
    var type = document.getElementById("worktype").value;
    var beta = parseInt(document.getElementById("beta").value || "0");
    var rate = parseInt(document.getElementById("rate").value || "0");
    if (type === "Hours") {
        rate = (isNaN(pri) ? 0 : parseInt(pri));
        document.getElementById("rate").value = rate;
    }
    else {
        if (type === "Loading") {
            var triprate = parseInt(document.getElementById("trips").value || "0");
            var jcbtriprate = parseInt(document.getElementById("jcbtrprate").value || "0");
            var trippri = (triprate * jcbtriprate);
            rate = (isNaN(trippri) ? beta : parseInt(trippri) + beta);
            document.getElementById("rate").value = rate;
        }
        else {
            if (type === "Contract") {
                var conamouont = parseInt(document.getElementById("con").value || "0");
                rate = (isNaN(conamouont) ? beta : parseInt(conamouont) + beta);
                document.getElementById("rate").value = rate;

            }
        }
    }
}



function conprice() {
    var beta = parseInt(document.getElementById("beta").value || "0");
    var c1 = document.getElementById("con").value || "0";
    document.getElementById("rate").value = parseInt(c1) + beta;
}
function removedone() {
    setTimeout(function () {
        var v7 = document.getElementById("done");
        v7.style.display = "none";
        document.getElementById("paymentSuccessPopup2").style.display = "none";

    }, 3000);
}
function removereadonly() {
    // alert("getting called");
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });
}

function addRow() {
    // alert("row in daily work js");
    const container = document.getElementById('container43');
    const newRow = document.createElement('div');
    newRow.className = 'row';
    newRow.innerHTML = `
       <input type="text" placeholder="Driver Name" name="driverName[]">
       <input type="number" placeholder="Trips" name="trips[]"  readonly required onkeyup="updateTotalTrips()">
       <button class="remove-button" onclick="removeRow(this)">X</button>
    `;
    container.appendChild(newRow);
}
function addRow1() {
    const container1 = document.getElementById('container2');
    const newRow1 = document.createElement('div');
    newRow1.className = 'row1';
    newRow1.innerHTML = `
       <input type="text" placeholder="Driver Name" name="driverName1[]">
       <input type="number" placeholder="Trips" name="trips1[]"  readonly required onkeyup="updateTotalTrips1()">
       <button class="remove-button" onclick="removeRow1(this)">X</button>
    `;
    container1.appendChild(newRow1);
}

function removeRow(button) {
    const row = button.parentElement;
    row.remove();
    updateTotalTrips();
}

function removeRow1(button) {
    const row = button.parentElement;
    row.remove();
    updateTotalTrips1();
}

function updateTotalTrips() {
    // alert("hi");
    const driverNames = document.querySelectorAll('input[name="driverName[]"]');
    const tripInputs = document.querySelectorAll('input[name="trips[]"]');
    let paytotal = 0;
    let total = 0;
    driverNames.forEach((driverName, index) => {
        const trip = tripInputs[index].value || 0;
        const name = (driverName.value.toLowerCase() || "Unknown Driver").trim().replace(/\s+/g, "_");
        if (name.includes("own") || name.includes("సొంత")) {
            const value = parseInt(trip) || 0;
            paytotal += value;
        }
        total += parseInt(trip) || 0;
    });

    document.getElementById('trips').value = total;
    document.getElementById('noncompanytractors').value = paytotal;
    tripprice();
}
function updateTotalTrips1() {
    // alert("hi");
    // alert("trips1 called");
    const driverNames = document.querySelectorAll('input[name="driverName1[]"]');
    const tripInputs = document.querySelectorAll('input[name="trips1[]"]');
    let paytotal = 0;
    let total = 0;
    driverNames.forEach((driverName, index) => {
        const trip = tripInputs[index].value || 0;
        const name = (driverName.value.toLowerCase() || "Unknown Driver").trim().replace(/\s+/g, "_");
        if (name.includes("own") || name.includes("సొంత")) {
            const value = parseInt(trip) || 0;
            paytotal += value;
        }
        total += parseInt(trip) || 0;
    });

    document.getElementById('trips1').value = total;
    document.getElementById('hoursnoncompanytractors').value = paytotal;
    tripprice1();
}
function tripprice() {
    var c1 = document.getElementById("trips").value || "0";
    var c3 = parseInt(document.getElementById("jcbtrprate").value || "0");
    var c2 = parseInt(c1) * c3;
    var beta = document.getElementById("beta").value || "0";
    var fin = isNaN(c2) ? parseInt(beta) : (parseInt(beta) + c2);
    document.getElementById("rate").value = fin;
    generateOutput();
}
function generateOutput() {
    const driverNames = document.querySelectorAll('input[name="driverName[]"]');
    const trips = document.querySelectorAll('input[name="trips[]"]');
    const outputDiv = document.getElementById('output');
    outputDiv.value = "";
    driverNames.forEach((driverName, index) => {
        const trip = trips[index].value || 0;
        const name = (driverName.value || "Unknown Driver").trim().replace(/\s+/g, "_");
        if (name.includes("own") || name.includes("సొంత")) {
            const line = `${name} = ${trip}`;
            outputDiv.value += line + " " + "\n";
        }
    });
}
function tripprice1() {
    // alert("tripprice1");
    var c1 = document.getElementById("trips1").value;
    var c3 = parseInt(document.getElementById("trprate1").value);
    var c2 = parseInt(c1) * c3;
    document.getElementById("alltrprate").value = c2;
    generateOutput1();
}

function generateOutput1() {
    // alert("hi");
    const driverNames = document.querySelectorAll('input[name="driverName1[]"]');
    const trips = document.querySelectorAll('input[name="trips1[]"]');
    const outputDiv = document.getElementById('output1');
    outputDiv.value = "";
    driverNames.forEach((driverName, index) => {
        const trip = trips[index].value || 0;
        const name = (driverName.value || "Unknown Driver").trim().replace(/\s+/g, "_");
        const line = `${name} = ${trip}`;
        outputDiv.value += line + " " + "\n";
    });
}
function addflow() {
    var c = document.getElementById("worktype").value;
    if (c == "Hours") {
        document.getElementById("loading").style.display = "none";
        document.getElementById("contract").style.display = "none";
        document.getElementById("hours").style.display = "block";
    }
    else {
        if (c == "Loading") {
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

}
function addflow7() {
    var c = document.getElementById("worktype7").value;
    if (c == "Hours") {
        document.getElementById("loading7").style.display = "none";
        document.getElementById("contract7").style.display = "none";
        document.getElementById("hours7").style.display = "block";
    }
    else {
        if (c == "Loading") {
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

}
document.addEventListener("click", function (event) {
    // Check if a button with class "pay" was clicked
    if (event.target.classList.contains("pay")) {
        const button = event.target; // the clicked button
        const payment = button.textContent.trim();

        if (payment.toLowerCase() === "paid") {
            button.style.backgroundColor = "red";
            button.style.color = "white";
        } else if (payment.toLowerCase() === "unpaid") {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        }
    }
});



function timecal7() {

    var stime = document.getElementById("stime7").value;
    var etime = document.getElementById("etime7").value;

    var startTime = new Date('1970-01-01T' + stime + 'Z');
    var endTime = new Date('1970-01-01T' + etime + 'Z');

    if (endTime < startTime) {
        endTime.setDate(endTime.getDate() + 1);
    }

    var diff = endTime - startTime;

    var diffHours = Math.floor(diff / (1000 * 60 * 60));
    var diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    var totalTime =
        diffHours.toString().padStart(2, '0')
        + ':'
        + diffMinutes.toString().padStart(2, '0');

    var c3 = parseInt(document.getElementById("hrsrate7").value || "1000");

    var tmin = diffHours * 60 + diffMinutes;

    var pri = tmin * c3 / 60;

    document.getElementById("ttime7").value = totalTime;

    var type = document.getElementById("worktype7").value;

    var beta = parseInt(document.getElementById("beta7").value || "0");

    var rate = parseInt(document.getElementById("rate7").value || "0");

    if (type === "Hours") {

        rate = (isNaN(pri) ? 0 : parseInt(pri));

        document.getElementById("rate7").value = rate;

    }
    else if (type === "Loading") {

        var triprate =
            parseInt(document.getElementById("trips7").value || "0");

        var jcbtriprate =
            parseInt(document.getElementById("jcbtrprate7").value || "0");

        var trippri = (triprate * jcbtriprate);

        rate = (isNaN(trippri) ? beta : parseInt(trippri) + beta);

        document.getElementById("rate7").value = rate;

    }
    else if (type === "Contract") {

        var conamouont =
            parseInt(document.getElementById("con7").value || "0");

        rate = (isNaN(conamouont)
            ? beta
            : parseInt(conamouont) + beta);

        document.getElementById("rate7").value = rate;
    }
}



function conprice7() {

    var beta =
        parseInt(document.getElementById("beta7").value || "0");

    var c1 =
        document.getElementById("con7").value || "0";

    document.getElementById("rate7").value =
        parseInt(c1) + beta;
}



// function removedone7() {

//     setTimeout(function () {

//         var v7 = document.getElementById("done7");

//         v7.style.display = "none";
//         document.getElementById("userForm").reset();

//     }, 3000);
// }



// function removereadonly7() {

//     const inputs =
//         document.querySelectorAll(
//             '#userForm input[type="text"], #userForm input[type="number"]'
//         );

//     inputs.forEach(input => {

//         input.removeAttribute('readonly');

//     });
//     generateOutput7();
//     generateOutput17();

// }



// function addRow7() {

//     const container =
//         document.getElementById('container437');

//     const newRow =
//         document.createElement('div');

//     newRow.className = 'row7';

//     newRow.innerHTML = `
//        <input type="text"
//               placeholder="Driver Name"
//               name="driverName7[]"
//               onkeyup="removereadonly7(),updateTotalTrips7()">

//        <input type="number"
//               placeholder="Trips"
//               name="trips7[]"
//               readonly
//               required
//               onkeyup="updateTotalTrips7()">

//        <button type="button"
//                class="remove-button"
//                onclick="removeRow7(this)">
//                X
//        </button>
//     `;

//     container.appendChild(newRow);
// }



// function addRow17() {

//     const container1 =
//         document.getElementById('container21');

//     const newRow1 =
//         document.createElement('div');

//     newRow1.className = 'row17';

//     newRow1.innerHTML = `
//        <input type="text"
//               placeholder="Driver Name"
//               name="driverName17[]"
//               onkeyup="removereadonly7(),updateTotalTrips17()">

//        <input type="number"
//               placeholder="Trips"
//               name="trips17[]"
//               readonly
//               required
//               onkeyup="updateTotalTrips17()">

//        <button type="button"
//                class="remove-button"
//                onclick="removeRow17(this)">
//                X
//        </button>
//     `;

//     container1.appendChild(newRow1);
// }



// function removeRow7(button) {

//     const row = button.parentElement;

//     row.remove();

//     updateTotalTrips7();
// }



// function removeRow17(button) {

//     const row = button.parentElement;

//     row.remove();

//     updateTotalTrips17();
// }



// function updateTotalTrips7() {

//     const driverNames =
//         document.querySelectorAll('input[name="driverName7[]"]');

//     const tripInputs =
//         document.querySelectorAll('input[name="trips7[]"]');

//     let paytotal = 0;

//     let total = 0;

//     driverNames.forEach((driverName, index) => {

//         const trip = tripInputs[index].value || 0;

//         const name =
//             (driverName.value.toLowerCase()
//                 || "Unknown Driver")
//                 .trim()
//                 .replace(/\s+/g, "_");

//         if (name.includes("own")) {

//             const value = parseInt(trip) || 0;

//             paytotal += value;
//         }

//         total += parseInt(trip) || 0;
//     });

//     document.getElementById('trips7').value = total;

//     document.getElementById('noncompanytractors7').value = paytotal;

//     tripprice7();
// }



// function updateTotalTrips17() {

//     const driverNames =
//         document.querySelectorAll('input[name="driverName17[]"]');

//     const tripInputs =
//         document.querySelectorAll('input[name="trips17[]"]');

//     let paytotal = 0;

//     let total = 0;

//     driverNames.forEach((driverName, index) => {

//         const trip = tripInputs[index].value || 0;

//         const name =
//             (driverName.value.toLowerCase()
//                 || "Unknown Driver")
//                 .trim()
//                 .replace(/\s+/g, "_");

//         if (name.includes("own")) {

//             const value = parseInt(trip) || 0;

//             paytotal += value;
//         }

//         total += parseInt(trip) || 0;
//     });

//     document.getElementById('trips17').value = total;

//     document.getElementById('hoursnoncompanytractors7').value = paytotal;

//     tripprice17();
// }



// function tripprice7() {

//     var c1 =
//         document.getElementById("trips7").value || "0";

//     var c3 =
//         parseInt(document.getElementById("jcbtrprate7").value || "0");

//     var c2 = parseInt(c1) * c3;

//     var beta =
//         document.getElementById("beta7").value || "0";

//     var fin =
//         isNaN(c2)
//             ? parseInt(beta)
//             : (parseInt(beta) + c2);

//     document.getElementById("rate7").value = fin;

//     generateOutput7();
// }



// function generateOutput7() {

//     const driverNames =
//         document.querySelectorAll('input[name="driverName7[]"]');

//     const trips =
//         document.querySelectorAll('input[name="trips7[]"]');

//     const outputDiv =
//         document.getElementById('output7');

//     outputDiv.value = "";

//     driverNames.forEach((driverName, index) => {

//         const trip = trips[index].value || 0;

//         const name =
//             (driverName.value || "Unknown Driver")
//                 .trim()
//                 .replace(/\s+/g, "_");

//         const line = `${name} = ${trip}`;

//         outputDiv.value += line + "\n";
//     });
// }


// function tripprice17() {
//     // alert("tripprice1");
//     var c1 = document.getElementById("trips17").value;
//     var c3 = parseInt(document.getElementById("trprate17").value);
//     var c2 = parseInt(c1) * c3;
//     document.getElementById("alltrprate7").value = c2;
//     generateOutput17();
// }

// function generateOutput17() {
//     // alert("hi");
//     const driverNames = document.querySelectorAll('input[name="driverName17[]"]');
//     const trips = document.querySelectorAll('input[name="trips17[]"]');
//     const outputDiv = document.getElementById('output17');
//     outputDiv.value = "";
//     driverNames.forEach((driverName, index) => {
//         const trip = trips[index].value || 0;
//         const name = (driverName.value || "Unknown Driver").trim().replace(/\s+/g, "_");
//         const line = `${name} = ${trip}`;
//         outputDiv.value += line + " " + "\n";
//     });
// }

function removedone7() {

    setTimeout(function () {

        const v7 = document.getElementById("done7");

        if (v7) {
            v7.style.display = "none";
        }

        const form = document.getElementById("userForm");

        if (form) {
            form.reset();
        }

    }, 3000);
}



function removereadonly7() {

    const inputs = document.querySelectorAll(
        '#userForm input[type="text"], #userForm input[type="number"]'
    );

    inputs.forEach(input => {
        input.removeAttribute("readonly");
    });

    generateOutput7();
    generateOutput17();
}



function addRow7() {

    const container = document.getElementById("container437");

    if (!container) return;

    const newRow = document.createElement("div");

    newRow.className = "row7";

    newRow.innerHTML = `
        <input
            type="text"
            placeholder="Driver Name"
            name="driverName7[]">

        <input
            type="number"
            placeholder="Trips"
            name="trips7[]"
            readonly
            required
            onkeyup="updateTotalTrips7()">

        <button
            type="button"
            class="remove-button"
            onclick="removeRow7(this)">
            X
        </button>
    `;

    container.appendChild(newRow);

    updateTotalTrips7();
}



function addRow17() {

    const container = document.getElementById("container21");

    if (!container) return;

    const newRow = document.createElement("div");

    newRow.className = "row17";

    newRow.innerHTML = `
        <input
            type="text"
            placeholder="Driver Name"
            name="driverName17[]">

        <input
            type="number"
            placeholder="Trips"
            name="trips17[]"
            readonly
            required
            onkeyup="updateTotalTrips17()">

        <button
            type="button"
            class="remove-button"
            onclick="removeRow17(this)">
            X
        </button>
    `;

    container.appendChild(newRow);

    updateTotalTrips17();
}



function removeRow7(button) {

    if (!button) return;

    const row = button.parentElement;

    if (row) {
        row.remove();
    }

    updateTotalTrips7();
}



function removeRow17(button) {

    if (!button) return;

    const row = button.parentElement;

    if (row) {
        row.remove();
    }

    updateTotalTrips17();
}

function updateTotalTrips7() {

    const driverNames =
        document.querySelectorAll('input[name="driverName7[]"]');

    const tripInputs =
        document.querySelectorAll('input[name="trips7[]"]');

    const tripsField =
        document.getElementById("trips7");

    const ownTripsField =
        document.getElementById("noncompanytractors7");

    let paytotal = 0;
    let total = 0;

    // No rows found
    if (driverNames.length === 0 || tripInputs.length === 0) {

        if (tripsField) tripsField.value = 0;
        if (ownTripsField) ownTripsField.value = 0;

        tripprice7();
        return;
    }

    driverNames.forEach((driverName, index) => {

        // Skip if matching trip input doesn't exist
        if (!tripInputs[index]) return;

        const trip =
            parseInt(tripInputs[index].value) || 0;

        const name =
            (driverName.value || "")
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "_");

        if (name.includes("own") || name.includes("సొంత")) {
            paytotal += trip;
        }

        total += trip;
    });

    if (tripsField) {
        tripsField.value = total;
    }

    if (ownTripsField) {
        ownTripsField.value = paytotal;
    }

    tripprice7();
}



function updateTotalTrips17() {

    const driverNames =
        document.querySelectorAll('input[name="driverName17[]"]');

    const tripInputs =
        document.querySelectorAll('input[name="trips17[]"]');

    const tripsField =
        document.getElementById("trips17");

    const ownTripsField =
        document.getElementById("hoursnoncompanytractors7");

    let paytotal = 0;
    let total = 0;

    // No rows found
    if (driverNames.length === 0 || tripInputs.length === 0) {

        if (tripsField) tripsField.value = 0;
        if (ownTripsField) ownTripsField.value = 0;

        tripprice17();
        return;
    }

    driverNames.forEach((driverName, index) => {

        // Skip if matching trip input doesn't exist
        if (!tripInputs[index]) return;

        const trip =
            parseInt(tripInputs[index].value) || 0;

        const name =
            (driverName.value || "")
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "_");

        if (name.includes("own") || name.includes("సొంత")) {
            paytotal += trip;
        }

        total += trip;
    });

    if (tripsField) {
        tripsField.value = total;
    }

    if (ownTripsField) {
        ownTripsField.value = paytotal;
    }

    tripprice17();
}

function tripprice7() {

    const tripsField = document.getElementById("trips7");
    const jcbRateField = document.getElementById("jcbtrprate7");
    const betaField = document.getElementById("beta7");
    const rateField = document.getElementById("rate7");

    if (!tripsField || !jcbRateField || !betaField || !rateField) {
        return;
    }

    const totalTrips = parseInt(tripsField.value) || 0;
    const jcbRate = parseInt(jcbRateField.value) || 0;
    const beta = parseInt(betaField.value) || 0;

    const totalAmount = (totalTrips * jcbRate) + beta;

    rateField.value = totalAmount;

    generateOutput7();
}



function generateOutput7() {

    const driverNames =
        document.querySelectorAll('input[name="driverName7[]"]');

    const trips =
        document.querySelectorAll('input[name="trips7[]"]');

    const outputDiv =
        document.getElementById("output7");

    if (!outputDiv) return;

    outputDiv.value = "";

    if (driverNames.length === 0 || trips.length === 0) {
        return;
    }

    driverNames.forEach((driverName, index) => {

        if (!trips[index]) return;

        const trip = parseInt(trips[index].value) || 0;

        const name = (driverName.value || "").trim();

        // Ignore completely empty rows
        if (name === "" && trip === 0) {
            return;
        }

        outputDiv.value += `${name || "Unknown Driver"} = ${trip}\n`;

    });
}



function tripprice17() {

    const tripsField = document.getElementById("trips17");
    const tripRateField = document.getElementById("trprate17");
    const totalField = document.getElementById("alltrprate7");

    if (!tripsField || !tripRateField || !totalField) {
        return;
    }

    const totalTrips = parseInt(tripsField.value) || 0;
    const tripRate = parseInt(tripRateField.value) || 0;

    totalField.value = totalTrips * tripRate;

    generateOutput17();
}



function generateOutput17() {

    const driverNames =
        document.querySelectorAll('input[name="driverName17[]"]');

    const trips =
        document.querySelectorAll('input[name="trips17[]"]');

    const outputDiv =
        document.getElementById("output17");

    if (!outputDiv) return;

    outputDiv.value = "";

    if (driverNames.length === 0 || trips.length === 0) {
        return;
    }

    driverNames.forEach((driverName, index) => {

        if (!trips[index]) return;

        const trip = parseInt(trips[index].value) || 0;

        const name = (driverName.value || "").trim();

        // Ignore completely empty rows
        if (name === "" && trip === 0) {
            return;
        }

        outputDiv.value += `${name || "Unknown Driver"} = ${trip}\n`;

    });
}

function convertTo12Hour(timeStr) {

    // Check valid 24-hour format HH:MM
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!regex.test(timeStr)) {
        return timeStr; // return original string
    }

    let [hours, minutes] = timeStr.split(':');

    hours = parseInt(hours);

    const ampm = hours >= 12 ? 'PM' : 'AM';

    let h12 = hours % 12 || 12;

    return `${String(h12).padStart(2, '0')}:${minutes} ${ampm}`;
}

