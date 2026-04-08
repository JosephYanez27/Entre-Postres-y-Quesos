export function renderCategorias(categorias) {
    const container = document.getElementById("menu");

    container.innerHTML = categorias.map(categoria => `
        <div class="categoria mb-4">
            <h2 class="text-primary">${categoria.nombre}</h2>

            ${categoria.productos.map(producto => `
                <div class="producto card mb-3 p-3 shadow-sm">
                    <h4>${producto.nombre}</h4>
                    <p class="text-muted">${producto.descripcion ?? ""}</p>

                    <ul>
                        ${producto.opciones.map(opcion => `
                            <li>${opcion.nombre}</li>
                        `).join("")}
                    </ul>
                </div>
            `).join("")}
        </div>
    `).join("");
}