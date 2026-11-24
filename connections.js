/* SAMPLE STUDENT PROFILES */

const sampleStudents = [
    {
        name: "Alex",
        major: "Computer Science",
        year: "Freshman",
        clubs: ["NSBE", "ANIME"]
    },
    {
        name: "Jordan",
        major: "Engineering",
        year: "Sophomore",
        clubs: ["SWE", "POWER LIFTING"]
    },
    {
        name: "Taylor",
        major: "Business",
        year: "Junior",
        clubs: ["ANIME"]
    },
    {
        name: "Morgan",
        major: "Computer Science",
        year: "Senior",
        clubs: ["NSBE", "SWE"]
    },
    {
        name: "Riley",
        major: "Biology",
        year: "Freshman",
        clubs: ["POWER LIFTING"]
    },
    {
        name: "Casey",
        major: "Engineering",
        year: "Junior",
        clubs: ["NSBE", "SWE"]
    }
];

/* COMPARE STUDENT INFORMATION */

const currentStudent = JSON.parse(
    localStorage.getItem("studentProfile")
);

const main = document.querySelector("main");
const clubsSection = document.querySelector("#clubs");

const matchSection = document.createElement("section");
matchSection.className = "content-section";

const heading = document.createElement("h2");
heading.textContent = "Students You May Connect With";

matchSection.appendChild(heading);

const description = document.createElement("p");
description.className = "section-description";
description.textContent = "Find students who share your major, class year, or clubs.";

matchSection.appendChild(description);

const matchContainer = document.createElement("div");
matchContainer.className = "item-container";

matchSection.appendChild(matchContainer);

if (!currentStudent) {
    const message = document.createElement("p");
    message.textContent = "Please complete your User Information page first.";
    matchContainer.appendChild(message);

} else {

    const matches = sampleStudents.map(function(student) {

        let score = 0;
        const reasons = [];

        if (student.major.toLowerCase() === currentStudent.major.toLowerCase()) {
            score += 3;
            reasons.push("Same major");
        }

        if (student.year === currentStudent.year) {
            score += 1;
            reasons.push("Same class year");
        }

        const sharedClubs = student.clubs.filter(function(club) {
            return currentStudent.clubs.includes(club);
        });

        if (sharedClubs.length > 0) {
            score += sharedClubs.length * 2;
            reasons.push("Shared clubs: " + sharedClubs.join(", "));
        }

        return {
            ...student,
            score: score,
            reasons: reasons
        };

    });

    const sortedMatches = matches
        .filter(function(student) {
            return student.score > 0;
        })
        .sort(function(a, b) {
            return b.score - a.score;
        });

    if (sortedMatches.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No matches found yet. Try updating your major or clubs!";
        matchContainer.appendChild(message);
    }

    sortedMatches.forEach(function(student) {

        const card = document.createElement("div");
        card.className = "info-card";

        const name = document.createElement("h3");
        name.textContent = student.name;

        const major = document.createElement("p");
        major.textContent = "Major: " + student.major;

        const year = document.createElement("p");
        year.textContent = "Class Year: " + student.year;

        const clubs = document.createElement("p");
        clubs.textContent = "Clubs: " + student.clubs.join(", ");

        const reasons = document.createElement("p");
        reasons.textContent = "Why you match: " + student.reasons.join(" • ");

        card.appendChild(name);
        card.appendChild(major);
        card.appendChild(year);
        card.appendChild(clubs);
        card.appendChild(reasons);

        matchContainer.appendChild(card);
    });
}

/* ADD MATCHES TO THE EXISTING PAGE */

main.insertBefore(matchSection, clubsSection);
