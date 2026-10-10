// var photo = "";
// var k1 = 0;
// var k2 = 0;
// var k3 = 0;
// var p1 = 0;
// var p2 = 0;
// var p3 = 0;
// var p4 = 0;
// var k5 = 0;
// var amounttaken = 0;
// var totalamount = 0;
// var totaltrips = 0;
// var name1 = "";
// var balance = totalamount - amounttaken;
// function formatDateToNormal(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
// }

// var list = {
//     "Def": "def",
//     "Sai": "sai",
//     "Batchu Raju": "raju",
//     "venkanna": "venkanna",
//     "swamy": "swamy",
//     "Chinnodu": "chinnodu",
//     "Abbulu": "abbulu",
//     "Kick": "kick",
//     "Nagu": "nagu1",
//     "Radhakrishna": "radha",
//     "srinu": "srinu",
//     "chanti": "chanti",
//     "Govindu": "govind",
//     "(Pun)Nagu": "nagu2",
//     "Nani": "nani",
//     "Chittibabu": "chittibabu",
//     "Ungarala Srinu": "usrinu"
// };
// function box1() {
//     var d = document.getElementById('dname1').value;
//     var d1 = document.getElementById('driver1');
//     // var t1 = document.getElementById('btn1')
//     // t1.textContent = "Open";
//     k1 = 0
//     // var r = document.getElementById("tripsdata");
//     // r.style.display = "none";
//     if (d == "Others") {
//         d1.style.display = "block";
//     }
//     else {
//         d1.style.display = "none";
//     }
// }
// var x1 = 0;
// var x2 = 0;
// var x3 = 0;

// function addtrip() {
//     var d = document.getElementById('list1');
//     var d1 = document.getElementById('b1');
//     if (x1 == 0) {
//         d.style.display = "block";
//         d1.textContent = "Close";
//         x1 = 1;
//     } else {
//         d.style.display = "none";
//         d1.textContent = "Add Data";
//         x1 = 0;
//     }
// }
// function showdriver() {
//     var p1 = document.getElementById("tripsdata");
//     var p2 = document.getElementById("amountdata");
//     var p3 = document.getElementById("driverbal");
//     p1.style.display = "none";
//     p2.style.display = "none";
//     p3.style.display = "none";
//     var d1 = document.getElementById('list2');
//     var d = document.getElementById('b2');
//     if (x2 == 0) {
//         d1.style.display = "block"
//         d.textContent = "Close"
//         x2 = 1
//     }
//     else {
//         d1.style.display = "none"
//         d.textContent = "Driver Data"
//         x2 = 0

//     }
// }
// function addamount() {
//     var d = document.getElementById('list3');
//     var d1 = document.getElementById('b3');
//     if (x3 == 0) {
//         d.style.display = "block"
//         d1.textContent = "Close"
//         x3 = 1
//     }
//     else {
//         document.getElementById("form1").reset();
//         d.style.display = "none"
//         d1.textContent = "Amount Data"
//         x3 = 0
//     }
// }


// async function transalate() {
//     try {
//         let convert = document.getElementById("cname");
//         let content = document.getElementById("cname").value;
//         if (content.length <= 0) {
//             // alert("Please Enter Customer Name");
//             return;
//         }

//         const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(content)}&langpair=en|te`;

//         const res = await fetch(url);

//         if (!res.ok) {
//             throw new Error(`HTTP Error: ${res.status}`);
//         }

//         const data = await res.json();
//         // Handle the translated data here
//         convert.innerHTML = "";
//         let text = data.responseData.translatedText;
//         // alert(text);
//         convert.value = text;

//     } catch (error) {
//         console.error(error);
//     }
// }

// async function transalatepur() {
//     try {
//         let convert = document.getElementById("pur");
//         let content = document.getElementById("pur").value;
//         if (content.length <= 0) {
//             // alert("Please Enter Customer Name");
//             return;
//         }

//         const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(content)}&langpair=en|te`;

//         const res = await fetch(url);

//         if (!res.ok) {
//             throw new Error(`HTTP Error: ${res.status}`);
//         }

//         const data = await res.json();
//         // Handle the translated data here
//         convert.innerHTML = "";
//         let text = data.responseData.translatedText;
//         // alert(text);
//         convert.value = text;

//     } catch (error) {
//         console.error(error);
//     }
// }


