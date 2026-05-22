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

document.getElementById('submit1').addEventListener('click', async function (e) {
    e.preventDefault();
    const dat = document.getElementById("dat").value;
    const wid = document.getElementById("wid").value;
    const name = document.getElementById("name").value;
    const villname = document.getElementById("vill").value;
    const pno = "**";
    const disel = document.getElementById("dis").value || "0";
    var con = document.getElementById("con").value;
    var desc = document.getElementById("desc").value || "--";;
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;
    var ttime = document.getElementById("ttime").value;
    var drivers = document.getElementById("output").value;
    const rate = document.getElementById("rate").value;
    const shift = "**";
    const worktype = document.getElementById("worktype").value;
    var trips = document.getElementById("trips").value || "0";
    var hrsamt = document.getElementById("hrsrate").value || "1000";
    var jcbtrpamt = document.getElementById("jcbtrprate").value || "0";
    var trpamt = document.getElementById("trprate").value || "0";
    const beta = document.getElementById("beta").value || "0";
    var hourstrpamt = document.getElementById("trprate1").value || "0";
    var hoursdrivers = document.getElementById("output1").value;
    var hourstrips = document.getElementById("trips1").value || "0";
    var noncompanytractorstrips = document.getElementById("noncompanytractors").value || "0";
    var hoursnoncompanytractorstrips = document.getElementById("hoursnoncompanytractors").value || "0";
    // alert(beta,hourstrpamt,hoursdrivers,hourstrips);
    var overallamount = 0;
    document.getElementById("userForm1").reset();
    setTimeout(() => {
        location.reload();
    }, 2000);
    if (trips.length > 0 && trips !== "0") {
        stime = "--";
        etime = "--";
        ttime = "--";
        con = "--";
        hrsamt = "--";
        overallamount = (parseInt(jcbtrpamt) + parseInt(trpamt)) * parseInt(trips) + parseInt(beta) - (parseInt(trpamt) * parseInt(noncompanytractorstrips));
        // alert(overallamount);


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
            overallamount = parseInt(con) + parseInt(beta);
            // alert(overallamount);
        }
        else {
            trips = "--";
            drivers = "--";
            con = "--";
            trpamt = "--";
            const b = parseInt(beta) || 0;
            const r = parseInt(rate) || 0;
            const hAmt = parseInt(hourstrpamt) || 0;
            const hCnt = parseInt(hourstrips) || 0;
            const hnoncompanytractorstrips = parseInt(hoursnoncompanytractorstrips) || 0;

            overallamount = b + r + (hAmt * hCnt) - (hAmt * hnoncompanytractorstrips);

            // alert(overallamount);
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
                        const db5 = DBConstants.DailyWorkDB;
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
                            if (name === "CASH WORK") {
                                pay = "Paid";
                            }
                            await set(dataRefset, {
                                Date: dat,
                                Name: name,
                                Villagename: villname,
                                PhoneNumber: pno,
                                Beta: beta,
                                HoursTrips: hourstrips,
                                HoursTripsAmount: hourstrpamt,
                                HoursDrivers: hoursdrivers,
                                Shift: shift,
                                Contract: con,
                                Payment: pay,
                                Disel: disel,
                                Description: desc,
                                HoursPrice: hrsamt,
                                TripsPrice: trpamt,
                                JcbTripPrice: jcbtrpamt,
                                Trips: trips,
                                Drivers: drivers,
                                Starting: stime,
                                OverallPrice: overallamount,
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
                        alert("Please select shift type");
                        datarebuild();
                    }
                }
                else {
                    alert("Please Enter Disel Amount");
                    datarebuild();
                }
            }
            else {
                alert("Please Enter Village Name");
                datarebuild();
            }
        }
        else {
            alert("Please Enter Customer Name Or place Or Location Name");
            datarebuild();
        }
    }
    else {
        alert("Please Choose Date");
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
        document.getElementById("beta").value = beta;
        document.getElementById("worktype").value = worktype;
        document.getElementById("desc").value = desc;
        document.getElementById("hrsrate").value = hrsamt;
        document.getElementById("trprate").value = trpamt;
        document.getElementById("jcbtrprate").value = jcbtrpamt;
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
});


