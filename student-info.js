/* STUDENT INFORMATION */

const studentForm = document.querySelector("form");

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const major = document.querySelector("#Major").value.trim();
    const year = document.querySelector('input[name="year"]:checked');
    const clubCheckboxes = document.querySelectorAll('input[name="clubs"]:checked');

    if (!year) {
        alert("Please select your class year.");
        return;
    }

    const clubs = [];

    clubCheckboxes.forEach(function(checkbox) {
        clubs.push(checkbox.value);
    });

    const student = {
        major: major,
        year: year.value,
        clubs: clubs
    };

    localStorage.setItem("studentProfile", JSON.stringify(student));

    alert("Your student information has been saved! Visit Connections to find students.");
});
