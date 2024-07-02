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

    // Igualar alturas después de renderizar las tarjetas
    equalizeCardHeights();

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

        // Igualar alturas después de filtrar las tarjetas
        equalizeCardHeights();
    });
});

function equalizeCardHeights() {
    // Obtén todas las tarjetas
    const cards = document.querySelectorAll('.section');

    // Restablece las alturas antes de recalcular
    cards.forEach(card => {
        card.style.height = 'auto';
    });

    // Agrupa las tarjetas por fila
    const rows = groupByRow(cards);

    // Para cada fila, encuentra la altura máxima y aplícala a todas las tarjetas en esa fila
    rows.forEach(row => {
        const maxHeight = Math.max(...row.map(card => card.offsetHeight));
        row.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    });
}

function groupByRow(cards) {
    const rows = [];
    let currentRow = [];
    let currentTop = null;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (currentTop === null || rect.top === currentTop) {
            currentRow.push(card);
        } else {
            rows.push(currentRow);
            currentRow = [card];
        }
        currentTop = rect.top;
    });

    // Agrega la última fila
    if (currentRow.length > 0) {
        rows.push(currentRow);
    }

    return rows;
}