document.getElementById('submit2').addEventListener('click', async function (e) {
    e.preventDefault();
    const wid = document.getElementById("cid").value;
    const name = document.getElementById("name1").value.toUpperCase();
    const villname = document.getElementById("vil1").value.toUpperCase();
    if (name.length > 0) {
        if (villname.length > 0) {
            const db1 = DBConstants.Customers;
            const db2 = DBConstants.Customers_Id;

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
                    alert("Word Id Error");
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
            alert("Please Enter Village Name");
            datarebuild();
        }
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name");
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
    // alert("iam coming 1");
    document.getElementById("userForm3").reset();
    if (name.length > 0) {
        if (Amount.length > 0) {
            getExtraAmount(Amount, name, wid, dte, villname);
        }
        else {
            alert("Please Enter Amount");
            datarebuild();
        }
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name");
        datarebuild();
    }
});

document.getElementById('submit7').addEventListener('click', async function (e) {
    e.preventDefault();
    const dte = document.getElementById("dat6").value;
    const name = document.getElementById("name6").value;
    const wid = document.getElementById("cid6").value;
    const Amount = document.getElementById("amt6").value;
    const villname = document.getElementById("vil6").value;
    // alert("iam coming 1");
    document.getElementById("userForm6").reset();
    if (name.length > 0) {
        if (Amount.length > 0) {
            getExtraAmount(Amount, name, wid, dte, villname);
        }
        else {
            alert("Please Enter Amount");
            datarebuild();
        }
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name");
        datarebuild();
    }
});

async function getExtraAmount(Amount, name, wid, dte, villname) {
    const db1 = DBConstants.CustomersAmount;
    const db2 = "ExtraAmount";
    const db3 = name;
    const customerRef = ref(db, `${db1}/${name}`);
    const customerSnapshot = await get(customerRef);
    if (!customerSnapshot.exists()) {
        // Add ExtraAmount: 0 only the first time
        await set(customerRef, {
            ExtraAmount: 0
        });
    }

    const Extraamount = ref(db, `${db1}/${db3}/${db2}`);
    const amount_snapshot = await get(Extraamount);

    if (amount_snapshot.exists()) {
        // alert("iam coming 2");
        var extramoney = parseInt(amount_snapshot.val());
        var totalded = parseInt(extramoney) + parseInt(Amount);
        // console.log(totalded);
        FindAllDataofcustomer(name, totalded, wid, dte, villname, Amount)
    }

}
async function FindAllDataofcustomer(name, totalded, wid, dte, villname, Amount) {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget = ref(db2, DBConstants.DailyWorkDB);
        const snapshot = await get(dataRefget);

        // Check if data exists
        if (snapshot.exists()) {
            const data = snapshot.val();
            changecustomerpaymentstatus(data, name, totalded, wid, dte, villname, Amount);

        } else {
            alert("No data available");
        }
    } catch (error) {
        alert("Error occurred while fetching data");
    }
}
async function changecustomerpaymentstatus(data, name, totalded, wid, dte, villname, Amount) {
    const db1 = DBConstants.DailyWorkDB;
    // alert("this is the customet payment");
    const db2 = DBConstants.CustomersAmount;
    // alert("Iam coming");
    var k = 0;
    for (const workId in data) {
        if (data.hasOwnProperty(workId)) {
            const activity = data[workId];

            // Only target work entries (skip ExtraAmount key)
            if (activity?.Name.trim().toLowerCase() === name.trim().toLowerCase() && activity?.Payment === "UnPaid") {
                k = 1;
                const price = parseInt(activity.OverallPrice);
                if (totalded >= price) {
                    totalded -= price;
                    var beta = 0;
                    var HoursTrips = 0;
                    var HoursTripsAmount = 0;
                    var HoursDrivers = 0;
                    var jcbtripprice = 0;
                    if (activity.Beta !== undefined) {
                        beta = activity.Beta;
                    }
                    if (activity.HoursTrips !== undefined) {
                        HoursTrips = activity.HoursTrips;
                    }
                    if (activity.HoursTripsAmount !== undefined) {
                        HoursTripsAmount = activity.HoursTripsAmount;
                    }
                    if (activity.HoursDrivers !== undefined) {
                        HoursDrivers = activity.HoursDrivers;
                    }
                    if (activity.JcbTripPrice !== undefined) {
                        jcbtripprice = activity.JcbTripPrice;
                    }
                    // alert(jcbtripprice + " " + activity.JcbTripPrice !== undefined);
                    // Update full object, just changing Payment to "Paid"
                    const updatedData = {
                        Contract: activity.Contract,
                        Date: activity.Date,
                        Disel: activity.Disel,
                        Ending: activity.Ending,
                        Name: activity.Name,
                        Payment: "Paid", // change here
                        PhoneNumber: activity.PhoneNumber,
                        Price: activity.Price,
                        Shift: activity.Shift,
                        Starting: activity.Starting,
                        TotalTime: activity.TotalTime,
                        Trips: activity.Trips,
                        Villagename: activity.Villagename,
                        Description: activity.Description,
                        Drivers: activity.Drivers,
                        HoursPrice: activity.HoursPrice,
                        TripsPrice: activity.TripsPrice,
                        Beta: beta,
                        OverallPrice: activity.OverallPrice,
                        HoursTrips: HoursTrips,
                        HoursTripsAmount: HoursTripsAmount,
                        HoursDrivers: HoursDrivers,
                        JcbTripPrice: jcbtripprice
                    };

                    const transactionRef = ref(db, `${db1}/${workId}`);
                    await set(transactionRef, updatedData);
                }
            }
        }
    }
    if (k == 0) {
        document.getElementById("nodata1").style.display = "block";
        setTimeout(() => {
            document.getElementById("nodata1").style.display = "none";
        }, 5000);
    }
    else {
        const db1 = DBConstants.CustomersAmount;
        const db3 = DBConstants.CustomersAmount_Id;
        const w_id = ref(db, `${db1}/${db3}`);
        const work_snapshot = await get(w_id);

        if (work_snapshot.exists()) {
            var workid = parseInt(work_snapshot.val());
            const dataRefset = ref(db, `${db1}/${name}/${workid}`);
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
                setTimeout(() => {
                    location.reload();
                }, 10000);
            } catch (error) {
                console.log("Error updating Firebase data:", error);
            }
        }
        else {
            alert(" Work Id Error ");
            datarebuild();
        }
        // Save leftover amount as ExtraAmount
        const extraRef = ref(db, `${db2}/${name}/ExtraAmount`);
        await set(extraRef, totalded);
        document.getElementById("done").style.display = "block";
        // document.getElementById("paydone").style.display = "block";
        // showPaymentSuccess();
        document.getElementById(
            "paymentSuccessPopup"
        ).style.display = "flex";

        setTimeout(() => {

            document.getElementById(
                "paymentSuccessPopup"
            ).style.display = "none";

        }, 2000);
        removedone();
    }
}




