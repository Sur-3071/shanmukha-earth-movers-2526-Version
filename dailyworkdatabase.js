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

document.getElementById('submit1').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("dat").value;
    const wid = document.getElementById("wid").value;
    const name = document.getElementById("name").value;
    const villname = document.getElementById("vill").value;
    const pno = "**";
    const disel = document.getElementById("dis").value;
    var con = document.getElementById("con").value;
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;
    var ttime = document.getElementById("ttime").value;
    var drivers = document.getElementById("output").value;
    const rate = document.getElementById("rate").value;
    const shift = "**";
    const worktype = document.getElementById("worktype").value;
    var trips = document.getElementById("trips").value;
    var hrsamt = document.getElementById("hrsrate").value;
    var trpamt = document.getElementById("trprate").value;

    document.getElementById("userForm1").reset();
    setTimeout(() => {
        location.reload();
    }, 2000);
    if (trips.length > 0) {
        stime = "--";
        etime = "--";
        ttime = "--";
        con = "--";
        hrsamt = "--";


    }
    else {
        if (con.length > 0) {
            trips = "--";
            stime = "--";
            etime = "--";
            ttime = "--";
            drivers = "--";
            hrsamt = "--";
            trpamt = "--";
        }
        else {
            trips = "--";
            drivers = "--";
            con = "--";
            trpamt = "--";
        }
    }
    if (dat.length > 0) {
        if (name.length > 0) {
            if (villname.length > 0) {
                if (disel.length > 0) {
                    if (shift !== "select Shift Type") {
                        const db1 = "Sethu";
                        const db2 = "Work_Count";
                        const db3 = "Sethu_Id";
                        const db4 = "Work_Id";
                        const db5 = "Daily Work";
                        const w_id = ref(db, `${db2}`);
                        const dataRefset = ref(db, `${db5}/${wid}`);
                        var sethu_databasecount = ref(db, `${db2}/${db3}`);
                        const sethu_snapshot = await get(sethu_databasecount);
                        var sethuid = parseInt(sethu_snapshot.val());
                        var work_databasecount = ref(db, `${db2}/${db4}`);
                        const work_snapshot = await get(work_databasecount);
                        var workid = parseInt(work_snapshot.val());
                        try {
                            if (workid == wid) {
                                await set(w_id, {
                                    Sethu_Id: parseInt(sethuid),
                                    Work_Id: parseInt(workid) + 1
                                });
                            }
                            var pay = "UnPaid";
                            await set(dataRefset, {
                                Date: dat,
                                Name: name,
                                Villagename: villname,
                                PhoneNumber: pno,
                                Shift: shift,
                                Contract: con,
                                Payment: pay,
                                Disel: disel,
                                HoursPrice: hrsamt,
                                TripsPrice: trpamt,
                                Trips: trips,
                                Drivers: drivers,
                                Starting: stime,
                                Ending: etime,
                                TotalTime: ttime,
                                Price: rate
                            });
                            document.getElementById("done").style.display = "block";
                            removedone();
                        } catch (error) {
                            console.error("Error adding document: ", error);
                            alert("An error occurred. Please try again.");
                        }
                    }
                    else {
                        alert("Please select shift type", speakText("Please select shift type"));
                        datarebuild();
                    }
                }
                else {
                    alert("Please Enter Disel Amount", speakText("Please Enter Disel Amount"));
                    datarebuild();
                }
            }
            else {
                alert("Please Enter Village Name", speakText("Please Enter Village Name"));
                datarebuild();
            }
        }
        else {
            alert("Please Enter Customer Name Or place Or Location Name", speakText("Please Enter Customer Name Or place Or Location Name"));
            datarebuild();
        }
    }
    else {
        alert("Please Choose Date", speakText("Please Choose Date"));
        datarebuild();
    }
    function isAllDigits(str) {
        return /^\d+$/.test(str);
    }
    function datarebuild() {
        document.getElementById("dat").value = dat;
        document.getElementById("wid").value = wid;
        document.getElementById("name").value = name;
        document.getElementById("vill").value = villname;
        document.getElementById("worktype").value = worktype;
        document.getElementById("hrsrate").value = hrsamt;
        document.getElementById("trprate").value = trpamt;
        document.getElementById("pno").value = pno;
        document.getElementById("dis").value = disel;
        document.getElementById("con").value = con;
        document.getElementById("stime").value = stime;
        document.getElementById("etime").value = etime;
        document.getElementById("ttime").value = ttime;
        document.getElementById("rate").value = rate;
        document.getElementById("shift").value = shift;
        document.getElementById("trips").value = trips;
    }
    function speakText(s) {
        // Check if the browser supports speech synthesis
        if ('speechSynthesis' in window) {
            // Get the text from the textarea
            let text = s;

            // Create a new SpeechSynthesisUtterance object
            let speech = new SpeechSynthesisUtterance();

            // Set the text to be spoken
            speech.text = text;

            // Set other properties (optional)
            speech.volume = 1; // Volume (0 to 1)
            speech.rate = 1; // Speed rate (0.1 to 10)
            speech.pitch = 1; // Pitch (0 to 2)
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, your browser does not support speech synthesis.');
        }
    }
});

