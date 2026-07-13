/* ==========================================
   HEALORA AUTHENTICATION
   auth.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       PASSWORD TOGGLE
    =========================== */

    const passwordField = document.getElementById("loginPassword");
    const togglePassword = document.getElementById("showPassword");

    if (passwordField && togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (passwordField.type === "password") {

                passwordField.type = "text";
                togglePassword.textContent = "🙈";

            } else {

                passwordField.type = "password";
                togglePassword.textContent = "👁";

            }

        });

    }

    /* ===========================
       LOGIN FORM
    =========================== */

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!validateEmail(email)) {

                showMessage("Please enter a valid email address.", "error");
                return;

            }

            if (password.length < 6) {

                showMessage("Password must be at least 6 characters.", "error");
                return;

            }

            const loginButton = this.querySelector(".auth-btn");

            loginButton.classList.add("loading");

            setTimeout(() => {

                loginButton.classList.remove("loading");

                showMessage("Login Successful!", "success");

                setTimeout(() => {

                    window.location.href = "dashboard.html";

                }, 1200);

            }, 1800);

        });

    }

    /* ===========================
       GOOGLE BUTTON
    =========================== */

    const googleButton = document.querySelector(".google-btn");

    if (googleButton) {

        googleButton.addEventListener("click", () => {

            showMessage("Google Login Coming Soon", "success");

        });

    }

});


/* ===========================
   EMAIL VALIDATION
=========================== */

function validateEmail(email) {

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}


/* ===========================
   TOAST MESSAGE
=========================== */

function showMessage(message, type) {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {

        oldToast.remove();

    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 3000);

}


/* ===========================
   RIPPLE EFFECT
=========================== */

document.querySelectorAll(".auth-btn, .google-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left =
            e.clientX -
            this.getBoundingClientRect().left -
            radius + "px";

        circle.style.top =
            e.clientY -
            this.getBoundingClientRect().top -
            radius + "px";

        circle.classList.add("ripple");

        const ripple = this.querySelector(".ripple");

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/* ===========================
   FLOATING BLOBS
=========================== */

const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove", (e) => {

    blobs.forEach((blob, index) => {

        const speed = (index + 1) * 0.02;

        const x = (window.innerWidth / 2 - e.clientX) * speed;

        const y = (window.innerHeight / 2 - e.clientY) * speed;

        blob.style.transform =
            `translate(${x}px, ${y}px)`;

    });

});


/* ===========================
   PAGE TITLE
=========================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        document.title = "❤️ Come back to Healora";

    } else {

        document.title = "Healora | Login";

    }

});


console.log("%c❤️ Healora Authentication Loaded",
"color:#14B8A6;font-size:18px;font-weight:bold;");
/* ==========================================
   SIGNUP
========================================== */

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    const toggleSignupPassword =
        document.getElementById("toggleSignupPassword");

    const signupPassword =
        document.getElementById("signupPassword");

    if (toggleSignupPassword && signupPassword) {

        toggleSignupPassword.addEventListener("click", () => {

            if (signupPassword.type === "password") {

                signupPassword.type = "text";
                toggleSignupPassword.textContent = "🙈";

            } else {

                signupPassword.type = "password";
                toggleSignupPassword.textContent = "👁";

            }

        });

    }

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirm =
            document.getElementById("confirmPassword").value;

        if (name.length < 3) {

            showMessage("Please enter your full name.", "error");
            return;

        }

        if (!validateEmail(email)) {

            showMessage("Please enter a valid email.", "error");
            return;

        }

        if (password.length < 8) {

            showMessage("Password must contain at least 8 characters.", "error");
            return;

        }

        if (password !== confirm) {

            showMessage("Passwords do not match.", "error");
            return;

        }

        const button = this.querySelector(".auth-btn");

        button.classList.add("loading");

        setTimeout(() => {

            button.classList.remove("loading");

            showMessage("Account Created Successfully!", "success");

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        }, 1800);

    });

}