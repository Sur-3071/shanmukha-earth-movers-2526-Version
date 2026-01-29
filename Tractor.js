var photo = "";
var k1 = 0;
var k2 = 0;
var k3 = 0;
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;
var k5 = 0;
var amounttaken = 0;
var totalamount = 0;
var totaltrips = 0;
var name1 = "";
var balance = totalamount - amounttaken;
function formatDateToNormal(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

var list = {
    "Def": "def",
    "Sai": "sai",
    "Batchu Raju": "raju",
    "venkanna": "venkanna",
    "swamy": "swamy",
    "Chinnodu": "chinnodu",
    "Abbulu": "abbulu",
    "Kick": "kick",
    "Nagu": "nagu1",
    "Radhakrishna": "radha",
    "srinu": "srinu",
    "chanti": "chanti",
    "Govindu": "govind",
    "(Pun)Nagu": "nagu2",
    "Nani": "nani",
    "Chittibabu": "chittibabu",
    "Ungarala Srinu": "usrinu"
};
function box1() {
    var d = document.getElementById('dname1').value;
    var d1 = document.getElementById('driver1');
    // var t1 = document.getElementById('btn1')
    // t1.textContent = "Open";
    k1 = 0
    // var r = document.getElementById("tripsdata");
    // r.style.display = "none";
    if (d == "Others") {
        d1.style.display = "block";
    }
    else {
        d1.style.display = "none";
    }
}
var x1 = 0;
var x2 = 0;
var x3 = 0;

function addtrip() {
    var d = document.getElementById('list1');
    var d1 = document.getElementById('b1');
    if (x1 == 0) {
        d.style.display = "block";
        d1.textContent = "Close";
        x1 = 1;
    } else {
        d.style.display = "none";
        d1.textContent = "Add Data";
        x1 = 0;
    }
}
function showdriver() {
    var p1 = document.getElementById("tripsdata");
    var p2 = document.getElementById("amountdata");
    var p3 = document.getElementById("driverbal");
    p1.style.display = "none";
    p2.style.display = "none";
    p3.style.display = "none";
    var d1 = document.getElementById('list2');
    var d = document.getElementById('b2');
    if (x2 == 0) {
        d1.style.display = "block"
        d.textContent = "Close"
        x2 = 1
    }
    else {
        d1.style.display = "none"
        d.textContent = "Driver Data"
        x2 = 0

    }
}
function addamount() {
    var d = document.getElementById('list3');
    var d1 = document.getElementById('b3');
    if (x3 == 0) {
        d.style.display = "block"
        d1.textContent = "Close"
        x3 = 1
    }
    else {
        document.getElementById("form1").reset();
        d.style.display = "none"
        d1.textContent = "Amount Data"
        x3 = 0
    }
}

function transalate() {
    let convert = document.getElementById("cname");
    let content = document.getElementById("cname").value;
    let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=en-GB|te-IN`;

    fetch(transLINK)
        .then(response => response.json())
        .then(data => {
            // Handle the translated data here
            convert.innerHTML = "";
            let text = data.responseData.translatedText;
            // alert(text);
            convert.value = text;
        });
}
function transalatepur() {
    let convert = document.getElementById("pur");
    let content = document.getElementById("pur").value;
    let transLINK = `https://api.mymemory.translated.net/get?q=${content}&langpair=en-GB|te-IN`;

    fetch(transLINK)
        .then(response => response.json())
        .then(data => {
            // Handle the translated data here
            convert.innerHTML = "";
            let text = data.responseData.translatedText;
            // alert(text);
            convert.value = text;
        });
}
function box2() {
    var p1 = document.getElementById("tripsdata");
    var p2 = document.getElementById("amountdata");
    var p3 = document.getElementById("driverbal");
    p1.style.display = "none";
    p2.style.display = "none";
    p3.style.display = "none";
    if (photo.length > 0) {
        var d = document.getElementById(list[photo]);
        d.style.display = "none";
    }
    photo = document.getElementById('dname2').value;
    var d1 = list[photo]
    var d2 = document.getElementById(d1);
    d2.style.display = "block";
}
function box3() {
    var d = document.getElementById('dname3').value;
    var d1 = document.getElementById('driver3');
    var t1 = document.getElementById('btn3')
    t1.textContent = 'Open';
    k3 = 0
    var r = document.getElementById("amountdata");
    r.style.display = "none";
    if (d == "Others") {
        d1.style.display = "block";
    }
    else {
        d1.style.display = "none";
    }
}

function removedone() {
    setTimeout(function () {
        var v7 = document.getElementById("done");
        v7.style.display = "none";
    }, 2000);
}
function removedone1() {
    setTimeout(function () {
        var v7 = document.getElementById("done5");
        v7.style.display = "none";
    }, 2000);
}
function displayUpdatedtripsdata(data) {
    document.getElementById("screenshot").style.display = "block";
    var r = document.getElementById("tripsdata");
    r.innerHTML = "";

    // Initialize the table structure
    var out = `<table border="1px" class="blodfont">
    <tr>
        <th style="font-weight:bold;font-size:25px">తోలకం</th>
        <th style="font-weight:bold;font-size:25px">తేదీ</th>
        <th style="font-weight:bold;font-size:25px">వినియోగదారుని పేరు</th>
        <th style="font-weight:bold;font-size:25px">పగలు/రాత్రి</th>
        <th style="font-weight:bold;font-size:25px">ధర</th>
        <th style="font-weight:bold;font-size:25px">ట్రిప్పులు</th>
        <th style="font-weight:bold;font-size:25px">మొత్తం</th>
    </tr>`;

    // // Initialize the counter for Sno
    // var sno = 1;
    // var s = 0;
    // // Iterate over the dates in the data object
    // var totaltrips = 0;
    // for (const date in data) {
    //     if (data.hasOwnProperty(date)) {
    //         // Iterate over the names within each date
    //         for (const name in data[date]) {
    //             if (data[date].hasOwnProperty(name)) {
    //                 const activities = data[date][name];
    //                 for (const activity in activities) {
    //                     if (activities.hasOwnProperty(activity)) {
    //                         var trips = parseInt(activities[activity]['Trips']);
    //                         var daytype = activities[activity];
    //                         // console.log(parseInt(activities[activity]['Trips']));
    //                         totaltrips += trips;
    //                         var amount = parseInt(activities[activity]['Price']);
    //                         s += (trips * amount);
    //                         out += `<tr>
    //                             <td style="font-weight:bold;font-size:25px">` + sno + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + formatDateToNormal(date) + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + name + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + activity + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + activities[activity]['Price'] + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + activities[activity]['Trips'] + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + trips * amount + `</td>
    //                         </tr>`;

    //                         // Increment the Sno counter
    //                         sno++;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // out += `<tr>
    //     <td colspan="5" style="font-weight:bold;font-size:25px">ట్రిప్పులు మొత్తానికి అయిన డబ్బులు</td>
    //     <td colspan="1" style="font-weight:bold;font-size:25px">` + totaltrips + `</td>
    //     <td colspan="1" style="font-weight:bold;font-size:25px">` + s + `</td>
    // </tr>`
    // // Close the table structure
    // out += "</table>";

    // // Update the innerHTML of the element
    // r.innerHTML = out;
    // r.style.display = "block";

    let sno = 1;
    let totaltrips = 0;
    let s = 0;

    // assuming `data` is snapshot.val()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {

            const record = data[key];

            const date = record.Date;
            const name = record.CustomerName;
            const shift = record.Shift;
            const drivername = record.Driver;

            const trips = parseInt(record.Trips) || 0;
            const amount = parseInt(record.Price) || 0;

            totaltrips += trips;
            s += trips * amount;

            out += `
        <tr>
            <td style="font-weight:bold;font-size:25px">${sno}</td>
            <td style="font-weight:bold;font-size:25px">${formatDateToNormal(date)}</td>
            <td style="font-weight:bold;font-size:25px">${name}</td>
            <td style="font-weight:bold;font-size:25px">${shift}</td>
            <td style="display:none;">${drivername}</td>
            <td style="font-weight:bold;font-size:25px">${amount}</td>
            <td style="font-weight:bold;font-size:25px">${trips}</td>
            <td style="font-weight:bold;font-size:25px">${trips * amount}</td>
        </tr>`;

            sno++;
        }
    }

    // Total row
    out += `
<tr>
    <td colspan="5" style="font-weight:bold;font-size:25px">
        ట్రిప్పులు మొత్తానికి అయిన డబ్బులు
    </td>
    <td style="font-weight:bold;font-size:25px">${totaltrips}</td>
    <td style="font-weight:bold;font-size:25px">${s}</td>
</tr>
`;

    // Close table
    out += "</table>";

    // Render
    r.innerHTML = out;
    r.style.display = "block";
}
function displaytripsdata(data, drivername) {
    alert("parrel call");
    driver = drivername;
    document.getElementById("screenshot").style.display = "block";
    var r = document.getElementById("tripsdata");
    r.innerHTML = "";

    // Initialize the table structure
    var out = `<table border="1px" class="blodfont">
    <tr>
        <th style="font-weight:bold;font-size:25px">తోలకం</th>
        <th style="font-weight:bold;font-size:25px">తోలకం ID</th>
        <th style="font-weight:bold;font-size:25px">తేదీ</th>
        <th style="font-weight:bold;font-size:25px">వినియోగదారుని పేరు</th>
        <th style="font-weight:bold;font-size:25px">పగలు/రాత్రి</th>
        <th style="font-weight:bold;font-size:25px">సవరించు</th>
        <th style="font-weight:bold;font-size:25px">ధర</th>
        <th style="font-weight:bold;font-size:25px">ట్రిప్పులు</th>
        <th style="font-weight:bold;font-size:25px">మొత్తం</th>
    </tr>`;

    // // Initialize the counter for Sno
    // var sno = 1;
    // var s = 0;
    // // Iterate over the dates in the data object
    // var totaltrips = 0;
    // for (const date in data) {
    //     if (data.hasOwnProperty(date)) {
    //         // Iterate over the names within each date
    //         for (const name in data[date]) {
    //             if (data[date].hasOwnProperty(name)) {
    //                 const activities = data[date][name];
    //                 for (const activity in activities) {
    //                     if (activities.hasOwnProperty(activity)) {
    //                         var trips = parseInt(activities[activity]['Trips']);
    //                         var daytype = activities[activity];
    //                         // console.log(parseInt(activities[activity]['Trips']));
    //                         totaltrips += trips;
    //                         var amount = parseInt(activities[activity]['Price']);
    //                         s += (trips * amount);
    //                         out += `<tr>
    //                             <td style="font-weight:bold;font-size:25px">` + sno + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + formatDateToNormal(date) + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + name + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + activity + `</td>
    //                             <td style="display:none;">`+ drivername + `</td>
    //                             <td style="font-weight:bold;font-size:25px"><button type="button" class="edit" onclick="openPopup1(this)">Edit</button></td>
    //                             <td style="font-weight:bold;font-size:25px">` + activities[activity]['Price'] + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + activities[activity]['Trips'] + `</td>
    //                             <td style="font-weight:bold;font-size:25px">` + trips * amount + `</td>
    //                         </tr>`;

    //                         // Increment the Sno counter
    //                         sno++;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    // out += `<tr>
    //     <td colspan="6" style="font-weight:bold;font-size:25px">ట్రిప్పులు మొత్తానికి అయిన డబ్బులు</td>
    //     <td colspan="1" style="font-weight:bold;font-size:25px">` + totaltrips + `</td>
    //     <td colspan="1" style="font-weight:bold;font-size:25px">` + s + `</td>
    // </tr>`
    // // Close the table structure
    // out += "</table>";

    // // Update the innerHTML of the element
    // r.innerHTML = out;
    // r.style.display = "block";

    // Initialize counters
    let sno = 1;
    let totaltrips = 0;
    let s = 0;

    // assuming `data` is snapshot.val()
    for (const key in data) {
        if (data.hasOwnProperty(key)) {

            const record = data[key];

            const date = record.Date;
            const name = record.CustomerName;
            const shift = record.Shift;
            const drivername = record.Driver;

            const trips = parseInt(record.Trips) || 0;
            const amount = parseInt(record.Price) || 0;

            totaltrips += trips;
            s += trips * amount;

            out += `
        <tr>
            <td style="font-weight:bold;font-size:25px">${sno}</td>
            <td style="font-weight:bold;font-size:25px">${key}</td>
            <td style="font-weight:bold;font-size:25px">${formatDateToNormal(date)}</td>
            <td style="font-weight:bold;font-size:25px">${name}</td>
            <td style="font-weight:bold;font-size:25px">${shift}</td>
            <td style="display:none;">${drivername}</td>
            <td style="font-weight:bold;font-size:25px">
                <button type="button" class="edit" onclick="openPopup1(this)">Edit</button>
            </td>
            <td style="font-weight:bold;font-size:25px">${amount}</td>
            <td style="font-weight:bold;font-size:25px">${trips}</td>
            <td style="font-weight:bold;font-size:25px">${trips * amount}</td>
        </tr>`;

            sno++;
        }
    }

    // Total row
    out += `
<tr>
    <td colspan="7" style="font-weight:bold;font-size:25px">
        ట్రిప్పులు మొత్తానికి అయిన డబ్బులు
    </td>
    <td style="font-weight:bold;font-size:25px">${totaltrips}</td>
    <td style="font-weight:bold;font-size:25px">${s}</td>
</tr>
`;

    // Close table
    out += "</table>";

    // Render
    r.innerHTML = out;
    r.style.display = "block";

}




