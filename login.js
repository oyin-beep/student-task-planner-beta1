
// =====================================
// TTU STUDENT PLANNER - LOGIN
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    // Create a message for login feedback
    const message = document.createElement("p");
    message.id = "login-message";
    message.style.marginTop = "15px";
    loginForm.appendChild(message);


    // =====================================
    // LOGIN FORM SUBMISSION
    // =====================================

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get entered information
        const email = emailInput.value.trim().toLowerCase();
        const password = passwordInput.value;

        // Check for empty fields
        if (email === "" || password === "") {

            message.textContent = "Please fill in all fields.";
            message.style.color = "red";
            return;
        }

        // Check TTU email format
        if (!email.endsWith("@ttu.edu")) {

            message.textContent = "Please enter a valid TTU email.";
            message.style.color = "red";
            return;
        }

        // Get registered accounts
        const accounts = JSON.parse(
            localStorage.getItem("studentAccounts") || "[]"
        );

        // Find matching account
        const account = accounts.find(function (student) {
            return student.email === email &&
                   student.password === password;
        });

        // Check login credentials
        if (account) {

            // Save current logged-in student
            localStorage.setItem(
                "currentStudent",
                JSON.stringify({
                    email: account.email,
                    username: account.username
                })
            );

            message.textContent = "Login successful!";
            message.style.color = "green";

            // Redirect to student information page
            setTimeout(function () {
                window.location.href = "student-info.html";
            }, 700);

        } else {

            message.textContent =
                "Account not found or incorrect password. Please try again.";

            message.style.color = "red";
        }

    });

});
