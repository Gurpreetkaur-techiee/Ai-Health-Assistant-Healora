/* ==========================================
            HEALORA SETTINGS
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

const darkMode=document.getElementById("darkMode");

const saveBtn=document.querySelector(".save-settings");

const logoutBtn=document.querySelector(".logout-btn");

const deleteBtn=document.querySelector(".delete-btn");

const selects=document.querySelectorAll("select");

const switches=document.querySelectorAll(".switch input");

const moonBtn=document.querySelector(".fa-moon");

/* ==========================================
        LOAD SETTINGS
========================================== */

loadSettings();

function loadSettings(){

const settings=JSON.parse(

localStorage.getItem("healoraSettings")

);

if(!settings) return;

if(darkMode){

darkMode.checked=settings.darkMode;

document.body.classList.toggle(

"dark",

settings.darkMode

);

}

selects.forEach((select,index)=>{

if(settings.selects){

select.value=settings.selects[index];

}

});

switches.forEach((toggle,index)=>{

if(settings.switches){

toggle.checked=settings.switches[index];

}

});

}

/* ==========================================
        SAVE SETTINGS
========================================== */

function saveSettings(){

const data={

darkMode:darkMode?darkMode.checked:false,

selects:[],

switches:[]

};

selects.forEach(select=>{

data.selects.push(select.value);

});

switches.forEach(toggle=>{

data.switches.push(toggle.checked);

});

localStorage.setItem(

"healoraSettings",

JSON.stringify(data)

);

showToast("✅ Settings Saved");

}

/* ==========================================
        DARK MODE
========================================== */

if(darkMode){

darkMode.addEventListener("change",()=>{

document.body.classList.toggle(

"dark",

darkMode.checked

);

});

}

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(darkMode){

darkMode.checked=document.body.classList.contains("dark");

}

});

}

saveBtn.addEventListener("click",saveSettings);
/* ==========================================
        AUTO SAVE ON CHANGE
========================================== */

switches.forEach(toggle=>{

toggle.addEventListener("change",saveSettings);

});

selects.forEach(select=>{

select.addEventListener("change",saveSettings);

});

/* ==========================================
        EXPORT DATA
========================================== */

const exportBtn=document.querySelector(".secondary-btn");

if(exportBtn){

exportBtn.addEventListener("click",()=>{

const data={

profile:JSON.parse(localStorage.getItem("healoraProfile"))||{},

settings:JSON.parse(localStorage.getItem("healoraSettings"))||{},

reminders:localStorage.getItem("healoraReminders")||""

};

const blob=new Blob(

[JSON.stringify(data,null
  ,null,2)],

{type:"application/json"}

);

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="Healora_Backup.json";

link.click();

URL.revokeObjectURL(link.href);

showToast("📁 Backup exported successfully");

});

}

/* ==========================================
        LOGOUT
========================================== */

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

const confirmLogout=confirm(

"Are you sure you want to logout?"

);

if(confirmLogout){

showToast("👋 Logging out...");

setTimeout(()=>{

window.location.href="login.html";

},1200);

}

});

}

/* ==========================================
        DELETE ACCOUNT
========================================== */

if(deleteBtn){

deleteBtn.addEventListener("click",()=>{

const confirmDelete=confirm(

"This will permanently delete all local Healora data.\n\nContinue?"

);

if(confirmDelete){

localStorage.clear();

showToast("🗑 Account data deleted");

setTimeout(()=>{

window.location.href="signup.html";

},1500);

}

});

}

/* ==========================================
        TOAST MESSAGE
========================================== */

function showToast(message){

const toast=document.createElement("div");

toast.className="settings-toast";

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

/* ==========================================
        INITIAL MESSAGE
========================================== */

showToast("⚙ Settings Loaded");

console.log(

"%c⚙ Healora Settings Loaded",

"color:#14B8A6;font-size:18px;font-weight:bold;"

);

});