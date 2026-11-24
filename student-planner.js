const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");

// Start at November 2026
let currentDate = new Date(2026, 10, 1);

function generateCalendar() {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update month and year heading
    monthYear.textContent = currentDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });

    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;

    for (let week = 0; week < 6; week++) {

        const row = document.createElement("tr");

        for (let day = 0; day < 7; day++) {

            const cell = document.createElement("td");

            if ((week === 0 && day < firstDay) || date > daysInMonth) {
                cell.textContent = "";
            } else {

                cell.innerHTML = `<strong>${date}</strong>`;

                const dateKey =
                    `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

                const events = JSON.parse(
                    localStorage.getItem("plannerEvents")
                ) || [];

                events.forEach(event => {
                    if (event.date === dateKey) {
                        const eventDiv = document.createElement("div");
                        eventDiv.classList.add("calendar-event");
                        eventDiv.textContent = event.title;
                        cell.appendChild(eventDiv);
                    }
                });

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);

        if (date > daysInMonth) break;
    }
}

// PREVIOUS MONTH
document.getElementById("prevMonth").addEventListener("click", function() {
    currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        1
    );

    generateCalendar();
});

// NEXT MONTH
document.getElementById("nextMonth").addEventListener("click", function() {
    currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
    );

    generateCalendar();
});

// Initial display
generateCalendar();
