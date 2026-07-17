/* ==========================================
   HEALORA REPORTS
========================================== */
const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

const API_BASE_URL = "http://localhost:5000/api";
const storedUser = JSON.parse(localStorage.getItem("user"));

const profileImage = document.getElementById("profileImage");

if (profileImage && storedUser) {

    profileImage.src =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(storedUser.name)}&background=0B4F6C&color=fff`;

}

const uploadInput = document.getElementById("uploadInput");
const uploadBox = document.getElementById("uploadBox");
const selectedFile = document.getElementById("selectedFile");

const uploadBtn = document.querySelector(".upload-btn");

if (uploadBtn) {

    uploadBtn.addEventListener("click", () => {

        uploadInput.click();

    });

}

const chooseFileBtn = document.getElementById("chooseFileBtn");

if (chooseFileBtn) {

    chooseFileBtn.addEventListener("click", () => {

        uploadInput.click();

    });

}
uploadBox.addEventListener("click", () => {
    uploadInput.click();
});

uploadBox.addEventListener("dragover", (e) => {

    e.preventDefault();

    uploadBox.classList.add("dragging");

    uploadBox.querySelector("h2").textContent =
    "📂 Drop your report here";

});

uploadBox.addEventListener("dragleave", () => {

    uploadBox.classList.remove("dragging");

    uploadBox.querySelector("h2").textContent =
    "📄 Drag & Drop Medical Report";

});

uploadBox.addEventListener("drop", (e) => {

    e.preventDefault();

    uploadBox.classList.remove("dragging");

    uploadBox.querySelector("h2").textContent =
    "📄 Drag & Drop Medical Report";

    uploadInput.files = e.dataTransfer.files;

    selectedFile.textContent =
    e.dataTransfer.files[0].name;

    uploadInput.dispatchEvent(new Event("change"));

});

const reportsGrid = document.querySelector(".reports-grid");
const timeline = document.getElementById("timeline");

const searchInput = document.querySelector(".search-box input");

const statCards = document.querySelectorAll(".stat-card");

const moonBtn = document.querySelector(".fa-moon");
/* ==========================================
   REPORT COUNTER
========================================== */

function updateStats(reports) {

    statCards[0].querySelector("h2").textContent = reports.length;

    statCards[1].querySelector("h2").textContent = reports.length;

    statCards[2].querySelector("h2").textContent = "0";

    let totalBytes = 0;

    reports.forEach(report => {
        totalBytes += report.fileSizeBytes || 0;
    });

    let storageMB = (totalBytes / (1024 * 1024)).toFixed(2);

    statCards[3].querySelector("h2").textContent = `${storageMB} MB`;

}
/* ==========================================
   FILE UPLOAD
========================================== */

uploadInput.addEventListener("change", async (e) => {

    const file = e.target.files[0];
    chooseFileBtn.innerText = "Uploading...";
chooseFileBtn.disabled = true;

    if (!file) return;
    selectedFile.textContent = file.name;

    const formData = new FormData();

    formData.append("report", file);

    try {

        const response = await fetch(
            `${API_BASE_URL}/reports/upload`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

    const result = await response.json();

console.log(result);

// Always restore the button
chooseFileBtn.innerText = "Choose File";
chooseFileBtn.disabled = false;

if (!result.success) {

    let message = result.message || "";

    // Show a friendly message for scanned/image PDFs
    if (
        message.toLowerCase().includes("parsed") ||
        message.toLowerCase().includes("pdf") ||
        message.toLowerCase().includes("read")
    ) {

        message =
            "⚠️ This file cannot be analyzed.\n\n" +
            "Please upload the original digital PDF provided by the hospital or laboratory.\n\n" +
            "Scanned images, WhatsApp PDFs, or photos converted to PDF are not supported.";

    }

    alert(message);

    selectedFile.textContent = "No file selected";
    uploadInput.value = "";

    return;
}

// Success
alert("Report uploaded successfully!");

selectedFile.textContent = "No file selected";
uploadInput.value = "";

loadReportsFromBackend();

    }

    catch(err){

    console.error(err);

    alert(
        "⚠️ Upload failed.\n\n" +
        "Please make sure you're uploading a valid digital PDF report."
    );

    chooseFileBtn.innerText = "Choose File";
    chooseFileBtn.disabled = false;

    selectedFile.textContent = "No file selected";
    uploadInput.value = "";

}

});



/* ==========================================
   LIVE SEARCH
========================================== */

searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    document.querySelectorAll(".report-card").forEach(card => {

        const fileName = card.dataset.name;

        card.style.display =
            fileName.includes(value)
                ? ""
                : "none";

    });

});


/* ==========================================
   FILTER BUTTONS
========================================== */

document.querySelectorAll(".filter-buttons button").forEach(btn => {

    btn.addEventListener("click", () => {

        document
            .querySelectorAll(".filter-buttons button")
            .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const filter =
            btn.innerText.toLowerCase();

        document.querySelectorAll(".report-card").forEach(card => {

            const fileName =
                card.dataset.name;

            if (filter === "all") {

                card.style.display = "";

                return;

            }

            if (fileName.includes(filter)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});
/* ==========================================
   DELETE REPORT
========================================== */

reportsGrid.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("delete-btn")) return;

    const reportId = e.target.dataset.id;

    if (!confirm("Delete this report?")) return;

    try {

        const response = await fetch(
            `${API_BASE_URL}/reports/${reportId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

if (result.success) {
    alert("✅ Report uploaded successfully!");
} else {

    let message = result.message;

    if (
        message.includes("PDF") ||
        message.includes("parsed") ||
        message.includes("readable text")
    ) {
        message =
            "⚠️ This report appears to be a scanned/photo-based PDF.\n\nPlease upload the original digital PDF provided by the hospital or laboratory.";
    }

    alert(message);
}

    } catch (err) {
    console.error(err);

    alert(
        "⚠️ Unable to upload the report.\n\nPlease make sure you're uploading a valid digital PDF."
    );
}

});


