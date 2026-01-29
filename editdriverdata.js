// Tractor.js
function openPopup1(btn) {

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

                <input type="button" id="submit1"
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
    document.getElementById("submit1").addEventListener("click", editDriverData);
}


function closePopup1() {
    document.getElementById("popupContainer").innerHTML = "";
}


