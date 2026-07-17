/* ==========================================
   HEALORA DASHBOARD
========================================== */
const API_BASE_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

let storedUser = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", () => {
 storedUser = JSON.parse(localStorage.getItem("user"));


    /* ======================================
       AUTO GREETING
    ====================================== */

    const greeting =
        document.querySelector(".topbar h1");

    if (greeting) {

        const hour = new Date().getHours();

        let message = "Good Evening";

        if (hour < 12) {

            message = "Good Morning";

        }

        else if (hour < 17) {

            message = "Good Afternoon";

        }

        const userName = storedUser?.name || "User";

        greeting.innerHTML =
        `${message}, <span>${userName} 👋</span>`;


        const profileImage = document.querySelector(".profile img");
        const profileAvatar = document.getElementById("profileAvatar");

        
        if (profileImage && storedUser) {

            profileImage.src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(storedUser.name)}&background=0B4F6C&color=fff`;

        }

        if (profileAvatar) {

            profileAvatar.style.cursor = "pointer";

            profileAvatar.addEventListener("click", () => {

            window.location.href = "profile.html";

        });

}

        async function loadDashboard() {

            try {

                const response = await fetch(
                    `${API_BASE_URL}/health/summary`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                console.log(JSON.stringify(result, null, 2));

                const summary = result.data;

                const healthScore =
                    document.querySelector(".value");

                if (healthScore && summary.healthScore) {

                    healthScore.textContent =
                        summary.healthScore + "%";

                }

                const healthStatus = document.querySelector(".health-score p");

    if (healthStatus && summary.healthStatus) {
        healthStatus.textContent = summary.healthStatus;
    }

    // === FETCH UPCOMING APPOINTMENT ===
    try {
      const appResponse = await fetch(`${API_BASE_URL}/appointments?upcoming=true`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (appResponse.ok) {
        const appResult = await appResponse.json();
        const appointments = appResult.data.appointments;
        
        if (appointments && appointments.length > 0) {
          const nextApp = appointments[0];
          
          // Update HTML with actual backend details
          document.getElementById('app-doctor-name').textContent = nextApp.doctorName || 'N/A';
          document.getElementById('app-doctor-specialty').textContent = nextApp.specialization || 'General';
          
          // Format date and time
          if (nextApp.date) {
            document.getElementById('app-date').textContent = new Date(nextApp.date).toLocaleDateString();
          }
          if (nextApp.time) {
            document.getElementById('app-time').textContent = nextApp.time;
          }
          
          // Store MongoDB ID on the button
          const viewDetailsBtn = document.getElementById('view-details-btn');
          if (viewDetailsBtn) {
            viewDetailsBtn.setAttribute('data-id', nextApp._id);
          }
        } else {
          // Fallback if there are no upcoming appointments in DB
          document.getElementById('app-doctor-name').textContent = 'No Upcoming Appointments';
          document.getElementById('app-doctor-specialty').textContent = '';
          document.getElementById('app-date').textContent = '-';
          document.getElementById('app-time').textContent = '-';
        }
      }
    } catch (appErr) {
      console.error("Error fetching upcoming appointment:", appErr);
    }

            } catch (err) {

            console.error(err);

        }


    // ================= RECENT ACTIVITY =================

try {

    const reportsResponse = await fetch(
        `${API_BASE_URL}/reports`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const reportsResult = await reportsResponse.json();

    let activities = [];

    if (
        reportsResponse.ok &&
        reportsResult.success &&
        Array.isArray(reportsResult.data?.reports)
    ) {

        reportsResult.data.reports
            .slice(0, 5)
            .forEach(report => {

                activities.push({
                    icon: "📄",
                    title: `Uploaded ${report.originalFileName}`,
                    time: new Date(report.createdAt).toLocaleString()
                });

            });

    }

    renderRecentActivity(activities);

} catch (err) {

    console.error(
        "Recent Activity Error:",
        err
    );

    renderRecentActivity([]);

}

    }
    loadDashboard();

  // === HANDLE VIEW DETAILS CLICK ===
  const viewDetailsBtn = document.getElementById('view-details-btn');
  if (viewDetailsBtn) {
    viewDetailsBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const appointmentId = viewDetailsBtn.getAttribute('data-id');
      if (!appointmentId) {
        alert("No appointment details found to display.");
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const result = await res.json();
          const appointment = result.data.appointment;
          
          // Display the backend appointment details cleanly in a popup
          alert(`
🩺 Appointment Details
-------------------------
Doctor: ${appointment.doctorName}
Specialty: ${appointment.specialization}
Date: ${new Date(appointment.date).toLocaleDateString()}
Time: ${appointment.time}
Status: ${appointment.status || 'Scheduled'}
Notes: ${appointment.notes || 'No custom notes.'}
          `);
        } else {
          alert("Failed to retrieve appointment details from server.");
        }
      } catch (error) {
        console.error("Error loading appointment details:", error);
        alert("Could not connect to server. Please try again.");
      }
    });
  }

    }


    /* ======================================
       HEALTH SCORE ANIMATION
    ====================================== */

    /*const score =
        document.querySelector(".value");

    if (score) {

        let count = 0;

        const target = 94;

        const interval = setInterval(() => {

            count++;

            score.textContent = count + "%";

            if (count >= target) {

                clearInterval(interval);

            }

        }, 20);

    }*/


    /* ======================================
       DARK MODE
    ====================================== */

   const darkButton =
        document.querySelector(".fa-moon");

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

    }

    if (darkButton) {

        darkButton.parentElement.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark") ? "dark" : "light"
            );

        });

    }


    /* ======================================
       BUTTON RIPPLE
    ====================================== */

    document.querySelectorAll("button").forEach(btn => {

        btn.addEventListener("click", function (e) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const size =
                Math.max(this.clientWidth, this.clientHeight);

            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                e.offsetX - size / 2 + "px";

            ripple.style.top =
                e.offsetY - size / 2 + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });


    /* ======================================
       GLASS CARD HOVER
    ====================================== */

    document.querySelectorAll(".glass-card")
        .forEach(card => {

            card.addEventListener("mousemove", e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                card.style.background =
                `radial-gradient(circle at ${x}px ${y}px,
                rgba(255,255,255,.95),
                rgba(255,255,255,.72))`;

            });

            card.addEventListener("mouseleave", () => {

                card.style.background =
                "rgba(255,255,255,.72)";

            });

        });

});
/* ==========================================
   DASHBOARD AI → CHATBOT
========================================== */

const aiInput = document.getElementById("dashboardAIInput");
const aiButton = document.getElementById("dashboardAISendBtn");

if (aiButton && aiInput) {

    aiButton.addEventListener("click", () => {

        const message = aiInput.value.trim();

        if (!message) {

            alert("Please enter your symptoms.");

            return;

        }

        // Save message for chatbot
        localStorage.setItem("dashboardAIMessage", message);

        // Open chatbot
        window.location.href = "chatbot.html";

    });

}

/* ==========================================
   WATER TRACKER
========================================== */

document.querySelectorAll(".glass").forEach((glass, index) => {

    glass.addEventListener("click", () => {

        document.querySelectorAll(".glass").forEach((g, i) => {

            if (i <= index) {

                g.classList.add("active");

            } else {

                g.classList.remove("active");

            }

        });
        const waterText = document.querySelector(".water-card p");

        if (waterText) {

            waterText.textContent = `${index + 1} / 8 Glasses`;

        }

    });

});

/* ==========================================
   MEDICINE CHECKMARK TOGGLE
========================================== */

document.querySelectorAll(".medicine-item .status").forEach((status) => {

    status.addEventListener("click", () => {

        status.classList.toggle("done");
        status.classList.toggle("pending");

        status.innerHTML = status.classList.contains("done")
            ? '<i class="fa-solid fa-check"></i>'
            : "";

    });

});

/* ==========================================
   QUICK ACTION BUTTONS
========================================== */

document.querySelectorAll(".quick-grid button").forEach(btn => {

    btn.addEventListener("click", () => {

        const action = btn.innerText.trim();

        alert(action + " feature will open in the next module.");

    });

});


/* ==========================================
   NOTIFICATION
========================================== */

/*const bell = document.querySelector(".fa-bell");

if (bell) {

    bell.parentElement.addEventListener("click", () => {

        alert("🔔 You have 2 medicine reminders today.");

    });

}*/


/* ==========================================
   SIDEBAR ACTIVE
========================================== */

document.querySelectorAll(".sidebar nav a").forEach(item => {

    item.addEventListener("click", () => {

        document
        .querySelectorAll(".sidebar nav a")
        .forEach(link => link.classList.remove("active"));

        item.classList.add("active");

    });

});


/* ==========================================
   LOGOUT
========================================== */

const logout = document.querySelector(".logout");

if (logout) {

    logout.addEventListener("click", () => {

        if (confirm("Do you want to logout?")) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "login.html";

        }

    });

}


/* ==========================================
   CARD FADE-IN
========================================== */

const cards = document.querySelectorAll(".glass-card,.stat-card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(40px)";

    setTimeout(() => {

        card.style.transition = ".6s";

        card.style.opacity = "1";

        card.style.transform = "translateY(0)";

    }, index * 120);

});


/* ==========================================
   LIVE CLOCK
========================================== */

const topbar = document.querySelector(".topbar p");

if (topbar) {

    setInterval(() => {

        const now = new Date();

        topbar.innerHTML =
            "Your AI Healthcare Companion • " +
            now.toLocaleTimeString();

    }, 1000);

}


console.log("%c❤️ Healora Dashboard Loaded",
"color:#14B8A6;font-size:18px;font-weight:bold;");


/* ==========================================
   TOP ACTIONS
========================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationDropdown = document.getElementById("notificationDropdown");

if (notificationBtn && notificationDropdown) {

    notificationBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        notificationDropdown.classList.toggle("show");

    });

    document.addEventListener("click", (e) => {

        if (
            !notificationDropdown.contains(e.target) &&
            !notificationBtn.contains(e.target)
        ) {

            notificationDropdown.classList.remove("show");

        }

    });

}


/* ==========================================
   DASHBOARD AI QUICK ACTIONS
========================================== */

const dashboardAIInput = document.getElementById("dashboardAIInput");

const quickButtons = document.querySelectorAll(".quick-actions button");

if (dashboardAIInput && quickButtons.length > 0) {

    quickButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const text = button.innerText.trim();

            switch (text) {

                case "🤒 Fever":
                    dashboardAIInput.value = "I have fever.";
                    break;

                case "🤧 Cold":
                    dashboardAIInput.value = "I have cold.";
                    break;

                case "💊 Medicine":
                    dashboardAIInput.value = "Tell me about my medicines.";
                    break;

                case "🩺 Reports":
                    dashboardAIInput.value = "Explain my medical reports.";
                    break;

            }

            dashboardAIInput.focus();

        });

    });

}

/* ==========================================
   PROFILE DROPDOWN
========================================== */

const profileAvatar = document.getElementById("profileAvatar");
const profileDropdown = document.getElementById("profileDropdown");

const dropdownUserName = document.getElementById("dropdownUserName");
const dropdownUserEmail = document.getElementById("dropdownUserEmail");

const profileMenuBtn = document.getElementById("profileMenuBtn");
const settingsMenuBtn = document.getElementById("settingsMenuBtn");
const logoutMenuBtn = document.getElementById("logoutMenuBtn");

if (storedUser) {

    if (dropdownUserName) {

        dropdownUserName.textContent = storedUser.name;

    }

    if (dropdownUserEmail) {

        dropdownUserEmail.textContent = storedUser.email;

    }

}

if (profileAvatar && profileDropdown) {

    profileAvatar.addEventListener("click", (e) => {

        e.stopPropagation();

        profileDropdown.classList.toggle("show");

    });

}

document.addEventListener("click", () => {

    profileDropdown?.classList.remove("show");

});

profileMenuBtn?.addEventListener("click", () => {

    window.location.href = "profile.html";

});

settingsMenuBtn?.addEventListener("click", () => {

    window.location.href = "settings.html";

});

logoutMenuBtn?.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";

});

/* ==========================================
   BMI & CALORIE GOAL (from profile)
========================================== */

async function getVitalsData() {
    const heightCm = parseFloat(localStorage.getItem("healora_height"));
    const weightKg = parseFloat(localStorage.getItem("healora_weight"));

    if (!heightCm || !weightKg) {
        return null; // user hasn't entered height/weight on Profile page yet
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        const user = result?.data?.user;

        return {
            heightCm,
            weightKg,
            dob: user?.dateOfBirth,
            gender: user?.gender
        };
    } catch (e) {
        console.error("Could not load profile data:", e);
        return null;
    }
}

function calcAge(dob) {
    const birth = new Date(dob);
    const diff = new Date() - birth;
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

getVitalsData().then(data => {
    const bmiEl = document.getElementById("statBMI");
    const bmiCatEl = document.getElementById("statBMICategory");
    const calEl = document.getElementById("statCalories");

    if (!data) {
        if (bmiEl) bmiEl.textContent = "--";
        if (bmiCatEl) bmiCatEl.textContent = "Add height/weight in Profile";
        if (calEl) calEl.textContent = "--";
        return;
    }

    const heightM = data.heightCm / 100;
    const bmi = data.weightKg / (heightM * heightM);

    if (bmiEl) bmiEl.textContent = bmi.toFixed(1);
    if (bmiCatEl) {
        let category = "Normal";
        if (bmi < 18.5) category = "Underweight";
        else if (bmi >= 25 && bmi < 30) category = "Overweight";
        else if (bmi >= 30) category = "Obese";
        bmiCatEl.textContent = category;
    }

    if (calEl && data.dob && data.gender) {
        const age = calcAge(data.dob);
        let bmr = 10 * data.weightKg + 6.25 * data.heightCm - 5 * age;
        bmr += data.gender.toLowerCase() === "male" ? 5 : -161;
        const tdee = Math.round(bmr * 1.375); // light activity assumption
        calEl.textContent = tdee.toLocaleString() + " kcal";
    } else if (calEl) {
        calEl.textContent = "--";
    }
});

/* ==========================================
   STEPS STEPPER (+ / -)
========================================== */

const STEPS_INCREMENT = 50;
const stepsEl = document.getElementById("statSteps");
const stepsMinusBtn = document.getElementById("stepsMinusBtn");
const stepsPlusBtn = document.getElementById("stepsPlusBtn");

function getSavedSteps() {
    const saved = localStorage.getItem("healora_steps");
    return saved !== null ? parseInt(saved, 10) : 0; // default when nothing saved yet
}

function renderSteps(value) {
    if (stepsEl) stepsEl.textContent = value.toLocaleString();
}

let currentSteps = getSavedSteps();
renderSteps(currentSteps);

if (stepsPlusBtn) {
    stepsPlusBtn.addEventListener("click", () => {
        currentSteps += STEPS_INCREMENT;
        localStorage.setItem("healora_steps", currentSteps);
        renderSteps(currentSteps);
    });
}

if (stepsMinusBtn) {
    stepsMinusBtn.addEventListener("click", () => {
        currentSteps = Math.max(0, currentSteps - STEPS_INCREMENT);
        localStorage.setItem("healora_steps", currentSteps);
        renderSteps(currentSteps);
    });
}

function renderRecentActivity(activities) {

    const activityList = document.getElementById("activityList");

    if (!activityList) return;

    activityList.innerHTML = "";

    if (!activities || activities.length === 0) {

        activityList.innerHTML = `
            <div class="activity">
                <div class="activity-icon">📭</div>

                <div>
                    <h4>No Recent Activity</h4>
                    <p>Your recent actions will appear here.</p>
                </div>
            </div>
        `;

        return;
    }

    activities.forEach(activity => {

        activityList.innerHTML += `

        <div class="activity">

            <div class="activity-icon">
                ${activity.icon}
            </div>

            <div>

                <h4>${activity.title}</h4>

                <p>${activity.time}</p>

            </div>

        </div>

        `;

    });

}