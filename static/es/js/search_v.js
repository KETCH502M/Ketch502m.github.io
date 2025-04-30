// Función para cargar los datos desde el archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch('links.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return [];
    }
}

// Datos de ejemplo: lista de archivos disponibles
let archivos = [];

// Función para mostrar la lista de archivos filtrados por la búsqueda
function mostrarArchivos(resultados) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Limpiar la lista antes de mostrar los archivos

    resultados.forEach(archivo => {
        const item = document.createElement('div');
        item.classList.add('fileItem');
        const link = document.createElement('a');
        link.textContent = archivo.nombre;
        link.href = archivo.enlace;
        link.setAttribute('download', ''); // Agregar el atributo de descarga
        link.id = 'link' /*+ archivo.nombre.toLowerCase().replace(/\s+/g, '-')*/; // Agregar un ID único
        item.appendChild(link);
        fileList.appendChild(item);
    });
}



// Función para manejar el evento de búsqueda
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    const resultados = filtrarArchivos(query);

    mostrarArchivos(resultados);
}

// Filtrar archivos según la búsqueda
function filtrarArchivos(consulta) {
    return archivos.filter(archivo =>
        archivo.nombre.toLowerCase().includes(consulta.toLowerCase())
    );
}

// Mostrar todos los archivos al cargar la página inicialmente
document.addEventListener('DOMContentLoaded', async () => {
    archivos = await cargarDatos();
    mostrarArchivos(archivos); // Mostrar todos los archivos
});

// Manejar el evento de búsqueda al escribir en el input
document.getElementById('searchInput').addEventListener('input', handleSearch);
