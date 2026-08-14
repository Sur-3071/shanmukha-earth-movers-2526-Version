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

document.getElementById('submit9').addEventListener('click', async function (e) {
    e.preventDefault();
    showProcessingPopup();
    const dat = document.getElementById("dat8").value;
    const wid = document.getElementById("wid8").value;
    const name = document.getElementById("name8").value;
    const ptype = document.getElementById("type8").value;
    const pertype = document.getElementById("persontype8").value;
    // alert(pertype);
    var disel = document.getElementById("dis8").value;
    document.getElementById("userForm8").reset();

    function datarebuild() {
        document.getElementById("dat8").value = dat;
        document.getElementById("wid8").value = wid;
        document.getElementById("name8").value = name;
        document.getElementById("type8").value = ptype;
        document.getElementById("dis8").value = disel;
    }
    function removedone() {
        setTimeout(function () {
            var v7 = document.getElementById("done8");
            v7.style.display = "none";
            window.location.reload();
        }, 3000);
    }

    if (dat.length > 0) {
        if (name.length > 0) {
            if (disel.length > 0) {
                const db1 = DBConstants.Homeexpenses;

                const dataRefset = ref(db, `${db1}/${wid}`);
                
                if (ptype === "Farming") {
                    var far = disel;
                    var jcb = 0;
                    var home = 0;
                    var sal = 0;
                    var salexp = 0;
                }
                else {
                    if (ptype === "Jcb") {
                        var far = 0;
                        var jcb = disel;
                        var home = 0;
                        var sal = 0;
                        var salexp = 0;
                    }
                    else {
                        if (ptype === "Home") {
                            var far = 0;
                            var jcb = 0;
                            var home = disel;
                            var sal = 0;
                            var salexp = 0;
                        }
                        else {
                            if (ptype === "Salary") {
                                var far = 0;
                                var jcb = 0;
                                var home = 0;
                                var sal = disel;
                                var salexp = 0;
                            }
                            else {
                                var far = 0;
                                var jcb = 0;
                                var home = 0;
                                var sal = 0;
                                var salexp = disel;
                            }
                        }
                    }
                }
                if (ptype === "Salary" || ptype === "Salary Expenses") {
                    disel = 0;
                }
                await set(dataRefset, {
                    Date: dat,
                    Name: name,
                    Price: disel,
                    Farming: far,
                    Salary: sal,
                    SalaryExp: salexp,
                    Jcb: jcb,
                    Home: home,
                    Type: ptype,
                    PersonType: pertype
                });
                hideProcessingPopup();

                document.getElementById("paymentSuccessPopup5").style.display = "flex";
                // document.getElementById("done").style.display = "block";
                setTimeout(() => {
                    document.getElementById("paymentSuccessPopup5").style.display = "none";
                }, 3000); // Ensure this function is defined elsewhere


            } else {
                hideProcessingPopup();
                alert("Amount is empty");
                datarebuild();
            }
        } else {
            hideProcessingPopup();
            alert("Name is empty");
            datarebuild();
        }
    } else {
        hideProcessingPopup();
        alert("Date is empty");
        datarebuild();
    }

});