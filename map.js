
const addPin = document.getElementById("add-pin");
const deletePin = document.getElementById("delete-pin");
const status = document.getElementById("map-status");

addPin.addEventListener("click", () => {
    status.textContent =
        "Pin placement is not yet available.";
    alert("Pin placement is coming soon!");
});

deletePin.addEventListener("click", () => {
    status.textContent =
        "Pin deletion is not yet available.";
    alert("Pin deletion is coming soon!");
});
