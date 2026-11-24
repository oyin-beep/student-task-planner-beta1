
// =====================================
// TTU STUDENT PLANNER - STUDENT INFO
// =====================================

// Wait until the HTML page loads
document.addEventListener("DOMContentLoaded", function () {

    // Get HTML elements
    const form = document.querySelector("form");
    const majorInput = document.getElementById("Major");
    const yearInputs = document.querySelectorAll('input[name="year"]');
    const clubInputs = document.querySelectorAll('input[name="clubs"]');
    const profileInput = document.getElementById("profile-picture");
    const profileImage = document.querySelector(".profile-picture");
    const welcomeHeading = document.querySelector("h2");

    // Create a message area
    const message = document.createElement("p");
    message.id = "save-message";
    form.appendChild(message);


    // =====================================
    // LOAD SAVED STUDENT INFORMATION
    // =====================================

    function loadStudentInfo() {

        const savedInfo = localStorage.getItem("studentInfo");

        if (savedInfo) {

            const student = JSON.parse(savedInfo);

            // Load major
            majorInput.value = student.major || "";

            // Load year
            yearInputs.forEach(function (radio) {
                radio.checked = radio.value === student.year;
            });

            // Load clubs
            clubInputs.forEach(function (checkbox) {
                checkbox.checked = student.clubs.includes(checkbox.value);
            });

            // Update welcome message
            welcomeHeading.textContent =
                "Welcome " + (student.username || "Student") + "!";
        }

        // Load profile picture
        const savedPicture = localStorage.getItem("studentPicture");

        if (savedPicture) {
            profileImage.src = savedPicture;
        }
    }


    // =====================================
    // SAVE STUDENT INFORMATION
    // =====================================

    form.addEventListener("submit", function (event) {

        // Prevent page from refreshing
        event.preventDefault();

        // Get selected year
        let selectedYear = "";

        yearInputs.forEach(function (radio) {
            if (radio.checked) {
                selectedYear = radio.value;
            }
        });

        // Get selected clubs
        let selectedClubs = [];

        clubInputs.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedClubs.push(checkbox.value);
            }
        });

        // Create student information object
        const studentInfo = {

            major: majorInput.value,

            year: selectedYear,

            clubs: selectedClubs

        };

        // Save information
        localStorage.setItem(
            "studentInfo",
            JSON.stringify(studentInfo)
        );

        // Display confirmation
        message.textContent = "Your information has been saved!";
        message.style.color = "green";
        message.style.fontWeight = "bold";

    });


    // =====================================
    // PROFILE PICTURE UPLOAD
    // =====================================

    profileInput.addEventListener("change", function () {

        const file = profileInput.files[0];

        if (file) {

            // Make sure the file is an image
            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file.");
                profileInput.value = "";
                return;
            }

            // Limit image size to 2 MB
            if (file.size > 2 * 1024 * 1024) {
                alert("Please choose an image smaller than 2 MB.");
                profileInput.value = "";
                return;
            }

            // Read the uploaded picture
            const reader = new FileReader();

            reader.onload = function (event) {

                // Display the picture
                profileImage.src = event.target.result;

                // Save picture in localStorage
                try {
                    localStorage.setItem(
                        "studentPicture",
                        event.target.result
                    );

                    message.textContent = "Profile picture updated!";
                    message.style.color = "green";

                } catch (error) {
                    message.textContent =
                        "Picture could not be saved. Try a smaller image.";
                    message.style.color = "red";
                }
            };

            reader.readAsDataURL(file);

        }

    });


    // =====================================
    // LOAD INFORMATION WHEN PAGE OPENS
    // =====================================

    loadStudentInfo();

});