/* ==========================================
   VIEW REPORT
========================================== */

reportsGrid.addEventListener("click", (e) => {

    const button = e.target.closest(".view-btn");

    if (!button) return;

    const file = button.dataset.file;

    if (!file) {
        alert("File not found.");
        return;
    }

    window.open(
        `http://localhost:5000${file}`,
        "_blank"
    );

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

/*function saveReports(){

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
*/
loadReportsFromBackend();
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

async function loadReportsFromBackend(){

    try{

        const response = await fetch(
            `${API_BASE_URL}/reports`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        reportsGrid.innerHTML = "";
        timeline.innerHTML = "";

      result.data.reports.forEach(report => {

    reportsGrid.innerHTML += `

<div class="report-card"
     data-name="${report.originalFileName.toLowerCase()}">

    <div class="report-header">

        <div class="report-icon">
            <i class="fa-solid fa-file-pdf"></i>
        </div>

        <div class="report-info">

            <h3>${report.originalFileName}</h3>

            <span class="report-date">
                <i class="fa-solid fa-calendar-days"></i>
                ${new Date(report.createdAt).toLocaleDateString()}
            </span>

        </div>

    </div>

    <div class="report-meta">

        <div>
            <strong>Size</strong><br>
            ${(report.fileSizeBytes/1024).toFixed(1)} KB
        </div>

        <div>
            <strong>Pages</strong><br>
            ${report.pageCount}
        </div>

        <div>
            <strong>Priority</strong><br>

            <span class="priority ${report.urgencyLevel}">
                ${report.urgencyLevel}
            </span>

        </div>

    </div>

    <div class="report-actions">

        <button
            class="view-btn"
            data-id="${report._id}"
            data-file="${report.filePath}">
            <i class="fa-solid fa-eye"></i>
            View
        </button>

        <button class="delete-btn" data-id="${report._id}">
            <i class="fa-solid fa-trash"></i>
            Delete
        </button>

    </div>

</div>

`;

    // ================= Timeline =================

    timeline.innerHTML += `

    <div class="timeline-item">

        <div class="dot"></div>

        <div>

            <h4>${report.originalFileName}</h4>

            <p>${new Date(report.createdAt).toLocaleDateString()}</p>

        </div>

    </div>

    `;

});

updateStats(result.data.reports);

    }

    catch(err){

        console.error(err);

    }

}


console.log("%c📄 Healora Reports Ready",
"color:#14B8A6;font-size:18px;font-weight:bold;");

const notificationBtn = document.getElementById("notificationBtn");

if (notificationBtn) {

    notificationBtn.addEventListener("click", () => {

        window.location.href = "notifications.html";

    });

}


/* ==========================================
   PROFILE AVATAR
========================================== */

const profileAvatar = document.getElementById("profileAvatar");

if (profileAvatar) {

    profileAvatar.style.cursor = "pointer";

    profileAvatar.addEventListener("click", () => {

        window.location.href = "profile.html";

    });

}
/* ==========================================
   LOGOUT
========================================== */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.style.cursor = "pointer";

    logoutBtn.addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) return;

        // Remove login information
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Go to login page
        window.location.href = "login.html";

    });

}
});