// function box2() {
//     var p1 = document.getElementById("tripsdata");
//     var p2 = document.getElementById("amountdata");
//     var p3 = document.getElementById("driverbal");
//     p1.style.display = "none";
//     p2.style.display = "none";
//     p3.style.display = "none";
//     // if (photo.length > 0) {
//     //     var d = document.getElementById(list[photo]);
//     //     d.style.display = "none";
//     // }
//     photo = document.getElementById('dname2').value;
//     // var d1 = list[photo]
//     // var d2 = document.getElementById(d1);
//     // d2.style.display = "block";
// }
// function box3() {
//     var d = document.getElementById('dname3').value;
//     var d1 = document.getElementById('driver3');
//     var t1 = document.getElementById('btn3')
//     t1.textContent = 'Open';
//     k3 = 0
//     var r = document.getElementById("amountdata");
//     r.style.display = "none";
//     if (d == "Others") {
//         d1.style.display = "block";
//     }
//     else {
//         d1.style.display = "none";
//     }
// }

// function removedone() {
//     setTimeout(function () {
//         var v7 = document.getElementById("done10");
//         v7.style.display = "none";
//     }, 2000);
// }
// function removedone1() {
//     setTimeout(function () {
//         var v7 = document.getElementById("done5");
//         v7.style.display = "none";
//     }, 2000);
// }

// function displayUpdatedtripsdata(data, drivername) {
//     showProcessingPopup();

//     document.getElementById("screenshot").style.display = "block";

//     var r = document.getElementById("tripsdata");
//     r.innerHTML = "";

//     // Convert Firebase object into array
//     const records = [];

//     for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//             records.push(data[key]);
//         }
//     }

//     // Sort by Date: oldest -> newest
//     records.sort((a, b) => {
//         const dateA = new Date(a.Date);
//         const dateB = new Date(b.Date);

//         return dateA - dateB;
//     });

//     if (drivername && drivername.trim() !== "Sai Teja Parts") {

//         // Initialize table structure
//         var out = `
//         <table border="1px" class="blodfont">
//             <tr>
//                 <th style="font-weight:bold;font-size:25px">తోలకం</th>
//                 <th style="font-weight:bold;font-size:25px;">తేదీ</th>
//                 <th style="font-weight:bold;font-size:25px">వినియోగదారుని పేరు</th>
//                 <th style="font-weight:bold;font-size:25px">పగలు/రాత్రి</th>
//                 <th style="display:none;">Driver</th>
//                 <th style="font-weight:bold;font-size:25px">ధర</th>
//                 <th style="font-weight:bold;font-size:25px">ట్రిప్పులు</th>
//                 <th style="font-weight:bold;font-size:25px">మొత్తం</th>
//             </tr>
//     `;

//         let sno = 1;
//         let totaltrips = 0;
//         let s = 0;

//         // Process sorted records
//         records.forEach(record => {

//             const date = record.Date;
//             const name = record.CustomerName;
//             const shift = record.Shift;
//             const drivername = record.Driver;

//             const trips = Number(record.Trips) || 0;
//             const amount = Number(record.Price) || 0;

//             totaltrips += trips;
//             s += trips * amount;

//             out += `
//             <tr>
//                 <td style="font-weight:bold;font-size:35px">${sno}</td>

//                 <td style="
//                     font-weight:bold;
//                     font-size:35px;
//                     white-space:nowrap;
//                     width:max-content;
//                 ">
//                     ${formatDateToNormal(date)}
//                 </td>

//                 <td style="font-weight:bold;font-size:35px">
//                     ${name}
//                 </td>

//                 <td style="font-weight:bold;font-size:35px">
//                     ${shift}
//                 </td>

//                 <td style="display:none;">
//                     ${drivername}
//                 </td>

//                 <td style="font-weight:bold;font-size:35px">
//                     ${amount}
//                 </td>

//                 <td style="font-weight:bold;font-size:35px">
//                     ${trips}
//                 </td>

//                 <td style="font-weight:bold;font-size:35px">
//                     ${trips * amount}
//                 </td>
//             </tr>
//         `;

//             sno++;
//         });

//         // Total row
//         out += `
//         <tr>
//             <td colspan="5"
//                 style="font-weight:bold;font-size:35px;text-align:right;">
//                 ట్రిప్పులు మొత్తానికి అయిన డబ్బులు
//             </td>

//             <td style="font-weight:bold;font-size:35px;">
//                 ${totaltrips}
//             </td>

//             <td style="font-weight:bold;font-size:35px;">
//                 ${s}
//             </td>
//         </tr>
//     `;

//         // Close table
//         out += "</table>";

//         // Render
//         r.innerHTML = out;
//         r.style.display = "block";

//         hideProcessingPopup();
//     }
//     else {
//         // Initialize table structure
//         var out = `
//         <table border="1px" class="blodfont">

//             <tr>
//                 <th style="font-weight:bold;font-size:25px">S.No</th>
//                 <th style="font-weight:bold;font-size:25px;">Date</th>
//                 <th style="font-weight:bold;font-size:25px">Person</th>
//                 <th style="font-weight:bold;font-size:25px">Description</th>
//                 <th style="font-weight:bold;font-size:25px">Amount</th>
//             </tr>
//     `;