function displayamountdata(data) {
    // console.log(data);
    var r = document.getElementById("amountdata");
    r.innerHTML = "";

    // Initialize the table structure
    var out = `<table border="1px" class="blodfont">
    <tr>
    <th style="font-weight:bold;font-size:25px">తోలకం</th>
    <th style="font-weight:bold;font-size:25px">తేదీ</th>
    <th style="font-weight:bold;font-size:25px">కారణం</th>
    <th style="font-weight:bold;font-size:25px">డబ్బులు తీసుకున్నవి</th>
</tr>`;

    // // Initialize the counter for Sno
    // var sno = 1;
    // var s = 0;
    // // Iterate over the dates in the data object
    // for (const date in data) {
    //     // console.log(date[0]);
    //     if (data.hasOwnProperty(date)) {
    //         // Iterate over the names within each date
    //         var amount = parseInt(data[date]['Amount'])
    //         s += amount
    //         out += `<tr>
    //                 <td style="font-weight:bold;font-size:25px">` + sno + `</td>
    //                 <td style="font-weight:bold;font-size:25px">` + formatDateToNormal(date) + `</td>
    //                 <td style="font-weight:bold;font-size:25px">` + data[date]['Purpose'] + `</td>
    //                 <td style="font-weight:bold;font-size:25px">` + data[date]['Amount'] + `</td>
    //             </tr>`;

    //         // Increment the Sno counter
    //         sno++;

    //     }
    // }
    // out += `<tr>
    //       <td colspan="3" style="font-weight:bold;font-size:25px">మొత్తాO డబ్బులు తీసుకున్నవి</td>
    //       <td colspan="1" style="font-weight:bold;font-size:25px">`+ s + `</td>
    //     </tr>`
    // // Close the table structure
    // out += "</table>";

    // // Update the innerHTML of the element
    // r.innerHTML = out;
    // r.style.display = "block";

    // Initialize the counter for Sno
    var sno = 1;
    var s = 0;

    // Iterate over UNIQUE IDs
    for (const uid in data) {
        if (data.hasOwnProperty(uid)) {

            const record = data[uid];

            const amount = parseInt(record.Amount || 0);
            s += amount;

            out += `<tr>
            <td style="font-weight:bold;font-size:25px">${sno}</td>
            <td style="font-weight:bold;font-size:25px">${formatDateToNormal(record.Date)}</td>
            <td style="font-weight:bold;font-size:25px">${record.Purpose || "-"}</td>
            <td style="font-weight:bold;font-size:25px">${amount}</td>
        </tr>`;

            sno++;
        }
    }

    // Total row
    out += `<tr>
    <td colspan="3" style="font-weight:bold;font-size:25px">మొత్తం డబ్బులు తీసుకున్నవి</td>
    <td style="font-weight:bold;font-size:25px">${s}</td>
</tr>`;

    // Close table
    out += "</table>";

    // Render
    r.innerHTML = out;
    r.style.display = "block";

}
function done() {
    // console.log("drivername" + name1);
    // console.log("total trips: " + totaltrips);
    // console.log("amounttaken: " + amounttaken);
    // console.log("totalamount: " + totalamount);
    // console.log("bal: " + (totalamount - amounttaken));
}
// function displaybal1(data, n) {
//     amounttaken = 0;
//     name1 = n;
//     totaltrips = 0;
//     totalamount = 0;
//     // Iterate over the dates in the data object
//     for (const date in data) {
//         if (data.hasOwnProperty(date)) {
//             // Iterate over the names within each date
//             for (const name in data[date]) {
//                 if (data[date].hasOwnProperty(name)) {
//                     const activities = data[date][name];
//                     for (const activity in activities) {
//                         if (activities.hasOwnProperty(activity)) {
//                             var trips = parseInt(activities[activity]['Trips']);
//                             var amount = parseInt(activities[activity]['Price']);
//                             totalamount += (trips * amount);
//                             totaltrips += trips;
//                             drivername = data[date][name];
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     done();
//     displaybalanacedata();

