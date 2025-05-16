// Datos de ejemplo, puedes reemplazarlos con tu propia lista o fuente de datos
const data = [
    "1.20.15",
    "1.20.12",
    "1.19.71",
    "1.19.70",
    "1.19.51",
    "1.19.50",
    "1.14.30"
];

const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");
const versionLinks = document.querySelectorAll(".links a");

function search() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === "") {
        resetResults();
    } else {
        const filteredData = data.filter(item => versionMatchesSearchTerm(item, searchTerm));
        displayResults(filteredData);
    }
}

function versionMatchesSearchTerm(version, searchTerm) {
    // Escapar caracteres especiales para que no afecten la expresión regular
    const escapedSearchTerm = searchTerm.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearchTerm, 'i'); // 'i' para que sea insensible a mayúsculas/minúsculas
    return regex.test(version);
}

function displayResults(results) {
    versionLinks.forEach(link => {
        const versionText = link.textContent.toLowerCase();
        const isVisible = results.some(version => versionText.includes(version));
        link.style.display = isVisible ? "block" : "none";
    });
}

function resetResults() {
    versionLinks.forEach(link => {
        link.style.display = "block";
    });
}

// Evento para detectar cambios en el input de búsqueda
searchInput.addEventListener("input", search);