document.getElementById('submit4').addEventListener('click', async function (e) {
    e.preventDefault();
    const name = document.getElementById("name3").value;
    // document.getElementById("userForm4").reset();
    if (name.length > 0) {
        RePrint5();
    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name");
        datarebuild();
    }
});

document.getElementById('submit5').addEventListener('click', async function (e) {
    e.preventDefault();
    const name = document.getElementById("name4").value;
    // document.getElementById("userForm4").reset();
    if (name.length > 0) {
        // alert(name);
        RePrint51();

    }
    else {
        alert("Please Enter Customer Name Or place Or Location Name");
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
        alert("Please Enter Customer Name Or place Or Location Name");
        datarebuild();
    }
});

async function RePrint5() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget1 = ref(db2, DBConstants.DailyWorkDB);
        const snapshot1 = await get(dataRefget1);

        // Check if data exists
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            // console.log(data);
            generateCustomerTable(data);
            // generateTable(data);
        } else {
            alert("No data available");
        }
    } catch (error) {
        alert("Error occurred while fetching data for Fetching Customer Data");
    }
}
async function RePrint51() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget1 = ref(db2, DBConstants.DailyWorkDB);
        const snapshot1 = await get(dataRefget1);

        // Check if data exists
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            // console.log(data);
            generateCustomerTable1(data);
            getExtraAmountofuser();
            // generateTable(data);
        } else {
            alert("No data available");
        }
    } catch (error) {
        alert("Error occurred while fetching data for Fetching Customer Bill Data");
    }
}
async function RePrint6(amt) {
    try {
        var formname1 = document.getElementById("name3").value;
        const db2 = getDatabase(app);
        const dataRefget2 = ref(db2, `${DBConstants.CustomersAmount}/${formname1}`);
        const snapshot2 = await get(dataRefget2);
        // Check if data exists
        if (snapshot2.exists()) {
            const data1 = snapshot2.val();
            // alert(data1);
            generateCustomeramtTable(data1, amt);

        } else {
            alert("No Amount is given by Customer");
            document.getElementById("customerallamt").style.display = "none";
            document.getElementById("ledger").style.display = "none";

        }
    } catch (error) {
        alert("Error occurred while fetching data for Fetching Customer Amount Data");
    }
}

