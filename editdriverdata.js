// Tractor.js
function openPopup13(btn) {

    // Get the row
    const row = btn.closest("tr");
    const cells = row.querySelectorAll("td");

    // Extract values from Parts table
    const systemid = cells[1].innerText.trim();

    const rawDate = cells[2].innerText.trim();

    const [dd, mm, yyyy] = rawDate.split("-");
    const date = `${yyyy}-${mm}-${dd}`;

    const person = cells[3].innerText.trim();
    const description = cells[4].innerText.trim();
    const amount = cells[6].innerText.trim();


    const popupHTML = `

    <div id="myModal2"
         style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.5);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:9999;
         ">

        <div class="modal-content"
             style="
                background:#fff;
                width:820px;
                padding:25px;
                border-radius:12px;
                position:relative;
                box-shadow:0 10px 30px rgba(0,0,0,0.25);
             ">


            <!-- Red X Button -->

            <span onclick="closePopup1()"
                  style="
                    position:absolute;
                    top:10px;
                    right:15px;
                    background:#e53935;
                    color:#fff;
                    width:30px;
                    height:30px;
                    line-height:30px;
                    text-align:center;
                    border-radius:50%;
                    cursor:pointer;
                    font-size:18px;
                    font-weight:bold;
                  ">

                &times;

            </span>


            <h2 style="text-align:center; margin-bottom:20px;">
                Editing Sai Teja Parts Data
            </h2>


            <form id="form2" style="text-align:center;">


                <!-- System ID -->

                <input type="text"
                       id="partsSystemId"
                       placeholder="System Id"
                       required
                       readonly
                       style="
                            width:90%;
                            padding:8px;
                            margin-bottom:14px;
                       "
                       value="${systemid}">


                <!-- Date -->

                <input type="date"
                       id="partsEditDate"
                       required
                       style="
                            width:90%;
                            padding:8px;
                            margin-bottom:14px;
                       "
                       value="${date}">


                <!-- Person -->

                <select id="editPerson"
                        required
                        style="
                            width:92%;
                            padding:8px;
                            margin-bottom:14px;
                        ">

                    <option value="Dady"
                        ${person === "Dady" ? "selected" : ""}>
                        Dady
                    </option>

                    <option value="Suresh"
                        ${person === "Suresh" ? "selected" : ""}>
                        Suresh
                    </option>

                </select>


                <!-- Description -->

                <input type="text"
                       id="editDescription"
                       placeholder="Enter Description"
                       required
                       style="
                            width:90%;
                            padding:8px;
                            margin-bottom:14px;
                       "
                       value="${description}">


                <!-- Amount -->

                <input type="number"
                       id="editPartsAmount"
                       placeholder="Enter Amount"
                       required
                       style="
                            width:90%;
                            padding:8px;
                            margin-bottom:18px;
                       "
                       value="${amount}">


                <!-- Save -->

                <input type="button"
                       id="submit13"
                       style="
                            width:95%;
                            padding:10px;
                            background:#1976d2;
                            color:#fff;
                            border:none;
                            border-radius:6px;
                            font-size:16px;
                            cursor:pointer;
                       "
                       value="Save Data">

            </form>


            <img src="done1.png"
                 id="done6"
                 style="
                    display:none;
                    margin:0 auto;
                    height:100px;
                    width:100px;
                 ">

        </div>

    </div>

    `;


    document.getElementById("popupContainer").innerHTML = popupHTML;


    // Add your Parts edit function here
    document.getElementById("submit13")
        .addEventListener("click", editPartsData);
}


function openPopup12(btn) {

    // get the row
    const row = btn.closest("tr");
    const cells = row.querySelectorAll("td");

    // extract values
    const rawDate = cells[2].innerText.trim();   // e.g. "12-01-2025"

    const [dd, mm, yyyy] = rawDate.split("-");
    const date = `${yyyy}-${mm}-${dd}`;
    const systemid = cells[1].innerText.trim();
    const driver = cells[5].innerText.trim();
    const dayType = cells[4].innerText.trim();
    const customer = cells[3].innerText.trim();
    const price = cells[7].innerText.trim();
    const trips = cells[8].innerText.trim();
    const popupHTML = `
    <div id="myModal1"
         style="
            position:fixed;
            inset:0;
            background:rgba(0,0,0,0.5);
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:9999;
         ">

        <div class="modal-content"
             style="
                background:#fff;
                width:820px;
                padding:25px;
                border-radius:12px;
                position:relative;
                box-shadow:0 10px 30px rgba(0,0,0,0.25);
             ">

            <!-- Red X Button -->
            <span onclick="closePopup1()"
                  style="
                    position:absolute;
                    top:10px;
                    right:15px;
                    background:#e53935;
                    color:#fff;
                    width:30px;
                    height:30px;
                    line-height:30px;
                    text-align:center;
                    border-radius:50%;
                    cursor:pointer;
                    font-size:18px;
                    font-weight:bold;
                  ">
                &times;
            </span>

            <h2 style="text-align:center; margin-bottom:20px;">
                Editing Trips Data
            </h2>

            <form id="form" style="text-align:center;">

            <input type="text"
                       id="sno"
                       placeholder="System Id"
                       required
                       style="width:90%; padding:8px; margin-bottom:14px;" value="${systemid}">

                <input type="date"
                       id="editdate"
                       required
                       style="width:90%; padding:8px; margin-bottom:14px;" value="${date}">

                <input type="text"
                       id="drivername"
                       placeholder="Driver Name"
                       required
                       style="width:90%; padding:8px; margin-bottom:14px;" value="${driver}">

                <input type="text"
                       id="daytype"
                       placeholder="Day Type"
                       required
                       style="width:90%; padding:8px; margin-bottom:14px;" value="${dayType}">

                <input type="text"
                       id="ecname"
                       placeholder="Customer Name"
                       required
                       style="width:90%; padding:8px; margin-bottom:14px;" value="${customer}">

                <input type="number"
                       id="etrips"
                       placeholder="Today Trips"
                       required
                       style="width:90%; padding:8px; margin-bottom:18px;" value="${trips}">
                    
                <input type="number"
                       id="eprice"
                       placeholder="Price"
                       required
                       style="width:90%; padding:8px; margin-bottom:14px;" value="${price}" >

                <input type="button" id="submit12"
                        style="
                            width:95%;
                            padding:10px;
                            background:#1976d2;
                            color:#fff;
                            border:none;
                            border-radius:6px;
                            font-size:16px;
                            cursor:pointer;
                        " value="Save Data">
                </input>

            </form>
<img src="done1.png" id="done5" 
     style="display: none; margin: 0 auto; height: 100px; width: 100px;">
        </div>
    </div>
    `;

    document.getElementById("popupContainer").innerHTML = popupHTML;
    document.getElementById("submit12").addEventListener("click", editDriverData);
}


function closePopup1() {
    document.getElementById("popupContainer").innerHTML = "";
}