document.getElementById('submit2').addEventListener('click', async function (e) {
    e.preventDefault();
    const wid = document.getElementById("cid").value;
    const name = document.getElementById("name1").value.toUpperCase();
    const villname = document.getElementById("vil1").value.toUpperCase();
    if (name.length > 0) {
        if (villname.length > 0) {
            const db1 = "Customers";
            const db2 = "Customers_Id";

            const w_id = ref(db, `${db1}/${db2}`);
            const dataRefset = ref(db, `${db1}/${wid}`);
            const work_snapshot = await get(w_id);
            // console.log("the return value is: ", RePrint7());
            if (await RePrint7() === "1") {
                document.getElementById("userForm2").reset();
                document.getElementById("nodata").style.display = "none";
                if (work_snapshot.exists()) {
                    var workid = parseInt(work_snapshot.val());

                    try {
                        if (workid === parseInt(wid)) {
                            await set(w_id, workid + 1);
                        }

                        await set(dataRefset, {
                            Name: name,
                            Villagename: villname,
                        });

                        document.getElementById("done").style.display = "block";
                        removedone();
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    } catch (error) {
                        console.log("Error updating Firebase data:", error);
                    }
                }
                else {
                    alert("Error ", speakText("Error"));
                    datarebuild();
                }
            }
            else {
                document.getElementById("nodata").style.display = "block";
                document.getElementById("userForm2").reset();
                setTimeout(() => {
                    document.getElementById("nodata").style.display = "none";
                }, 3000);

            }
        }
        else {
            alert("Please Enter Village Name", speakText("Please Enter Village Name"));
            datarebuild();
        }
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name", speakText("Please Enter Customer Name Or place Or Location Name"));
        datarebuild();
    }
});

document.getElementById('submit3').addEventListener('click', async function (e) {
    e.preventDefault();
    const dte = document.getElementById("dat1").value;
    const name = document.getElementById("name2").value;
    const wid = document.getElementById("cid1").value;
    const Amount = document.getElementById("amt").value;
    const villname = document.getElementById("vil2").value;
    document.getElementById("userForm3").reset();
    if (name.length > 0) {
        if (Amount.length > 0) {
            const db1 = "CustomersAmount";
            const db2 = "CustomersAmount_Id";

            const w_id = ref(db, `${db1}/${db2}`);
            const dataRefset = ref(db, `${db1}/${wid}`);
            const work_snapshot = await get(w_id);

            if (work_snapshot.exists()) {
                var workid = parseInt(work_snapshot.val());

                try {
                    if (workid === parseInt(wid)) {
                        await set(w_id, workid + 1);
                    }

                    await set(dataRefset, {
                        Date: dte,
                        Name: name,
                        Villagename: villname,
                        Amouont: Amount
                    });

                    document.getElementById("done").style.display = "block";
                    removedone();
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } catch (error) {
                    console.log("Error updating Firebase data:", error);
                }
            }
            else {
                alert("Error ", speakText("Error"));
                datarebuild();
            }
        }
        else {
            alert("Please Enter Amount", speakText("Please Enter Amouont"));
            datarebuild();
        }
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name", speakText("Please Enter Customer Name Or place Or Location Name"));
        datarebuild();
    }
});