async function RePrint7() {

    try {
        // Access the database and retrieve data
        const db2 = getDatabase(app);
        const dataRefget1 = ref(db2, DBConstants.Customers);
        const snapshot1 = await get(dataRefget1);

        // Check if data exists
        if (snapshot1.exists()) {
            const data = snapshot1.val();
            // console.log(data);
            return checkcustomer(data);
            // generateTable(data);
        } else {
            alert("No data available ");
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
    let out = `<table border="1" id="customerTable1" style="border-collapse: collapse; width: 100%; text-align: center;">
    <tr>
    <th colspan="13" style="background-color:rgb(95, 237, 228);"><h1 style="text-align:center;font-size:50px;font-weight: bold;color:red">మొత్తం పని</h1></th>
    </tr>
        <tr>
            <th id="csize">Customer Id</th>
            <th id="csize1">Date</th>
            <th id="csize1">Description</th>
            <th id="csize">Drivers</th>
            <th id="csize">Trips</th>
            <th id="csize">Contract</th>
            <th id="csize">Starting Time</th>
            <th id="csize">Ending Time</th>
            <th id="csize">Total Time</th>
            <th id="csize">Beta</th>
            <th id="csize">Payment Status</th>
            <th id="csize">JCB Price</th>
            <th id="csize">Overall Price</th>
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
    var rec = 0;
    var overallamount = 0;
    var Driverslist = "";
    var beta = 0;
    var overallbeta = 0;
    var rowCount = 0; // 🔥 added for page control
    const uniqueDates = new Set();
    // data.sort((a, b) => {
    //     return new Date(a.Date) - new Date(b.Date);
    // });

    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            var editid = customerPhone + "v";
            // console.log(formname,activity.Name,formname.length,activity.Name.length);
            if (activity.Name.toLowerCase().trim() == formname.trim()) {
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
                    if (activity.Beta !== undefined && activity.Beta !== "undefined" && activity.Beta !== null) {
                        beta = activity.Beta;
                        overallbeta += parseInt(beta);
                    }

                    if (count > 1) {

                        let arr = str.split(" ").filter(Boolean);
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
                // console.log(HoursTripsAmount+" "+HoursTrips);
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
                var pri = 0;
                // recovery += parseInt(amount);
                if (activity.Trips !== "--") {
                    // pri=parseInt(activity.Trips)*parseInt(tripamt);
                    totaltrips += parseInt(activity.Trips);
                    Driverslist = LDrivers;
                }
                if (activity.Contract !== "--") {
                    totalcontarct += parseInt(activity.Contract);
                    // pri=parseInt(activity.Contract);
                }

                if (activity.Starting !== "--") {
                    Driverslist = HoursDrivers;
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
                var bal = 0;
                if (activity.Payment !== "Paid") {
                    bal = activity.Price;
                }
                overallamount += isNaN(activity.OverallPrice) ? 0 : activity.OverallPrice;
                rec += parseInt(bal);

                if (activity.Date) {
                    uniqueDates.add(activity.Date); // automatically unique
                }
                rowCount++;

                // 🔥 PAGE BREAK CONTROL (ONLY ADDITION)
                // if (rowCount % 15=== 0) {
                //     out += `<tr style="page-break-before: always;"></tr>`;
                // }
                let color = activity.Payment === "Paid" ? "green" : "red";

                out += `<tr style="font-size:16px; text-align:center;">

                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${customerPhone}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important; min-width:150px;">${formatDate(activity.Date)}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${activity.Description}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important; min-width:150px;">${Driverslist}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${activity.Trips}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${activity.Contract}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${activity.Starting}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${activity.Ending}</td>
                    <td style="padding:4px;font-weight:600; font-size:20px !important;">${activity.TotalTime}</td>
                    <td style="padding:4px; font-weight:bold; font-size:20px !important;">${beta}</td>

                    <td id="${activity.PhoneNumber}" 
                        style="color:${color}; font-size:20px; font-weight:bold; padding:4px;">
                        ${activity.Payment}
                    </td>

                    <td style="font-size:18px; font-weight:600; color:#2c5aa0; padding:4px;">
                        ₹${moneyconvert(parseInt(activity.Price))}
                    </td>

                    <td style="font-size:18px; font-weight:600; color:#1e8e3e; padding:4px;">
                        ₹${moneyconvert(parseInt(activity.OverallPrice))}
                    </td>

                </tr>`;

            }
        }
    }
    var mintohou = parseInt(mint / 60);
    mint = mint - 60 * mintohou;
    hou += mintohou;
    totaltime = hou + ":" + mint;
    out += `<tr>
            <td colspan="4" id="col">Total Work Analaysis For <b>${uniqueDates.size}</b> Days</td>
            <td  id="am" style="font-size:30px;">${totaltrips}</td>
            <td id="am" style="font-size:30px;">${totalcontarct}</td>
            <td id="am" colspan="3" style="font-size:30px;">${totaltime}</td>
            <td id="col">${moneyconvert(overallbeta)}</td>
            <td  id="col" colspan="1">Bill</td>
            <td id="col">${moneyconvert(collection)}</td>
            <td id="col">${moneyconvert(overallamount)}</td>
            </tr>`;
    out += `</table>`;
    document.getElementById("customeralldata2").innerHTML = "";
    document.getElementById("customeralldata").innerHTML =
        `<div class="table-scroll-only">${out}</div>`;
    document.getElementById("cusname").style.display = "block";
    document.getElementById("customeralldata").style.display = "block";
    document.getElementById("ledger").style.display = "block";
    document.getElementsByClassName("heading")[1].style.display = "block";

    RePrint6(overallamount);
}

function formatDate(isoDate) {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
}


function generateCustomerTable1(data) {
    // alert("i am coming");
    let out = "";

    out += `<table border="1px" id="customerTable1">
    <tr>
    <th colspan="13" style="background-color:rgb(95, 237, 228);"><h1 style="text-align:center;font-size:50px;font-weight: bold;color:red" id="heading">మొత్తం పని </h1></th>
    </tr>
        <tr>
            <th>Date</th>
            <th>HDrivers</th>
            <th>LDrivers</th>
            <th>Trips</th>
            <th>Contract</th>
            <th>Starting</th>
            <th>Ending</th>
            <th>TotalTime</th>
            <th>HTrips</th>
            <th>HTripRate</th>
            <th>Beta</th>
            <th>Total Price</th>
            <th>Final Price</th>
        </tr>`;

    let headname = "";
    let totaltrips = 0, totalcontract = 0, hou = 0, mint = 0;
    //  alert("i am coming");
    let formname = document.getElementById("name4").value.toLowerCase();
    // alert(formname);
    let k = 0;
    const uniqueDates = new Set();
    data.sort((a, b) => {
        return new Date(a.Date) - new Date(b.Date);
    });
    for (const customerPhone in data) {
        if (data.hasOwnProperty(customerPhone)) {
            const activity = data[customerPhone];
            if (activity.Name.toLowerCase().trim() === formname.trim() && activity.Payment === "UnPaid") {
                // alert("is there");
                headname = activity.Name;
                if (headname.toLowerCase() === "biyyam reddy") {
                    headname = "Bhaskar Reddy Garu Rajamundry";
                }

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
                let tracttrips = 0;
                if (activity.Contract !== "--") {
                    defaultRate = parseInt(activity.Contract);
                } else if (activity.Trips !== "--" && activity.Trips !== "0") {
                    defaultRate = parseInt(activity.JcbTripPrice || "150");
                    tracttrips = parseInt(activity.TripsPrice || "150");
                } else {
                    defaultRate = parseInt(activity.HoursPrice || "1000");
                }

                var beta = 0;
                var HoursTrips = 0;
                var HoursTripsAmount = 0;
                var HoursDrivers = 0;
                var jcbtripprice = 0;
                if (activity.JcbTripPrice !== undefined && activity.JcbTripPrice !== "undefined" && activity.JcbTripPrice !== null) {
                    jcbtripprice = activity.JcbTripPrice;
                }
                if (activity.Beta !== undefined && activity.Beta !== "undefined" && activity.Beta !== null) {
                    beta = activity.Beta;
                }
                if (activity.HoursTrips !== undefined && activity.HoursTrips !== "undefined" && activity.HoursTrips !== null) {
                    HoursTrips = activity.HoursTrips;
                }
                // console.log(activity.HoursTripsAmount !== "undefined" );
                if (activity.HoursTripsAmount !== undefined && activity.HoursTripsAmount !== "undefined" && activity.HoursTripsAmount !== null) {
                    HoursTripsAmount = activity.HoursTripsAmount;
                }
                if (activity.HoursDrivers !== undefined && activity.HoursDrivers !== "undefined" && activity.HoursDrivers !== null) {
                    let str = activity.HoursDrivers || "";
                    // alert(str);
                    let count = 0;
                    var Hnonpaytrips = 0;
                    for (let i = 0; i < str.length; i++) {
                        if (str[i] === "=") {
                            count++;
                        }
                    }

                    if (count > 1) {

                        let arr = str.split(" ").filter(Boolean);
                        let result = "";

                        for (let i = 0; i < arr.length; i += 3) {
                            if (arr[i] && arr[i + 2]) {       // <— check before adding
                                if (arr[i].toLowerCase().includes("own")) {
                                    Hnonpaytrips += parseInt(arr[i + 2]);
                                }
                                result += arr[i] + " = " + arr[i + 2] + "\n";
                            }
                        }
                        // console.log(result);

                        result = result.replace(/\n/g, "<br>");
                        HoursDrivers = result;

                    }
                    else {
                        let [name, value] = str.split("=").map(s => s.trim());

                        if (name.toLowerCase().includes("own")) {
                            Hnonpaytrips += parseInt(value);
                        }
                        HoursDrivers = str;
                    }

                }
                // console.log(HoursTripsAmount+" "+HoursTrips);
                var Lnonpaytrips = 0;
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
                        let arr = str.split(" ").filter(Boolean);
                        let result = "";

                        for (let i = 0; i < arr.length; i += 3) {
                            if (arr[i] && arr[i + 2]) {
                                if (arr[i].toLowerCase().includes("own")) {
                                    Lnonpaytrips += parseInt(arr[i + 2]);
                                }
                                result += arr[i] + " = " + arr[i + 2] + "\n";
                            }
                        }

                        result = result.replace(/\n/g, "<br>");
                        LDrivers = result;
                    }
                    else {
                        // LDrivers = str;
                        let [name, value] = str.split("=").map(s => s.trim());

                        if (name.toLowerCase().includes("own")) {
                            Lnonpaytrips += parseInt(value);
                        }

                        LDrivers = str;
                    }
                }
                var totalpriceload = 0;

                // alert(defaultRate);
                // 👇 Rate type handling
                if (activity.Contract !== "--") {
                    type = "Contract";
                    let contractAmt = parseInt(activity.Contract);
                    dropdown = `<option value="${contractAmt}" selected>₹${contractAmt}</option>`;
                    finalAmount = parseInt(contractAmt) + parseInt(beta);
                    totalcontract += parseInt(contractAmt);
                } else if (activity.Trips !== "--" && activity.Trips !== "0") {
                    type = "Trips";
                    // alert(Lnonpaytrips);
                    totalpriceload = (defaultRate + tracttrips);
                    for (let i = 100; i <= 5000; i += 5) {
                        dropdown += `<option value="${i}" ${i === totalpriceload ? "selected" : ""}>₹${i}</option>`;
                    }
                    finalAmount = (parseInt(activity.Trips) * (defaultRate + tracttrips)) + parseInt(beta) - (Lnonpaytrips * tracttrips);
                    totaltrips += parseInt(activity.Trips);
                } else {
                    type = "Hours";
                    for (let i = 800; i <= 2000; i += 100) {
                        dropdown += `<option value="${i}" ${i === defaultRate ? "selected" : ""}>₹${i}</option>`;
                    }
                    finalAmount = Math.round((totalMins / 60) * defaultRate) + parseInt(beta) + (parseInt(HoursTrips) * parseInt(HoursTripsAmount)) - (Hnonpaytrips * tracttrips);
                }
                if (activity.Date) {
                    uniqueDates.add(activity.Date); // automatically unique
                }

                // out += `<tr data-type="${type}" data-trips="${activity.Trips}" data-mins="${totalMins}">
                //     <td>${formatDate(activity.Date)}</td>
                //     <td>${HoursDrivers}</td>
                //     <td>${LDrivers}</td>
                //     <td>${activity.Trips}</td>
                //     <td>${activity.Contract}</td>
                //     <td>${activity.Starting}</td>
                //     <td>${activity.Ending}</td>
                //     <td>${activity.TotalTime}</td>
                //     <td>${HoursTrips}</td>
                //     <td>${HoursTripsAmount}</td>
                //     <td>${beta}</td>
                //     <td>
                //         <select class="rateDropdown" onchange="calculateFinalPrice(this,'${beta}', '${HoursTrips}','${tracttrips}', '${HoursTripsAmount}'); formeldger2();" ${type === "Contract" ? "disabled" : ""}>
                //             ${dropdown}
                //         </select>
                //         <div style="font-size:10px;color:gray;">(${type})</div>
                //     </td>
                //     <td><input type="number" class="finalPrice" value="${finalAmount}" readonly style="width:80px;" /></td>
                // </tr>`;

                out += `<tr data-type="${type}" data-trips="${activity.Trips}" data-mins="${totalMins}"
    style="font-size:16px; font-weight:600; text-align:center;"
    onmouseover="this.style.background='#f5faff'"
    onmouseout="this.style.background='white'">

    <td style="padding:8px;font-size:25px !important;">${formatDate(activity.Date)}</td>
    <td style="padding:8px; font-size:25px !important;">${HoursDrivers}</td>
    <td style="padding:8px; font-size:25px !important;">${LDrivers}</td>
    <td style="padding:8px; font-size:25px !important;">${activity.Trips}</td>
    <td style="padding:8px; font-size:25px !important;">${activity.Contract}</td>
    <td style="padding:8px; font-size:25px !important;">${activity.Starting}</td>
    <td style="padding:8px; font-size:25px !important;">${activity.Ending}</td>
    <td style="padding:8px; font-size:25px !important;">${activity.TotalTime}</td>
    <td style="padding:8px; font-size:25px !important;">${HoursTrips}</td>
    <td style="padding:8px; color:#2c5aa0; font-size:25px !important;">${HoursTripsAmount}</td>
    <td style="padding:8px; font-weight:700; font-size:25px !important;">${beta}</td>

    <td style="padding:8px; font-size:25px !important;">
        <select class="rateDropdown"
            onchange="calculateFinalPrice(this,'${beta}', '${HoursTrips}','${tracttrips}', '${HoursTripsAmount}'); formeldger2();"
            ${type === "Contract" ? "disabled" : ""}
            style="
                padding:6px;
                border-radius:6px;
                border:1px solid #ccc;
                font-weight:600;
                cursor:pointer;
            ">
            ${dropdown}
        </select>

        <div style="font-size:12px; color:gray; margin-top:4px;">
            (${type})
        </div>
    </td>

    <td style="padding:8px; font-size:25px !important;">
        <input type="number"
            class="finalPrice"
            value="${finalAmount}"
            readonly
            style="
                width:90px;
                padding:6px;
                font-weight:700;
                border-radius:6px;
                border:1px solid #ccc;
                text-align:center;
            " />
    </td>

</tr>`;
            }
        }
    }

    let mintohou = Math.floor(mint / 60);
    mint = mint % 60;
    hou += mintohou;

    out += `<tr>
        <td colspan="3" style="font-size:25px !important;">Total Work Analaysis For <b>${uniqueDates.size}</b> Days</td>
        <td style="font-size:25px !important;">${totaltrips}</td>
        <td style="font-size:25px !important;">${totalcontract}</td>
        <td colspan="3" style="font-size:25px !important;">${hou}:${mint}</td>
        <td colspan="4" style="font-size:25px !important;">Bill</td>
        <td id="totalBill" style="font-size:25px !important;">--</td>
    </tr>`;
    let heading = `<h1 id="customerHeading" style="text-align:center;font-size:45px;font-weight:bold;color:green;">
${headname} GARU</h1>`;

    out += `</table>`;
    document.getElementById("customeralldata2").innerHTML = heading + out;
    document.getElementById("customeralldata2").style.display = "block";
    setTimeout(function () {
        document.getElementById("ledger2").style.display = "block";
        document.getElementById("btn43").style.display = "flex";
    }, 7000);
    document.getElementsByClassName("heading")[3].style.display = "block";
    document.getElementsByClassName("heading")[4].style.display = "block";
    document.getElementsByClassName("heading")[5].style.display = "block";


    calculateTotalBill();
}