//         let sno = 1;
//         let totalamount = 0;

//         // Process sorted records
//         records.forEach(record => {

//             const date = record.Date;
//             const person = record.person;
//             const description = record.Description;

//             const amount = parseInt(record.Amount) || 0;

//             totalamount += amount;

//             out += `
//             <tr>

//                 <!-- S.No -->
//                 <td style="font-weight:bold;font-size:35px">
//                     ${sno}
//                 </td>

//                 <!-- Date -->
//                 <td style="
//                     font-weight:bold;
//                     font-size:35px;
//                     white-space:nowrap;
//                     width:max-content;
//                 ">
//                     ${formatDateToNormal(date)}
//                 </td>

//                 <!-- Person -->
//                 <td style="font-weight:bold;font-size:35px">
//                     ${person}
//                 </td>

//                 <!-- Description -->
//                 <td style="font-weight:bold;font-size:35px">
//                     ${description}
//                 </td>

//                 <!-- Amount -->
//                 <td style="font-weight:bold;font-size:35px">
//                     ${amount}
//                 </td>

//             </tr>
//         `;

//             sno++;
//         });

//         // Total row
//         out += `
//         <tr>

//             <td colspan="4"
//                 style="
//                     font-weight:bold;
//                     font-size:35px;
//                     text-align:right;
//                 ">
//                 Total Amount
//             </td>

//             <td style="font-weight:bold;font-size:35px;">
//                 ${totalamount}
//             </td>

//         </tr>
//     `;

//         // Close table
//         out += "</table>";

//         // Render
//         r.innerHTML = out;
//         r.style.display = "block";

//         hideProcessingPopup();
//     }
// }

// function displaytripsdata(data, drivername) {

//     showProcessingPopup();

//     driver = drivername;
//     document.querySelector(".customer-title").textContent = drivername;

//     document.getElementById("screenshot").style.display = "block";

//     var r = document.getElementById("tripsdata");
//     r.innerHTML = "";


//     // =========================================================
//     //                  SAITEJA PARTS DATA
//     // =========================================================

//     if (drivername === "Sai Teja Parts") {

//         // Convert Firebase object into an array
//         const records = [];

//         for (const key in data) {
//             if (data.hasOwnProperty(key)) {

//                 records.push({
//                     key: key,
//                     record: data[key]
//                 });
//             }
//         }

//         // Sort by Date: oldest -> newest
//         records.sort((a, b) => {

//             const dateA = new Date(a.record.Date);
//             const dateB = new Date(b.record.Date);

//             return dateA - dateB;
//         });


//         // Initialize Parts table
//         var out = `
//             <table border="1px" class="blodfont">

//                 <tr>
//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         S.No
//                     </th>

//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         Parts ID
//                     </th>

//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         Date
//                     </th>

//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         Person
//                     </th>

//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         Description
//                     </th>

//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         Edit
//                     </th>

//                     <th style="font-weight:bold;font-size:25px;padding:15px">
//                         Amount
//                     </th>
//                 </tr>
//         `;


//         let sno = 1;
//         let totalamount = 0;


//         // Process Parts records
//         records.forEach(item => {

//             const key = item.key;
//             const record = item.record;

//             const date = record.Date;
//             const person = record.person;
//             const description = record.Description;

//             const amount = parseInt(record.Amount) || 0;

//             totalamount += amount;


//             out += `
//                 <tr>

//                     <!-- S.No -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${sno}
//                     </td>


//                     <!-- Parts ID -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${key}
//                     </td>


//                     <!-- Date -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px;
//                         white-space:nowrap;
//                         width:max-content;
//                     ">
//                         ${formatDateToNormal(date)}
//                     </td>


//                     <!-- Person -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${person}
//                     </td>


//                     <!-- Description -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${description}
//                     </td>


//                     <!-- Edit -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         <button
//                             type="button"
//                             class="edit"
//                             onclick="openPopup13(this)">
//                             Edit
//                         </button>
//                     </td>


//                     <!-- Amount -->
//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${amount}
//                     </td>

//                 </tr>
//             `;

//             sno++;
//         });


//         // Total row
//         out += `
//             <tr>

//                 <td colspan="6"
//                     style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px;
//                         text-align:right;
//                     ">
//                     Total Amount
//                 </td>

//                 <td style="
//                     font-weight:bold;
//                     font-size:25px;
//                     padding:15px
//                 ">
//                     ${totalamount}
//                 </td>

//             </tr>
//         `;


//         // Close table
//         out += "</table>";


//         hideProcessingPopup();

//         r.innerHTML = out;
//         r.style.display = "block";

//         return;
//     }


//     // =========================================================
//     //                  TRACTOR TRIPS DATA
//     // =========================================================

//     else {

