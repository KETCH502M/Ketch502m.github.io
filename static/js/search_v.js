const MC_URL = 'https://api.healtpix.com/api/links';
const VLINKS_URL = 'https://api.healtpix.com/api/vlinks';

// Carga local como respaldo solo para Minecraft
async function cargarMinecraftLocal() {
  try {
    const response = await fetch('links.json');
    const data = await response.json();
    return data.map(item => ({ ...item, categoria: 'minecraft' }));
  } catch {
    return [];
  }
}

async function cargarMinecraft() {
  try {
    const response = await fetch(MC_URL);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch {
    return await cargarMinecraftLocal();
  }
}

async function cargarGDyMods() {
  try {
    const response = await fetch(VLINKS_URL);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch {
    // Si falla, ocultar manualmente GD y Mods
    document.querySelectorAll('#categorySelector option[value="gd"], option[value="otros"], option[value="test"]').forEach(opt => {
      opt.disabled = true;
      opt.hidden = true;
    });
    return [];
  }
}

let archivos = [];

function mostrarArchivos(resultados) {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = '';

  if (!resultados.length) {
    fileList.innerHTML = '<p style="text-align:center;">No se encontraron archivos.</p>';
    return;
  }

  resultados.forEach(archivo => {
    const item = document.createElement('div');
    item.classList.add('fileItem');

    const link = document.createElement('a');
    link.href = archivo.enlace;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `<strong>${archivo.nombre}</strong><span>Download</span>`;

    item.appendChild(link);
    fileList.appendChild(item);
  });
}

function filtrarArchivos(consulta, categoria) {
  return archivos.filter(archivo => {
    const coincideTexto = archivo.nombre.toLowerCase().includes(consulta.toLowerCase());
    const coincideCategoria = archivo.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });
}

function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const categoria = document.getElementById('categorySelector').value;

  // Ocultar el input si la categoría no admite búsqueda
  if (categoria === 'gd' || categoria === 'otros' || categoria === 'test') {
    searchInput.classList.add('hidden-search');
    searchInput.disabled = true;
    searchInput.value = "";
  } else {
    searchInput.classList.remove('hidden-search');
    searchInput.disabled = false;
  }

  const texto = searchInput.value.trim();
  const resultados = filtrarArchivos(texto, categoria);
  mostrarArchivos(resultados);
}

async function cargarDatos() {
  const [mc, extra] = await Promise.all([
    cargarMinecraft(),
    cargarGDyMods()
  ]);

  archivos = [...mc, ...extra];
  handleSearch();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('categorySelector').value = 'minecraft'; // por defecto
  cargarDatos();
});

document.getElementById('searchInput').addEventListener('input', handleSearch);
document.getElementById('categorySelector').addEventListener('change', handleSearch);