document.getElementById('submit4').addEventListener('click', async function (e) {
    e.preventDefault();
    const name = document.getElementById("name3").value;
    // document.getElementById("userForm4").reset();
    if (name.length > 0) {
        RePrint5();
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name", speakText("Please Enter Customer Name Or place Or Location Name"));
        datarebuild();
    }
});

document.getElementById('submit5').addEventListener('click', async function (e) {
    e.preventDefault();
    const name = document.getElementById("name4").value;
    // document.getElementById("userForm4").reset();
    if (name.length > 0) {
        RePrint51();
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name", speakText("Please Enter Customer Name Or place Or Location Name"));
        datarebuild();
    }
});
document.getElementById('submit6').addEventListener('click', async function (e) {
    e.preventDefault();
    const name = document.getElementById("name4").value;
    // document.getElementById("userForm4").reset();
    if (name.length > 0) {
        RePrint51();
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name", speakText("Please Enter Customer Name Or place Or Location Name"));
        datarebuild();
    }
});

async function RePrint5() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget1 = ref(db2, `Daily Work`);
        const snapshot1 = await get(dataRefget1);

        // Check if data exists
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            // console.log(data);
            generateCustomerTable(data);
            // generateTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data 989");
    }
}
async function RePrint51() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget1 = ref(db2, `Daily Work`);
        const snapshot1 = await get(dataRefget1);

        // Check if data exists
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            // console.log(data);
            generateCustomerTable1(data);
            // generateTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data 989");
    }
}
async function RePrint6(amt) {
    try {
        const db2 = getDatabase(app);
        const dataRefget2 = ref(db2, `CustomersAmount`);
        const snapshot2 = await get(dataRefget2);

        // Check if data exists
        if (snapshot2.exists()) {
            const data1 = snapshot2.val();
            generateCustomeramtTable(data1, amt);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}

async function RePrint7() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget1 = ref(db2, `Customers`);
        const snapshot1 = await get(dataRefget1);

        // Check if data exists
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            // console.log(data);
            return checkcustomer(data);
            // generateTable(data);
        } else {
            alert("No data available for the selected date.");
        }
    } catch (error) {
        alert("Error occurred while fetching data ");
    }
}

function checkcustomer(data) {
    // alert("Iam coming...");
    var formname = document.getElementById("name1").value;
    var c = 0;
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Name !== undefined) {
                // console.log(formname,activity.Name,formname.length,activity.Name.length);
                var name1 = activity.Name.toLowerCase().trim();
                var name2 = formname.toLowerCase().trim();
                // console.log("hi",name1,name2);
                if (name1 === name2) {
                    c = 1;
                }
            }
        }
    }
    if (c == 0) {
        return "1";
    }
    else {
        return "0";
    }

}