async function getExtraAmountofuser() {
    var formname1 = document.getElementById("name4").value;
    const db1 = DBConstants.CustomersAmount;
    const db21 = "ExtraAmount";
    const db3 = formname1;
    const customerRef = ref(db, `${db1}/${formname1}`);
    const customerSnapshot = await get(customerRef);
    if (!customerSnapshot.exists()) {
        // Add ExtraAmount: 0 only the first time
        await set(customerRef, {
            ExtraAmount: 0
        });
    }

    const Extraamount = ref(db, `${db1}/${db3}/${db21}`);
    const amount_snapshot = await get(Extraamount);
    var extramoney = 0;
    if (amount_snapshot.exists()) {
        // alert("iam coming 2");
        extramoney = parseInt(amount_snapshot.val());
        // console.log(totalded);
    }
    setTimeout(() => {
        formeldger2();
    }, 5000);
    localStorage.setItem("extramoney", extramoney);


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
            <th id="csize1" style="min-width: 150px;">Date</th>
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
            var rec = 0;
            if (activity.Name !== undefined && customerPhone !== "ExtraAmount" && activity.Name.toLowerCase().trim() == formname.trim()) {
                // console.log(activity.Name);
                collection1 += parseInt(activity.Amouont);
                out1 += `<tr>
                        <td style="font-size:25px !important;">${customerPhone}</td>
                        <td style="font-size:25px !important;">${activity.Date}</td>
                        <td style="font-size:25px !important;">${activity.Name.toLowerCase().includes("garu")
                        ? activity.Name
                        : activity.Name + " Garu"}</td>
                        <td style="font-size:25px !important;">${activity.Villagename}</td>
                        <td style="font-size:20px !important;">${moneyconvert(parseInt(activity.Amouont))}</td>
                    </tr>`;


            }
        }
    }
    // console.log(collection1);
    out1 += `<tr>
            <td colspan="4" id="col" style="padding:8px; font-size:25px !important;">Total Amount Given</td>
            <td id="am" style="padding:8px; font-size:25px !important;">${moneyconvert(collection1)}</td>
            </tr>`;
    out1 += `</table>`;
    document.getElementById("customerallamt2").innerHTML = "";
    document.getElementById("customerallamt").innerHTML = out1;
    document.getElementById("customerallamt").style.display = "block";
    document.getElementById("printBtn").style.display = "block";
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
    <td class="lsize" style="font-size:40px; font-weight: bold;">${moneyconvert(amt)}</td>
    <td style="font-size:40px; font-weight: bold;">${moneyconvert(collection1)}</td>
    <td style="font-size:40px; font-weight: bold;">${moneyconvert(amt - collection1)}</td>
    </tr>`;
    led += `</table>`;
    document.getElementById("ledger2").innerHTML = "";
    document.getElementById("ledger").innerHTML = led;
    // document.getElementsByClassName("heading")[3].style.display = "block";
    // document.getElementsByClassName("heading")[4].style.display = "block";


}