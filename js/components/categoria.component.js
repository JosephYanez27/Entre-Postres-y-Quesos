export function renderCategorias(categorias) {
    const container = document.getElementById("menu");

    container.innerHTML = categorias.map((categoria, i) => `
        <div class="categoria mb-4">
        <div class="titulo-container">
        <h2 class="text-primary">${categoria.nombre}</h2>
        </div>

            ${categoria.productos.map((producto, j) => {
                const tipo = obtenerTipo(producto.nombre);
                const imagenes = imagenesPorTipo[tipo];
                const carrusel = generarCarrusel(imagenes, `${i}-${j}`);

                return `
                <div class="producto card mb-3 p-3 shadow-sm">
                    
                    ${carrusel}

                    <h4>${producto.nombre}</h4>
                    <p class="text-muted">${producto.descripcion ?? ""}</p>

                    <ul>
                        ${producto.opciones.map(opcion => `
                            <li>${opcion.nombre}</li>
                        `).join("")}
                    </ul>
                </div>
                `;
            }).join("")}
        </div>
    `).join("");
}


function obtenerTipo(nombre) {
    nombre = nombre.toLowerCase();

    if (nombre.includes("tabla")) return "tabla";
    if (nombre.includes("gelatina")) return "gelatina";
    if (nombre.includes("pan")) return "concha";
    if (nombre.includes("pan")) return "croissant";
    if (nombre.includes("licor")) return "licor";
    if (nombre.includes("salsa")) return "macha";
    if (nombre.includes("pastel")) return "pastel";

    return null;
}

const imagenesPorTipo = {
    "tabla": [
        "/assets/productos/Tabla1sf.png",
        "/assets/productos/Tabla2sf.png",
        "/assets/productos/tabla3sf.png"
    ],
    "gelatina": [
        "/assets/productos/gel1sinf.png",
        "/assets/productos/gel2sf.png"
    ],
    "concha": [
        "/assets/productos/conchssf.png",
        "/assets/productos/crosssf.png"
    ],
    "licor": [
        "/assets/productos/licorssf.png"
    ],
    "macha": [
        "/assets/productos/machasf.png",
        "/assets/productos/chiposf.png"
    ],
    "pastel": [
        "/assets/productos/past1sf.png",
        "/assets/productos/past2sf.png",
        "/assets/productos/past3sf.png"
    ]
};


function generarCarrusel(imagenes, id) {
    if (!imagenes || imagenes.length === 0) return "";

    if (imagenes.length === 1) {
        return `<img src="${imagenes[0]}" class="img-producto mb-2">`;
    }

    return `
    <div id="carousel-${id}" class="carousel slide mb-2" data-bs-ride="carousel">
        <div class="carousel-inner">
            ${imagenes.map((img, index) => `
                <div class="carousel-item ${index === 0 ? "active" : ""}">
                <img src="${img}" class="d-block mx-auto img-producto">
                </div>
            `).join("")}
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel-${id}" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>
    `;
}