function generateCustomerTable(data) {
    var collection = 0;
    var recovery = 0;
    let out = `<table border="1px" background-color: cadetblue;" id="customerTable1">
    <tr>
    <th colspan="11" style="background-color:rgb(95, 237, 228);"><h1 style="text-align:center;font-size:50px;font-weight: bold;color:red">మొత్తం పని</h1></th>
    </tr>
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize">Trips</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">Payment Status</th>
            <th id="csize">Price</th>
        </tr>`;
    var l = [];
    var workday = 0;
    var totaltime = 0;
    var hou = 0;
    var mint = 0;
    var totaltrips = 0;
    var totalcontarct = 0;
    var formname = document.getElementById("name3").value.toLowerCase();
    // console.log(formname);
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            var editid = customerPhone + "v";
            // console.log(formname,activity.Name,formname.length,activity.Name.length);
            if (activity.Name.toLowerCase().trim() == formname.trim()) {
                var pri = 0;
                // recovery += parseInt(amount);
                if (activity.Trips !== "--") {
                    // pri=parseInt(activity.Trips)*parseInt(tripamt);
                    totaltrips += parseInt(activity.Trips);
                }
                if (activity.Contract !== "--") {
                    totalcontarct += parseInt(activity.Contract);
                    // pri=parseInt(activity.Contract);
                }

                if (activity.Starting !== "--") {
                    var timesplit = activity.TotalTime;
                    var v = timesplit.split(':');
                    hou += parseInt(v[0]);
                    mint += parseInt(v[1]);
                    // var permin=parseInt(hrsamt)/60;
                    // var totmin=parseInt(v[0])*60+parseInt(v[1]);
                    // pri=totmin*permin;
                }
                collection += parseInt(activity.Price);
                // console.log(activity);
                let color = activity.Payment === "Paid" ? "green" : "red";
                out += `<tr>
                        <td>${customerPhone}</td>
                        <td>${formatDate(activity.Date)}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td>${activity.Trips}</td>
                        <td>${activity.Contract}</td>
                        <td>${activity.Starting}</td>
                        <td>${activity.Ending}</td>
                        <td>${activity.TotalTime}</td>
                        <td id="${activity.PhoneNumber}" style="color: ${color}; font-size:30px; font-weight:bold;">${activity.Payment}</td>
                        <td style="font-size:20px;">${moneyconvert(parseInt(activity.Price))}</td>
                    </tr>`;

            }
        }
    }
    var mintohou = parseInt(mint / 60);
    mint = mint - 60 * mintohou;
    hou += mintohou;
    totaltime = hou + ":" + mint;
    out += `<tr>
            <td colspan="4" id="col">Total Work Analaysis</td>
            <td  id="am" style="font-size:30px;">${totaltrips}</td>
            <td id="am" style="font-size:30px;">${totalcontarct}</td>
            <td id="am" colspan="3" style="font-size:30px;">${totaltime}</td>
            <td  id="col">Bill</td>
            <td id="col">${moneyconvert(collection)}</td>
            </tr>`;
    out += `</table>`;
    document.getElementById("customeralldata2").innerHTML = "";
    document.getElementById("customeralldata").innerHTML = out;
    document.getElementsByClassName("heading")[1].style.display = "block";

    RePrint6(collection);
}
function formatDate(isoDate) {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
}

function generateCustomerTable1(data) {
    let out="";

    out += `<table border="1px" id="customerTable1">
    <tr>
    <th colspan="10" style="background-color:rgb(95, 237, 228);"><h1 style="text-align:center;font-size:50px;font-weight: bold;color:red">మొత్తం పని</h1></th>
    </tr>
        <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Village</th>
            <th>Trips</th>
            <th>Contract</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>Total Time</th>
            <th>Rate</th>
            <th>Final Price</th>
        </tr>`;

    let totaltrips = 0, totalcontract = 0, hou = 0, mint = 0;

    let formname = document.getElementById("name4").value.toLowerCase();
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Name.toLowerCase().trim() === formname && activity.Payment === "UnPaid") {
                let totalMins = 0;
                if (activity.TotalTime !== "--") {
                    const [h, m] = activity.TotalTime.split(":").map(Number);
                    hou += h;
                    mint += m;
                    totalMins = h * 60 + m;
                }

                let type = "";
                let dropdown = "";
                let finalAmount = 0;

                // 👇 New logic to get default rate properly
                let defaultRate = 0;
                if (activity.Contract !== "--") {
                    defaultRate = parseInt(activity.Contract);
                } else if (activity.Trips !== "--") {
                    defaultRate = parseInt(activity.TripsPrice || "150");
                } else {
                    defaultRate = parseInt(activity.HoursPrice || "1000");
                }

                // alert(defaultRate);
                // 👇 Rate type handling
                if (activity.Contract !== "--") {
                    type = "Contract";
                    let contractAmt = parseInt(activity.Contract);
                    dropdown = `<option value="${contractAmt}" selected>₹${contractAmt}</option>`;
                    finalAmount = contractAmt;
                    totalcontract += 1;
                } else if (activity.Trips !== "--") {
                    type = "Trips";
                    for (let i = 100; i <= 1000; i += 10) {
                        dropdown += `<option value="${i}" ${i === defaultRate ? "selected" : ""}>₹${i}</option>`;
                    }
                    finalAmount = parseInt(activity.Trips) * defaultRate;
                    totaltrips += parseInt(activity.Trips);
                } else {
                    type = "Hours";
                    for (let i = 800; i <= 2000; i += 100) {
                        dropdown += `<option value="${i}" ${i === defaultRate ? "selected" : ""}>₹${i}</option>`;
                    }
                    finalAmount = Math.round((totalMins / 60) * defaultRate);
                }

                out += `<tr data-type="${type}" data-trips="${activity.Trips}" data-mins="${totalMins}">
                    <td>${activity.Date}</td>
                    <td>${activity.Name}</td>
                    <td>${activity.Villagename}</td>
                    <td>${activity.Trips}</td>
                    <td>${activity.Contract}</td>
                    <td>${activity.Starting}</td>
                    <td>${activity.Ending}</td>
                    <td>${activity.TotalTime}</td>
                    <td>
                        <select class="rateDropdown" onchange="calculateFinalPrice(this)" ${type === "Contract" ? "disabled" : ""}>
                            ${dropdown}
                        </select>
                        <div style="font-size:10px;color:gray;">(${type})</div>
                    </td>
                    <td><input type="number" class="finalPrice" value="${finalAmount}" readonly style="width:80px;" /></td>
                </tr>`;
            }
        }
    }

    let mintohou = Math.floor(mint / 60);
    mint = mint % 60;
    hou += mintohou;

    out += `<tr>
        <td colspan="3">Total Work</td>
        <td>${totaltrips}</td>
        <td>${totalcontract}</td>
        <td colspan="3">${hou}:${mint}</td>
        <td>Bill</td>
        <td id="totalBill">--</td>
    </tr>`;

    out += `</table>`;
    document.getElementById("customeralldata2").innerHTML = out;
    document.getElementsByClassName("heading")[3].style.display = "block";
    document.getElementsByClassName("heading")[4].style.display = "block";
    document.getElementsByClassName("heading")[5].style.display = "block";


    calculateTotalBill();
}


