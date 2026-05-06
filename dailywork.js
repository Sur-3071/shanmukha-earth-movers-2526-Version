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
    var c3=parseInt(document.getElementById("hrsrate").value || "1000");
    // Calculate the total minutes and price
    var tmin = diffHours * 60 + diffMinutes;
    var pri = tmin * c3/60;
    // alert(pri);
    document.getElementById("ttime").value = totalTime;
    // alert(pri+" "+amt);
    var type=document.getElementById("worktype").value;
    var beta=parseInt(document.getElementById("beta").value || "0");
    var rate=parseInt(document.getElementById("rate").value || "0");
    if(type==="Hours")
    {
        rate = (isNaN(pri)?0:parseInt(pri));
        document.getElementById("rate").value=rate;
    }
    else
    {
        if(type==="Loading")
        {
            var triprate=parseInt(document.getElementById("trips").value || "0");
            var jcbtriprate=parseInt(document.getElementById("jcbtrprate").value || "0");
            var trippri=(triprate*jcbtriprate);
            rate = (isNaN(trippri)?beta:parseInt(trippri)+beta);
            alert(rate);
            document.getElementById("rate").value=rate;
        }
        else
        {
            if(type==="Contract")
            {
                var conamouont=parseInt(document.getElementById("con").value || "0");
                rate = (isNaN(conamouont)?beta:parseInt(conamouont)+beta);
                document.getElementById("rate").value=rate;

            }
        }
    }
}



function conprice()
{
    var beta=parseInt(document.getElementById("beta").value || "0");
    var c1=document.getElementById("con").value || "0";
    document.getElementById("rate").value=parseInt(c1)+beta;
}
function removedone() {
    setTimeout(function () {
        var v7 = document.getElementById("done");
        v7.style.display = "none";
    }, 3000);
}
function removereadonly()
{
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });
}

function addRow() {
    // alert("row");
    const container = document.getElementById('container43');
    const newRow = document.createElement('div');
    newRow.className = 'row';
    newRow.innerHTML = `
       <input type="text" placeholder="Driver Name" name="driverName[]"  onchange="removereadonly()">
       <input type="number" placeholder="Trips" name="trips[]"  readonly required onkeyup="updateTotalTrips()">
       <button class="remove-button" onclick="removeRow(this)">X</button>
    `;
    container.appendChild(newRow);
}
function addRow1() {
    // alert("row1");
    const container1 = document.getElementById('container2');
    const newRow1 = document.createElement('div');
    newRow1.className = 'row1';
    newRow1.innerHTML = `
       <input type="text" placeholder="Driver Name" name="driverName1[]"  onchange="removereadonly()">
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
    const tripInputs = document.querySelectorAll('input[name="trips[]"]');
    let total = 0;
    tripInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        total += value;
    });
    document.getElementById('trips').value= total;
    tripprice();
}
function updateTotalTrips1() {
    // alert("hi");
    // alert("trips1");
    const tripInputs = document.querySelectorAll('input[name="trips1[]"]');
    let total = 0;
    tripInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        total += value;
    });
    document.getElementById('trips1').value= total;
    tripprice1();
}
function tripprice()
{
    var c1=document.getElementById("trips").value || "0";
    var c3=parseInt(document.getElementById("jcbtrprate").value || "0");
    var c2=parseInt(c1)*c3;
    var beta=document.getElementById("beta").value || "0";
    var fin=isNaN(c2)?parseInt(beta):(parseInt(beta)+c2);
    document.getElementById("rate").value=fin;
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
        const line = `${name} = ${trip}`;
        outputDiv.value += line+" "+ "\n";
    });
}
function tripprice1()
{
    // alert("tripprice1");
    var c1=document.getElementById("trips1").value;
    var c3=parseInt(document.getElementById("trprate1").value);
    var c2=parseInt(c1)*c3;
    document.getElementById("alltrprate").value=c2;
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
        outputDiv.value += line+" "+ "\n";
    });
}
function addflow()
{
    var c=document.getElementById("worktype").value;
    if(c=="Hours")
        {
            document.getElementById("loading").style.display="none";
            document.getElementById("contract").style.display="none";
            document.getElementById("hours").style.display="block";
        }
        else
        {
            if(c=="Loading")
            {
                document.getElementById("hours").style.display="none";
                document.getElementById("loading").style.display="block";
                document.getElementById("contract").style.display="none";
            }
            else
            {
                document.getElementById("hours").style.display="none";
                document.getElementById("loading").style.display="none";
                document.getElementById("contract").style.display="block";
            }
        }

}
document.addEventListener("click", function(event) {
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
