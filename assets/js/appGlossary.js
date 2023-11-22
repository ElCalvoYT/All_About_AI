document.addEventListener("DOMContentLoaded", async function () {
    // Cargar datos del glosario desde el archivo JSON
    const response = await fetch("assets/json/glossary.json");
    const glossaryData = await response.json();

    // Renderizar secciones del glosario
    const main = document.getElementById("main");
    glossaryData.forEach(item => {
        const section = document.createElement("div");
        section.classList.add("section");
        section.innerHTML = `
            <h2>${item.term}</h2>
            <p><strong>Definition:</strong> ${item.definition}</p>
            <p><strong>Erklärung:</strong> ${item.explanation}</p>
            <ul>
                <strong>Beispiele:</strong>
                ${item.examples.map(example => `<li>${example}</li>`).join("")}
            </ul>
        `;
        main.appendChild(section);
    });

    // Agregar funcionalidad de búsqueda
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("blur", function () {
        searchBar.style.height = "0";
    });

    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll(".section");

        sections.forEach(section => {
            const term = section.querySelector("h2").textContent.toLowerCase();
            section.style.display = term.includes(searchTerm) ? "block" : "none";
        });
    });
});
