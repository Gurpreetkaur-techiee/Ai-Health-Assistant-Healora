/* ==========================================
              HEALORA PROFILE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelectorAll("input, select, textarea");

const saveBtn = document.querySelector(".save-btn");

const cancelBtn = document.querySelector(".cancel-btn");

const editBtn = document.querySelector(".edit-profile-btn");

const moonBtn = document.querySelector(".fa-moon");

const profileImage = document.querySelector(".profile-image img");

const editPhoto = document.querySelector(".edit-photo");

/* ==========================================
        LOAD SAVED PROFILE
========================================== */

loadProfile();

function loadProfile(){

const data = JSON.parse(localStorage.getItem("healoraProfile"));

if(!data) return;

form.forEach(field=>{

if(data[field.placeholder])

field.value=data[field.placeholder];

});

}

/* ==========================================
          ENABLE EDITING
========================================== */

editBtn.addEventListener("click",()=>{

form.forEach(field=>{

field.removeAttribute("readonly");

field.removeAttribute("disabled");

});

showToast("✏️ Edit mode enabled");

});

/* ==========================================
          SAVE PROFILE
========================================== */

saveBtn.addEventListener("click",()=>{

const profileData={};

form.forEach(field=>{

const key=field.placeholder || field.type || field.tagName;

profileData[key]=field.value;

});

localStorage.setItem(

"healoraProfile",

JSON.stringify(profileData)

);

showToast("✅ Profile Saved Successfully");

});
/* ==========================================
        CANCEL CHANGES
========================================== */

if(cancelBtn){

cancelBtn.addEventListener("click",()=>{

loadProfile();

showToast("↩️ Changes reverted");

});

}

/* ==========================================
        DARK MODE
========================================== */

if(moonBtn){

moonBtn.parentElement.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"profileDarkMode",

document.body.classList.contains("dark")

);

});

}

if(localStorage.getItem("profileDarkMode")==="true"){

document.body.classList.add("dark");

}

/* ==========================================
      CHANGE PROFILE PHOTO
========================================== */

if(editPhoto){

editPhoto.addEventListener("click",()=>{

const url=prompt("Enter profile image URL");

if(url){

profileImage.src=url;

localStorage.setItem(

"profileImage",

url

);

showToast("📷 Profile photo updated");

}

});

}

const savedImage=localStorage.getItem("profileImage");

if(savedImage){

profileImage.src=savedImage;

}

/* ==========================================
        TOAST NOTIFICATION
========================================== */

function showToast(message){

const toast=document.createElement("div");

toast.className="profile-toast";

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
        INITIALIZE
========================================== */

showToast("👋 Welcome back!");

console.log("%cHealora Profile Loaded",
"color:#14B8A6;font-size:18px;font-weight:bold;");

});