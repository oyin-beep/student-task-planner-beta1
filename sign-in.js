
// =====================================
// TTU STUDENT PLANNER - STUDENT INFO
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // Get HTML elements
    const form = document.querySelector("form");
    const majorInput = document.getElementById("Major");
    const yearInputs = document.querySelectorAll('input[name="year"]');
    const clubInputs = document.querySelectorAll('input[name="clubs"]');
    const profileInput = document.getElementById("profile-picture");
    const profileImage = document.querySelector(".profile-picture");
    const welcomeHeading = document.querySelector("h2");

    // Get logged-in student
    const currentStudent = JSON.parse(
        localStorage.getItem("currentStudent")
    );

    // Display logged-in student's username
    if (currentStudent) {
        welcomeHeading.textContent =
            "Welcome " + currentStudent.username + "!";
    }

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

            majorInput.value = student.major || "";

            yearInputs.forEach(function (radio) {
                radio.checked = radio.value === student.year;
            });

            clubInputs.forEach(function (checkbox) {
                checkbox.checked = student.clubs.includes(checkbox.value);
            });
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

        event.preventDefault();

        let selectedYear = "";

        yearInputs.forEach(function (radio) {
            if (radio.checked) {
                selectedYear = radio.value;
            }
        });

        let selectedClubs = [];

        clubInputs.forEach(function (checkbox) {
            if (checkbox.checked) {
                selectedClubs.push(checkbox.value);
            }
        });

        const studentInfo = {
            major: majorInput.value,
            year: selectedYear,
            clubs: selectedClubs
        };

        localStorage.setItem(
            "studentInfo",
            JSON.stringify(studentInfo)
        );

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

            if (!file.type.startsWith("image/")) {
                alert("Please upload an image file.");
                profileInput.value = "";
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                alert("Please choose an image smaller than 2 MB.");
                profileInput.value = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = function (event) {

                profileImage.src = event.target.result;

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
