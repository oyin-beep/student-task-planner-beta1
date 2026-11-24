
// CONNECTIONS PAGE JAVASCRIPT

// SEARCH FUNCTION
const searchInput = document.getElementById("connectionSearch");
const searchButton = document.getElementById("searchButton");
const searchMessage = document.getElementById("searchMessage");

function searchConnections() {

    const searchValue = searchInput.value.toLowerCase().trim();

    const cards = document.querySelectorAll(
        ".category-card, .info-card, .event-card, .tag"
    );

    let found = 0;

    cards.forEach(card => {

        const text = card.textContent.toLowerCase();

        if (text.includes(searchValue)) {
            card.style.display = "";
            found++;
        } else {
            card.style.display = "none";
        }

    });

    if (searchValue === "") {
        cards.forEach(card => card.style.display = "");
        searchMessage.textContent = "";
    } else if (found > 0) {
        searchMessage.textContent = found + " results found!";
    } else {
        searchMessage.textContent = "No connections found.";
    }
}

searchButton.addEventListener("click", searchConnections);

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchConnections();
    }
});


// CLICKABLE MAJOR TAGS
const majorTags = document.querySelectorAll(".tag");

majorTags.forEach(tag => {

    tag.style.cursor = "pointer";

    tag.addEventListener("click", function() {

        const major = this.textContent;

        alert(
            "You selected " + major +
            "! Find students who share this major."
        );

    });

});


// CLICKABLE CLUB CARDS
const clubCards = document.querySelectorAll("#clubs .info-card");

clubCards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", function() {

        const clubName = this.querySelector("h3").textContent;

        alert(
            "Explore " + clubName +
            " and discover student organizations!"
        );

    });

});


// CLICKABLE CLASS YEAR CARDS
const yearCards = document.querySelectorAll("#class-year .info-card");

yearCards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", function() {

        const classYear = this.querySelector("h3").textContent;

        alert(
            "You selected " + classYear +
            "! Find other students in your class year."
        );

    });

});


// CLICKABLE CAMPUS EVENTS
const eventCards = document.querySelectorAll(".event-card");

eventCards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", function() {

        const eventName = this.querySelector("h3").textContent;

        alert(
            "You selected " + eventName +
            "! Check out opportunities to meet other students."
        );

    });

});


// EXPLORE BUTTONS
const exploreLinks = document.querySelectorAll(".card-link");

exploreLinks.forEach(link => {

    link.addEventListener("click", function() {

        const section = document.querySelector(this.getAttribute("href"));

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});
