/* ==========================================
        HEALORA NOTIFICATIONS
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

const markReadBtn=document.querySelector(".mark-read-btn");
const deleteBtn=document.querySelector(".delete-btn");
const notifications=document.querySelectorAll(".notification-card");
const moonBtn=document.querySelector(".fa-moon");
const toggles=document.querySelectorAll(".switch input");

/* ==========================
        MARK AS READ
========================== */

if(markReadBtn){

markReadBtn.addEventListener("click",()=>{

notifications.forEach(card=>{

card.classList.remove("unread");

});

showToast("All notifications marked as read.");

});

}

/* ==========================
        DELETE ALL
========================== */

if(deleteBtn){

deleteBtn.addEventListener("click",()=>{

if(confirm("Delete all notifications?")){

notifications.forEach(card=>{

card.remove();

});

showToast("All notifications deleted.");

}

});

}

/* ==========================
     SAVE PREFERENCES
========================== */

toggles.forEach((toggle,index)=>{

const key="notificationPreference"+index;

const saved=localStorage.getItem(key);

if(saved!==null){

toggle.checked=saved==="true";

}

toggle.addEventListener("change",()=>{

localStorage.setItem(key,toggle.checked);

showToast("Preference updated.");

});

});

/* ==========================
        DARK MODE
========================== */

if(localStorage.getItem("notificationDark")==="true"){

document.body.classList.add("dark");

}

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"notificationDark",

document.body.classList.contains("dark")

);

});

}

/* ==========================
      CLICK NOTIFICATION
========================== */

notifications.forEach(card=>{

card.addEventListener("click",()=>{

card.classList.remove("unread");

});

});

/* ==========================
        TOAST
========================== */

function showToast(message){

const toast=document.createElement("div");

toast.className="notification-toast";

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

"%c🔔 Healora Notifications Loaded",

"color:#14B8A6;font-size:18px;font-weight:bold;"

);

});