function moneyconvert(number) {
    let formatted = number.toLocaleString('en-IN');
    return formatted;
}

function generateCustomeramtTable(data, amt) {
    var collection1 = 0;
    let out1 = `<table border="1px">
    <tr>
    <th colspan="5" style="background-color:rgb(95, 237, 228);"><h1 style="text-align:center;font-size:50px;font-weight: bold;color:red">ఇచ్చిన మొత్తం డబ్బులు</h1></th>
    </tr>
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Customer Name</th>
            <th id="csize1">Village</th>
            <th id="csize">Amount</th>
        </tr>`;
    var l = [];
    // alert("jii");
    var formname = document.getElementById("name3").value.toLowerCase();
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Name !== undefined && activity.Name.toLowerCase().trim() == formname.trim()) {
                // console.log(activity.Name);
                collection1 += parseInt(activity.Amouont);
                out1 += `<tr>
                        <td>${customerPhone}</td>
                        <td>${activity.Date}</td>
                        <td>${activity.Name}</td>
                        <td>${activity.Villagename}</td>
                        <td style="font-size:20px;">${moneyconvert(parseInt(activity.Amouont))}</td>
                    </tr>`;


            }
        }
    }
    // console.log(collection1);
    out1 += `<tr>
            <td colspan="4" id="col">Total Amount Given</td>
            <td id="am">${moneyconvert(collection1)}</td>
            </tr>`;
    out1 += `</table>`;
    document.getElementById("customerallamt2").innerHTML = "";
    document.getElementById("customerallamt").innerHTML = out1;
    // document.getElementsByClassName("heading")[2].style.display = "block";


    let led = `<table border="1px">
    <tr>
    <th colspan="3" style="background-color:rgb(95, 237, 228);"><h1 style="text-align:center;font-size:50px;font-weight: bold;color:red">ఇవ్వాల్సినా  డబ్బులు</h1></th>
    </tr>
     <tr>
        <th id="bal1">Total Work</th>
        <th id="bal1">Collected Money</th>
        <th id="bal1">Balanace</th>

    </tr>`;
    led += `<tr>
    <td class="lsize" style="font-size:30px;">${moneyconvert(amt)}</td>
    <td style="font-size:30px;">${moneyconvert(collection1)}</td>
    <td style="font-size:30px;">${moneyconvert(amt - collection1)}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger2").innerHTML = "";
    document.getElementById("ledger").innerHTML = led;
    // document.getElementsByClassName("heading")[3].style.display = "block";
    // document.getElementsByClassName("heading")[4].style.display = "block";


}
