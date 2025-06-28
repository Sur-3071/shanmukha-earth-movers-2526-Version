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
        var c3=parseInt(document.getElementById("hrsrate").value);
    // Calculate the total minutes and price
    var tmin = diffHours * 60 + diffMinutes;
    var pri = tmin * c3/60;

    document.getElementById("ttime").value = totalTime;
    document.getElementById("rate").value = parseInt(pri);
}



function conprice()
{
    var c1=document.getElementById("con").value;
    document.getElementById("rate").value=c1;
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
    const container = document.getElementById('container1');
    const newRow = document.createElement('div');
    newRow.className = 'row';
    newRow.innerHTML = `
       <input type="text" placeholder="Driver Name" name="driverName[]"  onchange="removereadonly()" required>
       <input type="number" placeholder="Trips" name="trips[]"  readonly required onkeyup="updateTotalTrips()">
       <button class="remove-button" onclick="removeRow(this)">X</button>
    `;
    container.appendChild(newRow);
}

function removeRow(button) {
    const row = button.parentElement;
    row.remove();
    updateTotalTrips();
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
function tripprice()
{
    var c1=document.getElementById("trips").value;
    var c3=parseInt(document.getElementById("trprate").value);
    var c2=parseInt(c1)*c3;
    document.getElementById("rate").value=c2;
    generateOutput();
}
function generateOutput() {
    const driverNames = document.querySelectorAll('input[name="driverName[]"]');
    const trips = document.querySelectorAll('input[name="trips[]"]');
    const outputDiv = document.getElementById('output');
    outputDiv.value = "";
    driverNames.forEach((driverName, index) => {
        const trip = trips[index].value || 0;
        const name = driverName.value || "Unknown Driver";
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