//         // Convert Firebase object into an array
//         const records = [];

//         for (const key in data) {
//             if (data.hasOwnProperty(key)) {

//                 records.push({
//                     key: key,
//                     record: data[key]
//                 });
//             }
//         }


//         // Sort by Date: oldest -> newest
//         records.sort((a, b) => {

//             const dateA = new Date(a.record.Date);
//             const dateB = new Date(b.record.Date);

//             return dateA - dateB;
//         });


//         // Initialize table structure
//         var out = `
//             <table border="1px" class="blodfont">

//                 <tr>
//                     <th style="font-weight:bold;font-size:25px">
//                         తోలకం
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         తోలకం ID
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         తేదీ
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         వినియోగదారుని పేరు
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         పగలు/రాత్రి
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         సవరించు
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         ధర
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         ట్రిప్పులు
//                     </th>

//                     <th style="font-weight:bold;font-size:25px">
//                         మొత్తం
//                     </th>
//                 </tr>
//         `;


//         let sno = 1;
//         let totaltrips = 0;
//         let s = 0;


//         // Process sorted records
//         records.forEach(item => {

//             const key = item.key;
//             const record = item.record;

//             const date = record.Date;
//             const name = record.CustomerName;
//             const shift = record.Shift;
//             const recordDriverName = record.Driver;

//             const trips = Number(record.Trips) || 0;
//             const amount = Number(record.Price) || 0;

//             totaltrips += trips;
//             s += trips * amount;


//             out += `
//                 <tr>

//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${sno}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${key}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px;
//                         white-space:nowrap;
//                         width:max-content;
//                     ">
//                         ${formatDateToNormal(date)}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${name}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${shift}
//                     </td>


//                     <td style="display:none;">
//                         ${recordDriverName}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         <button
//                             type="button"
//                             class="edit"
//                             onclick="openPopup12(this)">
//                             Edit
//                         </button>
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${amount}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${trips}
//                     </td>


//                     <td style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px
//                     ">
//                         ${trips * amount}
//                     </td>

//                 </tr>
//             `;

//             sno++;
//         });


//         // Total row
//         out += `
//             <tr>

//                 <td colspan="7"
//                     style="
//                         font-weight:bold;
//                         font-size:25px;
//                         padding:15px;
//                         text-align:right;
//                     ">
//                     మొత్తం
//                 </td>

//                 <td style="
//                     font-weight:bold;
//                     font-size:25px;
//                     padding:15px
//                 ">
//                     ${totaltrips}
//                 </td>

//                 <td style="
//                     font-weight:bold;
//                     font-size:25px;
//                     padding:15px
//                 ">
//                     ${s}
//                 </td>

//             </tr>
//         `;


//         // Close table
//         out += "</table>";

//         hideProcessingPopup();

//         r.innerHTML = out;
//         r.style.display = "block";
//     }
// }




// function displayamountdata(data) {
//     showProcessingPopup();
//     // console.log(data);
//     var r = document.getElementById("amountdata");
//     r.innerHTML = "";

//     // Initialize the table structure
//     var out = `<table border="1px" class="blodfont">
//     <tr>
//     <th style="font-weight:bold;font-size:25px">తోలకం</th>
//     <th style="font-weight:bold;font-size:25px">తేదీ</th>
//     <th style="font-weight:bold;font-size:25px">కారణం</th>
//     <th style="font-weight:bold;font-size:25px">డబ్బులు తీసుకున్నవి</th>
// </tr>`;



//     // Initialize the counter for Sno
//     var sno = 1;
//     var s = 0;

//     // Iterate over UNIQUE IDs
//     for (const uid in data) {
//         if (data.hasOwnProperty(uid)) {

//             const record = data[uid];

//             const amount = parseInt(record.Amount || 0);
//             s += amount;

//             out += `<tr>
//             <td style="font-weight:bold;font-size:25px">${sno}</td>
//             <td style="font-weight:bold;font-size:25px">${formatDateToNormal(record.Date)}</td>
//             <td style="font-weight:bold;font-size:25px">${record.Purpose || "-"}</td>
//             <td style="font-weight:bold;font-size:25px">${amount}</td>
//         </tr>`;

//             sno++;
//         }
//     }

//     // Total row
//     out += `<tr>
//     <td colspan="3" style="font-weight:bold;font-size:25px">మొత్తం డబ్బులు తీసుకున్నవి</td>
//     <td style="font-weight:bold;font-size:25px">${s}</td>
// </tr>`;
//     hideProcessingPopup();
//     // Close table
//     out += "</table>";

//     // Render
//     r.innerHTML = out;
//     r.style.display = "block";

// }
// function done() {

// }


// function displaybal1(data, n) {