// }

function displaybal1(data, n) {

    name1 = n;
    totaltrips = 0;
    totalamount = 0;

    // data is already FILTERED by driver
    for (const uid in data) {
        if (data.hasOwnProperty(uid)) {

            const record = data[uid];

            const trips = parseInt(record.Trips || 0);
            const price = parseInt(record.Price || 0);

            totaltrips += trips;
            totalamount += trips * price;
        }
    }

    done();
    displaybalanacedata();
}

// function displaybal2(data) {
//     amounttaken = 0;
//     // Iterate over the dates in the data object
//     for (const date in data) {
//         if (data.hasOwnProperty(date)) {
//             // Iterate over the names within each date
//             var amount = parseInt(data[date]['Amount'])
//             amounttaken += amount
//         }
//     }
//     done();
//     displaybalanacedata();
// }

function displaybal2(data) {

    amounttaken = 0;

    // data is already FILTERED by driver
    for (const uid in data) {
        if (data.hasOwnProperty(uid)) {

            const record = data[uid];
            amounttaken += parseInt(record.Amount || 0);
        }
    }

    done();
    displaybalanacedata();
}


function displaybalanacedata() {
    var r = document.getElementById("driverbal");
    r.innerHTML = "";

    // Initialize the table structure
    var out = `<table border="1px" class="blodfont1">
    <tr>
    <th style="font-weight:bold;font-size:25px" >యజమాని పేరు</th>
    <th style="font-weight:bold;font-size:25px">ట్రిప్పులు</th>
    <th style="font-weight:bold;font-size:25px">మొత్తం డబ్బులు</th>
    <th style="font-weight:bold;font-size:25px">డబ్బులు ఇచ్చినవి</th>
    <th style="font-weight:bold;font-size:25px">ఇవ్వాల్సిన డబ్బులు</th>
</tr>`;
    out += `<tr class="blodfont">
        <td style="font-weight:bold;font-size:25px">` + name1 + `</td>
        <td style="font-weight:bold;font-size:25px">` + totaltrips + `</td>
        <td style="font-weight:bold;font-size:25px">` + totalamount + `</td>
        <td style="font-weight:bold;font-size:25px">` + amounttaken + `</td>
        <td style="font-weight:bold;font-size:25px">` + (totalamount - amounttaken) + `</td>
    </tr>`
    // Close the table structure
    out += "</table>";

    // Update the innerHTML of the element
    r.innerHTML = out;
    r.style.display = "block";
}
function NoDatatrips() {
    // console.log("hi no data");
    var d = document.getElementById("def1");
    d.style.display = "block";
    // p1.style.display = "block";
}
function NoDataamount() {
    var d = document.getElementById("def2");
    var p1 = document.getElementById("amountdata");
    d.style.display = "block";
    // p1.style.display = "block";
}
function NoDatabal() {
    var d = document.getElementById("def3");
    var p1 = document.getElementById("driverbal");
    d.style.display = "block";
    // p1.style.display = "block";
}
