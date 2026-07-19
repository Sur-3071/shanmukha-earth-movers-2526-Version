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

document.getElementById('submit4').addEventListener('click', async function (e) {
    e.preventDefault();
    showProcessingPopup();
    console.log("Submit button clicked"+e.target.value);
    const dat = document.getElementById("dat").value;
    const wid = document.getElementById("wid").value;
    const name = document.getElementById("name").value;
    const villname = document.getElementById("vil").value;
    // const pno = document.getElementById("pno").value;
    const disel = document.getElementById("dis").value;
    var con = document.getElementById("con").value;
    var desc = document.getElementById("desc").value;
    var stime = document.getElementById("stime").value;
    var etime = document.getElementById("etime").value;
    var ttime = document.getElementById("ttime").value;
    const rate = document.getElementById("rate").value;
    var hrsamt = document.getElementById("hrsrate").value;
    var trpamt = document.getElementById("trprate").value;
    var jcbtrpamt = document.getElementById("jcbtrprate").value;
    var trips = document.getElementById("trips").value;
    var mis = document.getElementById("mis").value;
    var output = document.getElementById("output").value;
    var pay = document.getElementById("pay").value;
    const beta = document.getElementById("beta").value;
    var hourstrpamt = document.getElementById("trprate1").value;
    var hoursdrivers = document.getElementById("output1").value;
    var hourstrips = document.getElementById("trips1").value;
    var hoursnoncompanytractors = document.getElementById("hoursnoncompanytractors").value;
    var noncompanytractors = document.getElementById("noncompanytractors").value;
    var overallamount = 0;
    // alert(trips+" "+con);
    if (trips.length > 0 && trips !== "--") {
        const jcb = parseInt(jcbtrpamt) || 0;
        const tripAmt = parseInt(trpamt) || 0;
        const tripCount = parseInt(trips) || 0;
        const b = parseInt(beta) || 0;

        overallamount = (jcb + tripAmt) * tripCount + b - (tripAmt * noncompanytractors);

    }
    else {
        // alert(trips+" "+con);
        if (con.length > 0 && con !== "--") {
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

            overallamount = b + r + (hAmt * hCnt) - ((hAmt * hoursnoncompanytractorstrips));

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
                        Miscellaneous: mis,
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
                    hideProcessingPopup();

                    document.getElementById("paymentSuccessPopup5").style.display = "flex";
                    // document.getElementById("done").style.display = "block";
                    setTimeout(() => {
                        document.getElementById("paymentSuccessPopup5").style.display = "none";
                    }, 3000);
                } catch (error) {
                    hideProcessingPopup();
                    console.error("Error adding document: ", error);
                    alert("An error occurred. Please try again.");
                }


            }
            else {
                hideProcessingPopup();
                alert("Please Enter Village Name");
            }
        }
        else {
            hideProcessingPopup();
            alert("Please Enter Customer Name Or place Or Location Name");
        }
    }
});