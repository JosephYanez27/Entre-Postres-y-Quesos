export function renderCategorias(categorias) {
    const container = document.getElementById("menu");

    if (!categorias.length) {
        container.innerHTML = `
            <div class="menu-state">
                <i class="bi bi-cup-hot" aria-hidden="true"></i>
                <span>El menú estará disponible pronto.</span>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <nav class="category-filter" aria-label="Filtrar categorías">
            <button type="button" class="filter-chip active" data-filter-category="all">Todo</button>
            ${categorias.map((categoria, i) => `
                <button type="button" class="filter-chip" data-filter-category="${i}">${escapeHTML(categoria.nombre)}</button>
            `).join("")}
        </nav>

        ${categorias.map((categoria, i) => `
            <section class="categoria" aria-labelledby="categoria-${i}">
                <div class="titulo-container">
                    <span class="categoria-indice">${String(i + 1).padStart(2, "0")}</span>
                    <h2 id="categoria-${i}">${escapeHTML(categoria.nombre)}</h2>
                </div>

                <div class="productos-grid">
                    ${(categoria.productos ?? []).map((producto, j) => {
                        const nombre = escapeHTML(producto.nombre);
                        const descripcion = producto.descripcion ? escapeHTML(producto.descripcion) : "";
                        const tipo = obtenerTipo(producto.nombre ?? "");
                        const imagenes = imagenesPorTipo[tipo];
                        const carrusel = generarCarrusel(imagenes, `${i}-${j}`, nombre);

                        return `
                            <article class="producto">
                                ${carrusel}

                                <div class="producto-contenido">
                                    <h3>${nombre}</h3>
                                    ${descripcion ? `<p>${descripcion}</p>` : ""}

                                    <ul aria-label="Opciones de ${nombre}">
                                        ${(producto.opciones ?? []).map(opcion => `
                                            <li>${escapeHTML(opcion.nombre)}</li>
                                        `).join("")}
                                    </ul>
                                </div>
                            </article>
                        `;
                    }).join("")}
                </div>
            </section>
        `).join("")}
    `;

    activarFiltros(container);
    activarVistaImagen(container);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function obtenerTipo(nombre) {
    nombre = nombre.toLowerCase();

    if (nombre.includes("tabla")) return "tabla";
    if (nombre.includes("gelatina")) return "gelatina";
    if (nombre.includes("croissant") || nombre.includes("cuernito")) return "croissant";
    if (nombre.includes("concha") || nombre.includes("pan")) return "concha";
    if (nombre.includes("licor")) return "licor";
    if (nombre.includes("salsa")) return "macha";
    if (nombre.includes("pastel")) return "pastel";

    return null;
}

const imagenesPorTipo = {
    tabla: [
        "/assets/productos/Tabla1sf.png",
        "/assets/productos/Tabla2sf.png",
        "/assets/productos/Tabla3Sf.png"
    ],
    gelatina: [
        "/assets/productos/gel1sinf.png",
        "/assets/productos/gel2sf.png"
    ],
    concha: [
        "/assets/productos/conchssf.png"
    ],
    croissant: [
        "/assets/productos/crosssf.png"
    ],
    licor: [
        "/assets/productos/licorssf.png"
    ],
    macha: [
        "/assets/productos/machasf.png",
        "/assets/productos/chiposf.png"
    ],
    pastel: [
        "/assets/productos/past1sf.png",
        "/assets/productos/past2sf.png",
        "/assets/productos/past3sf.png"
    ]
};

function generarCarrusel(imagenes, id, nombreProducto) {
    if (!imagenes || imagenes.length === 0) return "";

    if (imagenes.length === 1) {
        return `
            <div class="producto-media">
                <button type="button" class="image-preview-trigger" data-preview-src="${imagenes[0]}" data-preview-title="${nombreProducto}" aria-label="Ver imagen de ${nombreProducto}">
                    <img src="${imagenes[0]}" class="img-producto" alt="${nombreProducto}" loading="lazy">
                    <span class="image-preview-icon"><i class="bi bi-arrows-angle-expand" aria-hidden="true"></i></span>
                </button>
            </div>
        `;
    }

    return `
        <div id="carousel-${id}" class="carousel slide producto-media" data-bs-ride="carousel">
            <div class="carousel-indicators">
                ${imagenes.map((_, index) => `
                    <button type="button" data-bs-target="#carousel-${id}" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""}" aria-label="Imagen ${index + 1}"></button>
                `).join("")}
            </div>
            <div class="carousel-inner">
                ${imagenes.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? "active" : ""}">
                        <button type="button" class="image-preview-trigger" data-preview-src="${img}" data-preview-title="${nombreProducto}" aria-label="Ver imagen de ${nombreProducto}">
                            <img src="${img}" class="d-block mx-auto img-producto" alt="${nombreProducto}" loading="lazy">
                            <span class="image-preview-icon"><i class="bi bi-arrows-angle-expand" aria-hidden="true"></i></span>
                        </button>
                    </div>
                `).join("")}
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${id}" data-bs-slide="prev" aria-label="Imagen anterior">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel-${id}" data-bs-slide="next" aria-label="Imagen siguiente">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    `;
}

function activarFiltros(container) {
    const chips = [...container.querySelectorAll(".filter-chip")];
    const categorias = [...container.querySelectorAll(".categoria")];

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            const filtro = chip.dataset.filterCategory;

            chips.forEach((item) => item.classList.toggle("active", item === chip));
            categorias.forEach((categoria, index) => {
                categoria.hidden = filtro !== "all" && String(index) !== filtro;
            });
        });
    });
}

function activarVistaImagen(container) {
    const modalElement = document.getElementById("imagePreviewModal");
    const modalImage = document.getElementById("imagePreview");
    const modalTitle = document.getElementById("imagePreviewTitle");

    if (!modalElement || !modalImage || !modalTitle) return;

    container.addEventListener("click", (event) => {
        const trigger = event.target.closest(".image-preview-trigger");
        if (!trigger) return;

        modalImage.src = trigger.dataset.previewSrc;
        modalImage.alt = trigger.dataset.previewTitle;
        modalTitle.textContent = trigger.dataset.previewTitle;

        if (window.bootstrap?.Modal) {
            window.bootstrap.Modal.getOrCreateInstance(modalElement).show();
        }
    });
}
