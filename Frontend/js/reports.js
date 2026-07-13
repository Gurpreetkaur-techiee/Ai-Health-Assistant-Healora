/* ==========================================
   HEALORA REPORTS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

const uploadInput = document.querySelector(".upload-box input");

const reportsGrid = document.querySelector(".reports-grid");

const searchInput = document.querySelector(".search-box input");

const statCards = document.querySelectorAll(".stat-card");

const moonBtn = document.querySelector(".fa-moon");

/* ==========================================
   REPORT COUNTER
========================================== */

function updateStats(){

const reports=document.querySelectorAll(".report-card");

if(statCards.length){

statCards[0].querySelector("h2").textContent=reports.length;

}

}

/* ==========================================
   FILE UPLOAD
========================================== */

uploadInput.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file) return;

const extension=file.name.split(".").pop().toUpperCase();

let icon="📄";

if(extension==="PDF") icon="📄";

else if(["PNG","JPG","JPEG"].includes(extension)) icon="🖼️";

const card=document.createElement("div");

card.className="report-card";

card.innerHTML=`

<div class="report-icon">

${icon}

</div>

<h3>${file.name}</h3>

<p>

Uploaded: ${new Date().toLocaleDateString()}

</p>

<div class="report-tags">

<span>New</span>

<span>${extension}</span>

</div>

<div class="report-actions">

<button class="view-btn">

View

</button>

<button>

Download

</button>

<button class="danger delete-btn">

Delete

</button>

</div>

`;

reportsGrid.prepend(card);

updateStats();

saveReports();

});



/* ==========================================
   LIVE SEARCH
========================================== */

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

document.querySelectorAll(".report-card").forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(value)?"block":"none";

});

});


/* ==========================================
   FILTER BUTTONS
========================================== */

document.querySelectorAll(".filter-buttons button").forEach(btn=>{

btn.addEventListener("click",()=>{

document.querySelectorAll(".filter-buttons button")

.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const type=btn.innerText.toLowerCase();

document.querySelectorAll(".report-card").forEach(card=>{

if(type==="all"){

card.style.display="block";

return;

}

card.style.display=

card.innerText.toLowerCase().includes(type)

?"block":"none";

});

});

});
/* ==========================================
   DELETE REPORT
========================================== */

reportsGrid.addEventListener("click",(e)=>{

if(e.target.classList.contains("delete-btn")){

if(confirm("Delete this report?")){

e.target.closest(".report-card").remove();

updateStats();

saveReports();

}

}

});


/* ==========================================
   VIEW REPORT
========================================== */

reportsGrid.addEventListener("click",(e)=>{

if(e.target.classList.contains("view-btn")){

const reportName=e.target
.closest(".report-card")
.querySelector("h3").innerText;

alert("📄 Opening: " + reportName);

}

});


/* ==========================================
   DARK MODE
========================================== */

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"reportsDarkMode",

document.body.classList.contains("dark")

);

});

}

if(localStorage.getItem("reportsDarkMode")==="true"){

document.body.classList.add("dark");

}


/* ==========================================
   SAVE REPORTS
========================================== */

function saveReports(){

localStorage.setItem(

"healoraReports",

reportsGrid.innerHTML

);

}

function loadReports(){

const saved=

localStorage.getItem("healoraReports");

if(saved){

reportsGrid.innerHTML=saved;

}

}

loadReports();

updateStats();


/* ==========================================
   AI ANALYSIS BUTTON
========================================== */

document.querySelectorAll(".report-card").forEach(card=>{

card.addEventListener("dblclick",()=>{

card.style.opacity=".6";

setTimeout(()=>{

card.style.opacity="1";

alert("🤖 AI analysis completed successfully.");

},1500);

});

});


console.log("%c📄 Healora Reports Ready",
"color:#14B8A6;font-size:18px;font-weight:bold;");


});
