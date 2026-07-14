/* ==========================================
        HEALORA EMERGENCY MODULE
========================================== */
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}
document.addEventListener("DOMContentLoaded",()=>{

const sosBtn=document.querySelector(".sos-btn");
const moonBtn=document.querySelector(".fa-moon");
const quickButtons=document.querySelectorAll(".quick-card button");
const hospitalButtons=document.querySelectorAll(".hospital-btn");

/* ==========================
        SOS BUTTON
========================== */

if(sosBtn){

sosBtn.addEventListener("click",()=>{

showToast("🚨 Emergency SOS Activated!");

setTimeout(()=>{

alert("Emergency alert sent successfully! (Demo)");

},600);

});

}

/* ==========================
      QUICK ACTION BUTTONS
========================== */

quickButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const text=btn.innerText;

switch(text){

case "Call 108":

window.location.href="tel:108";

break;

case "Call 100":

window.location.href="tel:100";

break;

case "Call 101":

window.location.href="tel:101";

break;

case "Share":

shareLocation();

break;

default:

showToast("Action unavailable.");

}

});

});

/* ==========================
     SHARE LOCATION
========================== */

function shareLocation(){

if(!navigator.geolocation){

showToast("Geolocation not supported.");

return;

}

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat=position.coords.latitude.toFixed(5);

const lng=position.coords.longitude.toFixed(5);

showToast("📍 Location shared!");

console.log("Latitude:",lat);

console.log("Longitude:",lng);

},

()=>{

showToast("Location permission denied.");

}

);

}

/* ==========================
      HOSPITAL BUTTONS
========================== */

hospitalButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

showToast("Opening map...");

setTimeout(()=>{

window.open(

"https://www.google.com/maps",

"_blank"

);

},500);

});

});

/* ==========================
        DARK MODE
========================== */

if(localStorage.getItem("emergencyDark")==="true"){

document.body.classList.add("dark");

}

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"emergencyDark",

document.body.classList.contains("dark")

);

});

}

/* ==========================
        TOAST
========================== */

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerText=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

console.log(

"%c🚑 Healora Emergency Module Loaded",

"color:#DC2626;font-size:18px;font-weight:bold;"

);

});