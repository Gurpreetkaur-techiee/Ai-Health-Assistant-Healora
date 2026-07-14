const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
    }
    
document.addEventListener("DOMContentLoaded", () => {

    const API_BASE_URL = "http://localhost:5000/api";


    const saveBtn = document.querySelector(".save-btn");
    const logoutBtn = document.getElementById("logoutBtn");

const fullName = document.getElementById("fullName");
const dateOfBirth = document.getElementById("dateOfBirth");
const gender = document.getElementById("gender");
const bloodGroup = document.getElementById("bloodGroup");;

    loadProfile();

    async function loadProfile() {

        try {

            const response = await fetch(
                `${API_BASE_URL}/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            const user = result.data.user;

            document.getElementById("profileName").textContent = user.name;

            document.getElementById("profileImage").src =
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0B4F6C&color=fff`;

            document.getElementById("fullName").value = user.name || "";

            document.getElementById("email").value = user.email || "";

            document.getElementById("dateOfBirth").value =
                user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "";

            document.getElementById("gender").value = user.gender || "";

            document.getElementById("bloodGroup").value = user.bloodGroup || "";

            console.log(user);

        }

        catch (err) {

            console.error(err);

        }

    }

saveBtn.addEventListener("click", updateProfile);

async function updateProfile() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/auth/me`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({

                    name: fullName.value.trim(),
                    dateOfBirth: dateOfBirth.value || null,
                    gender: gender.value || null,
                    bloodGroup: bloodGroup.value || null

                })
            }
        );

        const result = await response.json();

        console.log(result);

        if (result.success) {

            alert("✅ Profile updated successfully!");

            loadProfile();

        } else {

            alert(result.message);

        }

    } catch (err) {

        console.error(err);
        alert("Failed to update profile.");

    }

}

logoutBtn.addEventListener("click", logout);

async function logout() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/auth/logout`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        console.log(result);

        localStorage.removeItem("token");

        window.location.href = "login.html";

    }

    catch (err) {

        console.error(err);

        alert("Logout failed.");

    }

}

});