//     name1 = n;
//     totaltrips = 0;
//     totalamount = 0;
//     if(name1.trim() === "Sai Teja Parts") {
//         displaybal3(data);
//         return;
//     }
//     // data is already FILTERED by driver
//     for (const uid in data) {
//         if (data.hasOwnProperty(uid)) {

//             const record = data[uid];

//             const trips = parseInt(record.Trips || 0);
//             const price = parseInt(record.Price || 0);

//             totaltrips += trips;
//             totalamount += trips * price;
//         }
//     }

//     done();
//     displaybalanacedata();
// }

// function displaybal3(data) {
//     totalamount = 0;
//     for (const uid in data) {
//         if (data.hasOwnProperty(uid)) {
//             const record = data[uid];
//             const amount = parseInt(record.Amount || 0);
//             totalamount += amount;
//         }
//     }

//     done();
//     displaybalanacedata();
// }

// function displaybal2(data) {

//     amounttaken = 0;

//     // data is already FILTERED by driver
//     for (const uid in data) {
//         if (data.hasOwnProperty(uid)) {

//             const record = data[uid];
//             amounttaken += parseInt(record.Amount || 0);
//         }
//     }

//     done();
//     displaybalanacedata();
// }


// function displaybalanacedata() {
//     showProcessingPopup();
//     var r = document.getElementById("driverbal");
//     r.innerHTML = "";

//     // Initialize the table structure
//     var out = `<table border="1px" class="blodfont1">
//     <tr>
//     <th style="font-weight:bold;font-size:25px" >యజమాని పేరు</th>
//     <th style="font-weight:bold;font-size:25px">ట్రిప్పులు</th>
//     <th style="font-weight:bold;font-size:25px">మొత్తం డబ్బులు</th>
//     <th style="font-weight:bold;font-size:25px">డబ్బులు ఇచ్చినవి</th>
//     <th style="font-weight:bold;font-size:25px">ఇవ్వాల్సిన డబ్బులు</th>
// </tr>`;
//     out += `<tr class="blodfont">
//         <td style="font-weight:bold;font-size:25px">` + name1 + `</td>
//         <td style="font-weight:bold;font-size:25px">` + totaltrips + `</td>
//         <td style="font-weight:bold;font-size:25px">` + totalamount + `</td>
//         <td style="font-weight:bold;font-size:25px">` + amounttaken + `</td>
//         <td style="font-weight:bold;font-size:25px">` + (totalamount - amounttaken) + `</td>
//     </tr>`
//     // Close the table structure
//     out += "</table>";
//     hideProcessingPopup();
//     // Update the innerHTML of the element
//     r.innerHTML = out;
//     r.style.display = "block";
// }
// function NoDatatrips() {
//     // console.log("hi no data");
//     var d = document.getElementById("def1");
//     d.style.display = "block";
//     // p1.style.display = "block";
// }
// function NoDataamount() {
//     var d = document.getElementById("def2");
//     var p1 = document.getElementById("amountdata");
//     d.style.display = "block";
//     // p1.style.display = "block";
// }
// function NoDatabal() {
//     var d = document.getElementById("def3");
//     var p1 = document.getElementById("driverbal");
//     d.style.display = "block";
//     // p1.style.display = "block";
// }



/* =========================================================
   SHANMUKHA EARTH MOVERS - OPTIMIZED JAVASCRIPT
   ========================================================= */

"use strict";

var photo = "";
var k1 = 0, k2 = 0, k3 = 0;
var p1 = 0, p2 = 0, p3 = 0, p4 = 0, k5 = 0;

var amounttaken = 0;
var totalamount = 0;
var totaltrips = 0;
var name1 = "";
var balance = 0;
var driver = "";

var x1 = 0, x2 = 0, x3 = 0;

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

/* ==================== COMMON HELPERS ==================== */

function getElement(id) {
    return document.getElementById(id);
}

function setDisplay(id, display) {
    var element = getElement(id);
    if (element) element.style.display = display;
}

function toNumber(value) {
    var number = Number(value);
    return Number.isFinite(number) ? number : 0;
}

