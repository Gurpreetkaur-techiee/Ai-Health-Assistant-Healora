/* ==========================================
   HEALORA DASHBOARD
========================================== */
const API_BASE_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}

document.addEventListener("DOMContentLoaded", () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));


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

            } catch (err) {

            console.error(err);

        }

    }
    loadDashboard();

    }


    /* ======================================
       HEALTH SCORE ANIMATION
    ====================================== */

    const score =
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

    }


    /* ======================================
       DARK MODE
    ====================================== */

    const darkButton =
        document.querySelector(".fa-moon");

    if (darkButton) {

        darkButton.parentElement.addEventListener("click", () => {

            document.body.classList.toggle("dark");

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
   AI ASSISTANT
========================================== */

const aiInput = document.querySelector(".ai-input input");
const aiButton = document.querySelector(".ai-input button");

if (aiButton && aiInput) {

    aiButton.addEventListener("click", () => {

        if (aiInput.value.trim() === "") {

            alert("Please enter your symptoms.");

            return;

        }

        alert("🤖 Healora AI: Your request has been received. AI integration will be connected soon.");

        aiInput.value = "";

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

const bell = document.querySelector(".fa-bell");

if (bell) {

    bell.parentElement.addEventListener("click", () => {

        alert("🔔 You have 2 medicine reminders today.");

    });

}


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