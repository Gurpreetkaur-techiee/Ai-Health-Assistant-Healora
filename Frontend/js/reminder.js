/* ==========================================
            HEALORA REMINDERS
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

const form=document.getElementById("reminderForm");

const medicineGrid=document.querySelector(".medicine-grid");

const searchInput=document.querySelector(".search-box input");

const filterBtns=document.querySelectorAll(".filter-buttons button");

const statCards=document.querySelectorAll(".stat-card");

const moonBtn=document.querySelector(".fa-moon");

/* ==========================================
        UPDATE STATS
========================================== */

function updateStats(){

const cards=document.querySelectorAll(".medicine-card");

if(statCards.length){

statCards[0].querySelector("h2").textContent=cards.length;

}

}

/* ==========================================
        ADD NEW REMINDER
========================================== */

form.addEventListener("submit",(e)=>{

e.preventDefault();

const inputs=form.querySelectorAll("input,select,textarea");

const medicine=inputs[0].value;

const dosage=inputs[1].value;

const time=inputs[2].value;

const repeat=inputs[3].value;

const notes=inputs[4].value;

if(medicine.trim()===""){

alert("Please enter medicine name.");

return;

}

const card=document.createElement("div");

card.className="medicine-card";

card.innerHTML=`

<div class="card-top">

<div class="medicine-icon">

💊

</div>

<span class="badge morning">

Custom

</span>

</div>

<h3>${medicine}</h3>

<p>${notes || dosage}</p>

<div class="medicine-details">

<p>

<i class="fa-regular fa-clock"></i>

${time}

</p>

<p>

<i class="fa-solid fa-repeat"></i>

${repeat}

</p>

</div>

<div class="card-actions">

<button class="taken-btn">

✅ Taken

</button>

<button class="skip-btn">

❌ Skip

</button>

</div>

`;

medicineGrid.prepend(card);

form.reset();

updateStats();

saveReminders();

});

/* ==========================================
          SEARCH
========================================== */

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".medicine-card").forEach(card=>{

card.style.display=

card.innerText.toLowerCase().includes(value)

?"block":"none";

});

});
/* ==========================================
        TAKEN / SKIP BUTTONS
========================================== */

medicineGrid.addEventListener("click",(e)=>{

if(e.target.classList.contains("taken-btn")){

e.target.innerHTML="✔ Completed";

e.target.style.background="#16A34A";

e.target.style.color="white";

showToast("✅ Medicine marked as taken");

saveReminders();

}

if(e.target.classList.contains("skip-btn")){

e.target.innerHTML="❌ Skipped";

e.target.style.background="#DC2626";

e.target.style.color="white";

showToast("⚠ Medicine skipped");

saveReminders();

}

});

/* ==========================================
          FILTERS
========================================== */

filterBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

filterBtns.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const filter=btn.innerText.toLowerCase();

document.querySelectorAll(".medicine-card").forEach(card=>{

if(filter==="all"){

card.style.display="block";

return;

}

card.style.display=

card.innerText.toLowerCase().includes(filter)

?"block":"none";

});

});

});

/* ==========================================
          DARK MODE
========================================== */

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"reminderDarkMode",

document.body.classList.contains("dark")

);

});

}

if(localStorage.getItem("reminderDarkMode")==="true"){

document.body.classList.add("dark");

}

/* ==========================================
        LOCAL STORAGE
========================================== */

function saveReminders(){

localStorage.setItem(

"healoraReminders",

medicineGrid.innerHTML

);

}

function loadReminders(){

const data=localStorage.getItem(

"healoraReminders"

);

if(data){

medicineGrid.innerHTML=data;

}

}

loadReminders();

updateStats();

/* ==========================================
      BROWSER NOTIFICATION
========================================== */

if("Notification" in window){

Notification.requestPermission();

}

function notifyMedicine(title){

if(Notification.permission==="granted"){

new Notification(title,{

body:"Time to take your medicine 💊",

icon:"https://cdn-icons-png.flaticon.com/512/4320/4320337.png"

});

}

}

/* ==========================================
        TOAST MESSAGE
========================================== */

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

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

console.log(

"%c💊 Healora Reminder Loaded",

"color:#14B8A6;font-size:18px;font-weight:bold;"

);

});