function escapeHTML(value) {
    return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDateToNormal(dateString) {
    if (!dateString) return "-";

    var date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "-";

    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();

    return day + "-" + month + "-" + year;
}

function dateSortValue(value) {
    var time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
}

function getRecords(data) {
    if (!data || typeof data !== "object") return [];

    return Object.keys(data)
        .map(function (key) {
            return {
                key: key,
                record: data[key] || {}
            };
        })
        .sort(function (a, b) {
            return dateSortValue(a.record.Date) -
                dateSortValue(b.record.Date);
        });
}

function startProcessing() {
    if (typeof showProcessingPopup === "function") {
        showProcessingPopup();
    }
}

function stopProcessing() {
    if (typeof hideProcessingPopup === "function") {
        hideProcessingPopup();
    }
}

function renderTable(container, html) {
    if (!container) return;

    container.innerHTML = html;
    container.style.display = "block";
}

function makeCell(value, style) {
    return '<td style="' +
        (style || "font-weight:bold;font-size:25px;padding:15px") +
        '">' + escapeHTML(value) + "</td>";
}

function makeHeader(value, style) {
    return '<th style="' +
        (style || "font-weight:bold;font-size:25px;padding:15px") +
        '">' + escapeHTML(value) + "</th>";
}

/* ==================== FORM CONTROLS ==================== */

function box1() {
    var select = getElement("dname1");
    var otherDriver = getElement("driver1");

    if (!select || !otherDriver) return;

    k1 = 0;
    otherDriver.style.display =
        select.value === "Others" ? "block" : "none";
}

function addtrip() {
    var panel = getElement("list1");
    var button = getElement("b1");

    if (!panel || !button) return;

    x1 = x1 === 0 ? 1 : 0;

    panel.style.display = x1 ? "block" : "none";
    button.textContent = x1 ? "Close" : "Add Data";
}

function showdriver() {
    setDisplay("tripsdata", "none");
    setDisplay("amountdata", "none");
    setDisplay("driverbal", "none");

    var panel = getElement("list2");
    var button = getElement("b2");

    if (!panel || !button) return;

    x2 = x2 === 0 ? 1 : 0;

    panel.style.display = x2 ? "block" : "none";
    button.textContent = x2 ? "Close" : "Driver Data";
}

function addamount() {
    var panel = getElement("list3");
    var button = getElement("b3");

    if (!panel || !button) return;

    if (x3 === 0) {
        panel.style.display = "block";
        button.textContent = "Close";
        x3 = 1;
    } else {
        var form = getElement("form1");

        if (form) form.reset();

        panel.style.display = "none";
        button.textContent = "Amount Data";
        x3 = 0;
    }
}

/* ==================== TRANSLATION ==================== */

async function translateInput(elementId) {
    var input = getElement(elementId);

    if (!input) return;

    var content = input.value.trim();

    if (!content) return;

    var url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(content) +
        "&langpair=en|te";

    try {
        var response = await fetch(url);

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        var data = await response.json();

        var translatedText =
            data &&
            data.responseData &&
            data.responseData.translatedText;

        if (translatedText) {
            input.value = translatedText;
        }
    } catch (error) {
        console.error("Translation failed:", error);
    }
}

function transalate() {
    return translateInput("cname");
}

function transalatepur() {
    return translateInput("pur");
}

/* ==================== DRIVER SELECTION ==================== */

function box2() {
    setDisplay("tripsdata", "none");
    setDisplay("amountdata", "none");
    setDisplay("driverbal", "none");

    var select = getElement("dname2");

    photo = select ? select.value : "";
}

function box3() {
    var select = getElement("dname3");
    var otherDriver = getElement("driver3");
    var button = getElement("btn3");

    k3 = 0;

    if (button) button.textContent = "Open";

    setDisplay("amountdata", "none");

    if (select && otherDriver) {
        otherDriver.style.display =
            select.value === "Others" ? "block" : "none";
    }
}

function removedone() {
    setTimeout(function () {
        setDisplay("done10", "none");
    }, 2000);
}

function removedone1() {
    setTimeout(function () {
        setDisplay("done5", "none");
    }, 2000);
}

function done() {
    // Retained for compatibility with existing code.
}

/* ==================== UPDATED TRIPS DISPLAY ==================== */

function displayUpdatedtripsdata(data, drivername) {
    startProcessing();

    try {
        setDisplay("screenshot", "block");

        var container = getElement("tripsdata");

        if (!container) return;

        var records = getRecords(data);
        var isParts =
            String(drivername || "").trim() === "Sai Teja Parts";

        var html = '<table border="1px" class="blodfont">';
        var sno = 1;
        var total = 0;
        var totalTripCount = 0;

        if (!isParts) {
            html +=
                "<tr>" +
                makeHeader("తోలకం", "font-weight:bold;font-size:25px") +
                makeHeader("తేదీ", "font-weight:bold;font-size:25px") +
                makeHeader("వినియోగదారుని పేరు", "font-weight:bold;font-size:25px") +
                makeHeader("పగలు/రాత్రి", "font-weight:bold;font-size:25px") +
                '<th style="display:none">Driver</th>' +
                makeHeader("ధర", "font-weight:bold;font-size:25px") +
                makeHeader("ట్రిప్పులు", "font-weight:bold;font-size:25px") +
                makeHeader("మొత్తం", "font-weight:bold;font-size:25px") +
                "</tr>";

            records.forEach(function (item) {
                var record = item.record;
                var trips = toNumber(record.Trips);
                var price = toNumber(record.Price);
                var rowTotal = trips * price;

                totalTripCount += trips;
                total += rowTotal;

                html +=
                    "<tr>" +
                    makeCell(sno++, "font-weight:bold;font-size:35px") +
                    makeCell(
                        formatDateToNormal(record.Date),
                        "font-weight:bold;font-size:35px;white-space:nowrap"
                    ) +
                    makeCell(record.CustomerName, "font-weight:bold;font-size:35px") +
                    makeCell(record.Shift, "font-weight:bold;font-size:35px") +
                    '<td style="display:none">' +
                    escapeHTML(record.Driver || "") +
                    "</td>" +
                    makeCell(price, "font-weight:bold;font-size:35px") +
                    makeCell(trips, "font-weight:bold;font-size:35px") +
                    makeCell(rowTotal, "font-weight:bold;font-size:35px") +
                    "</tr>";
            });

            html +=
                "<tr>" +
                '<td colspan="5" style="font-weight:bold;font-size:35px;text-align:right">' +
                "ట్రిప్పులు మొత్తానికి అయిన డబ్బులు</td>" +
                makeCell(totalTripCount, "font-weight:bold;font-size:35px") +
                makeCell(total, "font-weight:bold;font-size:35px") +
                "</tr>";
        } else {
            html +=
                "<tr>" +
                makeHeader("S.No", "font-weight:bold;font-size:25px") +
                makeHeader("Date", "font-weight:bold;font-size:25px") +
                makeHeader("Person", "font-weight:bold;font-size:25px") +
                makeHeader("Description", "font-weight:bold;font-size:25px") +
                makeHeader("Amount", "font-weight:bold;font-size:25px") +
                "</tr>";

            records.forEach(function (item) {
                var record = item.record;
                var amount = toNumber(record.Amount);

                total += amount;

                html +=
                    "<tr>" +
                    makeCell(sno++, "font-weight:bold;font-size:35px") +
                    makeCell(
                        formatDateToNormal(record.Date),
                        "font-weight:bold;font-size:35px;white-space:nowrap"
                    ) +
                    makeCell(record.person, "font-weight:bold;font-size:35px") +
                    makeCell(record.Description, "font-weight:bold;font-size:35px") +
                    makeCell(amount, "font-weight:bold;font-size:35px") +
                    "</tr>";
            });

            html +=
                "<tr>" +
                '<td colspan="4" style="font-weight:bold;font-size:35px;text-align:right">Total Amount</td>' +
                makeCell(total, "font-weight:bold;font-size:35px") +
                "</tr>";
        }

        html += "</table>";

        renderTable(container, html);
    } finally {
        stopProcessing();
    }
}

/* ==================== TRIPS / PARTS DATA ==================== */

function displaytripsdata(data, drivername) {
    startProcessing();

    try {
        driver = drivername || "";

        var title = document.querySelector(".customer-title");

        if (title) {
            title.textContent = driver;
        }

        setDisplay("screenshot", "block");

        var container = getElement("tripsdata");

        if (!container) return;

        var records = getRecords(data);
        var isParts =
            String(drivername || "").trim() === "Sai Teja Parts";

        var html = '<table border="1px" class="blodfont">';
        var sno = 1;
        var total = 0;
        var totalTripCount = 0;

        if (isParts) {
            html +=
                "<tr>" +
                makeHeader("S.No") +
                makeHeader("Parts ID") +
                makeHeader("Date") +
                makeHeader("Person") +
                makeHeader("Description") +
                makeHeader("Edit") +
                makeHeader("Amount") +
                "</tr>";

            records.forEach(function (item) {
                var record = item.record;
                var amount = toNumber(record.Amount);

                total += amount;

                html +=
                    "<tr>" +
                    makeCell(sno++) +
                    makeCell(item.key) +
                    makeCell(
                        formatDateToNormal(record.Date),
                        "font-weight:bold;font-size:25px;padding:15px;white-space:nowrap"
                    ) +
                    makeCell(record.person) +
                    makeCell(record.Description) +
                    '<td style="font-weight:bold;font-size:25px;padding:15px">' +
                    '<button type="button" class="edit" onclick="openPopup13(this)">Edit</button>' +
                    "</td>" +
                    makeCell(amount) +
                    "</tr>";
            });

            html +=
                "<tr>" +
                '<td colspan="6" style="font-weight:bold;font-size:25px;padding:15px;text-align:right">Total Amount</td>' +
                makeCell(total) +
                "</tr>";
        } else {
            html +=
                "<tr>" +
                makeHeader("తోలకం") +
                makeHeader("తోలకం ID") +
                makeHeader("తేదీ") +
                makeHeader("వినియోగదారుని పేరు") +
                makeHeader("పగలు/రాత్రి") +
                makeHeader("సవరించు") +
                makeHeader("ధర") +
                makeHeader("ట్రిప్పులు") +
                makeHeader("మొత్తం") +
                "</tr>";

            records.forEach(function (item) {
                var record = item.record;
                var trips = toNumber(record.Trips);
                var price = toNumber(record.Price);
                var rowTotal = trips * price;

                totalTripCount += trips;
                total += rowTotal;

                html +=
                    "<tr>" +
                    makeCell(sno++) +
                    makeCell(item.key) +
                    makeCell(
                        formatDateToNormal(record.Date),
                        "font-weight:bold;font-size:25px;padding:15px;white-space:nowrap"
                    ) +
                    makeCell(record.CustomerName) +
                    makeCell(record.Shift) +
                    '<td style="display:none">' +
                    escapeHTML(record.Driver || drivername || "") +
                    "</td>" +
                    '<td style="font-weight:bold;font-size:25px;padding:15px">' +
                    '<button type="button" class="edit" onclick="openPopup12(this)">Edit</button>' +
                    "</td>" +
                    makeCell(price) +
                    makeCell(trips) +
                    makeCell(rowTotal) +
                    "</tr>";
            });

            html +=
                "<tr>" +
                '<td colspan="7" style="font-weight:bold;font-size:25px;padding:15px;text-align:right">మొత్తం</td>' +
                makeCell(totalTripCount) +
                makeCell(total) +
                "</tr>";
        }

        html += "</table>";

        renderTable(container, html);
    } finally {
        stopProcessing();
    }
}

/* ==================== AMOUNT WITHDRAWAL DATA ==================== */

function displayamountdata(data) {
    startProcessing();

    try {
        var container = getElement("amountdata");

        if (!container) return;

        var records = getRecords(data);

        var html =
            '<table border="1px" class="blodfont">' +
            "<tr>" +
            makeHeader("తోలకం") +
            makeHeader("తేదీ") +
            makeHeader("కారణం") +
            makeHeader("డబ్బులు తీసుకున్నవి") +
            "</tr>";

        var sno = 1;
        var total = 0;

        records.forEach(function (item) {
            var record = item.record;
            var amount = toNumber(record.Amount);

            total += amount;

            html +=
                "<tr>" +
                makeCell(sno++) +
                makeCell(formatDateToNormal(record.Date)) +
                makeCell(record.Purpose || "-") +
                makeCell(amount) +
                "</tr>";
        });

        html +=
            "<tr>" +
            '<td colspan="3" style="font-weight:bold;font-size:25px">మొత్తం డబ్బులు తీసుకున్నవి</td>' +
            makeCell(total) +
            "</tr>" +
            "</table>";

        renderTable(container, html);
    } finally {
        stopProcessing();
    }
}

/* ==================== BALANCE CALCULATIONS ==================== */

function displaybal1(data, n) {
    name1 = n || "";

    totaltrips = 0;
    totalamount = 0;

    if (name1.trim() === "Sai Teja Parts") {
        displaybal3(data);
        return;
    }

    getRecords(data).forEach(function (item) {
        var record = item.record;
        var trips = toNumber(record.Trips);
        var price = toNumber(record.Price);

        totaltrips += trips;
        totalamount += trips * price;
    });

    done();
    displaybalanacedata();
}

function displaybal3(data) {
    totaltrips = 0;
    totalamount = 0;

    getRecords(data).forEach(function (item) {
        totalamount += toNumber(item.record.Amount);
    });

    done();
    displaybalanacedata();
}

function displaybal2(data) {
    amounttaken = 0;

    getRecords(data).forEach(function (item) {
        amounttaken += toNumber(item.record.Amount);
    });

    done();
    displaybalanacedata();
}

function displaybalanacedata() {
    startProcessing();

    try {
        var container = getElement("driverbal");

        if (!container) return;

        balance = totalamount - amounttaken;

        var html =
            '<table border="1px" class="blodfont1">' +
            "<tr>" +
            makeHeader("యజమాని పేరు") +
            makeHeader("ట్రిప్పులు") +
            makeHeader("మొత్తం డబ్బులు") +
            makeHeader("డబ్బులు ఇచ్చినవి") +
            makeHeader("ఇవ్వాల్సిన డబ్బులు") +
            "</tr>" +
            "<tr>" +
            makeCell(name1) +
            makeCell(totaltrips) +
            makeCell(totalamount) +
            makeCell(amounttaken) +
            makeCell(balance) +
            "</tr>" +
            "</table>";

        renderTable(container, html);
    } finally {
        stopProcessing();
    }
}

/* ==================== NO-DATA MESSAGES ==================== */

function NoDatatrips() {
    setDisplay("def1", "block");
}

function NoDataamount() {
    setDisplay("def2", "block");
}

function NoDatabal() {
    setDisplay("def3", "block");
}