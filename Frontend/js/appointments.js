/* ==========================================
            HEALORA APPOINTMENTS
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

const searchInput=document.querySelector(".search-box input");
const filter=document.querySelector(".filter-group select");
const doctorCards=document.querySelectorAll(".doctor-card");
const bookButtons=document.querySelectorAll(".book-now");
const cancelButtons=document.querySelectorAll(".cancel-btn");
const rescheduleButtons=document.querySelectorAll(".reschedule-btn");
const moonBtn=document.querySelector(".fa-moon");

/* ================= SEARCH ================= */

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

doctorCards.forEach(card=>{

card.style.display=

card.innerText.toLowerCase().includes(value)

?"block":"none";

});

});

}

/* ================= FILTER ================= */

if(filter){

filter.addEventListener("change",()=>{

const value=filter.value.toLowerCase();

doctorCards.forEach(card=>{

if(value==="all specializations"){

card.style.display="block";

return;

}

card.style.display=

card.innerText.toLowerCase().includes(value)

?"block":"none";

});

});

}

/* ================= BOOK ================= */

bookButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const doctor=

btn.closest(".doctor-card")

.querySelector("h3")

.innerText;

showToast("✅ Appointment booked with "+doctor);

saveAppointment(doctor);

});

});

/* ================= CANCEL ================= */

cancelButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

if(confirm("Cancel this appointment?")){

btn.closest(".appointment-card").remove();

showToast("❌ Appointment Cancelled");

}

});

});

/* ================= RESCHEDULE ================= */

rescheduleButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

const date=prompt(

"Enter new date (DD/MM/YYYY)"

);

if(date){

showToast("📅 Rescheduled to "+date);

}

});

});

/* ================= SAVE ================= */

function saveAppointment(name){

let appointments=

JSON.parse(

localStorage.getItem("healoraAppointments")

)||[];

appointments.push({

doctor:name,

date:new Date().toLocaleString()

});

localStorage.setItem(

"healoraAppointments",

JSON.stringify(appointments)

);

}

/* ================= DARK MODE ================= */

if(localStorage.getItem("appointmentDark")==="true"){

document.body.classList.add("dark");

}

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"appointmentDark",

document.body.classList.contains("dark")

);

});

}

/* ================= TOAST ================= */

function showToast(message){

const toast=document.createElement("div");

toast.className="appointment-toast";

toast.innerHTML=message;

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

/* ================= AI BUTTON ================= */

const aiBtn=document.querySelector(".ai-btn");

if(aiBtn){

aiBtn.addEventListener("click",()=>{

showToast("🤖 Finding recommended doctors...");

});

}

/* ================= HERO BUTTON ================= */

const heroBtn=document.querySelector(".book-btn");

if(heroBtn){

heroBtn.addEventListener("click",()=>{

window.scrollTo({

top:700,

behavior:"smooth"

});

});

}

console.log(

"%c📅 Healora Appointment Module Loaded",

"color:#14B8A6;font-size:18px;font-weight:bold;"

);

});
