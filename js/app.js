import { obtenerMenu } from "./services/menu.service.js";
import { renderCategorias } from "./components/categoria.component.js";

async function init() {
    const menu = document.getElementById("menu");

    menu.innerHTML = renderSkeletonMenu();

    try {
        const data = await obtenerMenu();
        renderCategorias(data?.categorias ?? []);
    } catch (error) {
        console.error("No se pudo cargar el menú:", error);
        menu.innerHTML = `
            <div class="menu-state menu-state-error" role="alert">
                <i class="bi bi-exclamation-circle" aria-hidden="true"></i>
                <span>No pudimos cargar el menú por ahora. Inténtalo de nuevo en unos minutos.</span>
            </div>
        `;
    }
}

function renderSkeletonMenu() {
    return `
        <div class="skeleton-menu" role="status" aria-label="Cargando menú">
            <div class="skeleton-filter">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="skeleton-heading"></div>
            <div class="productos-grid">
                ${Array.from({ length: 6 }).map(() => `
                    <article class="producto producto-skeleton">
                        <div class="skeleton-media"></div>
                        <div class="producto-contenido">
                            <div class="skeleton-line skeleton-line-title"></div>
                            <div class="skeleton-line"></div>
                            <div class="skeleton-line skeleton-line-short"></div>
                            <div class="skeleton-options">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </article>
                `).join("")}
            </div>
            <span class="visually-hidden">Cargando menú...</span>
        </div>
    `;
}

init();
