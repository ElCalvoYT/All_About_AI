// Get the current year
var currentYear = new Date().getFullYear();

// Update spans with class "year"
var yearSpans = document.getElementsByClassName("year");
for (var i = 0; i < yearSpans.length; i++) {
    yearSpans[i].textContent = currentYear;
}