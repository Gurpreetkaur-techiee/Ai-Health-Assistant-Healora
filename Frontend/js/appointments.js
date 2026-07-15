/* ==========================================
            HEALORA APPOINTMENTS
========================================== */

console.log("appointments.js loaded");

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const API_BASE_URL = "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded",()=>{

const searchInput=document.querySelector(".search-box input");
const filter=document.querySelector(".filter-group select");
const doctorCards=document.querySelectorAll(".doctor-card");
const bookButtons=document.querySelectorAll(".book-now");
console.log("Buttons found:", bookButtons.length);
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

bookButtons.forEach(btn => {

    btn.addEventListener("click", async () => {

        console.log("Book button clicked");

        const card = btn.closest(".doctor-card");

        const doctorName = card.querySelector("h3").innerText;

        const specialty = card.querySelector(".speciality").innerText.trim();

        const location = card.querySelector(".hospital").innerText.trim();

        const appointmentDate = prompt("Enter appointment date (YYYY-MM-DD)");

        if (!appointmentDate) return;

        const appointmentTime = prompt("Enter appointment time (HH:MM)");

        if (!appointmentTime) return;

        try {

            console.log({
                doctorName,
                specialty,
                location,
                appointmentDate,
                appointmentTime,
                token
            });

            const response = await fetch(`${API_BASE_URL}/appointments`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": `Bearer ${token}`

                },

                body: JSON.stringify({

                    doctorName,

                    specialty,

                    appointmentDate,

                    appointmentTime,

                    location

                })

            });

            console.log("Status:", response.status);

            const result = await response.json();

            console.log("Validation Errors:", result.errors);

            if (response.ok) {

                showToast("✅ Appointment booked successfully!");

            } else {

                alert(result.message || "Unable to book appointment.");

            }

        } catch (err) {

            console.error(err);

            alert("Server connection failed.");

        }

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
